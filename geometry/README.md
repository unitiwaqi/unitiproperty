# Rebuilt parcel outlines

First-stage image-space boundary rebuild, 2026-09-11. This replaces the incomplete tracing workflow as the candidate geometry source. It has NOT replaced any Blender scene.

**Update, same day:** `apply_parcel_polygons.py` (this directory) *has* now chained the 5 investable zones' polygons here through `../output/georeference_zones.py`'s pixel→lat/lon transform and replaced `web/src/lib/site-geo.json` — on explicit request, after re-validating this specific output against live OSM data (see `parcel-geo-validation.png`: Uniti parcel still overlaps the real Kolej UNITI campus, site boundary still hugs the real coastline). See that script's docstring for the full reasoning — the transform itself is unchanged from before (same coarse anchor+scale+rotation, not a proper independent calibration of this registration), so the accuracy caveats below still apply in full; only the "has NOT replaced" claim above is now out of date.

**Update, same day (2):** user reported the live map "not properly aligned". Investigated with
real ground truth (OSM road/coastline geometry, cross-checked against both satMap.png and
Esri World Imagery — see `alignment-evidence.png`) rather than re-guessing. Conclusion: the
georeferencing is not broken. Rendering OSM's real N143/M143/138 road geometry through this
transform traces the visible roads with no detectable drift over the site's full ~2 km span.
The site boundary sits on land in both satMap.png and Esri imagery at every corner checked —
the two sources simply disagree about exactly where the waterline is (different capture
dates/tidal states on a tidal mudflat estuary), which is not a registration error. Measured
coastline residual against OSM is median 69m / mean 79m — real, and now stated in
`apply_parcel_polygons.py`'s `ACCURACY_NOTE`, but an upper bound rather than the true error
(OSM's coastline there is itself generalised). A gradient cross-correlation between
satMap.png and Esri was also tried and rejected — satMap.png's burned-in vector annotations
(dashed boundary, road line, labels) dominate that kind of score and it proposed a "fix" that
made both physical checks worse. Full writeup in `apply_parcel_polygons.py`'s
`MEASURED RESIDUAL` comment block. No geometry changed as a result of this investigation.

## Review

- `boundmap-parcels-review.png`: outlines over the 1201 × 1154 source raster embedded in boundMap.svg.
- `satmap-parcels-review.png`: outlines registered to satMap.png, with the independently retraced white dashed boundary in yellow.
- `boundmap-parcels.pixels.json`: eight source polygons.
- `satmap-parcels.pixels.json`: eight registered polygons plus the site boundary.
- `registration.json`: every source/target landmark pair and registration method.
- `validation.json`: geometry validity, overlap checks and clipping amounts.

Coordinates are image pixels, origin at top left. Although the files use GeoJSON-shaped FeatureCollections, they are NOT geographic GeoJSON and must not be passed to MapLibre as longitude/latitude.

## Areas

UNITI, Sembilan Marine Resort, TNB/tank reserve, southern LRK, Walit, Dynac Nature Tourism, Sembilan Shipyard, and P.E. The P.E. label is preserved without interpreting its meaning. TNB and its tank area are grouped: separate legal boundaries are not established by the supplied raster. Internal lot subdivisions and the northern LRK label inside UNITI have not been separated from their parent area. Access corridors remain intentional gaps.

## Registration and limits

The outer boundary is traced from the white dashes, not the waterline. Source parcel outlines are traced from the higher-resolution boundMap raster. A piecewise affine mapping uses visible boundary corners, coastal bends and arc-length samples along the previously user-confirmed road annotation. The northwest annotation endpoint is adjusted from (464.54,232.53) to (468,232.5), a ~3.5 pixel correction necessary to keep the local registration from folding. Correspondences between the two images are visual estimates; arc-length matching is also an assumption. Local shapes can be distorted by this registration.

Mapped parcels are clipped to the independently traced site outline. Clipping amounts are disclosed in validation.json; a passing geometry test does not validate land ownership or positional accuracy. These are reviewable image-aligned drafts, not survey boundaries.

The old georeference_zones.py transform (3.99 metres/pixel plus one OSM anchor) is deliberately not applied. Its absolute alignment must be independently calibrated before replacing web/src/lib/site-geo.json. No speculative latitude/longitude is introduced in this rebuild.

## Reproduce

Python dependencies: Pillow, numpy, scipy, shapely. Run `python geometry/rebuild_parcels.py` from the repository root. The script reads output/boundMap_embedded.png (decoded from the embedded base64 raster in boundMap.svg), satMap.png, and output/blue_road_trace.json. Geometry definitions and landmark pairs are stored in the script and exported in JSON for downstream use.

For Blender's current image-space convention, convert satellite pixels with x=(pixel_x-684.5)/10 and y=(384-pixel_y)/10. This does not establish real-world scale.
