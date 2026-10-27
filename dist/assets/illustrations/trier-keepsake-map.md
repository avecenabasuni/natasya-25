# Trier: around Hauptmarkt

Original static geographic visualization created from actual OpenStreetMap geometry for this personal scrapbook. The owner supplied the visited places; the map does not invent a visit order, exact walking trail or restaurant branch.

Logical canvas: **420 × 660**. Delivery raster: **1260 × 1980**, rendered at 3× and encoded as WebP quality94. Primary place labels are **20 logical pixels** using local Source Sans 3; city title uses local Fraunces. At a 278-pixel reader width, primary place type is approximately13.2screen pixels. SVG embeds the existing OFL font subsets, so its type does not depend on a remote font service.

The projection is north-up spherical Mercator with one uniform x/y scale. Geographic pin coordinates, projected output positions, map frame/bounds, label rectangles and independently browser-measured text boxes are recorded in the companion JSON. All twelve source anchors across the two maps reproject exactly; no pin intersects a label box and all measured label text stays within the canvas.

The street, water and park paths come from the source OSM extracts. Labels use callout leaders to preserve readable type without moving the geographic pins. The image contains no personal trip photograph and no generated pictorial likeness.

## Source places

- **Hauptmarkt**: 6.6411602, 49.756765. mapped marketplace point inside Hauptmarkt; representative of area walked, not an exact trail. Source: https://www.openstreetmap.org/node/5761430684

The square highlight follows the outer and inner rings of [OSM relation6915864](https://www.openstreetmap.org/relation/6915864). Surrounding street geometry is context; no line claims to trace the owner's walk.

## Attribution and files

Map data: **© OpenStreetMap contributors**, licensed under [ODbL](https://www.openstreetmap.org/copyright). Attribution is printed inside the artwork. Complete source references and source hashes are in the JSON. The local font license files remain in `assets/fonts/`.

- SVG: `trier-keepsake-map.svg`, SHA256 `10dad2a90e66d6d0ca1455463ecf430f2be8cc947cbce80e85c3bbec52682d25`.
- WebP: `trier-keepsake-map.webp`, SHA256 `6c5ffb27daaa47150fda40bd21bd2815495880590ac01fddebb480103aaaa2c6`, 115,448 bytes.
- Projection/source/bounds proof: `trier-keepsake-map.json`.
- Reproducible renderer: `qa/v55/render-city-maps.py` (local QA tooling; not required by the live site).

No caption or technical caveat is printed beneath the map. City titles/subtitles and the required OSM attribution remain inside the artwork.
