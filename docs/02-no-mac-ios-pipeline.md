# Shipping to iPhone without a Mac

Status: plan, 2026-10-15. Facts here come from general platform knowledge and have **not** been checked against live vendor pricing or limits. Check current terms before paying for anything.

## The plain version
You cannot compile an iOS app on Windows, Chromebook or this cloud workspace. You do not need to own a Mac. Apple's build tools run on a Mac somewhere, and we rent that Mac by the minute:

| What | Who provides it | Cost shape |
|---|---|---|
| Apple Developer Program (needed for TestFlight and App Store) | You, in a browser | Yearly fee (about $99 USD for an individual; verify) |
| A Mac to run Xcode | GitHub Actions macOS runner, or Codemagic / Bitrise / Expo EAS | Per-minute or monthly; free tiers exist, check current limits |
| Signing certificates | Created through the App Store Connect API key (web) and automated by fastlane | Free |
| Your iPhone | You | TestFlight app, free |

Nothing here needs Xcode on your machine. Claude writes the code and the CI config; the cloud Mac builds and uploads; TestFlight installs it on your iPhone.

## Recommended path (decision gates, not a leap)
**Gate 0: playtest the web prototype on your iPhone now.** Open the published link in Safari, tap Share, then Add to Home Screen. Zero accounts, zero cost. You get sound and visuals; not haptics (Safari has no vibrate API).

**Gate 1: is the core fun?** Five cold players, First-session timeline from Settings. If not fun, we change the game, not the pipeline. Pipeline work before this gate is wasted.

**Gate 2: pipeline spike (one session of work).** A "hello world" version of the game as a Capacitor app on TestFlight, built entirely in CI:
1. You create the Apple Developer account and an App Store Connect API key (Claude gives click-by-click steps).
2. Claude adds `capacitor`, an `ios/` project, a GitHub Actions workflow on a macOS runner, and fastlane for signing and upload.
3. Push to `main`, the build uploads, you get a TestFlight invite on your phone.

**Gate 3: native feel.** Swap in the native Haptics plugin (real Taptic Engine), the App Tracking Transparency prompt, and the ad SDK.

## Stack options, honestly

| | A. Web tech in a Capacitor shell (recommended now) | B. Unity | C. Pure native Swift |
|---|---|---|---|
| Reuses today's prototype | **Yes: engine, levels, UI, audio** | No, rewrite | No, rewrite |
| 3D diorama | Three.js (fine for a stylised board with a few hundred polys; **must prove 60 fps on iPhone 12 [test]**) | Strongest | Strong (RealityKit/SceneKit) |
| Builds without a Mac | Yes (CI Mac) | Yes (Unity cloud build or GameCI on a CI Mac) | Needs Xcode, so CI Mac only; painful for a non-coder |
| Ads mediation | **Main risk.** AdMob has a community plugin; AppLovin MAX / LevelPlay need native plugin work | First-party LevelPlay and MAX packages | Native SDKs, most work |
| Haptics, ATT, notifications | Capacitor plugins | Plugins/packages | Native |
| You can inspect and tweak without tools | Yes (it's a web page) | Needs the Unity editor | Needs Xcode |

**Recommendation:** A until a gate says otherwise. It keeps everything we've built, lets you playtest daily from a link, and moves fastest to a retention answer. If the ad-mediation or 3D-performance spike fails, we move the *engine and levels* (pure JS, no DOM) into Unity; that part of the work is not wasted. Challenge to your brief: the brief asks for "native Swift + SwiftUI + RealityKit". With no Mac and a non-coding founder, that is the slowest and riskiest route, and nothing about the game requires it.

## Apple review notes
- Guideline 4.1/4.3 (originality): own name, icon, art, level designs. The sowing rules are a public tradition; presentation must be ours. Do the App Store similarity search before naming.
- Guideline 4.2 (minimum functionality): a web-tech wrapper is fine when it is a real game, bundled offline, with native features (haptics, ads). Never load the game from a remote URL.
- Ads: App Tracking Transparency prompt only after the first win with a pre-prompt; privacy nutrition labels must match the SDKs; consent flow for EU/UK.

## Cost and effort sketch (verify before committing)
- Apple Developer account: yearly fee.
- CI minutes: a small game builds in a few minutes; free tiers may cover early work.
- Ad SDK: free. Revenue share is built into ad networks.
- Your time: Gate 0 is 5 minutes; Gate 2 is one working session plus about 30 minutes of your clicking in Apple's website.

## What I need from you, in order
1. Play the link on your iPhone (Gate 0).
2. When you're ready for Gate 2: create an Apple Developer account (enrolment can take from hours to a couple of days).
