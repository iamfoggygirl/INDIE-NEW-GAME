# Shell Run: launch push, build notes

## What changed
- **Chapter 1 is 10 hand-made levels**, each teaching one new idea:
  1. First hatch
  2. Sandcastle
  3. Crab beach (golden hatchling)
  4. Windy shore
  5. Big waves
  6. Gull cove
  7. Rainy season
  8. Foggy morning (beach chairs + fog)
  9. Lights out (beach lights)
  10. The Arribada
- **Lesson levels in later chapters** (`TEACH` in game.js); after its lesson, each idea joins the generator mix:
  - L12 Sunrise run (heat)
  - L14 Ghost nets (3 taps)
  - L16 Off the leash (dog)
  - L18 King tide (repeating waves)
  - L22 Tyre tracks (ruts)
  - L24 Full moon (glowing hatchlings, faster)
  - L26 Gale (wind, rain, spray)
- **New moods:** sunrise, fog, moon, gale. **New terrains:** volcanic, coral, dune. Chapter terrains are gold, coral, blush, volcanic, dune, and so on.
- **Waves:** a crest is visible on the sea first, then water rushes up the sand. It pushes walking and flipped turtles back (they tumble, and a big wave can flip one), then pulls back, leaving trash behind.
- **Boost economy:** level boosts come from the charge ring (earned by rescuing). In-play pickups drop from a ×4 combo or the golden hatchling, at most 2 per level with a 12 s cooldown, and fade after 6.5 s, so they can't be hoarded. Kinds:
  - Sun or Moon rush (speed)
  - Clean
  - Ranger
  - Flip guard (new)
- **Inventory boosts** now only come from chapter chests (+2), the shop, and rewarded ads. The daily login gift is now shells (5 + 5 per streak day, capped at 30).
- **Shells** are earned from new stars (2 each), the bonus goal (5, first time), the golden hatchling (3), the daily beach (8) and chapter chests (10). They are spent on the 8 Crew skins (30 to 400 shells).
- **Bonus goal** per level from L4. It is optional and never blocks passing. Possible goals:
  - Tidy
  - ×5 combo
  - Golden
  - No bites
  - No gull grabs
- **Field guide** collects every fact. **Daily beach** is a seeded level tuned to the player's progress. **Save code** moves progress between phones.
- **Map 2.0:** the trail follows authored templates per chapter, and each chapter has its own biome palette. It adds cliffs, shallows and foam, rivers with bridges between chapters, and hero landmarks such as the lighthouse, dock, reef, tower, boat, hut and falls. On scroll, clouds move with parallax and the foreground fronds lean, nodes pop in as they appear, and chapter changes tick. The map is **finite**: it shows the current chapter plus the next one, then a cloud bank teasing the following beach. Launch content is 100 levels (`LAST_LEVEL`).
- **Icons:** one glossy family. Gradients live in a single hidden `<svg>` defs block, so icons inside hidden elements never lose their fill.
- **Ads adapter** (`Ads.rewarded`, `Ads.interstitial`) and **analytics** (`track()`, a ring buffer in `localStorage['shellrun.log']`). Both forward to `window.ShellRunNative` if the native app provides it. Interstitials never run in the first two sessions, run at most once per 60 s, and appear after every third win from level 6.
- `?clean=1` hides the HUD for recording ad footage.
- `privacy.html` is a static page.

## Playable ad: "The Great Hatch"
- Built as `dist/playable.html` (generic HTML5, Meta and Google) and `dist/playable-mraid.html` (AppLovin, Unity, ironSource). Three.js is inlined and there are no network requests; the file is about 1 MB.
- Beats:
  1. Slow-motion hook: one flipped hatchling and a hand pointing at it.
  2. A few hatchlings and three pieces of trash.
  3. One clearly signalled gull dive, in slow motion.
  4. All three nests burst, with a golden hatchling and a small wave.
  5. Camera pulls back over the procession.
  6. End card: "You saved N!" and **Play Shell Run · Free**.
- The first hatchling keeps swimming out to sea, so it is still visible at the end.
- The store never opens on its own. `triggerAdCTA()` tries `mraid.open`, `FbPlayableAd.onCTAClick`, `ExitApi.exit` and `dapi.openStoreUrl`, then falls back to `window.open`. Store URLs are in `STORE` in `playable.js`; swap them for the App Store and Play links at launch.
- Funnel events: `ad_start`, `first_tap`, `stage:gull`, `stage:surge`, `ad_end`, `cta`.

## Facts to check with a conservation reviewer
- "swim frenzy for a day or more"
- ghost nets
- dogs
- tyre ruts
- lights-out ordinances
- king tides and nest relocation
- the existing "1 in 1,000" and "storms wash in trash" claims
