# Independent original paper cutouts

## Three additional driver portraits, V41

The user requested actual George Russell, Lando Norris and Oscar Piastri faces. Their official 2026 Formula 1 photographs were downloaded on 25 October 2026, using media URLs extracted from each driver's page. Original RGBA WebP bytes remain unchanged at 720×2069. These are credited third-party photographs, not generated faces, personal trip photos or Creative Commons media. Copyright Formula One World Championship Limited and respective rights holders; no endorsement is implied.

- `george-russell-portrait.webp`: 133,782 bytes, SHA256 `560b15114aa828316ea82718e0c518be7399016c4f1a80a0f6866174c72fb781`. Head-and-neck frame `[220,10,256,310]`. Driver page: https://www.formula1.com/en/drivers/george-russell . Exact media: https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/mercedes/georus01/2026mercedesgeorus01right.webp
- `lando-norris-portrait.webp`: 139,550 bytes, SHA256 `32f14cc822f72b64c342d105befba05e69a77186dc5b52915b6f53d3facaa4c6`. Head-and-neck frame `[233,4,270,356]`. Driver page: https://www.formula1.com/en/drivers/lando-norris . Exact media: https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/mclaren/lannor01/2026mclarenlannor01right.webp
- `oscar-piastri-portrait.webp`: 146,832 bytes, SHA256 `73d1ea69d012f5fbb0f5df50b22040071acf7fb083b1898763203702884f3143`. Head-and-neck frame `[242,10,258,310]`. Driver page: https://www.formula1.com/en/drivers/oscar-piastri . Exact media: https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/mclaren/oscpia01/2026mclarenoscpia01right.webp

Visual frame review and independent alpha measurement retain all hair, ears and face pixels at alpha >=13 above the intentional upper-neck boundary, with zero pixels outside each window. No separating polygon is needed. Source evidence: `/workspace/scratch/v41-portraits/`. The three new uncaptioned instances join the four existing Alex/Lewis instances and existing paper ornaments.

## Real driver portraits, 25 October 2026

The user explicitly requested the faces of Alex Albon and Lewis Hamilton on several pages. These are actual official Formula 1 photographs, not generated faces or personal travel photographs. The source files remain byte-for-byte unchanged; HTML and Three use the same measured head-and-neck windows, with all upper-head/face pixels at alpha >= 13 retained inside each frame. The lower boundary intentionally ends at the neck. Empty transparent RGB outside the subject is not painted as a background. Neither photograph requires a separating polygon.

- `alex-albon-portrait.webp`: 720×2069 RGBA, 114,090 bytes, SHA256 `e515f4a7852dc6caf10e626f02d6fd05ec5bbcab09bf0908ada5c56a9f9dc3a5`. Presentation frame `[212,8,328,352]`. Driver page: https://www.formula1.com/en/drivers/alexander-albon . Exact media: https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/williams/alealb01/2026williamsalealb01right.webp
- `lewis-hamilton-portrait.webp`: 720×2069 RGBA, 166,030 bytes, SHA256 `b88173b4ef603e9ecacb9c436268cb58b663a72374f772d963d3510cd5452491`. Presentation frame `[204,4,360,356]`. Driver page: https://www.formula1.com/en/drivers/lewis-hamilton . Exact media: https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/ferrari/lewham01/2026ferrarilewham01right.webp

Copyright Formula One World Championship Limited and respective rights holders. These are third-party photographs, not Creative Commons assets or official endorsement of this scrapbook. Four caption-free portrait instances use accessible names: Alex on the cover and gift leaf, Lewis on the Luxembourg and photograph leaves. Read-only source/frame analysis is retained outside publication at `/workspace/scratch/v40-portraits/`.

## Favorite fan stickers, 21 October 2026

`favorites-stickers.png`: original transparent illustrated sheet, 1774x887, 1,818,371 bytes. SHA-256 `5328e5630edf6ee11a885e90318abed4830fec0ce8a6311c35421e0fa9b117b2`. Original `/workspace/generated_images/exec-c9255dbd-0d14-478c-a589-dc8fda0f854b.png`. Created with image_gen following the owner's explicit request to make and attach Ferrari, Lewis Hamilton, George Russell, Taylor Swift and the recipient's other named favorites.

Seven fan motifs: red open-wheel racing car with a yellow pennant; red 44 helmet; teal/cream 63 helmet; acoustic guitar with a pink bow; lavender microphone and butterfly; gold microphone and cream flower; sage/silver microphone and vinyl record. These are symbolic fan illustrations, not celebrity portraits, personal photographs or official merchandise. The seven supplied names remain accessible labels; the stickers have no visible captions. The existing five cats remain their original separate asset.

The original RGBA bytes are retained without pixel editing, recoloring or equal-cell slicing. Each complete motif uses its own measured source frame in `fandom-stickers.js`; the renderer and native view fit the same frame uniformly. Artwork has transparent paper cut edges. Source analysis and generation metadata remain outside the published archive in `/workspace/scratch/v37-art/` and `qa/v37/`.

## Five personal cats, 14 October 2026

`five-cats.webp`: transparent original paper illustration, 1919x820, 705380 bytes. Original PNG `/workspace/generated_images/exec-34c4ba54-e243-4192-9e73-af3705d27db0.png`. Generated with image_gen using the user's attached Minnie photograph as the sole image reference, and supplied coat descriptions for Winnie, Bonnie, Connie and Wonnie. Left to right: orange Winnie; mostly white gray/white Bonnie; gray/white/orange Connie; mostly gray gray/white Wonnie; black/brown/orange tortoiseshell kitten Minnie. No human or photograph background is retained. These are illustrations, not exact photographs of the pets; only Minnie had a likeness reference.

Prompt requested a single evenly spaced seated row, natural watercolor/collage fur, narrow white cut-paper outlines, transparent background, ears through paws, no text, no invented accessories, no props. Complete composition and alpha retained, with WebP delivery encoding only; no crop or recoloring. Native HTML supplies the five names and their descriptive captions. Generation was authorized by the user's request to integrate these cats and earlier request to generate needed imagery. A bounded asset agent created the asset; the Site owner integrates source and publication.

Generated on 13 October 2026 under the user-approved 3D scrapbook direction. A bounded asset agent generated the images; the Site owner integrated and published them. Both are original paper illustrations, with no text, brand logo or personal-photo claim.

- `cat.webp`: ivory seated paper cat, muted rose bow, complete silhouette. 1024x1536. Original `/workspace/generated_images/exec-1f5cf3c2-bfb1-45ec-8167-50d8163aae8a.png`.
- `flowers.webp`: layered rose/ivory blossoms and muted sage paper leaves, complete silhouette. 1312x1199. Original `/workspace/generated_images/exec-ff964589-390c-4d21-94a4-e5da34e891cf.png`.

Both are RGBA with zero-alpha corners. Cat alpha 0-254; flowers 0-255. FFmpeg WebP quality 85, compression 6 retains dimensions, alpha and complete composition. No crop, resize or background removal. Original PNGs and the complete prompts remain in `/workspace/scratch/scrapbook-3d-assets/PROVENANCE.md`.

They are independently placed as thin cardstock in the 3D favorites page. Cover, envelope, record, racing tag and ribbon are original programmatic Three.js geometry; the printed content comes from the actual native page.
# Birthday cake, 18 October 2026

`birthday-cake.webp` is an original generated paper illustration for the approved birthday ending: ivory cake, pale-pink vintage icing and a small sage bow. It illustrates a celebration, rather than depicting a real purchased cake or a shared photograph. There is no text, age, candle, flame or smoke in the artwork. The native/3D implementation supplies the candle, flame, short smoke transient and folded supports separately.

First generation: `/workspace/generated_images/exec-3877a90d-0648-43b8-a39d-7effe0af12c9.png`. Final alpha-cleanup generation: `/workspace/generated_images/exec-7a9b2519-800f-4415-8e39-5189ddd2dca7.png`. Both originals remain unchanged. The final RGBA PNG is encoded as a complete, uncropped 1536x1024 WebP at quality 90, method 6, retaining alpha and original dimensions; delivery size is 208,948 bytes. The cutout was inspected over the actual ivory paper colour. Exterior transparent RGB data does not become a dark background in the website.

Generation follows the owner's explicit approval of the proposed pop-up cake and prior request to generate needed imagery. Metadata is retained outside publication in `/workspace/scratch/v25-cake/generation.json`.
# Scrapbook ephemera atlas, V39

Generated on 25 October 2026 using OpenAI image generation, with the user's explicit instruction to create more themed stickers and scrapbook ornaments. Original image: `exec-490d758a-3ce6-4100-be88-59bb0a786bff.png`. Distributed unchanged as `scrapbook-ephemera.png`: RGBA, 1536×1024, 2,938,679 bytes, SHA256 `49e222b58051cab1e2aa6489c49e77a439fefe677c76da8c89aba9b255db70a1`.

Sixteen separated watercolor/pencil paper motifs use measured alpha bounds rather than equal grid windows. The key and record also have separating outlines through transparent gaps because their rectangular windows include a small part of the neighboring motif. Masks retain all of each subject's alpha>=64 artwork and exclude foreign ink, with a measured minimum 3.5px subject-to-mask margin. Their frames, outlines and 36 placed instances are in `../../fandom-stickers.js`. This is original decorative artwork, not scanned travel evidence, official merchandise or a personal photograph. The two landmark stamps indicate the established Luxembourg/Trier theme. The ticket uses no readable journey information. No visible sticker captions are added.
