# A little world

A personal birthday scrapbook from Ave to Tasya, made for a phone: a pink birthday-collage cover, hinged 3D board, paper pages, photographs, folded notes, five cats and racing/music/football keepsakes.

A short pink-linen introduction prepares the actual page images, fonts, materials, reader maps, styles, scene textures and recorded-audio bytes before revealing the cover. It uses real completion rather than a fixed loading sequence or invented percentage. The book stays measurable behind the introduction and cannot be turned early. Failed or prolonged preparation offers Retry, with an explicit native-reading continuation once the page structure exists. Warm/reduced reading exits quickly; sounds retain trusted-gesture playback.

The seven chapters follow the cover, Trier and Luxembourg, four days, photographs, a letter, the birthday celebration and one last note. The trip is 22–25 October 2026; the birthday is 2 November 2026. The shared song is The One I Choose by Devin Velez. The final envelope names the heated blanket as his gift and connects it to a hug from him, with no delivery or pickup details. Other personal names, photographs and memories remain explicit placeholders until supplied.

## Image-first cover

The front uses a generated birthday collage inspired by the owner's supplied reference. Each cutout letter has a different magazine type style; birthday kittens, bows, strawberries, flowers and cake surround a Polaroid containing the owner's supplied Tasya portrait-bouquet photo. The full photograph fits inside the tilted print. The larger editable “For Tasya” dedication sits on a cream paper label over the lower wrapping paper, while the birthday date stays on the Polaroid border. The same composition appears in native reading and on the real hinged 3D cover, including animated opening and reverse replay.

Opening the cover and turning a leaf play short recorded book-page sounds after a trusted browser interaction. Two self-hosted MP3s come from StarNinjas' CC0 collection on OpenGameArt; their original pitch and complete movement are retained, with softened edges and restrained volume. [Audio provenance](dist/assets/audio/README.md) records the source and processing. Left-to-right camera pans stay silent. The sound button mutes both music and paper; background music remains initially off. A single replaceable effect avoids overlapping rustles during rapid navigation, and hidden/disposed readers cancel sound. Happy Birthday still follows the birthday leaf and stops when the candle is blown out.

The cover kittens are decorative characters. The five named cats inside retain their distinct existing artwork. The eight former front ornaments are replaced by the collage; the current interior retains 13 named portrait/crest instances alongside the paper decoration. All 53 original source entries remain available. [Cover provenance](dist/assets/illustrations/birthday-collage-cover.md) records source and delivery details.

The birthday is her 25th. A new transparent paper/foil collection adds silver 25 balloons on the cover and celebration leaf, bunting, stars, heart postage, romantic cards, camera, disco ball, varied-type phrases and a red/blue toy-car couple. The current arrangement has 50 interior pieces and one attached cover piece, plus the baked cover collage. Fifteen new placements replace nine minor earlier ornaments; all 53 original collection entries and 13 interior portrait/crest instances remain. The pieces follow the existing physical hinge/page motion and have no added captions. [Birthday ephemera provenance](dist/assets/cutouts/birthday-25-ephemera.md) records the source and complete frames.

The further romantic reference is adapted for his girlfriend with a plush penguin pair, lipstick kisses, a rose heart, balloons and “my girl” paper. Seven placements replace seven small earlier motifs, preserving the same overall density and all earlier source records. [Romantic keepsake provenance](dist/assets/cutouts/romance-keepsakes.md) documents the original generated sheet. The independent editable “Our song” paper keepsake contains only The One I Choose by Devin Velez and the [official listening release](https://music.apple.com/us/album/the-one-i-choose-single/6791815005). Its source and lifted reader use the same cream paper mount and printed title. Other artists remain in the decorative portrait collages, without song descriptions or playlist entries. Retired artist fields survive existing-data import, save and export. [Song provenance](dist/assets/memorable-song.md) explains the listening link and unchanged candle/ambient behavior.

## Personal details and keepsakes

The journey map shows the owner-confirmed RE11 train toward Luxembourg and L31 bus return toward Trier as a geographically anchored memory schematic. Personal English writing sits above it, without a caption below it. [Map sources](dist/assets/illustrations/trier-luxembourg-route.md) document the verified anchors and simplified connections.

The dated recap contains photographs, dates and locations. The three real food memories are kept in “What we ate” inside the map reader: Trier katsu and his nuggets, morning bread followed by Yangguofu Malatang and Airbnb Indomie, then skipped breakfast, O'Tacos and the Aldi Trier dinner stop. The regional RE11/L31 map opens into two more city maps. All eleven owner-confirmed Luxembourg places are pinned and labelled directly on the Luxembourg map; Hauptmarkt and its surrounding streets appear on the Trier map. No exact walking route or sightseeing chronology is invented. Custom photo captions remain intact. [Trip sources](dist/assets/trip-recap.md) record the account and checked place spellings. [Luxembourg map provenance](dist/assets/illustrations/luxembourg-keepsake-map.md) and [Trier map provenance](dist/assets/illustrations/trier-keepsake-map.md) record their open vector geography.

Bonnie, Connie and Wonnie have separate full-body paper illustrations based on the owner's photos. Winnie and Minnie retain their existing artwork. Page and cat readers share complete sources. Each individual cat opens a distinct English birthday note based on the owner's real description: food-loving, lazy Winnie is Tasya's second favourite; Bonnie loves other-cat playtime; Connie is shy; favourite Wonnie wanders and loves pampering; little Minnie loves playing with Tasya. The family opens all five as her birthday committee. Fur descriptions stay in image alternatives instead of visible biographies. [Illustration provenance](dist/assets/cutouts/PROVENANCE.md) records references and delivery details.

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
- Every spread opens on an image-based left divider; scroll or Next crosses to the right-hand keepsakes before turning the next sheet. Previous retraces both sides; replay reverses the pans and page turns before closing the cover.
- Dividers introduce the spreads; right-hand paper omits repeated chapter labels and printed name/page-number footers. The photograph leaf leads with its mount and writing, with its heading retained for accessibility.
- Every tappable keepsake has a soft rose/mauve halo before touch. Glints appear on the first ready reading frame, then continuously circle the current objects on a shared 3.6-second clock with staggered positions and no pause between laps. Decorative stickers/dividers stay unmarked, movement or a reader suspends the loop, and reduced motion keeps the static colored halo.
- “Open the book” and “Read from the cover” share one button style and stage-bottom position. The final action sits outside the printed gift page, with Previous page reachable beside it; native reading places it beneath the gift sheet.
- Tap keepsakes to open them from their paper source; drag down, use Escape or the close button to dismiss.
- Important personal notes stay folded until opened. Long reader content scrolls independently while the book stays held through the full closing motion.
- The birthday melody follows the candle; extinguishing it unlocks “One last note.” Its message stays hidden until the envelope is opened, and its card extracts from the pink pocket.
- Native semantic text and focus controls accompany the scene. Software-browser evidence does not certify physical iPhone GPU performance.

Offscreen page printing uses fixed coordinates while images load, so turning the visible book cannot shift its prepared text or attachments. Viewport changes wait for page preparation and navigation to settle before rebuilding. Failed image requests can retry on a later rebuild, and interrupted graphics preparation falls back to a usable CSS book.

Publish `dist/` with a static host. This repository contains application source and supporting documentation; local QA captures, deployment archives, credentials and the original Sites hosting binding are excluded from the GitHub export.

[DESIGN.md](DESIGN.md) records the direction. [VALIDATION.md](VALIDATION.md) records current checks and historical limits. [Asset credits](dist/assets/ASSET-CREDITS.md) cover artwork, geographic data, fonts and media licenses.
