# Scrapbook colour research

15 October 2026. A focused update to the existing pink Trier scrapbook, using the already selected Antislop during and Taste guidance.

## What the references support

[Papier's Our Story album](https://www.papier.com/us/our-story-54543) is a relevant analogue travel/birthday keepsake reference, available in pink with a deliberately simple printed cover. [Graf von Faber-Castell's pink linen-bound notebook](https://www.graf-von-faber-castell.com/products/LinenboundbookA5ElectricPink/188669) supports the choice of coloured cloth rather than a glossy digital gradient. The notebook product page did not expose its full details in the text browser; its indexed title supports the pink linen reference only. No reference image is copied into the application.

[Radix's colour roles](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale) distinguish backgrounds, component states, boundaries, solid actions and text. Apply those roles to our own colours; no Radix package or claim that these custom colours inherit Radix's accessibility guarantees.

[W3C's contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) specifies4.5:1 for ordinary text and3:1 for large text, including images of text. That matters here because the visible book print is rasterised and lit inside WebGL. Verify actual scene print as well as the native UI. Disabled controls and decorative stitches are different from enabled action boundaries.

## Selected palette

| Role | Colour | Purpose |
| --- | --- | --- |
| Blush linen stage | `#f4e7eb` | A pale, low-chroma setting that separates the book silhouette. |
| Rose cloth cover | `#e5a1b6` | Her pink preference, as the main physical object. |
| Warm white paper | `#fffdf8` | Clearer pages, navigation and dialogs without a pink cast. |
| Berry ink | `#301e2a` | Dark primary text with the same hue family as the cloth. |
| Deep rose action | `#9b365a` | One accent for enabled actions, focus and selection. |

Supporting variants: lining`#f4cbd8`, binding`#b86885`, muted ink`#654c5b`, hover`#812a49`, selection tint`#f5dce5`, quiet rule`#d9c6ce`, control boundary`#987181`. These are role/value variants of the same three material families, not a collection of competing accents.

The exact hex values are design decisions after assessing the current screenshots, not colours claimed to have been extracted from the references. Pink stays central; no beige/brass/oxblood scheme and no extra sage UI accent. The illustrated Mosel and autumn foliage retain their original colours.

## Rendering implications

Read the palette from CSS tokens in the 3D renderer. Reduce the baked linen/paper overlay strength and replace the strongly pink ground light with a low-chroma neutral. Use a white material multiplier on already coloured paper textures and the inside-cover print, avoiding a second tint. Keep a dark source ink for the lit print, then measure its actual output against the lit paper. Cover, reverse labels, coupon, table and fallback must use coordinated roles.

Geometry, timing, fonts, content, personal data and source art are outside this change. The existing five cats, future Trier dates, English placeholders and intended Amazon.de EUR25 coupon remain.

Verification and its limits are recorded in [VALIDATION.md](VALIDATION.md).
