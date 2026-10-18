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

## Launch polish (18 Oct 2026)

**Panels**
- Every panel always fits the screen: the card is capped at the viewport height and its inside scrolls, with one scroll area and no nested lists.
- The main buttons stick to the bottom of the card.
- Every panel closes four ways: the red X (top right), a tap outside the card, Escape, or its own Back/Done button. All of them run the panel's own close logic. The result cards stay without an X on purpose.
- The level card also has an X.

**Field guide is now the help centre**
- Four tabs: Basics, Boosts, Sanctuary, Notes.
- Basics teaches the six things to know. Sanctuary shows every place and its perk, and links straight to it.
- Notes keeps the "???" entries for facts not found yet.
- Settings has a "How to play" button that opens Basics.

**Sanctuary onboarding**
- A 3-step explainer appears the first time (earn shells, build, it helps every level). The "?" button brings it back.
- The map shows a "Build here!" bubble on the Sanctuary button the first time something is affordable.

**Surprises (not seeded)**
- From level 4 on, 80% of non-teaching plays get one surprise at a random point (30–78% of the level), drawn only from things that level already has: a lucky boost on the sand, a gust, washed-up trash, a stumble, a crab alert, a gull, a beach ball, a tourist, or a new hole (level 10 and up).
- The same level never plays exactly the same twice.

**Checked**
- Every panel opens and closes by X, backdrop and Escape.
- Pause X resumes play.
- Settings → How to play, and Guide → Sanctuary, both work.
- Fresh-player onboarding through level 1 → map → level 2 card.
- Panels fit at 390×844, 375×667 and 320×568.

## Phone fixes (18 Oct, from the owner's iPhone screenshots)

**Panel fixes**
- Panel titles were cut off on iOS because the scrolling area painted over the ribbon. The ribbon now sits on top.
- Removed the sticky bottom buttons, which covered the Hatchery details and the Shop's last offer.
- The Sanctuary fits a phone without scrolling: a smaller island, a Crew shortcut next to the shells, and X to close.
- The Shop drops its duplicate Back button (X and a tap outside close it).
- Win and fail cards hide the field note on short screens, so every button shows.

**Map fixes**
- The NEW badge on the map's Sanctuary button was clipped by the blurred glass dock (iOS clips children of blurred elements). It is now a red dot inside the button.
- The "Build in your Sanctuary!" bubble now sits outside the dock.

**Bonus rounds on the map**
- A round wave bubble marked "Bonus" sits beside every level that has a Swim Frenzy (3, 5, 10, 15 …). It is locked until that level is cleared.
- The first swim plays automatically after the clear.
- After that, tapping the bubble gives one rewarded swim per day (`PROG.swimDay`). The bubble glows when it is ready. Extra swims are practice with no rewards, so it can't be farmed.

**Other**
- The level banner lists the Sanctuary help active on that level (purple chips): "Boost 37% charged", "Volunteer on duty", "Rescue team", "+N recycling shells".
- The banner's entrance no longer depends on a fade that could start hidden; it slides in at full opacity.
