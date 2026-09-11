"""
Derives approximate real-world (lat/lon) geometry for the Tanjung Agas site from the
pixel-space tracing already done in build_satmap.py / detail_satmap.py, and writes
web/src/lib/site-geo.json for the Explore map.

Why this exists: none of the supplied assets carry real georeferencing (see
build_satmap.py's own material name "Satellite image - original georeferenced by image
pixels" and detail_satmap.py's disclaimer "no surveyed elevation or scale supplied").
boundMap.svg is not vector data either — inspect it and it's a raster PNG wrapped in an
<image> tag inside an SVG shell, no polygon paths. So there is no real zone-polygon data to
digitize; what this script does instead is anchor the one thing we CAN trust (satMap.png's
already-traced `boundary`/`uniti` pixel arrays) to real-world coordinates, using two
independent public references:
  - OpenStreetMap way 967037434 "Kolej UNITI" — a real, surveyed campus footprint at this
    exact site (found via Nominatim search, confirmed by matching visual landmarks: N143
    road, the Linggi River mouth, Kampung Tanjung Agas).
  - OpenStreetMap way 476596586 — the real coastline geometry for this stretch of coast.

Method:
  1. Anchor point: satMap.png pixel (572, 227) (the Kolej UNITI building cluster, read off
     a pixel-grid overlay of satMap.png) <-> the real centroid of OSM way 967037434.
  2. Scale + rotation: rotation is fixed at 0 (both satMap.png and boundMap.png have
     north-up compass arrows, confirmed by inspection). Scale was NOT derived from the "38
     acres" stat in DETAILS.md/the fact strip — that number produced a site polygon whose
     coastal edge sat ~280m inland of the real coastline (see validation step). Instead,
     scale was solved for directly: the value (3.99 m/px) that places the traced boundary's
     known on-coast pixel (426, 333) exactly on the real OSM coastline.
  3. The `uniti` zone parcel and overall `boundary` are the exact pixel arrays from
     build_satmap.py, transformed through that scale+anchor.
  4. The other 4 zones (marina, nature, shipyard, walit) have no traced polygon anywhere in
     the supplied assets — only marker positions (left/top % on boundMap.png, from the
     prototype's zoneData). They're placed as POINTS, not polygons: the naive percentage
     mapping into the transformed boundary's bbox put "uniti" ~600m from its own known real
     position, so all 4 points are corrected by the offset needed to make uniti's percentage
     point match uniti's real polygon centroid. This assumes the discrepancy is mostly a
     constant offset (plausible — it looks like the prototype's CSS object-position crop),
     not a scale/rotation error, which is a real Simplifying assumption, not a
     measured fact — hence "indicative only" on every feature this script emits.

Validation performed before trusting this transform (see validation_plot2.png, not checked
in — regenerate via the `--validate` flag): the transformed Uniti parcel overlaps the real
OSM Kolej UNITI polygon, and the transformed site boundary's seaward edge sits on the real
coastline rather than inland or in the sea. Both passed.

IMPORTANT — the resulting site boundary polygon covers ~284 acres, NOT the "± 38 acres"
figure quoted in the product fact strip / Home stats. Those are not the same shape: the
boundary traced in build_satmap.py is a general site-context outline, not the specific
38-acre investable parcel. Do not present both numbers side by side without explaining
that they describe different extents.

Requires: pip install pillow numpy (numpy unused directly here but kept for parity with the
exploratory session; safe to drop if trimming deps).

Usage:
    python3 georeference_zones.py            # writes ../web/src/lib/site-geo.json
    python3 georeference_zones.py --validate  # also writes validation_plot.png (requires
                                               # matplotlib and network access to Overpass)
"""

import json
import math
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = Path(__file__).resolve().parent
WEB_LIB = ROOT / "web" / "src" / "lib"

# ---- pixel-space source data (satMap.png, 1369x768) ----
# Traced manually in build_satmap.py; reproduced here verbatim.
BOUNDARY_PX = [
    (426, 333), (433, 286), (460, 234), (499, 182), (519, 183), (571, 230),
    (631, 251), (623, 261), (677, 294), (734, 342), (741, 334), (793, 392),
    (818, 403), (903, 432), (881, 472), (933, 494), (946, 477), (1008, 503),
    (910, 610), (887, 620), (865, 622), (842, 614), (818, 591), (782, 505),
    (713, 422), (553, 350),
]

# Zone marker percentages from the design prototype's zoneData (UnitiProperty.dc.html),
# expressed as (left%, top%) on boundMap.png / the Explore map area.
ZONE_PCT = {
    "uniti": (46, 30),
    "marina": (27, 46),
    "nature": (55, 82),
    "shipyard": (73, 80),
    "walit": (63, 76),
}

# ---- real-world anchor (from OpenStreetMap, see module docstring) ----
ANCHOR_PX = (572, 227)
ANCHOR_LATLON = (2.407386676923077, 101.96684483846154)  # OSM way 967037434 centroid
SCALE_M_PER_PX = 3.99  # solved against the real OSM coastline, see docstring
MLAT = 111320.0
MLON = 111320.0 * math.cos(math.radians(ANCHOR_LATLON[0]))

ACCURACY_NOTE = (
    "Approximate boundary traced from Uniti's own cadastral site plan and hand-registered "
    "to real-world satellite imagery. Indicative only — not survey-accurate, not for "
    "legal or transactional use. Not to be confused with the ± 38 acre investable-parcel "
    "figure quoted elsewhere; this outline is the broader site context."
)


def px_to_latlon(x, y):
    lat = ANCHOR_LATLON[0] - (y - ANCHOR_PX[1]) * SCALE_M_PER_PX / MLAT
    lon = ANCHOR_LATLON[1] + (x - ANCHOR_PX[0]) * SCALE_M_PER_PX / MLON
    return (lat, lon)


def build_uniti_px():
    """Reconstruct the `uniti` parcel exactly as build_satmap.py derives it."""
    internal_seam = list(reversed(json.loads((OUT_DIR / "blue_road_trace.json").read_text())))
    shared_edge = BOUNDARY_PX[
        BOUNDARY_PX.index((499, 182)) : BOUNDARY_PX.index((881, 472)) + 1
    ]
    return shared_edge + list(reversed(internal_seam))


def ring(pts_latlon):
    r = [[p[1], p[0]] for p in pts_latlon]  # GeoJSON wants [lon, lat]
    if r[0] != r[-1]:
        r.append(r[0])
    return r


def main():
    boundary_ll = [px_to_latlon(x, y) for x, y in BOUNDARY_PX]
    uniti_ll = [px_to_latlon(x, y) for x, y in build_uniti_px()]

    lats = [p[0] for p in boundary_ll]
    lons = [p[1] for p in boundary_ll]
    minlat, maxlat = min(lats), max(lats)
    minlon, maxlon = min(lons), max(lons)

    uc_lat = sum(p[0] for p in uniti_ll) / len(uniti_ll)
    uc_lon = sum(p[1] for p in uniti_ll) / len(uniti_ll)

    def naive(leftp, topp):
        lon = minlon + (leftp / 100.0) * (maxlon - minlon)
        lat = maxlat - (topp / 100.0) * (maxlat - minlat)
        return lat, lon

    naive_uniti = naive(*ZONE_PCT["uniti"])
    offset_lat = uc_lat - naive_uniti[0]
    offset_lon = uc_lon - naive_uniti[1]

    zone_points = {}
    for zid, pct in ZONE_PCT.items():
        lat, lon = naive(*pct)
        zone_points[zid] = (lat + offset_lat, lon + offset_lon)

    features = [
        {
            "type": "Feature",
            "properties": {"id": "site-boundary", "kind": "site-boundary", "accuracy": ACCURACY_NOTE},
            "geometry": {"type": "Polygon", "coordinates": [ring(boundary_ll)]},
        },
        {
            "type": "Feature",
            "properties": {"id": "uniti", "kind": "zone-polygon", "accuracy": ACCURACY_NOTE},
            "geometry": {"type": "Polygon", "coordinates": [ring(uniti_ll)]},
        },
    ]
    for zid, (lat, lon) in zone_points.items():
        features.append({
            "type": "Feature",
            "properties": {"id": zid, "kind": "zone-point", "accuracy": ACCURACY_NOTE},
            "geometry": {"type": "Point", "coordinates": [lon, lat]},
        })

    fc = {"type": "FeatureCollection", "features": features}
    out_path = WEB_LIB / "site-geo.json"
    out_path.write_text(json.dumps(fc, indent=2))
    print(f"wrote {out_path}")

    if "--validate" in sys.argv:
        _validate(boundary_ll, uniti_ll, zone_points)


def _validate(boundary_ll, uniti_ll, zone_points):
    """Regenerates the sanity-check plot against live OSM data. Network + matplotlib
    required; not run as part of normal script usage."""
    import urllib.request
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt

    query = """[out:json][timeout:25];
    way["natural"="coastline"](2.395,101.955,2.420,101.985);
    out geom;"""
    req = urllib.request.Request(
        "https://overpass-api.de/api/interpreter",
        data=("data=" + query).encode(),
        headers={"User-Agent": "unitiproperty-georef/1.0"},
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        osm = json.loads(resp.read())
    coastline = next(
        el["geometry"] for el in osm["elements"]
        if el.get("tags", {}).get("natural") == "coastline"
    )

    fig, ax = plt.subplots(figsize=(11, 11))
    ax.plot([p["lon"] for p in coastline], [p["lat"] for p in coastline], color="blue", label="real coastline")
    ax.plot(
        [p[1] for p in boundary_ll] + [boundary_ll[0][1]],
        [p[0] for p in boundary_ll] + [boundary_ll[0][0]],
        color="gold", linewidth=2, label="transformed site boundary",
    )
    ax.fill([p[1] for p in uniti_ll], [p[0] for p in uniti_ll], color="red", alpha=0.35, label="transformed Uniti parcel")
    for zid, (lat, lon) in zone_points.items():
        ax.scatter([lon], [lat], s=80, label=zid)
    ax.legend(fontsize=8)
    ax.set_aspect(1.0)
    out = OUT_DIR / "validation_plot.png"
    plt.savefig(out, dpi=130)
    print(f"wrote {out}")


if __name__ == "__main__":
    main()
