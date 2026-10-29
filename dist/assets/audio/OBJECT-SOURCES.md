# Material recordings for object reveals, V77

These are different recordings from the two book-page effects. All five sources are released under [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/). Source pages and public media were checked on 29 October 2026. The four Freesound deliveries use its publicly served MP3 preview of the CC0 recording, not an authenticated original download. All website playback is self-hosted.

| Delivered file | Physical sound and source | Source excerpt | Reader use |
| --- | --- | --- | --- |
| `object-peel.mp3` | [Sticky Note.mp3](https://freesound.org/people/Keegan_Miner/sounds/474580/) by Keegan_Miner, 13 June 2019. The author records peeling a sticky note and putting it on a table. | 1.44–1.88 s; the later table placement is excluded. | Cat stickers |
| `object-photo.mp3` | [55_Coger_Foto.wav (Sliding Paper)](https://freesound.org/people/Atrius1/sounds/470189/) by Atrius1, 16 May 2019. Paper slides over a wooden surface. | 0–0.370794 s | Photographs, the song paper and generic paper lifts |
| `object-unfold.mp3` | [opening_note](https://freesound.org/people/dalexgray/sounds/711853/) by dalexgray, 21 November 2023. A single piece of paper is unfolded near a microphone. | 1.26–2.00 s | Folded letter, birthday card and small notes |
| `object-map.mp3` | [Opening and Closing a Map Sounds](https://opengameart.org/content/opening-and-closing-a-map-sounds) by Spring Spring, 10 April 2023, file `snd_use_map.wav`. Produced by Julie Damsgaard / Spring Spring / Spring Enterprises, https://spring-enterprises.neocities.org. An actual map is opened. | 0.045–0.945 s | Journey map |
| `object-envelope.mp3` | [Opening and closing a letter](https://freesound.org/people/Aurelon/sounds/698199/) by Aurelon, 2 August 2023. Opening/unfolding a letter and returning it to its envelope. | 2.12–3.16 s | Final envelope |

Processing keeps original pitch and timing within each excerpt: mono 44.1 kHz, a 100 Hz high-pass and 9 kHz low-pass, peak normalization to -6 dBFS before encoding, 8 ms entry fade and 65 ms exit fade, then 112 kbps MP3. MP3 containers include encoder padding; runtime plays their full decoded excerpts. No synthetic noise, UI chime or repitched book-page clip is used.

| File | Bytes | SHA256 |
| --- | ---: | --- |
| `object-peel.mp3` | 6,992 | `86c1a8d5736a07c7ff2ab918da80416c36538d16cbb19949ad15c3b71a5357f0` |
| `object-photo.mp3` | 6,260 | `d5c221400e9f742aebbd2f007de70d44c45103f90ce9fd1f23b37d4e82e0e633` |
| `object-unfold.mp3` | 11,380 | `a0681c4987576e49743d002bcca58d8b10ba332138425dbf46cca695b24ac87f` |
| `object-map.mp3` | 13,574 | `c0f1a075d5b9b86fb60b7e32cd745e6c5889a1cac5ee03a98d4327daee57d969` |
| `object-envelope.mp3` | 15,403 | `5b4802a1d8eb11f223e9296f3f89eba0ea8d0d9777792994da4ec1ed3f9fd36a` |

The five additions total 53,609 bytes. All seven effects, including the unchanged book cover/page files, fetch and decode in the silent preparation gate before the cover appears. A missing or corrupt object recording blocks entry with Retry, just like any other required sound. Playback still requires a trusted gesture and respects global mute. Runtime uses one effect voice with soft replacement; resize/reflow, closing and menus do not add cues.
