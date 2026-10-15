/* ===================== UI: icons (sheet 21), panels (sheet 22), telegraphs (sheet 20), effects (sheet 19) ===================== */
const ICON = {
  moon: '<svg viewBox="0 0 32 32"><path d="M20 4a12 12 0 1 0 8 19A11 11 0 0 1 20 4z" fill="#FFF3C4"/><circle cx="13" cy="13" r="1.6" fill="#e6d9a8"/><circle cx="16" cy="21" r="1.2" fill="#e6d9a8"/></svg>',
  turtle: (c = '#7DB05A', sh = '#3E6B3A', badge) => `<svg viewBox="0 0 32 32"><g transform="translate(14 17)"><ellipse cx="-8" cy="-5" rx="4" ry="2.4" fill="${c}" transform="rotate(-35 -8 -5)"/><ellipse cx="8" cy="-5" rx="4" ry="2.4" fill="${c}" transform="rotate(35 8 -5)"/><ellipse cx="-7" cy="6" rx="3" ry="2" fill="${c}" transform="rotate(30 -7 6)"/><ellipse cx="7" cy="6" rx="3" ry="2" fill="${c}" transform="rotate(-30 7 6)"/><circle cx="0" cy="-11" r="4.6" fill="${c}"/><circle cx="-1.7" cy="-11.6" r="1.1" fill="#14161c"/><circle cx="1.7" cy="-11.6" r="1.1" fill="#14161c"/><ellipse cx="0" cy="0.5" rx="8" ry="9" fill="${sh}"/><path d="M0-5l3.4 2v4L0 3l-3.4-2v-4z" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="1.1"/></g>${badge || ''}</svg>`,
  ok: '<circle cx="25" cy="8" r="6" fill="#FFF3C4"/><path d="M22 8l2 2 4-4" fill="none" stroke="#3E6B3A" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
  x: '<circle cx="25" cy="8" r="6" fill="#FFF3C4"/><path d="M22.5 5.5l5 5m0-5l-5 5" stroke="#D93A3A" stroke-width="2.2" stroke-linecap="round"/>',
  bin: '<svg viewBox="0 0 32 32"><rect x="7" y="5" width="18" height="4" rx="2" fill="#5fb0f5"/><rect x="13" y="2.5" width="6" height="3" rx="1.5" fill="#5fb0f5"/><path d="M8 10h16l-1.6 18H9.6z" fill="#2f8be0"/><g fill="none" stroke="#FFF3C4" stroke-width="1.8" stroke-linecap="round"><path d="M14 15.5l2-2.5 2 2.5"/><path d="M19.5 19.5l.8 2.7-3 .3"/><path d="M12.5 22.5l-1.3-2.4 2.6-1.2"/></g></svg>',
  star: '<svg viewBox="0 0 32 32"><defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe680"/><stop offset=".55" stop-color="#ffc928"/><stop offset="1" stop-color="#f59a00"/></linearGradient></defs><path d="M16 2.8l4 8.3 9.1 1.2-6.6 6.3 1.7 9-8.2-4.4-8.2 4.4 1.7-9-6.6-6.3 9.1-1.2z" fill="url(#sg)" stroke="#16243b" stroke-width="2.3" stroke-linejoin="round"/><path d="M11.5 12.6l2.6-.4 1.2-2.5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" fill="none" opacity=".85"/></svg>',
  starOff: '<svg viewBox="0 0 32 32"><path d="M16 2.8l4 8.3 9.1 1.2-6.6 6.3 1.7 9-8.2-4.4-8.2 4.4 1.7-9-6.6-6.3 9.1-1.2z" fill="#2a3f66" stroke="#16243b" stroke-width="2.3" stroke-linejoin="round"/><path d="M16 8.5l2.3 4.7 5.2.7-3.8 3.6 1 5.1L16 20.1l-4.7 2.5 1-5.1-3.8-3.6 5.2-.7z" fill="#22355a"/></svg>',
  play: '<svg viewBox="0 0 24 24"><path d="M7 4.5v15l12-7.5z" fill="currentColor"/></svg>',
  ad: '<svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="4" fill="#2f8be0"/><path d="M10 9v6l5-3z" fill="#FFF3C4"/></svg>',
  retry: '<svg viewBox="0 0 24 24"><path d="M5 12a7 7 0 1 0 2-5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M4 3v5h5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  sndOn: '<svg viewBox="0 0 32 32"><path d="M5 12h5l7-6v20l-7-6H5z" fill="#6fd1c8"/><path d="M21 11a6 6 0 0 1 0 10M24 7a11 11 0 0 1 0 18" fill="none" stroke="#FFF3C4" stroke-width="2.4" stroke-linecap="round"/></svg>',
  sndOff: '<svg viewBox="0 0 32 32"><path d="M5 12h5l7-6v20l-7-6H5z" fill="#6fd1c8" opacity=".55"/><path d="M21 12l7 8m0-8l-7 8" stroke="#FFF3C4" stroke-width="2.4" stroke-linecap="round"/></svg>',
  map: '<svg viewBox="0 0 24 24"><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" fill="currentColor" opacity=".9"/><path d="M9 4v14M15 6v14" stroke="#1d3157" stroke-width="1.4"/></svg>',
  pause: '<svg viewBox="0 0 32 32"><rect x="8" y="6" width="6" height="20" rx="2.5" fill="#FFF3C4"/><rect x="18" y="6" width="6" height="20" rx="2.5" fill="#FFF3C4"/></svg>',
  clean: '<svg viewBox="0 0 32 32"><path d="M21 3l6 6-9 9-6-6z" fill="#c9a06a"/><path d="M12 13l6 6-6 8c-2 2-6 2-9 0 4-1 5-3 5-6z" fill="#E0B040"/><circle cx="26" cy="22" r="1.8" fill="#FFF3C4"/><circle cx="22" cy="28" r="1.2" fill="#FFF3C4"/><circle cx="27" cy="27" r="1" fill="#FFF3C4"/></svg>',
  surge: '<svg viewBox="0 0 32 32"><path d="M20 4a11 11 0 1 0 8 20A10 10 0 0 1 20 4z" fill="#FFF3C4"/><path d="M5 8l4 1.5M3 16h5M5 24l4-1.5" stroke="#E0B040" stroke-width="2.4" stroke-linecap="round"/></svg>',
  ranger: '<svg viewBox="0 0 32 32"><path d="M16 3l11 4v8c0 7-5 12-11 14C10 27 5 22 5 15V7z" fill="#4f7d36"/><path d="M16 9l2.2 4.6 5 .6-3.7 3.4 1 5-4.5-2.5-4.5 2.5 1-5-3.7-3.4 5-.6z" fill="#E0B040"/></svg>',
  gift: '<svg viewBox="0 0 24 24"><rect x="3" y="9" width="18" height="12" rx="2" fill="#fff3c4"/><rect x="2" y="6" width="20" height="5" rx="2" fill="#fff"/><rect x="10.5" y="6" width="3" height="15" fill="#E8664A"/><path d="M12 6c-3-4-7-2-5 0zM12 6c3-4 7-2 5 0z" fill="#E8664A"/></svg>',
  shop: '<svg viewBox="0 0 24 24"><path d="M5 8h14l-1 12H6z" fill="#6fd1c8"/><path d="M9 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="#FFF3C4" stroke-width="2" stroke-linecap="round"/></svg>',
  flame: '<svg viewBox="0 0 24 24"><path d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-4 3-6 1 2 2 2 2 2 1-2 1-5 1-8z" fill="#E8664A"/><path d="M12 12c2 2 3 3 3 5a3 3 0 0 1-6 0c0-2 2-3 3-5z" fill="#FFD166"/></svg>',
  heart: '<svg viewBox="0 0 24 24"><path d="M12 21C5 15.5 2.5 12 2.5 8.2A5 5 0 0 1 12 6a5 5 0 0 1 9.5 2.2C21.5 12 19 15.5 12 21z" fill="#E8664A" stroke="#a8432d" stroke-width="1.4" stroke-linejoin="round"/><path d="M6.5 8.5a2.6 2.6 0 0 1 2.4-2" stroke="#fff" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".7"/></svg>',
  heartX: '<svg viewBox="0 0 24 24"><path d="M12 21C5 15.5 2.5 12 2.5 8.2A5 5 0 0 1 12 6a5 5 0 0 1 9.5 2.2C21.5 12 19 15.5 12 21z" fill="#ffffff" fill-opacity=".16" stroke="#ffffff" stroke-opacity=".4" stroke-width="1.4" stroke-linejoin="round" stroke-dasharray="2.5 2"/></svg>',
  vib: '<svg viewBox="0 0 24 24"><rect x="7.5" y="3" width="9" height="18" rx="2.5" fill="#6fd1c8" stroke="#16243b" stroke-width="1.6"/><path d="M4 8v8M20 8v8M1.8 10v4M22.2 10v4" stroke="#FFF3C4" stroke-width="1.8" stroke-linecap="round"/></svg>',
  crown: '<svg viewBox="0 0 36 28"><path d="M3 24L5 7l8 8 5-12 5 12 8-8 2 17z" fill="#ffd23f" stroke="#16243b" stroke-width="2.4" stroke-linejoin="round"/><circle cx="18" cy="18" r="2.6" fill="#e5533a" stroke="#16243b" stroke-width="1.4"/></svg>',
  pin: '<svg viewBox="0 0 24 24"><path d="M12 22s7-7.2 7-12.4A7 7 0 0 0 5 9.6C5 14.8 12 22 12 22z" fill="#ff8a6b" stroke="#16243b" stroke-width="2"/><circle cx="12" cy="9.6" r="2.6" fill="#fff4d6"/></svg>',
  gear: '<svg viewBox="0 0 32 32"><path d="M13.5 3h5l.8 3.6 2.6 1.1 3.1-2 3.5 3.5-2 3.1 1.1 2.6 3.6.8v5l-3.6.8-1.1 2.6 2 3.1-3.5 3.5-3.1-2-2.6 1.1-.8 3.6h-5l-.8-3.6-2.6-1.1-3.1 2-3.5-3.5 2-3.1-1.1-2.6L2 18.5v-5l3.6-.8 1.1-2.6-2-3.1 3.5-3.5 3.1 2 2.6-1.1z" fill="#FFF3C4"/><circle cx="16" cy="16" r="4.4" fill="#24406b"/></svg>',
  crew: '<svg viewBox="0 0 32 32"><path d="M16 4c5 0 9 4 9 9 0 6-4 11-9 15-5-4-9-9-9-15 0-5 4-9 9-9z" fill="#fff3c4"/><path d="M16 9l3 2v4l-3 2-3-2v-4z" fill="#e5533a"/></svg>',
  heartS: '<svg viewBox="0 0 24 24"><path d="M12 21C5 15.5 2.5 12 2.5 8.2A5 5 0 0 1 12 6a5 5 0 0 1 9.5 2.2C21.5 12 19 15.5 12 21z" fill="#E8664A" stroke="#16243b" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  leafB: '<svg viewBox="0 0 24 24"><path d="M4 20C4 9 11 4 21 4c0 10-5 16-15 16" fill="#fff4d6"/><path d="M5 19c4-5 8-8 12-11" stroke="#3f8a2c" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>',
  leaf: '<svg viewBox="0 0 24 24"><path d="M4 20C4 9 11 4 21 4c0 10-5 16-15 16" fill="#7DB05A"/><path d="M5 19c4-5 8-8 12-11" stroke="#4f7d36" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>'
};
const ui = {};
const k = () => W / 390;

/* ---------- HUD ---------- */
ui.hud = function (bumpWhich) {
  $('#nightP').innerHTML = `${ICON.moon}<span class="sub">LEVEL</span><span>${night + 1}</span>`;
  $('#safeP').innerHTML = `${ICON.turtle(undefined, undefined, ICON.ok)}<span>${safeN}</span><span class="sub">/${total}</span>`;
  const al = allowedLoss(), hn = Math.min(al, 9), left = Math.max(0, hn - lostN);
  $('#lostP').innerHTML = al > 0 && !attract ? Array.from({ length: hn }, (_, i) => `<span class="ht ${i < left ? '' : 'gone'} ${bumpWhich === 'lost' && i === left ? 'brk' : ''}">${i < left ? ICON.heart : ICON.heartX}</span>`).join('') : ''; $('#lostP').classList.toggle('on', al > 0 && !attract); $('#lostP').classList.toggle('last', al > 0 && lostN >= al);
  $('#binP').innerHTML = `${ICON.bin}<span>${binnedN}</span>`;
  const bump = (sel) => { const e = $(sel); e.classList.remove('bump'); void e.offsetWidth; e.classList.add('bump'); };
  if (bumpWhich === 'safe') bump('#safeP'); else if (bumpWhich === 'lost') bump('#lostP'); else if (bumpWhich !== undefined) bump('#binP');
};
$('#snd').innerHTML = muted ? ICON.sndOff : ICON.sndOn;
$('#snd').onclick = (e) => { e.stopPropagation(); au(); setMuted(!muted); $('#snd').innerHTML = muted ? ICON.sndOff : ICON.sndOn; };
let bannerTO = 0;
ui.night = function () {
  levelFacts = []; ui.hud(); if (!started) return;
  const L = spec; if (L.attract) return; $('#bannerT').className = 'ribbon' + (L.big ? ' coral' : '');
  $('#bannerT').innerHTML = `<small>${L.big ? 'BIG HATCH · LEVEL ' + (night + 1) : 'LEVEL ' + (night + 1)}</small><i class="place">${L.place || CHAPTERS[(night / 10 | 0) % CHAPTERS.length]}</i>${L.name}${L.new ? `<span class="new">NEW · ${L.new}</span>` : L.tag ? `<span class="new tag">${L.tag}</span>` : ''}`;
  $('#banner').classList.add('on'); clearTimeout(bannerTO); bannerTO = setTimeout(() => $('#banner').classList.remove('on'), L.new ? 3800 : 2400); if (L.big) { buzz([30, 40, 30]); }
};
let capT = 0;
ui.danger = (on) => { const d = $('#dng'); if (d) d.classList.toggle('on', !!on); };
ui.cap = function (s, d) { if (attract) return; const c = $('#cap'); c.textContent = s; c.classList.add('on'); capT = d; };
ui.capOff = function () { $('#cap').classList.remove('on'); capT = 0; };

/* ---------- overlay effects (crisp 2D on top of 3D) ---------- */
const fx = [], floats = []; let comboFx = null;
ui.fx = (kind, x, y, z, sx, sy) => fx.push({ kind, x, y, z, sx, sy, t: 0, life: { sparkle: .7, heart: .9, recycle: .9, twinkle: .8, splash: .9, ring: .6, flash: .4 }[kind] || .7, r: Math.random() * 6 });
ui.float = (x, y, z, s) => floats.push({ x, y, z, s, t: 0 });
ui.ripple = (px, py, c) => fx.push({ kind: 'tap', sx: px, sy: py, t: 0, life: .4, c });
ui.combo = (n, kind) => { comboFx = { n, kind, t: 0 }; };
function star4(x, y, r, rot) { oc.beginPath(); for (let i = 0; i < 8; i++) { const a = rot + i * Math.PI / 4, rr = i % 2 ? r * .32 : r; oc.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } oc.closePath(); oc.fill(); }
function heartP(x, y, s) { oc.beginPath(); oc.moveTo(x, y + s * .35); oc.bezierCurveTo(x - s * 1.1, y - s * .35, x - s * .45, y - s * 1.05, x, y - s * .45); oc.bezierCurveTo(x + s * .45, y - s * 1.05, x + s * 1.1, y - s * .35, x, y + s * .35); oc.fill(); }
function recycleP(x, y, s) {
  oc.fillStyle = '#2f8be0'; oc.beginPath(); oc.arc(x, y, s, 0, 6.3); oc.fill(); oc.strokeStyle = '#FFF3C4'; oc.lineWidth = s * .16; oc.lineCap = 'round'; oc.lineJoin = 'round';
  for (let i = 0; i < 3; i++) { const a = -Math.PI / 2 + i * 2.094; oc.beginPath(); oc.arc(x, y, s * .52, a + .25, a + 1.75); oc.stroke(); const e = a + 1.75, ex = x + Math.cos(e) * s * .52, ey = y + Math.sin(e) * s * .52; oc.beginPath(); oc.moveTo(ex + Math.cos(e - 1.2) * s * .22, ey + Math.sin(e - 1.2) * s * .22); oc.lineTo(ex, ey); oc.lineTo(ex + Math.cos(e - 2.6) * s * .22, ey + Math.sin(e - 2.6) * s * .22); oc.stroke(); }
}
function segRing(x, y, r, frac, w) {
  // 8 rounded segments (sheet 20): green -> gold -> red as time runs out, spent segments navy
  const n = 8, col = frac > .6 ? '#7DB05A' : frac > .3 ? '#E0B040' : '#E8664A';
  oc.lineWidth = w; oc.lineCap = 'round';
  for (let i = 0; i < n; i++) { const a0 = -Math.PI / 2 + i / n * 6.283 + .12, a1 = a0 + 6.283 / n - .24; oc.strokeStyle = i / n < frac ? col : 'rgba(18,32,58,.75)'; oc.beginPath(); oc.arc(x, y, r, a0, a1); oc.stroke(); }
}
const drops = Array.from({ length: 150 }, () => ({ x: Math.random(), y: Math.random(), v: .9 + Math.random() * .9, l: .018 + Math.random() * .02 }));
function weatherFx(K) {
  if (LK.rain) {
    oc.strokeStyle = 'rgba(205,225,255,.32)'; oc.lineWidth = 1.3 * K; oc.lineCap = 'round'; oc.beginPath();
    const dt = Math.min(.05, lastRaw || .016);
    for (const d of drops) { d.y += d.v * dt * 1.6; d.x -= d.v * dt * .35; if (d.y > 1.05) { d.y = -.05; d.x = Math.random() * 1.3; } const x = d.x * W, y = d.y * H; oc.moveTo(x, y); oc.lineTo(x - d.l * W * .25, y - d.l * H); }
    oc.stroke();
    if (Math.random() < dt * 6) ui.fx('ring', (Math.random() - .5) * 9, 0, -4 + Math.random() * 11);
    oc.fillStyle = 'rgba(8,16,34,.09)'; oc.fillRect(0, 0, W, H);
  }
  if (surgeT > 0) { const s = scr(0, 0, SHORE_Z), a = Math.min(1, surgeT) * .3, g = oc.createRadialGradient(s.x, s.y, 10, s.x, s.y, W * 1.1); g.addColorStop(0, `rgba(255,236,160,${a})`); g.addColorStop(1, 'rgba(255,236,160,0)'); oc.fillStyle = g; oc.fillRect(0, 0, W, H); }
  if (bolt > 0) { oc.fillStyle = `rgba(225,238,255,${Math.min(.6, bolt * .6)})`; oc.fillRect(0, 0, W, H); }
}
function overlay() {
  oc.clearRect(0, 0, W, H); const K = k(); weatherFx(K);
  // gull target: red segmented ring with inward arrows, tightening
  for (const g of gulls) if (g.st === 'dive' && g.tgt) {
    const s = scr(g.tgt.x, .1, g.tgt.z), p = 1 - clamp(g.dT / 1.75, 0, 1), r = (40 - p * 14) * K, pulse = .7 + .3 * Math.sin(time * 22);
    oc.globalAlpha = pulse; oc.strokeStyle = '#E8664A'; oc.lineWidth = 6 * K; oc.lineCap = 'round';
    for (let i = 0; i < 8; i++) { const a0 = i / 8 * 6.283 + .2, a1 = a0 + .5; oc.beginPath(); oc.arc(s.x, s.y, r, a0, a1); oc.stroke(); }
    oc.fillStyle = '#E8664A'; for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2, x = s.x + Math.cos(a) * (r + 9 * K), y = s.y + Math.sin(a) * (r + 9 * K); oc.save(); oc.translate(x, y); oc.rotate(a); oc.beginPath(); oc.moveTo(-6 * K, 0); oc.lineTo(5 * K, -7 * K); oc.lineTo(5 * K, 7 * K); oc.closePath(); oc.fill(); oc.restore(); }
    oc.globalAlpha = 1;
  }
  // crab paths: dotted footprints toward the hatchling it is chasing
  for (const c of crabs) if (c.st === 'walk' && c.tgt) {
    const a = scr(c.x, .02, c.z), b = scr(c.tgt.x, .02, c.tgt.z), L = Math.hypot(b.x - a.x, b.y - a.y); if (L < 30 * K) continue;
    const ux = (b.x - a.x) / L, uy = (b.y - a.y) / L; oc.fillStyle = 'rgba(18,32,58,.55)';
    for (let d = 22 * K; d < L - 22 * K; d += 13 * K) { const off = ((d / (13 * K)) | 0) % 2 ? 3 : -3; oc.beginPath(); oc.ellipse(a.x + ux * d - uy * off * K, a.y + uy * d + ux * off * K, 2.6 * K, 1.8 * K, Math.atan2(uy, ux), 0, 6.3); oc.fill(); }
    const tx = b.x - ux * 20 * K, ty = b.y - uy * 20 * K; oc.save(); oc.translate(tx, ty); oc.rotate(Math.atan2(uy, ux)); oc.beginPath(); oc.moveTo(7 * K, 0); oc.lineTo(-5 * K, -6 * K); oc.lineTo(-5 * K, 6 * K); oc.closePath(); oc.fill(); oc.restore();
  }
  // rescue timers
  for (const t of T) if (t.st === 'flip' || t.st === 'tangle') {
    const s = scr(t.x, .3, t.z), p = clamp(t.flipT / (t.st === 'flip' ? 5 : 5.5), 0, 1);
    segRing(s.x, s.y, 30 * K, p, 6 * K);
    if (p < .3) { oc.globalAlpha = .5 + .5 * Math.sin(time * 16); oc.strokeStyle = '#fff'; oc.lineWidth = 2 * K; oc.beginPath(); oc.arc(s.x, s.y, 37 * K, 0, 6.3); oc.stroke(); oc.globalAlpha = 1; }
  }
  // stuck / dazzled marks
  oc.font = `400 ${17 * K}px 'Lilita One',ui-rounded,system-ui,sans-serif`; oc.textAlign = 'center'; oc.textBaseline = 'middle';
  for (const t of T) if (t.st === 'walk' && (t.stuck > .5 || t.lure > 0)) { const s = scr(t.x, .55, t.z); const m = t.lure > 0 ? '✦' : '?'; const bob = Math.sin(time * 5 + t.ph) * 2 * K; oc.fillStyle = '#FFF3C4'; oc.strokeStyle = 'rgba(18,32,58,.7)'; oc.lineWidth = 4 * K; oc.strokeText(m, s.x, s.y - 10 * K + bob); oc.fillText(m, s.x, s.y - 10 * K + bob); }
  // effects
  for (let i = fx.length - 1; i >= 0; i--) {
    const p = fx[i]; p.t += lastRaw; if (p.t > p.life) { fx.splice(i, 1); continue; }
    const u = p.t / p.life, a = 1 - u; oc.globalAlpha = a;
    if (p.kind === 'tap') { oc.strokeStyle = p.c; oc.lineWidth = 3 * K; oc.beginPath(); oc.arc(p.sx, p.sy, (10 + u * 60) * K, 0, 6.3); oc.stroke(); continue; }
    const s = p.kind === 'twinkle' ? { x: p.sx, y: p.sy } : scr(p.x, p.y, p.z);
    if (p.kind === 'sparkle') { oc.fillStyle = '#FFF3C4'; for (let j = 0; j < 5; j++) { const ang = p.r + j * 1.256, d = (8 + u * 34) * K; oc.fillStyle = j % 2 ? '#E0B040' : '#FFF3C4'; star4(s.x + Math.cos(ang) * d, s.y + Math.sin(ang) * d - u * 10 * K, (7 - u * 4) * K, u * 2); } }
    else if (p.kind === 'heart') { oc.fillStyle = '#E8664A'; heartP(s.x + Math.sin(u * 9) * 4 * K, s.y - u * 36 * K, (9 + Math.sin(u * 3.1) * 3) * K); }
    else if (p.kind === 'recycle') { const sc = u < .25 ? ease(u / .25) * 1.25 : 1.25 - (u - .25) * .35; recycleP(s.x, s.y - u * 20 * K, 15 * K * sc); }
    else if (p.kind === 'twinkle') { oc.fillStyle = '#FFF3C4'; star4(s.x, s.y, (6 + Math.sin(u * 3.1) * 10) * K, u * 1.5); }
    else if (p.kind === 'splash' || p.kind === 'ring') { oc.strokeStyle = p.kind === 'splash' ? '#eaf9f6' : 'rgba(255,255,255,.7)'; oc.lineWidth = 2.5 * K; for (const off of p.kind === 'splash' ? [0, .25] : [0]) { const v = clamp(u - off, 0, 1); if (v <= 0) continue; oc.beginPath(); oc.ellipse(s.x, s.y, (6 + v * 34) * K, (2.5 + v * 12) * K, 0, 0, 6.3); oc.stroke(); } }
    else if (p.kind === 'flash') { oc.globalAlpha = a * .9; const g = oc.createRadialGradient(s.x, s.y, 0, s.x, s.y, 130 * K); g.addColorStop(0, 'rgba(255,255,240,1)'); g.addColorStop(1, 'rgba(255,255,240,0)'); oc.fillStyle = g; oc.fillRect(s.x - 130 * K, s.y - 130 * K, 260 * K, 260 * K); oc.fillStyle = '#fff'; star4(s.x, s.y, 26 * K * a, 0); }
  }
  oc.globalAlpha = 1;
  // floating words
  oc.font = `400 ${22 * K}px 'Lilita One',ui-rounded,system-ui,sans-serif`; oc.lineJoin = 'round';
  for (let i = floats.length - 1; i >= 0; i--) { const f = floats[i]; f.t += lastRaw; if (f.t > 1.15) { floats.splice(i, 1); continue; } const s = scr(f.x, f.y, f.z); const pop = f.t < .15 ? .7 + f.t / .15 * .35 : 1.05 - Math.min(.05, (f.t - .15)); oc.save(); oc.translate(s.x, s.y - f.t * 44 * K); oc.scale(pop, pop); oc.globalAlpha = 1 - Math.max(0, f.t - .7) / .45; oc.fillStyle = '#FFF3C4'; oc.strokeStyle = 'rgba(18,32,58,.75)'; oc.lineWidth = 5 * K; oc.strokeText(f.s, 0, 0); oc.fillText(f.s, 0, 0); oc.restore(); }
  oc.globalAlpha = 1;
  if (comboFx) { comboFx.t += lastRaw; const p = comboFx.t; if (p > 1.3) comboFx = null; else { const sc = 1 + Math.max(0, .35 - p) * 1.6; oc.save(); oc.translate(W / 2, H * .27); oc.scale(sc, sc); oc.globalAlpha = Math.min(1, 1.7 - p); oc.font = `900 ${36 * K}px ui-rounded,system-ui,sans-serif`; oc.fillStyle = '#E0B040'; oc.strokeStyle = 'rgba(40,20,0,.65)'; oc.lineWidth = 7 * K; const s = `${{ tidy: 'Tidy', rescue: 'Rescue', shoo: 'Guard' }[comboFx.kind]} ×${comboFx.n}`; oc.strokeText(s, 0, 0); oc.fillText(s, 0, 0); oc.restore(); } }
  // teaching hand
  if (hand) {
    const o = hand.o, s = scr(o.x, hand.y, o.z), b = Math.sin(time * 6) * 6 * K;
    oc.save(); oc.translate(s.x + 10 * K, s.y + 14 * K + b); oc.strokeStyle = 'rgba(255,243,196,.9)'; oc.lineWidth = 3 * K; oc.beginPath(); oc.arc(-10 * K, -14 * K, (12 + (time * 30 % 20)) * K, 0, 6.3); oc.stroke();
    oc.fillStyle = '#FFF3C4'; oc.strokeStyle = '#12203A'; oc.lineWidth = 2.5 * K; oc.beginPath(); oc.roundRect(-5 * K, -14 * K, 10 * K, 30 * K, 5 * K); oc.roundRect(-5 * K, 6 * K, 24 * K, 24 * K, 9 * K); oc.fill(); oc.stroke(); oc.restore();
  }
  if (zoom < .98) { const a = (1 - zoom) * 1.7; const g = oc.createRadialGradient(W / 2, H / 2, H * .22, W / 2, H / 2, H * .75); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(5,10,25,${a})`); oc.fillStyle = g; oc.fillRect(0, 0, W, H); }
}

/* ---------- progress (saved on the device) ---------- */
const PROG = (() => { let d = { best: {}, unlocked: 0, done: 0, facts: {}, boosts: 0, saved: 0, streak: 0, lastDay: '', noAds: false, gift: 0 }; try { d = Object.assign(d, JSON.parse(localStorage.getItem('shellrun.v1') || '{}')); } catch (e) {} return d; })();
const saveProg = () => { try { localStorage.setItem('shellrun.v1', JSON.stringify(PROG)); } catch (e) {} };
const starTotal = () => Object.values(PROG.best).reduce((a, b) => a + b, 0);

/* ---------- modal state: the HUD steps aside whenever a panel is open ---------- */
const syncModal = () => $('#app').classList.toggle('modal', !!document.querySelector('.veil,.map'));
new MutationObserver(syncModal).observe($('#app'), { childList: true, subtree: true });
const countUp = (el, to, ms) => { const t0 = performance.now(); const step = (t) => { const u = Math.min(1, (t - t0) / ms), v = Math.round(to * (1 - Math.pow(1 - u, 3))); if (el.textContent !== String(v)) { el.textContent = v; if (v) tone(note(2 + (v % 7)), .04, 'triangle', .025); } if (u < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); };
const chapterOf = (i) => CHAPTERS[(i / 10 | 0) % CHAPTERS.length];
const panel = (ribbon, body, cls = '') => `<div class="card ${cls}"><div class="ribbon ${cls.includes('fail') ? 'coral' : ''}">${ribbon}</div><div class="inner">${body}</div></div>`;
const fieldNote = (txt, head = 'Field note') => txt ? `<div class="note"><div class="badge">${ICON.leafB}</div><div><small>${head}</small><p>${txt}</p></div></div>` : '';

/* ---------- end of level ---------- */
let rewardUsed = false, snap = null, lastAd = Date.now(), wins = 0;
function adBreak(then) {
  const v = document.createElement('div'); v.className = 'veil';
  v.innerHTML = `<div class="card" style="margin-top:0"><div class="inner" style="padding-top:20px"><div class="lbl" style="margin-bottom:8px">DEMO AD · a real ad plays here</div><div class="adbox">${ICON.ad}</div><div class="btns"><button class="b-green" id="adgo" disabled>Continue in 3</button></div></div></div>`;
  $('#ov').appendChild(v); let n = 3; const b = v.querySelector('#adgo');
  const iv = setInterval(() => { n--; if (n > 0) b.textContent = 'Continue in ' + n; else { clearInterval(iv); b.disabled = false; b.innerHTML = ICON.play + 'Continue'; } }, 1000);
  b.onclick = () => { v.remove(); lastAd = Date.now(); then(); };
}
function endNight() {
  const L = spec, need = Math.ceil(total * .7), pass = safeN >= need, stars = !pass ? 0 : safeN === total ? 3 : safeN / total >= .8 ? 2 : 1;
  ui.capOff(); hand = null; powerKind = null; ui.power();
  if (safeN === total) { sfx.win(); for (let i = 0; i < 7; i++) setTimeout(() => { burst3((Math.random() - .5) * 7, .6, SHORE_Z + .6 + Math.random() * 2, ['#ffd166', '#ffffff', '#8fd19e', '#6fd1c8', '#E8664A'], 26, { g: 2.2, up: 2.3, size: 1.1 }); tone(note(i * 2 + 4), .5, 'triangle', .1, 0, 0, .5); buzz(14); shake = .14; }, i * 150); } else sfx.safe(0);
  if (pass) { PROG.best[night] = Math.max(PROG.best[night] || 0, stars); PROG.unlocked = Math.max(PROG.unlocked, night + 1); }
  saveProg();
  const head = !pass ? 'Not this time' : safeN === total ? 'Perfect rescue!' : safeN >= total - 2 ? 'So close!' : 'Level complete!';
  const tidyPct = Math.round(tidy() * 100), back = Math.min(3, lostN), canBring = lostN > 0 && !rewardUsed;
  const nextI = night + 1, nextCh = Math.ceil(nextI / 10) * 10 || 10, toCh = nextCh - nextI;
  const goal = pass ? (nextI % 10 === 0 ? `${ICON.pin}New beach unlocked: <b>${chapterOf(nextI)}</b>` : `${ICON.star}<b>${starTotal()}</b> stars · ${toCh} level${toCh > 1 ? 's' : ''} to <b>${chapterOf(nextCh).split(' · ')[0]}</b>`)
    : `${ICON.turtle()}Save <b>${need}</b> of ${total} to pass`;
  const fact = FACTCARD[levelFacts[levelFacts.length - 1]] || L.fact;
  const hearts = '';
  const btns = pass
    ? `<button class="b-green hero pop-in" id="next" style="animation-delay:.65s">${ICON.play}Next level</button>
       ${canBring && stars < 3 ? `<button class="b-teal" id="bring">${ICON.ad}Bring back ${back} · video</button>` : ''}
       <div class="duo"><button class="b-navy" id="retry">${ICON.retry}Play again</button><button class="b-navy" id="maps">${ICON.map}Map</button></div>`
    : `<button class="b-green hero pop-in" id="retry" style="animation-delay:.5s">${ICON.retry}Try again</button>
       ${canBring ? `<button class="b-teal" id="bring">${ICON.ad}Bring back ${back} · video</button>` : ''}
       <div class="duo" style="grid-template-columns:1fr"><button class="b-navy" id="maps">${ICON.map}Level map</button></div>`;
  const v = document.createElement('div'); v.className = 'veil';
  v.innerHTML = `<div class="card ${pass ? '' : 'fail'}"><div class="stars"><div class="glow"></div>${[0, 1, 2].map((i) => i < stars ? ICON.star : ICON.starOff).join('')}</div><div class="ribbon ${pass ? '' : 'coral'}">${head}</div><div class="inner">
    <div class="res"><div class="tu">${ICON.turtle()}</div><div><div class="big"><b>0</b><span> / ${total}</span></div><div class="lbl">made it to the sea</div></div></div>
    ${hearts}
    <div class="srow"><div class="stat">${ICON.bin}<span>${binnedN}</span><div class="bar"><i style="width:0%"></i></div><span>${tidyPct}%</span></div></div>
    <div class="goal">${goal}</div>
    ${fieldNote(fact)}
    <div class="btns">${btns}</div></div></div>`;
  $('#ov').appendChild(v);
  const card = v.querySelector('.card');
  countUp(v.querySelector('.big b'), safeN, 600);
  setTimeout(() => { const b = v.querySelector('.bar i'); if (b) b.style.width = tidyPct + '%'; }, 380);
  v.querySelectorAll('.stars svg').forEach((s, i) => { setTimeout(() => { s.classList.add('show'); if (i < stars) { tone(note(4 + i * 2), .35, 'triangle', .13, 0, 0, .5); buzz(14 + i * 6); if (i === 2) v.querySelector('.stars').classList.add('lit'); } }, 260 + i * 210); });
  card.addEventListener('pointerdown', () => card.classList.add('skip'), { once: true });
  const b = v.querySelector('#bring');
  if (b) b.onclick = () => { b.disabled = true; let n = 3; b.innerHTML = `${ICON.ad}Demo ad · ${n}`; const iv = setInterval(() => { n--; if (n > 0) b.innerHTML = `${ICON.ad}Demo ad · ${n}`; else { clearInterval(iv); rewardUsed = true; safeN += back; lostN -= back; season.saved += back; v.remove(); endNight(); } }, 1000); };
  const nx = v.querySelector('#next');
  if (nx) nx.onclick = () => { au(); v.remove(); rewardUsed = false; wins++; const go = () => begin(night + 1); if (!PROG.noAds && night >= 3 && wins % 3 === 0 && Date.now() - lastAd > 60000) adBreak(go); else go(); };
  v.querySelector('#retry').onclick = () => { au(); v.remove(); rewardUsed = false; Object.assign(season, snap.season); begin(night); };
  v.querySelector('#maps').onclick = () => { au(); v.remove(); rewardUsed = false; showMap(); };
}
function begin(i) { snap = { season: { ...season } }; bin.n = 0; for (const m of bin.pile.children) m.visible = false; startNight(i); }

/* ---------- level map: a sand trail up the coast, level 1 at the bottom ---------- */
function showMap() {
  running = false; const cur = PROG.unlocked, N = Math.max(cur + 10, 24), RH = 104, Wd = 340, Ht = N * RH + 260;
  const px = (i) => Wd / 2 + Math.sin(i * .95) * 92, py = (i) => Ht - 120 - i * RH;
  let path = `M${px(0)} ${py(0) + 60}L${px(0)} ${py(0)}`; for (let i = 1; i < N; i++) { const cx = (px(i - 1) + px(i)) / 2; path += ` Q${px(i - 1)} ${(py(i - 1) + py(i)) / 2} ${cx} ${(py(i - 1) + py(i)) / 2} T${px(i)} ${py(i)}`; }
  let nodes = '';
  const lockI = '<svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="3" fill="#a9b8d6" stroke="#16243b" stroke-width="1.8"/><path d="M8 10V8a4 4 0 0 1 8 0v2" fill="none" stroke="#a9b8d6" stroke-width="2.6"/></svg>';
  for (let i = 0; i < N; i++) {
    const st = i < cur ? 'done' : i === cur ? 'cur' : 'lock', b = PROG.best[i] || 0, big = (i + 1) % 25 === 0, boss = !big && (i + 1) % 10 === 0;
    if (i % 10 === 0) nodes += `<div class="chap" style="top:${py(i) + 56}px"><small>Chapter ${i / 10 + 1}</small>${chapterOf(i)}</div>`;
    nodes += `<button class="node ${st}${big ? ' big boss' : boss ? ' boss' : ''}" data-i="${i}" style="left:${px(i) - 32}px;top:${py(i) - 32}px">${st === 'lock' ? lockI : `<span>${i + 1}</span>`}${(big || boss) && st !== 'cur' ? `<i class="crown">${ICON.crown}</i>` : ''}${st === 'cur' ? `<i class="me">${ICON.turtle()}</i>` : ''}<em>${st === 'done' ? [0, 1, 2].map((s) => `<i class="${s < b ? 'on' : ''}"></i>`).join('') : ''}</em></button>`;
  }
  const v = document.createElement('div'); v.className = 'map';
  v.innerHTML = `<div class="maptop"><div class="pill">${ICON.star.replace('<svg', '<svg style="width:26px;height:26px"')}<span>${starTotal()}</span></div><div class="maptitle">Shell Run</div><button class="iconbtn" id="mhome" aria-label="Home">${ICON.gear}</button></div>
    <div class="scroller"><div class="track" style="width:${Wd}px;height:${Ht}px"><svg width="${Wd}" height="${Ht}" viewBox="0 0 ${Wd} ${Ht}"><path d="${path}" fill="none" stroke="#16243b" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/><path d="${path}" fill="none" stroke="#e9cf98" stroke-width="33" stroke-linecap="round" stroke-linejoin="round"/><path d="${path}" fill="none" stroke="#d4b276" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 16" transform="translate(-7 0)"/><path d="${path}" fill="none" stroke="#d4b276" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 16" stroke-dashoffset="9" transform="translate(7 0)"/></svg>${nodes}</div></div>
    <div class="mapbot"><button class="b-gold sq" id="mshop" aria-label="Shop">${ICON.shop}</button><button class="b-green hero" id="mplay">${ICON.play}Level ${cur + 1}</button><button class="b-coral sq" id="mcrew" aria-label="Crew">${ICON.turtle('#fff4d6', '#e8a08e')}</button></div>`;
  $('#app').appendChild(v);
  const sc = v.querySelector('.scroller'); sc.scrollTop = Math.max(0, py(cur) - sc.clientHeight * .58);
  const startAt = (i) => { au(); v.remove(); $('#app').classList.add('playing'); begin(i); running = true; ui.night(); };
  v.querySelectorAll('.node').forEach((n) => { n.onclick = () => { const i = +n.dataset.i; if (i <= cur) startAt(i); else { n.classList.remove('shake'); void n.offsetWidth; n.classList.add('shake'); sfx.uhoh && sfx.uhoh(); buzz(20); } }; });
  v.querySelector('#mplay').onclick = () => startAt(cur);
  v.querySelector('#mshop').onclick = () => { au(); showShop(); };
  v.querySelector('#mcrew').onclick = () => { au(); showCrew(); };
  v.querySelector('#mhome').onclick = () => { au(); showSettings(); };
}
/* ---------- crew (coming soon) + settings ---------- */
function showCrew() {
  const v = document.createElement('div'); v.className = 'veil'; v.style.zIndex = 14;
  const tints = [['#7DB05A', '#3E6B3A'], ['#6fd1c8', '#2b7d78'], ['#E0B040', '#8a6514'], ['#E8664A', '#93301d'], ['#9b7be0', '#4b3592'], ['#f2f2f2', '#8a8a8a']];
  v.innerHTML = panel('Crew', `<div class="lbl">Shell skins for your hatchlings</div><div class="crewgrid">${tints.map(([c, s]) => `<div>${ICON.turtle(c, s)}</div>`).join('')}</div>
    <div class="goal" style="display:block;text-align:center"><b>Coming soon.</b> Earn skins with stars and rescues.</div><div class="btns"><button class="b-green hero" id="cx">Got it</button></div>`);
  $('#app').appendChild(v); v.querySelector('#cx').onclick = () => { au(); v.remove(); };
}
function showSettings() {
  const v = document.createElement('div'); v.className = 'veil'; v.style.zIndex = 14;
  const draw = () => {
    v.innerHTML = panel('Settings', `<div class="tog"><button class="b-teal ${muted ? 'off' : ''}" id="st1">${muted ? ICON.sndOff : ICON.sndOn}${muted ? 'Sound off' : 'Sound on'}</button><button class="b-teal ${hapOn ? '' : 'off'}" id="st2">${ICON.vib}${hapOn ? 'Buzz on' : 'Buzz off'}</button></div>
      <div class="goal">${ICON.star}<b>${starTotal()}</b> stars · <b>${PROG.saved}</b> turtles guided home</div>
      ${fieldNote('Facts in Shell Run come from sea turtle conservation groups such as Leave No Trace and the State of the World\'s Sea Turtles.', 'About')}
      <div class="btns"><button class="b-green hero" id="sx">Done</button></div>`);
    v.querySelector('#st1').onclick = () => { au(); setMuted(!muted); $('#snd').innerHTML = muted ? ICON.sndOff : ICON.sndOn; draw(); };
    v.querySelector('#st2').onclick = () => { setHaptics(!hapOn); if (hapOn) buzz(30); draw(); };
    v.querySelector('#sx').onclick = () => { au(); v.remove(); };
  };
  draw(); $('#app').appendChild(v);
}

/* ---------- pause ---------- */
$('#pauseB').innerHTML = ICON.pause;
ui.pause = function () {
  if (paused || !running || ended || attract || !started) return;
  paused = true; const v = document.createElement('div'); v.className = 'veil';
  const need = Math.ceil(total * .7);
  const draw = () => {
    v.innerHTML = panel('Paused', `<div class="lbl">Level ${night + 1} · ${spec.name}</div>
      <div class="prog"><div class="bar"><i style="width:${Math.round(safeN / total * 100)}%"></i></div><b>${safeN} / ${total}</b></div>
      <div class="goal">Save <b>${need}</b> to pass · <b>${Math.max(0, allowedLoss() - lostN)}</b> heart${allowedLoss() - lostN === 1 ? '' : 's'} left</div>
      ${fieldNote(FACTCARD[levelFacts[levelFacts.length - 1]] || 'You can\'t steer the turtles. The obstacles are man-made, so we can remove them.', levelFacts.length ? 'Turtle fact' : 'Remember')}
      <div class="btns"><button class="b-green hero" id="pr">${ICON.play}Resume</button>
      <div class="duo"><button class="b-navy" id="prs">${ICON.retry}Restart</button><button class="b-navy" id="pm">${ICON.map}Map</button></div>
      <div class="tog"><button class="b-teal ${muted ? 'off' : ''}" id="pt1">${muted ? ICON.sndOff : ICON.sndOn}${muted ? 'Sound off' : 'Sound on'}</button><button class="b-teal ${hapOn ? '' : 'off'}" id="pt2">${ICON.vib}${hapOn ? 'Buzz on' : 'Buzz off'}</button></div></div>`);
    const close = () => { v.remove(); paused = false; };
    v.querySelector('#pr').onclick = () => { au(); close(); };
    v.querySelector('#prs').onclick = () => { au(); close(); Object.assign(season, snap.season); begin(night); };
    v.querySelector('#pm').onclick = () => { au(); close(); running = false; powerKind = null; ui.power(); showMap(); };
    v.querySelector('#pt1').onclick = () => { au(); setMuted(!muted); $('#snd').innerHTML = muted ? ICON.sndOff : ICON.sndOn; draw(); };
    v.querySelector('#pt2').onclick = () => { setHaptics(!hapOn); if (hapOn) buzz(30); draw(); };
  };
  draw(); $('#ov').appendChild(v);
};
$('#pauseB').onclick = (e) => { e.stopPropagation(); au(); ui.pause(); };
document.addEventListener('visibilitychange', () => { if (document.hidden) ui.pause(); });
addEventListener('keydown', (e) => { if (e.key === 'Escape' || e.key === 'p') { const r = document.querySelector('#pr'); if (r) r.click(); else ui.pause(); } });

/* ---------- boost button ---------- */
const POWER_ICON = { clean: ICON.clean, surge: ICON.surge, ranger: ICON.ranger };
ui.power = function () {
  const b = $('#power'); if (!powerKind || attract || !started) { b.classList.remove('on', 'ready'); return; }
  b.classList.add('on'); b.classList.toggle('ready', powerReady); b.style.setProperty('--p', Math.round((powerReady ? 1 : charge) * 100));
  $('#powerIn').innerHTML = POWER_ICON[powerKind]; const c = $('#powerCnt'); c.textContent = '+' + PROG.boosts; c.style.display = PROG.boosts > 0 ? 'grid' : 'none';
};
$('#power').onclick = (e) => { e.stopPropagation(); au(); if (paused) return; if (!usePower()) { ui.cap('Help turtles to fill the ring', 1.6); buzz(20); sfx.uhoh(); } };

/* ---------- did-you-know toasts, shown at the moment of the action ---------- */
const FACTCARD = {
  litter: 'Beach trash blocks hatchlings and can be swallowed. Pack out what you bring in.',
  castle: 'Sandcastles and holes can trap hatchlings. Knock them down before you leave the beach.',
  crab: 'Ghost crabs, raccoons and foxes hunt hatchlings on the beach.',
  tangle: 'Plastic bags and fishing line can tangle turtles. A bag can look like a jellyfish.',
  gull: 'Seabirds snatch hatchlings on the sand and in the shallows.',
  light: 'Bright lights pull hatchlings away from the sea. Use moonlight or a red torch.',
  rain: 'Storms can wash trash onto nesting beaches.',
  hole: 'Holes in the sand can trap hatchlings. Always fill them in before you leave the beach.',
  gear: 'Beach toys, chairs and umbrellas left out become obstacles for turtles.',
  hands: 'In real life, never pick up a hatchling. Clear its path and let it crawl on its own.'
};
let levelFacts = [];
ui.fact = function (key) {
  if (attract || !FACTCARD[key]) return; if (!levelFacts.includes(key)) levelFacts.push(key); if (!PROG.facts[key]) { PROG.facts[key] = 1; saveProg(); }
};
const factRow = (txt) => `<div class="row" style="background:transparent;padding:0 2px">${ICON.leaf}<span class="fact" style="margin:0"><b>Did you know?</b> ${txt}</span></div>`;

/* ---------- demo shop (no real purchases yet) ---------- */
function showShop() {
  const v = document.createElement('div'); v.className = 'veil'; v.style.zIndex = 14;
  const draw = () => {
    const offer = (id, ic, bg, t, sub, btn, cls, off, best) => `<div class="offer"><div class="ic" style="background:${bg}">${ic}</div><div style="flex:1;min-width:0"><b>${t}${best ? '<i class="best">BEST VALUE</i>' : ''}</b><span>${sub}</span></div><button class="${cls}" id="${id}" ${off ? 'disabled' : ''}>${btn}</button></div>`;
    v.innerHTML = panel('Shop', `<div class="lbl">Your boosts: <b style="color:var(--txt)">${PROG.boosts}</b></div>
      ${offer('b0', ICON.ad, 'linear-gradient(#63e1d5,#1a95a8)', 'Free boost', 'Watch a short video', 'Watch', 'b-teal', false)}
      ${offer('b1', ICON.clean, 'linear-gradient(#3a5a8e,#1d3558)', '5 boosts', 'Use any time in a level', '$0.99', 'b-gold', false)}
      ${offer('b2', ICON.surge, 'linear-gradient(#3a5a8e,#1d3558)', '20 boosts', 'Clean, surge or ranger', '$2.99', 'b-gold', false, true)}
      ${offer('b3', ICON.ad, 'linear-gradient(#ff9c7d,#dc4f34)', 'No level ads', 'Videos stay optional', PROG.noAds ? 'Owned' : '$2.99', 'b-gold', PROG.noAds)}
      <div class="demo">DEMO STORE · NO REAL CHARGES</div>
      <div class="btns"><button class="b-navy" id="bc">Back</button></div>`);
    v.querySelector('#bc').onclick = () => { au(); v.remove(); };
    const add = (n) => { PROG.boosts += n; saveProg(); sfx.win(); buzz([20, 30, 20]); draw(); };
    v.querySelector('#b1').onclick = () => add(5); v.querySelector('#b2').onclick = () => add(20);
    v.querySelector('#b3').onclick = () => { PROG.noAds = true; saveProg(); sfx.win(); draw(); };
    v.querySelector('#b0').onclick = (e) => { const b = e.currentTarget; b.disabled = true; let n = 3; b.textContent = n; const iv = setInterval(() => { n--; if (n > 0) b.textContent = n; else { clearInterval(iv); add(1); } }, 1000); };
  };
  draw(); $('#app').appendChild(v);
}

/* ---------- loop + boot ---------- */
let last = 0, booted = false, started = false, lastRaw = 0;
const TS = clamp(+(Q.get('ts') || 1) | 0, 1, 8);   // test-only time scale for bots
function loop(ts) {
  const raw = Math.min(.05, (ts - last) / 1000 || 0); last = ts; lastRaw = raw;
  if (slowT > 0) { slowT -= raw; if (slowT <= 0) slow = 1; }
  let dt = raw * (lastOne ? .62 : 1) * slow;
  if (freeze > 0) { freeze -= raw; dt = 0; }
  if (capT > 0 && capT < 90 && (capT -= raw) <= 0) ui.capOff();
  if (capT >= 90 && !hand && !T.some((t) => t.st === 'flip' || t.st === 'carried' || t.st === 'tangle') && !gulls.some((g) => g.st === 'dive')) capT = 1.2;
  if (!paused) for (let s = 0; s < TS; s++) update(dt); updateSea(time); updatePrints(); updateParts(dt); sync(); placeCam(raw);
  R.render(scene, cam); overlay();
  if (!booted) { booted = true; $('#load').remove(); }
  requestAnimationFrame(loop);
}
self.onHorizon = buildSky;
resize();
$('#title').innerHTML = ICON.turtle() + 'Shell Run';
$('#go').innerHTML = ICON.play + (PROG.unlocked ? 'Continue' : 'Play');
$('#where').innerHTML = `${ICON.pin}${chapterOf(PROG.unlocked).split(' · ')[0]} · Level ${PROG.unlocked + 1}`;
$('#hmap i').innerHTML = ICON.map.replace('currentColor', '#fff4d6'); $('#hcrew i').innerHTML = ICON.turtle('#fff4d6', '#e8a08e'); $('#hshop i').innerHTML = ICON.shop; $('#gear').innerHTML = ICON.gear;
(function title() {
  const today = new Date().toDateString(), y = new Date(Date.now() - 864e5).toDateString();
  if (PROG.lastDay !== today) { PROG.streak = PROG.lastDay === y ? PROG.streak + 1 : 1; PROG.lastDay = today; PROG.boosts += 1; PROG.gift = 1; saveProg(); } else PROG.gift = 0;
  $('#tagstats').innerHTML = `<span class="chip">${ICON.flame}Day ${PROG.streak}</span>${PROG.saved ? `<span class="chip">${ICON.turtle()}${PROG.saved} guided home</span>` : ''}${PROG.gift ? `<span class="chip gift">${ICON.gift}+1 boost</span>` : ''}`;
})();
const n0 = Q.has('n') ? Math.max(0, +Q.get('n') | 0) : 0;
if (Q.has('n')) { begin(n0); running = false; } else { attract = true; begin(-1); running = true; }
requestAnimationFrame(loop);
function enter(toMap) { au(); buzz([12, 40, 18]); $('#start').classList.add('out'); setTimeout(() => $('#start').remove(), 500); started = true; const was = attract; attract = false; Object.assign(season, { met: 0, saved: 0, spawned: 0, binned: 0 }); if (!toMap && (PROG.unlocked === 0 || Q.has('n'))) { $('#app').classList.add('playing'); if (was) begin(Q.has('n') ? n0 : 0); running = true; ui.night(); } else { if (was) running = false; showMap(); } }
$('#go').onclick = () => enter(false);
$('#hmap').onclick = () => enter(true);
$('#hcrew').onclick = () => { au(); showCrew(); };
$('#hshop').onclick = () => { au(); showShop(); };
$('#gear').onclick = () => { au(); showSettings(); };
self.G = {
  forceEnd: (s, l) => { safeN = s; lostN = l; running = false; ended = true; endNight(); }, showCrew: () => showCrew(), showSettings: () => showSettings(), pause: () => ui.pause(),
  dolGo: () => { dol.next = 0; },
  get T() { return T; }, get litter() { return litter; }, get balls() { return balls; }, get rocks() { return rocks; }, get crabs() { return crabs; }, get gulls() { return gulls; }, get logs() { return logs; }, get tourists() { return tourists; },
  tap, scr, groundAt, surfaceTap, get running() { return running; }, get night() { return night; }, get safe() { return safeN; }, get lost() { return lostN; }, get total() { return total; }, get binned() { return binnedN; },
  get season() { return season; }, get carry() { return carry; }, get surf() { return surfLog; }, get bin() { return bin; }, get shoreZ() { return SHORE_Z; }, time: () => time,
  info: () => ({ calls: R.info.render.calls, tris: R.info.render.triangles, geos: R.info.memory.geometries, tex: R.info.memory.textures }), levels: Infinity, begin, levelSpec, usePower, showShop, showMap, get power() { return { kind: powerKind, charge, ready: powerReady, surge: surgeT, ranger: rangerT }; }, get paused() { return paused; }, fact: (k) => ui.fact(k), PROG, get spec() { return spec; }
};
