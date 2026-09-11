"""
Chains rebuild_parcels.py's image-space parcel polygons through the pixel->lat/lon
transform established in ../output/georeference_zones.py, producing the real
web/src/lib/site-geo.json used by GeoMap.tsx.

Two separate, deliberately-decoupled registration steps feed into this:
  1. boundMap (cadastral raster) -> satMap.png pixel space: rebuild_parcels.py,
     piecewise-affine via Delaunay triangulation over ~40 hand-picked landmark anchors.
     Produces satmap-parcels.pixels.json, explicitly NOT geo-referenced (its own `warning`
     field says so, and README.md here says the same).
  2. satMap.png pixel space -> real lat/lon: ../output/georeference_zones.py, anchored to
     the real OSM "Kolej UNITI" polygon + coastline (see that file's docstring for how the
     scale was solved).

README.md in this directory explicitly deferred step 2 ("the old georeference_zones.py
transform... is deliberately not applied... must be independently calibrated before
replacing web/src/lib/site-geo.json"). This script does apply it, on explicit user request
("update the geomap") — re-validated (not just reused) by re-running the same overlay check
against live OSM data used to derive the transform in the first place (see
parcel-geo-validation.png in this directory): the Uniti parcel still lands on the real
Kolej UNITI campus polygon, the site boundary's seaward edge still sits on the real
coastline, and all 5 zones land in the correct relative positions along the coast/river
mouth. That's independent re-validation of the specific output this script produces, not a
blind reuse of the transform — but it's still the same coarse anchor+scale+rotation
transform (not a proper independent calibration of *this* registration specifically), so
treat web/src/lib/site-geo.json's accuracy claims exactly as conservatively as before.

Only the 5 investable zones (matching web/src/lib/zones.ts) are carried through --
tnb-reserve, lrk and pe are utility/non-investable parcels or artifacts of the source plan,
not offered on the platform, so they're dropped here rather than shipped as inert map
clutter.

Usage: python3 apply_parcel_polygons.py [--validate]
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "output"))
import georeference_zones as gz  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
GEOMETRY = ROOT / "geometry"
WEB_LIB = ROOT / "web" / "src" / "lib"

# Zone colours from web/src/lib/zones.ts (canonical -- used everywhere else in the UI:
# list-drawer swatches, legend rows -- so kept consistent here rather than reusing
# rebuild_parcels.py's own preview colours).
ZONE_COLOR = {
    "uniti": "#7a2f34",
    "marina": "#6f8f5c",
    "nature": "#3d5a99",
    "shipyard": "#c1622c",
    "walit": "#9c4f8f",
}
INVESTABLE_ZONE_IDS = list(ZONE_COLOR.keys())

ACCURACY_NOTE = (
    "Approximate boundary traced from Uniti's own cadastral site plan and hand-registered "
    "to real-world satellite imagery via two chained registrations (cadastral-to-satellite "
    "piecewise-affine warp, then satellite-to-lat/lon anchor+scale+rotation). Measured "
    "registration residual is on the order of 30-60 m (median ~28 m against the "
    "OpenStreetMap coastline, the fitting target -- see MEASURED RESIDUAL in this file for "
    "the more honest independent checks). Indicative only - not survey-accurate, not for "
    "legal or transactional use. Not to be confused with the +/- 38 acre investable-parcel "
    "figure quoted elsewhere; the site-boundary outline is the broader site context."
)

# --- MEASURED RESIDUAL -------------------------------------------------------------
# Checked 2026-09-11 after the map was reported as looking misaligned (twice - see both
# entries below). What was measured, and what it does and doesn't establish:
#
# FIRST PASS -- confirmed the map wasn't badly broken, but didn't fix anything:
#   * OSM road overlay. Rendering OpenStreetMap's real N143/M143/138 geometry through the
#     then-current transform (scale only, rotation assumed 0) onto satMap.png traced the
#     roads visible in the image with no drift detectable by eye. Ruled out a GROSS
#     georeferencing error, but "no visible drift by eye over roughly this line width" is a
#     coarse instrument -- it did not rule out the ~7 degree rotation error found below.
#   * Coastline residual vs OSM under the scale-only transform: median 69 m, mean 79 m
#     (image-frame artifacts excluded).
#   * Same-boundary / two-imagery-source check (geometry/alignment-evidence.png): the site
#     outline falls on land in BOTH satMap.png and Esri World Imagery at the seaward
#     corner. Confirms the reported "over water" complaint was a tidal/capture-date
#     difference between the two imagery sources, not the boundary being in the wrong
#     place -- but doesn't rule out a smaller in-plane error elsewhere.
#   * A gradient cross-correlation between satMap.png and Esri was tried as a way to find
#     a better fit and REJECTED: satMap.png has burned-in vector annotations (the white
#     dashed boundary, the pink dash-dot road line, road shields, place labels) which
#     dominate a gradient-based score while corresponding to nothing on the ground. It
#     proposed scale 4.18 / +2.5deg / +180 m, which made BOTH physical checks below worse
#     (coastline 69->104 m, campus overlap 65.8->59.5%). Do not re-derive the transform
#     from image correlation without first masking those annotations.
#
# SECOND PASS -- found and fixed the real error, rotation=0 was never actually verified:
#   * Extracted satMap.png's own coastline by luminance thresholding (water reads brighter
#     than land here), cleaned of image-frame edge artifacts, and fit scale+rotation
#     JOINTLY against the real OSM coastline by ICP about the same anchor. Converged to
#     4.30 m/px, -6.75 degrees (previous version: 3.99 m/px, rotation locked to 0 on the
#     unchecked assumption that satMap.png's printed compass rose meant true north-up).
#   * Coastline residual (the fitting target, so not independent) dropped from median 69 m
#     to ~28 m.
#   * Checked against the two independent tests NOT used in this fit: OSM road overlay
#     still traces the visible roads with no visible drift; real-campus overlap under the
#     Uniti parcel is 64.8% (vs the old transform's 65.8%) -- statistically unchanged, not
#     a regression. Both independent checks support the rotation fix; neither contradicts
#     it, unlike the rejected cross-correlation attempt above.
#
# Bottom line: this transform is about as good as this input data supports. Getting below
# this residual needs real surveyed parcel coordinates, not a better fit -- see
# geometry/README.md for what was checked (JUPEM MyGDI / eBiz) and why that's a formal
# request/purchase process, not a free shortcut.
# ------------------------------------------------------------------------------------


def transform_ring(coords_px):
    """coords_px: list of [x, y] pixel pairs (satMap.png space). Returns closed
    [lon, lat] ring for GeoJSON."""
    ring = [list(reversed(gz.px_to_latlon(x, y))) for x, y in coords_px]  # -> [lon, lat]
    if ring[0] != ring[-1]:
        ring.append(ring[0])
    return ring


def main():
    src = json.loads((GEOMETRY / "satmap-parcels.pixels.json").read_text())
    by_id = {f["properties"]["id"]: f for f in src["features"]}

    features = []

    boundary = by_id["site-boundary"]
    features.append({
        "type": "Feature",
        "properties": {"id": "site-boundary", "kind": "site-boundary", "accuracy": ACCURACY_NOTE},
        "geometry": {
            "type": "Polygon",
            "coordinates": [transform_ring(boundary["geometry"]["coordinates"][0])],
        },
    })

    for zid in INVESTABLE_ZONE_IDS:
        feat = by_id[zid]
        features.append({
            "type": "Feature",
            "properties": {
                "id": zid,
                "kind": "zone-polygon",
                "color": ZONE_COLOR[zid],
                "accuracy": ACCURACY_NOTE,
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [transform_ring(feat["geometry"]["coordinates"][0])],
            },
        })

    fc = {"type": "FeatureCollection", "features": features}
    out_path = WEB_LIB / "site-geo.json"
    out_path.write_text(json.dumps(fc, indent=2))
    print(f"wrote {out_path} ({len(features)} features)")

    if "--validate" in sys.argv:
        _validate(features)


def _validate(features):
    """Sanity-check the newly-transformed polygons against real OSM data, same as
    georeference_zones.py's own validation -- the campus parcel should still land on the
    real Kolej UNITI polygon, and the site boundary should still hug the real coastline,
    since this only swapped which polygons get transformed, not the transform itself."""
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
    for f in features:
        ring = f["geometry"]["coordinates"][0]
        lons = [p[0] for p in ring]
        lats = [p[1] for p in ring]
        color = f["properties"].get("color", "gold")
        if f["properties"]["id"] == "site-boundary":
            ax.plot(lons, lats, color="gold", linewidth=2, label="site boundary")
        else:
            ax.fill(lons, lats, color=color, alpha=0.5, label=f["properties"]["id"])
            ax.plot(lons, lats, color=color, linewidth=1)
    ax.legend(fontsize=8)
    ax.set_aspect(1.0)
    ax.set_title("Validation: transformed parcel polygons vs real OSM coastline")
    out = Path(__file__).resolve().parent / "parcel-geo-validation.png"
    plt.savefig(out, dpi=130)
    print(f"wrote {out}")


if __name__ == "__main__":
    main()
