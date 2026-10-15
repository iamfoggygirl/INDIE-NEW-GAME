# Shell Run: design rules

Status: 2026-10-15 (v2). This replaces the sowing-game docs (kept in `docs/` as an archive). Current build: `shellrun/` (source in `shellrun/src`, built to `shellrun/dist/index.html` by `node shellrun/build.js`). Earlier toys: `turtle3d/` and `turtle/`. Art rules: `11-art-bible.md`.

One sentence: baby turtles hatch and head for the sea on their own; you clear their path and rescue them, and every turtle you save joins the next night's crossing.

## 1. The one rule that protects the game
**The core is one tap that helps a turtle.** Every feature must make that tap more meaningful, or it does not ship. Moyo's words: "the current simple gameplay is fine, I love it, I do not wanna ruin it."

Test for any new idea: can a 6-year-old and a 70-year-old both understand it from one screenshot with no words? If not, cut it or redesign it.

## 2. Why it works (the psychology, used honestly)
| Principle | Where it lives in Shell Run |
|---|---|
| **Care beats score** | The pieces are babies with faces, not tokens. People protect more than they compete |
| **Agency with autonomy** | Turtles walk on their own; you help, you don't steer. Watching them is the reward |
| **Variable, readable threats** | Trash (blocks), bags and rings (tangle), crabs (chase and flip), gulls (grab), tourist (lure), logs (sweep). Each has a different rhythm, so attention stays alive |
| **Stewardship, honestly** | Every piece of trash goes in the bin. The beach visibly gets cleaner (more flowers, less dune litter) based on what you actually binned. Trash you leave is still there tomorrow |
| **Every tap answers** | Sand puffs, wet sand squishes, water splashes, grass rustles, the sky twinkles, a walking turtle hops with a heart. No tap is dead |
| **Telegraphing (fairness)** | Every threat warns first: gull shadow + red ring 1.75 s before the grab, flip timer ring 5 s, tourist walks in slowly. Loss always feels like "I could have", never "that was cheap" |
| **Second chance drama** | Gull grab is not the end: tap to make it drop the turtle, then flip it back. Loss, rescue, relief in 3 seconds. This is the clip people share |
| **Goal gradient** | Turtles speed up near the water (the "rush"). The last 2 metres feel exciting |
| **Peak-end rule** | The last turtle: everything slows, the camera eases in, vignette. Then the result card with stars |
| **Endowed progress / stake** | Your saved turtles are your crew next night (shiny gold-plated shells). Losses shrink your crew, so every turtle matters later too |
| **Combo / flow** | Chained rescues within 2.6 s count up ("3 saves in a row!") with a rising musical pitch |
| **Hitstop + slow-mo** | 50 ms freeze on every tap that lands; 0.3x speed for 0.65 s when a gull grabs |
| **One new idea per night** | Rocks, crabs, gulls, tourist, stream, then the arribada finale |
| **Pentatonic feedback** | Each turtle reaching the sea plays the next note in a pentatonic scale, so a good night sounds like a melody |

## 3. Guardrails
1. Never "pay or this turtle dies". No ad or purchase during a rescue.
2. A skilled player can always save every turtle. Bots confirm this each build.
3. Rewarded ad after a night: bring back at most 3 lost turtles. It softens a bad night; it can't erase it.
4. Interstitials: between nights only, never before night 5, spaced out.
5. Kids will play this. No dark patterns, no fake timers, no loot boxes. Loss is gentle (the turtle spins away), never gory.
6. Biology is flavour, not homework. Real facts we use: hatchlings run for the sea at night, lights confuse them (the tourist flash), crabs and gulls are real predators, the arribada and predator swamping are real.

## 4. Feel spec (what every action must do)
| Action | Visual | Sound | Haptic |
|---|---|---|---|
| Tap trash | arcs into the bin, bin squashes, lid flaps, recycle symbol pops, pile rises | whoosh, then clunk (pitch climbs as the bin fills) | light, then triple |
| Free a tangled turtle | bag flies to the bin, turtle pops, sparkles, "Free!" | snap + rising chime | double |
| Tap rock | rock is kicked away with a hop, sand burst, small camera kick | low thud | medium |
| Tap crab | crab sprints off-screen | skitter click | light |
| Flip turtle back | turtle pops 45% bigger, sparkle burst, "Saved!" | rising two-note boing, pitch climbs with combo | double |
| Shoo diving gull | feathers burst | gull squawk | light |
| Make gull drop turtle | "Got it back!", turtle falls, flips, sand puff | squawk | double |
| Shoo tourist | "Sorry!", he runs off | "hey!" | triple |
| Turtle reaches sea | splash ring, "+1", counter bumps | next pentatonic note + surf | tick |
| Turtle lost | turtle spins and shrinks, lost counter bumps red | falling two-note | long |
| Gull grabs | slow-mo, camera shake | screech | triple |

Haptics need the native app on iPhone (Safari has no vibration). Android browsers vibrate now.

## 5. Progression
- **Season 1 (built, v2):** 7 nights, one new idea each: 1 trash + rocks, 2 crabs, 3 windy night (bags tangle), 4 gulls, 5 tourist, 6 stream with logs, 7 the arribada (20 new + your crew from 3 nests). Crew carries over: night N = survivors of N-1 + new hatchlings.
- **Trash carries over too:** pieces left on the sand (up to 6) are still there the next night. The result card says so.
- **Next (not built, needs playtests first):** bigger crossings (river, estuary, open-sea night), a beach that improves between seasons (volunteers, dimmed hotel lights, fences), adult turtles returning to nest after a few seasons (real natal homing).

## 6. Assets plan
- **Now:** every model, the world and all sound are made in code. Free, instant to change, no licence risk, no AI hallucination.
- **For launch polish (after the fun is proven with strangers):** one 3D artist or a licensed low-poly asset pack to restyle characters and the world in one consistent look; one sound designer for foley and a gentle score. Keep the code-built versions as the fallback.

## 7. Technology
- **Now:** Three.js (web 3D). Fastest loop: build, test with bots, publish a link, play on any phone.
- **Shipping:** wrap in Capacitor and build on a cloud Mac (see `02-no-mac-ios-pipeline.md`). Bundle Three.js so the game runs offline.
- **Unity:** the industry engine for 3D mobile games. Consider moving if we hit a performance or polish ceiling on iPhone 12. The game logic (plain JS) ports directly.

## 8. What proves it is right (not Moyo, not Claude)
1. **Screenshot test:** 10 strangers see one still frame with no words; 8+ must say what to do.
2. **Cold playtest:** 5 people play with zero explanation; watch where they hesitate. Target: first rescue in under 20 s, nobody asks "what do I do?".
3. **Retention:** soft launch gates from the original brief: D1 40%+, D7 15%+, D30 5%+.
4. **Bots each build:** careful bot saves everyone; idle bot loses a lot (proves the stake).

## 9. Open
- Name: "Shell Run" is a working title. Check App Store collisions before any public use.
- Real-world conservation partner (press, goodwill, Apple featuring). Never claim donations unless they are real and contracted.
