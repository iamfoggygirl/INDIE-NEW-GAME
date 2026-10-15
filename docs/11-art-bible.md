# Shell Run: art bible

Status: 2026-10-15. Reference images live on Moyo's computer in `Downloads/newerrrrrr assets` (sheets 01-22, made with ChatGPT Astra). They are **targets only**. Nothing from them ships as an image: every model, texture and sound in the game is built in code (`shellrun/src`).

## Style lock (copied from STYLE-BIBLE.txt)
Chunky low-poly soft vinyl toy look. Rounded facets, matte, calm and friendly, never scary or gory. Readable at small sizes. No text inside the 3D world (pictograms only).

| Token | Hex | Used for |
|---|---|---|
| sand | `#E6CFA0` | dry beach |
| wet sand | `#B89B70` | band by the water |
| deep teal | `#0E5E70` | sea (mid) |
| sea foam | `#BFE8E0` | foam, splashes |
| night navy | `#12203A` | sky, UI frames, telegraph shadows |
| moon cream | `#FFF3C4` | moon, UI text, highlights |
| coral | `#E8664A` | crab, warnings, lost |
| turtle green | `#7DB05A` | primary buttons, saved |
| dark shell green | `#3E6B3A` | turtle shell |
| shell gold | `#E0B040` | crew shells, stars |
| litter blue | `#4FA3D9` | bottles, bin |
| warning red | `#D93A3A` | sign slash |

Lit colours are tuned a touch brighter in code (`PAL.skin = #8cc063`) so they read true under moonlight.

## Sheet to code map
| Sheet | What we matched | Where in code |
|---|---|---|
| 01 master turtle | head about 40% of body width, big black eyes with one highlight, 3 cream spots per flipper, faceted dark shell with plates, cream underside | `models.js` `turtleBody`, `GEO.tHead`, `flipper` |
| 02 crew skins | gold shell (crew). Other shells are future cosmetics | `turtleBody(true)` |
| 03 predators | coral crab with eye stalks and big claws, gull with navy wing tips and cheeky brows | `GEO.crabBody`, `claw`, `GEO.gull`, `gullWing` |
| 04 humans | tourist (straw hat, blue flowered shirt, backpack, phone), volunteer (blue cap, hi-vis vest, picker, sack) | `GEO.tourist`, `GEO.volunteer` |
| 05 litter | bottle, crushed can, cup, flip-flop (block the path); bag, six-pack rings, fishing line (tangle) | `GEO.litter` |
| 06 rocks | faceted grey rocks, some mossy | `rockGeo` |
| 08 dunes | dune grass, sea oats, clumps, palms | `world.js` vegetation |
| 09 nest | sand crater with raised rim, pebbles, sprouts, eggs that wobble before hatching | `GEO.nest`, `eggs` |
| 10 bin | blue recycling bin with cream recycle symbol, flipping lid, pile that rises, volunteer empties it | `makeBin` |
| 11 set dressing | crossed-footprint sign (no letters), rope fence, lanterns | `world.js` |
| 15 hero beach | sea and moon at the top, nests at the bottom, wet band, foam, moon glitter path | camera + curved world in `core.js` |
| 19 effects | sand burst, splash, sparkles, feathers, ripples, hearts, recycle pop | `burst3` (3D), `overlay()` (2D) |
| 20 telegraphs | red segmented target ring with arrows, gull silhouette shadow, 8-segment rescue timer, crab footprint arrow, phone flash cone | `overlay()`, `makeGull` silhouette, `GEO.flashCone` |
| 21 icons | turtle saved / lost, bin, stars, ad button, sound | `ICON` in `ui.js` (inline SVG) |
| 22 UI kit | navy frame, cream card, green primary, teal secondary, navy ghost, ribbon banners, stars over the card | `template.html` CSS |

## Rules that came out of building it
1. **Turtles walk away from the camera**, so their eyes sit high on the sides of the head and they glance back after a rescue or a boop. Faces must read from behind.
2. **Curved world:** far geometry bends down in the vertex shader so the horizon and moon show at the top without tilting the camera. Gameplay space is never curved.
3. **Threats enter from the visible edge.** Nothing teaches or attacks from off screen.
4. Everything repeated is instanced (turtles, grass, prints, particles, shadows). Budget: under 150 draw calls; current build is about 40.
5. No real-time shadows; soft blob shadows only.
