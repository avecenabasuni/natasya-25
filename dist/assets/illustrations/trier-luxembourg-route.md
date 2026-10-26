# Our way there and back, V44

26 October 2026. A new geographically anchored scrapbook diagram replaces the earlier country-outline overview in the live map object. The owner confirms taking RE11 toward Luxembourg and L31 back toward Trier. No exact departure, fare, duration, boarding stop or bus terminal was supplied or inferred.

The diagram is a **schematic**, not a surveyed railway/road trace or navigation map. Sixteen verified railway-line locations determine the rose railway corridor. Two continuous rails and perpendicular sleepers distinguish it from the sage dashed L31 return connection. Intermediate line-location anchors are not all RE11 stops. City labels are simply Trier and Luxembourg; Wasserbillig supplies an intermediate geographic reference. The bus connection represents the known corridor and direction rather than a claimed road polyline.

## Sources and attribution

- Luxembourg railway-line coordinates: [ACF/CFL Network Statement 2027](https://acf.gouvernement.lu/dam-assets/sillon/documents-de-reference-du-reseau/2027/en-ns-2027-v10.pdf), Appendix2A, Line3, WGS84 table on page23. Numerical station-location facts are used; no PDF artwork is copied.
- Igel: [OpenStreetMap node3801053061](https://www.openstreetmap.org/node/3801053061).
- Kreuz Konz: [OpenStreetMap node700940389](https://www.openstreetmap.org/node/700940389).
- Trier Süd: [OpenStreetMap node4999323919](https://www.openstreetmap.org/node/4999323919).
- Representative Trier railway anchor: [Trier Hauptbahnhof location](https://en.wikipedia.org/wiki/Trier_Hauptbahnhof). It is not a claim that the owner used this exact bus terminal.
- Train corridor/service: [2025–26 CFL Luxembourg–Wasserbillig–Trier timetable](https://www.mobiliteit.lu/wp-content/uploads/horaires-new/cfl/2025-12-14/30.pdf?v=20251120).
- L31 service identity/corridor: [CFL works information](https://www.cfl.lu/en-gb/news/travaux-cfl). That notice describes separate August/September2026 works and direction-dependent terminals; it does not prove the owner's exact October service stops. The owner’s actual route statement supplies the journey modes/directions.

Map data © OpenStreetMap contributors, [ODbL attribution and license](https://www.openstreetmap.org/copyright). CFL/ACF sources are credited. A compact source attribution remains inside the map itself, with no caption or technical paragraph below either map figure. Detailed numerical data, source links and limitations are retained in [trier-luxembourg-route.json](trier-luxembourg-route.json).

## Construction and delivery

The editable vector is [trier-luxembourg-route.svg](trier-luxembourg-route.svg), 1000×650, north up. Projection: `x=60+(longitude−6.06)×1450`, `y=540−(mercator(latitude)−mercator(49.59))×180/π×1450`, with `mercator(latitude)=log(tan(π/4+latitude×π/360))`. Coordinates are rounded to0.1 output pixel. The diagram uses verified anchors connected schematically; the return curve is deliberately simplified. Direction arrows and semantic SVG route/from/to attributes distinguish the two journeys.

The delivered [WebP](trier-luxembourg-route.webp) is a complete1000×650 Chromium render with the site's actual local Source Sans3 font, encoded at quality94 without cropping or resizing. Size39,238bytes; SHA256 `a4c49c9aec5b3c4f432b97ba161a17418578c39e40f19e6acfc0073ab715ee00`. The font remains under its existing SIL OFL license in the fonts directory. Rendering adds no generated photo, external runtime dependency or invented geography. Reproduction and QA artifacts remain outside publication under `qa/v44/` and `/workspace/scratch/v44-route/`.

The new personal English opening uses the two supplied journey modes and the confirmed22–25 October visit. It invents no weather, café, seat or shared incident. Existing owner-written opening/trip notes remain full overrides in the reader, above the map. Names, personal photos, other memories and the purchased gift code remain as previously supplied or honest placeholders.
