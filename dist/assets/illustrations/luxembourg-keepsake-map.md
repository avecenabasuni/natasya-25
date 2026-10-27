# Luxembourg: the places we went

Original static geographic visualization created from actual OpenStreetMap geometry for this personal scrapbook. The owner supplied the visited places; the map does not invent a visit order, exact walking trail or restaurant branch.

Logical canvas: **420 × 920**. Delivery raster: **1260 × 2760**, rendered at 3× and encoded as WebP quality94. Primary place labels are **20 logical pixels** using local Source Sans 3; city title uses local Fraunces. At a 278-pixel reader width, primary place type is approximately13.2screen pixels. SVG embeds the existing OFL font subsets, so its type does not depend on a remote font service.

The projection is north-up spherical Mercator with one uniform x/y scale. Geographic pin coordinates, projected output positions, map frame/bounds, label rectangles and independently browser-measured text boxes are recorded in the companion JSON. All twelve source anchors across the two maps reproject exactly; no pin intersects a label box and all measured label text stays within the canvas.

The street, water and park paths come from the source OSM extracts. Labels use callout leaders to preserve readable type without moving the geographic pins. The image contains no personal trip photograph and no generated pictorial likeness.

## Source places

- **Ville Haute**: 6.1286101, 49.6123988. district label point; representative of district, not the couple’s exact position. Source: https://www.openstreetmap.org/node/1374388907
- **Hämmelsmarsch · Wil Lofy**: 6.1311725, 49.6118595. mapped fountain/artwork point. Source: https://www.openstreetmap.org/node/370599998
- **Place Guillaume II**: 6.1308936, 49.6106261. square polygon centroid. Source: https://www.openstreetmap.org/way/24387570
- **Place de la Constitution**: 6.1293436, 49.6092445. square outer polygon centroid. Source: https://www.openstreetmap.org/relation/7606983
- **Pont Adolphe**: 6.1269274, 49.6084605. bridge outline centroid. Source: https://www.openstreetmap.org/way/503090622
- **Plateau Bourbon**: 6.1286516, 49.6051541. locality label point; representative of area, not the couple’s exact position. Source: https://www.openstreetmap.org/node/3805227459
- **Palais Grand-Ducal**: 6.1329315, 49.6109829. palace building outline centroid. Source: https://www.openstreetmap.org/way/9653074
- **Notre-Dame Cathedral**: 6.1315567, 49.6098109. mapped place-of-worship point. Source: https://www.openstreetmap.org/node/13917701491
- **Place de Clairefontaine**: 6.1325441, 49.6098488. square polygon centroid. Source: https://www.openstreetmap.org/way/24387542
- **Chemin de la Corniche**: 6.1339049, 49.6093102. length midpoint of one named street section; representative of path, not full visited route. Source: https://www.openstreetmap.org/way/26450709
- **Pont du Grund**: 6.1357442, 49.608664. length midpoint of Rue Munster bridge segment. Source: https://www.openstreetmap.org/way/9646328; https://www.luxembourg-city.com/en/about-luxembourg-city/meng-stad-my-city/details/the-10-must-see-bridges-in-luxembourg-city

## Attribution and files

Map data: **© OpenStreetMap contributors**, licensed under [ODbL](https://www.openstreetmap.org/copyright). Attribution is printed inside the artwork. Complete source references and source hashes are in the JSON. The local font license files remain in `assets/fonts/`.

- SVG: `luxembourg-keepsake-map.svg`, SHA256 `663a2f323b1a5aba9663f3f9f82db5bbf5f16a1cb66ead62ed0664630bbe5823`.
- WebP: `luxembourg-keepsake-map.webp`, SHA256 `1adb6157c51056d9ffe6849afeb8809a69ec8ec3fefa5ddf79c2b3d6adb40bc5`, 211,560 bytes.
- Projection/source/bounds proof: `luxembourg-keepsake-map.json`.
- Reproducible renderer: `qa/v55/render-city-maps.py` (local QA tooling; not required by the live site).

No caption or technical caveat is printed beneath the map. City titles/subtitles and the required OSM attribution remain inside the artwork.
