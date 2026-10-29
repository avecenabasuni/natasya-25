# Validation: complete personalisation editor, V75

29 October 2026. Status: PASS with no unresolved finding: 55 integrated end-to-end assertions, 15 editor component checks and 11 targeted final validation/contrast checks. The current scope is the owner editor and its bindings into the real book. Evidence is in `qa/v75`; recipient readiness and earlier broad motion suites below are historical, not claimed as rerun in full. WebKit tests use touch-enabled 375×667 and reduced/native 375×520 contexts. Root visually reviewed the editor captures at both sizes.

The editor follows eight book sections and exposes every active configurable writing/photo field, including all eleven image slots: one cover, four dated trip photographs and six optional memory photographs. Integrated tests enter distinct text into every field, upload aspect-distinct photographs, remove/restore a selected main photograph, download the unsaved form and import/re-export the actual downloaded file. All writing, selection and embedded images survive that round trip. Uploads preserve aspect and cap the long edge at 1100 pixels; source fixture images and exported QA JSON remain ignored local evidence.

Draft persistence is separate from applied configuration. Tests cover close/reopen, Escape, reload persistence, reset/Undo, strict rejection of malformed scalar/array/image/link/schema values and oversized files without replacing the draft, and migration from old JSON with new default fields. A narrow final check rejects a non-string main-photo selector and proves failed imports/uploads can retry the same file while preserving text. Busy guards prevent concurrent mutations. The editor reports storage failures with a download-backup instruction.

Preview is tested through the actual strict introduction and rebuilt 3D cover. Later actual readers are checked for map writing/meals, dated captions, selected photograph/caption, the photograph-page note, the folded letter/sender, five individual cat messages, shared song, birthday card and final heated-blanket note. The birthday wish is separate from the optional Little notes. Filled Little notes can occupy a Four days continuation leaf; actual Next navigation to it is tested, including the absence of birthday-card text. New photographs decode before application; the rebuilt book remains behind the opaque loading gate until current-scene readiness is complete.

### V75 Antislop delivery gate

- R-01 PASS: no new decorative gradient; the editor uses established paper, ink and rose tokens.
- R-02 PASS: active source strings contain no em dash.
- R-03 PASS: editor bounds, independent scrolling and primary 44-pixel-plus actions are measured at both phone sizes.
- R-04 PASS: existing Phosphor icons identify close and download actions.
- R-05 PASS: the editor follows actual reading order through distinct content sections.
- R-06 PASS: established Fraunces headings and Source Sans 3 fields retain their book/utility purposes.
- R-07 PASS: material backgrounds remain in the book; no decorative editor grid is added.
- R-08 PASS: no ornamental arrows; existing page navigation remains.
- R-09 PASS: slot identifiers identify real cover/date/memory destinations; no marketing badges.
- R-10 PASS: the editor is opaque cream paper, with no glass surface.
- R-11 PASS: restrained rectangular input/button corners match the existing controls.
- R-12 PASS: no new floating-card shadow system.
- R-13 PASS: no new glow; recipient object halos retain their functional role.
- R-14 PASS: photo controls have actual image, caption and upload jobs; no filler cards.
- R-15 PASS: Preview book, Download JSON and Import JSON describe their exact actions.
- R-16 PASS: practical English labels, hints and error messages; no marketing superlatives.
- R-17 PASS: dates, age, names, cats, meals and gift use the owner's supplied facts.
- R-18 PASS: no invented testimonial or identity.
- R-19 PASS: Preview's loading transition hides genuine scene reconstruction; no decorative editor motion.
- R-20 PASS: the map, five cats, shared song and heated blanket retain this scrapbook's identity.
- R-21 PASS: the approved pink/paper direction is retained.
- R-22 PASS: supplied cover image and existing cat/map artwork remain; empty optional photo slots are explicit.
- R-23 PASS: user-authorized editor fixes; no invented relationship memory is added.
- R-24 PASS: existing book destinations remain; editor sections name their actual destinations.
- R-25 PASS: enabled editor text minimum 5.96:1; action labels 6.70:1; input boundaries at least 3.47:1 against their adjacent surface.
- R-26 PASS: actual upload, remove, preview, export/import, close, reset and Undo controls are exercised.
- R-27 PASS: empty image slots, busy status, storage fallback, processing timeout and validation errors are explicit.
- R-28 PASS: no unnecessary FAQ.
- R-29 PASS: established one-theme color tokens; no extra palette.
- R-30 PASS: the editor is a functional content workspace, not a marketing template.
- R-31 PASS: design reasons are recorded in DESIGN.md; media provenance remains in existing asset credits.
- R-32 PASS: semantic fields/labels, native sections, visible focus, Escape, validation focus and live status; recipient modal lock remains integrated.
- R-33 PASS: application, document and CSS changes use apply_patch; Python scripts are QA and packaging helpers.
- R-34 PASS: one light theme.
- R-35 PASS: component and real WebKit export/import/reader checks, syntax checks, visual captures and diff checks; final evidence summary records accepted results.
- R-36 PASS: no physical-iPhone performance or universal storage guarantee is claimed.
- R-37 PASS: design read and established Antislop during 3/3/3, Taste 8/9/5 are recorded before delivery.
- R-38 PASS: unknown photos and memories remain explicit; fixed brief facts are labelled honestly instead of offering ineffective date/artwork edits.

L-1–L-7 PASS: the established dials and paper identity remain; eight named sections follow real reading jobs, primary actions remain visible, the form has ample spacing, and rose consistently identifies actions. There is no added idle motion.

C-1–C-5 PASS: typography/layout/state changes have written reasons; real control and data round trips are tested; fields map to their actual story readers; both phone heights, old-data import and failure states are covered; confirmed facts, optional writing and QA-only fixtures stay separate. Taste's relevant utility-form checks pass for one theme, consistent shapes/accent, no label wrapping, readable fields, responsive internal scrolling, honest empty/error states and purposeful loading. Landing-page-only hero, logo-wall, marquee and marketing-layout checks do not apply to this owner dialog.

Software WebKit with touch emulation is not physical iPhone Safari, VoiceOver or hardware-FPS certification. Browser drafts are local and can be cleared by browser storage policies. Downloaded JSON is the portable handoff; it includes photographs and does not publish automatically. Recipient access is unchanged. Packaging verifies exact source/archive bytes, GitHub source synchronization and owner-only access preservation.

## Historical validation: strict asset preparation, V74

29 October 2026. Status: PASS, 39 accepted checks: 13 audio preparation/lifecycle checks, 10 disconnected recipient-flow checks, three held-hidden-asset checks, seven audio-decode/deadline/resize checks, two native short-phone checks and four final decode/dependency failure-boundary checks. Current evidence is in qa/v74. This revision makes readiness mandatory: no Continue control, native-reading bypass or timeout-driven reveal. Failed, corrupt or stalled preparation retains the opaque introduction, hidden/inert book and Retry action. Warm sessions still perform the complete gate.

A read-only source audit identified 57 static recipient assets: 51 images, four font files and two recorded paper clips, plus configured photo URLs. All 20 icons are included even when first used by a later sound/navigation control. Both Latin and Latin-ext FontFaces are loaded explicitly. Decoded image objects remain strongly referenced, and current live page images are individually decoded before release. Reader images use eager loading and synchronous decoding hints. Image/MP3/font bytes are retained unchanged.

The first disconnected-network run exposed incomplete image bindings in later reader nodes despite URL preloading. Final code retains image bytes as local Blob URLs, rewrites an inert reader template before insertion and awaits actual reader-image decode before showing it. Later icons and CSS material backgrounds resolve from prepared bytes, and all left-divider nodes are constructed and decoded before entry. The corrected disconnected run completes route/city maps, supplied-photo gallery fixture, cat portraits, hidden Latin-ext letter, final note, sound toggles and full reverse cover replay with no new URL, failed resource request or live audio decode.

Final boundary checks also confirm that a failed actual reader decode does not show partial content or leave the book locked, and that retrying the object after recovery works. Missing recipient JavaScript dependencies cannot pass the intro; Retry reloads and completes preparation. Reader-only images are tested at their first reading state, including reduced/native 375×520. Source identity is retained alongside Blob URLs so photo-gallery selection still matches the original supplied URL. Isolated fixture photos and writing remain browser-only and are not published.

Audio readiness now validates both full decoded recordings using a silent OfflineAudioContext. No rendering, live-output context or sound is needed for this preparation. Later trusted live playback reuses the prepared AudioBuffers without fetching or decoding again. Corrupt, empty, unsupported or disposed preparation reports failure. Existing original-pitch playback, fades, mute, lifecycle and birthday behavior remain.

The gate verifies actual DOM image completion, loaded font faces and the current film's texture/shader readiness both before and after the intro exit fade. A film replaced during preparation is awaited again; a change during leaving restarts the check. The main book remains opacity zero throughout this process, preserving its dimensions and offscreen raster work without exposing partially prepared frames. Release of the overlay and inert/input guards occurs only after the final current-scene verification.

Focused verification covers delayed hidden assets and offline audio decoding, retry-only failures, current-film changes during exit, real decoded recording reuse, and recipient navigation/readers after disconnecting the network once preparation completes. Source and browser limits are recorded in the final reports. Offline continuation is a controlled test of prepared resources, not a claim that Safari can never evict data under memory pressure or that future server updates need no network. Hardware/iPhone GPU/FPS/VoiceOver certification is not claimed. Previous broad suites remain historical.

### V74 Antislop delivery gate

- R-01 PASS: the established palette and functional loading emphasis remain.
- R-02 PASS: concise English retry copy contains no em dash.
- R-03 PASS: measurable phone geometry is retained beneath the hidden parent.
- R-04 PASS: all existing icon assets are prepared; no new icon style is added.
- R-05 PASS: the existing introduction and physical book structure remain.
- R-06 PASS: all four existing local font faces are explicitly loaded.
- R-07 PASS: existing paper/linen materials remain.
- R-08 PASS: existing navigation remains; no decorative arrows are added.
- R-09 PASS: no badge or invented progress metric is added.
- R-10 PASS: the intro remains opaque paper/linen.
- R-11 PASS: geometry and edge treatments remain.
- R-12 PASS: no new shadow is added.
- R-13 PASS: existing functional halos remain.
- R-14 PASS: no card grid is added.
- R-15 PASS: Retry is the single truthful recovery action before readiness.
- R-16 PASS: no marketing text is added.
- R-17 PASS: manifest counts come from the source audit and final reports.
- R-18 PASS: no identity or endorsement is invented.
- R-19 PASS: exit motion follows verified readiness and preserves reduced motion.
- R-20 PASS: the supplied scrapbook identity and personal content remain.
- R-21 PASS: the light/pink theme remains.
- R-22 PASS: original image and audio files remain unchanged.
- R-23 PASS: the strict gate implements the user's explicit requirement.
- R-24 PASS: prepared pages/readers are exercised after entry.
- R-25 PASS: existing tested ink/paper contrast pairs remain.
- R-26 PASS: loading guards cannot be bypassed through a Continue action.
- R-27 PASS: delayed, corrupt, failed, disposed and stale states retain honest failure handling.
- R-28 PASS: no filler section is added.
- R-29 PASS: no palette color is added.
- R-30 PASS: the original scrapbook structure remains.
- R-31 PASS: the complete manifest, retained decode caches and post-fade verification are documented in DESIGN.md.
- R-32 PASS: live status, inert book and keyboard-focusable Retry remain.
- R-33 PASS: final source edits use apply_patch.
- R-34 PASS: cached and reduced-motion paths still require readiness.
- R-35 PASS: focused readiness, offline traversal, audio lifecycle, syntax and source checks are reviewed before packaging.
- R-36 PASS: software/browser/cache limits are explicit.
- R-37 PASS: Antislop during 3/3/3 and Taste 8/9/5 remain.
- R-38 PASS: no fake percentage, empty success or skipped-readiness claim is introduced.
- Liveliness PASS: the established personal paper introduction remains while preparation becomes stricter.
- C-1 PASS: every new check addresses an audited late-loading gap.
- C-2 PASS: final verification controls real entry and Retry recovery.
- C-3 PASS: no new story content or decorative section is added.
- C-4 PASS: held assets, failures, cached paths and late scene changes are verified.
- C-5 PASS: audited assets, decoded buffers, exact hashes and limits are recorded.
- Taste preflight PASS: preserve the existing phone composition and motivate all readiness behavior.

# Historical validation: asset preparation introduction, V73

29 October 2026. Status: PASS, 21/21 focused preparation and recovery checks. Results are recorded in qa/v73/independent-summary.json and intro-checks.json. The introduction waits for actual readiness while the underlying book retains measurable layout and pinned scene preparation. It does not use the object-reader modal lock. A pink linen background, cream dedication, existing cat mark and live loading status introduce Tasya's scrapbook without another required entry action. No percentage or fake asset count is shown.

Bootstrap bounds IndexedDB open/read and font/module waits. The preparation gate gathers unique live image URLs, all supplied trip/memory photos, material maps, reader-only city maps, font readiness, stylesheet success, current-film texture/shader readiness and prerecorded-paper bytes. If a resize replaces the film during preparation, readiness follows the current instance. Recorded audio fetches before entry without an AudioContext and retains trusted-gesture decoding/playback.

The ready introduction fades out automatically and removes its scroll guards and parent inert states. A cold start has at most a 450 ms minimum presentation plus the 500 ms exit; warm/reduced reading skips the minimum and uses an 80 ms exit. Reduced motion has a static preparation line. Initial preparation has a 15 s independent bootstrap watchdog, while the asset stage has a 12 s deadline. Failed or stalled assets show Retry and, once page structure exists, Continue to the book. Continue explicitly rebuilds native reading before revealing it; fatal bootstrap offers Retry only. If the intro script itself fails to download, its HTML resource-error fallback exposes a working Retry action. No-JavaScript visitors get the existing explanatory message without a permanent intro overlay.

Evidence: readiness-audit.json, focused browser reports/screenshots, source-preservation.json and exact distribution hashes in qa/v73. Root visually reviewed cold, reduced/native short-height, failed-asset recovery and revealed-cover screenshots. Held portrait and MP3 requests prevent early entry; completion releases the real cover and one recorded opening sound. Warm exit, native continuation, real 12-second timeout, retry after a failed app script and no-JavaScript fallback pass. Historical harness assumptions about unavailable mobile wheel automation and coalesced ready/leaving observations were corrected without application changes. Source checks verify that the cover, book geometry/motion clocks, object readers/halos, original imagery, local fonts, personal config and recorded MP3 bytes are retained. The audio change only exposes its existing byte-fetch readiness; the film/story expose readiness and an explicit recovery mode. Software touch WebKit evidence is not a physical-iPhone GPU, hardware latency or VoiceOver certification. Older broad content/motion/audio suites remain historical.

### V73 Antislop delivery gate

- R-01 PASS: the established pink, cream and ink roles communicate preparation.
- R-02 PASS: concise English loading and recovery copy contains no em dash.
- R-03 PASS: the intro fits phone layouts and keeps the book measurable.
- R-04 PASS: the existing cat mark supports the established scrapbook identity.
- R-05 PASS: one centered dedication introduces the book without another content chapter.
- R-06 PASS: established local serif/sans fonts remain.
- R-07 PASS: existing linen and paper materials support the physical book motif.
- R-08 PASS: no decorative navigation arrow is added.
- R-09 PASS: no status pill or promotional badge is added.
- R-10 PASS: the intro is opaque paper/linen, not glass.
- R-11 PASS: paper edges and existing control radius are retained.
- R-12 PASS: small contact shadows belong to the physical dedication paper.
- R-13 PASS: no new glow is added.
- R-14 PASS: no feature grid or generic card collection is added.
- R-15 PASS: Retry and Continue have distinct real recovery actions.
- R-16 PASS: no marketing prose is added.
- R-17 PASS: loading has no invented percentages; deadlines and readiness are recorded.
- R-18 PASS: recipient/sender come from supplied personalisation.
- R-19 PASS: the loading cue indicates active work; exit follows readiness and respects reduced motion.
- R-20 PASS: the introduction uses the scrapbook's existing materials, names and cat mark.
- R-21 PASS: the selected light/pink theme remains.
- R-22 PASS: original visual assets are reused without new generated imagery.
- R-23 PASS: no personal memory or photograph is invented.
- R-24 PASS: the real cover is revealed after preparation; recovery has working destinations.
- R-25 PASS: existing ink/paper and rose/cream contrast pairs are retained.
- R-26 PASS: input stays gated during loading and is released on entry or explicit continuation.
- R-27 PASS: loading, ready, slow, missing-media, fatal and no-JavaScript states are provided.
- R-28 PASS: no filler section is added.
- R-29 PASS: no new palette color family is added.
- R-30 PASS: the physical scrapbook structure remains.
- R-31 PASS: actual readiness, quiet introduction and honest recovery are documented in DESIGN.md.
- R-32 PASS: live status, inert underlying content and visible keyboard-focusable recovery controls are retained.
- R-33 PASS: final application source edits use apply_patch.
- R-34 PASS: warm and reduced-motion entry have explicit handling without changing the page theme.
- R-35 PASS: focused browser, readiness/failure, JavaScript syntax and diff checks are reviewed before publication.
- R-36 PASS: source/browser verification limits are explicit.
- R-37 PASS: Antislop during 3/3/3 and Taste 8/9/5 remain.
- R-38 PASS: names and artwork are supplied; loading copy reflects actual work and recovery.
- Liveliness PASS: the existing cat, paper, linen and personal dedication introduce the book with one functional motion cue.
- C-1 PASS: the intro addresses the user's request to finish loading before book interaction.
- C-2 PASS: real readiness and working recovery replace an arbitrary timer.
- C-3 PASS: no extra story content or forced entry button is added.
- C-4 PASS: initial, ready, reduced, slow, failed and fatal paths are handled.
- C-5 PASS: actual completion and verification limits are recorded without performance guarantees.
- Taste preflight PASS: root reviews the actual phone composition and preserves the established book identity.

# Historical validation: recorded book-paper audio, V72

29 October 2026. Status: PASS, 28 accepted checks: 14 software WebKit recording-flow checks and 14 final lifecycle checks. The final pre-onset cancellation guard has explicit lifecycle coverage; earlier browser evidence is retained for unaffected playback paths with its tested source hash recorded. Replace procedural noise with two real book-page recordings by StarNinjas, published as CC0 on the primary OpenGameArt page. Source HTML, archive, original hashes and measured candidates are retained under qa/v72/sources; public provenance is in dist/assets/audio/README.md. Page uses book_flip.4.ogg and the longer cover gesture uses book_flip.5.ogg. The latter remains a page-movement recording, not a claimed recording of a cover hinge.

Both complete events retain original pitch and are delivered as self-hosted mono MP3: 9,917 bytes for the page and 13,209 bytes for the cover. Peak attenuation, 90 Hz highpass, 8 kHz lowpass, 15 ms entry fade and 100 ms exit fade soften the recordings without adding synthetic noise. Decoded output peaks are approximately 0.408 and 0.428, with no clipping. Browser decoding may expose MP3 padding; playback uses the complete decoded duration and does not seek to random offsets.

Fetch bytes while the cover prepares, without an AudioContext or autoplay. Decode on a trusted audio gesture, cache each decoded clip and reuse it for later physical cues. Runtime rate stays 1, with a 20 ms gain attack and 100 ms release. An already-playing replaced voice fades over 50 ms and stops at 55 ms; its replacement starts at 60 ms. A replaced voice that has not begun is cancelled immediately to prevent a short unwanted snippet. Pending media/context work is guarded by generation, mute, hidden/disposed state and a 250 ms stale limit. Missing media stays silent while the book remains usable. Disposal aborts fetches, clears caches and closes audio resources.

Focused software WebKit and lifecycle probes verify actual decoded-recording identity, different cover/page buffers, physical opening/page cues, quiet pans, original pitch/fades, global mute, Happy Birthday and candle stopping, failed files, delayed-file recovery and pending-decode cancellation. Reports and exact final hashes are in qa/v72/independent-summary.json and final-scope-summary.json. This is software-browser and audio-data evidence; no audible listening review, physical-iPhone speaker quality or hardware latency certification is claimed. Earlier broad visual and motion tests remain historical because those files do not change.

### V72 Antislop delivery gate

- R-01 PASS: visual palette and functional emphasis remain unchanged.
- R-02 PASS: existing English visitor copy remains.
- R-03 PASS: phone layout is unchanged; software touch audio flow runs at 375×667.
- R-04 PASS: the existing speaker control remains.
- R-05 PASS: no layout block is added.
- R-06 PASS: local type remains unchanged.
- R-07 PASS: physical paper/linen materials remain unchanged.
- R-08 PASS: navigation controls remain unchanged.
- R-09 PASS: no badge or product label is added.
- R-10 PASS: no glass is added.
- R-11 PASS: geometry and paper edges remain unchanged.
- R-12 PASS: no shadow is added.
- R-13 PASS: object halos remain unchanged.
- R-14 PASS: no card or grid is added.
- R-15 PASS: the existing sound control retains global mute behavior.
- R-16 PASS: no marketing copy is added.
- R-17 PASS: source identity, file sizes, peaks and test counts are recorded.
- R-18 PASS: no identity or endorsement is invented.
- R-19 PASS: the recorded sound follows existing physical opening/turn cues; pans stay silent.
- R-20 PASS: the personal physical scrapbook identity remains.
- R-21 PASS: the selected light/pink theme remains.
- R-22 PASS: visual assets remain unchanged; new sound assets have primary-source provenance.
- R-23 PASS: sound replacement is explicitly requested and uses verified CC0 recordings.
- R-24 PASS: book opening/page navigation remain usable when sound files fail.
- R-25 PASS: the opaque dedication label and verified contrast remain unchanged.
- R-26 PASS: physical cues play decoded recordings and mute suppresses them.
- R-27 PASS: no-gesture, missing/delayed media, mute, hidden and disposed states are checked.
- R-28 PASS: no filler section is added.
- R-29 PASS: no palette color is added.
- R-30 PASS: the original book structure remains.
- R-31 PASS: recorded texture, complete playback, fades and local caching are documented in DESIGN.md.
- R-32 PASS: existing focusable controls and trusted keyboard audio unlock remain.
- R-33 PASS: final application edits use apply_patch; audio conversion produces media files directly.
- R-34 PASS: no new visual theme or mode is added.
- R-35 PASS: focused browser/lifecycle, source/media, JavaScript syntax and diff checks pass before packaging.
- R-36 PASS: software and source-data verification limits are explicit.
- R-37 PASS: Antislop during 3/3/3 and Taste 8/9/5 remain.
- R-38 PASS: the primary author describes the recorded event; no invented personal content is added.
- Liveliness PASS: recorded paper movement supports the established physical-book motif.
- C-1 PASS: recorded texture and fades address the user's specific sound feedback.
- C-2 PASS: existing controls produce real decoded audio and global mute.
- C-3 PASS: no extra visitor prose or section is added.
- C-4 PASS: media failure, delayed decode, mute, hidden and disposal states are checked.
- C-5 PASS: primary license, source/derived hashes and verification limits are recorded.
- Taste preflight PASS: keep the established visual identity; sound is motivated by physical page movement.

# Historical validation: readable dedication and physical paper sound, V71

29 October 2026. Status: PASS, 55 accepted checks: eight final guarded-engine probes, 13 retained main-flow checks, seven short-scene checks, seven reduced/native checks, 14 audio lifecycle checks, two focused birthday checks and four stable-state probes. One historical birthday timing assertion is superseded by the focused report that verifies scheduled notes and waits for a live voice. Final results are recorded in qa/v71/independent-summary.json and final-scope-summary.json. Root reviewed the actual 375×667 scene cover and 375×520 reduced/native cover. “For Tasya” uses larger local type on an opaque cream paper label inside the existing photo print; all faces, the complete photo and the dated paper border remain visible. The Three raster paints the label after the image and before its text. Black on cream has fixed 19.3349:1 contrast independent of the photo's lower paper fold.

Physical opening/closing and actual paper-turn phases dispatch one rustle cue; a whole physical phase crossed by a fast seek emits one cue too. Left/right pans remain silent. Native chapter changes produce equivalent cover/page cues while repeated same-chapter observations do not. Resume, static repaint, modal-held scenes and ScrollTrigger refresh do not create new physical paper movements. Cached filtered noise uses different cover/page envelopes. Replacement stops the old effect before the new one starts; global mute, hidden tabs, disposal and stale pending resumes suppress effects.

The sound control reflects the global enabled/muted setting from initial load. Paper is enabled by default, with no audio context or effect before a trusted gesture; ambient music remains initially off. Unmuting preserves ambient opt-in behavior. Birthday entry replaces ambient music with the existing Happy Birthday arrangement, and blowing the candle stops that melody and unlocks the last note. The physical paper effect is independent of music voices. No network audio, recording permission or new media dependency is introduced.

Evidence: browser input/event/source traces in cover-paper-qa.py and its reports, focused AudioContext lifecycle checks in audio-lifecycle-checks.json, and a real software Chromium master-output capture in paper-sounds.wav with paper-capture.json. The capture proves non-silent, unclipped output; it is not an audible review or a physical-iPhone speaker/latency measurement. Software browser evidence does not certify iPhone hardware FPS or VoiceOver. Historical harness assumptions are preserved separately, including a birthday-frequency check that sampled a later melody note and a mock that incorrectly reopened a closed context. These required no application change.

Scope: cover typography/label, its scene paint order, physical transition cues, sound lifecycle and cache references. Interior content/config, original image bytes, maps, fonts, paper geometry, motion timings, object readers/halos, candle gate and hosting identity remain. The current source and packaged bytes are checked against reviewed hashes. Earlier broad content and hardware claims are not repeated.

### V71 Antislop delivery gate

- R-01 PASS: opaque cream is the existing paper color and provides a readable text surface.
- R-02 PASS: short English dedication and sound-control labels contain no new em dash.
- R-03 PASS: scene and short native phone cover bounds are reviewed.
- R-04 PASS: the existing speaker icons communicate the global sound setting.
- R-05 PASS: one dedication label stays inside the existing physical photo composition.
- R-06 PASS: the established local serif/sans pairing remains; type is larger for phone reading.
- R-07 PASS: original paper/linen materials remain.
- R-08 PASS: existing opening and navigation controls retain their functions.
- R-09 PASS: the label is a physical recipient dedication, not a UI badge.
- R-10 PASS: no glass is added.
- R-11 PASS: label edges follow the scrapbook's paper shapes.
- R-12 PASS: no new floating shadow is added.
- R-13 PASS: functional object halos remain unchanged.
- R-14 PASS: no feature cards or grid are added.
- R-15 PASS: opening, page controls and global sound have concrete behavior.
- R-16 PASS: no marketing copy is added.
- R-17 PASS: check counts and audio measurements come from saved reports.
- R-18 PASS: no identity or testimonial is invented.
- R-19 PASS: sound follows physical opening/turning and omits camera pans.
- R-20 PASS: the supplied portrait and physical scrapbook identity remain.
- R-21 PASS: the selected light/pink theme remains.
- R-22 PASS: original supplied/generated image bytes are retained.
- R-23 PASS: no personal content is invented.
- R-24 PASS: real opening, navigation, reverse replay and candle destination are checked.
- R-25 PASS: the larger black dedication has an opaque cream background in native and Three print.
- R-26 PASS: the sound button mutes music and paper; physical events produce real audio sources.
- R-27 PASS: no gesture, mute, native reading, hidden and disposed states are handled.
- R-28 PASS: no filler section is added.
- R-29 PASS: the selected pink/cream/ink palette remains.
- R-30 PASS: the original physical book structure remains.
- R-31 PASS: readable print, motivated sound and single-effect ownership are documented in DESIGN.md.
- R-32 PASS: semantic birthday title and existing focusable controls remain; keyboard gestures can unlock audio.
- R-33 PASS: final application source edits use apply_patch.
- R-34 PASS: no new theme or display mode is introduced.
- R-35 PASS: focused browser/lifecycle checks, JavaScript syntax and diff checks are reviewed before packaging.
- R-36 PASS: software capture, browser and verification limits are explicit.
- R-37 PASS: Antislop during 3/3/3 and Taste 8/9/5 remain.
- R-38 PASS: supplied imagery remains real and unknown interior content retains honest placeholders.
- Liveliness PASS: personal portrait, readable dedication and physical page feedback support the existing book motif.
- C-1 PASS: both changes address the owner's specific readability and paper-sound requests.
- C-2 PASS: visible sound/opening/page controls have tested behavior.
- C-3 PASS: no extra explanatory product copy or section is added.
- C-4 PASS: touch, short native, rapid input, mute and audio lifecycle states are checked.
- C-5 PASS: source, event traces, audio measurements and limitations are recorded.
- Taste preflight PASS: preserve the established palette, local type, paper composition, mobile reading and reduced-motion behavior.

# Historical validation: supplied portrait bouquet on the cover, V70

29 October 2026. Status: PASS. The final black-ink composition passes 13/13 focused WebKit checks at 375×667 in the scene and 375×520 in reduced/native reading. Earlier placement flow coverage passes 39/39 across software touch WebKit at both heights, Chromium at 375×667, CSS fallback at 375×667 and exact-photo failure. Historical intermediate reports are separated from the final source. The complete 960×1280 supplied JPEG fits inside the rotated Polaroid; the live recipient name remains separate from the photograph. The custom Three overlay pass paints the portrait once, avoiding an unrotated duplicate beneath it. Final source-space glyph-box background contrast is at least 7.866 for For and 4.575 for Tasya; this sampling is distinct from certifying physical display output.

Actual opening reaches the illustrated left divider. Reading and turning reach the next divider, and repeated Previous actions pan back and close the real cover with its portrait retained. Scene opening actions fit the viewport; the native short-height action remains reachable by scrolling. Default page counts, semantic birthday title and existing paper navigation remain. Exact-photo request failure still leaves a working cover, opening action and scene readiness without JavaScript exceptions. No horizontal viewport overflow is observed.

Evidence: cover-qa.py, independent-summary.json, cover-for-legibility.json, final scene/native reports, historical flow and photo-failure reports, corresponding screenshots, historical-harness-assumptions.json and source-preservation.json. Initial harness assumptions about an API call's default instant navigation and a native below-fold action were corrected to test real UI reversal and scroll reachability. These did not require application changes. A measured hood-edge overlap was corrected by moving the name group down four percent of the print height; black name ink improves contrast on the lower paper fold. Root reviewed scene and native screenshots. This is software-browser evidence, not a physical-iPhone GPU, FPS or VoiceOver certification. Previous broad interior, audio, reader and pagination suites remain historical.

Scope: 133/139 previous distribution files remain byte-identical. One original JPEG is added; six existing distribution files change: cover markup/styles, image preload/cache references, Three loader, scene-skipped overlay raster handling and cover provenance. Shared config, interiors, motion clock, physical geometry, readers, halos, maps, audio, fonts, all prior image bytes and hosting identity remain. The photo is a static personal cover keepsake and introduces no new interaction or form field.

### V70 Antislop delivery gate

- R-01 PASS: the pink mount supports the supplied pink image and existing scrapbook palette.
- R-02 PASS: existing short English cover copy is retained.
- R-03 PASS: both phone heights, native reading and CSS fallback are checked.
- R-04 PASS: existing functional icons are retained.
- R-05 PASS: the photograph fills the existing print rather than adding another layout block.
- R-06 PASS: local type and editable recipient-name sizing remain.
- R-07 PASS: original paper and linen materials remain.
- R-08 PASS: navigation and opening actions retain their functions.
- R-09 PASS: no badge is added.
- R-10 PASS: no glass is added.
- R-11 PASS: the print retains its straight paper edges and existing tilt.
- R-12 PASS: no extra floating shadow is added.
- R-13 PASS: existing functional object halos remain unchanged.
- R-14 PASS: no card grid or replacement section is added.
- R-15 PASS: Open the book opens the existing physical book.
- R-16 PASS: no marketing prose is added.
- R-17 PASS: image dimensions, byte counts and checks come from source and QA reports.
- R-18 PASS: the portrait is supplied by the owner; no testimonial or new identity is invented.
- R-19 PASS: actual opening, turning and reverse closure are checked.
- R-20 PASS: the supplied personal image replaces the empty cover print.
- R-21 PASS: the selected light/pink scrapbook theme remains.
- R-22 PASS: supplied original imagery is used directly without generated likenesses.
- R-23 PASS: no additional personal content is invented.
- R-24 PASS: opening and existing page navigation work through real input.
- R-25 PASS: the For label clears the dark hood edge; black name ink separates from the lower paper fold in both native and Three print. Source-space glyph-box sampling and visual review are recorded.
- R-26 PASS: no false interactive affordance is added to the static photograph.
- R-27 PASS: failed-photo, CSS fallback and reduced/native reading states remain usable.
- R-28 PASS: no filler content is added.
- R-29 PASS: the selected palette remains with pink sampled by visual match to the photo.
- R-30 PASS: the original physical scrapbook structure remains.
- R-31 PASS: full-photo fitting, name placement and once-only local raster painting are documented in DESIGN.md.
- R-32 PASS: semantic birthday title and existing focusable opening action remain.
- R-33 PASS: final application source changes are applied directly with apply_patch.
- R-34 PASS: no new theme or mode is added.
- R-35 PASS: focused rendering/input reports, JavaScript syntax and diff whitespace checks are reviewed before packaging.
- R-36 PASS: software-browser verification limits are explicit.
- R-37 PASS: Antislop during 3/3/3 and Taste 8/9/5 remain.
- R-38 PASS: the user-supplied image is real; remaining unknown personal content retains its placeholders.
- Liveliness PASS: the supplied portrait bouquet becomes the focal personal keepsake within the existing collage.
- C-1 PASS: the frame and lower-paper text placement follow the owner's specific request.
- C-2 PASS: the existing physical opening/reverse actions are exercised.
- C-3 PASS: supplied imagery leads without extra explanatory copy.
- C-4 PASS: scene, fallback, short native and image-error states are checked.
- C-5 PASS: source preservation, rendering traces and verification limits are recorded.
- Taste preflight PASS: preserve the established scrapbook identity, local serif justification, mobile layout and motion behavior; review the actual image composition.

# Historical validation: cleaner paper without repeated headings or footers, V69

29 October 2026. Status: PASS, no unresolved finding. 59/59 focused checks: WebKit375×667 (13), WebKit375×520 (10), Chromium375×667 (10), CSS fallback667 (10), reduced/native520 (8), two focused geometry rechecks, and six filled-pagination checks.

Right-hand paper no longer includes repeated running chapter labels or printed name/page-number footers. The photograph's “One photograph” heading remains a clipped1px semantic h2 with zero flow margins and data-scene-skip, preserving section naming and keyboard navigation while excluding it from visible/native and Three print. The illustrated divider introduces the spread. Other content headings, image captions and external Contents/page navigation retain their functions.

Actual input checks cover the illustrated-left-to-right sequence, all default interiors, photo reader/book scroll lock/clean return, candle prerequisite, final note and full animated cover replay. Default pagination remains seven pages. A controlled filled-photo/long-writing fixture produces11 pages with five photo parts, retaining all1419 fixture characters and a1070-character full note. Continuation navigation opens its real visible note action. No footer-node assumptions, JavaScript errors or viewport overflow remain.

Root visually reviewed the scene photograph page, native short-height photograph page and isolated filled-photo page. Paper dimensions, padding, type, colors, object spacing and motion geometry remain. The photo mount moves up naturally after its old title leaves document flow. Footers and running labels are absent from live/copy/raster sources rather than painted over.

Evidence: qa/v69/independent-summary.json, clean-pages.py, seven final report paths in final-scope-summary.json, focused-probe-rechecks.json, pagination fixture reports/screenshots and source-preservation.json. 135/139 distribution files remain byte-identical. Only story markup, engine label/footer assembly, the photo-heading margin reset and cache references change. All media, fonts, audio, maps, shared content/config, Three renderer/masks, reader/halo code, paper dimensions and hosting config remain unchanged.

Initial harness reports are preserved. A transformed1px heading measured1.0012px, so focused rechecks use its actual1px CSS dimensions, zero clip and scene exclusion. Native ornament overhang remains inside375px paper/viewport bounds. The filled fixture legitimately moves its note button to a continuation leaf; final input navigates there first and reads the canonical body instead of an inert fold-ink copy. These harness corrections required no application change. Software WebKit/Chromium evidence does not certify physical iPhone Safari, hardware FPS or VoiceOver. The existing postcard used for the filled fixture and all QA-only writing stay isolated in browser responses and are not published.

### V69 Antislop delivery gate

- R-01 PASS: existing functional halos unchanged.
- R-02 PASS: no new product prose or em dash added.
- R-03 PASS: paper/content bounds, both phone heights, native fallback and filled pagination pass.
- R-04 PASS: existing functional icons retained.
- R-05 PASS: photo mount leads its existing physical composition after redundant text is removed.
- R-06 PASS: existing local type retained; only the photo h2 becomes visually hidden.
- R-07 PASS: paper/linen materials unchanged.
- R-08 PASS: external functional page arrows and replay retained.
- R-09 PASS: repeated running labels removed, no badges added.
- R-10 PASS: no glass added.
- R-11 PASS: paper/subject shapes unchanged.
- R-12 PASS: existing physical contact shadows unchanged.
- R-13 PASS: object emphasis remains functional and unchanged.
- R-14 PASS: no replacement cards or grids added.
- R-15 PASS: photo/note actions retain their concrete behavior.
- R-16 PASS: no marketing text added.
- R-17 PASS: page/check/text counts come from final reports.
- R-18 PASS: no identity or testimonial added.
- R-19 PASS: left divider, turn, reader extraction and full replay pass.
- R-20 PASS: supplied personal keepsakes remain while repeated UI labels disappear.
- R-21 PASS: selected light/pink scrapbook retained.
- R-22 PASS: all image bytes retained; no new artwork added.
- R-23 PASS: no new visual or personal content invented.
- R-24 PASS: Contents, photograph, candle and final-note destinations pass.
- R-25 PASS: color/focus styles unchanged; remaining text uses existing ink/paper pairs.
- R-26 PASS: actual navigation, readers, candle gate and replay pass.
- R-27 PASS: native/reduced/fallback and filled pagination remain usable.
- R-28 PASS: no filler section added.
- R-29 PASS: palette unchanged.
- R-30 PASS: original scrapbook structure retained.
- R-31 PASS: divider-led hierarchy and true footer removal documented in DESIGN.md.
- R-32 PASS: photo section retains aria-labelledby and semantic/focusable h2; Contents retains its destination.
- R-33 PASS: tracked application changes use apply_patch.
- R-34 PASS: no new theme or mode added.
- R-35 PASS: 59 focused checks, two JavaScript syntax checks and diff whitespace checks pass.
- R-36 PASS: software-browser and isolated fixture limits are explicit.
- R-37 PASS: Antislop during3/3/3 and Taste8/9/5 retained.
- R-38 PASS: isolated QA image/prose do not enter published source.
- Liveliness PASS: original focal photograph, whitespace, materials and attached-keepsake motif retained with clearer hierarchy.
- C-1 PASS: repeated labels and footer chrome are removed because dividers already orient the reader.
- C-2 PASS: retained controls work through actual input.
- C-3 PASS: photograph and personal writing lead the photo leaf.
- C-4 PASS: default, short, native/reduced, continuation and modal states pass.
- C-5 PASS: measured geometry, text preservation and verification limits are recorded.
- Taste preflight PASS: root reviewed default/native/filled photograph pages and retained layout/motion identity.

# Historical validation: sender name Ave, V68

28 October 2026. Status: PASS. The shared sender name is now Ave. Existing c.sender/defaults.sender bindings supply “Ave & Tasya” page bylines, letter/card signatures, other From labels, the editor, imports/exports and print-font preparation. Trimmed exact old sender placeholders [Your name] and [Namamu] migrate to the new default; other custom names and writing remain.

Verification: independent sender-binding review, config/app JavaScript syntax checks and diff whitespace checks. This small name/default migration adds no automated tests and does not rerun browser motion suites. Only config.js, the exact sender-placeholder normalization and their cache references change; 136/139 distribution files remain byte-identical. Styling, story, assets, fonts, audio, recipient name Tasya, halo/reader/book motion and hosting configuration are unchanged. Earlier phone rendering evidence remains historical.

Evidence: qa/v68/final-scope-summary.json and source-preservation.json. No new browser or physical-device performance claim is made.

### V68 Antislop delivery gate

- R-01 PASS: existing functional emphasis unchanged.
- R-02 PASS: no product punctuation added.
- R-03 PASS: short sender uses existing byline/signature layouts; sizing source unchanged.
- R-04 PASS: icons unchanged.
- R-05 PASS: composition unchanged.
- R-06 PASS: fonts and sender font preparation retained.
- R-07 PASS: materials unchanged.
- R-08 PASS: navigation unchanged.
- R-09 PASS: no badges or labels added.
- R-10 PASS: no glass added.
- R-11 PASS: corners/contours unchanged.
- R-12 PASS: physical shadows unchanged.
- R-13 PASS: existing object emphasis unchanged.
- R-14 PASS: no panels/grids added.
- R-15 PASS: action labels unchanged.
- R-16 PASS: supplied proper name replaces the placeholder.
- R-17 PASS: Ave comes from the owner's instruction.
- R-18 PASS: no invented identity or testimonial.
- R-19 PASS: all animation source unchanged.
- R-20 PASS: actual sender personalises the existing bylines/signatures.
- R-21 PASS: theme unchanged.
- R-22 PASS: all images unchanged.
- R-23 PASS: supplied sender name used directly.
- R-24 PASS: destinations unchanged.
- R-25 PASS: colors, type and focus styles unchanged.
- R-26 PASS: controls unchanged; sender bindings independently reviewed.
- R-27 PASS: existing empty/error/native paths retained.
- R-28 PASS: no filler added.
- R-29 PASS: palette unchanged.
- R-30 PASS: original scrapbook retained.
- R-31 PASS: sender and exact-placeholder migration documented in DESIGN.md.
- R-32 PASS: semantic structure and keyboard/dialog controls unchanged.
- R-33 PASS: tracked changes use apply_patch.
- R-34 PASS: no theme or mode added.
- R-35 PASS: config/app syntax and diff checks pass; unchanged runtime paths retain historical verification.
- R-36 PASS: no new performance claims.
- R-37 PASS: Antislop during3/3/3 and Taste8/9/5 retained.
- R-38 PASS: sender matches the user's supplied fact.
- Liveliness PASS: existing keepsakes, whitespace and visual identity unchanged.
- C-1 PASS: supplied sender replaces the generic placeholder.
- C-2 PASS: unchanged controls retain sender data bindings.
- C-3 PASS: personalisation uses the same sender data.
- C-4 PASS: exact old placeholders migrate; other personal fields remain.
- C-5 PASS: source review/checks and their limits are explicit.
- Taste preflight PASS: short name, sender bindings and retained visual system reviewed.

# Historical validation: recipient nickname Tasya, V67

28 October 2026. Status: PASS. The shared recipient nickname is now Tasya. Existing c.name/defaults.name bindings cover the cover print and accessible title, birthday addressee, note/card salutations, page bylines and personalisation editor. Both exact legacy nickname placeholders, after trimming whitespace, migrate to the new default; real custom names and other writing stay intact.

Verification: independent binding review, config/app JavaScript syntax checks and diff whitespace checks. This small content/default migration adds no automated tests and does not rerun browser motion suites. Earlier phone reading and rendering evidence remains historical. Only config.js, the exact-placeholder normalization and their cache references change; 136/139 distribution files remain byte-identical. Source preservation confirms all styling, assets, story, fonts, audio, halo/reader/book motion and hosting configuration are unchanged.

Evidence: qa/v67/final-scope-summary.json and source-preservation.json. No new browser or physical-device performance claim is made.

### V67 Antislop delivery gate

- R-01 PASS: existing functional emphasis unchanged.
- R-02 PASS: no product prose punctuation added.
- R-03 PASS: five-character nickname uses the existing short-name layout; all sizing source unchanged.
- R-04 PASS: icons unchanged.
- R-05 PASS: composition unchanged.
- R-06 PASS: local fonts and existing name font preparation retained.
- R-07 PASS: materials unchanged.
- R-08 PASS: navigation unchanged.
- R-09 PASS: no badges or labels added.
- R-10 PASS: no glass added.
- R-11 PASS: corners/contours unchanged.
- R-12 PASS: physical shadows unchanged.
- R-13 PASS: existing object emphasis unchanged.
- R-14 PASS: no panels or grids added.
- R-15 PASS: action labels unchanged.
- R-16 PASS: user-supplied proper name replaces a placeholder.
- R-17 PASS: Tasya comes from the owner's instruction.
- R-18 PASS: no invented identity or testimonial.
- R-19 PASS: all animation source unchanged.
- R-20 PASS: the actual recipient nickname personalises existing bindings.
- R-21 PASS: theme unchanged.
- R-22 PASS: all images unchanged.
- R-23 PASS: supplied recipient name used directly.
- R-24 PASS: destinations unchanged.
- R-25 PASS: colors, type and focus styles unchanged.
- R-26 PASS: controls unchanged; recipient bindings independently reviewed.
- R-27 PASS: existing empty/error/native paths retained.
- R-28 PASS: no filler added.
- R-29 PASS: palette unchanged.
- R-30 PASS: original scrapbook retained.
- R-31 PASS: name and exact-placeholder migration documented in DESIGN.md.
- R-32 PASS: accessible cover title and salutations use the same name binding.
- R-33 PASS: tracked changes use apply_patch.
- R-34 PASS: no theme/mode added.
- R-35 PASS: config/app syntax and diff checks pass; unchanged runtime paths retain historical verification.
- R-36 PASS: no new hardware or browser-performance claim.
- R-37 PASS: Antislop during3/3/3 and Taste8/9/5 retained.
- R-38 PASS: nickname matches the user's supplied fact.
- Liveliness PASS: existing physical keepsakes, whitespace and visual identity unchanged.
- C-1 PASS: the supplied name replaces the generic placeholder.
- C-2 PASS: unchanged controls retain existing bindings.
- C-3 PASS: personalisation uses the same recipient data.
- C-4 PASS: only exact old placeholders migrate; other personal fields remain.
- C-5 PASS: source review/checks and their limits are explicit.
- Taste preflight PASS: name length, shared bindings and retained visual system reviewed.

# Historical validation: clear heated blanket context, V66

28 October 2026. Status: PASS. This is a copy correction: the note now starts “I got you a heated blanket for the cold evenings at your WG in Trier.” Its next paragraph connects the blanket to a hug from him; the birthday sign-off remains. Amazon, pickup and delivery details stay absent. The title, envelope, concealed opening and all controls remain.

Verification uses copy review, the existing WebKit reading paths at375×667 and reduced/native375×520, and a visual review of the resulting screenshots. The actual reader contains the intended three paragraphs, no horizontal overflow or JavaScript errors, and no residual flight/masks after closing. The message stays absent from the closed page. At667 the complete note fits; at520 its independent reader scroll exposes the ending. No new automated test suite was added for this low-impact prose change. Earlier V65 functional checks remain historical.

Evidence: qa/v66/reading-observations.json, scene-667-note.png, reduced-520-note-end.png, final-scope-summary.json and source-preservation.json. 137/139 distribution files remain byte-identical; only the two message paragraphs and story cache reference change. All CSS, images, fonts, audio, config, book/reader motion and halos remain unchanged. Source syntax and diff whitespace checks pass. Software browser review does not certify physical-iPhone FPS or VoiceOver.

### V66 Antislop delivery gate

- R-01 PASS: existing functional highlights unchanged.
- R-02 PASS: revised prose contains no em dash.
- R-03 PASS: both phone reading paths have zero horizontal overflow; short reader scroll reaches the sign-off.
- R-04 PASS: icons unchanged.
- R-05 PASS: physical scrapbook layout unchanged.
- R-06 PASS: fonts and print styles unchanged.
- R-07 PASS: material backgrounds unchanged.
- R-08 PASS: existing functional navigation retained.
- R-09 PASS: no badges or tap labels added.
- R-10 PASS: no glass added.
- R-11 PASS: corners and contours unchanged.
- R-12 PASS: physical shadows unchanged.
- R-13 PASS: existing object emphasis unchanged.
- R-14 PASS: no cards or panels added.
- R-15 PASS: existing note action opens the clarified message.
- R-16 PASS: direct personal English supplies the missing gift reference.
- R-17 PASS: heated blanket and Trier/WG come from the owner's facts.
- R-18 PASS: no identity or testimonial added.
- R-19 PASS: all motion source remains byte-identical.
- R-20 PASS: supplied gift and location make the note specific.
- R-21 PASS: light/pink theme unchanged.
- R-22 PASS: images unchanged.
- R-23 PASS: new prose answers the owner's context correction without inventing delivery details.
- R-24 PASS: action destinations unchanged.
- R-25 PASS: foreground/background and type styles unchanged; root reviewed readable phone copy.
- R-26 PASS: actual note opening and clean closure observed in both paths.
- R-27 PASS: native/reduced reading retains the full note.
- R-28 PASS: no filler section added.
- R-29 PASS: palette unchanged.
- R-30 PASS: original scrapbook retained.
- R-31 PASS: explicit gift reference and personal connection documented in DESIGN.md.
- R-32 PASS: semantic title and keyboard/dialog controls unchanged.
- R-33 PASS: tracked prose changes use apply_patch.
- R-34 PASS: no theme or mode added.
- R-35 PASS: existing browser reading paths reviewed, story syntax and diff whitespace checks pass.
- R-36 PASS: no hardware performance claim made.
- R-37 PASS: Antislop during3/3/3 and Taste8/9/5 retained.
- R-38 PASS: “I got you” refers to the supplied existing heated blanket gift.
- Liveliness PASS: original envelope, whitespace, materials and keepsake motif unchanged.
- C-1 PASS: naming the gift removes the ambiguous “this one.”
- C-2 PASS: existing note action and closure work in actual reading.
- C-3 PASS: the note explains the personal reason for the blanket.
- C-4 PASS: both phone reading paths remain readable, with short-view scrolling.
- C-5 PASS: supplied facts and verification limits are explicit.
- Taste preflight PASS: root reviewed clarified copy in the unchanged phone reader.

# Historical validation: one last personal note, V65

28 October 2026. Status: PASS, no unresolved finding. 32/32 focused reading checks: WebKit375×667 (9), WebKit375×520 (8), native fallback667 (8), reduced/native520 (7).

The final envelope, chapter/Contents label, divider caption, accessible action and candle guidance now identify “One last note.” The closed card reads “For your Trier evenings / With love.” The full message is concealed until the envelope is opened. The reader uses a compact dated title and the exact approved three-paragraph English message, ending “Happy 25th, love.” Product-reveal, Amazon, order and pickup language are absent from the visitor ending.

Actual taps verify the candle prerequisite, hidden-before-opening message, pocket text fit, exact note content and accessible dialog title. The note still extracts through the existing card flight, fits both phone heights, holds book scroll and returns without flight/mask residue. The single replay action visibly turns the sheets and closes the cover. Root visually reviewed the final envelope and complete note at375×667. Every final case has no JavaScript errors or horizontal overflow.

Evidence: qa/v65/last-note.py, four final reports/screenshots, independent-summary.json, final-scope-summary.json and source-preservation.json. 135/139 distribution files remain byte-identical. Only story copy, the shared divider caption, the compact title selector and cache references change. All images, fonts, audio, maps, cats, shared config, halo controller/renderer, book geometry/motion and hosting config remain unchanged. Earlier broad suites are historical.

One initial harness assertion read inner_text() from the intentionally hidden final navigation label, returning an empty string. Its reports are preserved; final checks use the stored text_content() state label, with no application change for that harness correction. Browser evidence is software WebKit touch-mode, not a physical iPhone/FPS/VoiceOver certification.

### V65 Antislop delivery gate

- R-01 PASS: existing functional halos retained; no glow added.
- R-02 PASS: new product copy contains no em dash.
- R-03 PASS: note/card/reader fit and horizontal bounds pass at both phone heights and fallback paths.
- R-04 PASS: existing navigation/book icons retained.
- R-05 PASS: original physical scrapbook composition retained.
- R-06 PASS: local fonts retained; dated note title uses the existing32px print style.
- R-07 PASS: paper/linen materials unchanged.
- R-08 PASS: functional page arrows and replay retained.
- R-09 PASS: no badges or extra tap labels added.
- R-10 PASS: no glass surfaces added.
- R-11 PASS: original paper contours/corners retained.
- R-12 PASS: existing physical contact shadows unchanged.
- R-13 PASS: existing current-object emphasis retained.
- R-14 PASS: existing envelope becomes the note; no extra gift panel or grid added.
- R-15 PASS: “Open the note” names its actual action.
- R-16 PASS: exact owner-approved personal English copy, with no marketing text.
- R-17 PASS: birthday/date come from the brief; QA counts come from final reports.
- R-18 PASS: no identity or testimonial added.
- R-19 PASS: existing extraction, candle gate and complete reverse replay pass.
- R-20 PASS: the approved Trier/WG message ties the ending to their actual situation.
- R-21 PASS: selected light/pink scrapbook retained.
- R-22 PASS: all images remain byte-identical.
- R-23 PASS: the owner approved the exact note; no unprovided memory or logistics invented.
- R-24 PASS: note/candle/replay destinations retain working actions.
- R-25 PASS: ink/paper colors and focus styles unchanged; the note uses existing readable print styles.
- R-26 PASS: actual note opening/closing, candle gate, scroll lock and replay pass.
- R-27 PASS: native and reduced reading retain the full message and usable controls.
- R-28 PASS: no filler section added.
- R-29 PASS: palette unchanged.
- R-30 PASS: the original scrapbook remains; no template or product-site layout added.
- R-31 PASS: concealed note and coordinated visible labels documented in DESIGN.md.
- R-32 PASS: dialog aria-labelledby resolves to the new semantic h2; inert overlays and keyboard controls retained.
- R-33 PASS: tracked application changes use apply_patch.
- R-34 PASS: no new theme or mode added.
- R-35 PASS: 32 focused browser checks, two JavaScript syntax checks and diff whitespace checks pass.
- R-36 PASS: software verification limits are explicit; no hardware performance claims.
- R-37 PASS: Antislop during3/3/3 and Taste8/9/5 retained.
- R-38 PASS: exact approved message replaces delivery/product details without invented facts.
- Liveliness PASS: original focal envelope, whitespace, pink materials and attached-keepsake motif retained.
- C-1 PASS: a concealed personal message fits the birthday after the physical gift arrived early.
- C-2 PASS: the note and retained navigation work through actual input.
- C-3 PASS: the existing closing pocket carries the personal ending.
- C-4 PASS: phone heights, native/reduced modes, modal ownership and replay pass.
- C-5 PASS: approved prose, measured QA and its limits are recorded.
- Taste preflight PASS: root reviewed final page, compact semantic heading and full message on the phone.

# Historical validation: immediate halos and heated blanket gift, V64

28 October 2026. Status: PASS, no unresolved finding. 133/133 focused checks: fast-halo cases total79 (WebKit375×667:19, WebKit375×520:18, Chromium375×667:18, native fallback:19, reduced/native:5); gift cases total54 (WebKit667:14, WebKit520:13, native fallback:13, reduced/native:14).

The previous delay stacked navigation scroll interruptions, a 660 ms queued refresh, another 650 ms minimum wait and a 400 ms fade from zero. Ready-right entry now schedules the next animation frame, paints a visible initial strength0.55, and reaches full strength over140 ms. Navigation's programmatic scroll no longer renews a cooldown. Short40 ms retries handle manual touch settlement without requiring another page-phase change. The continuous3600 ms orbit and staggered targets remain.

Instrumented actual navigation, revisits and the seven-object page produce the first positive cue on the first observed ready frame in every final case (frameDelta0). Tests record no long intentional ready timeout and no prior object input. Multiple laps retain their run, with one contour repaint per callback and no full book-pose updates. Left/pan/turn states remain clear; reader opening cancels loops and locks the book, and closing resumes automatically. Reduced motion remains static. This measures browser callbacks/render state, not a physical display's latency or hardware frame rate.

The final pocket now reads “For chilly evenings / Heated blanket,” with a personal English reader about cold Trier evenings and pickup at the Amazon collection point near her WG. No pickup address, availability, date or code is invented. Euro value, voucher placeholder, copy and redemption actions are removed. Owner editing no longer has a voucher field; importing and exporting a legacy test config drops that retired field while preserving personal writing.

Gift text fits the physical card at375×667/520, the card still extracts into its reader, the candle prerequisite still unlocks the ending, book scrolling stays locked through the reader and closure leaves no flight/mask residue. A single final replay visibly turns the pages and closes the cover. Root visually reviewed the first-ready map, final gift page and gift reader. All final cases have no JavaScript/shader errors or horizontal overflow.

Evidence: qa/v64/fast-halos.py, gift-check.py, all nine final reports, independent-summary.json, final-scope-summary.json, screenshots, frame traces and source-preservation.json. 131/139 distribution files remain byte-identical. Eight files change: discovery entry scheduling, a safe optional navigation-tween read, gift story/config/editor, two gift layout styles and cache references. All media, maps, fonts, audio, cat notes, Three renderer/masks, book geometry/clock and hosting configuration remain. Earlier broad suites are historical.

Limits: software WebKit/Chromium touch-mode testing does not certify physical iPhone Safari, FPS or VoiceOver. Slow software Chromium sampling limits wall-time conclusions. Initial gift harness reports used unsupported mobile-WebKit mouse wheel input; they are preserved as historical, and final supported PageDown scroll-lock checks pass without any application change for that harness issue.

### V64 Antislop delivery gate

- R-01 PASS: localized halos provide the requested immediate touch discoverability.
- R-02 PASS: no em dash added to product copy.
- R-03 PASS: gift/card/reader fit and horizontal bounds pass at both phone heights and fallback paths.
- R-04 PASS: no new icons added.
- R-05 PASS: original scrapbook compositions retained.
- R-06 PASS: local fonts and their identity remain; gift title fits with existing type.
- R-07 PASS: paper/linen materials unchanged.
- R-08 PASS: functional left/right navigation and replay retained.
- R-09 PASS: no badges or repeated tap labels added.
- R-10 PASS: no glass surfaces added.
- R-11 PASS: existing paper/subject contours and corners retained.
- R-12 PASS: existing physical shadows retained.
- R-13 PASS: emphasis belongs only to current interactive keepsakes.
- R-14 PASS: no replacement cards or grids added.
- R-15 PASS: existing “Open your gift” now opens the actual heated blanket note.
- R-16 PASS: new copy is plain personal English, with no marketing claims.
- R-17 PASS: gift facts come from the owner's message; QA numbers come from final reports.
- R-18 PASS: no identity or testimonial added.
- R-19 PASS: entry removes stacked waits while the requested unlimited loop and motion gates remain.
- R-20 PASS: Trier/WG context and personal gift make the ending specific.
- R-21 PASS: selected light/pink scrapbook retained.
- R-22 PASS: all image bytes retained; no invented product photo added.
- R-23 PASS: gift wording follows the supplied purchase; unprovided pickup details are omitted.
- R-24 PASS: retired redemption links removed; remaining reader/candle/replay destinations pass.
- R-25 PASS: color/focus tokens unchanged; new gift print and reader use the existing accessible ink/paper pair.
- R-26 PASS: actual navigation, gift tap, candle, closure, replay and owner import/export pass.
- R-27 PASS: native and reduced paths retain working content and static affordances.
- R-28 PASS: no filler section added.
- R-29 PASS: original rose/mauve highlight palette retained.
- R-30 PASS: original scrapbook composition retained; Photos reference remains a localized contour gesture.
- R-31 PASS: immediate entry, settlement retries and factual gift treatment documented in DESIGN.md.
- R-32 PASS: no hover required; inert overlays and keyboard/dialog controls retained.
- R-33 PASS: tracked application changes use apply_patch.
- R-34 PASS: no extra theme or presentation mode added.
- R-35 PASS: 133 focused browser checks, five JavaScript syntax checks and diff whitespace checks pass.
- R-36 PASS: callback/frame evidence is explicitly distinguished from physical-device performance.
- R-37 PASS: Antislop during3/3/3 and Taste8/9/5 retained.
- R-38 PASS: the supplied heated blanket order replaces the retired gift; unknown pickup information is not fabricated.
- Liveliness PASS: original focal objects, whitespace, pink material motif and continuous contour gesture retained.
- C-1 PASS: removal of stacked waits resolves the demonstrated entry delay; the ending reflects the actual gift.
- C-2 PASS: focused real-input checks cover changed actions and retained prerequisites.
- C-3 PASS: the physical pocket carries the personal gift note without extra filler.
- C-4 PASS: touch, revisits, short viewport, modal return, native/reduced and legacy settings paths pass.
- C-5 PASS: order facts, measured callback evidence and software limits are explicit.
- Taste preflight PASS: root reviewed phone gift typography, physical pocket/reader, first-ready map and existing visual direction.

# Historical validation: continuous touch halos, V63

28 October 2026. Status: PASS, no unresolved finding. 56/56 focused checks: WebKit touch mode 375 × 667 (17), WebKit 375 × 520 (13), Chromium touch mode 375 × 667 (13), native CSS fallback (8), and reduced/native (5).

The current right-page attachments now share one continuous animation clock. A 3600 ms orbit, staggered positions and one 400 ms entry fade replace the old per-lap fade, inter-object gap and round pause. Multiple complete laps keep the same active run and join without a waiting state or restart. No object hover, touch or focus is needed. Static colored contours remain underneath, and decorative stickers/dividers remain unmarked.

Browser samples record more than three complete laps, elapsed-time phase continuity across the wrap, all seven note/cat/song phases moving, and one scene repaint per animation callback with no full book-pose update. Native fallback retains seven inert clipped-alpha canvases across laps, with transparent corners and sparse visible pixels. Its moving beam composites cached images instead of rebuilding pixel data every frame. Root visually reviewed the WebKit map, seven-attachment page and native fallback page.

Map reader opening clears every loop and locks book scrolling; closing it resumes automatically. Left dividers and captured navigation/turn frames stay clear. Cake/wish loops retain the candle prerequisite, finger input still blows the candle, and the gift reader opens and clears its halo. Reduced motion retains colored static cues. All final cases have no JavaScript/shader errors or horizontal overflow.

Evidence: qa/v63/continuous-loop.py, individual checks/timing/screenshots, final-scope-summary.json and source-preservation.json. 135/139 distribution files remain byte-identical. Only discovery scheduling/native painting, contour-only scene repainting and cache references change. Book engine/geometry/clock, shader masks/colors, CSS, fonts, images, story, audio, maps, dividers and configuration remain unchanged. Earlier broad suites are historical.

Limits: these are software WebKit/Chromium touch-mode tests, not physical iPhone Safari, hardware FPS or VoiceOver certification. The software Chromium run sampled slowly, so elapsed-time phase continuity supports the motion logic without asserting a display frame rate. An initial letter assertion required an arbitrary number of frames; its report is preserved, and the final check instead verifies elapsed duration, distinct poses and time-based progress for each key. No application change was needed for that harness correction.

### V63 Antislop delivery gate

- R-01 PASS: localized contours serve the explicitly requested touch discoverability.
- R-02 PASS: no product prose or em dash added.
- R-03 PASS: phone heights, native/reduced paths and horizontal bounds pass.
- R-04 PASS: no icons added.
- R-05 PASS: original scrapbook compositions retained.
- R-06 PASS: font and text bytes unchanged.
- R-07 PASS: paper/linen backgrounds unchanged.
- R-08 PASS: existing functional left/right navigation retained.
- R-09 PASS: no badges or repeated tap labels added.
- R-10 PASS: no glass surfaces added.
- R-11 PASS: original paper and subject contours retained.
- R-12 PASS: existing physical shadows retained.
- R-13 PASS: moving emphasis belongs only to current interactive attachments.
- R-14 PASS: no cards or grids added.
- R-15 PASS: existing concrete object actions retained.
- R-16 PASS: no marketing text added.
- R-17 PASS: timing and QA numbers come from source and recorded reports.
- R-18 PASS: no identity or testimonial added.
- R-19 PASS: continuous orbit directly follows the owner's unlimited-loop request; movement is suspended for navigation and reading dialogs.
- R-20 PASS: original personal keepsakes remain distinct.
- R-21 PASS: selected light/pink scrapbook retained.
- R-22 PASS: all images unchanged.
- R-23 PASS: no new visual asset or destination created.
- R-24 PASS: map, cat, candle and gift actions retain their destinations.
- R-25 PASS: text/focus styling unchanged; halos remain supplemental to semantic controls.
- R-26 PASS: direct taps, modal return, candle gate and gift checks pass.
- R-27 PASS: native fallback and reduced static paths pass.
- R-28 PASS: no filler section added.
- R-29 PASS: existing rose/mauve tokens retained.
- R-30 PASS: original scrapbook composition remains; the owner's Photos reference informs only the contour gesture.
- R-31 PASS: clock, entry fade, batching and cached native painting documented in DESIGN.md.
- R-32 PASS: no hover required; canvases remain inert and keyboard focus unchanged.
- R-33 PASS: tracked application changes use apply_patch.
- R-34 PASS: no additional theme or presentation mode.
- R-35 PASS: 56 focused browser checks, three JavaScript syntax checks and diff whitespace checks pass.
- R-36 PASS: software timing is explicitly distinguished from hardware frame rates.
- R-37 PASS: Antislop during 3/3/3 and Taste 8/9/5 retained.
- R-38 PASS: personal facts, media and placeholders unchanged.
- Liveliness PASS: original focal objects, whitespace, palette and physical keepsake motif retained; current continuous contour motion serves finger discovery.
- C-1 PASS: uninterrupted laps and lighter repaint work resolve the stated motion issue.
- C-2 PASS: existing interactive actions work in focused input checks.
- C-3 PASS: actual current attachments determine the moving contours.
- C-4 PASS: touch-only entry, repeated laps, navigation/modal gates, native and reduced paths pass.
- C-5 PASS: phase/render evidence and its software limits are recorded.
- Taste preflight PASS: reviewed scene/native contour fit, staggered motion, touch behavior, unchanged page composition and phone bounds.

# Historical validation: touch halos without hover, V62

28 October 2026. Status: PASS, no unresolved finding. 82/82 focused checks: WebKit touch mode 375 × 667/520 (18 each), Chromium touch mode 375 × 667 (18), CSS fallback (13), reduced/native (5), and focused navigation/cake/gift checks (10). Software browser evidence does not certify physical iPhone hardware, FPS or VoiceOver.

All actual current right-page attachments now keep a soft colored ambient halo before touch. The shader no longer returns to an almost-white resting edge after its introductory sweep. Native paper shadows and clipped-subject filters use the same visible rose/mauve family. The full opaque V59 border is not restored. Existing stronger orbital and press feedback remains separate from idle attachment geometry.

The automatic sequence repeats after a quiet round pause instead of disappearing once per load. Entering a reading page again resets its introduction. The first quiet delay remains 650 ms, each sweep 1250 ms, object gaps 1000 ms, and the completed-round quiet pause is 4500 ms. Quiet intervals use timers and a static rendered halo, with no continuing RAF between sweeps. Navigation, left pages, modals, hidden/blurred state and reduced motion retain their gates; reduced motion keeps the colored static cue.

The tests record object hover, movement, focus and touch events before the visibility assertions: zero object input occurs. Actual navigation buttons are tapped, then the page is observed hands-free. After the first map sweep ends, its resting image adds 1248 colored pixels in WebKit and 1227 in Chromium compared with the V61 quiet baseline. Resting Minnie adds 193/110 colored pixels. Automatic reminders repeat and reappear after revisiting, while interaction feedback stays empty until an actual touch. The quiet gap does not increment scene render frames. Left/modal ownership, direct reader taps, native ambient styles and reduced static cues pass. Root visually reviewed the resting map and note/cats/song page.

The focused follow-up caught a halo remaining on the first stationary frame after navigation started. An immediate repaint after assigning navigation intent clears it before movement; the final 10/10 follow-up confirms both that frame and subsequent turns are clean. The candle still gates the gift, finger input blows it out, the gift reader clears its cue, and the replay action remains singular.

Evidence: qa/v62/final-scope-summary.json, touch-only.py, touch-extras.py, individual reports/screenshots and source-preservation.json. 133/139 distribution files remain byte-identical. Resting contour styling, discovery round scheduling, one explicit navigation-start repaint and cache references change; no assets or content are added. The map, cat/cake masks, 1250 ms orbital movement, book geometry and clock, fonts, audio, story, divider art and original configuration remain. Earlier broad suites are historical.

### V62 Antislop delivery gate

- R-01 PASS: soft colored halos provide the explicitly requested finger-first discoverability.
- R-02 PASS: no product prose or em dash added.
- R-03 PASS: phone heights, native and fallback bounds pass.
- R-04 PASS: no icons added.
- R-05 PASS: existing scrapbook compositions retained.
- R-06 PASS: fonts and text styling unchanged.
- R-07 PASS: original paper/linen backgrounds retained.
- R-08 PASS: actual left/right navigation retained.
- R-09 PASS: no badges or repeated tap labels added.
- R-10 PASS: no glass surfaces added.
- R-11 PASS: halos follow actual paper or clipped subject contours.
- R-12 PASS: the diffuse native shadow identifies a touchable attachment.
- R-13 PASS: ambient emphasis belongs only to interactive objects; orbital emphasis remains one at a time.
- R-14 PASS: no replacement cards or grids added.
- R-15 PASS: existing concrete object actions retained.
- R-16 PASS: no marketing text added.
- R-17 PASS: no new product statistic or factual claim added.
- R-18 PASS: no identity or testimonial added.
- R-19 PASS: recurring cues follow the owner's current touch-only requirement; quiet gaps use no RAF.
- R-20 PASS: original personal keepsakes remain distinct.
- R-21 PASS: selected light/pink materials retained.
- R-22 PASS: all image bytes retained.
- R-23 PASS: no new image asset or destination created.
- R-24 PASS: existing reader/candle destinations retained.
- R-25 PASS: text/focus styles unchanged; stronger interaction cue remains supplementary to semantic controls.
- R-26 PASS: actual navigation, automatic repeat, revisit and direct reader checks pass.
- R-27 PASS: native fallback and reduced static cues pass.
- R-28 PASS: no filler section added.
- R-29 PASS: existing rose/mauve highlight tokens retained.
- R-30 PASS: behavior follows the owner's physical scrapbook and finger-first reference.
- R-31 PASS: persistent/periodic touch ownership and timing documented in DESIGN.md.
- R-32 PASS: no hover is required; canvas stays inert, keyboard focus retained.
- R-33 PASS: implementation is in tracked application source.
- R-34 PASS: no theme or extra presentation mode added.
- R-35 PASS: 82 focused checks, four JavaScript syntax checks and whitespace checks pass.
- R-36 PASS: no unsupported physical-device performance claim made.
- R-37 PASS: Antislop during 3/3/3 and Taste 8/9/5 retained.
- R-38 PASS: original personal facts, media and placeholders unchanged.
- Liveliness PASS: visible ambient contours and spaced orbital sweeps support touch discovery without competing with page turns.
- C-1 PASS: the change resolves the demonstrated one-time/faint-rest discoverability gap.
- C-2 PASS: actual taps still perform their existing actions.
- C-3 PASS: current attachments determine what is highlighted.
- C-4 PASS: touch-mode input tracking, automatic repeat/revisit, quiet gaps, native and reduced paths pass.
- C-5 PASS: zero-input and rendered-pixel evidence supports the reported behavior.
- Taste preflight PASS: reviewed soft colored rest, silhouette fit, direct touch behavior, cancellation and phone sizing.

# Historical validation: visible rose/mauve contour color, V61

28 October 2026. Status: PASS, no unresolved finding. 64/64 focused checks: WebKit 375 × 667 (19), WebKit 375 × 520 (17), Chromium 375 × 667 (17), native CSS fallback (5), reduced/native (4), and two peak-core contrast estimates. Software browser evidence does not certify physical iPhone hardware, FPS or VoiceOver.

The owner found V60's white halo invisible against cream paper. The moving and pressed contour now uses dusty rose #9c5577 with a restrained mauve shift #86709f, core alpha 0.94 and soft halo alpha 0.24. CSS tokens supply the same color family to Three uniforms, native canvas pixels and native press filters. The quiet resting state and lack of a permanent rose border are preserved.

Four manual orbital positions are compared with a no-glint baseline for both map and Minnie. WebKit 667 produces 152–243 visibly tinted map pixels and 25–56 tinted cat pixels, with differences up to 130 channel levels. Native fallback has 211 visibly tinted pixels with peak alpha 237; its canvas remains inert and pointer-transparent. Orbit movement, stronger press, modal clearing and reduced-motion behavior pass. Root visually reviewed a map quarter-position and Minnie's lower contour.

The peak-core color estimate across the actual 0–0.65 rose/mauve gradient gives at least 3.88:1 against cream paper and 3.03:1 against pink lining. These estimates concern the core over declared paper colors, not every antialiased tail pixel or photographed background. Existing text styles and keyboard focus outlines are unchanged. Source preservation confirms 134/139 distribution files are byte-identical. Only contour color/opacity, native tint sampling, press CSS and cache references change. Discovery scheduling/cancellation is byte-identical from its queue function onward; all images, story content, masks, book engine, fonts, audio, maps and dividers remain unchanged.

Evidence: qa/v61/final-scope-summary.json, colored-glint.py, final browser reports/screenshots, glint-contrast.json and source-preservation.json. Earlier V60 choreography, native geometry, candle and gift suites remain historical.

### V61 Antislop delivery gate

- R-01 PASS: the localized rose/mauve light solves the owner's reported cream-paper visibility problem.
- R-02 PASS: no new product copy or em dash added.
- R-03 PASS: both phone heights, fallback and reduced/native bounds pass.
- R-04 PASS: no icons added.
- R-05 PASS: existing content spreads and dividers retained.
- R-06 PASS: font files and typography unchanged.
- R-07 PASS: original paper/linen backgrounds unchanged.
- R-08 PASS: functional navigation arrows unchanged.
- R-09 PASS: no badges or tap labels added.
- R-10 PASS: no glass surface added.
- R-11 PASS: original paper and subject contours retained.
- R-12 PASS: soft colored halo separates the moving core from pale paper.
- R-13 PASS: only the current functional glint/press is emphasized; no permanent rose border.
- R-14 PASS: no new cards or grids added.
- R-15 PASS: existing concrete actions retained.
- R-16 PASS: no marketing prose added.
- R-17 PASS: no statistic or new factual claim added.
- R-18 PASS: no identity or testimonial added.
- R-19 PASS: orbital timing and once-per-object scheduling are byte-identical.
- R-20 PASS: existing personal keepsake shapes and content retained.
- R-21 PASS: the selected light scrapbook materials remain.
- R-22 PASS: all image bytes retained.
- R-23 PASS: the requested color correction creates no new visual asset.
- R-24 PASS: reader/candle destinations unchanged.
- R-25 PASS: original text/focus styles retained; moving core contrast estimates exceed 3:1 on the two paper colors.
- R-26 PASS: orbit, colored press and modal return checks pass.
- R-27 PASS: native colored-canvas and reduced quiet-mode checks pass.
- R-28 PASS: no filler section added.
- R-29 PASS: two dedicated highlight tokens keep tint consistent across renderers.
- R-30 PASS: correction follows the owner's scrapbook and Photos-inspired direction.
- R-31 PASS: color, alpha and renderer consistency are documented in DESIGN.md.
- R-32 PASS: canvas stays inert and pointer-transparent; keyboard focus unchanged.
- R-33 PASS: the correction lives in tracked source.
- R-34 PASS: no theme or extra presentation mode added.
- R-35 PASS: 64 focused checks, three JavaScript syntax checks and whitespace checks pass.
- R-36 PASS: no unsupported hardware or native-Apple implementation claim made.
- R-37 PASS: Antislop during 3/3/3 and Taste 8/9/5 retained.
- R-38 PASS: original personal facts, media and placeholders unchanged.
- Liveliness PASS: the existing traveling contour is visible while remaining localized and brief.
- C-1 PASS: tint and opacity correct demonstrated visibility, without adding decoration.
- C-2 PASS: existing interactions retained and press/modal checks pass.
- C-3 PASS: existing attachment geometry determines the highlight.
- C-4 PASS: phone heights, native fallback, reduced mode and shader compilation pass.
- C-5 PASS: pixel measurements and contrast-estimate limits are recorded explicitly.
- Taste preflight PASS: reviewed actual colored pixels, subtlety, paper separation, native parity and phone fit.

# Historical validation: Photos-inspired contour glints for iPhone, V60

28 October 2026. Status: PASS, no unresolved finding. 88/88 focused checks: WebKit 375 × 667/520 (21 each), Chromium 375 × 667 (21), CSS fallback core (13), reduced/native 375 × 520 (6), and focused native geometry/actions (6). Software browser evidence does not certify a physical iPhone, hardware frame rate or VoiceOver.

Actual Next from the left divider starts a localized pearl contour glint on the map without an extra touch. Progress changes continuously; four manual quarter-orbit positions visibly move the light around Minnie's alpha silhouette. The scene adds no DOM overlay. The old solid rose resting border and corner-peel cue are removed. One real visible interactive object is introduced at a time, after 650 ms quiet, for 1250 ms, with a 1000 ms gap. Each object plays once per load; the completed map sweep leaves no idle rendering loop. Press feedback remains stronger and separate from idle geometry.

Input, Previous to left, animated navigation and opened readers cancel the sweep. The map keeps book scroll locked; selected-cat reading opens and returns without mask residue. Reduced motion has no orbit. Native fallback draws a sparse clipped-alpha canvas, with transparent corners and no rectangular subject fill. Its canvas is inert, hidden from assistive technology and pointer-transparent; the focused native test confirms full overlap with the actual portrait. Existing absolute cake positioning remains intact before/during the sweep. The cake still blows out, unlocks the gift, and the gift reader opens/returns correctly. All final reports have no JavaScript or shader errors and no horizontal overflow.

Root reviewed the pearl cat quarter frames, short-height map sweep and native cat image. The shader discards fragments outside its contour before angular math, avoiding undefined center-angle work. Glint updates reuse existing contour meshes and suppress shadow refreshes; quiet gaps use timers. A pale resting edge remains flat, and functional keyboard focus retains its stronger outline. Page copies strip transient canvases and host/pulse classes. A timing-only Chromium harness race was corrected by reading the active cue atomically; native extra sampling waits for finite mid-sweep progress. A separate strict selector was narrowed to the live cake rather than its inert turn copy. No application change was needed for those harness corrections.

Evidence: qa/v60/final-scope-summary.json, ios-glint.py, final individual reports, native-extra-checks.json, screenshots and source-preservation.json. 131/139 distribution files are byte-identical; eight existing application files change, with no new files or images. All artwork, maps, fonts, audio, config, divider imagery and content remain unchanged; the story change only supplies native left/right ownership to discovery. Existing book geometry, candle gate and replay remain. The glint follows a normalized angular band over the contour, an intentional visual approximation rather than a native Apple API or exact constant-speed boundary trace. Earlier broad content/audio/replay suites remain historical.

### V60 Antislop delivery gate

- R-01 PASS: the moving light serves the owner's explicit Photos-style touch reference.
- R-02 PASS: no product copy or em dash added.
- R-03 PASS: both phone heights, native and fallback bounds pass.
- R-04 PASS: no icons added; original functional controls retained.
- R-05 PASS: existing six content spreads and image dividers remain.
- R-06 PASS: font files and text styling are byte-identical.
- R-07 PASS: physical paper/linen backgrounds remain unchanged.
- R-08 PASS: arrows retain actual left/right navigation.
- R-09 PASS: no badges or tap labels added.
- R-10 PASS: no glass surface added.
- R-11 PASS: the glint follows actual silhouettes or attached paper edges.
- R-12 PASS: the very small warm separation shadow makes pearl light visible on paper.
- R-13 PASS: one functional glint plays at a time; decorations remain unmarked.
- R-14 PASS: no replacement card grid added.
- R-15 PASS: existing object and page actions remain concrete.
- R-16 PASS: no marketing prose added.
- R-17 PASS: no statistic or new factual claim added.
- R-18 PASS: no identity or testimonial added.
- R-19 PASS: bounded once-per-object sweeps replace corner peeling; no endless idle shimmer.
- R-20 PASS: each existing keepsake retains its own physical shape and content.
- R-21 PASS: selected light/pink scrapbook materials retained.
- R-22 PASS: all original image bytes retained.
- R-23 PASS: user explicitly requested this visual touch treatment; no new image asset created.
- R-24 PASS: highlighted controls retain their existing reader/candle destinations.
- R-25 PASS: text styles and functional focus outlines are unchanged; the glint is supplementary feedback.
- R-26 PASS: map/cat/cake/gift interactions and modal cancellation pass.
- R-27 PASS: native silhouette fallback and reduced-motion static cues pass.
- R-28 PASS: no filler section added.
- R-29 PASS: pearl light uses the existing cream/warm separation palette.
- R-30 PASS: the owner's Photos reference is adapted to existing scrapbook objects.
- R-31 PASS: timing, clipping, cancellation and native geometry are documented in DESIGN.md.
- R-32 PASS: keyboard focus remains strong; canvases are inert and do not intercept input.
- R-33 PASS: behavior is implemented directly in tracked source.
- R-34 PASS: no theme or extra presentation mode added.
- R-35 PASS: 88 focused checks, five JavaScript syntax checks and whitespace checks pass.
- R-36 PASS: no physical-device performance or native-Apple implementation claim made.
- R-37 PASS: established Antislop during 3/3/3 and Taste 8/9/5 retained.
- R-38 PASS: original personal content, media and placeholders remain unchanged.
- Liveliness PASS: a quiet traveling highlight supports the existing paper identity without competing with the book motion.
- C-1 PASS: the localized light explains which attachment can be touched.
- C-2 PASS: highlighted objects keep their actual interactions.
- C-3 PASS: each contour derives from existing paper or source alpha.
- C-4 PASS: phone heights, shader compilation, native alignment, stable cake and reduced motion pass.
- C-5 PASS: visual-reference approximation and verification limits are recorded honestly.
- Taste preflight PASS: reviewed touch subtlety, silhouette accuracy, material/type continuity, cancellation and phone fit.

# Historical validation: resting highlights on tappable keepsakes, V59

28 October 2026. Status: PASS, no unresolved finding. 126/126 focused checks: WebKit scene 375 × 667 (54), WebKit scene 375 × 520 (20), Chromium scene 375 × 667 (24), blocked-Three CSS fallback (16), reduced/native 375 × 520 (10), and two cue-color contrast calculations. Software browser evidence does not certify a physical iPhone, hardware FPS or VoiceOver.

Actual Next from the left divider reveals the current right-page contours without any hover or additional touch. All registered interactive objects have resting cues: the map, four dated photo fragments, main photograph, folded note, five individual cats, song, cake, birthday card and gift. Decorative portraits, stickers and dividers have no contour registration. Contours clear throughout animated navigation, pan, left reading and an open modal. Modal close restores all current cues without leftover masks or flights. Reader interactions cover the map, dated and main photograph, cat, note, song, birthday wish and gift; the book stays scroll-locked while the reader is open. Candle gating and the matching single final replay action remain intact.

Pressing changes visible rendered pixels, while resting map contours do not create a continuing render loop after the existing one-time discovery animation settles. Resting contour strength is separate from the existing interaction lift/scale. The navigation pose cache includes cue visibility; explicit navigation-completion and modal-lock repaints prevent the touch-only case from leaving stale outlines. Root visually reviewed final map, note/cat/song, birthday and CSS fallback screenshots.

Native and fallback outlines follow the actual paper or clipped portrait silhouettes. CSS transitions take 160 ms; the native style probe waits 220 ms before measuring final colors. A controlled immediate/240 ms comparison confirmed that initially transparent filter values were a measurement of the transition's first frame, rather than missing resting CSS. The initial Three implementation used a GLSL reserved identifier; browser console checks caught the shader compilation failure. It was renamed and both final WebKit and Chromium reports contain no JavaScript or shader errors.

The rose contour composited over cream paper gives 3.47:1 at native alpha 0.70 and 3.81:1 at the scene's core alpha 0.74. A cream separation edge supports visibility over darker photographs. Existing text colors, fonts, captions and all media are unchanged. Evidence: qa/v59/final-scope-summary.json, browser checks/screenshots, cue-contrast.json and source-preservation.json. 134/139 distribution files are byte-identical; only the feedback stylesheet, Three contour shader/visibility, engine repaint points and two cache references change. No images or content are added. Earlier full replay, resize and audio suites remain historical.

### V59 Antislop delivery gate

- R-01 PASS: rose/cream contours have the user's requested tappability purpose.
- R-02 PASS: no new product copy or em dash added.
- R-03 PASS: both phone heights, CSS fallback and reduced/native bounds pass.
- R-04 PASS: no icons added; existing controls retain their meaning.
- R-05 PASS: six existing content spreads and their dividers are retained.
- R-06 PASS: Fraunces and Source Sans 3 assets are byte-identical.
- R-07 PASS: existing paper/linen backgrounds remain unchanged.
- R-08 PASS: navigation arrows still move through the established left/right order.
- R-09 PASS: no badges or labels added.
- R-10 PASS: no glass added.
- R-11 PASS: outlines follow paper edges and silhouettes; control radii unchanged.
- R-12 PASS: cream separation marks touchable attachments; no generic elevation added.
- R-13 PASS: emphasis is limited to actual interactive objects as requested; decorations stay unmarked.
- R-14 PASS: no replacement cards or uniform feature grid added.
- R-15 PASS: existing concrete object/navigation actions remain.
- R-16 PASS: no marketing copy added.
- R-17 PASS: no statistics or new factual claims added.
- R-18 PASS: no testimonials or identities added.
- R-19 PASS: steady contours use no new idle loop; existing press lift strengthens feedback.
- R-20 PASS: the real scrapbook's individual map, photos, cats and notes remain distinct.
- R-21 PASS: user-selected light paper presentation retained.
- R-22 PASS: all images and generated divider art remain byte-identical.
- R-23 PASS: no new image, identity or navigation destination created.
- R-24 PASS: every highlighted control opens its existing reader or candle action.
- R-25 PASS: text styling unchanged; rose/cream contour-core contrast calculations exceed 3:1.
- R-26 PASS: actual object taps, reader closes, candle and final endpoint pass.
- R-27 PASS: reduced/native and graphics-fallback contours pass.
- R-28 PASS: no filler section or FAQ added.
- R-29 PASS: contours reuse existing rose and cream palette roles.
- R-30 PASS: highlights follow this scrapbook's physical attachments.
- R-31 PASS: resting/press separation and current-side ownership are documented in DESIGN.md.
- R-32 PASS: existing keyboard focus remains stronger; inert/offscreen objects are not highlighted.
- R-33 PASS: changes live in tracked application source; no feature is injected at runtime.
- R-34 PASS: no theme or mode added.
- R-35 PASS: 126 checks, three JavaScript syntax checks and whitespace checks pass.
- R-36 PASS: no unsupported hardware-performance or service claim made.
- R-37 PASS: established Antislop during 3/3/3 and Taste 8/9/5 retained.
- R-38 PASS: original memories, media, portraits and placeholders remain unchanged.
- Liveliness PASS: quiet contours clarify existing collage focal points; physical press feedback retains the established dials.
- C-1 PASS: contours serve touch discovery, with no decorative extra hit layer.
- C-2 PASS: highlighted controls perform their actual existing actions.
- C-3 PASS: existing content determines each highlighted shape.
- C-4 PASS: phone, fallback, reduced motion, modal ownership and shader compilation pass.
- C-5 PASS: no personal fact or image fabricated.
- Taste preflight PASS: inspected contours, press distinction, material/type continuity, phone fit and fallback behavior.

# Historical validation: left image dividers before right keepsakes, V58

28 October 2026. Status: PASS, no unresolved finding. 211/211 checks: independent navigation and rendering 171, native mobile/desktop arrow navigation 30, root physical-boundary/resize probes 4, and title-ink contrast checks 6. WebKit covers 375 × 667/520, reduced motion and blocked-Three CSS fallback; Chromium covers 375 × 667. Native desktop is checked at 1280 × 800. Software browser evidence does not certify physical iPhone Safari, hardware frame rate or VoiceOver.

Actual controls follow cover hinge → left image divider → horizontal pan → same spread's right content → page turn → next left divider. Previous reverses those steps. Chapter links land on the left; the right objects are inert and hidden from accessibility while the divider/pan is active. Keyboard opening focuses the current divider heading. Six generated decorative images load as measured uniform atlas windows; native reading places each image before its content. Native desktop retains the selected side when both pages intersect the viewport.

The birthday's left divider can advance to its right cake. That right page still locks the gift until the candle is blown. The gift's left divider hides replay; its right endpoint shows the same styled action as the opener. Complete replay includes camera pans, turns and the closing hinge. Both stable-side resize tests and root mid-pan/mid-turn resize tests retain the intended side. The map reader retains scroll ownership. Destroying the scene restores six original dividers and one replay anchor.

The first artwork remains on the physical inside front cover across opening and stable reading. Root captures immediately before/after that boundary have zero color-channel samples differing by more than two levels. This avoids replacing it with a plane at another depth after the hinge finishes. Other left textures index the current spread; the reverse of outgoing sheet i prints incoming divider i+1. Root reviewed first left/right, second left, the short-height divider and native layouts.

Title contrast uses the actual Fraunces glyph mask over the uniformly fitted source image, excluding antialiased edge pixels. The six minimum ink/background ratios are 8.94, 8.98, 8.90, 9.05, 8.94 and 8.78. A broad rectangular crop includes an unrelated flower stem on the photograph tile, so glyph sampling verifies the actual text instead of treating unoccupied pixels as letters. Both CSS and canvas use the existing #342c2e ink.

Evidence: qa/v58/final-scope-summary.json, individual browser reports, native-navigation-checks.json, root-motion-checks.json, divider-glyph-contrast.json, screenshots and source-preservation.json. 130/135 prior distribution files are byte-identical; five existing application files change and four new divider files bring the distribution to 139 files. All prior images, maps, fonts, audio, configuration, trip data, cats and song remain unchanged. Fixed offscreen raster coordinates and failed-image cache eviction remain; deferred reflow now also waits during a pan. Earlier broad content/audio suites remain historical. Initial harness-only fixes replaced unsupported mobile WebKit mouse.wheel with PageDown and allowed Chromium's existing 180-second software-rendering replay timeout; final reports pass.

### V58 Antislop delivery gate

- R-01 PASS: existing material palette; no added gradient or glow.
- R-02 PASS: new six titles and navigation labels contain no em dash or filler.
- R-03 PASS: phone, short-height, fallback and native bounds pass.
- R-04 PASS: existing functional arrow icons retained; no new utility icon.
- R-05 PASS: six distinct dividers introduce the six existing content spreads.
- R-06 PASS: live Fraunces titles and Source Sans 3 controls retain brand typography.
- R-07 PASS: generated paper collage supports the physical scrapbook purpose.
- R-08 PASS: arrows navigate actual left/right/turn destinations.
- R-09 PASS: no badges or title pills added.
- R-10 PASS: no glass added.
- R-11 PASS: original control radii retained; dividers have paper edges.
- R-12 PASS: native divider contact shadow marks its physical paper surface.
- R-13 PASS: no glow added; keyboard focus retains its existing rose outline.
- R-14 PASS: each divider illustrates its chapter's subject; no feature-card grid.
- R-15 PASS: Next/Previous accessible names describe reading or turning.
- R-16 PASS: new copy is six short chapter titles and functional side labels.
- R-17 PASS: no statistics added; age 25 comes from the owner.
- R-18 PASS: no testimonials or fabricated identities.
- R-19 PASS: one existing clock coordinates hinge, pan, fold and full replay.
- R-20 PASS: travel, October, five cats, birthday and gift fit this scrapbook.
- R-21 PASS: user-selected light paper presentation retained.
- R-22 PASS: original generated collage motifs correspond to the actual chapters.
- R-23 PASS: user explicitly requested image-based left dividers; provenance identifies decorative generated art.
- R-24 PASS: chapter links resolve to the left side; final replay resolves to cover.
- R-25 PASS: six actual-title glyph tests exceed 8.78:1; existing control palette retained.
- R-26 PASS: actual Next/Previous, contents, candle, map close and replay flows pass.
- R-27 PASS: native/reduced and CSS fallback retain divider titles and reading order; image error handler hides broken art without hiding the title.
- R-28 PASS: no filler FAQ or explanatory divider paragraphs added.
- R-29 PASS: pink, cream, ink and established sage/cherry accents retained.
- R-30 PASS: physical chapter dividers follow the owner's scrapbook direction.
- R-31 PASS: source ownership, art fit, camera motion and native decisions are documented in DESIGN.md.
- R-32 PASS: keyboard focus reaches the left heading; offscreen right controls are inert; navigation names its destination.
- R-33 PASS: changes are written in application source, without runtime patch injection.
- R-34 PASS: no theme toggle or extra theme added.
- R-35 PASS: 211 focused checks, four JavaScript syntax checks and whitespace checks pass.
- R-36 PASS: no unsupported hardware, security or playback claim made.
- R-37 PASS: existing Antislop during 3/3/3 and Taste 8/9/5 direction is preserved.
- R-38 PASS: new imagery is declared decorative; maps, real portraits and memories remain unchanged.
- Liveliness PASS: six collage focal points, quiet title space and a continuous left-to-right book gesture support the declared dials.
- C-1 PASS: dividers establish chapter rhythm; the pan establishes reading order.
- C-2 PASS: actual controls and endpoint actions pass browser interaction checks.
- C-3 PASS: each opener belongs to existing content; no additional narrative chapter.
- C-4 PASS: short viewport, resize during movement, native desktop, reduced motion and CSS fallback pass.
- C-5 PASS: generated art is not presented as personal photography or a geographic map.
- Taste preflight PASS: inspected paper/type consistency, original imagery, phone fit, native fallbacks, focus and purposeful continuous movement; no new framework or marketing pattern.

# Historical validation: matching opening and replay buttons, V57

28 October 2026. Status: PASS, no unresolved finding. Root WebKit 60/60, Chromium 16/16 and independent WebKit 38/38, total 114/114 checks. Main coverage includes scene 375 × 667/520, reduced-native 375 × 520 and aborted-3D CSS fallback 375 × 667. Independent review covers both phone heights and native reading. Root visually reviewed cover/final screenshots at 520 height and the final 667 endpoint; the replay action matches the original rose control, font, padding, radius, height, centre and stage-bottom gap.

The original replay anchor is moved out of the gift article before pagination and attached to the same viewport layer as the opening action. No replay link remains in the printed paper or its raster source. A single shared final style now owns both actions. The final endpoint clears the centre contents and disabled next control while retaining the Previous arrow on the left. The transparent navigation container initially intercepted the new CTA despite hidden children; its endpoint pointer surface now passes through, while Previous explicitly retains pointer input. Final hit tests confirm both controls are independently reachable without overlap.

Replay is shown only on the unlocked final reading phase and hides synchronously when its reverse navigation is accepted. The existing full reverse page/cover animation is retained; native reduced motion returns directly. The cover action's pre-existing initial cover-phase visibility timing is unchanged. Resize rebuild, destroy into native reading and scene recreation preserve exactly one original action, with no ghost or duplicated text. Native reading places the styled action beneath its gift sheet. Shared controls retain their focus outline and touch target height.

The final WebKit report combines the completed scene/native checks with a focused corrected CSS-fallback run. The initial fallback harness sampled only the Three renderer's state, which does not exist when Three is intentionally blocked; sampling the book controller verifies the actual CSS opening/reverse animation. A separate initial wait assumed a new scene must set navigation=idle even before any animated navigation; the harness now accepts an unset idle state. These harness corrections required no further application changes.

Evidence is in qa/v57/: endpoint.py, final browser reports, independent reports/screenshots, shared style/geometry details and source-preservation.json. Source proof preserves 130 of 135 distribution files; only story action placement, book action ownership/visibility, two control stylesheets and cache references change. All media, maps, fonts, data defaults, cats, song, audio and Three renderer remain unchanged. V56 fixed raster CSS, failure recovery and deferred reflow remain in place. Earlier broader motion/content/audio suites are historical. Software browser evidence does not certify a physical iPhone, hardware FPS or VoiceOver.

### V57 Antislop delivery gate

- R-01 PASS: existing pink/cream palette retained; no new gradient.
- R-02 PASS: new greetings, labels and title contain no em dash or filler.
- R-03 PASS: opening/final CTA placement, tap geometry and page fit pass at 375 × 667/520, including native and CSS fallback.
- R-04 PASS: all existing icons and geographic pins remain byte-identical; no new decorative icon is added.
- R-05 PASS: seven existing compositions remain; no template section added.
- R-06 PASS: both CTAs use the exact same existing Source Sans 3 500/16px control type; no font change is introduced.
- R-07 PASS: existing paper/linen textures retain their physical-material role.
- R-08 PASS: the listening arrow identifies an external action; navigation arrows remain functional.
- R-09 PASS: no badges or repeated title pills added.
- R-10 PASS: no glass added.
- R-11 PASS: opening and replay share the existing four-pixel CTA radius and padding.
- R-12 PASS: the song's small contact shadow matches map/letter mounts and establishes paper attachment.
- R-13 PASS: existing interaction focus feedback remains; no new glow.
- R-14 PASS: unrelated artist rows are removed, without adding replacement cards.
- R-15 PASS: Listen to our song opens the verified release; portrait triggers open their readers.
- R-16 PASS: actual English food memories are preserved in their new map location; photo recap labels are dates and places.
- R-17 PASS: places, Hauptmarkt walk and meals come from the owner; OSM source geometry locates all 12 anchors without an invented walking order.
- R-18 PASS: no testimonials or fabricated identities.
- R-19 PASS: replay hides when accepted, then completes all reverse page turns and the cover hinge; reduced motion returns directly.
- R-20 PASS: all eleven real Luxembourg stops, Hauptmarkt in Trier and the couple's meal details belong to this trip.
- R-21 PASS: the user-selected light physical-paper presentation is preserved.
- R-22 PASS: existing artwork is retained; new maps are geographic visualizations of actual open vector data, without fabricated trip photography.
- R-23 PASS: no new image or personal content is created; every existing image/font/audio file is retained.
- R-24 PASS: the existing official HTTPS release remains the sole song destination.
- R-25 PASS: replay reuses the opening button's rose/paper colors and control type, verified through computed-style comparison and screenshots.
- R-26 PASS: replay and Previous have distinct pointer targets; full replay, scene rebuild and native teardown/recreation pass.
- R-27 PASS: native/reduced-motion and graphics-failure CSS paths retain one styled replay action and usable return to cover.
- R-28 PASS: no filler FAQ or chapter.
- R-29 PASS: existing pink/cream/ink and decorative accent roles remain.
- R-30 PASS: matching this project's paper objects does not clone an unrelated product.
- R-31 PASS: V57 shared styling, stage placement and final navigation-space reasons are recorded in DESIGN.md before implementation.
- R-32 PASS: actions remain native anchors with visible focus styling; Previous remains reachable and hidden redundant controls leave the endpoint clear.
- R-33 PASS: application changes are written directly in tracked source, without runtime patch injection.
- R-34 PASS: no theme-toggle changes or additional mode added.
- R-35 PASS: 114 focused browser checks, source preservation, two JavaScript syntax checks and whitespace verification pass.
- R-36 PASS: no hardware performance, security or service-playback claims made.
- R-37 PASS: Antislop during 3/3/3 and Taste 8/9/5 remain the established design direction.
- R-38 PASS: no personal content, memory, image or new claim is added; this edit matches an existing control.
- Liveliness PASS: the cover, attached paper, varied collages and actual hinge motion retain the declared dials; letter/song/cats remain distinct objects with clear spacing.
- C-1 through C-5 PASS: documented material/content purpose, exercised controls, recipient-specific content, tested fallbacks and owner-supplied facts.
- Taste preflight PASS for this bounded edit: typography/material consistency, purposeful existing motion, mobile fit, focus and truthful content were checked; inherited Fraunces is explicitly retained for brand continuity. Marketing-page patterns and framework-specific hooks do not apply to this buildless scrapbook.

# Historical validation: intermittent page corruption during turns, V56

28 October 2026. Status: PASS, no unresolved finding. The user located the symptom after turning book pages. A controlled WebKit reproduction delayed Bonnie while the Notes raster was active, then opened the book before the image completed. The stationary page painted Bonnie at local y=220; the moving case painted it at y=169 after 51 pixels of document scroll. Its later Notes screenshot showed text, paper edges, cats and decorations overlapping. This establishes a real application bug, rather than attributing it to a generic font or browser-cache issue.

The offscreen raster host now uses fixed coordinates. The same delayed-image/navigation reproduction retains local y=220 despite document scroll. The corrected Notes page is visually intact. A second controlled test showed viewport-height changes rebuilding the book while preparation was blocked; rebuilding now waits for asset preparation, navigation, touch, turn/opening phase and scrolling to settle, then measures the latest viewport. Visible page geometry, material depth, the 5.8 attachment foreground fix and navigation clock remain unchanged.

Two bounded failure probes support related lifecycle cleanup. Failed shared-image promises are evicted so a later rebuild can retry, while successful caching is retained. A real Chromium WEBGL_lose_context event during preparation previously left assetsReady=false indefinitely; both asset failure and context loss now complete a consistent partial CSS fallback. CSS opening, next/previous navigation and interrupted-fold settling pass after that loss. A forced required-image error recovers to complete WebGL after reflow; another reflow reuses the successful image cache. No automatic GPU-context rebuild or broader navigation rewrite was added.

Current browser evidence totals 384/384 checks: map/content/owner regressions WebKit 167 and Chromium 40, lifecycle recovery Chromium 13 and WebKit 4, independent turn/load/viewport stress WebKit 80 and Chromium 80. Independent stress covers both engines at 375 × 667 and 375 × 520. It holds a real portrait request during navigation, verifies stable origins and local paint positions, repeats three next/previous cycles, interrupts motion with Escape and rapid controls, changes viewport height repeatedly and opens/closes the song reader. Letter-paper images before/after stress have a changed-pixel fraction of 0.0 in all four cases. Source focus, book lock and cleanup pass with no JavaScript errors. Existing map/native/graphics-fallback reading and owner import/export/save/reload also pass.

Evidence is in qa/v56/: baseline-broken-letter.png, raster-race-proof.json, baseline/after raster and resize traces, lifecycle reports, independent stress reports, screenshots, source-preservation.json and the final distribution hashes. Root reviewed the original broken page, repaired page and mobile stress results. Source preservation verifies 130 of 135 distribution files byte-identical to V55, with no added or removed files. Only the offscreen CSS position, renderer failure handling, reflow scheduling and cache references change. All content, maps, imagery, local fonts, audio, data defaults and visible turn geometry remain unchanged. Software-browser evidence does not certify physical iPhone Safari, hardware FPS or VoiceOver; earlier broader birthday/audio/ornament suites remain historical.

### V56 Antislop delivery gate

- R-01 PASS: existing pink/cream palette retained; no new gradient.
- R-02 PASS: new greetings, labels and title contain no em dash or filler.
- R-03 PASS: delayed-load, repeated-turn and viewport stress pass at 375 × 667/520; existing map/native/fallback layouts also pass.
- R-04 PASS: all existing icons and geographic pins remain byte-identical; no new decorative icon is added.
- R-05 PASS: seven existing compositions remain; no template section added.
- R-06 PASS: established Source Sans 3 metadata and Fraunces printed title retain the scrapbook's chosen type identity.
- R-07 PASS: existing paper/linen textures retain their physical-material role.
- R-08 PASS: the listening arrow identifies an external action; navigation arrows remain functional.
- R-09 PASS: no badges or repeated title pills added.
- R-10 PASS: no glass added.
- R-11 PASS: existing square paper mounts and control radii retained.
- R-12 PASS: the song's small contact shadow matches map/letter mounts and establishes paper attachment.
- R-13 PASS: existing interaction focus feedback remains; no new glow.
- R-14 PASS: unrelated artist rows are removed, without adding replacement cards.
- R-15 PASS: Listen to our song opens the verified release; portrait triggers open their readers.
- R-16 PASS: actual English food memories are preserved in their new map location; photo recap labels are dates and places.
- R-17 PASS: places, Hauptmarkt walk and meals come from the owner; OSM source geometry locates all 12 anchors without an invented walking order.
- R-18 PASS: no testimonials or fabricated identities.
- R-19 PASS: visible motion is preserved while offscreen printing stays fixed and viewport rebuild waits for a settled book.
- R-20 PASS: all eleven real Luxembourg stops, Hauptmarkt in Trier and the couple's meal details belong to this trip.
- R-21 PASS: the user-selected light physical-paper presentation is preserved.
- R-22 PASS: existing artwork is retained; new maps are geographic visualizations of actual open vector data, without fabricated trip photography.
- R-23 PASS: no new image or personal content is created; every existing image/font/audio file is retained.
- R-24 PASS: the existing official HTTPS release remains the sole song destination.
- R-25 PASS: ink/paper roles and all visible type remain unchanged; repaired page print is visually reviewed against the broken reproduction.
- R-26 PASS: repeated/rapid/interrupted navigation, song/map readers, fallback next/previous, focus, owner import/export/save/reload pass.
- R-27 PASS: image-error retry and context-loss preparation fallback are exercised; CSS navigation and interrupted-fold settling remain usable.
- R-28 PASS: no filler FAQ or chapter.
- R-29 PASS: existing pink/cream/ink and decorative accent roles remain.
- R-30 PASS: matching this project's paper objects does not clone an unrelated product.
- R-31 PASS: V56 fixed-coordinate and settled-reflow reasons are recorded from a controlled reproduction in DESIGN.md.
- R-32 PASS: keyboard interruption, Escape, reader focus restoration, close controls and book scroll ownership pass.
- R-33 PASS: application changes are written directly in tracked source, without runtime patch injection.
- R-34 PASS: no theme-toggle changes or additional mode added.
- R-35 PASS: 384 browser checks, the before/after delayed-raster proof, source preservation, syntax and whitespace checks pass.
- R-36 PASS: no hardware performance, security or service-playback claims made.
- R-37 PASS: Antislop during 3/3/3 and Taste 8/9/5 remain the established design direction.
- R-38 PASS: the diagnosis is backed by a controlled broken-state reproduction, image coordinates, screenshots and recovery tests; all personal content is unchanged.
- Liveliness PASS: the cover, attached paper, varied collages and actual hinge motion retain the declared dials; letter/song/cats remain distinct objects with clear spacing.
- C-1 through C-5 PASS: documented material/content purpose, exercised controls, recipient-specific content, tested fallbacks and owner-supplied facts.
- Taste preflight PASS for this bounded edit: typography/material consistency, purposeful existing motion, mobile fit, focus and truthful content were checked; inherited Fraunces is explicitly retained for brand continuity. Marketing-page patterns and framework-specific hooks do not apply to this buildless scrapbook.

# Historical validation: food with the maps, visited places on city geography, V55

Status: PASS, no unresolved finding. Root WebKit 167/167 and Chromium 40/40; independent WebKit 152/152; total 359/359 browser checks. Scope includes scene 375 × 667/520, reduced-native 375 × 520 and aborted-3D fallback 375 × 667. JavaScript syntax, whitespace and independent source-preservation/projection checks pass. Root reviewed the location-only recap, complete Luxembourg city artwork and Trier map at phone width. Independent review covers city-map top/middle/bottom, food disclosure, source flight, inner scroll and close cleanup. Software browsers do not certify physical iPhone Safari, hardware FPS or VoiceOver.

Shared food stories and food labels are removed from the Four days recap and its dated readers. The three actual meal accounts appear only in the map reader's initially closed “What we ate” note. The recap prints Trier, Luxembourg, Lux → Trier and Trier. Unknown photo content remains honest placeholders; custom owner photo captions and unrelated writing survive import, export, save and reload. Editor hints now explain the new location of shared meals. The fourth day acquires no invented meal.

The regional 1000 × 650 RE11/L31 attachment remains byte-identical and is still the first reader map and source-opening target. Two new static city maps follow inside the same reader: Luxembourg has all eleven user-confirmed places pinned and fully labelled on actual city geography; Trier highlights the real Hauptmarkt square footprint and surrounding streets. The detached places disclosure is removed. All city titles, labels and OSM attribution are inside the art. Below-map prose and technical footer sentences were removed during visual review. No outside caption follows the map group.

Luxembourg delivery is 1260 × 2760; Trier is 1260 × 1980. Explicit intrinsic dimensions prevent image-loading layout shifts. Each uses a logical 420-pixel width and 20-pixel primary labels, about 13 screen pixels at reader width. Source SVG embeds the existing local Source Sans 3 and Fraunces subsets. Direct OSM API geometry supplies roads, water, parks and geographic anchors, without map screenshots or generated personal photography. Independent math reproduces every projected pin from its source coordinate with zero error; all 12 drawn pin centres match to 0.001 logical pixel. All label boxes and measured text remain inside the canvas, and pin/label collisions are absent. Area/path points remain representative rather than a claimed GPS trace.

Map image sources, licensing, dimensions, hashes, projection and text bounds are in each map's JSON/Markdown. Local artifact evidence is in qa/v55/. Browser checks verify image loading, aspect ratios, width containment, source focus, reader scroll, full food content, no recap food, no caption below maps and closing after reaching the last Trier map. Source proof preserves 121 of 127 prior distribution files, including every earlier image, the regional map, all cat notes, the sole shared song, renderer, modal/audio code, fonts and config defaults. Six existing distribution files change and eight city-map/provenance files are added. Earlier broad book/cat/audio suites are historical because their implementation remains byte-identical.

### V55 Antislop delivery gate

- R-01 PASS: existing pink/cream palette retained; no new gradient.
- R-02 PASS: new greetings, labels and title contain no em dash or filler.
- R-03 PASS: location-only recap, food note and three maps fit 375 × 667/520 in scene, native and fallback modes.
- R-04 PASS: the existing arrow SVG indicates the folded food note; geographic pins have a real map role.
- R-05 PASS: seven existing compositions remain; no template section added.
- R-06 PASS: established Source Sans 3 metadata and Fraunces printed title retain the scrapbook's chosen type identity.
- R-07 PASS: existing paper/linen textures retain their physical-material role.
- R-08 PASS: the listening arrow identifies an external action; navigation arrows remain functional.
- R-09 PASS: no badges or repeated title pills added.
- R-10 PASS: no glass added.
- R-11 PASS: existing square paper mounts and control radii retained.
- R-12 PASS: the song's small contact shadow matches map/letter mounts and establishes paper attachment.
- R-13 PASS: existing interaction focus feedback remains; no new glow.
- R-14 PASS: unrelated artist rows are removed, without adding replacement cards.
- R-15 PASS: Listen to our song opens the verified release; portrait triggers open their readers.
- R-16 PASS: actual English food memories are preserved in their new map location; photo recap labels are dates and places.
- R-17 PASS: places, Hauptmarkt walk and meals come from the owner; OSM source geometry locates all 12 anchors without an invented walking order.
- R-18 PASS: no testimonials or fabricated identities.
- R-19 PASS: regional paper remains the source-lift target, static city maps scroll inside the reader, and closing from the final map restores focus.
- R-20 PASS: all eleven real Luxembourg stops, Hauptmarkt in Trier and the couple's meal details belong to this trip.
- R-21 PASS: the user-selected light physical-paper presentation is preserved.
- R-22 PASS: existing artwork is retained; new maps are geographic visualizations of actual open vector data, without fabricated trip photography.
- R-23 PASS: owner explicitly requested places directly on maps and Hauptmarkt; data/projection/attribution provenance is supplied for both new maps.
- R-24 PASS: the existing official HTTPS release remains the sole song destination.
- R-25 PASS: existing ink/paper contrast roles retained, with title and greetings visually reviewed.
- R-26 PASS: dated readers, food disclosure, three map images, keyboard, inner scroll, Escape and owner import/export/save/reload pass.
- R-27 PASS: reduced/native and graphics fallback retain the requested content; empty song remains an explicit placeholder.
- R-28 PASS: no filler FAQ or chapter.
- R-29 PASS: existing pink/cream/ink and decorative accent roles remain.
- R-30 PASS: matching this project's paper objects does not clone an unrelated product.
- R-31 PASS: V55 content placement, city scale and typography reasons are recorded in DESIGN.md before implementation.
- R-32 PASS: family keyboard activation, Escape, focus restoration and 44-pixel close controls pass.
- R-33 PASS: application changes are written directly in tracked source, without runtime patch injection.
- R-34 PASS: no theme-toggle changes or additional mode added.
- R-35 PASS: 359 current-scope browser checks, independent geographic source proof, syntax and whitespace checks pass.
- R-36 PASS: no hardware performance, security or service-playback claims made.
- R-37 PASS: Antislop during 3/3/3 and Taste 8/9/5 remain the established design direction.
- R-38 PASS: representative district/path pins do not claim exact user positions; no walking track, restaurant branch or extra visit is invented.
- Liveliness PASS: the cover, attached paper, varied collages and actual hinge motion retain the declared dials; letter/song/cats remain distinct objects with clear spacing.
- C-1 through C-5 PASS: documented material/content purpose, exercised controls, recipient-specific content, tested fallbacks and owner-supplied facts.
- Taste preflight PASS for this bounded edit: typography/material consistency, purposeful existing motion, mobile fit, focus and truthful content were checked; inherited Fraunces is explicitly retained for brand continuity. Marketing-page patterns and framework-specific hooks do not apply to this buildless scrapbook.

# Historical validation: our Luxembourg stops and meals, V54

Status: PASS, no unresolved finding. Root WebKit 190/190 and Chromium 46/46, independent WebKit 192/192, final disclosure 39/39, total 467/467. Main suites cover scene 375 × 667/520, reduced-native 375 × 667/520 and aborted-3D fallback 375 × 667. The final SVG marker replacement has targeted scene 667/520 and native 520 checks; earlier day-reader evidence remains valid because that cosmetic adjustment changes only the map disclosure marker. Root visually reviewed the final food recap, full 23 October note, map reader and final plain arrow screenshots.

The first three dated readers now contain the owner's actual meals. 22 October: chicken katsu curry in Trier, and McDonald's nuggets for him because Tasya dislikes them. 23 October: bread in Trier, afternoon Yangguofu Malatang in Luxembourg, night Indomie goreng at their Luxembourg Airbnb. 24 October: skipped breakfast, very good O'Tacos lunch, then Aldi Trier frozen food for dinner. 25 October remains unfilled. Compact labels keep every date and lower decoration clear; the longer 23/24 labels were shortened after visual review. Full text leads each reader instead of a missing-photo placeholder.

All eleven visited places are in a keyboard-operable folded note before the existing map. Names were checked against the Luxembourg City Tourist Office, with sources in dist/assets/trip-recap.md. No sightseeing day or walking route is inferred. The map remains the final element with no caption below. Enter/Space toggle, all 11 items, reachable last item, internal scrolling while the book is held, 44-pixel close controls and restored source focus pass. Final snapshots replace the platform's orange emoji-like default marker with the existing 18-pixel arrow SVG. No new image is used as a personal trip photograph.

Legacy empty day fields receive the shared memories. A custom day note takes precedence and survives export/save/reload with unrelated writing intact. Owner placeholders and hints explain this. All image/font bytes, cats, sole shared song, 3D renderer, full motion/modal/audio code and config defaults remain unchanged. Source proof protects 121 of 126 previous distribution files; five existing files change and one textual provenance file is added. Software browsers do not certify physical iPhone Safari, FPS or VoiceOver. Earlier broad book/cat/audio suites are historical; those source files are unchanged. An initial close-control assertion was adjusted to 1 pixel for fractional geometry. Final disclosure inspection uses the authored marker rule and computed flex/list-style plus screenshot evidence because WebKit returns an empty value for that unsupported pseudo-element query.

### V54 Antislop delivery gate

- R-01 PASS: existing pink/cream palette retained; no new gradient.
- R-02 PASS: new greetings, labels and title contain no em dash or filler.
- R-03 PASS: actual meal slips, dated readers, full place list and inner scrolling fit375x667/520 in scene, native and fallback.
- R-04 PASS: the existing arrowSVG indicates unfolding places; it replaces a platform emoji-like marker and rotates with state.
- R-05 PASS: seven existing compositions remain; no template section added.
- R-06 PASS: established Source Sans 3 metadata and Fraunces printed title retain the scrapbook's chosen type identity.
- R-07 PASS: existing paper/linen textures retain their physical-material role.
- R-08 PASS: the listening arrow identifies an external action; navigation arrows remain functional.
- R-09 PASS: no badges or repeated title pills added.
- R-10 PASS: no glass added.
- R-11 PASS: existing square paper mounts and control radii retained.
- R-12 PASS: the song's small contact shadow matches map/letter mounts and establishes paper attachment.
- R-13 PASS: existing interaction focus feedback remains; no new glow.
- R-14 PASS: unrelated artist rows are removed, without adding replacement cards.
- R-15 PASS: Listen to our song opens the verified release; portrait triggers open their readers.
- R-16 PASS: direct English memories retain the actual nuggets, malatang, Indomie, O'Tacos and Aldi details.
- R-17 PASS: places and meals come from the owner; city-tourism references verify spelling only;25October stays unknown.
- R-18 PASS: no testimonials or fabricated identities.
- R-19 PASS: dated-photo/map source flights have intermediate on-screen poses; disclosure arrow changes with state and no idle motion is added.
- R-20 PASS: the food preferences, Airbnb meal and real Luxembourg stops identify this couple's trip.
- R-21 PASS: the user-selected light physical-paper presentation is preserved.
- R-22 PASS: existing owner-requested cat artwork retained byte-for-byte.
- R-23 PASS: owner explicitly supplied all places and meals; no trip photograph or extra event is invented.
- R-24 PASS: the existing official HTTPS release remains the sole song destination.
- R-25 PASS: existing ink/paper contrast roles retained, with title and greetings visually reviewed.
- R-26 PASS: fourdated readers, map, disclosurekeyboard, inner scroll, Escape, ownerimport/export/save/reload all pass current checks.
- R-27 PASS: reduced/native and graphics fallback retain the requested content; empty song remains an explicit placeholder.
- R-28 PASS: no filler FAQ or chapter.
- R-29 PASS: existing pink/cream/ink and decorative accent roles remain.
- R-30 PASS: matching this project's paper objects does not clone an unrelated product.
- R-31 PASS: V54 layout, disclosure and content reasons are recorded in DESIGN.md before implementation.
- R-32 PASS: family keyboard activation, Escape, focus restoration and 44-pixel close controls pass.
- R-33 PASS: application changes are written directly in tracked source, without runtime patch injection.
- R-34 PASS: no theme-toggle changes or additional mode added.
- R-35 PASS: 467 recorded current-scope browser checks plus three JavaScript syntax checks and whitespace verification pass.
- R-36 PASS: no hardware performance, security or service-playback claims made.
- R-37 PASS: Antislop during 3/3/3 and Taste 8/9/5 remain the established design direction.
- R-38 PASS: no sightseeing order/day, weather, tour, price, breakfast onday3 or meal onday4 is fabricated.
- Liveliness PASS: the cover, attached paper, varied collages and actual hinge motion retain the declared dials; letter/song/cats remain distinct objects with clear spacing.
- C-1 through C-5 PASS: documented material/content purpose, exercised controls, recipient-specific content, tested fallbacks and owner-supplied facts.
- Taste preflight PASS for this bounded edit: typography/material consistency, purposeful existing motion, mobile fit, focus and truthful content were checked; inherited Fraunces is explicitly retained for brand continuity. Marketing-page patterns and framework-specific hooks do not apply to this buildless scrapbook.

# Historical validation: five personal cat birthday notes, V53

Status: PASS, no unresolved finding. WebKit passes 138/138 across scene 375 × 667/520 and reduced-native 375 × 520; Chromium scene 375 × 667 passes 46/46. Total 184/184. Every individual note was opened, read to its end and closed in each mode. Viewport bounds, reachable 44-pixel close controls, modal lock, focus restoration, transient cleanup, image loading and horizontal overflow pass. Family-reader and single-song smoke pass. Root visually reviewed Winnie, Connie and Wonnie at both phone heights.

Winnie's note reflects his chubby, lazy, food-loving character and second-favourite status. Bonnie plays with other cats; Connie's note is quiet and shy; favourite Wonnie wanders and loves pampering; little Minnie loves playing with Tasya. All five notes are distinct English messages in playful cat voices, without an invented shared incident. An independent source review confirms these traits and rankings against the owner's message. Existing portrait alternatives remain useful; visible coat descriptions and implementation notes remain absent.

Only story.js and its index cache reference change in the distribution: 124/126 existing files are byte-identical to V52. All images, fonts, CSS, data defaults, song content, renderer, audio and motion code remain unchanged. JavaScript syntax and whitespace checks pass. Evidence is in qa/v53/. Earlier broad suites are historical; software browsers do not certify physical iPhone Safari, hardware FPS or VoiceOver.

### V53 Antislop delivery gate

- R-01 PASS: existing pink/cream palette retained; no new gradient.
- R-02 PASS: new greetings, labels and title contain no em dash or filler.
- R-03 PASS: root and independent mobile viewport/overflow checks pass in scene, native and fallback modes.
- R-04 PASS: music-notes glyph identifies the actual song; no new generic icon.
- R-05 PASS: seven existing compositions remain; no template section added.
- R-06 PASS: established Source Sans 3 metadata and Fraunces printed title retain the scrapbook's chosen type identity.
- R-07 PASS: existing paper/linen textures retain their physical-material role.
- R-08 PASS: the listening arrow identifies an external action; navigation arrows remain functional.
- R-09 PASS: no badges or repeated title pills added.
- R-10 PASS: no glass added.
- R-11 PASS: existing square paper mounts and control radii retained.
- R-12 PASS: the song's small contact shadow matches map/letter mounts and establishes paper attachment.
- R-13 PASS: existing interaction focus feedback remains; no new glow.
- R-14 PASS: unrelated artist rows are removed, without adding replacement cards.
- R-15 PASS: Listen to our song opens the verified release; portrait triggers open their readers.
- R-16 PASS: five distinct short English notes use playful cat voices and real personality details.
- R-17 PASS: all five personalities, the second-favourite/favourite rankings, and different play partners come directly from the owner.
- R-18 PASS: no testimonials or fabricated identities.
- R-19 PASS: existing source lift/return has intermediate poses; no extra idle animation.
- R-20 PASS: Winnie, Bonnie, Connie, Wonnie and Minnie each have different owner-grounded wording addressed to Tasya.
- R-21 PASS: the user-selected light physical-paper presentation is preserved.
- R-22 PASS: existing owner-requested cat artwork retained byte-for-byte.
- R-23 PASS: the owner explicitly supplied the five personalities; no new image or invented event added.
- R-24 PASS: the existing official HTTPS release remains the sole song destination.
- R-25 PASS: existing ink/paper contrast roles retained, with title and greetings visually reviewed.
- R-26 PASS: all five cats, family, sole shared song, Escape, focus and modal lock pass; unchanged owner flows retain V52 evidence.
- R-27 PASS: reduced/native and graphics fallback retain the requested content; empty song remains an explicit placeholder.
- R-28 PASS: no filler FAQ or chapter.
- R-29 PASS: existing pink/cream/ink and decorative accent roles remain.
- R-30 PASS: matching this project's paper objects does not clone an unrelated product.
- R-31 PASS: V53 voice/content reasons are recorded in DESIGN.md before implementation.
- R-32 PASS: family keyboard activation, Escape, focus restoration and 44-pixel close controls pass.
- R-33 PASS: application changes are written directly in tracked source, without runtime patch injection.
- R-34 PASS: no theme-toggle changes or additional mode added.
- R-35 PASS: 184 current-scope browser checks plus JavaScript syntax and whitespace checks pass.
- R-36 PASS: no hardware performance, security or service-playback claims made.
- R-37 PASS: Antislop during 3/3/3 and Taste 8/9/5 remain the established design direction.
- R-38 PASS: cat traits are owner-confirmed; birthday voices are playful wishes with no fabricated anecdote or event.
- Liveliness PASS: the cover, attached paper, varied collages and actual hinge motion retain the declared dials; letter/song/cats remain distinct objects with clear spacing.
- C-1 through C-5 PASS: documented material/content purpose, exercised controls, recipient-specific content, tested fallbacks and owner-supplied facts.
- Taste preflight PASS for this bounded edit: typography/material consistency, purposeful existing motion, mobile fit, focus and truthful content were checked; inherited Fraunces is explicitly retained for brand continuity. Marketing-page patterns and framework-specific hooks do not apply to this buildless scrapbook.

# Historical validation: birthday cat readers and our song, V52

Status: PASS, no unresolved finding. Root-focused WebKit passes 273/273 and Chromium 65/65. Independent WebKit review passes 104/104, for 442/442 checks. Root covers scene 375 × 667/520, reduced-native 375 × 667 and aborted-3D fallback 375 × 667; the independent review also covers reduced-native 375 × 520. Evidence and screenshots are in `qa/v52/`. Software browsers do not establish physical iPhone Safari performance or VoiceOver behavior.

Individual cats now open one complete existing portrait, their real name and a short birthday hello. Keyboard activation of the family opens all five with “Your birthday committee.” and “All five, here for your 25th.” Visible fur descriptions, repeated coat lists and illustration implementation notes are removed; meaningful image alternatives remain. All five individual readers and the family are checked for viewport fit, close targets, focus restoration and transient cleanup.

The song is one cream paper keepsake with the same fine border, contact shadow and printed serif title used in the scrapbook. Its page footprint stays 60 pixels tall. Source and opened reader share paper/border/padding/type styles. The reader contains only the confirmed song, Devin Velez and the verified official listening link. No other artist, playlist entry or Hamilton block appears. Actual intermediate opening poses, closing, source focus and modal book lock pass. The independent reviewer visually checked both phone heights, native reading and cat readers. A transparent ornament frame touches the song's outer edge slightly in native reading; actual writing and artwork remain clear.

The owner editor now exposes only the shared song. Retired artist-song records are preserved through legacy import, export and save rather than overwritten by absent controls; they are not rendered as a fallback. Known song defaults, local personal writing, favorite-artist portraits, all imagery, map, audio, cover/page motion and Three renderer are unchanged. Source preservation verifies 120/126 distribution files byte-identical to V51, with no files added or removed. Only `app.js`, `story.js`, two object stylesheets, cache references and song provenance change. JavaScript syntax and whitespace checks pass. The initial root harness incorrectly assumed every reader contained a folded-letter panel and expected an animated busy flag in reduced motion; those harness assumptions were corrected before the final passing runs, without changing application motion.

### V52 Antislop delivery gate

- R-01 PASS: existing pink/cream palette retained; no new gradient.
- R-02 PASS: new greetings, labels and title contain no em dash or filler.
- R-03 PASS: root and independent mobile viewport/overflow checks pass in scene, native and fallback modes.
- R-04 PASS: music-notes glyph identifies the actual song; no new generic icon.
- R-05 PASS: seven existing compositions remain; no template section added.
- R-06 PASS: established Source Sans 3 metadata and Fraunces printed title retain the scrapbook's chosen type identity.
- R-07 PASS: existing paper/linen textures retain their physical-material role.
- R-08 PASS: the listening arrow identifies an external action; navigation arrows remain functional.
- R-09 PASS: no badges or repeated title pills added.
- R-10 PASS: no glass added.
- R-11 PASS: existing square paper mounts and control radii retained.
- R-12 PASS: the song's small contact shadow matches map/letter mounts and establishes paper attachment.
- R-13 PASS: existing interaction focus feedback remains; no new glow.
- R-14 PASS: unrelated artist rows are removed, without adding replacement cards.
- R-15 PASS: Listen to our song opens the verified release; portrait triggers open their readers.
- R-16 PASS: plain birthday greetings replace catalogue-style text.
- R-17 PASS: five named cats and age 25 come from the owner.
- R-18 PASS: no testimonials or fabricated identities.
- R-19 PASS: existing source lift/return has intermediate poses; no extra idle animation.
- R-20 PASS: the real shared song and her five named cats anchor the content to this recipient.
- R-21 PASS: the user-selected light physical-paper presentation is preserved.
- R-22 PASS: existing owner-requested cat artwork retained byte-for-byte.
- R-23 PASS: no new image or invented personal memory added.
- R-24 PASS: the existing official HTTPS release remains the sole song destination.
- R-25 PASS: existing ink/paper contrast roles retained, with title and greetings visually reviewed.
- R-26 PASS: song, five cats, family, close controls, owner import/export/save/reload all exercised.
- R-27 PASS: reduced/native and graphics fallback retain the requested content; empty song remains an explicit placeholder.
- R-28 PASS: no filler FAQ or chapter.
- R-29 PASS: existing pink/cream/ink and decorative accent roles remain.
- R-30 PASS: matching this project's paper objects does not clone an unrelated product.
- R-31 PASS: V52 design reasons are recorded in DESIGN.md before implementation.
- R-32 PASS: family keyboard activation, Escape, focus restoration and 44-pixel close controls pass.
- R-33 PASS: application changes are written directly in tracked source, without runtime patch injection.
- R-34 PASS: no theme-toggle changes or additional mode added.
- R-35 PASS: 442 recorded browser checks plus syntax/whitespace verification pass.
- R-36 PASS: no hardware performance, security or service-playback claims made.
- R-37 PASS: Antislop during 3/3/3 and Taste 8/9/5 remain the established design direction.
- R-38 PASS: no invented cat behavior, listening anecdote, lyric or event.
- Liveliness PASS: the cover, attached paper, varied collages and actual hinge motion retain the declared dials; letter/song/cats remain distinct objects with clear spacing.
- C-1 through C-5 PASS: documented material/content purpose, exercised controls, recipient-specific content, tested fallbacks and owner-supplied facts.
- Taste preflight PASS for this bounded edit: typography/material consistency, purposeful existing motion, mobile fit, focus and truthful content were checked; inherited Fraunces is explicitly retained for brand continuity. Marketing-page patterns and framework-specific hooks do not apply to this buildless scrapbook.

The following V51 section and older sections are historical validation of earlier scopes.

# Historical validation: romantic keepsakes and our song, V51

27 October 2026. The new romantic reference is adapted for the owner's girlfriend: plush penguins, lipstick kisses, a rose foil heart, balloons and “my girl” cut paper. Seven placements replace seven earlier minor motifs, keeping the same default density: 50 interior decorations and one attached cover piece. All 68 earlier source records, all 15 birthday-25 pieces, all five personal cats and all 13 named portrait/crest instances remain. The source collection now contains 75 records.

The owner-confirmed memorable song is The One I Choose by Devin Velez. An independent editable `memorableSong` record now leads the printed “Our song” slip and opened soundtrack reader. Its listening destination is the verified official Apple Music release. Existing saved data without this field receives the confirmed default; old artist songs, artist notes and personal writing are retained. The favorite-artist list remains Olivia Rodrigo, Taylor Swift, Olivia Dean and Sienna Spiro.

Status: PASS, no unresolved finding. WebKit passes 248/248 across scene 375 × 667/520, reduced/native 375 × 667 and aborted-3D CSS fallback 375 × 667. Chromium scene 375 × 667 passes 71/71, for 319/319 overall. The current printed slip, opened reader, romantic page compositions and native gift header were visually reviewed. Software-browser evidence does not certify physical iPhone Safari, hardware FPS or VoiceOver.

## Current evidence

- `assets/cutouts/romance-keepsakes.webp` is 1536 × 1024 RGBA, 586,992 bytes, SHA256 `5cfad76424598466aff911516dfcd17e64ffe4c84b9027168004327f5e6fed76`. Full dimensions and every original alpha byte are preserved. Main subject pixels above alpha 24 survive the measured frames and two separating polygons, with no neighboring subject pixels at that threshold. Seven motifs are placed; the quote is retained unused rather than reduced to an unreadable note.
- Actual Three draw instrumentation confirms the atlas is printed. All seven new pieces load, remain visible, preserve uniform proportions, clear important text/art/faces and stay on paper in every tested mode. The first probe found the rotated foil heart touching the upper paper edge; its final 23 × 22 slot at top 3 clears both paper and the larger native heading.
- The song slip remains within its existing 60-pixel height and keeps the seven-page path. The opened soundtrack matches its source, contains the exact title/artist and verified HTTPS release link, preserves all four favorite artists, holds the underlying book and restores trigger focus/scroll on Escape. The official recording is accessed through the listening link; ambient synthesis and candle-controlled Happy Birthday remain unchanged.
- Public owner controls import a legacy settings file without the new record and supply the confirmed song while preserving the old Taylor Swift choice, artist note and letter. Editing, JSON export, saving and reload retain the independent new title/artist/URL. The reset label now says “Restore shared defaults”, reflecting that a real shared-song default exists.
- Trusted cover opening, full reverse replay, birthday candle prerequisite and €25 coupon smoke pass. All earlier 3D/print-depth code, modal/object readers, birthday audio, map, fonts, palette and image files are byte-identical. Source proof protects 116 of 123 existing distribution files and all 68 previous source collection entries. Only the new settings/defaults, soundtrack rendering/type detail, new collection/framing and cache/preload references change.
- Evidence is in `qa/v51/`: current browser reports/screenshots, asset/component proof, source preservation, final distribution hashes and publication/GitHub byte proofs. Earlier broad object/audio suites remain historical. Unknown names, photos, other memories/song choices and the purchased voucher code remain honest placeholders. No listening anecdote or song lyrics are invented.

## Current Antislop delivery gate

Root review retains the established Antislop during 3/3/3 and Taste 8/9/5 direction. The explicit girlfriend reference and confirmed personal song establish the scope.

- R-01 PASS: Pink remains primary; cherry, silver and small midnight-blue details follow the supplied romantic reference.
- R-02 PASS: New English labels are direct; printed “my girl” adapts the reference and no marketing filler or em dash is added.
- R-03 PASS: All seven new frames, clear writing/art bounds and no horizontal overflow pass in both phone heights and fallback modes.
- R-04 PASS: Penguins, kisses, balloons and foil heart are requested keepsakes, not unrelated UI icons.
- R-05 PASS: The seven-chapter path and overall decoration count remain unchanged.
- R-06 PASS: Cut-paper type belongs to the generated motif; live song text retains local Source Sans 3 and the established printed hierarchy.
- R-07 PASS: Plush, foil and paper textures express the physical scrapbook reference.
- R-08 PASS: The existing external-link arrow indicates the listening destination; navigation arrows keep their real function.
- R-09 PASS: No status pill or repeated headline badge is added.
- R-10 PASS: No glass or decorative blur is introduced.
- R-11 PASS: Existing control shapes and touch targets are retained.
- R-12 PASS: Existing paper contact shadows attach the motifs to the page.
- R-13 PASS: No glow or new idle pulse is added.
- R-14 PASS: Selected minor motifs are replaced to keep photos, notes and the cake as focal objects.
- R-15 PASS: Listen to our song has a verified official destination; existing opening, candle, gift and replay actions remain concrete.
- R-16 PASS: The new labels use plain English and the owner's supplied song identity.
- R-17 PASS: Age, trip/birthday dates and gift value remain the owner's facts; song identity comes directly from the owner and official release metadata.
- R-18 PASS: No testimonial or invented personal identity is added.
- R-19 PASS: Decorations use existing physical page attachments; song-reader opening, close and reverse replay pass.
- R-20 PASS: Girlfriend-directed paper words and the confirmed shared song make this a personal extension of the chosen scrapbook language.
- R-21 PASS: The existing light presentation remains.
- R-22 PASS: Generated motifs directly follow the supplied reference and keep the five named cats distinct.
- R-23 PASS: The owner explicitly requested the reference and supplied the real song; asset and listening-source provenance are recorded.
- R-24 PASS: Existing destinations remain; the new song anchor uses the verified official release URL.
- R-25 PASS: Existing ink/paper contrast roles remain; the inline artist credit uses the same readable ink and the printed slip/reader are visually checked.
- R-26 PASS: Decoration stays inert. The song slip opens its real reader, its link has a real target, settings save/export/reload and existing candle/gift/replay work.
- R-27 PASS: Native/reduced and graphics failure modes retain the new content; empty shared-title fallback keeps the earlier artist-song path.
- R-28 PASS: No FAQ, filler chapter or artificial delay is added.
- R-29 PASS: Existing pink/cream/ink surfaces remain; blue is a small reference-directed accent.
- R-30 PASS: The owner's romantic scrapbook reference drives the motifs rather than a software-product template.
- R-31 PASS: `DESIGN.md` records girlfriend wording, shared-song priority, preservation, physical attachment and no fabricated story.
- R-32 PASS: New decoration adds no focus stops; native song/settings/link controls and Escape retain keyboard behavior.
- R-33 PASS: Settings, song rendering, frames and placements are authored directly in application source.
- R-34 PASS: Existing light theme and scene/native/CSS modes are checked.
- R-35 PASS: Current browser actions, screenshots, atlas instrumentation, migration/export/reload, source hashes and syntax checks support this scope.
- R-36 PASS: No fake personal event, performance, security or subscription/playback guarantee is added.
- R-37 PASS: The explicit reference and V51 direction precede the implementation.
- R-38 PASS: The confirmed real song is distinguished from unknown personal placeholders; generated motifs are identified as decorative artwork.
- Liveliness PASS: Dials remain 3/3/3 and 8/9/5. The penguin pair, varied paper words and real shared song enrich the book while its primary objects retain breathing space.
- C-1 PASS: Every new motif and the song priority have an explicit owner reference.
- C-2 PASS: The new record roundtrips through real controls and the soundtrack opens/closes with a real listening destination.
- C-3 PASS: Personal song content replaces an unchosen-song placeholder; no filler section is added.
- C-4 PASS: Current phone/native/graphics fallback checks and legacy-data migration protect the added content.
- C-5 PASS: No lyric, listening anecdote, personal-event photograph or fabricated endorsement is invented.
- UI preflight PASS: One transparent atlas, no new font dependency, no extra captions or idle loop, unchanged physical motion and a compact two-line shared-song slip.

# Historical V50 validation: birthday ephemera for twenty-five

27 October 2026. The owner's two new scrapbook references and confirmed age 25 direct a new transparent paper/foil atlas. Fifteen placements use eleven motifs: silver 25 balloons, bunting, foil stars, heart postage, romantic cards, camera, disco ball, varied-type phrases and a red/blue car pair. Nine minor earlier ornament placements give their slots to the new pieces. The current composition has 50 interior decorations and one new cover decoration, plus the baked collage cover. All 53 previous source entries and 13 interior portrait/crest instances are retained.

The cover receives only its new silver 25. Its old eight-piece assembly remains omitted; the full image, live recipient/date and 3D hinge remain. The semantic cover title and celebration heading now expose age 25 in English. The new pieces use existing attached-page meshes and native atlas frames, with no additional controls, captions, animation loops or motion-engine changes.

Status: PASS, no unresolved finding. Final evidence contains WebKit 574/574 and Chromium 148/148 checks, 722/722 overall. After the native-position changes, the affected native case and representative scene were rerun, 294/294. Unchanged scene-520 and CSS-fallback cases retain their passing checks. Extra photo-reader and actual cake-alpha checks supplement the matrix; `assertion-review.json` records superseded harness assumptions rather than silently changing raw failures. All 15 new pieces are visible in default scene/native/fallback compositions. The caption label stays once on its page during photograph opening and closing, with no duplicate reader decoration or transient ghost. The apparent Chromium overlap with the cake's rectangular image bounds contains zero cake alpha; actual cake ink remains clear.

Following the foreground-depth correction, an additional WebKit 28/28 and Chromium 17/17 targeted checks pass, for 767 recorded passing checks overall. Actual screenshot ink verifies both complete words at rest, hover, focus, maximum press and natural focus restoration at 375 × 667/520. The photograph reader excludes the loose label, its page mask retains it once, closing leaves no ghost and a curved page turn returns it completely visible. Root reviewed the final pressed and restored screenshots. Prior failed 2.2/4.4 depth captures remain historical evidence of the corrected visibility bug; the final depth is 5.8.

## Current evidence

- `assets/cutouts/birthday-25-ephemera.webp` is 1448 × 1086 RGBA, 633,620 bytes, SHA256 `859e4cafd299bc5ab638cf77468c0c3bd2e19f7afe195130fe14ae1d4c0b225d`. Every original alpha byte and complete source dimension is preserved. Twelve measured frames retain every source pixel above alpha 1; eleven motifs are placed. The extra heart cake stays available on the source sheet rather than overlapping the interactive cake.
- Source proof preserves 114 of 121 existing distribution files byte-for-byte, including all cats, prior imagery, fonts, palette, shared configuration, map, modal/audio/candle/gift and the book clock/page-turn engine. All 53 old collection records and the existing clearance routine are identical. Changes are scoped to ornament collection/placement, three native-position variables, age wording, cover's new decoration, a foreground print-depth flag and image preload/cache keys. Three animation, hinge and curl code remains unchanged.
- A first WebKit probe caught two default placements omitted by the existing writing-clearance guard. The favorite-person label moved to the photo's blank lower-right paper beside its caption. The gift postage moved upward, away from the page number. Both keep their complete source frame and uniform proportions. The guard itself is unchanged.
- Native reading uses taller type than the fixed scene paper. Three native-only position variables move the notes bunting below its heading, the birthday bunting toward the outside corner and the darling label below the wrapped gift heading. The fixed scene positions remain unchanged.
- Root's visual review caught the photo-caption label behind the raised photograph even though its mesh existed and geometric bounds passed. Its declarative foreground flag now places that one loose paper at depth 5.8, above the photograph face, maximum 2.6 feedback lift and lower-edge tilt. The initial resting-only depth missed keyboard-focus restoration; accounting for center lift alone still missed the pressed photo's tilted lower edge. The final value clears these actual surface states. The flag changes print stacking only; the page/turn parent and motion remain the same. Targeted post-fix checks inspect actual visible wording, opening/closing and page-turn attachment rather than treating mesh existence as proof of visibility.
- Browser reports, screenshots, actual atlas draws, fitted-frame clearance, source preservation and final distribution hashes are recorded in `qa/v50/`. The final scope summary records exact totals and tested modes. Critical click-through covers cover opening, a page turn, reverse replay, note opening/closing with the book held, candle completion and the €25 coupon. Owner names retain the unchanged 60-character limit.
- These are software WebKit/Chromium checks. They do not certify physical iPhone Safari, hardware FPS or VoiceOver. Unchanged broad reader/modal suites remain historical. New generated ornaments are decorative art, distinct from the retained personal-cat illustrations and actual celebrity photographs.

## Current Antislop delivery gate

Root review retains Antislop during 3/3/3 and Taste 8/9/5. The explicit owner references and confirmed age establish the design and authorize the generated ornaments.

- R-01 PASS: Pink remains primary; cherry, silver and small sage/gold accents represent the requested physical ephemera.
- R-02 PASS: New English age wording and short printed love phrases follow the references; no marketing copy or em dash is added.
- R-03 PASS: Phone-height, source-frame, writing-clearance and paper-bound checks protect the reading areas.
- R-04 PASS: Stars, flags, camera, cards and cars are requested scrapbook objects rather than unrelated UI icons.
- R-05 PASS: The existing seven-chapter sequence is unchanged.
- R-06 PASS: Varied type belongs to the generated paper phrases; live writing retains the existing local fonts.
- R-07 PASS: Paper grain, foil and worn printing give the referenced scrapbook materials their purpose.
- R-08 PASS: Existing navigation arrows retain their real function; no decorative CTA arrow is added.
- R-09 PASS: No status badge or pill is introduced; printed cards are physical decoration.
- R-10 PASS: No glass panel or blur is added.
- R-11 PASS: Existing control shapes and touch targets are unchanged.
- R-12 PASS: Restrained contact shadows attach the new paper objects to the page.
- R-13 PASS: No glow or idle pulse is added.
- R-14 PASS: Existing page hierarchy remains; minor ornaments are selectively replaced to clear focal objects.
- R-15 PASS: Open the book, candle, coupon and replay keep their concrete actions.
- R-16 PASS: English labels stay direct; the romantic paper phrases follow the owner's examples.
- R-17 PASS: Age 25 comes from the current instruction; trip, birthday and gift values retain the owner's facts.
- R-18 PASS: No testimonial or invented personal identity is added.
- R-19 PASS: New pieces use existing hinge and curled-page attachment geometry, with no competing motion loop.
- R-20 PASS: Mixed foil, cut paper and romantic ephemera follow the supplied birthday-collage identity.
- R-21 PASS: The existing light presentation remains.
- R-22 PASS: Generated artwork directly implements the supplied ornament references.
- R-23 PASS: The owner explicitly requested these ornaments; source/delivery hashes and alpha preservation are documented.
- R-24 PASS: The existing real chapter and replay destinations remain.
- R-25 PASS: Live typography, palette and clear Polaroid fields retain their measured contrast roles; the new pictures are decorative.
- R-26 PASS: New pieces are inert; existing opening, note, candle, gift and replay handlers are retained and exercised.
- R-27 PASS: Native/reduced-motion and graphics fallbacks retain the decoration and normal reading controls.
- R-28 PASS: No FAQ, filler section or artificial delay is added.
- R-29 PASS: Existing pink/cream/ink surfaces remain; foil and small paper accents have a clear birthday role.
- R-30 PASS: The references are personal birthday scrapbooks, not a copied software-product template.
- R-31 PASS: `DESIGN.md` records motif choices, physical attachment, protected content and retained behavior.
- R-32 PASS: Decorative pieces add no focus stops; native labelled controls, focus styles and Escape remain.
- R-33 PASS: Collection, scoped cover layer and age wording are authored directly in the application source.
- R-34 PASS: Existing light theme and scene/native/CSS reading modes remain usable.
- R-35 PASS: Recorded browser actions, actual atlas instrumentation, source proofs and syntax checks support the changed scope.
- R-36 PASS: No invented performance, security, compliance or personal-event claim is added.
- R-37 PASS: The owner's two visual references and the V50 direction precede implementation.
- R-38 PASS: Generated decorative objects, retained real source photographs and personal placeholders are distinguished in provenance.
- Liveliness PASS: Dials remain 3/3/3 and 8/9/5; silver 25, varied paper phrases and small ephemera clusters enrich the book while preserving clear writing and key objects.
- C-1 PASS: Each new motif follows the supplied reference or confirmed age.
- C-2 PASS: No false control is introduced; existing critical actions retain their behavior.
- C-3 PASS: The current personal chapters remain; no generic filler chapter is added.
- C-4 PASS: Fitted frames, writing-clearance, phone layouts and existing fallback modes support the added decoration.
- C-5 PASS: The new pictures are identified as generated decoration; no fabricated personal-event photograph or endorsement is claimed.
- UI preflight PASS: One transparent atlas, no new font dependency, unchanged main typography, no extra captions, no new idle animation and existing physical attachment code.

# Historical V49 validation: image-first birthday collage cover

27 October 2026. The cover now uses one original generated collage directed by the owner's birthday-scrapbook reference: individually varied magazine-cut letters, birthday kittens, bows, strawberries, flowers and cake. The live recipient name and birthday date sit in the blank tilted Polaroid. The same complete image is printed on the native front and the physical hinged Three cover. The old cloth plaque, sewn/embossed front details, sage ribbon and eight separate cover ornaments are removed only from this cover.

Status: PASS, no unresolved finding. WebKit passes 230/230 and Chromium passes 41/41, for 271/271 recorded checks. Seven actual scene prints independently retain all image pixels outside the live text zones and have no printed ink over the bow. Minimum source-image contrast under the live text bounds is 6.85:1; the opening action is 6.70:1. All 121 final distribution hashes and 112 byte-identical existing files are recorded locally in `qa/v49/`. Root reviewed the actual cover rendering, including the whole collage, live Polaroid writing, clear opening action and absence of the old ribbon. Browser checks cover WebKit at 375 × 667/520, reduced-motion/native reading, aborted-3D CSS fallback, image failure and Chromium at 375 × 667. These are software-browser checks, not physical iPhone Safari, hardware FPS or VoiceOver certification.

## Current evidence

- `assets/illustrations/birthday-collage-cover.webp` is 1060 × 1484, 500,100 bytes, SHA256 `42db8324af81c5f7a33194a132b43fa0f8dcf5d03843b708602337cd41b5f60d`. The complete 5:7 generated canvas is retained without cropping, resizing or recoloring. The unlabelled cover kittens are decorative characters; they do not replace the five personal cat illustrations.
- Actual canvas instrumentation verifies the new image source, two separately rotated live-text surfaces and a pixel comparison outside the live writing zones. The semantic title is excluded from the printed texture. Native and Three both use uniform containment, the same seven-degree text tilt and one opening action.
- Trusted opening and reverse return traverse intermediate hinge poses. Full replay visits page-turn poses before closing the cover. Owner edits rebuild the cover, Unicode writing is retained and valid 60-character names fit the clear photo area. Names longer than the existing editor's 60-character limit remain subject to that unchanged limit.
- Resolved observations: the renderer update previously restored the old ribbon after initial hiding; both initialization and update now exclude it for this image cover. A valid long unbroken name required the extended type style above 48 characters. The date moved slightly upward/right within its caption to avoid the bow edge and improve text contrast.
- The QA harness was corrected to respect the existing 60-character editor limit, retain wrapped words when comparing printed text, measure the actual blank Polaroid boundary, avoid treating its own reference canvas as a production texture, and observe CSS hinge motion through the public book state. Earlier failed harness outputs are historical; final reports use those corrected assertions.
- The interior letter still opens and locks the underlying book, Escape restores scroll ownership, the candle gates the gift, the coupon shows €25 and full replay returns to the image cover. Image failure produces a readable greeting, recipient/date and usable opening action rather than a false-ready blank canvas.
- Independent source proof preserves all five cat outputs/coats, all interior chapter templates, readers, map, motion engines, birthday audio, candle gate, gift and shared configuration. All 45 interior decorations and 13 named portrait/crest instances remain. The 53-item source collection is retained; its eight old front placements are intentionally replaced by the new collage.
- Changed JavaScript syntax and whitespace checks pass. Source, archive and GitHub byte proofs are recorded separately. Earlier broad object/modal suites remain historical where their files are unchanged; this update does not claim every old interaction was rerun on hardware.

## Current Antislop delivery gate

Root review uses the established Antislop during 3/3/3 and Taste 8/9/5 direction. The owner's supplied reference and `DESIGN.md` establish the cover design; the image-generation request is explicit authorization.

- R-01 PASS: Existing Pink + Sage tokens remain; small paper-color accents belong to the requested collage artwork.
- R-02 PASS: New cover writing is limited to the birthday title, recipient, date and existing opening label; no marketing copy or em dash is added.
- R-03 PASS: Whole-image, clear-paper glyph bounds and document overflow checks cover both phone heights and native/fallback views.
- R-04 PASS: Birthday cats, cake, bows and paper doodles follow the explicit reference; no unrelated UI icon is added.
- R-05 PASS: The existing seven-chapter narrative remains; only its front cover is replaced.
- R-06 PASS: Varied printed letterforms implement the requested cut-paper title; live editable writing uses the existing local Fraunces and Source Sans 3.
- R-07 PASS: Paper and collage textures represent the requested physical scrapbook; the existing stage is retained.
- R-08 PASS: The opening action retains its plain label; no decorative CTA arrow is added.
- R-09 PASS: No new badge or status pill is introduced.
- R-10 PASS: No glass panel or blur is introduced.
- R-11 PASS: Existing control shapes and minimum touch targets remain.
- R-12 PASS: Artwork contact shadows imply attached paper; real book board/page shadows retain their physical purpose.
- R-13 PASS: No glow or idle pulse is added.
- R-14 PASS: The front is one designed cover image; interior object hierarchy remains unchanged.
- R-15 PASS: Open the book and Read from the cover retain concrete working actions.
- R-16 PASS: English reading and direct action labels remain; no buzzwords or filler are added.
- R-17 PASS: Birthday, trip dates and €25 amount retain the owner's supplied values.
- R-18 PASS: No testimonial or invented personal identity is added.
- R-19 PASS: The image travels on the actual hinged cover; trusted opening and full reverse replay have intermediate motion poses.
- R-20 PASS: The reference's mismatched cutout letters and birthday collage give the front its requested paper identity.
- R-21 PASS: The existing light presentation remains; no theme toggle is introduced.
- R-22 PASS: The original generated image directly implements the owner's cover brief and preserves the five personal cats inside.
- R-23 PASS: The owner explicitly requested an image-based cover and supplied its ornament reference; source/delivery hashes and generated-art provenance are documented.
- R-24 PASS: Existing contents destinations and opening/replay links retain real targets.
- R-25 PASS: Live ink is measured over its actual source-image glyph regions; the deep-rose opening action retains the verified cream/rose contrast pair. Decorative image lettering has a separate semantic title.
- R-26 PASS: Recorded clicks cover opening, return, owner save, note open/close, candle, coupon and replay; no new dead control is added.
- R-27 PASS: Missing artwork switches to a visible text greeting and functional CSS book; native/reduced and graphics fallbacks remain usable.
- R-28 PASS: No FAQ, artificial delay or filler section is added.
- R-29 PASS: Pink remains primary; cream/ink support reading and small sage/lilac/yellow paper pieces follow the supplied collage direction.
- R-30 PASS: The result follows the owner's scrapbook reference rather than a software-product template.
- R-31 PASS: `DESIGN.md` records image ownership, text clear zones, removed cover details, preserved physical depth and interior scope.
- R-32 PASS: Native labelled actions, semantic heading and existing focus styles remain; Escape closes the exercised reader.
- R-33 PASS: Cover styling, markup and renderer behavior live directly in the authored source files; no runtime file-rewrite script is shipped.
- R-34 PASS: The existing light theme is retained and scene/native/CSS modes are checked.
- R-35 PASS: Recorded browser actions, console checks, actual texture instrumentation, source preservation and syntax checks support the delivered scope.
- R-36 PASS: No fabricated performance, security, compliance or personal-event claim is added; software-browser limits are explicit.
- R-37 PASS: The user's visual reference and the V49 design direction precede the cover implementation.
- R-38 PASS: The generated cover is identified as decorative art; unknown personal content and purchased gift code remain honest placeholders.
- Liveliness PASS: Dials remain 3/3/3 and 8/9/5. Mixed cut-paper letters and the tilted Polaroid give a clear focal point; the writing field and external opening action retain purposeful space.
- C-1 PASS: Image-led paper collage follows the explicit reference and resolves the dislike of the prior assembled cover.
- C-2 PASS: The opening action, owner save, reader dismissal, candle, coupon and replay perform their recorded actions.
- C-3 PASS: Existing personal chapters remain; no new filler section is introduced.
- C-4 PASS: Phone heights, native/reduced mode, CSS graphics failure and artwork failure retain reading and controls.
- C-5 PASS: Generated decorative kittens, retained personal-cat references and honest placeholders are distinguished in provenance.
- UI preflight PASS: The cover uses one complete image and live paper writing, one primary action and the existing motion system; there are no new captions, loops or unrelated controls.

# Historical V48 validation: photo-referenced Bonnie correction

26 October2026. Bonnie now uses a standalone image_gen paper illustration based on the owner's photo: a predominantly white slim seated cat, brown-grey tabby head cap around a broad white blaze, pink nose, olive/golden-green eyes, distinct asymmetric foreleg patches and striped tail. No collar or accessories are invented. Page, selected-Bonnie reader and family reader share the same full source. Winnie, Connie, Wonnie and Minnie keep their existing output and descriptions.

Status: PASS; no unresolved finding. WebKit passes481/481 across scene375×667/520, reduced/native375×667 and aborted-3D CSS fallback375×667. Chromium scene375×667 passes115/115, for596/596 overall. Trusted family-gap touchscreen taps and keyboard family opening are included. Root reviewed the actual scene page and selected reader: whole seated Bonnie is recognizable, cleanly composited, and has no ear/paw/tail clipping or stretching.

## Current evidence

- `assets/cutouts/bonnie.webp` is1024×1536,366,430bytes, SHA256 `5f5339536ce6a5088ad6cee91595ccbfb36258f046f14ddae8582f14128bd5a6`. The supplied Bonnie photograph is the identity/marking/pose reference; Wonnie supplies the existing paper/fur style only. Quality92 WebP preserves every source alpha byte and complete dimensions without crop, resize or recoloring. Credits identify generated illustration and source provenance explicitly rather than presenting it as a literal pet photograph.
- Real Three drawImage and prepared capture instrumentation verifies Bonnie's new source plus retained Connie/Wonnie images. Full rectangular source framing and uniform containment retain the complete cat. Intermediate lift/return, X/Escape focus/source restoration, reader scroll ownership and transient-layer cleanup pass. Family touch/keyboard readers preserve all five cats and correct English descriptions.
- Independent source proof confirms the four retained cat HTML/coats, Connie/Wonnie branches/assets, original atlas, seam polygons and bounds unchanged. Root verifies114 retained distribution files, including all engine, modal, config, fonts, palette and prior imagery. Story syntax and diff checks pass. Only Bonnie's coat/reference note and image selection change; no pet biography or personality is invented.
- Evidence lives in `qa/v48/final-scope-summary.json`, source identity, current runtime/art hashes, screenshots and asset alpha proof. This is software WebKit/Chromium evidence, not physical iPhone Safari, hardware FPS or VoiceOver. Earlier broad modal/pin/candle/gift/replay suites remain historical; unchanged engine files are verified rather than described as fully rerun.

## Current Antislop delivery gate

PASS. The established Antislop during3/3/3 and Taste8/9/5 direction remains. Bonnie follows the existing pencil/watercolor paper style, with original surrounding layouts and controls.

- R-01 PASS: Pink + Sage and all surface/ink tokens are unchanged.
- R-02 PASS: No product copy or naming is rewritten.
- R-03 PASS: Current375×667/520 scene/native/fallback checks preserve complete cats and readable controls.
- R-04 PASS: A standalone Bonnie illustration corrects the owner-supplied likeness reference.
- R-05 PASS: The existing seven-chapter path is retained.
- R-06 PASS: Local Fraunces and Source Sans3 font files are byte-identical.
- R-07 PASS: No generic card grid or filler layout is introduced.
- R-08 PASS: Existing context-specific icons are preserved.
- R-09 PASS: No new badge, pill or caption is added.
- R-10 PASS: No glass or decorative blur is introduced.
- R-11 PASS: Existing control shapes and targets are retained.
- R-12 PASS: Paper and contact-shadow styling remains unchanged.
- R-13 PASS: No glow, sparkle or idle pulse is added.
- R-14 PASS: Existing five-cat paper mounts and page hierarchy stay in place.
- R-15 PASS: Contents, close, navigation, candle and coupon actions have working handlers.
- R-16 PASS: English personal writing and existing action labels remain unchanged.
- R-17 PASS: Trip dates, routes and birthday facts are unchanged.
- R-18 PASS: Bonnie identity, predominantly white coat, tabby markings and seated pose come from the supplied photograph.
- R-19 PASS: Selected-cat lift/return remains material-specific and complete; modal scroll lock stays functional.
- R-20 PASS: Bonnie retains distinctive head/foreleg markings within the approved tactile scrapbook aesthetic.
- R-21 PASS: The existing light theme is preserved.
- R-22 PASS: The image serves the explicit Bonnie reference correction; no unrelated component is added.
- R-23 PASS: Photo-referenced image_gen artwork and delivery/alpha/source hashes are documented in asset provenance.
- R-24 PASS: Contents destinations and external links retain real targets.
- R-25 PASS: All existing type/color contrast tokens are preserved.
- R-26 PASS: Selected-Bonnie and family readers, trusted touch/keyboard opening, modal hold, focus and cleanup pass.
- R-27 PASS: Native, CSS fallback, shorter viewport and full family-reader scrolling remain usable.
- R-28 PASS: No artificial delay or additional playback loop is added.
- R-29 PASS: The selected pink-primary palette is unchanged.
- R-30 PASS: No unrelated product visual system is copied.
- R-31 PASS: DESIGN.md explains likeness, seated silhouette, matching readers and protected other-cat output.
- R-32 PASS: Escape, arrows, page keys and Space work; editable fields retain Space.
- R-33 PASS: Reader boundaries contain input while long content still scrolls.
- R-34 PASS: Final contexts contain no JavaScript errors or unresolved source-mask/layer cleanup.
- R-35 PASS: Focused WebKit481/481 and Chromium115/115 checks pass; JS syntax and diff checks pass.
- R-36 PASS: Existing design dials remain3/3/3 and8/9/5.
- R-37 PASS: Asset/source proofs and114 protected-file hashes record preservation, including Connie, Wonnie and other cats.
- R-38 PASS: The artwork is identified as an illustration; no fake photograph or pet biography is presented.
- Liveliness PASS: Bonnie’s distinctive white seated silhouette and foreleg markings keep the individual pets recognizable in the existing paper mounts.
- Craftsmanship C-1 through C-5 PASS: a real owner reference, matched complete readers, preserved four-cat output, current responsive/fallback checks and explicit generated-art provenance support the correction.
- UI preflight PASS: no new control, caption pattern, font, palette, loop or unrelated section.

# Historical V47 validation: photo-referenced Connie correction

26 October2026. Connie now uses a standalone image_gen paper illustration based on the owner's supplied photo: asymmetric orange/dark calico-tabby patches, white central face/chest/legs, greenish eyes, ringed tail and the little grey collar with a bell. The standing pose is retained. Page, selected-Connie reader and family reader share one complete image. Wonnie and the other three cats keep their existing rendering.

Status: PASS; no unresolved finding. WebKit passes469/469 across scene375×667/520, reduced/native375×667 and aborted-3D CSS fallback375×667. Chromium scene375×667 passes111/111, for580/580 overall. Trusted family-gap touchscreen taps and keyboard family opening are included. Root reviewed the actual scene page and selected reader; Connie is a recognizable full standing calico with no grey matte or ear/paw/tail clipping. The pose naturally has less vertical ink than the seated cats; it is contained without stretching.

## Current evidence

- `assets/cutouts/connie.webp` is1024×1536,386,910bytes, SHA256 `80666c8bae69c08a025f46dedff61249674c3e2aefcd7a1d5a2f3e768075a815`. The real Connie photo supplies identity/coat/pose/accessories; Wonnie supplies the existing paper illustration style only. Quality92 WebP delivery preserves every source alpha byte and full dimensions, without crop, resize or recoloring. Source PNG and provenance are documented explicitly as generated illustration rather than a literal pet photo.
- Actual Three drawImage and prepared capture instrumentation verifies the new Connie source and retained Wonnie source. Full-frame rectangular clipping and uniform containment keep the complete figure in page and reader. Intermediate lift/return, close/focus/source restoration and transient-layer cleanup pass. Long reader content scrolls while the background book remains held.
- Independent source proof confirms Winnie, Bonnie, Wonnie and Minnie rendering/coats unchanged; the Wonnie branch/asset and original atlas/seam/bounds remain identical to V46. Root checks113 unchanged distribution files, including all modal, motion, config, palette, fonts and original assets. Source descriptions/reference note are updated in English; no biography or personality is invented.
- Evidence lives in `qa/v47/final-scope-summary.json`, source identity, current runtime/art hashes, screenshots and asset alpha proof. This is software WebKit/Chromium evidence, not physical iPhone Safari, hardware FPS or VoiceOver. Broader earlier modal/pin/candle/gift/replay suites remain historical; unchanged engine files are verified rather than described as fully rerun here.

## Current Antislop delivery gate

PASS. Retain the established Antislop during3/3/3 and Taste8/9/5 direction. Connie's new reference follows the existing pencil/watercolor paper style; surrounding layouts and controls remain.

- R-01 PASS: Pink + Sage and all surface/ink tokens are unchanged.
- R-02 PASS: No product copy or naming is rewritten.
- R-03 PASS: Current375×667/520 scene/native/fallback checks preserve complete cats and readable controls.
- R-04 PASS: A standalone Connie illustration corrects the owner-supplied likeness reference.
- R-05 PASS: The existing seven-chapter path is retained.
- R-06 PASS: Local Fraunces and Source Sans3 font files are byte-identical.
- R-07 PASS: No generic card grid or filler layout is introduced.
- R-08 PASS: Existing context-specific icons are preserved.
- R-09 PASS: No new badge, pill or caption is added.
- R-10 PASS: No glass or decorative blur is introduced.
- R-11 PASS: Existing control shapes and targets are retained.
- R-12 PASS: Paper and contact-shadow styling remains unchanged.
- R-13 PASS: No glow, sparkle or idle pulse is added.
- R-14 PASS: Existing five-cat paper mounts and page hierarchy stay in place.
- R-15 PASS: Contents, close, navigation, candle and coupon actions have working handlers.
- R-16 PASS: English personal writing and existing action labels remain unchanged.
- R-17 PASS: Trip dates, routes and birthday facts are unchanged.
- R-18 PASS: Connie identity, coat, standing pose and collar/bell come from the owner photograph.
- R-19 PASS: Selected-cat lift/return remains material-specific and complete; modal scroll lock stays functional.
- R-20 PASS: The distinctive calico illustration follows this pet and the approved tactile scrapbook aesthetic.
- R-21 PASS: The existing light theme is preserved.
- R-22 PASS: The image serves the explicit Connie reference correction; no unrelated component is added.
- R-23 PASS: Photo-referenced image_gen artwork and delivery/alpha/source hashes are documented in asset provenance.
- R-24 PASS: Contents destinations and external links retain real targets.
- R-25 PASS: All existing type/color contrast tokens are preserved.
- R-26 PASS: Selected-Connie and family readers, trusted touch/keyboard opening, modal hold, focus and cleanup pass.
- R-27 PASS: Native, CSS fallback, shorter viewport and full family-reader scrolling remain usable.
- R-28 PASS: No artificial delay or additional playback loop is added.
- R-29 PASS: The selected pink-primary palette is unchanged.
- R-30 PASS: No unrelated product visual system is copied.
- R-31 PASS: DESIGN.md explains likeness, standing silhouette, matching readers and protected other-cat artwork.
- R-32 PASS: Escape, arrows, page keys and Space work; editable fields retain Space.
- R-33 PASS: Reader boundaries contain input while long content still scrolls.
- R-34 PASS: Final contexts contain no JavaScript errors or unresolved source-mask/layer cleanup.
- R-35 PASS: Focused WebKit469/469 and Chromium111/111 checks pass; JS syntax and diff checks pass.
- R-36 PASS: Existing design dials remain3/3/3 and8/9/5.
- R-37 PASS: Asset/source proofs and113 protected-file hashes record preservation, including Wonnie and other cats.
- R-38 PASS: The artwork is identified as an illustration; no fake photograph or pet biography is presented.
- Liveliness PASS: the personal standing cat silhouette adds natural pose variation within existing paper mounts and approved pink/sage materials.
- Craftsmanship C-1 through C-5 PASS: a real owner reference, matched complete readers, preserved four-cat output, current responsive fallback evidence and explicit generated-art provenance support the correction.
- UI preflight PASS: no new control, caption pattern, font, palette, loop or unrelated section.

# Historical V46 validation: photo-referenced Wonnie correction

26 October2026. Replace only Wonnie's generic fourth-cat rendering with a standalone photo-referenced illustration: slender grey-brown tabby, dark stripes, large ears, narrow face, white chest and white paw socks. The same new source appears on the physical page, selected-Wonnie reader and family reader. Four other cats retain their original illustration windows and atlas bytes.

Status: PASS; no unresolved finding. Focused WebKit passes404/404 across scene375×667/520, reduced/native375×667 and aborted-3D CSS fallback375×667. Chromium scene375×667 passes104/104. A trusted family-gap touchscreen tap adds7/7 checks, for515/515 overall. Source proof and full evidence are in `qa/v46/`. Root visually reviewed the actual scene page, selected-Wonnie reader and family reader at375×667; the rendered cream paper has no baked grey rectangle or clipping.

## Current evidence

- New `assets/cutouts/wonnie.webp` is1024×1536,406,720bytes, SHA256 `08625f61a98dc83fb7ef3ea00db15551f8fd4f65b5bba319ae89649e0a385856`. Image_gen uses the owner's cat photo as the likeness reference, with a separate transparent-cutout refinement. Delivery encoding preserves every alpha byte and the full canvas; no crop, resize or recoloring is applied. Illustration provenance is explicit.
- Wonnie's full rectangular source frame uses a uniform contain fit. Source/reader bounds and image geometry retain all ears, paws and tail. Actual Three drawImage calls, prepared portrait masks and captured texture use the standalone source. Opening and return have intermediate motion; X/Escape restore focus and remove transient layers. Full family reading remains scrollable while the background book stays locked.
- The original atlas, other four rendering function, seam polygons/bounds and known subject landmarks are unchanged. Root verifies112 existing distribution files unchanged, including all motion/modal engines, fonts, palette, decoration and original image files. Story syntax and `git diff --check` pass. The English coat and reference note now correctly distinguish Wonnie's supplied photo from the older generic description.
- This is focused software-browser evidence. It does not establish physical iPhone Safari, hardware frame rate or VoiceOver. V45's broader modal/pin/candle/gift/replay evidence remains historical; those engine files are unchanged rather than represented as fully rerun here. The generated artwork is a photo-referenced illustration and is not claimed as a literal pet photograph.

## Current Antislop delivery gate

PASS. The established Antislop during3/3/3 and Taste8/9/5 direction remains. The correction follows the existing paper-sticker aesthetic and preserves the surrounding book.

- R-01 PASS: Pink + Sage and all surface/ink tokens are unchanged.
- R-02 PASS: No product copy or naming is rewritten.
- R-03 PASS: Current375×667/520 scene/native/fallback checks preserve complete cats and readable controls.
- R-04 PASS: A standalone Wonnie illustration corrects the owner-supplied likeness reference.
- R-05 PASS: The existing seven-chapter path is retained.
- R-06 PASS: Local Fraunces and Source Sans3 font files are byte-identical.
- R-07 PASS: No generic card grid or filler layout is introduced.
- R-08 PASS: Existing context-specific icons are preserved.
- R-09 PASS: No new badge, pill or caption is added.
- R-10 PASS: No glass or decorative blur is introduced.
- R-11 PASS: Existing control shapes and targets are retained.
- R-12 PASS: Paper and contact-shadow styling remains unchanged.
- R-13 PASS: No glow, sparkle or idle pulse is added.
- R-14 PASS: Existing five-cat paper mounts and page hierarchy stay in place.
- R-15 PASS: Contents, close, navigation, candle and coupon actions have working handlers.
- R-16 PASS: English personal writing and existing action labels remain unchanged.
- R-17 PASS: Trip dates, routes and birthday facts are unchanged.
- R-18 PASS: Wonnie identity and coat details come from the owner and supplied photograph.
- R-19 PASS: Selected-cat lift/return remains material-specific and complete; modal scroll lock stays functional.
- R-20 PASS: The new illustrated tabby matches this particular pet in the approved tactile scrapbook aesthetic.
- R-21 PASS: The existing light theme is preserved.
- R-22 PASS: The image serves the explicit Wonnie correction; no unrelated component is added.
- R-23 PASS: Photo-referenced image_gen artwork and delivery/alpha/source hashes are documented in asset provenance.
- R-24 PASS: Contents destinations and external links retain real targets.
- R-25 PASS: All existing type/color contrast tokens are preserved.
- R-26 PASS: Selected-Wonnie and family readers, close/focus/layer cleanup and modal book-lock checks pass.
- R-27 PASS: Native, CSS fallback, shorter viewport and full family-reader scrolling remain usable.
- R-28 PASS: No artificial delay or additional playback loop is added.
- R-29 PASS: The selected pink-primary palette is unchanged.
- R-30 PASS: No unrelated product visual system is copied.
- R-31 PASS: DESIGN.md explains likeness, complete silhouette, source reuse and protected other-cat artwork.
- R-32 PASS: Escape, arrows, page keys and Space work; editable fields retain Space.
- R-33 PASS: Reader boundaries contain input while long content still scrolls.
- R-34 PASS: Final contexts contain no JavaScript errors or unresolved source-mask/layer cleanup.
- R-35 PASS: Current focused WebKit404/404 and Chromium104/104 checks pass; JS syntax and diff checks pass.
- R-36 PASS: Existing design dials remain3/3/3 and8/9/5.
- R-37 PASS: Current asset/source proofs and protected112-file hashes record exact image and geometry preservation.
- R-38 PASS: The artwork is identified as an illustration; no fake photograph or pet biography is presented.
- Liveliness PASS: full personal cat silhouettes retain their existing focal paper mounts, pink/sage materials and varied scrapbook composition.
- Craftsmanship C-1 through C-5 PASS: an owner-supplied likeness reference, complete matching readers, preserved four-cat originals, current responsive fallback checks and explicit illustration provenance support the change.
- UI preflight PASS: no new control, decorative caption, font, palette, loop or unrelated section is added.

# Historical V45 validation: modal scroll ownership

26 October 2026. Hold the scrapbook whenever any reader or owner-settings modal is open, through its complete closing motion. Scrolling within a long note or form remains available. Pending book navigation and scrub stop at the displayed pose; close restores the prior page and normal controls.

Status: PASS; no unresolved finding. Final WebKit passes240/240 focused checks across scene375×667/520, mobile scene, reduced/native mobile and aborted-3D CSS fallback. Chromium desktop/mobile scene passes101/101. Independent native-source/graphics-fallback checks pass9/9; explicit global-refresh and667→460→667 source-geometry checks pass6/6. See `qa/v45/final-scope-summary.json` and the complete116-file `final-tested-sha256.json`. Root verifies109 other existing distribution files unchanged.

## Current evidence and resolved findings

- The V44 baseline reproduces an active-navigation race: opening settings leaves the book moving from scroll1369 to1721/read→turn. Final same-task capture/click checks show the exact displayed pose held during active navigation and scrub, with no restart on close.
- Shared acquisition happens before object capture. Root/body scroll containment, selective wheel/touch boundary guards and Space paging cover readers and owner settings. Nested active dialogs keep the lock until the last close. Inline styles and their priorities are restored. The same-task contents close→go path releases synchronously.
- Native mobile WebKit uses an offset fixed body because its document scroll event can be deferred. Direct source-rectangle measurements show no acquisition or dismissal jump; long modal content remains scrollable. Pinned scene/CSS books retain their existing DOM and pin geometry.
- A disabled ScrollTrigger pin can be reverted by global refresh. The book temporarily participates in that synchronous refresh, then returns to the same held pose with scrolling disabled. Actual source bounds, document position and displayed time remain unchanged through explicit refresh and a667→460→667 round trip. The next tap reaches the immediate next chapter. Rendering uses a local held display time, keeping GSAP's invalidated start values intact.
- Viewport/motion mode changes wait until release. X, Escape, backdrop, trusted mouse dismissal, early close, native direct close, owner cancel/save and contents selection release correctly. Full owner writing, typed spaces, focus handling, current chapter, graphics-loss fallback, candle/audio/gift gate, coupon and animated reverse cover replay are covered.
- Initial reports remain separately labelled `initial-*`, `before-refresh-fix-*` and `before-playhead-fix-*`; they are not presented as final passes. The initial Chromium scrub comparison had a separate-evaluation timing confound; final same-task race samples distinguish displayed motion from automation delay. Root JS syntax checks and `git diff --check` pass. No new asset, dependency or animation loop is introduced. Content, map, palette, fonts and decoration artwork remain unchanged.

Root visually reviewed the375×667 scene and native opened-map screenshots. This is software WebKit/Chromium evidence. WebKit trusted wheel uses desktop browser mode at375px; mobile touch cancellation uses explicit synthetic events. No physical iPhone, hardware FPS or VoiceOver claim is made, and earlier broad suites are not described as rerun.

## Current Antislop delivery gate

PASS. Antislop during3/3/3 and Taste8/9/5 remain the session direction. DESIGN.md records the functional reason for holding the physical book and allowing independent modal reading.

- R-01 PASS: Pink + Sage and all surface/ink tokens are unchanged.
- R-02 PASS: No product copy or naming is rewritten.
- R-03 PASS: Current375×667/520 scene/native/fallback checks preserve usable modal reading.
- R-04 PASS: No decorative UI or unrelated component is added.
- R-05 PASS: The existing seven-chapter path is retained.
- R-06 PASS: Local Fraunces and Source Sans3 font files are byte-identical.
- R-07 PASS: No generic card grid or filler layout is introduced.
- R-08 PASS: Existing context-specific icons are preserved.
- R-09 PASS: No new badge, pill or caption is added.
- R-10 PASS: No glass or decorative blur is introduced.
- R-11 PASS: Existing control shapes and targets are retained.
- R-12 PASS: Paper and contact-shadow styling remains unchanged.
- R-13 PASS: No glow, sparkle or idle pulse is added.
- R-14 PASS: The existing paper hierarchy and object composition remain.
- R-15 PASS: Contents, close, navigation, candle and coupon actions have working handlers.
- R-16 PASS: English personal writing and existing action labels remain unchanged.
- R-17 PASS: Trip dates, routes and birthday facts are unchanged.
- R-18 PASS: No anecdote, identity, photo or gift code is invented.
- R-19 PASS: Object opening/return motion remains; the background book alone is held.
- R-20 PASS: The approved tactile scrapbook identity remains.
- R-21 PASS: The existing light theme is preserved.
- R-22 PASS: Scroll locks serve the explicit request for modal input ownership.
- R-23 PASS: Existing sourced artwork and credits are byte-identical.
- R-24 PASS: Contents destinations and external links retain real targets.
- R-25 PASS: All existing type/color contrast tokens are preserved.
- R-26 PASS: Current close, contents, form, candle, coupon and replay interactions pass.
- R-27 PASS: Full long writing, native reading and graphics fallback pass.
- R-28 PASS: No artificial delay or additional playback loop is added.
- R-29 PASS: The selected pink-primary palette is unchanged.
- R-30 PASS: No unrelated product visual system is copied.
- R-31 PASS: DESIGN.md gives the reason for acquisition, held pose and release.
- R-32 PASS: Escape, arrows, page keys and Space work; editable fields retain Space.
- R-33 PASS: Reader boundaries contain input while long content still scrolls.
- R-34 PASS: Final contexts report no JavaScript exceptions or unresolved layer cleanup.
- R-35 PASS: Current meaningful browser checks pass356/356; syntax and diff checks pass.
- R-36 PASS: Existing design dials remain3/3/3 and8/9/5.
- R-37 PASS: Complete source hashes, baseline, initial findings and final limits are recorded.
- R-38 PASS: No realistically styled fabricated content is introduced.
- Liveliness PASS: the retained physical book, object focal points, pink/sage materials and varied paper composition remain; the functional lock protects their motion.
- Craftsmanship C-1 through C-5 PASS: stated purpose, complete inner reading, genuine controls, current native/scene/fallback coverage and retained factual sources.
- UI preflight PASS: no new font, copy, asset, layout pattern, decorative effect or unresolved input state.

# Historical V44 validation: RE11/L31 memory map and personal copy

26 October 2026. Replace the generic country overview with the owner's confirmed RE11 journey toward Luxembourg and L31 return toward Trier. The railway has two rails and sleepers; the bus is a distinct dashed connection with its own direction arrow. Short personal English prose appears above the map. Both main and reader figures have no caption or prose below them; the old technical disclaimer, empty souvenir slip and duplicated itinerary list are removed.

Status: PASS, no unresolved finding. Final WebKit passes444/444 focused checks across scene375×667/520, reduced/native375×667, aborted-3D375×667 and long owner-written intro/dedication fixtures. Chromium scene375×667 passes112/112. Current scope, source hashes and screenshots are in `qa/v44/final-scope-summary.json`. Initial reports remain historical: the first above-map paragraph caused writing-clearance to hide Lewis, fixed by6px internal paragraph padding; an oversized default reader paragraph was removed and the map-reader prose made compact. Internal rotated-object bounds and expected short-screen camera scaling are distinguished from actual paper/document overflow in the corrected harness. No earlier broad suite is claimed as rerun.

## Geography, content and interaction evidence

- Sixteen railway-location anchors are independently reprojected against the editable SVG, with maximum0.1235 output-pixel error. CFL/ACF location tables and OSM station facts support the rose rail corridor. Intermediate anchors are not all RE11 stops. The L31 curve is a geographically anchored schematic connection along the supported corridor, not an exact road trace or claim about the owner's boarding/alighting terminal. No time, distance, fare or service disruption is invented. Detailed primary sources and limitations are in `dist/assets/illustrations/trier-luxembourg-route.md` and its JSON reference.
- Directional SVG metadata, visible service labels and arrows identify Trier→Luxembourg RE11 and Luxembourg→Trier L31. Trier lies northeast of Luxembourg. Both rails and perpendicular sleepers are present; the final labels are enlarged for phone reading. A complete1000×650 vector render uses the actual local Source Sans3 font, then WebP encoding without crop/resize. Delivery SHA256 is `a4c49c9aec5b3c4f432b97ba161a17418578c39e40f19e6acfc0073ab715ee00`,39,238bytes.
- The new authored fallback reads: “RE11 to Luxembourg. L31 back to Trier. I wish those four days with you had been just a little longer.” It uses confirmed modes and the four-day visit, without fabricated anecdotes. Any owner-written intro/dedication remains intact, including full beginning/end sentinels in the expanded reader. Default and custom prose stays above the final map object. Names, photographs, other notes and gift code remain unchanged.
- The same new map source appears on the paper and in the reader. Current trusted-input checks cover actual lift/return, Escape/X, downward dismissal, focus restoration and temporary-layer cleanup. The complete default reader map is visible without scrolling at375×667; longer owner writing and shorter displays retain native scrolling. Scene page-turn attachment, candle/audio/gift gate, coupon reader and animated cover replay still pass.
- All14 named portrait/crest instances remain visible and clear in the final default contexts. The prose padding protects Lewis without moving him into his helmet sticker. No horizontal document overflow or physical map escape from the paper remains. Rotated paper may extend2px beyond its inner content box while staying within the actual sheet, which is intentional physical layout rather than a document-overflow defect.
- Root independently verifies46 protected configuration, interaction, decoration, original image and font files against V43. The two changed JavaScript modules pass syntax checks; `git diff --check` passes. No new dependency, animation loop or remote runtime image is introduced. QA artifacts, research downloads and diagram render scripts remain excluded from publication and GitHub.

Root visually reviewed the final full source render, main375×667 page and opened Chromium reader. This is software WebKit/Chromium evidence, not physical iPhone Safari, hardware frame rate or VoiceOver testing. The mapped connections are explicitly schematic; the user's actual transport statement is retained without replacing it with a separate notice's dates or terminals.

## Current Antislop delivery gate

PASS. DESIGN.md records the current route/copy design read before edits. Explicit Antislop during3/3/3 and Taste8/9/5 preserve the authored paper aesthetic, printed type and responsive reading.

- R-01 PASS: existing Pink + Sage materials and ink roles distinguish rail and bus meaningfully.
- R-02 PASS: short English personal prose replaces placeholders; route names/dates keep their established spelling and no decorative em dash is added.
- R-03 PASS: final375×667/520 scene/native/fallback checks preserve paper bounds, readable labels, whole faces and controls.
- R-04 PASS: rails, sleepers, city pins and direction arrows communicate the actual requested transport story.
- R-05 PASS: the existing journey chapter remains; duplicated below-map content is removed rather than adding a filler section.
- R-06 PASS: Source Sans3 map labels use the site's actual local font; all existing font files remain unchanged.
- R-07 PASS: the paper illustration carries geographic route data, not a generic decorative grid.
- R-08 PASS: new arrows express confirmed outward and return directions.
- R-09 PASS: no badge, pill or sticker caption is added.
- R-10 PASS: no glass or decorative blur is introduced.
- R-11 PASS: existing physical map mount and controls retain their established shapes.
- R-12 PASS: existing paper/contact shadows remain unchanged.
- R-13 PASS: no glow, sparkle or idle pulse is added.
- R-14 PASS: personal prose, route image and retained corner keepsakes follow a measured composition.
- R-15 PASS: the real map button still opens its matching reader; no false action is added.
- R-16 PASS: no marketing language is added.
- R-17 PASS: modes/directions and22–25 October come from the owner; no exact travel time or terminal is fabricated.
- R-18 PASS: no shared incident, personal photo or unknown identity is invented.
- R-19 PASS: the same source map lifts and returns through existing motion; native reduced-motion reading remains.
- R-20 PASS: the user's specific RE11/L31 journeys and personal four-day message make the page particular to this relationship.
- R-21 PASS: the approved single light theme remains.
- R-22 PASS: a sourced data diagram replaces the old overview for an explicit map purpose.
- R-23 PASS: the user requested route imagery; source facts, original diagram construction and delivery provenance are documented.
- R-24 PASS: existing map/coupon readers and source links have real destinations.
- R-25 PASS: existing dark ink/action colors and approved paper surfaces carry map text and personal prose; interface contrast roles remain.
- R-26 PASS: current map, dismissal, page, candle, gift and replay click-through passes.
- R-27 PASS: remaining honest placeholders and loading/error/fallback behavior stay usable; full owner-text fixtures are checked.
- R-28 PASS: no FAQ is introduced.
- R-29 PASS: no unrelated palette system is added; rail and bus use the established rose/sage language.
- R-30 PASS: the route illustration extends the authored scrapbook, not a product template.
- R-31 PASS: DESIGN.md explains source geography, schematic limits, above-map prose, attribution and clearance.
- R-32 PASS: existing keyboard dismissal, visible focus and trigger restoration remain functional.
- R-33 PASS: feature/style/vector/documentation changes use apply_patch; browser rendering produces the new data-diagram delivery without changing photo files.
- R-34 PASS: the single shipped theme is exercised in scene/native/fallback.
- R-35 PASS: current source, image identity, motion and input checks are recorded; earlier broad suites remain historical.
- R-36 PASS: no surveyed-path, timetable, hardware or performance claim is invented.
- R-37 PASS: the current design read and retained explicit dials precede implementation.
- R-38 PASS: owner-confirmed journeys, verified location facts and authored emotional prose remain distinct from unsupplied personal details.
- Liveliness PASS: a clear personal route focal point, purposeful paper space, distinct service strokes and retained scrapbook keepsakes match the declared dials.
- Craftsmanship C-1 through C-5 PASS: the requested changes have written purposes, genuine readers, no duplicated filler, current fallback coverage and factual source evidence.
- UI/Taste pre-flight PASS: preserve the paper aesthetic, approved type/color hierarchy and one theme; original data artwork and measured mobile layouts serve the requested story.

Owner-private access remains unchanged; recipient access remains deferred. GitHub receives the matching app and documents without the private Site binding, credentials, local QA or deployment archive.

# Historical validation: composed collages and tactile photo finish, V43

25 October 2026. Implement the four selected aesthetic changes: grouped collages, consistent photographic finishing, deliberate busy/quiet composition and subtle paper/cover material details. All 53 decorations and all 14 named portrait/crest instances remain. Seven chapters, original sources, personal content, fonts, closed notes, candle/audio, gift and replay behavior are retained.

Status: PASS in the current focused scopes. WebKit passes 703/703 assertions across scene375×667/520, reduced-motion/native375×667 and aborted-3D375×667. Chromium scene375×667 passes190/190. Additional independent color/material probes check the actual cached print against native CSS, original alpha, cache reuse, idle transform counts, cover stitching and actual photograph mount marks. Exact scopes, current hash ledger and probe results are recorded in `qa/v43/final-scope-summary.json`. Earlier V39/V41/V42 broad suites are not claimed as rerun.

## Selected changes and evidence

- Composition: Messi, Yamal and Barcelona form one Notes cluster. Taylor/Rodrigo pair on Photographs; Dean/Spiro pair below the gift. George joins the Four days keepsakes. Supporting bow, key, hearts and moon positions follow those clusters. The birthday cake gains clear surrounding space after Rodrigo moves; note and full coupon geometry stay unobscured. Actual fitted source windows remain separate even where paper-edge grouping is close. All named pieces remain visible in every default context.
- Finishing: saturation0.90, sepia0.09 and contrast0.98 apply a mild warm photograph treatment. Native CSS and a cached scene print use the same operations, including real shared photographs and their reader. Original files and measured source windows remain unchanged; the club crest and illustrated ornaments retain their original colors. Scene prints preserve alpha, crop before processing and cap whole-photo dimensions at1600px. The processing loop does not allocate a new array per pixel and does not run during page animation.
- Independent color comparison: the same raw source crop, rendered through native CSS, is compared with the actual cached toned print through the same canvas display/resampling path. Chromium mean and p95 RGB delta are0; WebKit mean delta0.295 and p95 delta1. The earlier image-versus-canvas probe had a downsampling confound and is retained separately rather than described as an application defect. Actual print alpha is unchanged; repeated image/frame requests return the same cache entry, and idle transform counts stay13→13.
- Material: static paper-edge fibres and a small corner-relief highlight stay within mount margins. Faint cover-edge wear, spine stitching and an offset light thread beside the nameplate seam extend the existing cloth/paper construction. Native styles and explicit scene painting describe corresponding physical details. No face, photograph window, writing or control is clipped, stretched or covered; no new animation loop, asset, caption or interaction is added.
- Current click-through covers cover opening, all chapters, real music/football page-bending attachments, both concealed note readers and refolding, dismissal/focus/cleanup, candle lock/audio state, full coupon reader and animated replay to cover. Native/reduced-motion and aborted-3D paths retain the same content and usable controls. No horizontal overflow or runtime exception remains in the covered contexts.
- Root independently verifies43 protected content, interaction, image and font files against the V42 commit. Five changed/new JavaScript modules pass syntax checks, and `git diff --check` passes. QA original-source hashes and the final runtime ledger bind the current implementation to packaging. New scripts, styles and print caches introduce no dependency installation or network image request.

Root visually reviewed the three new collage pages and quieter birthday composition; the final material/tone probes and source evidence supplement those captures. Verification is software WebKit/Chromium, not physical iPhone Safari, hardware frame rate or VoiceOver. QA files and fixtures remain excluded from deployment and GitHub.

## Current Antislop delivery gate

PASS. The V43 design read precedes implementation in DESIGN.md. Explicit Antislop during ENERGY/RHYTHM/MOTION3/3/3 and Taste8/9/5 preserve the established paper aesthetic and responsive reading priorities.

- R-01 PASS: the established Pink + Sage interface remains; the mild photograph grade serves material consistency.
- R-02 PASS: no new visible prose, captions, emoji or decorative punctuation is added.
- R-03 PASS: scene375×667/520 and native/fallback scopes retain complete subjects, clear controls and no overflow.
- R-04 PASS: real named photographs and the genuine crest keep their intended identities; no new generic icons are added.
- R-05 PASS: three content-specific clusters and a quieter birthday page replace scattered composition without adding a section.
- R-06 PASS: local Fraunces/Source Sans 3 and their source bytes remain unchanged.
- R-07 PASS: fibre, linen and stitch marks express the book's actual paper/cloth materials.
- R-08 PASS: existing navigation and gift arrows retain their real actions.
- R-09 PASS: no badge, caption strip or pill is added.
- R-10 PASS: no glass or decorative blur is introduced.
- R-11 PASS: photo mounts, die cuts, emblem and controls keep distinct physical shapes.
- R-12 PASS: light contact/edge shading explains paper thickness and corner relief.
- R-13 PASS: no glow, sparkle or new idle pulse is added.
- R-14 PASS: paired music photographs and a football trio occupy different measured compositions.
- R-15 PASS: new decoration creates no false controls or generic action labels.
- R-16 PASS: no marketing language is added.
- R-17 PASS: dates, birthday and gift amount remain supplied values.
- R-18 PASS: all named sources and personal-memory placeholders remain accurate and separate.
- R-19 PASS: existing page bending carries the grouped print; finite existing motion and reduced-motion reading are preserved.
- R-20 PASS: the named interests, cats, trip and birthday retain their specific scrapbook identity.
- R-21 PASS: the approved single light theme remains.
- R-22 PASS: real sourced photographs and existing generated paper motifs retain their documented product roles.
- R-23 PASS: the user selected these four refinements; no new imagery is generated or downloaded, and display changes are credited.
- R-24 PASS: no new link or destination is introduced; existing readers remain functional.
- R-25 PASS: text colors/fonts remain unchanged with prior AA evidence; the new grade affects photographs only.
- R-26 PASS: current chapter, note, candle, gift and replay click-through passes; decorative layers intercept no input.
- R-27 PASS: empty placeholders and loading/error behavior remain, with current native and graphics-fallback checks.
- R-28 PASS: no FAQ is introduced.
- R-29 PASS: no interface color role changes; photo finishing and paper highlights are material treatments.
- R-30 PASS: changes extend the authored physical scrapbook rather than a borrowed product shell.
- R-31 PASS: DESIGN.md records grouping, whitespace, color operations, caching and margin-only physical detail purposes.
- R-32 PASS: no new focus stops; visible focus, keyboard dismissal and trigger restoration remain usable.
- R-33 PASS: feature/style/documentation edits use apply_patch; every original image file remains unchanged.
- R-34 PASS: the single shipped theme is exercised in scene/native/fallback.
- R-35 PASS: current click-through, independent tone comparison and captured layouts are recorded without claiming prior broad suites as rerun.
- R-36 PASS: no hardware, speed, security or performance guarantees are invented from software-browser evidence.
- R-37 PASS: the retained brand, new design read and explicit dials precede edits.
- R-38 PASS: actual fan media stays credited; no personal story, travel photograph or gift code is fabricated.
- Liveliness PASS: clear focal objects, clustered detail, intentional quiet areas, rose actions and tactile paper identity match the declared dials.
- Craftsmanship C-1 through C-5 PASS: each selected change has a reason, works with the existing controls, adds no filler content and has source/render evidence.
- UI/Taste pre-flight PASS: preserve the original paper aesthetic, font/color hierarchy and one theme; original photographs, consistent finishing and measured responsive compositions support the four selected changes.

The Site remains owner-private; arranging recipient access remains deferred. GitHub receives the matching app and documents without the private Site binding, credentials, QA or deployment archive.

# Historical validation: real music photographs and Barcelona keepsakes, V42

25 October 2026. Replace the four symbolic music stickers with actual Taylor Swift, Olivia Rodrigo, Olivia Dean and Sienna Spiro photographs; add Lionel Messi, Lamine Yamal and the actual FC Barcelona crest. The three racing illustrations, seven F1 portrait instances and 36 paper ornaments remain. There are 53 default decorations. All new pieces have accessible identities and no visible captions, controls or touch interception. Seven chapters, closed letters, five whole cats, content, fonts, Pink + Sage and gift behavior remain.

Status: PASS, no unresolved finding. Current evidence is `qa/v42/final-scope-summary.json`. WebKit's focused run is retained as 486/489 across scene 375×667/520, reduced/native 375×667 and aborted-3D 375×667: its three failures were the old Sienna/Alex overlap at bottom78. Moving only Sienna to bottom66 is verified by a fresh 293/293 gift matrix across those four contexts plus Chromium scene375×667. Full focused Chromium scene375×667 passes 130/130. Historical failures are not relabelled as passes, and the earlier full V39/V41 suites are not claimed as rerun.

## Scope and source evidence

- All seven new assets match their independently downloaded served bytes, dimensions, SHA256s and measured frames. Music and football source/rights details are in `dist/assets/FANDOM-PHOTOS.md`. Taylor and Rodrigo are iHeartRadioCA photographs under CC BY 3.0, with author, source and license links; other media has credited third-party copyright. No generated likeness, endorsement, current-team or personal-trip claim is added.
- Contact-sheet and actual page review confirm complete upper heads, hair crowns, ears, faces and chins. Long hair, shoulders and clothing may intentionally meet the photo boundary. Opaque photos and Yamal's genuine source shadow are assessed visually, without invalid whole-image alpha claims. Independent pixel analysis retains all 44,545 alpha>=13 Messi pixels above y310 and all 9,602 crest pixels inside their respective measured windows; the separate club wordmark is excluded.
- The four old guitar/microphone entries are removed from the rendered collection. The original atlas remains unchanged for its three racing motifs. Each new photograph uses its own local image, source window and uniform scale; narrow paper backing is rasterized consistently in Three. New photo/crest pieces join actual page attachments, including intermediate page-bending evidence for singer and football leaves.
- Current layouts keep every new subject visible, with writing, cat/photo/candle, other-face and complete coupon/pocket clearance. Native and short-screen layouts retain the same subjects. Root visually reviewed all five affected chapter compositions plus the final scene/native gift captures.
- Click-through evidence covers book opening, chapter navigation, both still-concealed notes and their full inner readers, X/Escape/refolding/focus cleanup, birthday candle/audio, gift coupon and full animated cover replay. Native/reduced-motion and aborted-3D paths remain usable. No horizontal overflow or runtime exception remains in the covered contexts.
- `config.js`, `trip.js`, `story.js`, reader engine, folded-note styles, original cats, racing/music atlas and ephemera match the prior commit. Three changed JavaScript modules pass syntax checks; `git diff --check` passes. Current QA hashes bind the final runtime/art source to the packaged version.

Verification is limited to software WebKit/Chromium, source inspection and captured input/render behavior. It does not establish physical iPhone Safari, hardware frame rate or VoiceOver. QA scripts, captures and source-download scratch files remain excluded from deployment and GitHub.

## Current Antislop delivery gate

PASS. Root reviewed the current source diff, original/source-frame contact sheets, seven new on-page identities and final scene/native gift layout. Explicit Antislop during 3/3/3 and Taste 8/9/5 retain the authored direction in DESIGN.md.

- R-01 PASS: Pink + Sage interface roles remain; real photo colors belong to content.
- R-02 PASS: no new visible prose, caption, emoji or decorative punctuation is added.
- R-03 PASS: current 375×667/520 scene/native/fallback scopes have no horizontal overflow or unresolved layout conflict.
- R-04 PASS: actual requested people and the genuine club crest replace the unwanted symbolic music props.
- R-05 PASS: the existing chapter-specific compositions remain; no filler section is added.
- R-06 PASS: local typography and font bytes remain unchanged, with their documented brand roles.
- R-07 PASS: existing paper/linen materials remain; photo paper backing belongs to its printed keepsake.
- R-08 PASS: navigation arrows and real actions remain unchanged.
- R-09 PASS: new stickers have no added captions, badges or pills; FCB letters are part of the actual crest.
- R-10 PASS: no glass or decorative blur is added.
- R-11 PASS: rectangular photo paper, cutout faces, crest and native controls retain distinct physical roles.
- R-12 PASS: restrained contact shadows describe attached paper thickness.
- R-13 PASS: no new glow or looping animation is added.
- R-14 PASS: photographs use measured spare areas in varied chapter compositions.
- R-15 PASS: decorations introduce no false button or generic action label.
- R-16 PASS: no marketing language is added.
- R-17 PASS: dates, birthday and gift amount remain supplied values.
- R-18 PASS: each requested identity is verified from its real source, without invented personal photography.
- R-19 PASS: actual stickers follow intermediate page bends; native reduced-motion reading remains available.
- R-20 PASS: the recipient's named music, racing, football and cat interests retain a specific scrapbook identity.
- R-21 PASS: the approved single light theme remains.
- R-22 PASS: sourced actual photographs replace four symbolic guitar/microphone illustrations.
- R-23 PASS: the user explicitly requested these subjects; each file has accurate source, rights and byte provenance.
- R-24 PASS: decorations add no links; existing controls retain real readers and destinations.
- R-25 PASS: no interface text/color changes; prior measured AA contrast and focus treatment remain scoped to unchanged text.
- R-26 PASS: current note/candle/gift/replay and chapter click-through passes; new decorations intercept no input.
- R-27 PASS: honest placeholders, loading/error paths and native/graphics fallbacks remain; affected fallback layouts are checked.
- R-28 PASS: no FAQ is added.
- R-29 PASS: no interface palette role changes; subject colors are photographic content.
- R-30 PASS: additions extend the existing physical book rather than a product-template shell.
- R-31 PASS: DESIGN.md explains source choice, paper backing, placement, crop and clearance.
- R-32 PASS: no new focus stops; existing button activation, dismissal and focus restoration pass.
- R-33 PASS: UI, style and documentation edits use apply_patch; original served image bytes are copied unchanged.
- R-34 PASS: the single shipped theme remains covered in scene/native/fallback.
- R-35 PASS: current affected-control click-through and captures are recorded; unrelated historical suites are not presented as current reruns.
- R-36 PASS: no hardware, performance, security or customer claims are invented.
- R-37 PASS: the V42 design read and retained explicit dials precede implementation.
- R-38 PASS: real sourced fan media remains distinct from honest personal-memory and gift placeholders.
- Liveliness PASS: explicit dials, distinct focal objects, structured space, rose action accent and tactile photo/paper motifs remain coherent.
- Craftsmanship C-1 through C-5 PASS: additions serve the explicit interests, introduce no dead controls or filler chapters, retain fallback resilience and have recorded evidence.
- UI/Taste pre-flight PASS: preserve the authored paper aesthetic, local type, palette and physical motion; genuine images, whole subject windows and current responsive captures support the change.

Owner-private access remains unchanged; recipient access is still deferred. The matching GitHub export excludes the private Site binding, credentials, local QA and deployment archive.

# Historical validation: unopened notes and three more driver faces, V41

25 October 2026. Add the requested real faces of George Russell, Lando Norris and Oscar Piastri. The main letter and birthday wish now show closed paper exteriors; tapping unfolds their full writing, and closing refolds them. Other recap text stays visible. Seven chapters, personal data, five whole cats, Pink + Sage, typography, candle/audio and the Amazon.de €25 ending are retained. There are now 50 default decorations, including seven portrait instances for five drivers.

Status: PASS, no unresolved finding. Current scoped evidence is `qa/v41/final-scope-summary.json`, with 19 final runtime/art hashes in `qa/v41/final-tested-sha256.json`. WebKit passes 356/356 focused assertions across scene 375×667/520, reduced-motion/native 375×667, aborted-3D 375×667, and long letter/wish fixtures in scene/native. Chromium's focused run is retained as 101/102: its sole failure was a 0.313px Lando/coupon-border overlap. The final 43×44px Lando slot, top67 in scene and top119 in native, passes a fresh 73/73 gift matrix across all five browser/render contexts. The 101 unaffected Chromium assertions remain scoped to their original run; no failed result is relabelled or hidden. The initial placement and intermediate top64 failures are also retained separately. The full historical V39 suite was not rerun.

## Current behavior and source evidence

- Main letter and birthday-wish text is absent from all page and print DOM before opening. Both retain their complete salutation, writing and signoff inside the existing reader. Distinct long-message begin/end sentinels prove no excerpt leaks onto the page and no writing is truncated after opening. Other recap copy remains unchanged.
- Both attachments use the existing paper hinge, with multiple sampled opening/refolding poses and a single painted hinge face per pose. X disappears at dismissal; Escape, early close/reopen, downward mouse dismissal, resize during unfolding, source restoration and transient-layer cleanup pass. Reduced motion opens directly into the native reader. The reader engine itself is unchanged.
- George uses frame `[220,10,256,310]`, Lando `[233,4,270,356]`, Oscar `[242,10,258,310]`, from unchanged official 2026 F1 RGBA photographs, each 720×2069. Independent alpha analysis and visual review retain complete hair, ears, faces and chin above the intentional upper-neck boundary. Source URLs, rights and SHA256s are in the asset provenance. No captions, controls or pointer interception are added.
- George sits beside the Four days keepsakes; Oscar beside the Luxembourg souvenirs; Lando above the gift pocket. Measured clearance corrections protect writing, page numbers and the full coupon geometry in scene/native layouts. Their source windows scale uniformly, and George/Oscar have actual intermediate page-bending attachment evidence. Existing Alex and Lewis remain visible.
- Click-through evidence covers cover opening, page navigation, both note readers, X/Escape/reopen, drag/resize, candle lock, birthday audio state, coupon reader/focus return and full animated replay. Opening the wish never unlocks the gift. Blowing the candle unlocks the gift and stops birthday audio. Existing unrelated map/photo/cat/song/editor behavior retains its historical evidence and unchanged implementation.
- Syntax checks cover the four changed JavaScript modules; `git diff --check` passes. Config, trip data, original cats, fan art, ephemera and font bytes match the previous commit. New text contrast is 6.70:1 rose/paper, 5.70:1 rose/blush, 12.51:1 ink/paper and 10.65:1 ink/blush.

Software WebKit/Chromium observations do not establish physical iPhone Safari, hardware frame rate or VoiceOver performance. The downward dismissal scope used trusted mouse input. QA files and labelled long-content fixtures remain excluded from publication and GitHub; no personal memory, photograph or voucher code was fabricated.

## Current Antislop delivery gate

PASS. Root reviewed the final closed-note, birthday, midfold, George/Oscar placement and final scene/native gift captures, the source diff, independent QA and final source hashes. Antislop during remains the user's explicit session mode, ENERGY/RHYTHM/MOTION 3/3/3; Taste remains 8/9/5. The V41 design read precedes implementation in DESIGN.md.

- R-01 PASS: the established Pink + Sage materials remain; portrait clothing colors belong to real content.
- R-02 PASS: new English labels use plain wording and no decorative punctuation or invented prose.
- R-03 PASS: focused scene/native/fallback captures at 375×667 and 375×520 have no horizontal overflow or broken note layout.
- R-04 PASS: the existing book-open icon identifies unfolding; real driver faces answer the explicit request.
- R-05 PASS: existing chapter-specific compositions remain; no filler section or repeated marketing layout is added.
- R-06 PASS: local Fraunces and Source Sans 3 retain their documented paper/display roles and exact font bytes.
- R-07 PASS: linen and paper remain physical book materials; no generic background pattern is added.
- R-08 PASS: existing arrows keep navigation and gift actions; opening cues use the existing book icon.
- R-09 PASS: no sticker captions, pills, badges or headline labels are added.
- R-10 PASS: no glass or decorative blur is introduced.
- R-11 PASS: square paper attachments and existing control shapes retain their distinct roles.
- R-12 PASS: contact shadows and the visible crease explain folded paper thickness.
- R-13 PASS: no new glow, sparkle or looping pulse is added.
- R-14 PASS: new faces fit measured spare areas on three different compositions.
- R-15 PASS: 'Unfold the note' and 'Open the card' describe their actual actions.
- R-16 PASS: no marketing language is added.
- R-17 PASS: trip dates, birthday and gift amount remain user-supplied values.
- R-18 PASS: the requested real drivers have exact official sources; no personal identities or memories are invented.
- R-19 PASS: closed paper unfolds through its hinge and refolds on dismissal; reduced motion remains native.
- R-20 PASS: racing faces, whole cats, birthday paper and Luxembourg/Trier keepsakes retain the specific personal identity.
- R-21 PASS: the single approved light theme remains.
- R-22 PASS: actual requested driver portraits join the existing scrapbook; no generic character art is substituted.
- R-23 PASS: the user explicitly requested these faces and note interactions; all new photographs have documented provenance.
- R-24 PASS: new decorations add no links; note buttons lead to their complete existing readers.
- R-25 PASS: measured new text contrast exceeds 4.5:1 on both paper surfaces; focus retains the rose outline.
- R-26 PASS: affected controls are clicked in the current scopes, including both readers, dismissal, candle, voucher and replay.
- R-27 PASS: empty notes remain honest placeholders after opening; loading/error behavior is retained, with reduced/native and aborted-3D checks.
- R-28 PASS: no FAQ is introduced.
- R-29 PASS: no interface palette role is added; real photo colors remain content.
- R-30 PASS: changes extend the existing physical scrapbook rather than a borrowed product shell.
- R-31 PASS: DESIGN.md records the source, placement, concealed writing and folding purposes.
- R-32 PASS: native buttons, visible focus, Escape dismissal and trigger-focus restoration remain; decorative portraits add no focus stops.
- R-33 PASS: feature, stylesheet and documentation edits use apply_patch; source photo bytes are copied unchanged.
- R-34 PASS: the single shipped theme is covered in scene/native/fallback; no theme toggle is introduced.
- R-35 PASS: current affected-control click-through and screenshot evidence is recorded in qa/v41; unrelated historical evidence is explicitly scoped.
- R-36 PASS: no hardware, security or performance claims are made from software-browser results.
- R-37 PASS: the retained brand direction, current design read and explicit dials precede source edits.
- R-38 PASS: messages, personal photos and gift code stay supplied data or honest placeholders; official portraits are credited accurately.
- Liveliness PASS: varied chapter compositions, pink cloth, sage attachments, a rose action accent, whole cats and now physically concealed writing retain a clear focal object and intentional space.
- Craftsmanship C-1 through C-5 PASS: every addition has a stated purpose; genuine unfolding and full-text readers work; no filler chapter, fabricated claim or unresolved layout defect is shipped.
- UI/Taste pre-flight PASS: preserve the authored paper aesthetic, local type and one-theme palette; real sourced imagery, clear action labels, measured contrast, source-based movement and bounded responsive evidence support this change. No new generic landing-page patterns apply.

The Site remains owner-private; arranging recipient access remains deferred. GitHub receives the matching app and supporting documents without the private Site binding, credentials, QA or deployment archives.

# Historical validation: real driver portrait stickers, V40

25 October 2026. Add the requested faces of Alex Albon and Lewis Hamilton in four places: Alex on the cover and gift page, Lewis on the Luxembourg and photograph pages. The default scrapbook now has 47 decorations, including the existing 43. No captions, reader actions, chapters, fonts, personal memories or gift data are added.

Status: PASS, 290/290 focused checks. WebKit scene 375×667 and 375×520, WebKit reduced-motion/native and aborted-3D fallback at 375×667, plus Chromium scene 375×667 all pass. All four faces remain visible in every default context, with complete measured head crops, named image semantics and no visible captions or text overlap. Both Hamilton leaves have actual intermediate bending poses; nearby readers, candle/gift gating and animated cover return pass. Final source hashes and per-scope evidence are in `qa/v40/final-scope-summary.json`. This is a bounded portrait-placement change; the full V39 suite is retained historical evidence and is not claimed as rerun.

## Scope and asset evidence

Both assets are actual official 2026 Formula 1 driver photographs, hosted locally with their original bytes. Alex: 720×2069 RGBA, 114,090 bytes, SHA256 `e515f4a7852dc6caf10e626f02d6fd05ec5bbcab09bf0908ada5c56a9f9dc3a5`; Lewis: 720×2069 RGBA, 166,030 bytes, SHA256 `b88173b4ef603e9ecacb9c436268cb58b663a72374f772d963d3510cd5452491`. Third-party copyright and exact sources are retained in the asset credits/provenance; these are not generated art or Creative Commons photographs.

The individually measured head-and-neck windows are `[212,8,328,352]` and `[204,4,360,356]`. Independent analysis verifies all 58,325 Albon and 61,921 Hamilton pixels with alpha >= 13 in the upper 360-pixel region remain inside their respective windows, with zero pixels lost. The lower window boundary intentionally ends at the neck. No extra separating polygon is required: exterior RGB on the source's transparent pixels remains transparent.

The four portraits use the existing uniform-frame, physical-plane and reader-source composition. Their accessible image names identify each driver; visible caption text, controls and pointer interception are absent. Native layouts have separate header offsets. The existing clearance guard protects longer writing; existing continuation decorations and the five whole cats are unchanged. Current evidence is excluded under `qa/v40/`; original download/measurement evidence is retained under `/workspace/scratch/v40-portraits/`.

## Current Antislop delivery gate

PASS. Antislop during remains the explicit session mode; ENERGY/RHYTHM/MOTION 3/3/3 and Taste 8/9/5 retain the established visual direction. Current captures of all four portrait pages, the native cover, Luxembourg and gift pages were visually reviewed for recognisable whole faces, clear writing and unchanged interaction hierarchy.

- R-01: the approved Pink + Sage interface remains; real driver clothing colors belong to the portrait content.
- R-02: no visible prose or sticker caption is added; the new accessible driver names are plain English.
- R-03: focused checks cover 375×667 and 375×520, with native and graphics-fallback layouts.
- R-04: existing action icons keep their jobs; the faces directly represent the two explicitly requested drivers.
- R-05: four photo cutouts join existing chapter-specific compositions; no filler layout or section is added.
- R-06: Fraunces and Source Sans 3 retain their roles and source bytes.
- R-07: existing paper/cloth materials remain; transparent portrait backgrounds add no generic pattern.
- R-08: navigation arrows keep their actual actions.
- R-09: no captions, badges, label strips or headline pills are added.
- R-10: no glass or decorative blur is introduced.
- R-11: the existing paper/control/die-cut shape hierarchy remains.
- R-12: physical page depth and restrained contact shadows describe the attached portraits.
- R-13: no new glow, idle pulse or sparkle is added.
- R-14: face placement follows measured spare space in four different compositions.
- R-15: portrait figures remain decorations, without a false button or generic CTA.
- R-16: no marketing language is added.
- R-17: dates, itinerary and gift amount remain unchanged user-supplied values.
- R-18: the official portraits are credited, without invented personal identities, shared photos or testimonials.
- R-19: portraits travel with their actual page fold; native/reduced reading remains static.
- R-20: the named drivers support the recipient's specific racing interests.
- R-21: the approved single light theme remains.
- R-22: actual requested driver faces replace no personal-photo placeholder and are not generic character art.
- R-23: the user explicitly requests Alex and Lewis faces; source URLs, rights statements and measured presentation windows are documented.
- R-24: no portrait pretends to open a link; the existing content-bearing readers keep their destinations.
- R-25: no visible text, interface token or font changes; prior contrast evidence remains scoped to that unchanged print.
- R-26: focused click-through checks include nearby readers, candle/gift gating and replay; portraits add no action.
- R-27: current scopes cover scene, reduced motion and aborted-3D fallback; original image bytes and complete face regions are checked independently.
- R-28: no FAQ is added.
- R-29: Pink + Sage remains the core palette; racewear colors are limited to the real photographs.
- R-30: the portraits join the existing physical scrapbook rather than a copied product shell.
- R-31: DESIGN.md records likeness, crop, placement, native offsets, semantics and physical attachment.
- R-32: named image semantics remain available; the figures have no controls, focus stops or pointer interception.
- R-33: application, CSS and documentation edits use apply_patch; source image bytes are copied unchanged.
- R-34: focused phone/native/fallback captures cover the single shipped theme.
- R-35: current per-scope checks and screenshots are recorded in qa/v40; the historical V39 counts are not claimed as rerun.
- R-36: software-browser input/render observations do not imply physical iPhone FPS or VoiceOver testing.
- R-37: the V40 design read and retained dials precede implementation.
- R-38: portraits are real credited driver media, with no generated likeness or implied endorsement; personal photos, memories and the gift code remain placeholders.
- Liveliness: explicit dials, varied compositions, preserved focal objects, purposeful whitespace, rose action accent and the existing physical paper motif remain consistent. Each requested face appears twice.
- Craftsmanship C-1 through C-5: positions and source choices have written reasons; no false interaction, filler section or fabricated claim is introduced; the complete faces and responsive fitting are checked.
- UI/Taste pre-flight: retain the paper book, typography, control hierarchy and restrained motion; add only the requested caption-free faces. Accessible identities, clean crops and correct whole-page attachment are part of the current focused evidence.

The Site remains owner-private; recipient access remains deferred. GitHub contains the same app assets/code without the private Sites binding, credentials, local QA or deployment archives.

# Historical validation: layered scrapbook decoration, V39

25 October 2026. The user's request is a fuller physical scrapbook with more themed stickers and paper ornaments, without visible sticker captions. The default seven chapters now have 43 placed decorations: seven existing favorites and 36 new ornaments from 16 original motifs. The five named cats are retained separately. No story, personal photo, actual ticket or gift code is fabricated.

Status: PASS. No unresolved V39 failure remains. The historical V38/V37 results below are retained separately and are not claimed as rerun.

Current evidence: WebKit passes 1,654/1,654 checks across scene375×667/520, reduced-motion/native667, aborted-3D667, continuation leaves and a labelled longer-personalisation fixture. A fresh native gift-reveal probe passes48/48 and proves clearance fitting runs after the candle unlocks and reveals the gift. Chromium's full1,268-check run passes every scope except two recorded cover-bow clearance checks that used the earlier2%position. Moving only that bow to1% is verified by a fresh364/364-check cover scope across both engines at both phone heights, including whole artwork/masks, actual planes, trusted opening and animated return. The original two obsolete failures remain visible in the historical report; no combined count hides them. All eight default engine/mode/height contexts retain43/43 visible decorations with zero omissions. Exact source hashes, scoped results and corrected captures are recorded in `qa/v39/final-scope-summary.json`.

## Scope and evidence

- Original generated ephemera atlas: 1536×1024 RGBA PNG, 2,938,679 bytes, SHA256 `49e222b58051cab1e2aa6489c49e77a439fefe677c76da8c89aba9b255db70a1`. The distributed bytes match the generated original. Metadata and alpha measurement are in excluded local `/workspace/scratch/v39-art/`.
- Individual measured frames preserve the original silhouettes. The key and record have separating polygons through transparent gaps to exclude neighboring ink. Independent browser analysis retains all 55,012 record and 21,220 key own-component pixels at alpha>50, while removing 125 and 320 foreign alpha>=64 pixels respectively. No own-component pixel is removed, and visible frame-border ink is zero.
- The original five-cat and fan-sticker source hashes remain unchanged: `85d8665a3b6dd4d025b92bf436a20abcfd2dcafeb5ab7e635825e6798be62816` and `5328e5630edf6ee11a885e90318abed4830fec0ce8a6311c35421e0fa9b117b2`.
- Every visible decoration uses the same atlas/frame/mask in native HTML and Three, with its own physical attachment, reader-print metadata and ordered depth. Sparse outer-margin variants decorate continuation leaves.
- Native reading has its own bow/tape offsets. After actual pagination, a bounded clearance check omits a new ornament only when it overlaps writing, a photo interior, cat portrait or the candle. Existing named favorites are preserved. Native resize and motion-mode restoration repeat the check; omitted decorations do not create empty layout blocks.
- Syntax checks cover the five changed JavaScript files; `git diff --check` passes. Config, fonts, original art and external dependencies are unchanged. All QA images, scripts, labelled long-content fixtures and browser reports are excluded from deployment and GitHub.

## Current Antislop delivery gate

PASS. This is a targeted redesign under the user's explicit Antislop during session choice, with ENERGY/RHYTHM/MOTION 3/3/3 and Taste 8/9/5. Each rule's scope and evidence are recorded here; there is no additional approval step. Final WebKit captures of all seven pages, reduced-motion Notes and the short-screen birthday leaf were visually reviewed. An independent review also accepts the hierarchy, whole artwork and fuller decoration.

- R-01: Pink + Sage remains the interface system; artwork colors belong to paper keepsakes, with no new interface gradient.
- R-02: no visible prose or generated caption is added; English content and honest placeholders remain.
- R-03: actual mobile layouts are checked at 375×667 and 375×520, including native reading and longer writing.
- R-04: existing action icons keep their jobs; a physical racing flag, record and birthday moon cutout have explicit scrapbook purposes.
- R-05: seven content-specific chapter compositions remain; no template section or repeated feature-card row is introduced.
- R-06: local Fraunces and Source Sans 3 keep their existing roles and unchanged font bytes.
- R-07: cloth and paper remain the book's actual material backgrounds; washi patterns occur on attached tape only.
- R-08: navigation arrows retain previous, next, replay and real gift actions.
- R-09: no caption strips, badges or pills are added to the stickers.
- R-10: no glass, frosted overlay or decorative blur is introduced.
- R-11: physical sheet, control and die-cut edge shapes retain their different purposes.
- R-12: subtle contact shadows and physical depth describe attached paper; no floating UI-card shadow system is added.
- R-13: no ambient glow or looping sparkle is added.
- R-14: ornamental clusters follow each page's actual available space and content, without equal card layouts.
- R-15: no decorative figure becomes a false button or generic CTA.
- R-16: no marketing buzzword is added.
- R-17: dates, itinerary and gift amount remain user-supplied; the blank ticket adds no invented transport data.
- R-18: no personal identity, shared memory or testimonial is invented.
- R-19: the new paper moves with its actual cover or page fold; native reduced-motion reading remains available.
- R-20: the birthday, favorite music/racing motifs, whole cats and Luxembourg/Trier details form a specific personal scrapbook.
- R-21: the approved light Pink + Sage theme remains.
- R-22: original paper ornaments support the requested collected scrapbook; the souvenir stamps are illustrations, not personal photography.
- R-23: image creation is explicitly authorised in the current request; generation and file provenance are retained.
- R-24: ornaments do not pretend to be destinations; the existing real readers and external links keep their behavior.
- R-25: no new visible text or control color is introduced; unchanged text and material contrast retains its prior evidence.
- R-26: current click-through evidence exercises the map, daily photo, main photo, note, Minnie, music, candle, gift and replay.
- R-27: current checks include scene, reduced-motion/native, aborted-3D fallback and personal-writing variants.
- R-28: no FAQ is introduced.
- R-29: Pink + Sage remains the core palette; gold/red/lilac details are limited to the physical artwork.
- R-30: composition follows the existing bound scrapbook, without copying another product shell.
- R-31: DESIGN.md records cluster hierarchy, margin protection, tactile layering, masks and adaptive clearance.
- R-32: new pure ornaments are aria-hidden, have no controls and never intercept pointer input; named favorites retain accessible identities.
- R-33: application, CSS and documentation changes use apply_patch. Generation, measurements and excluded QA artifacts do not patch application files.
- R-34: the one shipped theme is checked in the current phone, native and fallback compositions.
- R-35: current software-browser results, captured pages, exact artwork checks and actual reader/navigation actions are recorded under qa/v39.
- R-36: software-browser observations are not represented as physical iPhone, hardware-FPS or VoiceOver testing.
- R-37: DESIGN.md records the design read and dials before implementation, with density raised only for the requested decoration.
- R-38: names, photographs, memories, songs and purchased voucher code remain honest placeholders; illustrated souvenirs are identified as artwork.
- Liveliness: dials are explicit; the cover label, map/contact sheet, photograph, letter/cats, cake and gift keep their focal roles. Whitespace separates writing and objects. Rose remains the action accent, while repeated ribbon and paper-cut motifs provide identity. Every chapter has its own cluster rather than a uniform template.
- Craftsmanship C-1 through C-5: decorative choices have written reasons, existing actions work, no filler chapter is added, native/fallback/personalised layouts are checked, and source/asset/verification claims are explicit.
- UI supplement: one coherent material palette, purposeful icons and motion, no emoji/badge/glass/glow pattern, retained practical labels and fallbacks, real content slots and preserved touch targets. The ordinary type remains readable beside ornament clusters.
- Taste pre-flight: preserve the existing book, typography, story and controls; increase the requested visual density without changing hierarchy or adding ambient motion. Decorative paper remains physically attached in the animated book and static native reader.

## Verification limits

Playwright Chromium and WebKit provide software-browser rendering and real input evidence. They do not establish physical-device Safari frame rate, VoiceOver behavior, or hardware iPhone performance. The project remains an owner-private Site; arranging access for the recipient remains deferred. The already-authorised GitHub repository is kept in sync without its private Sites binding, QA captures, credentials or deployment archives.

# Historical validation: uncaptioned fan stickers, V38

21 October 2026. Remove visible captions from the seven V37 fan stickers. Their supplied names remain in accessible image labels. Original artwork, measured frames, portrait sizes, rotations and page assignments remain. The gift pair's bottom offset compensates for the removed caption height, preserving the illustration positions.

Current evidence: a source audit finds seven favorites, no figcaptions or visible sticker text, and all seven accessible names. Three changed JavaScript files parse and git diff --check passes. The existing WebKit smoke journey was run at 375x667 and captured the cover plus six reading leaves; the cover and gift screenshots were visually reviewed without caption boxes. No new broad test suite was written or run for this bounded edit. The prior V37 784-check suite remains historical evidence for retained behavior.

The original sticker PNG and cat illustration bytes are unchanged. 86/93 prior distribution files retain their bytes; seven change, including two provenance documents. No new asset or personal content is added. Software WebKit spot checks do not establish physical iPhone/Safari performance or VoiceOver behavior. All current QA artifacts remain excluded from publication under qa/v38.

## Current Antislop delivery gate

PASS. Antislop during remains the explicit session choice. The V38 preserve-mode Design Read precedes implementation in DESIGN.md; ENERGY/RHYTHM/MOTION remains 3/3/3 and Taste remains 8/9/3. The complete current gate below passes.

- R-01 PASS: Pink + Sage remains the interface palette; red, teal, lavender and gold occur inside content-specific fan artwork, not generic UI gradients.
- R-02 PASS: visible copy remains English with honest placeholders; no em dash is introduced.
- R-03 PASS: complete uncaptioned stickers and existing controls fit the current 375x667 spot check; the prior 375x520 layout evidence is retained.
- R-04 PASS: original book, music and close icons retain their functions; new decorative motifs identify explicitly named interests.
- R-05 PASS: the existing seven-page narrative and varied physical compositions remain; no template section or card grid is added.
- R-06 PASS: local Fraunces and Source Sans 3 retain their roles and files; no replacement sticker typography is added.
- R-07 PASS: the original cloth/paper backgrounds remain; no unrelated pattern is added.
- R-08 PASS: existing navigation arrows retain their real previous, next and replay actions.
- R-09 PASS: visible sticker name strips are removed; no badge or capsule is added.
- R-10 PASS: no glass or blur effect is introduced.
- R-11 PASS: existing physical sheet/control corner geometry remains; die-cut silhouettes come from the requested art.
- R-12 PASS: existing scene light/contact shadows support physical sticker depth; no page-wide floating-card shadow treatment is added.
- R-13 PASS: no decorative glow or status pulse is added; existing subject feedback remains scoped to real interactive objects.
- R-14 PASS: one small sticker per busy leaf and a pair in the gift leaf follow available content space, rather than equal feature cards.
- R-15 PASS: existing controls retain concrete actions; decorative stickers are not generic CTAs or false buttons.
- R-16 PASS: no marketing buzzword is introduced.
- R-17 PASS: dates, chapter values, racing numbers and EUR25 use the established/user-supplied interests and values; no metric is invented.
- R-18 PASS: no personal memory, identity, photo, testimonial or relationship detail is invented.
- R-19 PASS: sticker meshes travel with their actual page fold; no independent floating, looping or entrance-template motion is added, and native reduced-motion reading remains available.
- R-20 PASS: the seven favorite motifs join the existing birthday, trip, whole named cats and paper-book identity.
- R-21 PASS: the approved single light scrapbook theme remains.
- R-22 PASS: every new illustration directly represents an explicitly requested racing or music interest; no unrelated stock decoration is added.
- R-23 PASS: the user explicitly requested sticker creation and placement; generated motifs and their provenance are honest, with no invented personal event or destination.
- R-24 PASS: no decorative sticker pretends to be a link or a reader action; existing content-bearing controls and external destinations remain.
- R-25 PASS: no new visible text is added; unchanged interface colors/fonts retain their earlier measured contrast.
- R-26 PASS: the focused WebKit journey reaches the cover, six reading leaves, candle and gift; V37 reader/focus/replay coverage remains retained evidence.
- R-27 PASS: the shared native/scene markup omits all seven captions; V37's reduced-motion, graphics-fallback and other-height coverage remains retained evidence.
- R-28 PASS: no FAQ is introduced.
- R-29 PASS: the core Pink + Sage system is unchanged; small motif colors identify the requested interests within artwork.
- R-30 PASS: physical fan keepsakes belong to this scrapbook; no external product shell is copied.
- R-31 PASS: DESIGN.md explains uncaptioned cutouts, preserved artwork positions and accessible identities.
- R-32 PASS: decorative figures retain accessible names, do not intercept touch or enter the focus order; existing labelled readers and focus restoration remain.
- R-33 PASS: application, CSS and documentation edits use apply_patch; scripts create excluded QA/packaging artifacts.
- R-34 PASS: the current phone spot check shows complete art without caption boxes; other phone layouts retain V37 evidence.
- R-35 PASS: the source audit, three JavaScript syntax checks, clean diff and focused WebKit visual spot check pass; the historical 784-check V37 suite is not claimed as rerun.
- R-36 PASS: software-browser observations, retained historical coverage and physical-device limits are explicitly distinguished.
- R-37 PASS: the preserve-mode Design Read and retained dials precede implementation.
- R-38 PASS: personal content remains honest placeholders; generated fan motifs are identified as illustrations, not disguised as personal photographs or official merchandise.
- Liveliness dials PASS: Antislop 3/3/3 and Taste 8/9/3 remain explicit.
- Liveliness consistency PASS: the stickers participate in the physical page rather than independently floating or looping.
- Liveliness focal point PASS: the recipient's cover label, map/photo, note, cake and gift remain their respective page's focus.
- Liveliness whitespace PASS: measured spare corners carry the small stickers; the full note/cat/music leaf is left intact.
- Liveliness accent PASS: rose remains the action/focus accent; limited artwork colors distinguish the favorites without recoloring interface controls.
- Liveliness identity PASS: cut paper, cloth, racing/music keepsakes and five whole cats form one personal collection.
- Liveliness Design Read PASS: DESIGN.md records the user's requested addition and placement purpose before implementation.
- C-1 PASS: removing the labels directly implements the requested physical scrapbook appearance.
- C-2 PASS: stickers are explicitly decorative; actual readers, candle, coupon and replay retain working actions and cleanup.
- C-3 PASS: the seven-page story is preserved, with no invented memory or filler section.
- C-4 PASS: focused current phone rendering passes; unchanged interaction, reduced-motion and fallback behavior retains V37 evidence.
- C-5 PASS: artwork provenance, owner placeholders, source hashes and verification limits are explicit; no claim of official merchandise or physical-device performance is made.

## UI supplement

- UI-01 PASS: palette and materials retain the written Pink + Sage direction; motif colors have a content-specific purpose.
- UI-02 PASS: rose remains the interface accent, with no new accent spread across controls.
- UI-03 PASS: no decorative emoji is added to headings, labels or buttons.
- UI-04 PASS: existing varied physical page compositions remain consistent with RHYTHM 3.
- UI-05 PASS: no bento grid, fake terminal, pricing template or meaningless left stripe is introduced.
- UI-06 PASS: no redundant pill badge is placed above a headline.
- UI-07 PASS: existing navigation and reader actions still work; the new named stickers are clearly noninteractive decorations.
- UI-08 PASS: page-carried sticker motion has a written physical purpose; no endless cue or independent sticker loop is introduced.
- UI-09 PASS: existing elevation and small corner geometry remain; no glass/glow/radius treatment is spread page-wide.
- UI-10 PASS: no decorative status light or pulsing dot is introduced.
- UI-11 PASS: the reading interface remains built around opening and browsing the actual birthday book.
- UI-12 PASS: all dates, gift amount, names and preference motifs come from the user/retained configuration; no fake metric or feed is added.
- UI-13 PASS: owner fields and personal-photo slots retain honest placeholders rather than fake people or photos.
- UI-14 PASS: existing photo/audio fallback messages and native reading behavior retain their earlier clear causes/actions; no new empty data state is created.
- UI-15 PASS: current 375x667 rendering is checked; other heights, keyboard and fallback coverage retain their V37 baseline.


# Historical validation: personal fan-sticker collection, V37

21 October 2026. Add the requested Ferrari, Lewis Hamilton, George Russell, Taylor Swift, Olivia Rodrigo, Olivia Dean and Sienna Spiro stickers to the existing birthday scrapbook. Preserve its seven-page story, English placeholders, Pink + Sage, local type, Luxembourg/Trier trip, five whole cats, candle/music, Amazon.de EUR25 ending and owner-private audience.

The new transparent sheet uses illustrated fan motifs: a red race car, numbered racing helmets, a guitar and distinct microphone keepsakes. Names are typeset with the existing local font. These are symbolic fan stickers, not celebrity photographs or invented personal memories. Each motif has its own measured frame with transparent space around the complete art. Ferrari sits on the cover; Hamilton, Russell and Swift occupy spare trip/photo corners; Rodrigo sits beside the cake; Dean and Spiro form a pair in the gift leaf's lower space. The already full note/cat/music leaf receives no extra decoration.

Sticker layers sit outside the prose flow, so they do not create additional default pages. Native pages and the prepared scene use the same source art, full frames and captions. The scene draws transparent alpha-tested planes without opaque rectangular backing. Actual turning geometry carries each page's stickers through its fold. Their print metadata also lets an object-reader source mask retain neighboring sticker pixels. The stickers have accessible identities, no controls or reader actions, and do not intercept touch or enter the focus order. Reduced motion and aborted-3D fallback retain the collection.

## Current evidence

All qa/v37 scripts, analysis, fixtures, screenshots and recordings remain excluded from publication. All required current checks and the recorded visual review pass.

| Evidence | Result | Scope |
| --- | --- | --- |
| webkit-sticker-checks.json | 392/392 PASS | Scene at 375x667 and 375x520, reduced motion and actual aborted-3D fallback; seven source favorites/real planes, complete alpha frames, uniform fitting, text/photo/candle clearance, pointer noninterception, five-cat landmarks, selected reader/focus restoration, candle/music, coupon and cover replay |
| chromium-sticker-checks.json | 392/392 PASS | Same four contexts and sticker/interaction contract in software Chromium |
| Scene turn JSON | PASS | Actual outgoing, subdivided sticker meshes at three intermediate fold poses, with changing geometry vertices; not inferred from static DOM placement |
| Original sheet / alpha analysis | PASS | 1774x887 RGBA sheet; all seven production frames contain artwork and have no alpha above 16 touching their frame edges |
| Final recorded visual review / contact sheets | Reviewed, no blockers | Cover, all six reading leaves, whole stickers and captions, birthday/coupon clearance, intermediate opening/turn/reader motion and restored neighboring decoration |
| retained-files.json | 83/90 prior distribution files unchanged; seven modified; three added | V36 reader/discovery scripts and styles, audio, configuration, trip, fonts, palette/material styles and V35 cat artwork retain their bytes; changed distribution files include two provenance documents |
| JavaScript syntax / git diff --check | PASS | All five changed/added JavaScript files parse; the source diff is clean |

The original new sticker sheet retains SHA-256 `5328e5630edf6ee11a885e90318abed4830fec0ce8a6311c35421e0fa9b117b2`. The original five-cat illustration retains SHA-256 `85d8665a3b6dd4d025b92bf436a20abcfd2dcafeb5ab7e635825e6798be62816`. The new artwork was explicitly requested by the user; provenance describes its generated symbolic motifs rather than presenting it as official merchandise or photography. No new personal photo, memory, biography or purchased gift code is fabricated.

The initial strict report is retained as webkit-sticker-initial.json. It detected a small Swift/photo overlap, which was corrected with the final one-line caption layout. A later native-only title collision is retained in webkit-sticker-native-initial.json; the native photograph heading now reserves the sticker's width. Initial cover pose metadata was measured while the canvas was still hidden; measurement now follows its unhide. A gift-page harness race sampled hidden geometry while a prior candle interaction still owned delayed settling/navigation. The corrected harness waits for that interaction, seeks the current leaf atomically, and requires the exact destination chapter and a visible, non-inert print before measurement. The fallback replay test selects the real accessible replay link, excluding inert decorative copies. No failing assertion is removed or weakened.

Chromium's full run retained 390 passing checks and exposed the same delayed-candle-settle issue specifically in the outgoing birthday sampling. A targeted rerun of the exact three phase/geometry assertions waits for idle ownership and samples the outgoing phase atomically; all three pass. `chromium-validation-assembly.json` records replacement of only those test names, retaining every other full-run assertion. Production source did not change during this retest.

Verification uses software WebKit and Chromium. Scene screenshots, actual geometry samples and recordings establish the behavior described above; they do not establish physical iPhone/Safari smoothness, hardware FPS, OS backgrounding or VoiceOver results. The unchanged V36 reader/discovery modules and V35 full-cat coverage retain their historical evidence; the current suite reruns the affected sticker placements and selected neighboring interactions rather than claiming every prior test was repeated. Existing text/token contrast calculations retain their baseline; new caption labels use the same ink-on-paper token pair.

## Current Antislop delivery gate

PASS. Antislop during remains the explicit session choice. The V37 preserve-mode Design Read precedes implementation in DESIGN.md; ENERGY/RHYTHM/MOTION remains 3/3/3 and Taste remains 8/9/3. The complete current gate below passes.

- R-01 PASS: Pink + Sage remains the interface palette; red, teal, lavender and gold occur inside content-specific fan artwork, not generic UI gradients.
- R-02 PASS: visible copy remains English with honest placeholders; no em dash is introduced.
- R-03 PASS: complete stickers, their labels and existing controls fit both measured phone heights without text/photo/candle obstruction or added default pages.
- R-04 PASS: original book, music and close icons retain their functions; new decorative motifs identify explicitly named interests.
- R-05 PASS: the existing seven-page narrative and varied physical compositions remain; no template section or card grid is added.
- R-06 PASS: local Fraunces and Source Sans 3 retain their roles and files; sticker names use the existing readable print face.
- R-07 PASS: the original cloth/paper backgrounds remain; no unrelated pattern is added.
- R-08 PASS: existing navigation arrows retain their real previous, next and replay actions.
- R-09 PASS: sticker name strips belong to the physical keepsakes; no application badge, capsule/glow combination or redundant eyebrow is added.
- R-10 PASS: no glass or blur effect is introduced.
- R-11 PASS: existing physical sheet/control corner geometry remains; die-cut silhouettes come from the requested art.
- R-12 PASS: existing scene light/contact shadows support physical sticker depth; no page-wide floating-card shadow treatment is added.
- R-13 PASS: no decorative glow or status pulse is added; existing subject feedback remains scoped to real interactive objects.
- R-14 PASS: one small sticker per busy leaf and a pair in the gift leaf follow available content space, rather than equal feature cards.
- R-15 PASS: existing controls retain concrete actions; decorative stickers are not generic CTAs or false buttons.
- R-16 PASS: no marketing buzzword is introduced.
- R-17 PASS: dates, chapter values, racing numbers and EUR25 use the established/user-supplied interests and values; no metric is invented.
- R-18 PASS: no personal memory, identity, photo, testimonial or relationship detail is invented.
- R-19 PASS: sticker meshes travel with their actual page fold; no independent floating, looping or entrance-template motion is added, and native reduced-motion reading remains available.
- R-20 PASS: the seven favorite motifs join the existing birthday, trip, whole named cats and paper-book identity.
- R-21 PASS: the approved single light scrapbook theme remains.
- R-22 PASS: every new illustration directly represents an explicitly requested racing or music interest; no unrelated stock decoration is added.
- R-23 PASS: the user explicitly requested sticker creation and placement; generated motifs and their provenance are honest, with no invented personal event or destination.
- R-24 PASS: no decorative sticker pretends to be a link or a reader action; existing content-bearing controls and external destinations remain.
- R-25 PASS: palette/font files remain unchanged; new names use existing ink-on-paper tokens and retained contrast calculations.
- R-26 PASS: selected photograph, Minnie and voucher readers retain content, cleanup and source focus; the candle prerequisite and full cover replay remain functional.
- R-27 PASS: both scene heights, empty photo placeholders, reduced motion and actual graphics fallback retain the whole collection and affected interactions.
- R-28 PASS: no FAQ is introduced.
- R-29 PASS: the core Pink + Sage system is unchanged; small motif colors identify the requested interests within artwork.
- R-30 PASS: physical fan keepsakes belong to this scrapbook; no external product shell is copied.
- R-31 PASS: DESIGN.md explains motif selection, measured spare corners, untouched Notes leaf, outside-flow layers, whole frames and transparent turning planes.
- R-32 PASS: decorative figures retain accessible names, do not intercept touch or enter the focus order; existing labelled readers and focus restoration remain.
- R-33 PASS: application, CSS and documentation edits use apply_patch; scripts create excluded QA/packaging artifacts.
- R-34 PASS: the measured phone layouts preserve visible text, complete art and reachable controls across scene/native rendering paths.
- R-35 PASS: 784 current browser checks, independent art/frame analysis, recorded visual review and final syntax/diff checks pass.
- R-36 PASS: software-browser observations, retained historical coverage and physical-device limits are explicitly distinguished.
- R-37 PASS: the preserve-mode Design Read and retained dials precede implementation.
- R-38 PASS: personal content remains honest placeholders; generated fan motifs are identified as illustrations, not disguised as personal photographs or official merchandise.
- Liveliness dials PASS: Antislop 3/3/3 and Taste 8/9/3 remain explicit.
- Liveliness consistency PASS: the stickers participate in the physical page rather than independently floating or looping.
- Liveliness focal point PASS: the recipient's cover label, map/photo, note, cake and gift remain their respective page's focus.
- Liveliness whitespace PASS: measured spare corners carry the small stickers; the full note/cat/music leaf is left intact.
- Liveliness accent PASS: rose remains the action/focus accent; limited artwork colors distinguish the favorites without recoloring interface controls.
- Liveliness identity PASS: cut paper, cloth, printed names, racing/music keepsakes and five whole cats form one personal collection.
- Liveliness Design Read PASS: DESIGN.md records the user's requested addition and placement purpose before implementation.
- C-1 PASS: the new motifs, complete frames, named labels and physical planes each serve the requested personal sticker collection.
- C-2 PASS: stickers are explicitly decorative; actual readers, candle, coupon and replay retain working actions and cleanup.
- C-3 PASS: the seven-page story is preserved, with no invented memory or filler section.
- C-4 PASS: phone geometry, whole art, pointer noninterception, keyboard focus restoration, reduced motion and native fallback pass within the current scope.
- C-5 PASS: artwork provenance, owner placeholders, source hashes and verification limits are explicit; no claim of official merchandise or physical-device performance is made.

## UI supplement

- UI-01 PASS: palette and materials retain the written Pink + Sage direction; motif colors have a content-specific purpose.
- UI-02 PASS: rose remains the interface accent, with no new accent spread across controls.
- UI-03 PASS: no decorative emoji is added to headings, labels or buttons.
- UI-04 PASS: existing varied physical page compositions remain consistent with RHYTHM 3.
- UI-05 PASS: no bento grid, fake terminal, pricing template or meaningless left stripe is introduced.
- UI-06 PASS: no redundant pill badge is placed above a headline.
- UI-07 PASS: existing navigation and reader actions still work; the new named stickers are clearly noninteractive decorations.
- UI-08 PASS: page-carried sticker motion has a written physical purpose; no endless cue or independent sticker loop is introduced.
- UI-09 PASS: existing elevation and small corner geometry remain; no glass/glow/radius treatment is spread page-wide.
- UI-10 PASS: no decorative status light or pulsing dot is introduced.
- UI-11 PASS: the reading interface remains built around opening and browsing the actual birthday book.
- UI-12 PASS: all dates, gift amount, names and preference motifs come from the user/retained configuration; no fake metric or feed is added.
- UI-13 PASS: owner fields and personal-photo slots retain honest placeholders rather than fake people or photos.
- UI-14 PASS: existing photo/audio fallback messages and native reading behavior retain their earlier clear causes/actions; no new empty data state is created.
- UI-15 PASS: current phone heights and rendering paths retain readable content, complete art and working focus/controls.


# Historical validation: direct dismissal and one-time discovery, V36

21 October 2026. Implement only the two selected interaction refinements: drag an open keepsake downward to return it to the page, and introduce an eligible leaf with one small paper-corner lift. Preserve the seven-chapter birthday story, English placeholders, Pink + Sage, local fonts, whole cats, Luxembourg/Trier trip, candle/music, Amazon.de EUR25 ending and owner-private audience.

The actual reading surface follows the drag, including its printed content and close control. A short or cancelled pull returns to reading. A committed release transfers its displayed pose into the existing material-specific return; it does not reset to the resting dialog pose. Dismissal starts only with downward intent at the top of the reading scroll. Controls, selected writing, horizontal/upward intent and multiple contacts retain their existing behavior. Long writing continues to scroll natively. Resize, cancellation, blur, hidden documents and motion-preference changes release temporary layers and restore the source.

One map, photo or note on each eligible leaf lifts its upper-right corner after 650 ms of settled reading. Its single 1100 ms pulse uses a clipped copy of the selected face’s actual print and projected corner in the 3D view, or the same DOM print in the native fallback. Only the small corner layer moves; the WebGL book stays unchanged. The controller remembers introduced leaves across navigation and renderer rebuilds. Input cancels the cue immediately. An unfocused window preserves an unplayed cue until focus returns. Reduced motion skips discovery; the candle and gift retain their explicit actions without an additional cue.

## Current evidence

All qa/v36 scripts, fixtures, recordings and analysis remain excluded from publication.

| Evidence | Result | Scope |
| --- | --- | --- |
| webkit-gesture-checks.json | 137/137 PASS | Seven material-specific returns, held-pose handoff, immediate closing X, short/cancelled pulls, direction/control/selection exclusions, multiple contacts, long writing, actual height changes, native close/Escape/preference changes, reduced motion and aborted-3D fallback |
| chromium-gesture-checks.json | 142/142 PASS | Same gesture contract, plus trusted CDP touch dismissal and genuine native touch scrolling of long writing |
| webkit-discovery-checks.json | 27/27 PASS | Settled-page start, four once-only introductions, actual corner pixel changes, resize/revisit persistence, input cancellation, focus handler, native fallback cleanup and reduced-motion absence |
| chromium-discovery-checks.json | 27/27 PASS | Same discovery behavior in software Chromium |
| final-review.json / recordings | Reviewed, no blockers | Full material-return motion, printed content and closing chrome; discovery timing, visibility, flat restoration and lifecycle review |
| retained-files.json | 81/88 prior distribution files unchanged; two added | Original artwork, cat framing, content/configuration, trip, type files, palette, existing feedback and audio retain V35 bytes where not part of the two changes |
| JavaScript syntax / git diff --check | PASS | Changed and added production JavaScript parses; source diff is clean |

An initial trusted Chromium touch run exposed an actual ownership bug: implicit `lostpointercapture` arrived before `touchend` and cancelled a valid TouchEvent drag. The handler now cancels only its own explicit pointer gesture with the matching pointer ID. The final trusted-touch run verifies the corrected browser event sequence. The discovery audit also found that blur could allow an unplayed cue to re-arm; a separate focus state now blocks it until focus returns. Full-scene corner deformation initially consumed the cue in three slow Chromium frames. The final projected print corner uses compositor transforms, including a gradual endpoint fade, and both engines verify actual intermediate transforms and an unchanged WebGL render-frame count during the pulse.

WebKit touch-handler exercises use explicitly untrusted DOM TouchEvents; its mouse, keyboard, geometry changes and native dialog behavior are browser-driven. Chromium's additional touch cases use trusted CDP input, including actual native scroll. The focus regression dispatches DOM blur/focus events and is not an OS focus test. No physical iPhone/Safari, hardware FPS, OS backgrounding or VoiceOver result is claimed. V35's full-cat pixel/landmark coverage and unchanged palette/type contrast retain their earlier evidence; this revision does not claim to rerun every historical test.

The original five-cat artwork retains SHA-256 `85d8665a3b6dd4d025b92bf436a20abcfd2dcafeb5ab7e635825e6798be62816`. All images, cat framing, configuration, trip, local fonts, palette and audio retain V35 bytes.

## Current Antislop delivery gate

PASS. Antislop during remains the explicit session choice. The V36 preserve-mode Design Read precedes implementation in DESIGN.md; ENERGY/RHYTHM/MOTION remains 3/3/3 and Taste remains 8/9/3. The full current gate below passes.

- R-01 PASS: the approved palette/material tokens remain; the changes add no gradient.
- R-02 PASS: reader copy remains English with honest placeholders; no em dash is added.
- R-03 PASS: actual 375x667 reading surfaces and 375x520 changes preserve the existing layout, readable writing and reachable controls.
- R-04 PASS: existing book, music and close icons retain their specific functions.
- R-05 PASS: the seven-page story and varied physical compositions remain.
- R-06 PASS: local Fraunces and Source Sans 3 retain their approved roles and files.
- R-07 PASS: original cloth/paper materials remain; no background pattern is added.
- R-08 PASS: navigation arrows retain their real previous, next and replay actions.
- R-09 PASS: no badge or pill is added.
- R-10 PASS: no glass or blur effect is added.
- R-11 PASS: physical sheet/control corner geometry remains consistent.
- R-12 PASS: shadows describe the lifted reading surface and raised paper corner.
- R-13 PASS: discovery moves the actual paper corner; it adds no decorative glow.
- R-14 PASS: existing varied page/reader compositions remain; no template card grid is added.
- R-15 PASS: existing controls keep concrete actions; discovery adds no generic CTA.
- R-16 PASS: no marketing buzzword is introduced.
- R-17 PASS: dates, chapter values and EUR25 retain owner-supplied values.
- R-18 PASS: no personal memory, identity, photograph or testimonial is invented.
- R-19 PASS: direct manipulation preserves the held pose and material-specific return; one finite discovery cue explains the existing touch affordance and respects reduced motion.
- R-20 PASS: the birthday book, trip and five named cats retain their specific identity.
- R-21 PASS: the approved single light scrapbook theme remains.
- R-22 PASS: moving visuals use the existing selected print, with no unrelated illustration.
- R-23 PASS: no new artwork, asset identity, personal event or destination is fabricated.
- R-24 PASS: existing destinations and content-bearing controls retain their actions; cue copies are inert rather than new links.
- R-25 PASS: palette/font files remain unchanged; V34's token calculations retain their 5.960:1 minimum and earlier utility/scene baseline.
- R-26 PASS: material returns, short/cancelled pulls, trusted Chromium touch, immediate closing X, source restoration and focus return pass in both engines.
- R-27 PASS: long/selected writing, native scrolling, actual resize, reduced motion, graphics fallback and lifecycle interruption checks pass.
- R-28 PASS: no FAQ is introduced.
- R-29 PASS: Pink + Sage retains its established surface, action and decorative roles.
- R-30 PASS: the physical scrapbook retains its own interface, with no copied product shell.
- R-31 PASS: DESIGN.md explains direct manipulation, the top-of-scroll boundary, one-time discovery and its material-preserving native counterpart.
- R-32 PASS: the native labelled dialog retains X/Escape, source focus restoration and control/selection exclusions; temporary copies remain inert and hidden from assistive technology.
- R-33 PASS: application, CSS and documentation edits use apply_patch; scripts create excluded QA/packaging artifacts.
- R-34 PASS: measured phone heights, readable native sheets and unchanged material surfaces retain their layout and legibility.
- R-35 PASS: 333 current browser checks, visual/lifecycle review and final syntax/diff checks pass.
- R-36 PASS: synthetic handler tests, trusted browser input, retained baselines and hardware limits are distinguished explicitly.
- R-37 PASS: preserve-mode direction and explicit retained dials precede implementation.
- R-38 PASS: personal content remains honest placeholders; populated QA fixtures are labelled and excluded from publication.
- Liveliness dials PASS: Antislop 3/3/3 and Taste 8/9/3 remain explicit.
- Liveliness consistency PASS: physical reading surfaces follow input; the discovery pulse ends and does not loop.
- Liveliness focal point PASS: the chosen keepsake remains the focus of each reading interaction.
- Liveliness whitespace PASS: no extra copy, badge or control crowds the existing page compositions.
- Liveliness accent PASS: rose remains the action/focus accent; corner motion introduces an existing affordance.
- Liveliness identity PASS: original cloth, paper, printed keepsakes, five cats and typography remain.
- Liveliness Design Read PASS: DESIGN.md records both interaction refinements before implementation.
- C-1 PASS: each new motion supports a concrete action: returning a keepsake or identifying something touchable.
- C-2 PASS: committed and cancelled gestures complete, while existing controls and source focus remain functional.
- C-3 PASS: no story chapter, invented memory or decorative filler is added.
- C-4 PASS: phone geometry, long text, multiple contacts, keyboard/selection, reduced motion, native fallback and lifecycle interruption checks pass.
- C-5 PASS: personal placeholders, fixture boundaries and software verification limits remain explicit.

UI supplement PASS: approved palette and accent roles, existing icons/type, varied physical compositions and structural spacing remain. No pill, template grid, fabricated metric or empty filler is introduced. Real actions, finite motion, material elevation, honest placeholders, native fallback and keyboard behavior satisfy the UI checklist within this focused change.


# Historical validation: whole cat artwork, V35

21 October 2026. Repair the five clipped cats in the book and detail readers. Preserve the original artwork, five identities, seven-page birthday story, Pink + Sage, local fonts, trip, candle/music, coupon, material-specific reader motion and owner-private audience.

The family illustration is not an equal-width sprite sheet. Five 20% windows clipped uneven bodies and tails, and the fixed strip dimensions stretched them. Each cat now has its own measured frame and separating polygon following the existing white sticker borders. A common vertical frame preserves Minnie's smaller kitten proportions. The whole frame fits uniformly inside the existing portrait slot. One builder supplies the book, individual reader and family reader; the native fallback uses the same presentation.

The printed 3D renderer applies the same polygon. Each cat highlight now gets a mask rasterized from that actual fitted portrait instead of sampling one fifth of the family image. The original illustration bytes remain identical. No new production artwork or invented personal content is added. The reader animation module and book engine retain their V34 bytes.

## Current evidence

All qa/v35 analysis, fixtures and recordings are excluded from publication. Current browser QA specifically covers the six cat origins, rather than claiming a rerun of every non-cat V34 check.

| Evidence | Result | Scope |
| --- | --- | --- |
| webkit-cat-checks.json | 559/559 PASS | All five individual cats and keyboard family in 3D at 375x667/520, reduced motion and actual aborted-3D fallback; uniform image scale, fitted frame, source/native identity, visible opening, immediate closing control, source restoration and focus |
| chromium-cat-checks.json | 559/559 PASS | Same four contexts and six origins in software Chromium |
| seams-analysis.json / frame-coverage-analysis.json | PASS | Twenty-five independently measured ear/paw/tail landmarks; every assigned opaque cat pixel retained by the frames, with no colored fur lost at the shared white-border separating paths |
| visual-review.json / review-all-portraits.jpg | Reviewed, no blockers | Twenty enlarged portraits, all four book/family views and all five pressed silhouettes; whole ears, paws and tails, no neighboring fragments, correct kitten proportions |
| webkit-scene-667.webm / review-motion-1..4.jpg | Reviewed | Complete 25.48-second opening/return catalog, 127 sampled frames, all six origins; the whole selected animal remains recognizable throughout |
| retained-files.json | 82/88 unchanged | Original cat artwork, other imagery, fonts, palette/config/trip, audio, object-reader animation and book engine retain exact V34 bytes |
| JavaScript syntax / git diff --check | PASS | All three changed JavaScript files parse; the source diff is clean |

The current image SHA-256 is `85d8665a3b6dd4d025b92bf436a20abcfd2dcafeb5ab7e635825e6798be62816`. Source/native names and sprite indices alone were insufficient to detect the visual defect. The new checks map independent artwork landmarks through the actual rendered image scale, offset and clipping polygon, and the visual review inspects every cat.

Colors and type retain V34's actual token contrast calculations and earlier scene/utility baseline. V34's non-cat material motion, long writing and interruption coverage remain retained evidence. No physical iPhone, hardware FPS or VoiceOver result is claimed.

## Current Antislop delivery gate


PASS. Antislop during remains the explicit session choice. The V35 preserve-mode Design Read precedes implementation in DESIGN.md; ENERGY/RHYTHM/MOTION remains 3/3/3 and Taste remains 8/9/3.

- R-01 PASS: the approved palette/material tokens remain; no gradient or glow is introduced.
- R-02 PASS: reader copy remains English with honest placeholders; no em dash is added.
- R-03 PASS: actual 375x667/520 scenes, native readers and fitted portrait slots retain all measured ear, paw and tail landmarks.
- R-04 PASS: existing book, music and close icons keep their specific functions.
- R-05 PASS: the existing seven-page story and varied physical compositions remain.
- R-06 PASS: local Fraunces and Source Sans 3 retain their approved roles and files.
- R-07 PASS: original cloth/paper materials remain; no generic background pattern is added.
- R-08 PASS: existing navigation arrows retain their real direction/replay actions.
- R-09 PASS: no badge or pill is added.
- R-10 PASS: no glass or blur is added.
- R-11 PASS: physical sheet/control corner geometry remains consistent.
- R-12 PASS: shadows describe lifted keepsakes and folding faces; the resting crease no longer casts a heavy overlapping shadow.
- R-13 PASS: existing subject feedback remains; no decorative glow is added.
- R-14 PASS: the existing varied page/reader compositions remain; cats use one consistently fitted artwork frame.
- R-15 PASS: every reader control opens its actual matching object or note.
- R-16 PASS: no marketing buzzword is introduced.
- R-17 PASS: dates, chapter values and EUR25 retain owner-supplied values.
- R-18 PASS: no personal memory, identity, photograph or testimonial is invented.
- R-19 PASS: uniform cat framing and the actual portrait contour remain consistent during opening/return; non-cat material motion retains V34 evidence.
- R-20 PASS: the birthday book, trip and five named cats retain their specific identity.
- R-21 PASS: the approved single light scrapbook theme remains.
- R-22 PASS: the moving visuals use existing selected print; no unrelated illustration is introduced.
- R-23 PASS: no asset identity, personal event or navigation destination is fabricated.
- R-24 PASS: all 18 reader origins lead to real content; existing external destinations remain unchanged.
- R-25 PASS: color/font files are unchanged; the actual V34 token calculations retain their 5.960:1 minimum and prior scene/utility baseline.
- R-26 PASS: all five individual cats and the keyboard family opener pass identity, multi-frame motion, closing, focus and restoration in both engines.
- R-27 PASS: all five cats and the family pass reduced-motion and aborted-3D fallback paths, plus both measured scene heights.
- R-28 PASS: no FAQ is introduced.
- R-29 PASS: Pink + Sage retains its established surface, action and decorative roles.
- R-30 PASS: the physical scrapbook remains its own interface, with no copied product shell.
- R-31 PASS: DESIGN.md explains measured uneven frames, shared separating outlines, uniform contain fitting and masks derived from the actual fitted portraits.
- R-32 PASS: the native labelled modal retains focus, inert animation layers, keyboard family activation, a 44px close control and focus restoration.
- R-33 PASS: application, CSS and documentation edits use apply_patch; scripts create excluded QA/packaging artifacts.
- R-34 PASS: the light reading surfaces remain legible and fitted across measured viewport changes and native fallbacks.
- R-35 PASS: 1,118 current browser checks, pixel/landmark coverage analysis, a full cat motion visual review and final syntax/diff checks pass.
- R-36 PASS: software coverage and retained baselines are explicit; no physical-device or FPS result is fabricated.
- R-37 PASS: preserve-mode direction and explicit retained dials precede implementation.
- R-38 PASS: personal content stays honest placeholders; every populated fixture is labelled and excluded from the published archive.
- Liveliness dials PASS: Antislop 3/3/3 and Taste 8/9/3 remain explicit.
- Liveliness consistency PASS: the whole selected cat retains its frame and proportions through opening and return.
- Liveliness focal point PASS: the selected keepsake leads into one readable native surface.
- Liveliness whitespace PASS: portraits fit inside existing slots with measured space above ears and below paws.
- Liveliness accent PASS: rose remains the action/focus accent.
- Liveliness identity PASS: original cloth, paper, print, five cats and typography remain.
- Liveliness Design Read PASS: DESIGN.md records the repair intent before edits.
- C-1 PASS: the changed frames, separating outlines and masks directly repair the observed sliced cats.
- C-2 PASS: every individual cat and the keyboard family action reaches its correct native reader in both engines.
- C-3 PASS: no story chapter or decorative filler is added.
- C-4 PASS: both scene heights, reduced motion, all-cat graphics fallback, pointer highlights and native source restoration pass; unrelated reader behavior retains V34 evidence.
- C-5 PASS: personal placeholders, fixture boundaries and software verification limits remain explicit.


# Historical validation: material-matched object openings, V34

20 October 2026. Fix the mismatch between the keepsake that is touched and its opening. Preserve the seven-chapter birthday scrapbook, English placeholders, Pink + Sage materials, local fonts, trip, five cats, candle/music, Amazon.de ending and owner-private audience.

The reader now distinguishes maps, photographs, stickers, soundtrack slips, folded letters, flat birthday cards, coupons and disclosure controls. Each physical object travels into its matching native visual. Individual cats retain their selected sprite crop; empty photos retain their exact placeholder and frame proportions. A note button stays on the page and reveals the actual note instead of enlarging its label. The voucher first travels vertically out of its pocket at unit scale, then becomes the horizontal Amazon.de EUR25 coupon; its return reverses that extraction.

A folded letter carries the real salutation, complete body and signoff on its moving inside faces, with the original print on the outside. WebKit's composited canvas descendants leaked through CSS backface culling, so both printed faces now switch visibility at the same edge-on hinge angle on the shared clock. Frozen interruptions hold all animations at one clock time before preserving transforms, face opacity and clipping. The native reading copy takes over at rest. The settled card crop is cleared, and flat-object closing fades its passive backing early so no blank sheet remains.

## Current evidence

All qa/v34 fixtures, recordings and checks are excluded from publication. Both software engines use 375x667 and actual height changes to 375x520. Populated fixtures explicitly identify themselves as QA content and reuse existing assets rather than inventing personal photographs.

| Evidence | Result | Scope |
| --- | --- | --- |
| webkit-checks.json | 502/502 PASS | 30 runs: all 13 populated reader controls and five individual cats; matching material/asset/placeholder/crop, printed fold ink and actual face culling, unit-scale coupon extraction and insertion, stationary disclosure buttons, complete cleanup and focus return |
| chromium-checks.json | 502/502 PASS | Same complete catalog, populated images, resize, reduced-motion, long writing, birthday cancellation and no-3D cases |
| webkit-resize.webm / birthday-card recordings | PASS | Real 667-to-520 opening resize/rebase, cancelled letter and card, preserved clipping and no stale reopen. Card cancellation dispatches the native cancel event used by Escape at a paused, exact 120 ms pose; it is not a physical-key test |
| webkit-long-note.webm / long-letter trace | PASS | Complete 8,766-character letter ink, over 11,000px of native scrolling and a reachable fixed close control |
| webkit-graphics-fallback.webm | PASS | Actual aborted 3D import; Minnie uses the selected cloned portrait and the letter uses its cloned exterior with native printed inside faces. This specifically covers Minnie and the letter, rather than claiming every no-3D origin |
| webkit-catalog.webm / visual-review.json | Reviewed | Full 52-second catalog, all 18 origins; selected source remains recognizable, no reversed letter ink, truncated reading backing, lingering closing X or opaque blank return sheet |
| reader-token-contrast.json | 6/6 PASS | WCAG sRGB calculations from actual CSS tokens; minimum 5.960:1 for the new reader's ink, muted text and rose on cream/pink. Existing layout/scene contrast retains its earlier baseline |
| retained-files.json | 82/88 unchanged | All production imagery, fonts, palette/material styles, configuration, trip, audio and book engine retain V33 bytes; six distribution files change |
| JavaScript syntax / git diff --check | PASS | All four changed JavaScript files parse and the final source diff is clean |

The final visual review checks intermediate opening and closing frames, rather than inferring success from a reading screenshot. Main placeholder source/native ratios are 0.983544/0.983561; each dated placeholder differs by less than 0.007%. A brief text crossfade remains on the flat birthday card. No physical iPhone, hardware FPS or VoiceOver result is claimed.

Initial QA reports are retained separately: one strict selector also matched inert printed clones, the long fixture was overwritten by its parent setter, and live style sampling advanced during an exact-clip assertion. Final checks select the direct native body, keep the actual long fixture, and hold an exact unfinished pose for cancellation. The graphics-fallback navigation probe uses the CSS renderer's state. No failing check is removed from the final required suite.

## Current Antislop delivery gate

PASS. Antislop during remains the explicit session choice. The V34 preserve-mode Design Read precedes implementation in DESIGN.md; ENERGY/RHYTHM/MOTION remains 3/3/3 and Taste remains 8/9/3.

- R-01 PASS: the approved palette/material tokens remain; no gradient or glow is introduced.
- R-02 PASS: reader copy remains English with honest placeholders; no em dash is added.
- R-03 PASS: native sheets and controls fit 375x667 and actual 375x520 changes; placeholder frames retain source proportions.
- R-04 PASS: existing book, music and close icons keep their specific functions.
- R-05 PASS: the existing seven-page story and varied physical compositions remain.
- R-06 PASS: local Fraunces and Source Sans 3 retain their approved roles and files.
- R-07 PASS: original cloth/paper materials remain; no generic background pattern is added.
- R-08 PASS: existing navigation arrows retain their real direction/replay actions.
- R-09 PASS: no badge or pill is added.
- R-10 PASS: no glass or blur is added.
- R-11 PASS: physical sheet/control corner geometry remains consistent.
- R-12 PASS: shadows describe lifted keepsakes and folding faces; the resting crease no longer casts a heavy overlapping shadow.
- R-13 PASS: existing subject feedback remains; no decorative glow is added.
- R-14 PASS: material and content determine reader composition rather than equal template cards.
- R-15 PASS: every reader control opens its actual matching object or note.
- R-16 PASS: no marketing buzzword is introduced.
- R-17 PASS: dates, chapter values and EUR25 retain owner-supplied values.
- R-18 PASS: no personal memory, identity, photograph or testimonial is invented.
- R-19 PASS: photo lift, letter unfolding, card reveal and coupon extraction follow their materials; both engines verify multi-frame motion and reduced-motion reading.
- R-20 PASS: the birthday book, trip and five named cats retain their specific identity.
- R-21 PASS: the approved single light scrapbook theme remains.
- R-22 PASS: the moving visuals use existing selected print; no unrelated illustration is introduced.
- R-23 PASS: no asset identity, personal event or navigation destination is fabricated.
- R-24 PASS: all 18 reader origins lead to real content; existing external destinations remain unchanged.
- R-25 PASS: six actual token contrast pairs pass at 5.960:1 or above; unchanged utility/scene text retains its prior measured baseline.
- R-26 PASS: all material openings, inverse returns, immediate closing X behavior, cleanup and source focus pass in both engines.
- R-27 PASS: reduced-motion native reading, long/empty/populated content, real resize and Minnie/letter graphics fallback pass.
- R-28 PASS: no FAQ is introduced.
- R-29 PASS: Pink + Sage retains its established surface, action and decorative roles.
- R-30 PASS: the physical scrapbook remains its own interface, with no copied product shell.
- R-31 PASS: DESIGN.md records material identity, printed folding faces, edge-on culling, clipping continuity and passive backdrop dismissal.
- R-32 PASS: the native labelled modal retains focus, inert animation layers, keyboard family activation, a 44px close control and focus restoration.
- R-33 PASS: application, CSS and documentation edits use apply_patch; scripts create excluded QA/packaging artifacts.
- R-34 PASS: the light reading surfaces remain legible and fitted across measured viewport changes and native fallbacks.
- R-35 PASS: 1,004 current browser checks, the full catalog visual review, contrast calculations and final syntax/diff checks pass.
- R-36 PASS: software coverage and retained baselines are explicit; no physical-device or FPS result is fabricated.
- R-37 PASS: preserve-mode direction and explicit retained dials precede implementation.
- R-38 PASS: personal content stays honest placeholders; every populated fixture is labelled and excluded from the published archive.
- Liveliness dials PASS: Antislop 3/3/3 and Taste 8/9/3 remain explicit.
- Liveliness consistency PASS: the physical material determines the opening and inverse return.
- Liveliness focal point PASS: the selected keepsake leads into one readable native surface.
- Liveliness whitespace PASS: matching visual targets retain viewport clearance and native content can scroll.
- Liveliness accent PASS: rose remains the action/focus accent.
- Liveliness identity PASS: original cloth, paper, print, five cats and typography remain.
- Liveliness Design Read PASS: DESIGN.md records the repair intent before edits.
- C-1 PASS: each motion decision addresses observed material, backface, clipping or dismissal faults.
- C-2 PASS: every discovered reader opener and its closing path is exercised in both engines.
- C-3 PASS: no story chapter or decorative filler is added.
- C-4 PASS: populated/empty content, reduced motion, long writing, resize/cancel and the specified graphics fallbacks pass.
- C-5 PASS: personal placeholders, fixture boundaries and software verification limits remain explicit.

# Historical validation: visible object openings, V33

20 October 2026. Repair the reported missing opening motion and omitted objects. Preserve the seven-chapter birthday scrapbook, English copy/placeholders, Pink + Sage materials, local type, trip, five cats, candle/music, Amazon.de ending and owner-private audience.

Two populated-content controls, Little notes and Read the note, had no object metadata and always opened an immediate dialog. They now have explicit source keys, dialog semantics and projected print regions with capture, concealment and restoration. Connected reader sources retain the DOM animation fallback. Contents remains a utility dialog. No product text, page content or production artwork is added.

The earlier movement check watched the backing paper. Its selected map/photo/gift print could remain almost stationary or shrink. The selected front now follows a continuous bounded lift/enlargement arc before the native reading handoff, with a shared 740 ms clock or 840 ms letter clock. Complementary fades, original printed ink, persistent canvases and immediate dismissal controls remain. Current software WebKit samples show peak visible width ratios of 1.110 for the map, 1.080 for the main photograph and 1.079 for the gift; these are visual bounding-box measurements relative to the first visible frame, not hardware performance claims.

A real 375x667 to 375x548 resize, followed by 100 ms for its event handlers, reproduced V32 changing opening/4 animations directly to reading/0 animations. V33 retains opening/4 animations in the same probe. Geometry changes now preserve the displayed paper/front poses and continue the remaining animation. Animation generations prevent cancelled jobs from completing a replacement run. The backdrop resumes from its displayed opacity. Travel progress survives rebasing so a restarted clock at zero cannot instantly dismiss an object that has already moved. An invalid return target fades the front, paper and copy together from their current poses.

## Current evidence

All qa/v33 artifacts and fixtures are excluded from publication. Current software coverage is WebKit and Chromium at 375x667 with real changes to 375x520 and back. Populated QA content deliberately exposes controls absent from the default draft; its physical overflow pages are not additions to the default seven-page story.

| Evidence | Result | Scope |
| --- | --- | --- |
| openings-webkit-final.json | 178/178 PASS | All 13 populated reader buttons plus five individual cat origins; visible selected-front poses/enlargement/travel, anchored opening state, map/note ink, X dismissal and source cleanup; real pre-clock/mid-clock resizing, cancellation and late gallery loading |
| openings-chromium.json | 178/178 PASS | Same complete catalog and geometry/image-interruption cases in Chromium |
| midstate-webkit-667.json | 63/63 PASS | Ordinary object roundtrips, immediate X, central print ink, zero-travel cancel, unchanged resize events, complete cleanup and long-note top/middle/bottom; retained ordinary cases are unaffected by the subsequent resize-only cancellation repair |
| resize-v32.json / resize-baseline.json | Reproduced and repaired | Opening remains active after the real height-change event handlers run, instead of instantly settling |
| webkit-catalog.webm / object-opening-preview.mp4 | Reviewed | Selected print visibly lifts, including the two previously omitted controls; the MP4 retains the recording timing |
| webkit-resize.webm / webkit-late-photo.webm / review/visual-review.json | Reviewed | Eight contact sheets, 192 sampled frames: map, photograph, both conditional notes, letter and pre-clock/mid-clock/cancelled resize sequences. No blocking blank front, floating X, jump to reading or popped front found in these selected sequences |
| retained-files.json | 82/88 files unchanged | All fonts, production artwork, material/palette styles, trip/config, audio, app controls and book engine retain exact V32 bytes |
| final syntax/diff checks | PASS | All changed JavaScript parses and git diff --check passes |

The initial comprehensive run completed all 139 catalog checks, then its harness required an explicit idle marker on a rebuilt book that had no active navigation. It now accepts a readable book with neither moving nor preparing navigation. Completed catalog evidence is retained in openings-webkit-catalog.json; the continued resize/image run passes 39/39. That continuation exposed a real early-cancel bug after rebase, which was fixed and rerun before consolidation. The initial reports are retained separately. The final combined WebKit and Chromium evidence contains no failing checks.

A brief blend of differing printed/native text remains during the intended crossfade. No physical iPhone, hardware FPS or VoiceOver result is claimed. Existing text colors, fonts and reading surfaces retain the earlier 222 native/desktop contrast samples; unchanged utility, audio/candle, voucher and full reverse-navigation behavior retain V32 evidence. Recipient access remains deferred.

## Current Antislop delivery gate

PASS. Antislop during remains the explicit session choice. The V33 preserve-mode Design Read precedes edits in DESIGN.md; ENERGY/RHYTHM/MOTION stays 3/3/3 and Taste stays 8/9/3.

- R-01 PASS: approved palette/material styles retain their bytes; no gradient or glow is added.
- R-02 PASS: English product copy remains unchanged; no em dash is introduced.
- R-03 PASS: actual 375x667/520 changes finish with paper and close controls fitted to the new viewport; selected-front arcs are bounded.
- R-04 PASS: existing book and close icons retain their specific actions.
- R-05 PASS: original page compositions remain; populated fixtures expose existing conditional content rather than adding a template section.
- R-06 PASS: both local font files and typography roles retain their bytes.
- R-07 PASS: original cloth/paper materials remain; no new background pattern is added.
- R-08 PASS: existing navigation and replay arrows retain their functions.
- R-09 PASS: no badge or pill is added.
- R-10 PASS: no glass or blur is added.
- R-11 PASS: original sheet/control corner geometry remains.
- R-12 PASS: existing panel/front shadows retain their physical elevation purpose.
- R-13 PASS: existing subject feedback now also identifies the two conditional print regions.
- R-14 PASS: content-driven page compositions remain varied.
- R-15 PASS: Little notes and Read the note now perform their specific animated opening actions.
- R-16 PASS: no marketing language or buzzword is introduced.
- R-17 PASS: dates, chapter values and EUR25 retain owner-supplied values.
- R-18 PASS: no personal memory, identity or testimonial is invented.
- R-19 PASS: selected-front movement is measured and visually reviewed; real resize continues motion; reduced-motion behavior remains respected.
- R-20 PASS: the book, trip, five cats and keepsakes retain their existing identity.
- R-21 PASS: the approved single light scrapbook theme remains.
- R-22 PASS: fronts project existing print; no production illustration is added.
- R-23 PASS: no asset, identity or navigation destination is invented.
- R-24 PASS: every discovered reader opener retains its real content destination.
- R-25 PASS: unchanged text colors, fonts and reading surfaces retain the measured 222-sample contrast baseline.
- R-26 PASS: all 18 reader origins, closing controls, interrupted openings and exact source selection pass in both engines.
- R-27 PASS: source fallback remains available for connected reader controls; original graphics, image, empty-content and absent-code states remain.
- R-28 PASS: no FAQ is introduced.
- R-29 PASS: the approved Pink + Sage palette remains unchanged.
- R-30 PASS: existing physical scrapbook styling remains; no product shell is copied.
- R-31 PASS: DESIGN.md explains the selected-front lift, source coverage, generation guards, progress retention and backdrop/return continuity.
- R-32 PASS: new controls have dialog semantics; keyboard family opening, labelled modal behavior, Escape and immediate close paths retain their functionality.
- R-33 PASS: application/CSS/documentation changes use apply_patch; scripts create excluded QA and packaging artifacts.
- R-34 PASS: the existing light theme retains its reading surfaces and controls across measured viewport changes.
- R-35 PASS: 419 current opening/roundtrip checks, reviewed recordings and final syntax/diff checks pass.
- R-36 PASS: software measurements and retained baselines are explicit; no physical-device or FPS result is fabricated.
- R-37 PASS: preserve-mode direction and retained dials precede implementation.
- R-38 PASS: personal content remains honest placeholders; all populated fixtures are explicitly labelled and excluded from publication.
- Liveliness dials PASS: Antislop 3/3/3 and Taste 8/9/3 remain explicit.
- Liveliness consistency PASS: the selected print itself lifts from its location before reading.
- Liveliness focal point PASS: the selected keepsake leads into one native reading surface.
- Liveliness whitespace PASS: bounded flight and measured native paper preserve viewport clearance.
- Liveliness accent PASS: original rose remains the action/focus accent.
- Liveliness identity PASS: original cloth, paper, print, artwork and type remain.
- Liveliness Design Read PASS: DESIGN.md records the repair intent before code changes.
- C-1 PASS: each change addresses observed missing motion, source coverage or interruption behavior.
- C-2 PASS: every discovered reader opener and its dismissal path is exercised in both engines.
- C-3 PASS: no story, page or decorative filler is added.
- C-4 PASS: conditional content, real resize, delayed images, cancellation and long scrolled writing pass; existing fallback behavior remains.
- C-5 PASS: personal placeholders and software verification limits remain explicit.

# Historical validation: reader and book motion repairs, V32

20 October 2026. Fix the reported lingering X and audit the complete interaction, including intermediate opening and closing frames. Preserve the physical scrapbook, seven chapters, English placeholders, Pink + Sage materials, local fonts, birthday music/candle prerequisite, Amazon.de ending and owner-private audience.

The close control becomes hidden, disabled and inert in the dismissal handler, before the return starts. Pointer openings keep it hidden until reading; keyboard openings retain a visible focused control. Original print canvases now supply the moving fronts, avoiding a synchronous GPU readback and retaining map/note ink. The source patch preserves its local backing and foreground layers, including the contact mat and gift pocket. Keep the moving canvas composited at zero opacity while reading: hiding it from layout made WebKit return blank paper. A short complementary opacity handoff avoids the former blank gap and prolonged doubled text.

The gift extracts directly from its pocket in one motion. Negligible-travel cancellation closes immediately; partial returns scale to their progress. Ignore resize notifications when geometry is unchanged, reserve gallery image dimensions, and attach folded-paper shadows to the visible panels. Real viewport changes invalidate stale source patches; context loss retains readable content and the native fallback. Source patches are removed after restoration, invalidation, graphics failure or disposal, including a return while hidden.

Repeated navigation taps retain the current destination. Cloth, mouse, Escape and touch interruptions settle at a complete page. Contents and the owner editor contain keyboard scrolling; document-level wheel/touch guards stop backdrop scrolling. Closing a modal resumes pending page settlement. Home now runs the same full reverse page journey and cover hinge as Read from the cover.

## Current evidence

All qa/v32 artifacts are excluded from publication. Current checks use software WebKit at 375x667 with a real resize to 375x520, and Chromium at 375x667. The unchanged desktop styling and contrast measurements retain their V31 baseline; they are not new V32 device tests.

| Evidence | Result | Scope |
| --- | --- | --- |
| midstate-webkit-667.json | 63/63 PASS | Full open/close traces for map, dated/main photos, letter, Minnie, soundtrack, birthday note and gift; immediate X dismissal, central print ink, complete cleanup, zero-travel cancellation, unchanged resize and long-note top/middle/bottom |
| midstate-chromium-667.json | 63/63 PASS | Same reader and long-note cases in Chromium; moving paper/front/body/backdrop and background book scroll are sampled throughout |
| bookstates-webkit.json | 26/26 PASS | Real repeat touch navigation, mouse/Escape interruption, synthetic held-touch release, Contents/editor keyboard containment, candle gate, all five reverse turns, cover hinge and reduced-motion close |
| bookstates-chromium.json | 28/28 PASS | Same book/input cases plus actual wheel input inside Contents and on its backdrop |
| resilience-webkit.json | 35/35 PASS | Complementary print/native opacity through the handoff; pointer-opening X hidden in every sampled frame; visible keyboard focus; restored source ink; real 375x520 resize/reopen; actual WEBGL_lose_context; missing 3D and reduced-motion readers |
| webkit-667-roundtrips.webm / long-notes.webm / review sheets | Reviewed | Complete opening and return sequences, not only final cleanup. Map, letter and gift retain visible print through the return; no floating X during close; gift pocket remains in front of its card |
| resilience-webkit-handoff.webm and other resilience recordings | Reviewed with sampled states | Final pointer-control flash fix, keyboard reopening, real resize, graphics failure and fallback runs. final-reader-preview.mp4 shows the final reader; reader-motion-preview.mp4 retains the full roundtrip recording timing |
| resilience-chromium.json | 4 cleanup checks PASS; 1 capability SKIP | Tab switching/CDP lifecycle control kept this headless page visible. Actual hidden-event execution is unverified; no synthetic document.hidden result is substituted. Foreground close/reopen cleanup passes |
| retained-files.json | 80/88 files unchanged | All artwork, fonts, material/palette CSS, trip/config, audio, object feedback and other unchanged assets retain exact V31 bytes. Eight distribution files change |
| static-checks.json and git diff --check | PASS | All six changed JavaScript files parse and the source diff is clean |

The recorded main pass measures first visible paper movement 74–160 ms after the reader handler starts in WebKit and 44.7–110.1 ms in Chromium, below the configured 180 ms software budget. These comparative measurements do not establish physical iPhone frame rate. Pointer-to-motion timings and sampled frame gaps are retained in the raw traces.

The audit rejected the initial V32 recording despite positive state checks because its returning fronts still looked blank. Keeping the canvas composited fixed that visual failure; matched fades then removed the pale handoff gap. Focused QA also exposed real Contents ArrowDown and backdrop-wheel leaks and a one-frame pointer-opening X flash; all affected checks were rerun after their fixes. An early test expected every modal to open during a turn, although a trusted tap could reach a reading phase first; it now compares the actual opening pose and document scroll. Mobile WebKit does not support Playwright wheel input, so genuine wheel checks run in Chromium. Historical V31 final-state counts below are not evidence that those previously missed intermediate frames were correct.

No physical iPhone, hardware FPS, VoiceOver or genuine hidden-tab execution result is claimed. Existing 222 native/desktop contrast samples retain their baseline because text colors, fonts and surfaces remain unchanged. Recipient access remains deferred.

## Current Antislop delivery gate

PASS. Antislop during remains the explicit session choice. DESIGN.md records preserve-mode direction before edits, ENERGY/RHYTHM/MOTION 3/3/3 and Taste 8/9/3. The gate below is reviewed against the changed source, current evidence and explicitly retained baselines.

- R-01 PASS: original palette/material tokens remain; no gradient or glow is added.
- R-02 PASS: English product copy remains unchanged; no new em dash is introduced.
- R-03 PASS: actual 375x667 to 375x520 resize keeps paper and the 44px close control within the viewport.
- R-04 PASS: X retains its concrete dismissal function and disappears immediately on use.
- R-05 PASS: the seven original physical page compositions remain.
- R-06 PASS: both local font files and typography roles retain exact bytes.
- R-07 PASS: original paper/cloth materials remain; no background pattern is introduced.
- R-08 PASS: navigation and replay arrows retain their actions; Home now animates its return.
- R-09 PASS: no badge or pill is added.
- R-10 PASS: no glass or blur is added.
- R-11 PASS: original sheet and control corner geometry remains.
- R-12 PASS: folded-paper shadows follow visible panels, avoiding the unfolded rectangular shadow.
- R-13 PASS: existing subject feedback remains and rests during inspection.
- R-14 PASS: original content-driven compositions remain varied.
- R-15 PASS: Open the book, object inspection, gift and replay actions remain specific and functional.
- R-16 PASS: no marketing claim or buzzword is introduced.
- R-17 PASS: dates, chapter counts and EUR25 retain owner-supplied values.
- R-18 PASS: no identity, testimonial or personal memory is invented.
- R-19 PASS: complete open/close traces, complementary fades and reverse turns substantiate the motion; reduced motion remains usable.
- R-20 PASS: the physical book, trip, five cats and keepsakes retain their identity.
- R-21 PASS: the approved single light scrapbook theme remains.
- R-22 PASS: moving fronts project existing print canvases; all production artwork is unchanged.
- R-23 PASS: no new asset, identity or navigation destination is created.
- R-24 PASS: map, photographs, notes, cats, soundtrack, birthday, gift, Contents and Home retain working destinations.
- R-25 PASS: unchanged fonts, text colors and surfaces retain the 222 measured V31 contrast samples; no new product text is added.
- R-26 PASS: current object, close, navigation, modal, candle and replay paths pass; unchanged owner/coupon actions retain their prior evidence.
- R-27 PASS: actual graphics failure, missing 3D and reduced-motion readers retain readable content; original empty/error states remain.
- R-28 PASS: no FAQ is introduced.
- R-29 PASS: the approved Pink + Sage palette remains byte-identical.
- R-30 PASS: the established scrapbook identity remains; no product shell is copied.
- R-31 PASS: DESIGN.md explains print projection, local source layering, shared timing, canvas retention, dismissal and scroll containment.
- R-32 PASS: native modal labels, keyboard opening, visible close focus, Escape and source return retain their behavior; active dialogs contain navigation keys.
- R-33 PASS: application/CSS/documentation edits use apply_patch; scripts produce excluded QA and packaging artifacts.
- R-34 PASS: the existing light theme remains usable in measured reader and fallback states.
- R-35 PASS: 215 current reader/book/resilience checks, recorded intermediate-frame review and syntax/diff checks pass.
- R-36 PASS: software timings are labelled; no physical-device, FPS or assistive-technology result is fabricated.
- R-37 PASS: preserve-mode Design Read and retained dials precede source changes.
- R-38 PASS: names, photos, memories, song choices and the purchased code remain honest placeholders; QA fixtures are excluded from publication.
- Liveliness dials PASS: Antislop 3/3/3 and Taste 8/9/3 remain explicit.
- Liveliness consistency PASS: each selected object travels from and returns to its place in the physical book.
- Liveliness focal point PASS: one selected keepsake leads into the readable sheet.
- Liveliness whitespace PASS: real short-viewport checks retain paper clearance and a reachable close control.
- Liveliness accent PASS: original rose remains the action/focus accent.
- Liveliness identity PASS: existing cloth, paper, print and artwork remain.
- Liveliness Design Read PASS: DESIGN.md states the intent and lifecycle rules before implementation.
- C-1 PASS: each change repairs observed motion, rendering or input behavior.
- C-2 PASS: changed opening, dismissal, Home, repeat navigation and modal-input actions pass in both engines.
- C-3 PASS: no story, page or decorative filler is added.
- C-4 PASS: interruption, long content, real resize, graphics failure, fallback and reduced motion pass.
- C-5 PASS: placeholders and measurement limits remain explicit; no gift purchase or personal memory is fabricated.

# Historical validation: continuous keepsake motion, V31

20 October 2026. Repair the reported roughness in opening and returning details. Keep the existing book geometry, complete cover/turn/replay journey, seven chapters, English placeholders, Pink + Sage palette, local type, birthday soundtrack, candle prerequisite and Amazon.de ending.

The baseline WebKit probe measured 96–105 ms of synchronous GPU capture in the opening handler. A resting-page image is now prepared during idle time and reused only for matching page/camera/prop geometry. The final recorded map, dated photo, photograph and letter captures take 0–1 ms, with 8–28 ms total reader setup in this software run. An early tap without a prepared image still uses a correct live capture. These are comparative software-browser timings, not physical iPhone performance claims.

Remove the early lift waypoint and letter hold. Paper, captured front, emerging text and fold use one eased path and one start time. Let the concealed WebGL frame and new layers paint before starting that clock. This fixes the observed Chromium initial-paint stall: the same opening probe changes from one visible pose to 34. Pause the backdrop until the shared start and match its duration and early-close opacity. Keep the same paper and static box shadow during motion and reading; remove the filtered shadow and final surface replacement. Subject-feedback rendering rests while a detail is open.

Close from the exact displayed pose, including an interrupted opening. A ResizeObserver keeps the persistent sheet aligned with its native dialog; viewport changes use the safe short dismissal. Preference changes settle or close safely. Idle preparation is cancelled during page turns, modal reading, hidden pages, graphics failure or disposal, and restarted when its page/camera/prop pose changes. No production image or personal content is created.

## Current evidence

All qa/v31 artifacts are excluded from publication. Browser coverage is software WebKit at 375x667 and 375x520, a recorded 375x667 journey including a 375x548 resize, Chromium at 375x667, and desktop Chromium at 1440x900.

| Evidence | Result | Scope |
| --- | --- | --- |
| object-checks.json | 326/326 PASS | Map, all dated photos, main photograph, letter, five cats/family, soundtrack, birthday note and raised gift; intermediate poses, photo aspect ratio, labelled dialogs, viewport fit, 44px controls, dismissal, focus return and exact source restoration |
| object-checks.json, lifecycle/fallback coverage | PASS | Early Escape, repeated opens, native close, resize during opening and gift lift, long notes, image/code fixtures, reduced motion, missing 3D, selected gallery ordering, contents, candle/music behavior and complete cover replay |
| motion-checks.json | 42/42 PASS | Shared clocks, monotonic paper expansion, prepared capture cost, persistent unfiltered paper, no background rendering at rest, keyboard scroll containment, viewport alignment, candle prerequisite, gift and full reverse journey |
| motion-checks.json, interrupted return | PASS | Close at 8%, 42% and 80% of letter opening preserves the displayed bounds within one CSS pixel; measured maximum changes are 0.135, 0.347 and 0.037 px |
| desktop-checks.json | 4/4 PASS | Persistent paper matches the native dialog within one pixel at 1440x900; Escape cleanup and no JavaScript errors |
| native-contrast.json / desktop-contrast.json | 206/206 and 16/16 PASS | Current detail text; minimum computed contrast 6.0118:1. Unchanged book print and controls retain the prior scene and layout baselines below |
| baseline.json / motion-costs.json / chrome-probe.json | PASS | Baseline live capture 96–105 ms; prepared recorded captures 0–1 ms; corrected Chromium opening shows 34 sampled poses |
| retained-files.json | 83/88 files unchanged | All existing artwork, fonts, content/config, trip, audio, controls, app/story wiring and book engine retain V30 bytes; only the reader, renderer capture support and their cache-query references change |
| smooth-motion.webm / smooth-motion-preview.mp4 / motion-sheet.jpg | PASS | Reviewed current 74.8-second WebKit journey: cover opening, object transitions, interrupted letters, viewport change, birthday, gift and every reverse turn; MP4 preserves the recording timing |
| syntax and diff checks | PASS | Reader/loader JavaScript and renderer module parse; git diff --check passes |

The initial Chromium run exposed the real initial-paint stall and was superseded after the two-frame handoff fix. Completed WebKit cases were retained; Chromium, lifecycle/gift resize, focused motion and desktop checks complete the clean current evidence. The initial interruption probe used a half-pixel cutoff; the final probe explicitly requires continuity within one CSS pixel and all measured differences are below 0.35 px. No physical iPhone frame rate or assistive-technology test is claimed.

## Current Antislop delivery gate

PASS. Antislop during remains the explicit session choice. Preserve-mode direction was written in DESIGN.md before source edits, with ENERGY/RHYTHM/MOTION 3/3/3 and Taste 8/9/3.

- R-01 PASS: approved cloth, paper and rose tokens remain byte-identical; no glow or gradient is added.
- R-02 PASS: existing English product text remains unchanged, with no new em dashes.
- R-03 PASS: measured mobile and desktop sheets fit their viewports with reachable 44px close controls.
- R-04 PASS: the existing close icon retains its concrete dismissal function.
- R-05 PASS: all seven physical compositions and their spacing remain unchanged.
- R-06 PASS: both local font files and existing type roles retain exact bytes.
- R-07 PASS: the original paper material supplies the persistent reader surface.
- R-08 PASS: original navigation, gift and replay arrows retain their actions.
- R-09 PASS: no badge or pill is added.
- R-10 PASS: no blur or glass layer is added; the animated shadow filter is removed.
- R-11 PASS: existing sheet/control corner geometry remains.
- R-12 PASS: one persistent paper shadow conveys elevation without switching at rest.
- R-13 PASS: subject feedback remains on the book and rests while inspecting a detail.
- R-14 PASS: page compositions stay varied and driven by their original content.
- R-15 PASS: opening, inspection, dismissal, gift and replay actions remain concrete.
- R-16 PASS: no marketing text or buzzword is introduced.
- R-17 PASS: dates, chapter counts and EUR25 retain their owner-supplied values.
- R-18 PASS: no identity, testimonial or invented personal memory is introduced.
- R-19 PASS: sampled paths, shared clocks and full recorded turns substantiate the motion; reduced motion remains usable.
- R-20 PASS: the book, trip, five cats and keepsakes retain their original identity.
- R-21 PASS: the single approved light theme remains.
- R-22 PASS: artwork stays unchanged; transient fronts capture existing objects.
- R-23 PASS: no new production asset or destination is created.
- R-24 PASS: the map, photo, note, cat, music, gift and contents destinations work.
- R-25 PASS: all 222 current native text contrast samples pass; unchanged print retains the previous scene baseline.
- R-26 PASS: object actions, selected image ordering, close paths and exact source restoration pass.
- R-27 PASS: native/reduced-motion readers, missing 3D, empty content, unavailable audio and absent-code behavior remain.
- R-28 PASS: no FAQ is introduced.
- R-29 PASS: palette and material tokens remain byte-identical.
- R-30 PASS: the approved physical scrapbook identity remains.
- R-31 PASS: DESIGN.md explains idle capture, shared timing, first-paint handoff, persistent paper, interruption and resize behavior.
- R-32 PASS: labelled native modals, keyboard focus/opening, Escape, focus return and modal keyboard scrolling are exercised.
- R-33 PASS: source and documentation edits use apply_patch; scripts prepare QA and package artifacts only.
- R-34 PASS: the approved light theme works in the measured reading states and viewports.
- R-35 PASS: 372 current state/motion/desktop checks, 222 contrast samples, recorded review and syntax/diff checks pass.
- R-36 PASS: no hardware frame rate or device/assistive-technology result is fabricated.
- R-37 PASS: the focused preserve-mode direction and retained dials precede implementation.
- R-38 PASS: personal details remain honest placeholders; labelled QA fixtures are excluded from the published archive.
- Liveliness dials PASS: Antislop 3/3/3 and Taste 8/9/3 remain explicit.
- Liveliness consistency PASS: objects travel from and return to their place in the book.
- Liveliness focal point PASS: the selected keepsake leads into the readable sheet.
- Liveliness whitespace PASS: measured detail bounds and close controls fit mobile and desktop.
- Liveliness accent PASS: the original rose remains the action and focus accent.
- Liveliness identity PASS: original cloth, print, paper and artwork remain.
- Liveliness Design Read PASS: DESIGN.md records the purpose and lifecycle of the repair.
- C-1 PASS: every motion change repairs continuity or avoids a measured rendering hitch.
- C-2 PASS: current object, coupon, contents, candle, audio and dismissal paths are exercised.
- C-3 PASS: no story, page, visual decoration or filler is added.
- C-4 PASS: interruption, long content, resize, short viewports, fallback and desktop cases pass.
- C-5 PASS: placeholder honesty and measured performance scope remain explicit.

# Historical validation: details open from their keepsakes, V30

20 October 2026. Implement approved improvement 2: a detail sheet begins at the physical object the reader touches, and returns there on dismissal. Photos lift without changing aspect ratio. Letters open a hinged upper paper panel before growing into the reading sheet. The gift completes its existing pocket/card lift first, then uses the actual raised card as its origin. Maps, cat stickers and the soundtrack use the same anchored paper interaction. Selecting the main photograph opens that image first while retaining the complete gallery.

The moving front is a synchronous crop of the rendered 3D attachment, positioned using its projected corners. Only that attachment is concealed while reading, leaving the underlying page and other objects in place. A separate paper surface expands behind it. At rest, a native dialog provides full readable content and focus containment. Closing reverses the motion, restores the attachment exactly once and returns focus to its source. The native graphics fallback clones the existing source element; reduced motion skips the flight entirely. No image, content, chapter, palette, font or music track is added.

Closing during opening, repeated opens, direct native close and resizing all clean up their transient canvases, animations and hidden objects. Resizing settles the reader and uses a short dismissal when coordinates are stale. Pending book reflows wait until dialogs close; delayed gift callbacks resolve the current source after a rebuild. Navigation keys scroll only the detail sheet. This fixes an observed WebKit Page Down leak that moved the book behind an open letter. The close control remains 44px and fixed in view while long text scrolls.

## Current evidence

Artifacts in qa/v30 are excluded from publication. Current browser coverage is software WebKit at 375x667, 375x548 and 375x520, Chromium at 375x667, both native/reduced-motion and graphics-fallback readers, and Chromium desktop at 1440x900.

| Evidence | Result | Scope |
| --- | --- | --- |
| object-checks.json | 377/377 PASS | Actual projected/cropped origins, attachment conceal/restore, intermediate opening poses, photo aspect ratio, letter hinge poses, full readable content, viewport clearance, 44px close target, labelled focus-contained dialogs, Escape/button/backdrop dismissal and no JavaScript errors in the main journeys |
| object-checks.json, object coverage | PASS | Map, all four dated photos, main photograph, letter, all five individual cat origins and their family action, soundtrack, birthday note and raised gift card; every completed source is restored once |
| object-checks.json, interruption and lifecycle cases | PASS | Early Escape never reopens the reader; repeated opens leak no transient nodes; direct native close cleans up; Safari-height changes preserve the reading chapter; resizing during gift lift remains anchored and the rebuilt gift can be opened again |
| object-checks.json, retained behavior | PASS | Seven-page journey, full replay/single cover action, contents navigation, candle prerequisite, real Happy Birthday output stopping on extinguishing, silent gift return, existing coupon copy/redeem controls and honest empty-code state |
| object-checks.json, fallback and content fixtures | PASS | Both reduced-motion readers skip flights; missing 3D uses a native object front; an existing material image is explicitly labelled as a QA photograph fixture; long QA text remains complete and scrollable with the close control visible |
| resilience-checks.json | 21/21 PASS | Page Down keeps the book at the same scroll position; keyboard reopening retains visible focus; owner editor/backdrop remains separate; a missing transition module retains the original readable dialog; desktop geometry fits; selected-photo-first ordering preserves both gallery images |
| native-contrast.json / resilience-contrast.json | 234/234 and 16/16 PASS | Current settled object readers, long letter and desktop sheet text; unchanged resting book print and utility controls retain V29/V27/V26 evidence below |
| retained-files.json | 80/80 unchanged | All existing CSS, fonts, artwork, personalisation config, trip definition, birthday audio and object-feedback modules retain exact V29 bytes; changes are confined to detail wiring, object capture, a pending-resize guard and the new reader script/styles |
| object-transitions.webm / object-transitions-preview.mp4 / motion-sheet.jpg | PASS | Current WebKit 375x667 journey includes map/photo lifts, letter unfolding, cat/soundtrack details, birthday note, candle, raised gift detail and complete reverse book closure; MP4 trims preparation only |
| screenshots and spatial traces | PASS | Reviewed reading sheets, selected gallery image, long-note close position and current motion; moving photo fronts preserve aspect ratio and finish within the visible reader area |
| syntax / diff | PASS | All affected JavaScript parses, including the renderer module; git diff --check passes |

The map motion fixture was corrected to measure position as well as width, since a map can translate while retaining its size. A copy-result QA assertion was corrected to await the message rather than form a Python async generator. Completed checks were retained and remaining cases continued. The actual Page Down background-scroll defect was fixed and its affected keyboard paths were retested in both engines. The final reports above contain no failing checks.

These are software browser checks, not physical iPhone, hardware FPS or VoiceOver measurements. Current modal text is checked directly; moving decorative fronts reuse the already validated book print. Placeholder content stays explicit and English. Owner-private access is preserved; recipient access remains deferred.

## Current Antislop delivery gate

PASS. Antislop during remains the session choice. DESIGN.md records the preserve-mode direction before implementation, ENERGY/RHYTHM/MOTION 3/3/3 and Taste 8/9/3. The UI skill checklist passes: established palette and type, purposeful material motion, real controls, honest placeholders, error/fallback paths and measured touch/keyboard layouts remain intact.

- R-01 PASS: approved cloth, paper and rose tokens remain; no new gradient or glow is added.
- R-02 PASS: product copy remains the existing English text, without new em dashes.
- R-03 PASS: all four mobile cases fit settled detail sheets and 44px close controls inside the viewport without horizontal overflow.
- R-04 PASS: the existing close icon retains its dismissal function; no decorative icon is created.
- R-05 PASS: the seven physical page compositions remain; no template section is added.
- R-06 PASS: both local typefaces and their roles retain exact bytes.
- R-07 PASS: the existing paper texture supplies the unfolding reader surface.
- R-08 PASS: existing navigation/gift arrows retain their original functions.
- R-09 PASS: no badge or pill is introduced.
- R-10 PASS: no glass layer or blur is added.
- R-11 PASS: existing small sheet/control corners remain.
- R-12 PASS: the temporary front and paper shadows identify a lifted keepsake; the resting dialog retains its original shadow.
- R-13 PASS: existing temporary object-selection feedback is unchanged.
- R-14 PASS: page compositions remain varied and content-driven.
- R-15 PASS: existing opening, gift and replay actions remain concrete; the close button dismisses the active sheet.
- R-16 PASS: no marketing copy or buzzword is added.
- R-17 PASS: dates, page counts and EUR25 retain owner-supplied values.
- R-18 PASS: no identity or testimonial is introduced.
- R-19 PASS: spatial traces show real intermediate lifts/hinges; flights serve inspection and return; reduced motion skips them.
- R-20 PASS: the same physical book, selected keepsakes, five cats and trip retain their existing identity.
- R-21 PASS: the approved single light theme remains.
- R-22 PASS: approved artwork remains unchanged; fronts are transient captures of the touched object.
- R-23 PASS: the owner explicitly approved these object transitions; no new asset, identity or navigation destination is invented.
- R-24 PASS: real map, photo, note, music, gift and contents destinations remain usable.
- R-25 PASS: all 250 current modal/desktop text contrast samples pass; unchanged book print keeps its existing scene baseline.
- R-26 PASS: current object actions and dismissals work; selected photographs open first and every source is restored.
- R-27 PASS: missing transition/3D support retains reading; original image errors, empty photos, unavailable audio and missing-code states remain.
- R-28 PASS: no FAQ is added.
- R-29 PASS: palette tokens remain byte-identical.
- R-30 PASS: the existing scrapbook identity is retained; no popular-product shell is adopted.
- R-31 PASS: DESIGN.md explains capture, flight, letter fold, gift sequencing, resize handling and keyboard scroll containment.
- R-32 PASS: native modal focus containment, explicit title, visible keyboard focus, Escape, source-focus return and keyboard scrolling are exercised.
- R-33 PASS: application/documentation edits use apply_patch; scripts prepare QA and packaging artifacts only.
- R-34 PASS: the one light theme works across measured reader states and viewports.
- R-35 PASS: 398 current state/input checks, 250 contrast samples, recorded object journeys and syntax/diff checks pass; untouched controls retain prior evidence.
- R-36 PASS: no physical-device, hardware performance or assistive-technology claim is fabricated.
- R-37 PASS: the focused design intent and retained dials are recorded before source edits.
- R-38 PASS: personal content remains unchanged and explicitly placeholder; QA fixtures are labelled and excluded from publication.
- Liveliness dials PASS: 3/3/3 and Taste 8/9/3 remain explicit.
- Liveliness consistency PASS: each transition belongs to its touched physical object.
- Liveliness focal point PASS: the selected keepsake leads into one readable sheet while the book recedes.
- Liveliness whitespace PASS: final reader geometry and close targets fit every measured viewport.
- Liveliness accent PASS: existing rose remains the action/focus accent.
- Liveliness identity PASS: original print, cloth and paper connect book and details.
- Liveliness Design Read PASS: DESIGN.md records the purpose and lifecycle rules.
- C-1 PASS: every new layer serves the approved source-to-detail motion or its safe dismissal.
- C-2 PASS: object actions, reading, close paths, coupon actions and missing-module fallback are exercised.
- C-3 PASS: no extra story, page or filler is added.
- C-4 PASS: interruption, keyboard, long text, resize, reduced motion, missing 3D/module and desktop cases pass.
- C-5 PASS: no personal memory, purchased code or performance result is fabricated.

# Historical validation: more room for the book, V29

20 October 2026. Implement only the first approved improvement: let the book dominate the screen and simplify its surrounding controls. The cover now has one visible primary opening action. Its redundant previous/contents/next row and home link are hidden, inert and excluded from assistive technology until reading starts. Their dimensions remain measurable, so opening does not change the camera's available space.

The header becomes a 44px utility row on the existing blush/linen ground. The cat returns to the cover; sound remains available; the editor remains owner-only. The wordmark and duplicate date stop taking screen space. The reading toolbar is also 44px high, with transparent arrow controls, the current chapter/page and an explicitly labelled contents action. Touch targets stay at least 44px. Keyboard focus is visible, including inside the top edge of the header.

The mobile reading scale can now reach 1.0 instead of 0.96; the closed cover reaches 0.94 instead of 0.84 at 375x667. Shorter viewports retain the same automatic fit. Original 335x469 paper dimensions at 375px width, typography, seven pages, page-turn timing, artwork, birthday music and candle prerequisite remain intact. The opening action uses the bottom space freed by hiding cover navigation. No new content, asset, object transition or page is added.

## Current evidence

Artifacts in qa/v29 are excluded from publication. Browser checks run in software WebKit at 375x667, 375x548 and 375x520, Chromium at 375x667, both reduced-motion readers and Chromium desktop at 1440x900.

| Evidence | Result | Scope |
| --- | --- | --- |
| layout-checks.json | 309/309 PASS | Single cover action, hidden/inert home and navigation, keyboard tab order, constant control geometry, 44px targets, seven-page pagination, paper fit/spacing, contents labels, every changed control and no JavaScript errors |
| layout-checks.json, recorded navigation | PASS | Actual touch/keyboard opening, next/previous, all five reverse turns, intermediate closing poses, replay and cat home; map, four dated photos, photograph, letter, five cats, soundtrack, birthday note, physical gift reveal and owner editor remain usable |
| layout-checks.json, lifecycle and audio | PASS | Three Safari-height rebuilds retain the birthday leaf; contents cannot bypass the candle; ambient is replaced by actual Happy Birthday output; mute/unmute works; extinguishing stops all audio and unlocks the gift; native/reduced-motion reading remains usable |
| native-contrast.json | 64/64 PASS | Visible control text in cover, reading, birthday, gift, resize and desktop hover states |
| scene-contrast.json | 72/72 PASS | Paired actual ink/no-ink scene captures at DPR2 in all four mobile browser/viewports, covering enlarged cover and birthday print; minimum core text contrast 5.237:1 |
| control-contrast-bounds.json | 4/4 PASS | Conservative contrast bounds over the actual linen texture at 8 percent opacity: ink 9.136:1, muted print 5.113:1, rose icons/focus 4.892:1; opening-button text 6.698:1 |
| retained-files.json | 82/82 unchanged | All existing stylesheets, print fonts, artwork, app/personalisation logic, configuration, trip definition, audio module and 3D rendering/material/feedback modules retain their exact V28 bytes; only script wiring, two camera fit values and control-state/ARIA wiring change, plus the new control stylesheet |
| interaction-final.webm / reader-controls-preview.mp4 | PASS | Current WebKit 375x667 book journey includes opening, object feedback, navigation, contents lock, candle completion, gift reveal and complete reverse closure; MP4 trims preparation only |
| current cover/read/birthday/gift, desktop and native screenshots | PASS | Reviewed larger cover, quiet controls, short-height paper clearance, birthday state and desktop spread; controls remain separate from the physical paper |
| syntax / diff | PASS | Both changed JavaScript files parse; git diff --check passes |

An initial QA focus fixture used programmatic focus after pointer input in Chromium, which correctly does not activate :focus-visible. It was corrected to actual Shift+Tab input and verified in both engines. The completed mobile journeys were retained; only the corrected focus case and remaining native/desktop cases were run afterwards. No application fix was needed for that fixture.

These checks do not measure a physical iPhone, hardware FPS or VoiceOver behavior. Hidden-control semantics, actual keyboard focus and browser geometry are exercised directly. Other printed leaves retain the V27/V26 contrast evidence below; their source styling, lighting and ink are unchanged. The full owner-private access policy remains unchanged.

## Current Antislop delivery gate

PASS. Antislop during remains the session choice. ENERGY/RHYTHM/MOTION 3/3/3 and Taste 8/9/3 are recorded in DESIGN.md before implementation. The UI skill checklist also passes: the approved palette, purposeful accent, varied physical compositions, real navigation, restrained effects, honest placeholders, existing loading/error states and tested touch/keyboard layouts remain intact.

- R-01 PASS: existing pink cloth, ivory paper and rose actions retain their documented material/hierarchy roles; no glow or gradient is added.
- R-02 PASS: the only new product copy is the concrete English contents accessibility label, without an em dash.
- R-03 PASS: all four mobile cases fit above controls without horizontal overflow; every changed visible control keeps a 44px target.
- R-04 PASS: the existing cat, sound, editor and navigation icons keep their real functions; no decorative icon is introduced.
- R-05 PASS: the seven distinct physical compositions and their original content remain; no template section is added.
- R-06 PASS: both self-hosted fonts and their printed-book/reading roles retain their exact bytes.
- R-07 PASS: the existing linen texture continues behind the utility row to join it to the scrapbook ground.
- R-08 PASS: arrows identify actual previous/next actions and disappear with redundant cover navigation.
- R-09 PASS: no pill or badge is introduced.
- R-10 PASS: no glass surface or blur is added.
- R-11 PASS: existing small control corners remain; the boxed arrow surfaces are removed deliberately.
- R-12 PASS: physical contact shadows remain; no control shadow is added.
- R-13 PASS: existing temporary object-selection feedback remains byte-identical.
- R-14 PASS: the varied physical page compositions remain unchanged.
- R-15 PASS: Open the book is the single cover action; contents receives an explicit chapter/page label.
- R-16 PASS: no marketing copy or generic CTA is added.
- R-17 PASS: dates, page counts and EUR25 retain owner-supplied values; no statistic is added.
- R-18 PASS: no identity or testimonial is introduced.
- R-19 PASS: recorded opening, turns and closing retain their reversible timeline; only fitting scale changes.
- R-20 PASS: pink cloth, sewn name label, five cats and specific trip retain their existing identity.
- R-21 PASS: the approved single light theme remains.
- R-22 PASS: all approved illustrations retain their exact bytes.
- R-23 PASS: the owner explicitly approved this control/layout refinement; no asset or navigation destination is created.
- R-24 PASS: every chapter target resolves; current contents, home, previous/next and replay actions are exercised.
- R-25 PASS: all 64 native samples, 72 actual scene samples and four conservative control contrast bounds pass.
- R-26 PASS: each changed control has its real action; inaccessible redundant cover controls are inert and hidden.
- R-27 PASS: original loading, empty photograph, missing-image, unavailable-audio and empty-code handling remain unchanged.
- R-28 PASS: no FAQ is introduced.
- R-29 PASS: all palette tokens remain unchanged; the utility row uses the existing stage and lining colors.
- R-30 PASS: the existing physical scrapbook identity remains; no popular-product shell is adopted.
- R-31 PASS: DESIGN.md records why controls recede, their measurements remain stable and the camera uses the freed space.
- R-32 PASS: actual Tab/Shift+Tab/Enter/Escape paths, hidden-control tab exclusion, focus rings and labelled contents pass.
- R-33 PASS: application and documentation changes use apply_patch; scripts prepare only QA and packaging artifacts.
- R-34 PASS: the one light theme works in all measured states and viewports.
- R-35 PASS: 309 current state/input checks, current recording and contrast verification pass; untouched ancillary owner controls retain previous evidence.
- R-36 PASS: no physical-device, hardware performance or assistive-technology claim is fabricated.
- R-37 PASS: the focused preserve-mode design direction and retained dials are documented before source edits.
- R-38 PASS: names, memories, photos and the purchased voucher code retain their honest placeholders.
- Liveliness dials PASS: ENERGY/RHYTHM/MOTION 3/3/3 and Taste 8/9/3 remain explicit.
- Liveliness consistency PASS: the existing physical book still carries the motion; controls recede without adding effects.
- Liveliness focal point PASS: the enlarged cover and reading page dominate their respective screens.
- Liveliness whitespace PASS: measured paper/control clearance remains at least 12px in every mobile reading state.
- Liveliness accent PASS: the opening action and active sound state use the approved rose.
- Liveliness identity PASS: cloth, paper, attached keepsakes and print remain coherent throughout.
- Liveliness Design Read PASS: DESIGN.md records the requested scope and layout decisions.
- C-1 PASS: every interface change serves the approved single-action cover or increased book space.
- C-2 PASS: changed controls, dialogs, page navigation and the birthday/gift path are exercised.
- C-3 PASS: no extra content or section is added.
- C-4 PASS: mobile resize, native/reduced-motion, desktop hover and keyboard states pass.
- C-5 PASS: no memory, code, metric or performance result is invented.

# Historical validation: birthday music follows the candle, V28

19 October 2026. This update changes only audio. Entering the birthday leaf stops the original background melody and plays a quiet instrumental arrangement of the traditional Happy Birthday tune. It repeats while the candle is unblown. The first extinguishing immediately cancels sounding voices, future notes and the repeat timer. Music stays off afterwards until the reader explicitly requests it.

The existing sound button remains available. Explicit mute is respected on birthday entry. A trusted touch or keyboard gesture silently prepares the audio context for Safari; if playback remains blocked, the sound button is the retry action. A late resume cannot restart music after the candle has been extinguished. Relighting, returning to the completed birthday, moving to the gift or rebuilding the current layout does not automatically restart it. Backgrounding suspends playback. No recording, streaming service, microphone permission or new visual control is introduced.

## Current evidence

Artifacts in qa/v28 are excluded from publication. Tests instrument real browser AudioContexts and measure the generated output with an AnalyserNode; audio output is not mocked. Only the stale-resume case deliberately holds the completion of a real resume promise. The hidden-document lifecycle check explicitly simulates visibility events.

| Evidence | Result | Scope |
| --- | --- | --- |
| audio-checks.json | 84/84 PASS | WebKit 375x667/548/520 and Chromium 375x667; silent gesture preparation, original ambient output, replacement with Happy Birthday, explicit mute, re-entry, manual retry, candle extinguishing, cancelled future notes, relighting, gift navigation and no JavaScript errors |
| audio-checks.json, lifecycle and fallback cases | PASS | Safari-height rebuilds and owner save preserve the current performance; delayed resume after extinguishing stays silent; reduced-motion readers play/stop correctly; unavailable Web Audio or a missing audio module leave the book and gift usable |
| loop-checks.json | 9/9 PASS | All 25 notes match the traditional melody; playback repeats while lit, suspends/resumes with visibility, stops on extinguishing and remains silent beyond a complete repeat interval |
| birthday-audio.webm | PASS | 24.7-second capture of actual browser output: original ambient, birthday entry, a full verse, repeat and silence after extinguishing; Opus at 48kHz |
| native-contrast.json | 16/16 PASS | Existing on/off sound button states in all four browser/viewports; unchanged printed leaves retain the V27/V26 evidence below |
| retained-files.json | 81/81 unchanged | All CSS, artwork, fonts, configuration, paper/3D engine, trip data, personalisation and object feedback retain their exact V27 bytes; only app/story wiring, script inclusion and the new audio module change |
| birthday screenshots | PASS | Reviewed the WebKit birthday leaf with active sound: existing English copy, spacing, materials, candle prerequisite and navigation remain intact |
| syntax / diff | PASS | All three affected JavaScript files parse; git diff --check passes |

These are software-browser checks, not physical iPhone or hardware performance measurements. Existing tap, Enter and Space candle interactions remain unchanged. Access remains owner-private; arranging recipient access is deferred as requested.

## Current Antislop delivery gate

PASS. Antislop during remains explicit, with ENERGY/RHYTHM/MOTION 3/3/3 and Taste 8/9/3 recorded in DESIGN.md before delivery. Current checks cover the affected audio and control states. The unchanged visual design and remaining book interactions retain the V27/V26 evidence below.

- R-02, R-15, R-16, R-24, R-26, R-27, R-32 and R-35 PASS: concrete English playback/retry states use the existing keyboard-accessible button; failure never prevents reading or extinguishing the candle; all 93 audio/state checks pass.
- R-03, R-06, R-07, R-10, R-11, R-12, R-14, R-19, R-21, R-22, R-25, R-29, R-30 and R-34 PASS: layout, local typefaces, materials, composition, reversible book motion and the single Pink + Sage theme remain byte-identical; all 16 affected native contrast checks pass.
- R-01, R-04, R-08, R-09 and R-13 PASS: the existing sound icon changes with actual playback; no decorative effect, badge, animation or extra UI is added.
- R-05, R-17, R-18, R-20, R-23, R-28, R-31 and R-38 PASS: no new story, image, personal memory, statistic, identity, claim or filler is introduced; the seven-page scrapbook retains its existing identity.
- R-33, R-36 and R-37 PASS: application and documentation edits use apply_patch; the audio-only design intent is recorded; browser and visibility-fixture limitations are stated accurately.
- Liveliness dials, consistency, focal point, whitespace, accent, identity and Design Read PASS: the requested song gives the existing cake moment its soundtrack without adding density or changing the visual hierarchy.
- C-1 through C-5 PASS: the requested transition has a clear candle-linked purpose; current touch/keyboard, mute, lifecycle, missing-module and unsupported-audio checks pass; no additional content or fabricated personal detail is added.

# Historical validation: candle before the gift, V27

19 October 2026. The gift now requires the first candle extinguishing. Before that action, Next is disabled on the cake leaf and forward scroll stops with the cake upright, before the outgoing fold. Contents and coupon actions cannot skip it. The native/reduced-motion reader hides the gift leaf until the same prerequisite is complete. Earlier pages and the full birthday note remain available.

Tap, Enter or Space performs the existing candle interaction. The caption now explicitly says Tap to blow out the candle. This does not use or imply microphone detection. The first extinguishing unlocks the gift for the current reading session; relighting, replay, viewport rebuilds, owner refresh and switching motion preference preserve completion. Reload starts a new session. The actual coupon, EUR25 value, code handling and complete reverse book animation retain their existing behavior.

The first extinguishing also confirms You can turn the page now. This replaces any blocked-gift notification that is still visible, so the old prerequisite hint does not linger after it has been completed.

Testing also exposed an existing motion-preference transition that reverted the chapter to Cover before cleanup could capture it. A bookmark now records the current chapter before GSAP's matchMedia revert, restoring the same chapter in the other reader. The gate remains locked or unlocked appropriately.

## Current evidence

Artifacts in qa/v27 are excluded from publication. Current checks exercise the gate; the unchanged seven-page geometry, artwork, palette, typography and spacing retain V26 evidence below.

| Evidence | Result | Scope |
| --- | --- | --- |
| gate-checks.json | 259/259 PASS | WebKit 375x667/548/520 and Chromium 375x667; disabled next, synthetic click guard, full note while locked, repeated scroll, wheel input paths, End/PageDown, contents, direct gift action, earlier pages, first extinguishing, relighting, coupon, reload reset and no JavaScript errors |
| gate-checks.json, lifecycle cases | PASS | Locked/unlocked owner refresh, three Safari-height rebuilds, motion-preference changes, graphics fallback, native reduced motion and usable candle with missing artwork |
| gate-checks.json, actual input | PASS | Real injected Chromium touch swipe and native Chromium wheel; WebKit mobile lacks a wheel API, so its wheel event plus resulting scroll position are exercised explicitly |
| gate-checks.json, replay cases | PASS | Unlocked next turns through intermediate poses; both 667px engines replay all five inside turns and close the cover; completed candle still permits contents access afterwards |
| confirmation-checks.json / confirmation-contrast.json | 8/8 and 10/10 PASS | Both engines replace a still-visible blocked hint with the completed-action message on first extinguishing; next enables and remains enabled after relighting; notification contrast passes |
| native-contrast.json | 150/150 PASS | Affected native states and the new contents hint; minimum text contrast 5.960:1 |
| scene-contrast.json | 36/36 PASS | Actual paired lit ink/no-ink captures at DPR2 in all four browser/viewports; affected initial birthday instruction and print, minimum core contrast 5.454:1; other leaves retain V26 evidence |
| retained-files.json | 78/78 unchanged | All CSS, fonts, artwork, config, trip definition, owner data/form logic and object-feedback implementation retain their exact previous bytes |
| locked/unlocked screenshots and current recording | PASS | Reviewed the instruction, disabled next, unchanged spacious leaf composition, candle action, unlocked gift and complete forward/reverse journey |
| interaction-final.webm / candle-gate-preview.mp4 / motion-sheet.jpg | PASS | Final 57.6-second WebKit 375x667 recording includes blocked scroll/contents, first extinguishing and its completion message, relighting, gift lift/dialog and the full reverse journey; MP4 trims only preparation and retains software timing |
| syntax / diff | PASS | Changed JavaScript parses; git diff --check passes |

These checks use software WebKit/Chromium. They do not measure a physical iPhone or hardware FPS. The gate is a reading interaction, and no microphone permission is requested. Personal content remains explicit English placeholders. Full existing owner-private access is retained.

## Current Antislop delivery gate

Antislop during remains the explicit session choice. DESIGN.md records this prerequisite and its visible explanation, with ENERGY/RHYTHM/MOTION 3/3/3 and Taste 8/9/3. Current evidence covers affected behavior; untouched materials and controls retain the V26 baseline.

- R-02 PASS: new product copy has no em dash; existing confirmed date ranges retain their en dash.
- R-03 PASS: affected layouts fit all four browser/viewport cases without horizontal overflow; all CSS and paper dimensions remain byte-identical to V26.
- R-17 PASS: the birthday, trip and EUR25 remain owner-supplied; no statistics are added.
- R-18 PASS: no invented identity or testimonial is introduced.
- R-23 PASS: no new artwork is created; the owner explicitly requested the candle prerequisite.
- R-24 PASS: all seven retained chapter targets resolve; the locked gift routes to the real birthday chapter with an explanation.
- R-25 PASS: all 150 current native, ten confirmation and 36 actual birthday-scene contrast samples pass; retained other print keeps its V26 baseline.
- R-26 PASS: Next has an explicit, usable prerequisite; first extinguishing enables it, while existing notes and earlier-page actions remain available.
- R-27 PASS: the missing-art fixture retains a usable candle, and the original loading, photo-error and empty-code states remain.
- R-28 PASS: no FAQ is introduced.
- R-32 PASS: Enter/Space extinguish the candle; next becomes keyboard-focusable; Escape closes dialogs; disabled Next references the candle instruction.
- R-33 PASS: all application and documentation edits use apply_patch; scripts only prepare QA and packaging artifacts.
- R-34 PASS: the single light theme remains unchanged.
- R-35 PASS: 259 current input/state checks, eight confirmation checks and the final locked-to-unlocked recorded book journey pass; unaffected ancillary controls retain earlier evidence.
- R-36 PASS: acoustic detection and physical-device performance are not claimed; the product explicitly instructs a tap.
- R-37 PASS: the new interaction purpose and retained dials are documented in DESIGN.md before delivery.
- R-38 PASS: no personal memory, purchased code or realistic content is fabricated.
- R-01 PASS: existing candle flame and temporary selection feedback retain their stated roles; no new glow is added.
- R-04 PASS: existing action icons remain unchanged; no decorative icon is added.
- R-06 PASS: both local typefaces and their printed-keepsake/reading roles remain unchanged.
- R-07 PASS: the existing paper and linen materials remain; no background pattern is added.
- R-08 PASS: arrows continue to identify navigation and gift actions.
- R-09 PASS: no pill or badge is introduced for the lock.
- R-10 PASS: no glass layer is added.
- R-12 PASS: existing material contact shadows remain unchanged.
- R-13 PASS: object feedback remains scoped to the existing temporary selection interaction.
- R-14 PASS: the seven distinct material compositions remain, including separate celebration and gift leaves.
- R-19 PASS: the gate stops before the outgoing fold; after unlocking, the same reversible clock controls the fold and all page turns.
- R-22 PASS: the approved cake, map and five cats remain unchanged.
- Liveliness dials PASS: ENERGY/RHYTHM/MOTION 3/3/3 and Taste 8/9/3 remain explicit.
- Liveliness consistency PASS: the candle adds a purposeful birthday moment while retaining the existing physical book motion.
- Liveliness focal point PASS: the cake remains the celebration's focal point, and the instruction uses its existing caption.
- Liveliness whitespace PASS: all V26 CSS and measured group spacing remain unchanged; no extra message block crowds the leaf.
- Liveliness accent PASS: existing rose actions, sage material details and small warm flame retain their roles.
- Liveliness identity PASS: the same pink cloth, attached keepsakes, paper and typography remain throughout.
- Liveliness Design Read PASS: DESIGN.md records the requested order and state/lifecycle decisions.
- C-1 PASS: the navigation limit serves the owner's explicit order, and the caption explains the available action.
- C-2 PASS: the prerequisite is achievable through touch and keyboard in both scene and native readers.
- C-3 PASS: no filler page or story content is added; the existing candle gains the requested role.
- C-4 PASS: current gate checks cover scroll/input paths, fallback, missing art, motion preference, viewport rebuilds and session reset.
- C-5 PASS: no fabricated claim, memory or testimonial is added.
- R-05 PASS: the existing content-driven physical scrapbook remains, without a generic template section.
- R-11 PASS: corners and squared navigation retain their existing material/function roles.
- R-15 PASS: Tap to blow out the candle explicitly identifies the action; Open your gift and Read from the cover remain concrete.
- R-16 PASS: no AI marketing language is added.
- R-20 PASS: the specific trip, five cats and birthday keepsake identity remain intact.
- R-21 PASS: the selected pink-first light theme remains.
- R-29 PASS: the existing Pink + Sage palette remains byte-identical.
- R-30 PASS: no unrelated product UI is cloned.
- R-31 PASS: the prerequisite, visible hint, session completion and chapter restoration each have a written purpose in DESIGN.md.

---

# Historical V26 validation: more space between keepsakes

19 October 2026. Responds to the crowded ending by giving the cake/wish and Amazon.de EUR25 pocket separate physical leaves. The default book now has seven pages, including the cover. This adds breathing room without adding personal-story filler. The paper remains 335x469 at 375px width; Safari toolbar changes scale the same paper.

The celebration has a larger birthday heading, a padded 17px wish, more space before the cake and 22px before the note. The gift has a taller pocket/card and 26px before replay. Notes has larger gaps between the letter, cats and music, plus a 7px gap between stickers. Measured gaps, normalised to paper dimensions, are about 18/16px on Notes, 22px before the wish and 26px before replay in every tested viewport. Merely fitting on paper had not ensured a comfortable composition in V25; these explicit gaps and the separate gift leaf address that feedback.

Moving the gift also makes the cake an outgoing page object. It now opens early, holds upright for reading and folds during the final 28% of the reading interval before the sheet turns. Returning from the gift reverses this curve. Both renderers use the same absolute clock. The gift's scene setup now identifies the coupon attachment directly, so its lift and selection feedback work on its new leaf.

## Current evidence

Artifacts in qa/v26 are excluded from publication.

| Evidence | Result | Scope |
| --- | --- | --- |
| cake-checks.json | 240/240 PASS | WebKit 375x667/548/520 and Chromium 375x667; all seven pages fit, measured group spacing, separate final gift, candle tap/Enter/Space, wish/gift dialogs, real card-lift poses, full five-turn replay and cover closing, Safari-height rebuilds, native fallback, reduced motion, missing cake, owner save/export and no JavaScript errors |
| cake-geometry.json | 36/36 PASS | Actual projected cake/candle bounds at nine progress positions in each browser/viewport case; continuous opening, outgoing folding to zero and reversed return from the gift |
| personalized-checks.json | 10/10 PASS | Longer recipient name and full personal wish in both engines; cake/wish share their leaf, gift stays separate, complete name fits, excerpt fits and full note remains available |
| native-contrast.json | 354/354 PASS | Affected reader states, dialogs and owner form; minimum text 6.012:1 |
| scene-contrast.json | 284/284 PASS | Actual paired lit ink/no-ink captures at DPR2 in Chromium 667 and WebKit 667/548/520; minimum core print contrast 4.567:1, including the separate gift leaf |
| retained-files.json | 77/77 unchanged | Config, trip definition, all photos/artwork, font files, base palette, personalisation logic, object-feedback module and the cake geometry module retain their exact previous bytes |
| ending-before-after.jpg / chapter screenshots | PASS | Reviewed the crowded prior ending beside the separate celebration and gift, plus Notes and both ending leaves at short Safari heights |
| interaction-final.webm / spacing-preview.mp4 / motion-sheet.jpg | PASS | Reviewed the complete 53.72-second WebKit 375x667 recording: opening, all forward leaves, cat selection/dialog, cake press and extinguish/relight, full wish, separate gift lift/dialog and every reverse turn back to the cover; MP4 trims only preparation and retains software timing |
| syntax / diff | PASS | Changed JavaScript parses; git diff --check passes |

These are software WebKit/Chromium checks, not a physical-iPhone Safari or hardware-FPS measurement. Personal names, photos, memories, songs and the purchased voucher code remain explicit English placeholders. Longer personal writing can still add leaves through the existing pagination. Existing access stays owner-private; no sharing change is made.

## Current Antislop delivery gate

Antislop during is the explicit session choice. DESIGN.md records the spacing decision before delivery: ENERGY/RHYTHM/MOTION 3/3/3 and Taste 8/9/3, with reduced visual density. PASS evidence is current for affected behavior; untouched controls/materials retain their V25 and earlier baseline.

- R-02 PASS: new product copy contains no em dash; the confirmed date range keeps its existing en dash.
- R-03 PASS: all seven default pages fit at all four browser/viewport cases; full recipient names and the longer wish case also pass.
- R-17 PASS: the birthday, itinerary and EUR25 come from the owner; no product statistics are added.
- R-18 PASS: no testimonial or fictional identity is introduced.
- R-23 PASS: existing approved artwork is reused; the additional leaf directly addresses the owner's request for more room.
- R-24 PASS: all seven chapter IDs resolve, including the new gift leaf; complete forward/reverse navigation returns to Cover.
- R-25 PASS: all 354 affected native contrast samples and 284 actual-scene samples pass their applicable thresholds.
- R-26 PASS: the moved coupon opens after its actual card lift; candle, wish, notes and replay retain their real actions.
- R-27 PASS: current missing-cake, empty voucher, honest personal placeholders and original loading/error handling remain usable.
- R-28 PASS: no FAQ is added.
- R-32 PASS: current Enter, Space and Escape checks pass; native focus styles and the existing selection feedback remain.
- R-33 PASS: source, styles and documentation use apply_patch; scripts only prepare QA artifacts and package the exact source.
- R-34 PASS: the existing single light theme remains consistent.
- R-35 PASS: 240 behavior/fit checks, ten personalised-content checks and the full current recorded journey pass; unchanged ancillary controls retain their earlier evidence.
- R-36 PASS: no performance, security or compliance claim is invented; physical-device measurement is explicitly unclaimed.
- R-37 PASS: the current Design Read, density reduction and established material direction precede delivery in DESIGN.md.
- R-38 PASS: personal content remains honest placeholders; no trip memory, cake purchase or voucher code is fabricated.
- R-01 PASS: the existing small flame depicts a candle; selection halos remain temporary interaction feedback.
- R-04 PASS: retained icons keep their real navigation, music and gift actions; no decorative glyph is added.
- R-06 PASS: local Fraunces and Source Sans 3 retain their documented printed-keepsake and reading roles; the restored heading/message sizes improve hierarchy.
- R-07 PASS: the existing linen and paper textures describe book materials; no decorative grid is added.
- R-08 PASS: retained arrows identify navigation and the gift/replay actions.
- R-09 PASS: no capsule badge or headline pill is introduced.
- R-10 PASS: no glass layer is added.
- R-12 PASS: retained contact shadows describe attachments resting on paper, including the enlarged pocket and wish.
- R-13 PASS: object contours remain temporary press, hover or focus feedback; the moved gift retains its scene contour.
- R-14 PASS: birthday celebration and gift have distinct compositions, alongside map, contact sheet, photo mount and folded note.
- R-19 PASS: continuous opening, outgoing folding, reverse return and complete replay use the existing clock; settled candle rendering stops.
- R-22 PASS: the specific approved cake, map and five cats are reused; no generic illustration is added.
- Liveliness dials PASS: ENERGY/RHYTHM/MOTION 3/3/3 and Taste 8/9/3 are explicit in the current Design Read.
- Liveliness consistency PASS: physical motion remains expressive while the two ending moments receive separate leaves.
- Liveliness focal point PASS: cake and wish lead the celebration; the larger coupon pocket leads the final leaf.
- Liveliness whitespace PASS: measured physical gaps and reviewed before/after screenshots show intentional separation rather than merely passing overflow checks.
- Liveliness accent PASS: rose remains the action colour; sage and the small amber flame retain their material roles.
- Liveliness identity PASS: pink cloth, warm paper, attached keepsakes and printed typography remain consistent.
- Liveliness Design Read PASS: the owner's density feedback is recorded with the resulting layout decision in DESIGN.md.
- C-1 PASS: spacing, padding, the larger pocket and extra leaf each have a stated reading/composition purpose.
- C-2 PASS: affected controls work in both engines, keyboard, reduced motion and graphics fallback.
- C-3 PASS: the extra leaf separates existing gift content; no filler story or new personal claim is added.
- C-4 PASS: three phone heights, viewport rebuilds, longer text, missing imagery, native fallback and keyboard cases pass.
- C-5 PASS: all dates and gift value remain owner-supplied; unknown personal details stay bracketed.
- R-05 PASS: seven physical pages retain distinct content roles rather than a repeated marketing layout.
- R-11 PASS: retained squared controls and paper edges continue to reflect their material/function.
- R-15 PASS: actions remain concrete: Tap the candle, Read note, Open your gift and Read from the cover.
- R-16 PASS: no AI marketing language is added.
- R-20 PASS: the specific itinerary, five cats, birthday and personal keepsake motif remain identifiable.
- R-21 PASS: the selected pink-first light theme is retained.
- R-29 PASS: the established Pink + Sage material palette remains unchanged.
- R-30 PASS: the existing personal scrapbook composition is refined without cloning an unrelated UI.
- R-31 PASS: current layout, spacing and motion choices have written reasons; prior type, colour and art provenance remain applicable.

---

# Historical V25 validation: pop-up birthday cake

18 October 2026. Implements the approved paper cake on the existing birthday leaf. An original ivory/pink cutout with a small sage bow is attached to a real scene hinge and two folded supports. The separate candle starts lit; a tap extinguishes it, briefly emits smoke and prints Make a wish. Another tap or keyboard activation relights it. The pop-up unfolds and folds as an absolute function of the existing page clock, including the complete return to the cover.

Cake, short wish, Amazon.de EUR25 pocket and replay share the final leaf at the three requested phone heights. The measured one-line wish excerpt opens the entire note. Existing personalisation, itinerary, names, photos, cats, fonts, palette, original book motion and access are retained. Candle state survives owner refresh, Safari-height rebuild and graphics fallback; it is local to the current reading session. Reduced motion keeps the static composition and functional candle without smoke or lifting. The final illustration remains a complete 1536x1024 RGBA cutout, encoded without cropping; provenance is in dist/assets/cutouts/PROVENANCE.md.

## Current evidence

Workspace artifacts in qa/v25 are excluded from publication.

| Evidence | Result | Scope |
| --- | --- | --- |
| cake-checks.json | 190/190 PASS | WebKit 375x667/548/520 and Chromium 375x667; all six pages fit, new candle tap/Enter/Space actions, real smoke poses, caption/action-label changes, no idle rendering, both new object-feedback keys, full wish and gift dialogs, complete reverse journey, three height rebuilds, graphics fallback, reduced motion, owner save/export and a missing-illustration state |
| cake-geometry.json | 28/28 PASS | Actual projected cake/candle mesh bounds at seven reading positions in each browser/viewport case; hinge opens continuously, adds over 30 scene units of depth and folds back to zero in reverse |
| personalized-checks.json | 10/10 PASS | Both engines with a longer recipient name and a long wish; birthday contents share one leaf, print fits, full name remains and full wish opens without clipping |
| native-contrast.json | 348/348 PASS | Affected birthday states, note/gift dialogs and owner form; minimum text 6.012:1; all text, input, placeholder, button and boundary thresholds pass |
| scene-contrast.json | 268/268 PASS | Actual lit ink/no-ink capture pairs at DPR2 in Chromium 667 and WebKit 667/548/520; minimum core print contrast 4.567:1 |
| interaction-final.webm / birthday-cake-preview.mp4 | PASS | Complete recorded WebKit 375x667 opening, forward leaves, pop-up arrival, touch contour, extinguish/relight/re-extinguish, full wish, gift and full reverse closing; 48.8-second recording retains original software timing, with preparation trimmed in the MP4 |
| popup-0.png / popup-0.14.png / popup-0.32.png | PASS | Reviewed folded, intermediate and standing cake poses |
| chapter/state screenshots and motion/closing sheets | PASS | Reviewed cake, visible EUR25 row, wish caption, native fallback, short portrait views and complete closing |
| syntax / diff / retained data | PASS | Affected JS parses and git diff --check passes; config, trip definition, fonts, base palette, birthday cover, original input-feedback module and app personalisation logic are unchanged |

The default reading path remains six pages. The longer-name check confirms the birthday contents share a leaf; existing pagination can still add leaves for other lengthy personal writing. Older controls and unaffected print retain the V24 and earlier baseline below. This is software-rendered browser verification, not a physical-iPhone Safari or hardware-FPS measurement. The cake is printed pop-up paper with geometric folds, rather than a sculpted cake or a physical simulation. No age, purchased cake, trip memory or gift code is fabricated. The complete owner-private access policy is preserved.

## Current Antislop delivery gate

Antislop during and Taste 8/9/4 remain the explicit session choices. ENERGY/RHYTHM/MOTION 3/3/3 and the approved material direction remain in DESIGN.md. Each PASS is backed by the current evidence above or the unchanged source and baseline relevant to this feature.

- R-02 PASS: new UI copy contains no em dash; confirmed date ranges keep their existing en dash.
- R-03 PASS: all six default pages fit in all four browser/viewport cases; projected cake bounds and the personalised birthday leaf also pass.
- R-17 PASS: birthday date and EUR25 come from the owner; no product statistics are added.
- R-18 PASS: no testimonial or fictional identity is introduced.
- R-23 PASS: the owner explicitly approved the cake concept and generated imagery; originals and provenance are recorded, while personal content stays bracketed.
- R-24 PASS: all six retained chapter IDs resolve; recorded forward/reverse navigation and return to Cover pass.
- R-25 PASS: all 348 native and 268 actual-scene contrast samples meet their applicable thresholds.
- R-26 PASS: candle, full wish, coupon and replay perform their actions; controls retain tap and keyboard semantics.
- R-27 PASS: loading, blank personalisation and gift-code states remain; the new missing-cake fixture shows a clear message with a usable candle.
- R-28 PASS: no FAQ is introduced.
- R-32 PASS: tap, Enter, Space and Escape pass; native focus styles remain and both new controls join the existing object feedback.
- R-33 PASS: application source, styles and documentation use apply_patch; external tooling only generates/encodes artwork and records QA artifacts.
- R-34 PASS: the existing single light theme is retained.
- R-35 PASS: 190 current behavior/fit checks, 10 personalisation checks and the complete recorded book/candle/gift journey pass; unchanged ancillary controls retain the earlier baseline.
- R-36 PASS: no invented performance, security or compliance claim is added; physical-phone verification remains explicitly unclaimed.
- R-37 PASS: the approved concept, retained direction and V25 Design Read are documented with the established dials.
- R-38 PASS: the cake is an identified illustration; personal names, memories, photos and purchased voucher code remain honest placeholders.
- R-01 PASS: the warm flame and pink candle stripe depict a real candle; no ambient background glow is added.
- R-04 PASS: existing functional icons remain; the cake and flame are physical content, rather than decorative UI glyphs.
- R-06 PASS: existing local Fraunces and Source Sans 3 retain their printed-keepsake and reading roles; the new caption uses the same Source Sans 3.
- R-07 PASS: paper/linen textures remain material cues; no decorative grid is introduced.
- R-08 PASS: existing navigation/gift arrows retain their direction/action purpose; no new decorative arrow is added.
- R-09 PASS: no capsule badge or repeated headline pill is introduced.
- R-10 PASS: no glass layer is added.
- R-12 PASS: cake, folded supports, thin note and pocket use contact shadows to describe their paper construction.
- R-13 PASS: the cake alpha contour and wish outline occur only during the existing selection interaction.
- R-14 PASS: the birthday leaf is composed around its cake, message and pocket; the other distinct compositions remain.
- R-19 PASS: the cake hinge shares the reversible book clock; flame/smoke animation is short and stops at rest, verified by render-frame checks.
- R-22 PASS: the approved original cake specifically serves the birthday ending; no stock decorative illustration is added.
- Liveliness dials PASS: explicit 3/3/3 and Taste 8/9/4 remain in DESIGN.md.
- Liveliness consistency PASS: actual recordings retain the physical book and concise six-page default path.
- Liveliness focal point PASS: the cake leads the birthday leaf, followed by the short note and smaller gift pocket.
- Liveliness whitespace PASS: current paper-fit checks and reviewed phone screenshots retain margins and navigation clearance.
- Liveliness accent PASS: rose remains the action colour; sage remains a small material accent and amber is confined to the flame.
- Liveliness identity PASS: pink cloth, warm paper, printed type and attached keepsakes remain the repeated material motif.
- Liveliness Design Read PASS: the approved birthday concept and its design interpretation precede delivery in DESIGN.md.
- C-1 PASS: each new element serves the approved candle/cake celebration, with reasons recorded in DESIGN.md.
- C-2 PASS: both new controls work in both engines, keyboard, reduced motion and native fallback.
- C-3 PASS: no extra default page or filler section is introduced; the full wish remains available behind its concrete Read note action.
- C-4 PASS: all requested phone heights, three resize rebuilds, context loss, reduced motion, image failure and owner data cases pass.
- C-5 PASS: no fictional testimonial, statistic, birthday age or personal-memory claim is added.
- R-05 PASS: the physical six-topic scrapbook remains, with a specific celebration ending rather than a marketing template.
- R-11 PASS: paper surfaces and squared native controls retain their existing purposeful shapes.
- R-15 PASS: action labels identify the candle, full birthday note, gift and complete return to the cover.
- R-16 PASS: no AI marketing language is added.
- R-20 PASS: the confirmed trip, named cats, personal placeholders and birthday cake/gift ending identify this specific keepsake.
- R-21 PASS: the selected pink-first light theme is retained.
- R-29 PASS: approved paper, pink, rose and sage material roles remain; the small natural flame colour is documented separately.
- R-30 PASS: the original physical scrapbook composition is retained; the new artwork follows the approved personal cake brief.
- R-31 PASS: image choice, folding geometry, caption, brief note, gift layout, type and colour choices have written reasons in DESIGN.md and the asset provenance.

---

# Historical V24 validation: Trier and Luxembourg, 22–25 October

18 October 2026. Updates the confirmed trip to 22–25 October 2026: Trier on 22 October, Luxembourg on 23 October, Luxembourg then Trier on 24 October, and Trier on 25 October. Luxembourg is the opening interior focus. The new map shows the country outline and central Trier, with no unconfirmed city, travel route, transport or departure claim. Geographic sources and linked credits are in dist/assets/illustrations/trier-luxembourg-map.md.

One trip definition supplies the cover, daily entries, dialogs, owner fields and the decorative reverse faces in both renderers. Main-photo priority is 23 October, then 24 October, then the other days; the caption follows the chosen slot. Existing config keys, personal writing and all photo slots survive import, save, reload and export. Shared dist/config.js and the local font files are unchanged. The six-page book, Pink + Sage materials, five cats, 2 November birthday, Amazon.de EUR25 ending and all motion logic remain.

## Current evidence

Workspace evidence in qa/v24 is excluded from the publication archive.

| Evidence | Result | Scope |
| --- | --- | --- |
| trip-checks.json | 204/204 PASS | WebKit 375x667/548/520 and Chromium 375x667; cover, six-page fit, all four dated/location dialogs, country-map reference, main-photo placeholder, photo/note/cats/music/gift actions, complete animated replay, native graphics fallback, reduced motion, owner labels and saved photo priority/data preservation |
| native-contrast.json | 643/643 PASS | Reader, current dialogs and owner form; text, input, placeholder, button and boundary pairs meet their applicable thresholds; minimum text 5.670:1 |
| scene-contrast.json | 264/264 PASS | Paired actual lit ink/no-ink captures at DPR2 in Chromium 667 and WebKit 667/548/520; minimum core text contrast 4.567:1 |
| replay-samples.json | PASS | Actual navigation traverses all four inside turns and multiple cover-closing poses, then settles on Cover |
| interaction-final.webm / trier-luxembourg-preview.mp4 | PASS | Complete recorded WebKit 375x667 cover opening, all forward pages, object feedback, cats/gift dialogs and complete animated return to cover; software timing retained |
| motion-sheet.jpg / closing-sheet.jpg / chapter screenshots | PASS | Reviewed actual cover, new geographic keepsake, four dated fragments, main-photo mount, letter, birthday ending and reverse sequence |
| syntax / diff / config / fonts | PASS | All affected JS parses, git diff --check passes; shared configuration and existing font files are unchanged |

The recording is software-rendered browser evidence, not a physical-iPhone Safari or hardware frame-rate measurement. The new geography and layout retain the established book geometry and input logic. Ancillary unchanged controls retain V21–V23 evidence below. Personal names, photographs, anecdotes, songs and the purchased voucher code remain the requested placeholders. Access is preserved in full.

## Current Antislop delivery gate

The existing Antislop during mode and Taste 8/9/4 remain the explicit session direction. V24 material/content choices are documented before delivery in DESIGN.md. Each PASS below cites current evidence or the unchanged implementation and prior baseline relevant to this bounded content update.

- R-02 PASS: current reader, dialogs and editor contain no added em dash; the date range uses an en dash.
- R-03 PASS: all six pages fit above navigation without horizontal overflow in the four tested browser/viewport combinations, recorded in trip-checks.json.
- R-17 PASS: no product statistics are added; dates and EUR25 come from the owner.
- R-18 PASS: there are no testimonial or invented identity sections.
- R-23 PASS: prior explicit image-generation authorization covers the new context map; sources are recorded, and personal content remains visibly bracketed.
- R-24 PASS: all six retained chapter IDs and native actions resolve; current navigation and complete reverse replay pass.
- R-25 PASS: all 643 native and 264 actual-scene contrast samples pass their thresholds; the map uses dark ink on paper/blush stock.
- R-26 PASS: every affected map/day/photo/editor control performs its action in both engines; existing note, cats, music and gift actions also pass.
- R-27 PASS: blank memories and voucher retain honest empty states; existing image failure, asset-loading and copy failure handling is retained.
- R-28 PASS: no FAQ is introduced.
- R-32 PASS: native controls and visible rose focus styles are retained; current dialogs close with Escape, while unchanged Tab/Enter/heading-focus behavior retains V21 evidence.
- R-33 PASS: application source, styles, SVG and documentation use apply_patch; only derived image encoding and QA artifacts use external tooling.
- R-34 PASS: the existing single light theme is retained; no incomplete alternate theme is introduced.
- R-35 PASS: the running app passes 204 current behavior/fit checks and a complete physical-book recording; unchanged ancillary controls retain the earlier recorded baseline.
- R-36 PASS: no fabricated security, performance or compliance claim is added; physical-phone verification is explicitly unclaimed.
- R-37 PASS: DESIGN.md records the established scrapbook direction and V24 interpretation; dials remain ENERGY/RHYTHM/MOTION 3/3/3 and Taste 8/9/4.
- R-38 PASS: the map uses sourced geography and the itinerary uses the owner's confirmed plan; no future memory or souvenir is invented.
- R-01 PASS: existing edge feedback identifies selectable keepsakes; no new ambient gradient or glow is added.
- R-04 PASS: retained action icons keep their existing purpose; the map's north arrow identifies orientation.
- R-06 PASS: local Fraunces and Source Sans 3 retain their documented printed-keepsake/readability roles; the map uses Source Sans 3 too.
- R-07 PASS: existing linen and laid-paper texture describe the physical book; no decorative grid is introduced.
- R-08 PASS: the new Luxembourg-to-Trier arrow communicates the confirmed 24 October sequence, rather than decorating a CTA.
- R-09 PASS: no capsule badge or repeated headline pill is added.
- R-10 PASS: no glass layer is added.
- R-12 PASS: the map and other shallow attachments retain the documented contact shadows of paper on a book.
- R-13 PASS: object contours stay scoped to existing selectable keepsakes, unchanged from V22.
- R-14 PASS: four dated fragments remain one meaningful contact sheet, while the other leaves retain distinct physical compositions.
- R-19 PASS: the cover hinge, page curl and complete reverse motion remain on the same established clock; no template entrance animation is added.
- R-22 PASS: the new visual is the actual Luxembourg country outline and Trier reference, with recorded provenance.
- Liveliness dials PASS: explicit ENERGY/RHYTHM/MOTION 3/3/3 and Taste 8/9/4 remain in DESIGN.md.
- Liveliness consistency PASS: the recorded reader preserves expressive physical motion and the concise six-page path.
- Liveliness focal point PASS: cover dedication, geographic map, contact sheet, mounted photo, folded note and birthday pocket each lead their own page.
- Liveliness whitespace PASS: current fit checks and reviewed screenshots retain readable paper margins and separate print from navigation.
- Liveliness accent PASS: rose remains the action colour, while sage stays confined to the bookmark and photo tape.
- Liveliness identity PASS: pink cloth, warm paper, printed serif and attached keepsakes carry the same material motif across the book.
- Liveliness Design Read PASS: the established brief and specific V24 interpretation are recorded in DESIGN.md.
- C-1 PASS: the country map and shorter place labels serve the newly confirmed trip, with reasons documented in DESIGN.md.
- C-2 PASS: all affected controls have verified behavior in trip-checks.json; none is decorative click bait.
- C-3 PASS: each of the six existing pages keeps its narrative role; no filler page is added.
- C-4 PASS: phone heights, both engines, reduced motion, graphics fallback, Escape and saved owner data pass the current checks; unchanged keyboard/resize logic retains earlier evidence.
- C-5 PASS: there are no new testimonial, statistic or invented personal-memory claims.
- R-05 PASS: the six distinct material compositions remain; no marketing template is introduced.
- R-11 PASS: paper objects and squared navigation retain their existing, purposeful corner treatments.
- R-15 PASS: controls keep concrete labels such as Open the book, dated photo entries, Open your gift and Read from the cover.
- R-16 PASS: no AI marketing language is added.
- R-20 PASS: the geography, four dates and locations, five named cats and birthday ending identify this specific keepsake; unknown personal memories stay placeholders.
- R-21 PASS: the user-selected pink-first light theme remains.
- R-29 PASS: V23's approved material roles remain unchanged; the new map uses those same paper, blush, rose and ink colours.
- R-30 PASS: the existing physical scrapbook composition is retained; the source map is original formatting of credited geography.
- R-31 PASS: geography, photo order, labels, typography, retained motion and material roles each have written reasons in DESIGN.md and the asset provenance.

---

# Historical V23 validation: selected Pink + Sage palette

18 October2026. Applies option B selected from the revised pink-primary research. Main roles match that review: rose-quartz cloth#ECB4B9, blush stage#F6DFE5, rose actions#8E3A55, ivory paper#FFF4E6, sage#899A89 and ink#342C2E. Supporting tints supply lining, borders, muted print, hover and contact-sheet stock. Pink remains on the large coloured surfaces and controls. Sage is confined to the bookmark ribbon and photograph tape.

Native CSS and3D materials share these tokens. Rendered ink uses a deeper supporting shade to retain contrast under the lighting. Object selection uses paper-coloured edges and a rose halo from the same theme. Native/reduced-motion and the WebGL scene retain the same sage details. Fonts, compositions, source illustrations, five cats, all personal placeholders, gift amount and motion logic are unchanged. Shared dist/config.js is byte-identical to V22.

## Current evidence

Workspace evidence in qa/v23 is excluded from the publication archive.

| Evidence | Result | Scope |
| --- | --- | --- |
| palette-checks.json |94/94 PASS | WebKit375x667/548/520 and Chromium375x667; selected six roles match the independent review, six-page path, print fit, no horizontal overflow, original map/photo/note/cats/music/gift actions, selection cancellation, native sage tape, hidden fallback curl, reduced-motion reader, rose focus and owner form |
| native-contrast.json |577/577 PASS | Reader, affected dialogs, reduced-motion pages, owner form and gift; text/input/placeholder/button/boundary pairs meet their respective thresholds |
| scene-contrast.json |272/272 PASS | Paired ink/no-ink captures of the actual lit print in Chromium667 and WebKit667/548/520 atDPR2; all core regions pass, minimum4.567:1 |
| interaction-final.webm / pink-sage-preview.mp4 |PASS | Complete recorded WebKit375x667 opening, object feedback, all forward pages, cats/gift dialogs and complete reverse closing;85.20second preview retains software timing with preparation trimmed |
| cover-final.png / motion-sheet.jpg / closing-sheet.jpg / closed-final.png |PASS | Reviewed pink cloth and stage, small sage accents, warm paper, gift and complete return to cover |
| source checks |PASS | JS syntax and git diff --check; config, story, fonts, book-engine and input-feedback logic unchanged |

The raw-pointer QA fixture originally sent input immediately after a programmatic seek while scroll/focus restoration was still pending. It now lets the frame settle before sending that synthetic event. The completed94-check run passes on the final application source; no animation/input changes were needed.

The theme changes no geometry or pagination. Current fit checks and the recorded actual journey pass; V22's full feedback and projected-bounds evidence remains below as baseline. Actual names, photographs, memories, songs and purchased Amazon.de code remain the requested placeholders. EUR25 and the2November birthday remain. Access is preserved in full.

## Current Antislop delivery gate

The selected direction and material roles are in DESIGN.md V23. Antislop during and Taste8/9/4 remain the explicit session direction. Each current PASS below has source, visual or check evidence.

- R-02 PASS: visible strings are unchanged and add no em dash.
- R-03 PASS: all three phone heights retain six pages, fit above navigation and have no horizontal overflow in94 current checks.
- R-17 PASS: selected hex values match the review; counts/contrast come from saved current results, dates and amount from the brief.
- R-18 PASS: no testimonials or fictional people introduced.
- R-23 PASS: user selected B; existing art/fonts and explicit personal placeholders are preserved.
- R-24 PASS: destinations unchanged; affected original dialogs are opened in the current matrix, unchanged navigation is recorded.
- R-25 PASS:577 native pairs and272 lit regions pass; rendered minimum4.567:1.
- R-26 PASS: current map/photo/note/cats/music/gift actions, reduced-motion gift, selection and owner form pass; no new controls.
- R-27 PASS: existing preparing, empty, image-error, clipboard and graphics fallback states remain; graphics fallback and native reader are exercised.
- R-28 PASS: no FAQ is present or needed.
- R-32 PASS: native buttons, keyboard focus and dialogs remain; rose focus passes, decorative copies stay inert/hidden.
- R-33 PASS: application, CSS and docs use apply_patch; QA response instrumentation only affects test captures.
- R-34 PASS: one selected light scrapbook theme; no toggle or alternative theme shipped.
- R-35 PASS: current source run in Chromium/WebKit, affected controls clicked, complete journey recorded and reviewed before packaging.
- R-36 PASS: measurements are identified as browser/contrast evidence; no hardware FPS or security claims.
- R-37 PASS: selected B is explicit user direction; its six roles and small-accent limit are recorded in DESIGN.md.
- R-38 PASS: no route, receipt, personal photo, memory or voucher code fabricated.
- R-01 PASS: existing gradients describe physical seams/shadows; selection halo has a stated action purpose.
- R-04 PASS: existing functional Phosphor icons remain, no ornamental icons added.
- R-06 PASS: justified local Fraunces/Source Sans3 system unchanged.
- R-07 PASS: existing cloth and paper textures represent materials; no decorative grid added.
- R-08 PASS: existing functional navigation/replay arrows remain.
- R-09 PASS: no badges, capsules or status labels added.
- R-10 PASS: no glass surfaces.
- R-12 PASS: shadows remain attached to physical paper/book pieces and temporary selection lift.
- R-13 PASS: halo is confined to the selected keepsake, never an idle effect.
- R-14 PASS: five distinct interior compositions remain.
- R-19 PASS: cover, curl, gift and selection motion logic unchanged; still at rest.
- R-22 PASS: approved five-cat/geographic art remains, no generic illustration added.
- L-1 PASS: ENERGY3 / RHYTHM3 / MOTION3 and Taste8/9/4 remain explicit.
- L-2 PASS: distinct cover/map/contact/photo/note/envelope views are reviewed in current captures.
- L-3 PASS: existing recipient, geography, dated print, photo, note and gift focal hierarchy remains.
- L-4 PASS: unchanged margins and page proportions retain current fit checks.
- L-5 PASS: pink defines large surfaces/actions, sage is a small deliberate material accent.
- L-6 PASS: cloth, sewn label, warm paper, stickers and binding retain the scrapbook identity.
- L-7 PASS: design read declared before edits and recorded in DESIGN.md.
- C-1 PASS: palette is user-selected; each material and action role has a written purpose.
- C-2 PASS:94 current checks plus existing functional baselines; no new dead controls.
- C-3 PASS: no new sections or copy filler.
- C-4 PASS: three phone heights, two engines, reduced motion, native fallback, owner form and focus pass.
- C-5 PASS: real brief facts, bracketed personal content, source colours and measured results are distinguished.
- R-05 PASS: existing varied physical page rhythm remains.
- R-11 PASS: paper edges, small binding bevels and practical controls retain their existing corners.
- R-15 PASS: action labels are unchanged and describe the actual behavior.
- R-16 PASS: no marketing copy or AI buzzwords added.
- R-20 PASS: recipient-led cover, supplied Trier dates, five cats and birthday ending remain specific to this gift.
- R-21 PASS: user-selected pink-primary light theme applied to every main surface.
- R-29 PASS: three pink values for hierarchy, warm neutral paper/ink, sage as the only new accent hue.
- R-30 PASS: original scrapbook compositions remain; palette reference is adapted to material roles.
- R-31 PASS: every changed colour/material role is explained in DESIGN.md and the research artifacts.

This is software-rendered Playwright verification, not a physical-iPhone Safari or hardware-FPS test. No personalisation, purchased code or recipient sharing changes are included. Publication verifies immutable source/archive equality and the complete existing access policy.

---

# Historical V22 validation: tactile object feedback

17 October2026. Implements the user's request for an Apple Photos-like subject highlight on clickable keepsakes. Touching an object gives it a brief warm-white contour, a restrained rose edge and a small lift. The cat contours follow the illustration's alpha channel. Mouse hover and keyboard focus have equivalent feedback; moving, scrolling, opening a dialog, changing pages, resizing or leaving the window clears it. Native actions retain their original timing and semantics.

The map, four dated photo frames, photograph, folded note, five cats, soundtrack slip and gift pocket participate. Keyboard focus reaches the cats as one native button and outlines the whole family. The decorative receipt and cover receive no false selection affordance. Native fallback retains the effect; reduced motion retains a static contour without a lift. No artwork, fonts, personal content or shared configuration changed.

Also fixes a WebKit graphics-fallback rendering bug found by the pixel checks: a visible child inside the visibility-hidden decorative curl could cover the live page. The entire curl is now hidden from painting at rest and restored during a turn. Feedback classes are stripped from decorative/raster copies. Idle selection resets cause no additional scene draws, and feedback stops requesting frames once settled.

## Current evidence

Workspace artifacts are in qa/v22 and excluded from publication.

| Evidence | Result | Scope |
| --- | --- | --- |
| feedback-checks.json |326/326 PASS | WebKit375x667/548/520 and Chromium375x667;42 individual object selections checked by changed scene pixels, exclusive selection, identical resting print after cancellation, idle rendering, original dialog actions, keyboard, hover, release, scroll, rapid switching, reduced motion and graphics fallback |
| input-checks.json |11/11 PASS | Both engines: repeated empty resets add no renders, viewport rebuild clears selection, fallback curl copies contain no highlight; Chromium CDP touchStart/move/end selects the note, then cancels on a real input swipe without opening a dialog |
| geometry.json |141/141 PASS | WebKit375x667/548/520; cover opening, page-turn projected bounds and all five resting-page fits retain their header/navigation clearance |
| native-feedback-checks.json |10/10 PASS | Extra direct reproduction/recheck of the corrected fallback: visible native cat contours and working dialogs in both engines, including reduced motion;1769/2608 changed pixels in fallback and623/655 in reduced motion |
| interaction-final.webm / interaction-preview.mp4 |PASS | Reviewed complete WebKit375x667 opening, physical object feedback, each forward turn, cats/gift dialogs, every reverse turn and cover closing;62.04second preview with preparation trimmed and original timing retained |
| motion-sheet.jpg / closing-sheet.jpg |PASS | Reviewed forward journey and complete reverse/closing sequence |
| syntax / diff / config |PASS | All edited JS parses, git diff --check passes, dist/config.js is byte-identical to V21 |

All15 scene keys are registered, including the keyboard family alias. The page count remains six. Current main-path controls and the new feedback have been clicked in both engines. Unchanged owner editing, sound, contents, upload/export/import, clipboard and redemption behavior retain the V21 evidence below. A superseded broad regression run was stopped after33 passing checks when the fallback bug was found; it is not claimed as a complete V22 regression run.

The resting type, palette, fonts and paragraph layout are unchanged from V21's504 native and272 rendered contrast checks below. The only changed native background is the selected gift pocket; its dark text measures8.971:1. Keyboard focus retains a3px berry outline. Contours stay at the object boundary and do not wash over the printed text.

## Current Antislop delivery gate

Design direction and purposes are in the V22 section of DESIGN.md. Antislop during remains the user's choice. Each line below is a current PASS, using the new evidence above and the explicitly unchanged baseline below.

- R-02 PASS: visible English strings add no em dash; source scan and diff reviewed.
- R-03 PASS:141 projected bounds/fit checks, three Safari phone heights, no horizontal overflow in the feedback matrix; original native targets retain their dimensions.
- R-17 PASS: dates, cats and EUR25 are supplied facts; selection distances/timing come directly from source; pixel counts come from captures.
- R-18 PASS: no testimonials or fictional people introduced.
- R-23 PASS: requested selection feedback uses existing approved images and runtime alpha; no new visual assets or invented memories.
- R-24 PASS: destinations are unchanged; all affected original dialogs are opened in the current matrix.
- R-25 PASS: unchanged resting print retains the measured V21 contrast baseline; selected gift text8.971:1, keyboard uses the existing berry outline.
- R-26 PASS: every affected control opens its original content; gift reveal, cats, notes, map, music and all dated photos pass.
- R-27 PASS: existing preparation, empty/image-error, clipboard and graphics fallback states remain; fallback is directly exercised.
- R-28 PASS: no FAQ is present or needed.
- R-32 PASS: real native buttons remain; Enter/Space, focus and Escape pass; decorative copies remain inert with no transient selection classes.
- R-33 PASS: application, CSS and documentation edits used apply_patch; QA and artifact commands do not rewrite application source.
- R-34 PASS: one existing light scrapbook theme, no added toggle.
- R-35 PASS: current browser matrix, actual touch input, complete recorded journey and visual review completed before publication.
- R-36 PASS: browser/pixel verification is identified as such; no hardware FPS, security or customer claims.
- R-37 PASS: requested Photos-like response is explicitly described in DESIGN.md; the approved dials remain.
- R-38 PASS: real supplied facts remain separate from the requested bracketed personal placeholders.
- R-01 PASS: the narrow contour halo identifies the actively touched/focused object; no idle decorative glow.
- R-04 PASS: the existing Phosphor icons remain; no new ornamental icons.
- R-06 PASS: the justified local Fraunces/Source Sans3 print system is unchanged.
- R-07 PASS: existing cloth/paper material textures remain, no decorative grid added.
- R-08 PASS: existing functional navigation/replay arrows remain, no new arrows.
- R-09 PASS: no badges or capsules added.
- R-10 PASS: no glass surfaces.
- R-12 PASS: lift is confined to the selected attachment; native shadows support that physical response, not a new card system.
- R-13 PASS: edge light occurs only on the selected keepsake and clears on input/navigation changes.
- R-14 PASS: the five approved page compositions remain; individual prints retain one contact-sheet backing.
- R-19 PASS: feedback has one short edge sweep and a settling response; no idle loop, no captured scroll gesture.
- R-22 PASS: existing five-cat and geographic images remain, no generic illustration introduced.
- L-1 PASS: ENERGY3 / RHYTHM3 / MOTION3 and Taste8/9/4 remain explicit.
- L-2 PASS: distinct map/contact/photo/note/envelope rhythms survive the recorded journey.
- L-3 PASS: selection emphasizes the object the user is touching; no second focal overlay.
- L-4 PASS: margins and reading flow are unchanged;141 fit/bounds checks pass.
- L-5 PASS: the existing pink/berry palette governs the temporary selection response.
- L-6 PASS: attached paper, stickers, cloth and binding remain the identity motif.
- L-7 PASS: design read was declared before implementation and is recorded in DESIGN.md.
- C-1 PASS: contour, silhouette mask, lift and short lifetime each have a written interaction purpose.
- C-2 PASS:326 feedback/action checks and11 input checks pass; no new dead controls.
- C-3 PASS: no sections were added; the response belongs to existing meaningful keepsakes.
- C-4 PASS: mouse, touch, keyboard, three phone heights, reduced motion, resize and graphics fallback pass.
- C-5 PASS: personal placeholders remain honest; all new quantitative claims have source/capture evidence.
- R-05 PASS: the existing varied physical page rhythm remains.
- R-11 PASS: paper edges, small binding bevels and practical controls retain their existing corner system.
- R-15 PASS: existing action labels still name the actual action.
- R-16 PASS: no generated marketing copy added.
- R-20 PASS: Trier, the four dates, five named cats and recipient-led cover remain specific to this gift.
- R-21 PASS: the approved light pink/paper direction remains.
- R-29 PASS: warm white and a restrained rose selection edge extend the existing materials for a stated action purpose.
- R-30 PASS: only the requested interaction references Photos; the scrapbook layout and content remain their own design.
- R-31 PASS: every changed visual/motion decision has its reason in DESIGN.md.

Browser checks use software-rendered Playwright Chromium/WebKit; physical-iPhone Safari and hardware FPS remain unverified. The full video preserves the software timing rather than claiming hardware smoothness. Personal content stays in placeholder mode. Recipient access remains deferred; publication must preserve the complete current access policy and exact source/archive bytes.

---

# Historical V21 validation: a personal printed keepsake

17 October 2026. Implements the six approved review recommendations: warmer typography, a recipient-led cover, five distinct interior compositions, differentiated physical materials, Trier/personal detail, and clearer physical motion. English placeholders, all five cats, the21-24 October dates, the2 November2026 birthday and the final Amazon.de EUR25 coupon remain. The shared config is unchanged.

## What changed

- Local Fraunces upright500 replaces the repeated delicate serif/italic treatment. Local Source Sans3 supplies captions, annotations and controls. The Fraunces print cut fixes optical size36, softness35 and wonk0, avoiding a DOM/Canvas variation-axis mismatch. Required faces load before pagination, including after an owner saves a name with European characters.
- The sewn cover label leads with the recipient. Birthday and trip dates become secondary print on rose cloth. The small label captions use ordinary tracking and a larger readable size. Long names receive a deliberate smaller setting rather than clipping.
- The five interiors are a factual Trier map and empty keepsake slip, a single dark photographic contact sheet, a proper large photo mount, a folded note with five individual named cat stickers and a song slip, and a birthday note above a small gift envelope.
- The map uses actual OSM Mosel/street geometry and the factual Porta Nigra/Hauptmarkt positions. It contains attribution and the map dialog provides a readable source link. It does not invent a route or a visit. Existing photos, memories, names and the purchased gift code remain explicit placeholders.
- Physical pieces use different thicknesses and roughness. The continuous native/scene surfaces retain the same printed layout. A newly found raster bug was fixed: chapter-specific styles now survive print cloning, so small photo/note captions do not become large headings and shift their touch targets.
- The rigid cover follows its full hinge arc with a slower opening. Flexible sheets retain their binding-based curl, with a10% mobile scale adjustment and12px of mid-turn vertical clearance. The first clearance candidate grazed the header at the short sizes; the corrected version passes the projected bounds below. Resize continuation, input cancellation, full reverse replay and the single-sheet fallback remain.
- Startup no longer requests the unused single-cat, flower or old city illustration:1,108,624bytes of unnecessary artwork. The used map is a1000x650 WebP; its editable SVG is retained. Startup request evidence confirms the map and cat family load and the old three assets do not.

## Current evidence

All files below are in qa/v21. QA files are workspace artifacts, excluded from publication.

| Evidence | Result | Scope |
| --- | --- | --- |
| checks.json |180/180 PASS | Chromium/WebKit375x667 and375x548; opening, pages, every dated photo, dialogs, gift lift/interruption, complete replay, rapid controls, keyboard, owner save/export/import, reduced motion |
| native-contrast.json |504/504 PASS | Native text, buttons, inputs, placeholders and boundaries across reader, dialogs and owner form |
| geometry.json |141/141 PASS | WebKit375x667/548/520;21 opening poses,21 turn poses and five resting pages per size; no paper crossing the header or navigation clearance |
| design-checks.json |102/102 PASS | All five raster/native interiors retain matching fonts, dimensions and offsets; six default pages at all three phone heights; folded-note dialog, map credit, European/long names, delayed font loading |
| final-cover-names.json |4/4 PASS | Recheck after final cover-caption refinement; European characters and long recipient labels |
| reader-checks.json |50/50 PASS | WebKit667/548/520 and Chromium667: actual opening/turn framing, manual-release settling, EUR25 visible on arrival, gift/sign-off clearance,44px replay target, full reverse motion, one-sheet fallback,480px native gift access |
| continuity.json |14/14 PASS | Both engines: opening, Next, replay and pending gift callbacks survive resize; Escape cancels continuation; manual release still settles; no JS errors |
| extra-checks.json |61/61 PASS | Sound on/off, six Contents links, brand/skip, photo upload/remove, restore-and-save, isolated dummy-code copy and real Amazon.de URL;320x568,390x844,768x1024,1440x900 and667x375 fit checks |
| scene-contrast.json |272/272 PASS | Lit print regions in both engines at375x667/548 andDPR2; dark print and white contact-sheet captions; minimum core contrast5.127:1 |
| startup-requests.json |PASS | Correct new fonts, used map and cat family requested; no unused cat/flower/old Trier art requests |
| reader-final.webm / reader-preview.mp4 |PASS | Actual WebKit375x667 opening, every forward turn, gift dialog and complete reverse journey; original timing, preparation trimmed only |

Native minimum ratios: text6.383:1, buttons6.731:1, input text15.615:1, placeholders7.669:1, input boundaries4.188:1. Text meets4.5:1; boundaries exceed3:1. The contrast suite measures rendered ink against paired no-ink captures, including white text on the contact sheet. Geographic map labels use dark ink on ivory/rose and are also available at larger size in the dialog.

The main phone path remains six pages. At375px width the paper remains335x469 across667,548 and520px viewport heights. Smaller or substantially filled content can paginate without clipping. Below500px height and with reduced motion, ordinary native reading retains the gift and replay.

## Recorded controls

- Open the book -> intermediate hinge poses -> readable Trier page.
- Next/Previous, rapid direction changes -> readable destination; keyboard navigation -> focused heading.
- Contents, all six entries -> corresponding section; brand -> cover; skip -> focused note.
- Four dated fragments -> the matching day; photo mount -> photographs/empty state; map -> notes and linked OSM credit.
- Folded note -> complete note/explicit placeholder; five cats -> named illustrations and correct coat descriptions; soundtrack -> the four supplied artists and notes/empty state.
- Gift -> card lifts before dialog; interrupted reveal -> no delayed dialog. Empty code -> honest placeholder. An isolated dummy code -> exact clipboard call; redemption href -> https://www.amazon.de/gc/redeem. No real code was purchased or redeemed during QA.
- Read from the cover -> all four reverse sheet turns and the full closing arc -> cover.
- Sound -> on/off state. Owner menu -> save, cancel/close, export, import, upload, remove, restore draft, save restored placeholders and clean reader preview. Test data remains inside isolated browser contexts.
- Graphics loss -> one complete hinged CSS sheet. Short viewport/reduced motion -> native pages with working gift/replay.
- Resize during opening/turn/replay/gift -> prepared scene -> remaining movement/callback. New input -> deferred motion cancelled.

## Antislop delivery gate

The approved design direction is recorded in DESIGN.md. Antislop during is the explicit session choice. Each line below is a current PASS with evidence, rather than a claim that a technique is forbidden in every context.

### Hard gate

- R-02 PASS: generated visible strings in index, story and app contain no em dash; source scan completed.
- R-03 PASS: geometry141/141, design102/102 and extra width checks; phone controls and replay retain44px physical targets in reader checks.
- R-17 PASS: dates, five cats and EUR25 come from the brief; download bytes come from file sizes and request evidence. No invented metrics.
- R-18 PASS: no testimonials or fictional people.
- R-23 PASS: the user approved all six review recommendations; new assets are licensed fonts and sourced geography. Personal photographs, memories, names and code stay explicit placeholders.
- R-24 PASS: all six Contents destinations, brand and skip clicked in extra checks; no absent sections.
- R-25 PASS:504 native pairs and272 lit regions pass; minimum rendered core5.127:1.
- R-26 PASS: control-by-control results above,180 core checks and61 extras; the new folded note is also clicked in design checks.
- R-27 PASS: preparing message, explicit empty photo/note/song/code states, image-error copy and clipboard fallback exist; image preparation/removal and graphics fallback exercised.
- R-28 PASS: no FAQ is present or needed.
- R-32 PASS: core keyboard navigation/focus, native modal Escape and extra skip-link focus pass. Decorative print copies are inert and hidden from accessibility.
- R-33 PASS: application, stylesheet and document changes used apply_patch. QA instrumentation modifies served test responses only; it does not rewrite application files.
- R-34 PASS: one light scrapbook theme; no theme toggle or second theme is shipped.
- R-35 PASS: current app run in Chromium/WebKit, recorded full click-through and motion; control results and evidence files are listed above. Syntax and diff checks completed before packaging.
- R-36 PASS: no security, customer or hardware-performance claims. Byte removal is measured; software recording is not a hardware FPS benchmark.
- R-37 PASS: the six review recommendations were explicitly approved; V21 design read, purposes and dials are in DESIGN.md.
- R-38 PASS: real supplied dates/interests and factual map data are distinguished from bracketed personal content; no invented itinerary, ticket, receipt or couple photo.

### Purpose gate

- R-01 PASS: only physical seam, page-gutter and contact-shadow gradients; no ambient decorative glow. Purposes in DESIGN.md.
- R-04 PASS: the existing Phosphor family carries navigation, music, dialog and editing actions; no decorative sparkle icons or emoji.
- R-06 PASS: Fraunces is explicitly justified by warm printed-book shapes, with fixed axes for print fidelity. Source Sans3 is for small practical copy. No handwriting-font default or repeated italic headline formula.
- R-07 PASS: cloth and paper textures represent materials; no decorative website grid or blueprint.
- R-08 PASS: arrows indicate page movement, replay or a gift action; no repeated ornamental arrows.
- R-09 PASS: no status/marketing badges or headline pill. The sewn name label identifies the gift's recipient.
- R-10 PASS: no glass surfaces.
- R-12 PASS: shallow shadows belong to attached paper and the bound object; no floating UI-card shadow system.
- R-13 PASS: no decorative glows.
- R-14 PASS: four frames form one dated photographic contact sheet; five distinct interior compositions replace repeated card layouts.
- R-19 PASS: motion serves cover opening, sheet turning, gift reveal and reversible navigation. Reading is still; no idle loops.
- R-22 PASS: five cats match the supplied descriptions, with Minnie based on the reference. The new map is sourced geographic context.

### Liveliness

- L-1 PASS: ENERGY3 / RHYTHM3 / MOTION3 and Taste8/9/4 explicitly recorded.
- L-2 PASS: distinct map, contact-sheet, photograph, folded-note/sticker and envelope compositions shown in final captures.
- L-3 PASS: one focal object per page; recipient on cover, geography, dated photographs, hero photograph, note, birthday message.
- L-4 PASS: margins separate attached objects and annotations; the default topics fit their physical pages together.
- L-5 PASS: berry is the deliberate binding/action accent within the supplied pink/paper palette.
- L-6 PASS: sewn-label bookbinding, quiet upright print and attached keepsakes form the identity motif.
- L-7 PASS: design read declared before implementation and recorded in DESIGN.md.

### Craftsmanship and quality locks

- C-1 PASS: typography, layout, materials and movement each have a written content/identity reason in DESIGN.md.
- C-2 PASS:180 core,102 design and61 extra checks include real control results.
- C-3 PASS: five interior jobs follow the actual four-day recap, personal note and birthday gift.
- C-4 PASS: tested mobile, tablet, desktop, native/reduced-motion, long-name, delayed-font, resize and fallback states pass. Hardware limit remains below.
- C-5 PASS: map sources, supplied personal facts, explicit placeholders and measured verification results are separated.
- R-05 PASS: page rhythm varies by the content, as shown in the final five interior captures.
- R-11 PASS: paper uses square cut edges, cloth board uses small binding bevels, controls use restrained corners; no all-pill system.
- R-15 PASS: action labels name their actual behavior, including opening, reading, music, copying and returning to the cover.
- R-16 PASS: no generated marketing superlatives or AI buzzwords in product copy.
- R-20 PASS: Trier geometry, the four dates, five named cats and personal dedication carry this scrapbook's identity.
- R-21 PASS: the approved light paper/pink cloth direction remains.
- R-29 PASS: supplied pink, paper and berry tokens remain; the darker contact-sheet stock is a physical object within the light page.
- R-30 PASS: composition follows a bound keepsake, without cloning a product-site template.
- R-31 PASS: every major decision is explained in V21 of DESIGN.md; licensed asset sources are in dist/assets/ASSET-CREDITS.md.

The UI and Taste checklists also pass in their relevant scope: one theme, consistent accent/corners, purposeful serif choice, no invented claims or imagery, working navigation, appropriate image slots, intentional motion and varied compositions. This is a personal place-focused scrapbook, so location/date print and the existing scroll-opening cue have a direct purpose.

## Limits and publication checks

Browser verification uses Playwright Chromium and WebKit, including actual input and software-rendered motion. It is not a physical-iPhone Safari or hardware-FPS test. Moving Chromium screenshots retain the previously documented compositor-capture limitation; settled captures and WebKit motion are the visual reference.

Published content still contains the requested personal placeholders. No recipient access or sharing changes are part of this update. Source/asset syntax, unchanged config, archive/HEAD equality and the preserved owner-only access policy are checked during packaging/publication.
