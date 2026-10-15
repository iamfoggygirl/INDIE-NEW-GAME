# Levels (commercial pass)

Goal: a Candy Crush style ladder of short, repeatable levels that feeds ad breaks.

- Levels 1-7: hand-made lessons (litter, crabs, wind bags, gulls, tourists, stream, big hatch).
- Level 8 onward: endless seeded generator (`levelSpec(i)` in `game.js`). Same level number always gives the same layout, so retries are fair.
- Every 5th level is an easy breather, every 10th a busy night, every 25th a big hatch.
- Difficulty curve: `D = 1.6 + 0.27 * k` (k = levels after the intro), capped at 11, with random wobble.
- Pass = save at least 70 percent. Stars: 1 pass, 2 for 80 percent or more, 3 for all.
- Progress (stars, unlocked level) is saved on the device (`shellrun.v1`). Test flag `?n=<level>` jumps to a level.
- Obstacles: litter blockers, tanglers, rocks, sandcastles (tap to smash), beach balls (tap to pop, they flip turtles), crabs (speed scales), gulls, tourists with flash, wind bags, stream with logs.
- Ad hooks (demo only for now): rewarded "bring back 3" on the result card, interstitial every 3rd win after level 4 (60 s minimum gap).
- Bot checks (levels 8-40): careful bot passes all, one-tap-per-0.7s bot passes all, idle bot fails.

## Moods and terrains (art sheets 16, 14, 12)
- Moods: moonlit night, dusk, dawn, rainy storm. Each sets sky, sea, fog, lights, sun/moon, stars, clouds and a far lighthouse (`shellrun/src/look.js`).
- Terrains: golden, coral, silver, volcanic sand. Chapters pick a terrain; generated levels pick a mood by seed.
- Storm: rain, lightning with thunder and haptics, wet shiny sand, trash washed ashore. Level 6 swells the stream too.
- Levels 1-7 now each show one new thing: trash, sandcastles, crabs, tangles + beach balls, gulls + tourists, rain + stream, big hatch.
- Title screen is a live attract loop. Level 1 opens with a short hatching cinematic and a guided first tap.

## Batch: pause, power-ups, shop, facts, hearts, variety
- Pause menu (button, Esc/P, auto-pause on tab hide) with sound and buzz toggles.
- Power-ups from level 3: Clean, Surge, Ranger. Charge ring fills with rescues; shop boosts are a demo.
- Did-you-know toasts, once each, from verified conservation sources.
- Hearts HUD: allowed losses = total - ceil(total*.7). Last heart pulses red with a heartbeat.
- Heart moments: helped turtles send thank-you hearts at the sea; combo of 3+ makes walkers hop; idle hatchlings look back.
- New obstacles: umbrella (fold), hole (traps, fill in). Crabs can burrow up from the sand near prey.
- Mid-level events (trip, crabs, gust, balls, gull, tourist, hole, trash) and per-level flavours (Rush hour, Crab party, Litterbug, Gusty, Birds and flashes).
- Lore: "We can't control the turtles. We can clear what people left behind." (title, level 1 caption, pause card).
