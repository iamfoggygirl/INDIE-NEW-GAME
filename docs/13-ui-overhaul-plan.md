# Shell Run — UI overhaul plan (menus, results, map, home)

Status: PLAN ONLY. No code written yet. Built to be executed by Opus in one pass, deployed with ONE push (Netlify credits are low).
Rule zero: gameplay is untouched. Only `ui.js`, `template.html`, `build.js`, `static/` change. Proof is required (see Verification).

## 1. Facts about the game today (measured, not guessed)

- Levels: 7 hand-made lessons, then an endless seeded generator. The map shows `max(unlocked + 10, 24)` nodes, so it never ends. Big hatch every 25th level, "Easy breezy" every 5th.
- Difficulty (script `curve.js`: weighted count of hazards x spawn rate + turtle count; a proxy, not player data):
  - Levels 1-10 avg 44, 11-20 avg 53, 21-30 avg 75, 31-40 avg 82 ... 91-100 avg 87.
  - It rises steadily to about level 30, then PLATEAUS at about 80-90 for levels 30-100. After level 30 only the turtle count creeps up. That is why it can start to feel repetitive.
  - Level 7 (Arribada, score 106) is a spike above levels 8-12 (43-64). Intended as a boss, but the next levels then feel like a step back.
  - "Easy breezy" scores 27-77 and lands every 5th level, so a fifth of all levels are deliberate rests, even deep in.
- Result card today (from code): 3 stars, ribbon, big score, one dot per turtle, bin + % clean bar, a "line" sentence, the level fact AND a second "did you know" fact, then 3 full-width buttons. The critique is right: too much, and the buttons are equal weight.
- Fonts: Lilita One is currently used for all UI chrome (my last change). That is too loud for small labels.
- Emoji scan: only two glyphs remain, a phone-vibrate emoji on the pause card and a sparkle glyph in the overlay canvas. Gemini's claim that emojis are everywhere is mostly wrong; icons are already SVG (35 ICON entries). Replace those two and move on.
- Friend feedback: "gameplay is seamless" / "it looks claudey". The second is the real brief: the UI reads as a clean template. The fix is a distinct identity, not more polish.

## 2. The four-part "deeper version" (applied to this task)

1. What a top pro would do that was not asked:
   - Find where players actually quit (first-session funnel) before redesigning.
   - Watch 5 strangers play on real phones, unassisted, thinking aloud.
   - Frame-step the result flows of top casual games to learn timings and hierarchy (learn, do not copy).
   - Stress the UI: smallest phone, largest text, short screens, browser bars, reduced motion.
   - Define a signature visual motif so the game stops looking generic.
2. Rawest material to start from (not digested):
   - Real screenshots of our own screens at 320x568, 390x844, 430x932 (and 130% text), taken now as the BEFORE baseline.
   - The real CSS and computed styles, not an AI's description of a screenshot.
   - WCAG 2.2 text and target-size criteria, Apple HIG button guidance, Material touch targets.
   - Our own bot logs (N-good/lazy/none.txt) as the gameplay baseline.
   - Screen recordings of Royal Match, Candy Crush and Toon Blast result and map flows.
3. Methods and tools:
   - Playwright screenshot matrix + pixel diff before/after (pixelmatch).
   - Contrast script using the WCAG formula, run on every text/background pair.
   - axe-core and Lighthouse accessibility pass; reduced-motion and 130% text emulation.
   - Chrome DevTools CPU throttling for animation smoothness on weak phones.
   - Bot regression (good/lazy/none on levels 1-7 and sampled generated levels) to prove gameplay unchanged.
   - A tiny local event log (level_start, level_end, modal_open, button taps) so retention can be measured later.
4. What, other than Claude or the user, shows it is right:
   - 5 real players on real phones: can they find Play, understand the result, and tap Next within 5 seconds without help?
   - Contrast numbers from the script, and axe-core results.
   - Bot results identical before and after.
   - A designer friend comparing side by side against a top casual victory screen.
   - Later: day-1 and day-7 retention from testers.

## 3. The rewritten prompt (philosophy applied)

"Rebuild Shell Run's menus as one coherent design system without touching gameplay code. First capture BEFORE screenshots of home, results (win and fail), pause, map and shop at 320, 390 and 430 px widths, and save the bot results as the baseline. Then define tokens (colour roles, type scale, spacing 4/8/12/16/24/32, radii, elevation) and a small component set (Button primary/secondary, Panel, Ribbon, Pill, StatRow, ProgressBar, FieldNote, Modal). Rebuild results, map, home, pause and shop from those components. One dominant action per screen. Hide the HUD whenever a modal is open. One fact per screen, in a field-note. Heavy outlines only on the wordmark, ribbon, big score and map level numbers. Prove it: contrast ratios from the script, 44 px targets, no clipping at 320 px or 130% text, reduced-motion respected, bot results identical to baseline, screenshots after. Push once."

## 4. Decisions: what I took from each advisor and what I rejected

| Question | Gemini/Argon | ChatGPT | Decision |
|---|---|---|---|
| Hide HUD under modals | yes, with exact CSS | implied | Do it. This is a real bug (stars collide with pills). Use a `body.modal` class that slides the HUD up and blurs the canvas. |
| Buttons | 1 hero + 2 side by side, toy-cushion bevels | 1 dominant action, quiet secondaries | Both agree. Hero Next (green, navy text), secondary row Play again + Map. |
| Typography | Fredoka everywhere with 4px stroke | Lilita only for wordmark, Nunito Sans for UI, avoid heavy outlines | Mix. Fredoka 600/700 for headings, buttons and numbers; Nunito 700/800 for body; Lilita only for the wordmark. Outline only in the four places listed above. |
| Big number style | fill navy + navy stroke | tabular numerals | Gemini's recipe is self-cancelling (fill = stroke colour). Use cream fill, navy stroke, hard shadow, tabular numerals. |
| Colour | cream card, navy shell | colours have jobs; navy text on green (6.36:1), cream on green fails (2.29:1) | Take ChatGPT's roles. Verify with the script, do not trust the quoted ratios. |
| Facts | one field-note, delete line | drawer / pause / journal | One fact only, on the result card, as a field-note. Pause card keeps one quiet "Turtle fact" line. Never mid-play (already true). |
| Dots row for turtles | keep, animate | remove, `13 / 13` says it | Remove. |
| "Perfect" vs "96% clean" | not addressed | resolve the meaning | "Perfect rescue" = all turtles safe (3 stars). Cleanliness is a separate stat. Never call it "perfect" if turtles were lost. |
| Reward / next unlock row | not addressed | show only real progress | Add one row of REAL data: total stars, or "N levels to <next beach>". No promises the game does not track. |
| Cascade animation | 1.1 s choreographed | ~1 s, skippable, never wait | Do it, but the Next button is tappable at once; any tap skips to the end. |
| Process | single prompt | components, states, a11y, QA, analytics | Take ChatGPT's list. |
| Signature | none | turtle gives personality | Add a signature motif from our own world: the hexagon shell scute pattern (the logo turtle already has it) for panel corners, node badges and button highlights. This answers "claudey". |

## 5. Build order (Opus)

0. Baseline: screenshot matrix, bot logs (copy N-*.txt), contrast script, `git tag ui-before`.
1. Tokens + type + components in `template.html` (CSS variables; Button, Panel, Ribbon, Pill, StatRow, ProgressBar, FieldNote, Modal). Replace the two stray glyphs with SVG. Redo ICON set to one family (navy outline 2.5, 2-stop fill, small white highlight).
2. Modal system: `body.modal` hides HUD (translateY(-90px), opacity 0, 0.35 s) and blurs the canvas (rgba(8,20,38,.65), blur 6px). Applies to results, pause, map, shop.
3. Results card (win + fail variants):
   - stars row (no collision) -> ribbon (headline) -> `13 / 13` with turtle icon -> one supporting row (binned + % clean bar) -> reward row (real data) -> one field-note fact -> hero Next + 2-up Play again / Map.
   - Fail: hearts shown broken, hero = Try again, "Bring back N · watch a video" as a clearly labelled secondary. Next level absent.
   - Cascade: card spring-in, stars slam with haptic, number ticks, bar fills, Next pops last. Skippable.
4. Level map: chapter banners (beach name + one real-world line), sand-trail path with footprints, node states (done with stars, current pulsing with turtle, locked dim), boss/big-hatch crown nodes, auto-scroll to current, bottom Play CTA with level number, top bar with total stars. Chapter backdrop tinted by that chapter's terrain.
5. Home: wordmark, current place + level, one goal chip (real data), big Play, two small buttons (Map, Shop), settings gear. Keep the tappable attract scene. Spacing from the 4/8/12/16/24/32 scale.
6. Pause + shop on the same Panel/Button system. Pause: Resume hero, Restart + Map secondary, sound and vibration as proper switches. Shop: clear prices, "Demo" label until real purchases exist.
7. A11y + states: focus-visible, pressed (translateY 4px), disabled, 44x44 minimum targets, reduced-motion, text scale 130%, safe areas, 320x568 short screens (primary button never below the fold).
8. Event log: ring buffer in localStorage (level_start/level_end/modal_open/button taps), hidden "copy log" in settings.
9. Verification (all must pass): see section 6. Then ONE push.

## 6. Verification (definition of done)

- Contrast: every text/background pair >= 4.5:1 (large text >= 3:1), reported by script.
- Targets: all tappable controls >= 44x44 CSS px.
- No clipped or tiny text at 320 px width and at 130% text size.
- Reduced motion: no cascade, no pulsing; layout identical.
- Gameplay: bot good/lazy/none on levels 1-7 and sampled 10/15/20/25 match baseline within normal variance; `git diff` shows no change to simulation functions in `game.js`.
- Screenshots: after matrix at 320 / 390 / 430 for home, win, fail, pause, map, shop, all reviewed.
- Reload preserves progress (PROG).
- Human check: 5 strangers, find Play and tap Next without help.

## 7. Separate phase AFTER the UI (touches gameplay, own commit): difficulty

Problem: difficulty rises to level ~30 then plateaus; every fifth level is a rest; level 7 spikes. Plan:
- Raise the ceilings (crabs 4 -> 5, gulls 2 -> 3, steeper pace floor) and keep a gentle slope through level 100.
- Introduce one new hazard or twist every 8-10 levels up to 100 (candidates: tide surge washing turtles back, raccoon from the dunes, heat timer after sunrise for Raine Island, torch crowds, drifting nets). Each gets a teaching moment.
- Make "Easy breezy" rarer (about 1 in 7) and tag boss levels clearly.
- Optionally tighten the pass bar on boss levels (70% -> 75%).
- Verify with bots (target lazy-bot pass rate falling from about 100% at level 8 to roughly 40-60% by level 60) and with human testers. Bots cannot tell us how it feels.

## 8. Open questions for Moyo

- OK to use the hexagon shell motif as the signature look?
- Home buttons: Map + Shop only (no "Crew" until cosmetics exist)?
- Should the fail card keep the rewarded-video "bring back" button?
