# Shell Run — final launch push plan

Status: PLAN. One push at the end. Gameplay feel must not drop.

## 1. Honest diagnosis: why the map still reads "AI generated"

- The path is a perfect sine wave. Real maps are authored: long straights, tight switchbacks, a detour around a landmark.
- Everything repeats at the same scale: same islet ellipse, same 3 decorations per node, same spacing. Studios vary scale (one huge landmark, many small props) and leave breathing room.
- No light direction or depth. No cast shadows, no parallax, no foreground props overlapping the frame edge.
- Flat fills. No texture, no colour variation inside the sand or the water.
- Nothing reacts to the scroll. Studio maps feel physical: parallax layers, nodes that pop in as they enter the screen, a soft bounce at the ends.
- Icons come from different hands: some flat, some outlined, different stroke weights.

## 2. Map 2.0 (art direction, not more stuff)

- Authored chapter layouts: each chapter (10 levels) gets its own path shape and 2-3 hand-placed hero landmarks (big), plus small props. Seeded, so it stays procedural and light.
- Each chapter is a biome with its own palette (see terrains below). A visible transition between chapters (a river, a headland, a reef gap) instead of a label.
- Lighting: one light from top-left; every prop gets a soft cast shadow; sand gets subtle ripple texture; water gets depth bands and caustic shimmer.
- Parallax: 3 layers (deep water, beach, foreground palms/rocks/clouds) moving at different speeds while scrolling.
- Scroll impact: nodes and landmarks scale-pop in as they enter the viewport (IntersectionObserver), clouds and birds drift, a rubber-band bounce at the top and bottom, momentum scrolling on iOS.
- Current level: a spotlight halo on the sand, the turtle avatar, and a speech bubble showing the level's twist icon.
- Map heals (keep): litter ahead, flowers and swimming turtles behind.

## 3. Iconography: one family

- One grid (32), one stroke (2.4 navy), two-tone fills with one top highlight and one white specular dot, all lit from top-left.
- Redraw every icon in that family: play, pause, settings, map, shop, crew, star, star-empty, heart, heart-broken, bin, boost, clean, surge, ranger, chest closed and open, lock, crab, gull, ball, bottle, rain, fog, sun, moon, wind, net, dog, raccoon, light.
- Micro-animation: icons squish on press; idle wiggle on the one action that matters (Play, a ready boost, a near-full chest).

## 4. Content: well planned from level 1 (no waiting for level 30)

Rule: every chapter introduces ONE new obstacle, ONE new weather or time condition and ONE new terrain, then a boss level remixes them. Chapter 1 teaches something new nearly every level.

| Chapter | Beach | Terrain | New weather | New obstacle | Boss |
|---|---|---|---|---|---|
| 1 (L1-10) | Tortuguero, Costa Rica | gold sand, jungle edge | rain (exists), fog (new, L8) | beach chairs (new, L9) | L10 storm night |
| 2 (L11-20) | Raine Island, Australia | pale coral sand | sunrise heat (new) | driftwood + tide pools | king tide |
| 3 (L21-30) | Rushikulya, India | river-mouth gold | city lights night (new) | hotel lights to switch off, off-leash dogs | arribada II |
| 4 (L31-40) | Ostional, Costa Rica | volcanic black sand | heavy fog + lightning | raccoons from the dunes, sargassum seaweed | fog arribada |
| 5 (L41-50) | La Escobilla, Mexico | dunes with sea oats | wind storm | fishing nets (multi-tap), vehicle ruts | gale night |
| 6+ | rotate + remix | | full moon (easy) / new moon (dark) | | mixes |

Real conservation basis for the new obstacles (fact cards):
- Artificial lighting disorients hatchlings (lights-out ordinances exist).
- Vehicle ruts trap hatchlings.
- Sargassum mats block hatchlings in the Caribbean.
- Dogs, raccoons and foxes prey on nests and hatchlings.
- Daytime heat kills hatchlings that emerge late.
- Fog is gameplay flavour only, never presented as a fact.

New weather and time conditions (all visual + one simple rule):
- Fog: low visibility; a lighthouse beam sweeps and reveals hazards.
- Sunrise heat: a sun timer; sand warms and turtles slow after sunrise.
- City lights: hotel windows lure turtles; tap a light to switch it off.
- Full moon (easy, bright) and new moon (dark; turtles glow faintly).
- King tide: the shoreline moves in and out, carrying trash up.
- Wind storm: stronger gusts, flying trash.

## 5. Gameplay additions that keep it seamless

- Golden hatchling: a rare sparkly turtle; saving it gives a bonus (a boost or skin progress). Variable reward.
- Bonus goal per level shown on the banner (for example "Clean 100%" or "No crab bites") that awards a shell token. Optional, never blocks passing.
- Crew becomes real: shell skins unlocked with shell tokens and stars. Skins show on all hatchlings in play. Future in-app purchase (skin packs).
- Field Guide: a journal of every fact you've unlocked, with the illustration and the real beach. Completion percentage. The educational heart, as a collection.
- Daily Beach: one seeded level a day with a streak reward.

## 6. Launch and ads readiness

- Ad adapter: one interface (rewarded, interstitial) so AdMob or AppLovin plugs in later; demo ads behind it now.
- Placements: rewarded = bring back turtles, double chest, free boost; interstitial = every 3rd win after level 6, never in the first session, 60 s cap.
- Clean recording mode (`?clean=1`): hides the HUD for capturing ad footage of the arribada, storms and combos.
- Analytics stub: level_start, level_end, quit_point, ad_offer, ad_watch, purchase_tap.
- Save code export and import (move progress between devices).
- Privacy policy page, store screenshots.
- iOS fluidity: transform and opacity-only animations, passive listeners, momentum scroll, no layout thrash, 120 Hz safe timing. Haptics on iPhone need the native app wrapper (Capacitor), next step after launch.

## 7. Build order (one push)

1. Icon family + map 2.0.
2. Terrains and weather (look.js) + new obstacles (models.js, game.js) wired into the chapter schedule.
3. Golden hatchling, bonus goals, Crew skins, Field Guide, Daily Beach.
4. Ad adapter, clean mode, analytics stub, save code.
5. QA: bots on early, mid and late levels; screenshots at 320, 390 and 430; slowed-CPU scroll test; then push.

## 8. Reference images (optional)

Generated images are used as art direction only and are recreated in code, so the game stays light, consistent and procedural.
