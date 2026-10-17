/* ===================== SWIM FRENZY: the bonus round out at sea =====================
   After every 5th level (first clear). The hatchlings you saved swim out together, seen from above.
   Same rule as the beach: we never steer them, we clear what people left behind. Tap the plastic before
   they swim into it. Jellyfish are their food, so leave those alone. Nothing dies: a tangled hatchling
   that isn't freed in time washes back to the beach to try again. */
function swimFrenzy(opt) {
  const app = $('#app'), el = document.createElement('div'); el.className = 'swim';
  el.innerHTML = `<canvas></canvas><div class="sw-top"><div class="pill sw-n">${ICON.bin}<span>0</span></div><div class="sw-bar"><i></i><b>${TURT(skinNow)}</b></div><button class="iconbtn sw-skip" aria-label="Skip">${ICON.play}</button></div><div class="sw-ban"><div class="ribbon">Swim Frenzy!</div></div><div class="sw-cap"></div>`;
  app.appendChild(el); swimOn = true; running = false;
  const cv = el.querySelector('canvas'), cx = cv.getContext('2d'), cap = el.querySelector('.sw-cap'), cntEl = el.querySelector('.sw-n'), cnt = cntEl.querySelector('span'), bar = el.querySelector('.sw-bar i'), barT = el.querySelector('.sw-bar b');
  let W = 0, H = 0, DPR = 1;
  const size = () => { W = app.clientWidth; H = app.clientHeight; DPR = Math.min(2, devicePixelRatio || 1); cv.width = W * DPR | 0; cv.height = H * DPR | 0; };
  size(); addEventListener('resize', size);
  const U = Math.min(W, 460) / 390, sk = SKINS[skinNow] || SKINS.classic, DUR = 30, SPD0 = 100 * U;
  const rnd = (a, b) => a + Math.random() * (b - a), cl = (v, a, b) => Math.max(a, Math.min(b, v)), mix = (a, b, u) => a + (b - a) * u;
  const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)], mixC = (a, b, u) => { const A = hex(a), B = hex(b); return `rgb(${A.map((v, i) => Math.round(mix(v, B[i], u))).join(',')})`; };
  // caustic light: a seamless tile made once, drawn in two drifting layers
  const tile = document.createElement('canvas'); tile.width = tile.height = 128;
  { const t = tile.getContext('2d'), im = t.createImageData(128, 128); for (let y = 0; y < 128; y++) for (let x = 0; x < 128; x++) { const a = x / 128 * Math.PI * 2, b = y / 128 * Math.PI * 2, v = Math.abs(Math.sin(a * 2 + Math.sin(b * 3) * 1.3) + Math.sin(b * 2 + Math.sin(a * 3 + 1) * 1.3)), al = Math.max(0, 1 - v * 2.4), o = (y * 128 + x) * 4; im.data[o] = 230; im.data[o + 1] = 255; im.data[o + 2] = 250; im.data[o + 3] = al * al * 150; } t.putImageData(im, 0, 0); }
  const pat = cx.createPattern(tile, 'repeat');
  // world: y grows downward like the screen; the school swims up (toward the open sea)
  let hintAge = 0, t = 0, wy = 0, spd = SPD0, cleared = 0, tangles = 0, combo = 0, comboT = 0, slow = 1, flash = 1, spawnT = 2.2, jellyT = 3.4, raft = null, endT = -1, shown = false, skipped = false, hintL = null, toldJelly = 0, toldTangle = 0, bubT = 0, capTO = 0, raf = 0, lastTs = 0, gone = false;
  const lesson = !PROG.swimSeen, camTop = () => wy - H * .64, SY = (y) => y - camTop();
  const lx = (tt) => W / 2 + Math.sin(tt * .35) * W * .17 + Math.sin(tt * .93 + 1) * W * .05;
  const school = []; for (let k = 0; k < opt.n; k++) { const row = k / 4 | 0, col = k % 4; school.push({ ox: (col - 1.5) * 58 * U + rnd(-8, 8) * U, oy: row * 62 * U + rnd(-6, 6) * U, x: W / 2 + (col - 1.5) * 40 * U, y: H * .5 + 300 * U + row * 46 * U, vx: 0, vy: 0, ph: rnd(0, 6), a: -Math.PI / 2, st: 'swim', hold: null, tt: 0, eat: 0, fade: 1 }); }
  const L = [], J = [], P = [], F = [];
  // the sea floor near the beach: sand ripples, seagrass and rocks, fading as the water gets deep
  const floor = []; for (let k = 0; k < 40; k++) floor.push({ x: rnd(0, W), y: H * .9 - k * rnd(36, 60) * U, k: Math.random() < .6 ? 'grass' : 'rock', s: rnd(.7, 1.3) });
  const specks = Array.from({ length: 46 }, () => ({ x: rnd(0, W), y: rnd(0, H), r: rnd(.8, 2.2) * U, a: rnd(.15, .45) }));
  const capShow = (txt, ms = 1800) => { cap.textContent = txt; cap.classList.add('on'); clearTimeout(capTO); if (ms) capTO = setTimeout(() => cap.classList.remove('on'), ms); };
  const floater = (x, y, txt, c = '#fff') => F.push({ x, y, txt, c, life: 1.1 });
  const burst = (x, y, n, cols, sp = 120) => { for (let i = 0; i < n; i++) { const a = rnd(0, Math.PI * 2), v = rnd(.3, 1) * sp * U; P.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: rnd(2, 5) * U, c: cols[i % cols.length], life: rnd(.4, .8), k: 'spark' }); } };
  const bubble = (x, y, r = rnd(2, 5)) => P.push({ x, y, vx: rnd(-8, 8) * U, vy: -rnd(40, 90) * U, r: r * U, life: rnd(1, 2), k: 'bub' });
  const KINDS = [['bag', .32], ['rings', .2], ['bottle', .18], ['balloon', .16], ['net', .14]];
  const spawnLitter = (k, x, y) => { k = k || (() => { let r = Math.random(); for (const [n, w] of KINDS) { if ((r -= w) <= 0) return n; } return 'bag'; })(); const o = { k, x: x != null ? x : cl(lx(t + 2.4) + rnd(-.27, .27) * W, W * .1, W * .9), y: y != null ? y : camTop() - 50 * U, r: (k === 'net' ? 42 : k === 'bottle' ? 20 : 25) * U, rot: rnd(-.6, .6), vr: rnd(-.4, .4), hp: k === 'net' ? 3 : 1, hold: [], ph: rnd(0, 6), gone: 0, shk: 0 }; L.push(o); return o; };
  const spawnJelly = () => J.push({ x: cl(lx(t + 2.6) + rnd(-.3, .3) * W, W * .1, W * .9), y: camTop() - 40 * U, r: 16 * U, ph: rnd(0, 6), eaten: 0, wob: 0, hue: Math.random() < .6 ? 0 : 1 });
  // sound: a dive splash and a rising sweep
  noise(.6, .09, 900, 0, .7); tone(260, .7, 'sine', .07, 880, .05, .4); setTimeout(() => sfx.chime(), 500); buzz([12, 30, 12]);
  track('swim_start', { n: opt.n });

  function update(dt) {
    t += dt; comboT -= dt; if (hintL && hintL !== 'done' && slow < 1 && (hintAge += dt / slow) > 5) slow = 1; flash = Math.max(0, flash - dt * 1.4);
    if (endT < 0) wy -= spd * dt; else { endT += dt; spd = Math.max(0, spd - 160 * U * dt); }
    const p = cl(t / DUR, 0, 1); bar.style.width = (p * 100).toFixed(1) + '%'; barT.style.left = (p * 100).toFixed(1) + '%';
    // spawns: litter gets busier toward the end; jellyfish drift through; the first piece is a lesson
    if (endT < 0 && t > 1.6 && t < DUR - 3.5) {
      if (lesson && !hintL && t > 1.8) { hintL = spawnLitter('bag', cl(lx(t + 1.6), W * .25, W * .75), camTop() + H * .22); hintL.hint = 1; slow = .25; capShow('Tap the plastic!', 0); }
      if ((spawnT -= dt) <= 0) { const o = spawnLitter(); if (Math.random() < .25 && p > .15) { const sd = Math.random() < .5 ? -1 : 1; o.x = sd < 0 ? -30 * U : W + 30 * U; o.y = camTop() + H * rnd(.15, .45); o.vx = -sd * rnd(45, 70) * U; } spawnT = mix(1.3, .66, p) * rnd(.8, 1.2); }
      if ((jellyT -= dt) <= 0) { spawnJelly(); jellyT = rnd(1.8, 2.6); }
    }
    if (!raft && t >= DUR - 2.4) raft = { x: cl(lx(t + 3), W * .3, W * .7), y: wy - H * .55 - spd * 1.2 };
    if (raft && endT < 0 && wy <= raft.y + 20 * U) { endT = 0; sfx.win(); buzz([20, 40, 20]); for (let i = 0; i < 24; i++) bubble(raft.x + rnd(-60, 60) * U, raft.y + rnd(-20, 30) * U, rnd(2, 6)); }
    const LX = lx(t);
    for (const s of school) {
      s.ph += dt * (s.st === 'tang' ? 16 : 7 + Math.hypot(s.vx, s.vy) / (40 * U)); s.eat = Math.max(0, s.eat - dt);
      if (s.st === 'swim') {
        const tx = endT >= 0 && raft ? raft.x + s.ox * .7 : LX + s.ox + Math.sin(t * 1.3 + s.ph * .1) * 6 * U, ty = endT >= 0 && raft ? raft.y + s.oy * .45 - 10 * U : wy + s.oy;
        s.vx += ((tx - s.x) * 4.2 - s.vx * 3) * dt; s.vy += ((ty - s.y) * 4.2 - (s.vy + spd) * 3) * dt;
        s.x += s.vx * dt; s.y += s.vy * dt;
        const ta = Math.atan2(s.vy, s.vx); let da = ta - s.a; while (da > Math.PI) da -= Math.PI * 2; while (da < -Math.PI) da += Math.PI * 2; s.a += da * Math.min(1, dt * 6);
        if (endT < 0) for (const l of L) if (!l.gone && Math.hypot(l.x - s.x, l.y - s.y) < l.r + 4 * U && l.hold.length < (l.k === 'net' ? 3 : 1)) { s.st = 'tang'; s.hold = l; s.tt = 0; l.hold.push(s); tangles++; tone(330, .18, 'triangle', .07, 220); buzz(18); if (toldTangle++ === 0 && lesson) capShow('Tap to free it!'); break; }
        for (const j of J) if (!j.eaten && Math.hypot(j.x - s.x, j.y - s.y) < j.r + 10 * U) { j.eaten = .01; s.eat = .45; tone(900, .08, 'sine', .06, 1500); burst(j.x, j.y, 6, ['#ffd0e6', '#fff']); floater(j.x, j.y - 14 * U, 'Yum!', '#ffe0f0'); }
      } else if (s.st === 'tang') {
        s.tt += dt; const l = s.hold; s.x = l.x + Math.sin(s.ph) * 3 * U + (l.hold.indexOf(s) - 1) * 14 * U * (l.k === 'net' ? 1 : 0); s.y = l.y + 6 * U; s.a = -Math.PI / 2 + Math.sin(s.ph * .7) * .5;
        if (endT >= 0) free(s, 0); else if (s.tt > 9 || SY(s.y) > H + 30 * U) { s.st = 'lost'; s.hold = null; l.hold = l.hold.filter((o) => o !== s); floater(s.x, SY(s.y) > H ? H - 40 * U + camTop() : s.y - 20 * U, 'Back to the beach', '#cfe6ff'); }
      } else if (s.st === 'lost') { s.y += 40 * U * dt; s.fade = Math.max(0, s.fade - dt * .5); }
      if (s.st === 'swim' && Math.random() < dt * 1.2) bubble(s.x + rnd(-6, 6) * U, s.y + 10 * U, rnd(1.5, 3));
    }
    for (const l of L) { l.rot += l.vr * dt; l.ph += dt * 2; l.y += 14 * U * dt; l.x += (Math.sin(l.ph * .6) * 8 * U + (l.vx || 0)) * dt; if (l.vx) l.vx *= 1 - dt * .25; l.shk = Math.max(0, l.shk - dt); if (l.gone) l.gone += dt * 3; }
    for (let i = L.length - 1; i >= 0; i--) if (L[i].gone > 1 || SY(L[i].y) > H + 120 * U) { for (const s of L[i].hold) if (s.st === 'tang') s.st = 'lost'; L.splice(i, 1); }
    for (const j of J) { j.ph += dt * 3; j.y += (8 - Math.max(0, Math.sin(j.ph)) * 22) * U * dt; j.r = 20 * U; j.wob = Math.max(0, j.wob - dt); if (j.eaten) j.eaten += dt * 3; if (lesson && !toldJelly && SY(j.y) > H * .15 && hintL === 'done') { toldJelly = 1; capShow('Jellyfish are food. Leave them!', 2200); } }
    for (let i = J.length - 1; i >= 0; i--) if (J[i].eaten > 1 || SY(J[i].y) > H + 80 * U) J.splice(i, 1);
    for (const q of P) { q.x += q.vx * dt; q.y += q.vy * dt; q.life -= dt; if (q.k === 'spark') { q.vx *= .9; q.vy *= .9; } }
    for (let i = P.length - 1; i >= 0; i--) if (P[i].life <= 0) P.splice(i, 1);
    for (const f of F) { f.y -= 30 * U * dt; f.life -= dt; } for (let i = F.length - 1; i >= 0; i--) if (F[i].life <= 0) F.splice(i, 1);
    if ((bubT -= dt) <= 0) { bubT = rnd(.5, 1.1); tone(rnd(700, 1300), .05, 'sine', .018, rnd(1400, 2000)); }
    if (endT > 1.7 && !shown) result();
  }
  function free(s, burstV = 1) { if (s.st !== 'tang') return; const l = s.hold; s.st = 'swim'; s.hold = null; if (l) l.hold = l.hold.filter((o) => o !== s); if (burstV) { s.vy -= 170 * U; floater(s.x, s.y - 20 * U, '♥', '#ff8fb1'); } }
  function hit(l) {
    if (l.gone) return;
    if (l.k === 'net' && --l.hp > 0) { l.shk = .25; tone(500 + (3 - l.hp) * 120, .08, 'triangle', .08); buzz(10); burst(l.x, l.y, 5, ['#9fe8d8', '#fff']); return; }
    l.gone = .01; cleared++; cnt.textContent = cleared; cntEl.classList.remove('pop'); void cntEl.offsetWidth; cntEl.classList.add('pop');
    combo = comboT > 0 ? combo + 1 : 1; comboT = 1.3; tone(note(3 + Math.min(combo, 9)), .14, 'triangle', .1, 0, 0, .3); sfx.bin(); buzz(12);
    burst(l.x, l.y, 12, ['#ffffff', '#bff6f0', '#ffe9a8']); for (let i = 0; i < 6; i++) bubble(l.x + rnd(-10, 10) * U, l.y, rnd(2, 4));
    if (combo >= 3) floater(l.x, l.y - 24 * U, '×' + combo, '#ffe680');
    for (const s of l.hold.slice()) free(s);
    if (l.hint) { hintL = 'done'; slow = 1; cap.classList.remove('on'); PROG.swimSeen = 1; saveProg(); }
  }
  cv.addEventListener('pointerdown', (e) => {
    if (shown) return; au(); const r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top + camTop(), reach = 44 * U;
    let best = null, bd = 1e9;
    for (const l of L) if (!l.gone) { const d = Math.hypot(l.x - x, l.y - y) - l.r * .5; if (d < reach && d < bd) { bd = d; best = ['l', l]; } }
    for (const s of school) if (s.st === 'tang') { const d = Math.hypot(s.x - x, s.y - y); if (d < reach && d < bd) { bd = d; best = ['l', s.hold]; } }
    if (!best) for (const j of J) if (!j.eaten) { const d = Math.hypot(j.x - x, j.y - y); if (d < reach * .8 && d < bd) { bd = d; best = ['j', j]; } }
    if (!best) { for (let i = 0; i < 4; i++) bubble(x + rnd(-6, 6) * U, y, rnd(1.5, 3)); return; }
    if (best[0] === 'l') hit(best[1]);
    else { const j = best[1]; j.wob = .5; sfx.boop(); if (toldJelly < 3) { toldJelly = 3; floater(j.x, j.y - 24 * U, "That's food!", '#ffe0f0'); } }
  });
  el.querySelector('.sw-skip').onclick = () => { au(); skipped = true; result(); };

  /* ---------- drawing ---------- */
  function draw() {
    const c = cx, p = cl(t / DUR, 0, 1), top = camTop(), sandA = cl(1 - p * 2.3, 0, 1);
    c.setTransform(DPR, 0, 0, DPR, 0, 0);
    const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, mixC('#5ff0e4', '#2a8fd6', p)); g.addColorStop(.55, mixC('#1fc8d8', '#1466b0', p)); g.addColorStop(1, mixC('#12a3c8', '#0b3a78', p));
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    // sand floor and ripples, near the beach only
    if (sandA > 0) {
      c.globalAlpha = sandA * .3; c.fillStyle = '#ffe2a0'; c.fillRect(0, 0, W, H); c.globalAlpha = sandA * .22; c.strokeStyle = '#fff6d8'; c.lineWidth = 3 * U;
      const step = 34 * U, y0 = -((top % step) + step) % step;
      for (let y = y0 - step; y < H + step; y += step) { c.beginPath(); for (let x = -10; x <= W + 10; x += 16) { const wy2 = y + Math.sin((x + (y + top) * .7) * .03) * 5 * U; x < 0 ? c.moveTo(x, wy2) : c.lineTo(x, wy2); } c.stroke(); }
      c.globalAlpha = sandA;
      for (const f of floor) { const y = f.y - top * 1; if (y < -60 || y > H + 60) continue; if (f.k === 'grass') { c.strokeStyle = '#3f9a5a'; c.lineWidth = 3 * U * f.s; c.lineCap = 'round'; for (let k = -2; k <= 2; k++) { c.beginPath(); c.moveTo(f.x + k * 5 * U, y); c.quadraticCurveTo(f.x + k * 7 * U + Math.sin(t * 1.6 + f.x) * 6 * U, y - 16 * U * f.s, f.x + k * 9 * U + Math.sin(t * 1.6 + f.x + 1) * 10 * U, y - 28 * U * f.s); c.stroke(); } } else { c.fillStyle = '#8f9aa2'; c.beginPath(); c.ellipse(f.x, y, 16 * U * f.s, 10 * U * f.s, 0, 0, Math.PI * 2); c.fill(); c.fillStyle = '#b4bec4'; c.beginPath(); c.ellipse(f.x - 4 * U, y - 3 * U, 9 * U * f.s, 5 * U * f.s, 0, 0, Math.PI * 2); c.fill(); } }
      c.globalAlpha = 1;
    }
    // caustics, two layers drifting against each other
    c.save(); c.globalCompositeOperation = 'lighter';
    for (const [sc2, a, dx, dy] of [[1.9, .3 - p * .12, 14, .9], [2.8, .2, -9, .7]]) { c.save(); c.globalAlpha = a; c.scale(sc2 * U, sc2 * U); const ox = (t * dx) % 128, oy = (-top * dy / (sc2 * U)) % 128; c.translate(ox - 128, oy - 128); c.fillStyle = pat; c.fillRect(0, 0, W / (sc2 * U) + 256, H / (sc2 * U) + 256); c.restore(); }
    c.restore();
    // drifting specks (parallax)
    c.fillStyle = '#ffffff'; for (const s of specks) { const y = ((s.y - top * .5) % H + H) % H; c.globalAlpha = s.a; c.beginPath(); c.arc(s.x, y, s.r, 0, Math.PI * 2); c.fill(); } c.globalAlpha = 1;
    // the seaweed raft: where the school is heading
    if (raft) drawRaft(raft.x, SY(raft.y));
    // soft shadows give depth
    c.fillStyle = 'rgba(8,30,60,' + (.08 + sandA * .12).toFixed(3) + ')';
    for (const s of school) if (s.fade > 0) { c.beginPath(); c.ellipse(s.x + 12 * U, SY(s.y) + 18 * U, 18 * U, 12 * U, 0, 0, Math.PI * 2); c.fill(); }
    for (const l of L) if (!l.gone) { c.beginPath(); c.ellipse(l.x + 9 * U, SY(l.y) + 14 * U, l.r * .8, l.r * .5, 0, 0, Math.PI * 2); c.fill(); }
    for (const j of J) drawJelly(j);
    for (const l of L) drawLitter(l);
    for (const s of school) if (s.fade > 0) drawTurtle(s);
    // god rays from the surface
    c.save(); c.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 4; i++) { const x0 = W * (.12 + i * .27) + Math.sin(t * .3 + i * 1.7) * 30 * U, w = (40 + i * 14) * U, rg = c.createLinearGradient(0, 0, 0, H); rg.addColorStop(0, 'rgba(255,255,240,.13)'); rg.addColorStop(1, 'rgba(255,255,240,0)'); c.fillStyle = rg; c.beginPath(); c.moveTo(x0, 0); c.lineTo(x0 + w, 0); c.lineTo(x0 + w * 2.2 + 90 * U, H); c.lineTo(x0 + 90 * U, H); c.closePath(); c.fill(); }
    c.restore();
    for (const q of P) { const y = SY(q.y); if (q.k === 'bub') { c.globalAlpha = Math.min(1, q.life) * .8; c.strokeStyle = '#ffffff'; c.lineWidth = 1.4 * U; c.beginPath(); c.arc(q.x, y, q.r, 0, Math.PI * 2); c.stroke(); c.fillStyle = 'rgba(255,255,255,.5)'; c.beginPath(); c.arc(q.x - q.r * .35, y - q.r * .35, q.r * .3, 0, Math.PI * 2); c.fill(); } else { c.globalAlpha = Math.max(0, q.life * 1.6); c.fillStyle = q.c; c.beginPath(); c.arc(q.x, y, q.r, 0, Math.PI * 2); c.fill(); } }
    c.globalAlpha = 1;
    // the lesson: a pulsing ring on the first bag
    if (hintL && hintL !== 'done' && !hintL.gone) { const y = SY(hintL.y), k = (t * 1.6) % 1; c.strokeStyle = 'rgba(255,246,200,' + (1 - k).toFixed(2) + ')'; c.lineWidth = 4 * U; c.beginPath(); c.arc(hintL.x, y, hintL.r + 10 * U + k * 26 * U, 0, Math.PI * 2); c.stroke(); }
    c.textAlign = 'center'; c.lineJoin = 'round';
    for (const f of F) { const y = SY(f.y), a = Math.min(1, f.life * 2); c.globalAlpha = a; c.font = `${(f.txt.length > 6 ? 20 : 26) * U}px "Lilita One", Fredoka, sans-serif`; c.lineWidth = 6 * U; c.strokeStyle = '#0d2a4a'; c.strokeText(f.txt, f.x, y); c.fillStyle = f.c; c.fillText(f.txt, f.x, y); }
    c.globalAlpha = 1;
    // edge vignette + the dive flash
    const vg = c.createRadialGradient(W / 2, H * .55, Math.min(W, H) * .35, W / 2, H * .55, Math.max(W, H) * .8); vg.addColorStop(0, 'rgba(5,20,45,0)'); vg.addColorStop(1, 'rgba(5,20,45,.35)'); c.fillStyle = vg; c.fillRect(0, 0, W, H);
    if (flash > 0) { c.fillStyle = `rgba(230,255,252,${flash.toFixed(3)})`; c.fillRect(0, 0, W, H); }
  }
  function drawTurtle(s) {
    const c = cx, y = SY(s.y), z = U * 1.3 * (s.eat > 0 ? 1 + Math.sin(s.eat * 20) * .06 : 1), fl = Math.sin(s.ph);
    c.save(); c.globalAlpha = s.fade; c.translate(s.x, y); c.rotate(s.a + Math.PI / 2); c.scale(z, z);
    c.lineWidth = 1.6; c.strokeStyle = '#2f5a2c';
    for (const sd of [-1, 1]) { c.save(); c.translate(sd * 9, -5); c.rotate(sd * (.55 + fl * .6)); c.fillStyle = '#6fb04a'; c.beginPath(); c.ellipse(sd * 10, 0, 11, 4.2, 0, 0, Math.PI * 2); c.fill(); c.stroke(); c.restore(); }
    for (const sd of [-1, 1]) { c.save(); c.translate(sd * 7, 10); c.rotate(sd * (2.3 - fl * .3)); c.fillStyle = '#6fb04a'; c.beginPath(); c.ellipse(sd * 5, 0, 5.5, 2.8, 0, 0, Math.PI * 2); c.fill(); c.stroke(); c.restore(); }
    c.fillStyle = '#86c75a'; c.beginPath(); c.arc(0, -17, 6.2, 0, Math.PI * 2); c.fill(); c.stroke();
    c.fillStyle = '#14161c'; for (const sd of [-1, 1]) { c.beginPath(); c.arc(sd * 2.7, -19, 1.5, 0, Math.PI * 2); c.fill(); } c.fillStyle = '#fff'; for (const sd of [-1, 1]) { c.beginPath(); c.arc(sd * 2.7 - .5, -19.6, .55, 0, Math.PI * 2); c.fill(); }
    c.fillStyle = sk.sh; c.strokeStyle = sk.rim; c.lineWidth = 2.6; c.beginPath(); c.ellipse(0, 0, 11.5, 14, 0, 0, Math.PI * 2); c.fill(); c.stroke();
    const plates = sk.plates || [sk.plate]; c.globalAlpha = s.fade * .7;
    [[0, -1, 4.8, 5.8], [-6.2, -5, 3, 3.6], [6.2, -5, 3, 3.6], [-6.4, 4.5, 3, 3.6], [6.4, 4.5, 3, 3.6]].forEach(([px2, py2, rx, ry], k) => { c.fillStyle = plates[k % plates.length]; c.beginPath(); c.ellipse(px2, py2, rx, ry, 0, 0, Math.PI * 2); c.fill(); });
    if (sk.dots) { c.fillStyle = sk.dots; for (const [dx, dy] of [[-3, 7], [4, 8], [-7, 0], [7, -1]]) { c.beginPath(); c.arc(dx, dy, 1.3, 0, Math.PI * 2); c.fill(); } }
    c.globalAlpha = s.fade * .35; c.fillStyle = '#fff'; c.beginPath(); c.ellipse(-4, -6, 3.4, 5, -.4, 0, Math.PI * 2); c.fill();
    c.restore();
    if (s.st === 'tang') { const c2 = cx, k = (t * 3) % 1; c2.strokeStyle = `rgba(255,120,90,${(1 - k).toFixed(2)})`; c2.lineWidth = 3 * U; c2.beginPath(); c2.arc(s.x, y, (18 + k * 14) * U, 0, Math.PI * 2); c2.stroke(); }
  }
  function drawLitter(l) {
    const c = cx, y = SY(l.y), k = l.gone ? 1 + l.gone * .8 : 1, a = l.gone ? Math.max(0, 1 - l.gone) : 1, sh = l.shk > 0 ? Math.sin(l.shk * 60) * 3 * U : 0;
    c.save(); c.globalAlpha = a; c.translate(l.x + sh, y); c.rotate(l.rot); c.scale(k * U * 1.3, k * U * 1.3); c.lineJoin = 'round'; c.lineCap = 'round';
    if (l.k === 'bag') {   // a plastic bag: pale, crinkled, with handles. It does look like a jellyfish, on purpose
      const w = 1 + Math.sin(l.ph) * .06; c.scale(w, 2 - w);
      c.fillStyle = 'rgba(250,252,255,.72)'; c.strokeStyle = 'rgba(255,255,255,.95)'; c.lineWidth = 2;
      c.beginPath(); c.moveTo(-14, -6); c.quadraticCurveTo(-18, 12, -8, 20); c.lineTo(8, 20); c.quadraticCurveTo(18, 12, 14, -6); c.closePath(); c.fill(); c.stroke();
      c.beginPath(); c.moveTo(-14, -6); c.quadraticCurveTo(-13, -20, -6, -8); c.moveTo(14, -6); c.quadraticCurveTo(13, -20, 6, -8); c.lineWidth = 3; c.stroke();
      c.strokeStyle = 'rgba(160,180,200,.6)'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(-6, 0); c.lineTo(-3, 14); c.moveTo(4, -2); c.lineTo(6, 13); c.stroke();
    } else if (l.k === 'rings') {   // six-pack rings
      c.strokeStyle = 'rgba(235,245,255,.95)'; c.lineWidth = 3.2; c.fillStyle = 'rgba(220,235,250,.25)';
      for (let r = 0; r < 2; r++) for (let q = 0; q < 3; q++) { c.beginPath(); c.ellipse((q - 1) * 11, (r - .5) * 11, 5.6, 5, 0, 0, Math.PI * 2); c.fill(); c.stroke(); }
    } else if (l.k === 'bottle') {
      c.fillStyle = 'rgba(80,170,240,.85)'; c.strokeStyle = '#1f5fae'; c.lineWidth = 1.6; c.beginPath(); c.roundRect ? c.roundRect(-6, -14, 12, 26, 5) : c.rect(-6, -14, 12, 26); c.fill(); c.stroke();
      c.fillStyle = '#1f5fae'; c.fillRect(-3, -19, 6, 5); c.fillStyle = 'rgba(255,244,214,.95)'; c.fillRect(-6, -3, 12, 7); c.fillStyle = 'rgba(255,255,255,.5)'; c.fillRect(-4, -12, 2.4, 20);
    } else if (l.k === 'balloon') {
      c.strokeStyle = 'rgba(255,255,255,.8)'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(0, 12); for (let i = 1; i <= 6; i++) c.lineTo(Math.sin(i * 1.4 + l.ph) * 4, 12 + i * 5); c.stroke();
      c.fillStyle = '#ff6b8a'; c.strokeStyle = '#c23e5c'; c.lineWidth = 1.6; c.beginPath(); c.ellipse(0, -2, 11, 13, 0, 0, Math.PI * 2); c.fill(); c.stroke();
      c.beginPath(); c.moveTo(-2.5, 11); c.lineTo(2.5, 11); c.lineTo(0, 13.5); c.closePath(); c.fill(); c.fillStyle = 'rgba(255,255,255,.6)'; c.beginPath(); c.ellipse(-4, -7, 3, 4.5, -.4, 0, Math.PI * 2); c.fill();
    } else if (l.k === 'net') {   // a piece of ghost net: three taps
      c.strokeStyle = 'rgba(140,220,200,.9)'; c.lineWidth = 1.6;
      c.beginPath(); for (let i = -3; i <= 3; i++) { c.moveTo(-30, i * 7 + Math.sin(i + l.ph) * 2); c.quadraticCurveTo(0, i * 7 + 5, 30, i * 7 - Math.sin(i + l.ph) * 2); c.moveTo(i * 9, -22); c.quadraticCurveTo(i * 9 + 4, 0, i * 9 - 2, 22); } c.stroke();
      c.fillStyle = '#ff9a3c'; for (const [fx, fy] of [[-26, -20], [26, -18], [0, 23]]) { c.beginPath(); c.arc(fx, fy, 4, 0, Math.PI * 2); c.fill(); }
      c.fillStyle = '#fff'; for (let i = 0; i < 3; i++) { c.globalAlpha = a * (i < l.hp ? 1 : .25); c.beginPath(); c.arc((i - 1) * 9, -34, 3.2, 0, Math.PI * 2); c.fill(); }
    }
    c.restore();
  }
  function drawJelly(j) {
    const c = cx, y = SY(j.y), pu = Math.max(0, Math.sin(j.ph)), e = j.eaten ? Math.max(0, 1 - j.eaten) : 1, wb = j.wob > 0 ? Math.sin(j.wob * 40) * .08 : 0;
    c.save(); c.globalAlpha = e; c.translate(j.x, y); c.scale(U * 1.3 * e * (1 + wb), U * 1.3 * e * (1 - pu * .14 - wb)); c.lineCap = 'round';
    const col = j.hue ? ['rgba(190,160,255,.75)', '#a98bf0'] : ['rgba(255,170,210,.78)', '#f08bbd'];
    c.strokeStyle = col[1]; c.lineWidth = 2; for (let i = -2; i <= 2; i++) { c.beginPath(); c.moveTo(i * 4.5, 6); for (let k = 1; k <= 5; k++) c.lineTo(i * 4.5 + Math.sin(j.ph * 1.5 + k + i) * 3, 6 + k * 5); c.stroke(); }
    const bg = c.createRadialGradient(-4, -8, 2, 0, -2, 18); bg.addColorStop(0, 'rgba(255,255,255,.9)'); bg.addColorStop(1, col[0]); c.fillStyle = bg;
    c.beginPath(); c.moveTo(-16, 6); c.quadraticCurveTo(-17, -16, 0, -16); c.quadraticCurveTo(17, -16, 16, 6); c.quadraticCurveTo(0, 2, -16, 6); c.fill();
    c.fillStyle = col[1]; for (const [dx, dy] of [[-6, -5], [6, -5], [0, -9]]) { c.beginPath(); c.arc(dx, dy, 2.2, 0, Math.PI * 2); c.fill(); }
    c.restore();
  }
  function drawRaft(x, y) {   // a floating mat of golden seaweed with little air bladders
    const c = cx; c.save(); c.translate(x, y); c.scale(U, U);
    for (let i = 0; i < 26; i++) { const a = i * 2.4, r = 20 + (i % 7) * 9, px2 = Math.cos(a) * r * 1.5, py2 = Math.sin(a) * r * .7; c.fillStyle = i % 3 ? '#c99a3c' : '#e0b450'; c.save(); c.translate(px2, py2); c.rotate(a + Math.sin(t + i) * .2); c.beginPath(); c.ellipse(0, 0, 13, 5, 0, 0, Math.PI * 2); c.fill(); c.restore(); }
    c.fillStyle = '#f2cf6a'; for (let i = 0; i < 18; i++) { const a = i * 1.9, r = 14 + (i % 5) * 12; c.beginPath(); c.arc(Math.cos(a) * r * 1.4, Math.sin(a) * r * .6, 3.4, 0, Math.PI * 2); c.fill(); }
    c.restore();
  }
  function result() {
    if (shown) return; shown = true; slow = 1; cap.classList.remove('on');
    const reached = school.filter((s) => s.st !== 'lost').length, shells = Math.min(6, cleared / 2 | 0) + (!skipped && tangles === 0 ? 2 : 0);
    PROG.shells = (PROG.shells || 0) + shells; PROG.swimSeen = 1; saveProg(); ui.fact('sea');
    track('swim_end', { n: opt.n, reached, cleared, tangles, shells, skipped, t: Math.round(t) });
    const v = document.createElement('div'); v.className = 'veil';
    v.innerHTML = `<div class="card"><div class="ribbon">Out to sea!</div><div class="inner">
      <div class="res"><div class="tu">${ICON.turtle(skinNow)}</div><div><div class="big"><b>0</b><span> / ${opt.n}</span></div><div class="lbl">reached the open sea</div></div></div>
      <div class="srow"><div class="stat">${ICON.bin}<span>${cleared} plastic cleared</span></div><div class="stat sh">${ICON.shell}<span>+<b>0</b></span></div></div>
      ${!skipped && tangles === 0 ? `<div class="bonus met">${ICON.check}<span>Nobody got tangled</span><b>+2</b></div>` : ''}
      ${fieldNote(FACTCARD.sea)}
      <div class="btns"><button class="b-green hero pop-in" id="swc" style="animation-delay:.35s">${ICON.play}Continue</button></div></div></div>`;
    el.appendChild(v); countUp(v.querySelector('.big b'), reached, 600); if (shells) setTimeout(() => { countUp(v.querySelector('.stat.sh b'), shells, 500); sfx.coin(); }, 600);
    v.querySelector('#swc').onclick = () => { au(); wipe(() => { gone = true; cancelAnimationFrame(raf); removeEventListener('resize', size); el.remove(); swimOn = false; opt.onDone(); }); };
  }
  el._dbg = { L, J, school, top: () => camTop() };
  const frame = (ts) => { if (gone) return; const raw = Math.min(.05, (ts - lastTs) / 1000 || 0) * (opt.ts || 1); lastTs = ts; update(raw * slow); draw(); raf = requestAnimationFrame(frame); };
  raf = requestAnimationFrame(frame);
}
