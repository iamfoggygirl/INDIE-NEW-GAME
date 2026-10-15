# Harvest Sow: running handoff

Last updated 2026-10-15. Read this first, then `01-design-bible.md` and `02-no-mac-ios-pipeline.md`. Original brief: `new-game-brief.md` in the Claude project.

## Where we are
- Repo `iamfoggygirl/INDIE-NEW-GAME` holds a **playable browser prototype** (`prototype/`): board with crows AI, 20 levels, first-session flow, sound, haptics hooks, particles, valley with market stall, free helper Pip, build progression, demo rewarded and interstitial ads, local analytics.
- Every level is **solver-proven winnable** with par and difficulty rating (`prototype/levels.report.txt`).
- A scripted bot played all 20 levels through real taps with zero JS errors. Dead-end, undo, retry, fence, gold, rock and ad-demo paths were exercised.
- Not yet tested: real humans, real iPhone, retention, ad revenue, 60 fps on iPhone 12.

## Decisions made
| Decision | Why |
|---|---|
| Rules are Kalah-style: barn = extra move, last seed in your empty plot = harvest opposite. No Oware 2-3 capture yet | Two rules are easier to teach than four. The capture rule sits in one function and can change |
| Portrait layout, two columns of 6 plots, barns at top and bottom | Fits a phone and the thumb |
| Prototype in web tech, ship via Capacitor on a cloud Mac build | You have no Mac. See `02-no-mac-ios-pipeline.md` |
| Rewarded ads only, interstitials from field 6, all gated until 3 min and Pip hired | Brief non-negotiable 4 |
| Streak pauses, never resets | Brief: calm, never punishing |
| No IAP in v1 | One currency, one revenue source: ads |

## Open questions for Moyo (max 3)
1. **Rules:** keep Kalah-style, or switch to Ayo/Oware captures (end on a crow plot making it 2 or 3 = capture)?
2. **iPhone playtest:** can you open the link on your phone, play 10 minutes, and tell me where you got bored or stuck?
3. **Apple Developer account:** will you enrol ($99/yr, can take a day or two)? Needed only for the TestFlight spike.

## How to run
- Play: open `prototype/dist/index.html` in any browser (or the published link).
- Rebuild: `node prototype/build.js`. Regenerate levels: `node prototype/tools/gen-levels.js`.
- Test flags: `?debug` (settings tools, event log), `?fast` (ads unlock after 20 s), `?reset` (wipe save).
- Real first-session times: Settings, "First-session timeline".

## Next steps in order
1. Moyo plays on iPhone, then 5 cold players. Fix the worst drop-off first.
2. Decide the rules question, regenerate and re-prove levels if the rules change.
3. Style bible plus first 10 asset prompts (3D look), App Store similarity search (10 closest titles).
4. Gate 2: TestFlight pipeline spike.
5. Kill gates after soft launch: D1 40%+, D7 15%+, D30 5%+, 8+ ads per DAU, under 25% quit before first win.

## Known gaps
- Valley art and board are flat 2D stand-ins for the 3D diorama.
- Haptics need the native build on iPhone.
- No real ad SDK, ATT prompt or notifications yet (demo versions of each).
- 20 levels only; 500+ needs the generator tuned and bigger boards.
