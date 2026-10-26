# natasya-25

A personal birthday scrapbook made for a phone: pink cloth, paper pages, a hinged 3D cover, photographs, folded notes, five cats, racing/music/football keepsakes, and layered paper ornaments.

The current book has seven chapters: cover, Trier and Luxembourg, four days, photographs, a letter, the birthday celebration, and a gift. The trip is 22–25 October 2026; the birthday is 2 November 2026. Personal names, photographs, memories, songs, and the Amazon.de €25 gift code remain placeholders until supplied.

The journey page now keeps the owner-confirmed RE11 train toward Luxembourg and L31 bus return toward Trier in a geographically anchored memory-map schematic. A short personal English note sits above it, with no caption or technical prose below the main or opened map. Owner-written opening/trip notes remain overrides. [Map sources and construction](dist/assets/illustrations/trier-luxembourg-route.md) explain the verified anchors and simplified connections; this is not a surveyed navigation route or timetable.

Bonnie, Connie and Wonnie have separate paper illustrations based on the owner's photographs. Bonnie is predominantly white, with tabby head/foreleg markings, a pink nose and striped tail; Connie keeps the calico-tabby patches, white legs and grey collar/bell; Wonnie is a slender striped tabby with a white bib and paw socks. Their full stickers appear on the page and in both cat readers. Winnie and Minnie retain their existing artwork. [Illustration provenance](dist/assets/cutouts/PROVENANCE.md) records references and delivery details.

## Run locally

Opening a note, map, keepsake or personalisation dialog holds the book in place through the complete closing motion. Long dialog content scrolls independently. Pending page movement stops at its visible pose; viewport or motion-mode changes wait until the dialog closes.

No build step or package installation is needed. With Python 3 installed, run:

```sh
python3 -m http.server 4173 --directory dist
```

Open <http://localhost:4173>. Use <http://localhost:4173/?edit=1> for the personalisation editor.

## Personalise

Edit the shared defaults in [dist/config.js](dist/config.js), or use the editor to save changes in the current browser and import/export its JSON. Browser-local edits are not automatically shared with other visitors. The editor query parameter controls the interface; it is not authentication. Configuration shipped in `dist/` is visible to visitors.

## Implementation

- Buildless HTML, CSS, and JavaScript, with local Three.js and GSAP.
- Responsive paper layout designed around 375 × 667, with shorter-screen, reduced-motion, and graphics fallbacks.
- Local Fraunces and Source Sans 3 fonts, with the Pink + Sage material palette.
- Scroll or use the arrows to turn pages; replay reverses the book back to its cover.
- Open keepsakes from the page and drag downward to dismiss them.
- The personal letter and birthday wish stay folded shut on the page. Tap to unfold their complete writing; closing returns the same closed paper to the scrapbook. Other recap text remains visible.
- The birthday page plays its candle-controlled melody; extinguishing the candle unlocks the gift.
- Three illustrated racing stickers represent Ferrari, Lewis Hamilton and George Russell. Winnie, Bonnie, Connie, Wonnie, and Minnie keep their complete artwork.
- Sixteen original paper motifs supply 36 additional ornaments: bows, pressed flowers, souvenir stamps, rail tickets, washi tape, wax seals, music and racing details. Decorations follow the page turns and leave the reading column and touch targets clear; continuation leaves use a sparse margin treatment.
- Seven caption-free face stickers use credited official Formula 1 portraits: Alex Albon, Lewis Hamilton, George Russell, Lando Norris and Oscar Piastri across the cover, trip, photographs and gift pages. Their measured head-and-neck windows retain the complete faces.
- Real photos of Taylor Swift, Olivia Rodrigo, Olivia Dean and Sienna Spiro replace the former guitar/microphone symbols. Lionel Messi, Lamine Yamal and the actual FC Barcelona crest also join the scrapbook. The 53 decorations use measured source windows, physical page attachments and no added captions. [Photo credits and licenses](dist/assets/FANDOM-PHOTOS.md) distinguish Creative Commons media from other credited photographs.
- Three compact collages group the football trio and two singer pairs, with clear space around the cake, letter and gift pocket. Photographs share a restrained warm finish in native CSS and cached scene prints. Paper-edge fibres, slight corner relief and cover stitching stay in the physical margins, with no extra idle animation.

Publish the contents of `dist/` with a static hosting provider. This repository contains the current application source and supporting documentation; local QA captures, deployment archives, credentials, and the original Sites hosting binding are excluded.

## Project notes and credits

- [DESIGN.md](DESIGN.md): design direction and implementation decisions.
- [VALIDATION.md](VALIDATION.md): current validation and historical verification limits. Referenced local QA artifacts are excluded from this repository.
- [Asset credits](dist/assets/ASSET-CREDITS.md): artwork, geographic data, fonts, and licenses. Vendor license files are included alongside their libraries.
