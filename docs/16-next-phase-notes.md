# Shell Run: next phase, build notes (17 Oct 2026)

- **Logo:** the owner's stylised "Shell Run" logo.
  - Embedded once as base64 WebP (`shellrun/assets/logo.webp`, 42 KB) via `LOGO_SRC`.
  - Shown on the home screen, the loading screen, the playable ad's brand pill and the playable end card.
- **App icon:** the owner's turtle art. It is used as `icon-512`, `icon-192`, `apple-touch-icon` and `favicon-48`.
- **Map, full screen:** the map now fills the screen.
  - The top pills, chapter bar and bottom dock float over it as translucent glass.
  - The bottom end of the map now has the starting nest and a START sign, with room below Level 1. The scroll stops on the beach, never on an empty bar.
- **Win → map (Candy Crush style):** Continue sends a wave across the screen into the map. Tap anywhere to skip the whole sequence.
  1. The new stars fly into the level you just finished and the node glows.
  2. When a chapter ends, the clouds over the new beach part.
  3. The turtle walks the real trail, leaving flipper tracks.
  4. The next node pops, and its level card (name, hazard icon, best stars, Play) opens.
  Tapping any unlocked node also opens its level card.
- **Swim Frenzy (`src/swim.js`):** a 2D canvas bonus after the first clear of every 5th level.
  - **Who swims:** the saved hatchlings (3 to 12).
  - **Play:** tap plastic (bags, six-pack rings, bottles, balloons, ghost nets that take 3 taps) before the school swims into it. Jellyfish are food, and tapping one shows "That's food!".
  - **Tangles:** a tangled hatchling slows down. One tap frees it. After 9 s it washes back to the beach.
  - **Lesson:** the first time, a slow-motion hint appears on the first bag, with a 5 s fallback.
  - **Rewards:** +1 shell per 2 pieces cleared (maximum 6), plus 2 if nobody got tangled.
  - **Field guide:** the run unlocks the "Out at sea" entry.
  - **Rendering:** the 3D render pauses while it runs.
- **Facts to review:**
  - turtles mistake plastic bags for jellyfish
  - hatchlings shelter in floating seaweed (sargassum)
  - balloons as ocean litter
