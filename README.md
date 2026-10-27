# A little world

A personal birthday scrapbook made for a phone: a pink birthday-collage cover, hinged 3D board, paper pages, photographs, folded notes, five cats and racing/music/football keepsakes.

The seven chapters follow the cover, Trier and Luxembourg, four days, photographs, a letter, the birthday celebration and a gift. The trip is 22–25 October 2026; the birthday is 2 November 2026. Personal names, photographs, memories, songs and the Amazon.de €25 gift code remain explicit placeholders until supplied.

## Image-first cover

The front uses one generated birthday collage inspired by the owner's supplied reference. Each cutout letter has a different magazine type style; birthday kittens, bows, strawberries, flowers and cake surround a blank Polaroid. The editable recipient name and birthday date sit within that paper frame. The same complete artwork appears in native reading and on the real hinged 3D cover, including animated opening and reverse replay.

The cover kittens are decorative characters. The five named cats inside retain their distinct existing artwork. The eight former front ornaments are replaced by the collage; the current interior retains 13 named portrait/crest instances alongside the paper decoration. All 53 original source entries remain available. [Cover provenance](dist/assets/illustrations/birthday-collage-cover.md) records source and delivery details.

The birthday is her 25th. A new transparent paper/foil collection adds silver 25 balloons on the cover and celebration leaf, bunting, stars, heart postage, romantic cards, camera, disco ball, varied-type phrases and a red/blue toy-car couple. The current arrangement has 50 interior pieces and one attached cover piece, plus the baked cover collage. Fifteen new placements replace nine minor earlier ornaments; all 53 original collection entries and 13 interior portrait/crest instances remain. The pieces follow the existing physical hinge/page motion and have no added captions. [Birthday ephemera provenance](dist/assets/cutouts/birthday-25-ephemera.md) records the source and complete frames.

## Personal details and keepsakes

The journey map shows the owner-confirmed RE11 train toward Luxembourg and L31 bus return toward Trier as a geographically anchored memory schematic. Personal English writing sits above it, without a caption below it. [Map sources](dist/assets/illustrations/trier-luxembourg-route.md) document the verified anchors and simplified connections.

Bonnie, Connie and Wonnie have separate full-body paper illustrations based on the owner's photos. Winnie and Minnie retain their existing artwork. Page and cat readers share complete sources. [Illustration provenance](dist/assets/cutouts/PROVENANCE.md) records references and delivery details.

The interior includes credited portraits of Alex Albon, Lewis Hamilton, George Russell, Lando Norris, Oscar Piastri, Taylor Swift, Olivia Rodrigo, Olivia Dean, Sienna Spiro, Lionel Messi and Lamine Yamal, plus the actual FC Barcelona crest. Six driver portrait instances remain on the interior pages; Alex now appears on the gift page. Football and singer collages share a restrained warm finish. [Photo credits](dist/assets/FANDOM-PHOTOS.md) distinguish Creative Commons media from other credited photographs.

## Run locally

No build step or package installation is needed. With Python 3 installed, run:

```sh
python3 -m http.server 4173 --directory dist
```

Open <http://localhost:4173>. Use <http://localhost:4173/?edit=1> for the personalisation editor.

Edit shared defaults in [dist/config.js](dist/config.js), or use the editor to save changes in the current browser and import/export its JSON. Browser-local edits do not automatically reach other visitors. The editor query controls the interface; it is not authentication. Configuration shipped in `dist/` is visible to visitors.

## Interaction and rendering

- Buildless HTML/CSS/JavaScript with local Three.js, GSAP, Fraunces and Source Sans 3.
- Pink + Sage paper materials, designed around 375 × 667, with shorter-screen, reduced-motion and graphics fallbacks.
- Scroll or use arrows to turn pages; replay reverses each page and closes the cover.
- Tap keepsakes to open them from their paper source; drag down, use Escape or the close button to dismiss.
- Important personal notes stay folded until opened. Long reader content scrolls independently while the book stays held through the full closing motion.
- The birthday melody follows the candle; extinguishing it unlocks the final Amazon.de gift.
- Native semantic text and focus controls accompany the scene. Software-browser evidence does not certify physical iPhone GPU performance.

Publish `dist/` with a static host. This repository contains application source and supporting documentation; local QA captures, deployment archives, credentials and the original Sites hosting binding are excluded from the GitHub export.

[DESIGN.md](DESIGN.md) records the direction. [VALIDATION.md](VALIDATION.md) records current checks and historical limits. [Asset credits](dist/assets/ASSET-CREDITS.md) cover artwork, geographic data, fonts and media licenses.
