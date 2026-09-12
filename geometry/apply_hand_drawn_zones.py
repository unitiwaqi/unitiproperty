"""
Writes web/src/lib/site-geo.json from geometry/hand-drawn-zones.geojson -- the output of
the /calibrate draw tool (web/src/app/calibrate/DrawView.tsx), where each vertex was placed
by hand directly against real Esri satellite imagery. Unlike apply_parcel_polygons.py,
there is NO pixel->lat/lon transform here: the draw tool edits real lng/lat directly on the
map, so this script only re-attaches the accuracy note and writes the file.

Run this INSTEAD OF apply_parcel_polygons.py once hand-drawn-zones.geojson exists --
apply_parcel_polygons.py refuses to run while that file is present, specifically so it
can't silently clobber hand-traced work with a re-run of the old transform pipeline.

Usage: python3 geometry/apply_hand_drawn_zones.py
"""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HAND_DRAWN = ROOT / "geometry" / "hand-drawn-zones.geojson"
OUT = ROOT / "web" / "src" / "lib" / "site-geo.json"

ACCURACY_NOTE = (
    "Boundary hand-traced against real Esri World Imagery satellite tiles (not the older "
    "cadastral-plan-plus-transform pipeline -- see geometry/apply_parcel_polygons.py for "
    "that superseded approach). Each vertex was placed by eye directly on the imagery, so "
    "accuracy follows visible land features (road edges, tree lines, cleared ground) at "
    "whatever the satellite tile resolution supports there -- typically single-digit to "
    "low-tens of metres, but not measured/validated the way the transform pipeline's "
    "residual was. Indicative only -- not survey-accurate, not for legal or transactional "
    "use. Not to be confused with the +/- 38 acre investable-parcel figure quoted "
    "elsewhere; the site-boundary outline is the broader site context."
)


def main():
    if not HAND_DRAWN.exists():
        raise SystemExit(
            f"{HAND_DRAWN} doesn't exist yet -- use the /calibrate draw tool's "
            "\"Save to geometry/hand-drawn-zones.geojson\" button first."
        )
    fc = json.loads(HAND_DRAWN.read_text())
    for f in fc["features"]:
        f["properties"]["accuracy"] = ACCURACY_NOTE

    OUT.write_text(json.dumps(fc, indent=2))
    print(f"wrote {OUT} ({len(fc['features'])} features)")
    print(
        "Reminder: web/src/components/explore/GeoMap.tsx has its own hardcoded on-map "
        "disclaimer text (the '~30-60m' figure) describing the OLD transform pipeline -- "
        "update that copy to match ACCURACY_NOTE above before shipping this."
    )


if __name__ == "__main__":
    main()
