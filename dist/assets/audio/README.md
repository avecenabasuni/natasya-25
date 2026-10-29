# Recorded book-paper effects, V72

Source: [10 Book Page Flips](https://opengameart.org/content/10-book-page-flips) by [StarNinjas](https://opengameart.org/users/starninjas), published 8 March 2021. The author describes these as recordings of himself flipping a book's pages.

License: [Creative Commons CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/). The author appreciates credit; this file preserves the source credit. Download archive: [book_flips_-_starninjas.zip](https://opengameart.org/sites/default/files/book_flips_-_starninjas.zip).

Delivered excerpts:

- `paper-page.mp3`: source `book_flip.4.ogg`, 0.650159 seconds, 9,917 bytes. SHA256 `badc661667d36af9b86fdfee8fdc56f3217bec1b5acc60922a8a02abe9f9b7f5`.
- `paper-cover.mp3`: source `book_flip.5.ogg`, 0.870748 seconds, 13,209 bytes. SHA256 `c018dc80e257c4bacfee32320d395e0edf4c5e7f3ce72567da8a73594b28b78b`.

The cover uses a longer variation of the recorded page movement. It is not represented as a separately recorded book-cover hinge. Original pitch and complete event duration are retained. Delivery is mono 44.1 kHz MP3 at 112 kbps for Safari compatibility. Processing attenuates peaks, removes rumble below 90 Hz, rolls off above 8 kHz and applies a 15 ms entry fade plus 100 ms exit fade. No synthesized noise, added creak or artificial loop is mixed in. Both files are self-hosted with the website.

Runtime playback retains the complete decoded recording at rate 1. A short gain envelope softens its edges. Rapid replacement fades the previous voice before the new one begins. The strict introduction fetches and decodes both recordings in a silent OfflineAudioContext; it does not create a live-output context or play sound. Playback still needs a trusted gesture and reuses the prepared buffers. Failed or stale requests cannot block reading or replay a delayed effect.

V76 adds quieter opening cues for actual keepsakes: folded letters and the final envelope reuse `paper-cover.mp3` at gain .44, and maps, photographs, stickers, song papers and other notes reuse `paper-page.mp3` at .38. Existing book-cover/page gains remain .68/.62, with the shared master gain unchanged. Cues occur after actual reader-image readiness, once per open. Resize/reflow, closing, Contents and settings stay silent. Global mute and hidden/disposed guards apply; no new recording or license is introduced.
