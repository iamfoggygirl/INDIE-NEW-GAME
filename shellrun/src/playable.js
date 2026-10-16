/* ===================== PLAYABLE AD: "The Great Hatch" =====================
   A 25 to 35 second superlevel built from the real game: same turtles, same taps, same feel.
   Beats: one rescue (slow-mo hook) -> a few hatchlings + trash -> one telegraphed gull -> three nests burst -> the procession reaches the sea -> end card.
   No forced failure, no fake mechanics, the store only opens when the player taps the button. */
const STORE = { ios: 'https://shellrun.netlify.app/', android: 'https://shellrun.netlify.app/', web: 'https://shellrun.netlify.app/' };
function triggerAdCTA(where) {
  track('cta', { where }); const ua = navigator.userAgent || '', url = /iPhone|iPad|iPod/.test(ua) ? STORE.ios : /Android/.test(ua) ? STORE.android : STORE.web;
  try { if (self.mraid && mraid.open) { mraid.open(url); return; } } catch (e) {}
  try { if (self.FbPlayableAd && FbPlayableAd.onCTAClick) { FbPlayableAd.onCTAClick(); return; } } catch (e) {}
  try { if (self.ExitApi && ExitApi.exit) { ExitApi.exit(); return; } } catch (e) {}
  try { if (self.dapi && dapi.openStoreUrl) { dapi.openStoreUrl(); return; } } catch (e) {}
  window.open(url, '_blank');
}
let playEnd = () => {};
if (PLAY) (function () {
  const PSPEC = { name: 'The Great Hatch', mood: 'moon', terrain: 'gold', fresh: 22, nests: 3, litter: 0, tangle: 0, rocks: 0, castles: 0, crabs: 1, crabT: 999, crabSpd: .9, burrow: 0, gulls: 1, tourists: 0, balls: 0, spawn: .34, teach: 'play', fact: '', gold: 0 };
  _spec[90000] = PSPEC;
  const app = $('#app'); app.classList.add('playing', 'playable');
  const st0 = $('#start'); if (st0) st0.remove();
  started = true; attract = false; Object.assign(season, { met: 0, saved: 0, spawned: 0, binned: 0 });
  let stage = 'hook', tStage = 0, tAll = 0, firstTap = false, hookT = null, cardShown = false, idle = 0;
  const brand = document.createElement('div'); brand.className = 'pbrand'; brand.innerHTML = `${TURT('classic')}<span>Shell Run</span>`; app.appendChild(brand);
  const cta = document.createElement('button'); cta.className = 'b-green pcta'; cta.innerHTML = 'Get it free'; cta.onclick = (e) => { e.stopPropagation(); triggerAdCTA('pill'); }; app.appendChild(cta);
  const release = (k, spawnGap) => { for (let i = 0; i < k; i++) nests[i % nests.length].left++; spawnLeft += k; spec.spawn = spawnGap; spawnT = Math.min(spawnT, .2); };
  const start = () => {
    begin(90000); running = true; powerKind = null; ui.power(); for (const g of gulls) g.t = 999; spawnLeft = 0; for (const n of nests) n.left = 0; playHold = true; introT = 0; goal = null; goldIdx = 10;
    // the hook: one hatchling already on its back near the sea, waiting for you
    nests[1].left = 1; spawnLeft = 1; spawnTurtle(); hookT = T[0]; Object.assign(hookT, { x: .4, z: SHORE_Z + 3.4, born: 2, hd: Math.PI, keep: true }); flip(hookT); hookT.flipT = 99;
    ui.cap('Help this little one!', 99); track('ad_start', {}); shake = 0;
  };
  // pace the beats; called every frame from the loop (returns the time step to use)
  playTick = (raw, dt) => {
    tAll += raw; tStage += raw; if (cardShown) return dt * .06;
    if (stage === 'hook') {
      if (hookT && hookT.st !== 'flip') { stage = 'grow'; tStage = 0; firstTap = true; track('first_tap', { t: tAll }); ui.cap('It made it! More are hatching…', 2.2); setTimeout(() => { release(5, .42); for (const [x, z] of [[-2.1, NEST_Z - 3.1], [2.3, NEST_Z - 3.4], [0, NEST_Z - 4.6]]) addLitter(pick(['bottle', 'can', 'cup']), x, z); }, 900); }
      if (hookT) hookT.flipT = 99;
      if (tAll > 7 && !firstTap) { ui.cap('Tap the turtle to flip it!', 99); }
      return dt * .22;   // slow motion until the first touch
    }
    if (stage === 'grow') {
      if (tStage > 6.5 || (spawnLeft === 0 && safeN >= 4)) { stage = 'gull'; tStage = 0; for (const g of gulls) { g.t = .1; } track('stage', { s: 'gull' }); }
      return dt * 1.15;
    }
    if (stage === 'gull') {
      const g = gulls[0], diving = g && (g.st === 'dive' || g.st === 'carry');
      if (diving && !hand) hand = { o: g, y: g.y, kind: 'gull' };
      if (hand && hand.kind === 'gull') { hand.y = g.y; if (!diving) { hand = null; ui.capOff(); } }
      if ((tStage > 4.5 && !diving) || tStage > 9) { stage = 'surge'; tStage = 0; surge(); }
      return dt * (diving ? .45 : 1.1);
    }
    if (stage === 'surge') {
      if (tStage > 2.5 && spawnLeft === 0 && playHold) playHold = false;
      if (tStage > 5 && !surge.waved && wave.st === 'off') { surge.waved = 1; startWave(false); }
      return dt * 1.2;
    }
    return dt;
  };
  function surge() {
    track('stage', { s: 'surge' }); sfx.win(); buzz([30, 40, 60, 40, 30]); shake = .22;
    $('#bannerT').className = 'ribbon coral'; $('#bannerT').innerHTML = `<small>ALL THREE NESTS</small>The Great Hatch!<span class="new">Clear their path to the sea</span>`;
    $('#banner').classList.add('on'); setTimeout(() => $('#banner').classList.remove('on'), 2600);
    for (const n of nests) { n.wob = 1.2; burst3(n.x, .3, n.z, ['#f4ead2', '#e6cfa0', '#fff3c4'], 22, { up: 1.6 }); }
    release(16, .15); goldIdx = total - spawnLeft + 4;
    for (const [x, z] of [[-1.4, 1.4], [1.6, .2], [-.2, -2.2]]) addLitter(pick(['bottle', 'can', 'flipflop']), x, z);
    for (const c of crabs) c.t = 2.2;
    cta.classList.add('on');
  }
  playEnd = () => {
    if (cardShown) return; cardShown = true; track('ad_end', { safe: safeN, total, t: Math.round(tAll) });
    zoomTo = 1.1; focusTo.set(0, 0, baseFocusZ - 2.5); sfx.win(); buzz([20, 40, 20]);
    for (let i = 0; i < 6; i++) setTimeout(() => burst3((Math.random() - .5) * 7, .6, SHORE_Z + .6 + Math.random() * 2, ['#ffd166', '#ffffff', '#8fd19e', '#6fd1c8'], 22, { g: 2.2, up: 2.3, size: 1.1 }), i * 160);
    setTimeout(() => {
      const v = document.createElement('div'); v.className = 'veil pend';
      v.innerHTML = `<div class="card"><div class="stars"><div class="glow"></div>${[0, 1, 2].map((i) => i < (safeN >= total - 1 ? 3 : safeN >= total * .8 ? 2 : 1) ? ICON.star : ICON.starOff).join('')}</div><div class="ribbon">You saved ${safeN}!</div><div class="inner">
        <div class="ptop">${TURT('classic')}${TURT('gold', { shine: 1 })}${TURT('classic')}</div>
        <div class="ptitle">A whole coast is waiting</div>
        <div class="goal">100 beaches · crabs, gulls, waves and storms · real turtle facts</div>
        <div class="btns"><button class="b-green hero pcta2" id="pg">${ICON.play}Play Shell Run · Free</button><button class="b-navy" id="pr">${ICON.retry}Replay</button></div></div></div>`;
      $('#app').appendChild(v); v.querySelectorAll('.stars svg').forEach((s, i) => setTimeout(() => { s.classList.add('show'); tone(note(4 + i * 2), .35, 'triangle', .13, 0, 0, .5); }, 200 + i * 200));
      v.querySelector('#pg').onclick = () => triggerAdCTA('endcard');
      v.querySelector('#pr').onclick = () => { track('replay', {}); location.reload(); };
    }, 1500);
  };
  // safety net: the end card always appears, even if nobody touches anything
  setInterval(() => { if (!cardShown && tAll > 45) { running = false; ended = true; playEnd(); } }, 1000);
  const go = () => { start(); };
  try { if (self.mraid && mraid.getState && mraid.getState() === 'loading') mraid.addEventListener('ready', go); else go(); } catch (e) { go(); }
  try { if (self.mraid) mraid.addEventListener('viewableChange', (v) => { if (MG && AC) MG.gain.setTargetAtTime(v && !muted ? .9 : 0, AC.currentTime, .05); }); } catch (e) {}
})();
