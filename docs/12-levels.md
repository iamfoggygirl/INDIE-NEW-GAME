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
