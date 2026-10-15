# Harvest Sow: Design Bible (onboarding, engagement psychology, design theory)

Status: v0.1, 2026-10-15. Every rule below is tagged **[built]** (in the prototype now), **[next]** (planned) or **[test]** (needs real players to confirm). Numbers marked **[test]** are hypotheses, not facts. Retention targets come from the kill gates in `new-game-brief.md`, and only soft-launch data can confirm them.

One sentence: sow seeds around a valley field to harvest crops before the crows do, sell at the village market, spend coins to grow the valley and hire a helper.

---

## 1. Onboarding spec (first session)

Principle: **the player learns by doing the thing, never by reading.** Every step has exactly one action available, and the game shows it.

| # | Moment | Target | In prototype | How it teaches |
|---|---|---|---|---|
| 1 | Launch to field | no menu, no splash | **[built]** straight into Field 1 | Nothing to decide. The board is the interface |
| 2 | First tap | under 5 s | **[built]** hand + glowing plot at 0.7 s | One legal move matters, one glowing plot. Caption: "Tap the glowing plot" |
| 3 | First win | under 60 s | **[built]** Field 1 is a single tap | Win in ~3 s. A win before any understanding builds the belief "I can do this" |
| 4 | Harvest aha | under 60 s | **[built]** Field 2: land in an empty plot, steal the crows' pile | Caption: "End in an empty plot". Hand points. Burst + chime + haptic |
| 5 | Chain aha | under 90 s | **[built]** Field 3: barn, barn, barn, harvest | Caption: "End in your barn". "Again!" ring each time |
| 6 | First sale | under 2 min | **[built]** valley opens, stall glows, one button | Coins fly to the counter, one tick per coin, pitch rising, haptic per coin |
| 7 | Reminder pre-prompt | after first win, value first | **[built]** soft card; the OS prompt would fire only on "Yes" | Ask at the moment of proven value, explain in one line |
| 8 | Free helper | under 4 min | **[built]** Pip, free, right after the sale | The farm now works without me: first return hook planted |
| 9 | First build | minute 3-5 | **[built]** one ghost building, coins pre-filled to 50% | See section 2: endowed progress |
| 10 | Ads | none for 3 min | **[built]** gated at 180 s *and* after Pip is hired | Rewarded offers state the reward before the video |

Rules of the first session:
- No sign-in, no text walls. Longest caption is 4 words.
- Hand pointer exists only on Fields 1-3. After that the game uses signifiers (plots "breathe" after 7 s idle) so mastery feels earned **[built]**.
- A new twist appears one at a time: rocks (L6), fence (L11), gold (L13), smarter crows (L9, L12+). First time it appears, a 4-word caption shows once **[built]**.
- Fail is never a dead stop. "Try again" is the big button and restarts instantly **[built]**.
- The game detects dead ends and offers Undo/Replant immediately instead of letting you burn moves on a lost field **[built]**.
- Measuring it: Settings shows a **First-session timeline** (first tap, first win, first harvest, first sale, helper hired, first ad offer) on the real device **[built]**.

Open question for real players **[test]**: is Field 1 too trivial? Watch for the first tap, then a pause. If players finish Field 1 and hesitate, shorten the gap to Field 2 with a faster auto-advance.

---

## 2. Engagement psychology (ethical version)

We want a game people *choose* to come back to. We do not want one that exploits. The line is written down in section 2.3 and every feature is checked against it.

### 2.1 The loop
```
 TRIGGER            ACTION              VARIABLE REWARD            INVESTMENT
 Pip's coin bubble  one field (45-90 s) lucky harvest, gold plot,  valley grows (visible),
 daily gift, nudge  one tap at a time   star mastery, daily jackpot Pip's earn rate rises
```
Fogg: behavior = motivation x ability x prompt. Ability is maxed (one tap, offline, no login). Motivation comes from competence and progress. Prompts are opt-in only.

### 2.2 Principles and where each one lives

| Principle | What it is | Where it lives | Status |
|---|---|---|---|
| **Goal-gradient** | Effort rises as the finish line nears | Barn goal bar fills and glows; moves shown as pips; build progress bar | built |
| **Endowed progress** | People finish what looks already started | Player starts with 10 coins, so the first build (20) is already 50% funded | built |
| **Zeigarnik (open loops)** | Unfinished tasks stay in mind | Exactly **one** ghost building is visible at a time, with its price tag and a visible gap | built |
| **Hick's law / one choice** | More options, slower and weaker decisions | One ghost build, one primary button per screen | built |
| **Variable reward** | Unpredictable rewards drive repeat behavior | 15% "Lucky harvest" (x2 crops), daily gift weights (10/20/40), gold plots. Capped, never purchasable | built |
| **Near-miss, used honestly** | "So close" motivates another try | Fail card shows the bar and "N short". We never rig outcomes: every level is solver-proven winnable | built |
| **Flow channel** | Challenge matched to skill | Sawtooth curve: breathers at 8, 13, 16; crows get smarter in steps (depth 0 to 3). Solver rates each level | built |
| **Mastery stars (par)** | Competence beats completion | 3 stars = solver-proven shortest line. Players chase "perfect" | built |
| **Peak-end rule** | We remember the peak and the end | Every win ends on petals, chord, stars. Every fail ends on one obvious next action | built |
| **SDT: competence, autonomy, relatedness** | The three needs behind lasting motivation | Skill-based wins; choice of plot and what to build; Pip as a friendly presence (social gifting later) | built / next |
| **IKEA effect / commitment** | We value what we built | Valley grows visibly; name your farm; decorations later | built / next |
| **Variable-interval return** | Check-ins when a reward is "ready" | Pip's stash fills over time, capped at 2 h so checking in often is not required | built |
| **Reciprocity (ads)** | Fair trade earns goodwill | Rewarded only, reward stated plainly first, "No thanks" is equal size, closing early costs nothing | built |
| **Gentle loss aversion** | Loss stings more than gain | Crows steal only *inside a field*. Nothing is lost outside it. Streak never resets | built |
| **Anticipation of the next twist** | Curiosity gap | Level map teaser of the next twist | next |

### 2.3 Guardrails (the "no" list)
1. No fake timers, fake scarcity or "your crops will die" copy.
2. Streaks **pause, never reset.** Missing a day is not punished.
3. No fake close buttons, no ads that look like game UI, no interstitial mid-move (from L6, between fields, at most every 3rd field and 2 min apart).
4. No loot boxes, no paid randomness, no pay-to-win. v1 has no IAP at all.
5. Not for Kids category. Age rating and consent flow set accordingly (ATT, privacy labels, regional consent). Never say it treats or prevents any condition: "keeps the mind active" is the ceiling.
6. A natural stopping cue exists: Pip "is resting", a field is 45-90 s. We design for *wanting to return*, not *unable to stop*.
7. Every reward the game gives is real: Lucky harvest odds and daily-gift odds are in code and documented here. If we ever change them, we log it.
8. Ad pressure is tuned by data: if ads per DAU rise and D7 falls, ads lose. Retention is the revenue engine.

### 2.4 Retention architecture (hypotheses to test)
- **D1:** the first session ends on Pip hired plus one visible ghost build. Reason to return: Pip's bubble and the daily gift.
- **D7:** a new twist every ~3 fields, two build tiers, the first stars-mastery pass. Notification: "Pip has coins waiting" (opt-in).
- **D30:** events (seasonal fields), more helpers, social gifting. Do not build until D1/D7 clear the gates.

---

## 3. Design theory, applied

### 3.1 Cognition
| Law | Rule in this game |
|---|---|
| **Hick** | One primary action per screen. One ghost build. |
| **Miller / chunking** | Puzzle HUD has exactly 3 items: goal, barn progress, moves. |
| **Fitts** | Thumb zone: primary buttons are 56 px tall at the bottom. Plots are 60 px or larger. Nothing important in the top corners except Home. |
| **Doherty / feedback in 100 ms** | A tap changes the screen (lift animation, sound, buzz) inside one frame budget. The engine is synchronous. Only the show is async. |
| **Progressive disclosure** | Twists one at a time. Valley reveals one building at a time. Undo appears only after the tutorial. |
| **Error prevention** | Dead-end detection, Undo, instant Retry, fence tap explains itself in a toast. |
| **Recognition over recall** | Seeds are visible dots, counts are badges. Nothing to remember. |

### 3.2 Perception
- **Gestalt:** *common region* (wooden tray holds the board), *similarity* (you = warm brown plots, crows = cool indigo plots), *proximity* (each barn sits at its owner's end), *continuity* (the sowing ring is a loop with no gaps).
- **Color:** warm and saturated means yours and rewarding; cool and desaturated means opponent. Gold is reserved for value (seeds, coins, stars, hint glow). **Never color alone:** crows are also positioned top and carry a crow icon; locks use an icon plus a number; gold uses a "+2" tag.
- **Contrast:** body text on cream is dark brown (above 7:1). Captions over the board get a hard shadow. Check with the accessibility audit before soft launch **[test]**.
- **Type:** rounded system sans (feels friendly, ships with the OS, zero download). Numbers are the biggest thing on screen because counting is the game.
- **Hierarchy:** goal chip (top) > board (center) > one CTA (bottom). The camera, not menus, moves between field and valley (full 3D camera moves in the native build).

### 3.3 Juice: the feel stack
Rule: every state change gets **visual + sound + haptic within one beat**. Animation follows Disney's principles.

| Event | Anticipation | Action | Follow-through | Sound | Haptic |
|---|---|---|---|---|---|
| Lift seeds | plot rises and scales up | seeds fly in an arc, one at a time | plot settles | soft whoosh | tick |
| Seed drops | none | seed lands, plot **squash and stretch** | tiny pulse | **pentatonic ladder**: each seed is the next note up | none (avoid buzz spam) |
| Barn drop | | barn pops, mini burst | | bell | short buzz |
| Extra turn | | gold ring expands from the barn, "Again!" | | rising arpeggio | double tap |
| Harvest | both plots flash | seeds stream to barn, screen kicks (5 px), burst, "+N" | counter pops | arpeggio and sparkle | long pattern |
| Crow steals | crow hops to the plot, caws | seeds stream to the crow barn | | low saw glide | single heavy |
| Win | goal bar glows | petals fall, stars pop one at a time | | chord, then a rising note per star | pattern |
| Sale | | coins arc to the counter in a stream | counter bumps | one tick per coin, **pitch climbs** | tick per coin |

Why a **pentatonic ladder**: any sequence of notes from a pentatonic scale sounds consonant, so a long sow always sounds like a little melody, never noise. Count of seeds becomes audible.

Reduce-motion setting cuts shake and particles to a third **[built]**. Sound and haptics toggles **[built]**.

### 3.4 Level design
- Generated by `prototype/tools/gen-levels.js`, **every level solver-proven** with par (shortest win), slack, and a random-play win rate as a difficulty proxy.
- Pacing is a sawtooth: teach, apply, twist, breather, harder twist. Fields 8, 13 and 16 are breathers.
- Goals are capped (3-12) so a win always means real play, not an end-of-game sweep.
- Crows: depth 0 (lowest plot), 1 (greedy), 2-3 (look ahead). Same board, different feel. No new rules needed to raise difficulty.

### 3.5 Accessibility baseline **[built / next]**
Reduce motion, sound and haptics toggles, no color-only meaning, large touch targets, no timed input anywhere in the puzzle. Next: dynamic type, VoiceOver labels on plots (spoken count and legal/blocked), high-contrast theme.

---

## 4. What the prototype can and cannot tell us
- **Can:** whether the core mechanic is fun, whether the first 5 minutes land, whether levels feel fair, whether the juice reads.
- **Cannot:** retention numbers, real ad eCPMs, 60 fps on iPhone 12, App Store review. Those need the native build and a soft launch.
- The prototype's haptics use `navigator.vibrate`, which iOS Safari does not support. On iPhone you will see and hear everything but not feel it until the native build.

## 5. Next design work
1. Watch 5 real people play cold. Record the First-session timeline. Fix the worst drop-off first.
2. Confirm the capture rule variant (Kalah-style now, Ayo-style possible) before locking content.
3. Style bible plus first 10 asset prompts for the 3D look.
4. Add the level-map teaser and the "Pip is resting" stopping cue.
