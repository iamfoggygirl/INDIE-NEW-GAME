# Shell Run: Sanctuary update (17 Oct 2026)

## What changed

**Turtle crowding**
- Hatchlings near each other now ease apart instead of being shoved. The push fades in with distance, the one behind gives way, and heading turns smoothly.
- Shells never sink into each other, even in a queue behind a rock.
- Measured on level 25 (29 turtles): heading jitter down about 60%, sudden heading snaps from 14 to 0, overlap about the same as before.

**Homepage**
- Typography follows the casual-game standard: a chunky rounded display face for anything you read at a glance (Fredoka, with Lilita One for marks), outlined like the in-game captions, and Nunito only inside panels. That is the same split top casual games use (custom logo lettering, a rounded display face, a readable body face).
- The lore lines now use the caption style.
- Three bands: logo, tagline, chips and lore; then the live beach; then location, Play and dock.
- The dock has 5 items, including Sanctuary.
- Living background: behind the fixed logo, the beach cross-fades every 6.8 s through real moods and beaches (dusk, night, sunrise, storm, moonlit volcanic, dawn coral, fog dune). It pauses when a panel is open or the tab is hidden, and is off with reduced motion.

**Swim Frenzy**
- The swimming hatchlings are the real 3D turtle (current skin), rendered once top-down into 10 stroke frames, with both front flippers stroking together like a real sea turtle.
- They swim as a loose school: sunflower spacing, their own drift, a different stroke rhythm each, and soft spacing between them.
- A clear goal: clear 10 pieces of plastic for a boost, and 20 for a second. The counter shows x/10 with a boost icon that lights up, and the banner says what you can win.
- Boosts are saved to `PROG.boosts`, and the result card explains how to use them. Shells are as before.
- The Skip button is a labelled glass "Skip »" pill.
- When it appears: after level 3 (first taste), then after every 5th level, on first clear.

**Boost clarity**
- `BOOST_INFO` holds a name and one line for each boost:
  - Beach clean
  - Moon or Sun rush
  - Ranger patrol
  - Flip guard
- The level card shows the level's boost and line, plus a "Bonus: Swim Frenzy" row when one follows.
- The first time each boost is ready, the caption explains it (`PROG.bseen`).
- The Field guide has a Boosts section.

**Sanctuary (new meta layer, `src/sanct.js`)**
- Five places built with shells, each in 3 tiers. Every tier changes the drawing.

| Place | Opens after level | Perk |
|---|---|---|
| Hatchery | 0 | Boosts start +12% charged per tier |
| Recycling depot | 2 | +1/2/3 shells per level passed (shown on the result card) |
| Volunteer hut | 5 | A volunteer bins the litter closest to the turtles every 26/21/16 s (helper mechanic from HAVEN) |
| Rescue centre | 9 | Flipped or tangled turtles hold on +20% per tier |
| Ranger tower | 14 | Boosts last +15% per tier |

- Costs: 30 / 80 / 160 per tier (1,350 shells for all of it, next to 1,260 for all skins).
- Where to find it: the homepage dock and the map dock (it replaces Crew there; Crew is one tap away inside the Sanctuary). A NEW badge shows when something is affordable.
- Perks are off in the playable ad and the title demo (`perk()`).

## Checked
- Level bots (good and lazy) on levels 1–10, 15, 20, 25, 30, 40 and 50: same pass results as before the update. The results are in the push notes.
- Old saves (no `sanct`/`bseen`) load fine.
- The playable ad loads with no errors.
- Screenshots at 390 and 320 px: home, map, level card, sanctuary, guide, swim, result.

## Not verified / for the reviewer
- Real-phone feel of the cross-fade and of the swim sprites. Headless swim runs at about 3 fps, so its pacing can only be judged on a phone.
- Conservation lines added for the reviewer:
  - "A fenced hatchery keeps nests safe until the eggs hatch."
  - "Volunteers walk the beach at dawn and pick up trash."
  - "Rescue teams care for turtles in trouble, then release them."
  - "Rangers watch nesting beaches through the night."
  - "Sea turtles stroke both front flippers together."
