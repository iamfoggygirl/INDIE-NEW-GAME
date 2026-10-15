/* ===================== CORE: helpers, palette, audio, renderer, curved world ===================== */
const $ = (s) => document.querySelector(s);
if (!self.THREE) { $('#load').textContent = 'Could not load 3D. Check your connection and reload.'; return; }
const THREE = self.THREE;
const rnd = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const d2 = (a, b, c, d) => Math.hypot(a - c, b - d);
const pick = (a) => a[(Math.random() * a.length) | 0];
const ease = (t) => t * t * (3 - 2 * t);
const Q = new URLSearchParams(location.search);
const FAST = Q.has('fast');
const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Style bible palette (docs/11-art-bible.md). Lit colours are tuned slightly brighter so they read true under moonlight. */
const PAL = {
  sand: '#E6CFA0', wet: '#B89B70', teal: '#0E5E70', foam: '#BFE8E0', navy: '#12203A', moon: '#FFF3C4',
  coral: '#E8664A', green: '#7DB05A', shell: '#3E6B3A', gold: '#E0B040', litter: '#4FA3D9', red: '#D93A3A',
  skin: '#8cc063', cream: '#f3ead0'
};

/* ---------- world layout (ground is XZ, y up; turtles walk toward -z, the sea) ---------- */
const XMIN = -4.0, XMAX = 4.0, NEST_Z = 7.0, SHORE_Z = -6.2, ST0 = -1.4, ST1 = 0.4;
const MS = 1.6;                                      // character scale
const shore = (x, t) => SHORE_Z + Math.sin(x * .55 + t * 1.1) * .22 + Math.sin(t * .7) * .3;
function groundH(x, z) {
  let h = Math.max(0, z - SHORE_Z) * .022 + Math.sin(x * 1.3) * Math.cos(z * 1.1) * .03;
  if (z < SHORE_Z + .8) h -= (SHORE_Z + .8 - z) * .28;
  if (z > 8.7) h += Math.pow(z - 8.7, 1.3) * .5 + Math.sin(x * .8 + z) * .22 * clamp((z - 8.7) / 2, 0, 1);
  const f = clamp((z - (SHORE_Z + 1.2)) / 4, 0, 1), ex = Math.abs(x) - 4.7;
  if (ex > 0) h += (ex * ex * .16 + Math.sin(z * .9 + x) * .18 * clamp(ex / 2, 0, 1)) * f;
  return h;
}
const isGrass = (x, z) => (Math.abs(x) > 4.95 + Math.sin(z * .8) * .2 && z > SHORE_Z + 2.4) || z > 9.3;

/* ---------- curved world: far geometry bends away so the horizon and moon show at the top ---------- */
const CURVE = { z0: { value: SHORE_Z - 1.2 }, k: { value: .045 } };
const curveY = (z) => { const c = Math.max(0, CURVE.z0.value - z); return -c * c * CURVE.k.value; };
const timeU = { value: 0 };
function curved(mat, key = 'c', extra) {
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.uCz = CURVE.z0; sh.uniforms.uCk = CURVE.k; sh.uniforms.uTime = timeU;
    sh.vertexShader = 'uniform float uCz; uniform float uCk; uniform float uTime;\n' + sh.vertexShader.replace('#include <project_vertex>',
      `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
  mvPosition = instanceMatrix * mvPosition;
#endif
vec4 wPos = modelMatrix * mvPosition;
${extra || ''}
float cz = max(0.0, uCz - wPos.z); wPos.y -= cz * cz * uCk;
mvPosition = viewMatrix * wPos;
gl_Position = projectionMatrix * mvPosition;`);
  };
  mat.customProgramCacheKey = () => 'curve-' + key;
  return mat;
}

/* ---------- audio: master bus with compressor + generated reverb, solemn pad score ---------- */
let AC = null, MG = null, REV = null, musicG = null, muted = false, audioOn = false;
try { muted = localStorage.getItem('sr_mute') === '1'; } catch (e) {}
function au() {
  if (!AC) {
    try { AC = new (self.AudioContext || self.webkitAudioContext)(); } catch (e) { return; }
    const comp = AC.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 3; comp.connect(AC.destination);
    MG = AC.createGain(); MG.gain.value = muted ? 0 : .9; MG.connect(comp);
    const len = AC.sampleRate * 2.6, ir = AC.createBuffer(2, len, AC.sampleRate);
    for (let ch = 0; ch < 2; ch++) { const a = ir.getChannelData(ch); for (let i = 0; i < len; i++) a[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6); }
    const cv = AC.createConvolver(); cv.buffer = ir; REV = AC.createGain(); REV.gain.value = .32; REV.connect(cv); cv.connect(MG);
    musicG = AC.createGain(); musicG.gain.value = 1; musicG.connect(MG); musicG.connect(REV);
  }
  if (AC.state === 'suspended') AC.resume();
  if (!audioOn) { audioOn = true; startAmbience(); startMusic(); setRain(!!LK.rain); }
}
function setMuted(m) { muted = m; try { localStorage.setItem('sr_mute', m ? '1' : '0'); } catch (e) {} if (MG) MG.gain.setTargetAtTime(m ? 0 : .9, AC.currentTime, .05); }
function tone(f, d, type = 'sine', v = .15, to, delay = 0, rev = .25, dest) {
  if (!AC) return; const t = AC.currentTime + delay, o = AC.createOscillator(), g = AC.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t); if (to) o.frequency.exponentialRampToValueAtTime(to, t + d);
  g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(v, t + .012); g.gain.exponentialRampToValueAtTime(.0001, t + d);
  o.connect(g); g.connect(dest || MG); if (rev && !dest) { const s = AC.createGain(); s.gain.value = rev; g.connect(s); s.connect(REV); }
  o.start(t); o.stop(t + d + .05);
}
let NB = null;
function noise(d, v = .12, f = 800, delay = 0, q = 1, type = 'bandpass', rev = .1) {
  if (!AC) return; if (!NB) { NB = AC.createBuffer(1, AC.sampleRate * 2, AC.sampleRate); const a = NB.getChannelData(0); for (let i = 0; i < a.length; i++) a[i] = Math.random() * 2 - 1; }
  const t = AC.currentTime + delay, s = AC.createBufferSource(); s.buffer = NB; s.playbackRate.value = rnd(.9, 1.1);
  const fl = AC.createBiquadFilter(); fl.type = type; fl.frequency.value = f; fl.Q.value = q; const g = AC.createGain();
  g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.0001, t + d);
  s.connect(fl).connect(g).connect(MG); if (rev) { const r = AC.createGain(); r.gain.value = rev; g.connect(r); r.connect(REV); }
  s.start(t, Math.random()); s.stop(t + d + .05);
}
let rainG = null;
function setRain(on) {
  if (!AC) return;
  if (!rainG) {
    const len = AC.sampleRate * 3, b = AC.createBuffer(1, len, AC.sampleRate), a = b.getChannelData(0); for (let i = 0; i < len; i++) a[i] = Math.random() * 2 - 1;
    const s = AC.createBufferSource(); s.buffer = b; s.loop = true; const hp = AC.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1400; const lp = AC.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 7000;
    rainG = AC.createGain(); rainG.gain.value = 0; s.connect(hp).connect(lp).connect(rainG).connect(MG); s.start();
  }
  rainG.gain.setTargetAtTime(on ? .075 : 0, AC.currentTime, .6);
}
function startAmbience() {
  const len = AC.sampleRate * 4, b = AC.createBuffer(1, len, AC.sampleRate), a = b.getChannelData(0); let last = 0;
  for (let i = 0; i < len; i++) { last = last * .985 + (Math.random() * 2 - 1) * .015; a[i] = last * 5; }
  const s = AC.createBufferSource(); s.buffer = b; s.loop = true; const lp = AC.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 700;
  const g = AC.createGain(); g.gain.value = .07; const lfo = AC.createOscillator(); lfo.frequency.value = .12; const lg = AC.createGain(); lg.gain.value = .05;
  lfo.connect(lg).connect(g.gain); s.connect(lp).connect(g).connect(MG); s.start(); lfo.start();
  setInterval(() => { if (!AC || document.hidden) return; if (Math.random() < .45) for (let i = 0; i < 3; i++) tone(4300 + Math.random() * 250, .025, 'sine', .008, 0, i * .08, 0); }, 1900);
}
const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);
const CHORDS = [[45, 52, 55, 59, 60], [41, 48, 52, 57, 64], [48, 55, 62, 64, 67], [43, 50, 59, 62, 64]];
const MEL = [69, 72, 74, 76, 79, 81];
let musicStep = 0, musicNext = 0, musicMood = 0;    // mood: 0 calm, 1 tense (gull), 2 last one
function startMusic() {
  musicNext = AC.currentTime + .3;
  setInterval(() => {
    if (!AC || document.hidden) return;
    while (musicNext < AC.currentTime + .6) { playChord(CHORDS[musicStep % CHORDS.length], musicNext); musicStep++; musicNext += 5.6; }
  }, 200);
}
function playChord(ch, t) {
  const lp = AC.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = musicMood === 2 ? 1500 : 850; lp.connect(musicG);
  for (const n of ch) for (const det of [-5, 5]) {
    const o = AC.createOscillator(), g = AC.createGain(); o.type = 'triangle'; o.frequency.value = midi(n); o.detune.value = det;
    g.gain.setValueAtTime(.0001, t); g.gain.linearRampToValueAtTime(.017, t + 1.9); g.gain.setValueAtTime(.017, t + 4.6); g.gain.linearRampToValueAtTime(.0001, t + 7.6);
    o.connect(g).connect(lp); o.start(t); o.stop(t + 7.8);
  }
  const plucks = 1 + ((Math.random() * 2) | 0);
  for (let i = 0; i < plucks; i++) { const tt = t + 1 + i * rnd(1.2, 2); const f = midi(pick(MEL)); pluck(f, tt - AC.currentTime, .035); }
}
function pluck(f, delay, v) { tone(f, 1.6, 'sine', v, 0, delay, .7); tone(f * 2, .6, 'sine', v * .25, 0, delay, .7); }
const PENTA = [0, 2, 4, 7, 9];
const note = (i, base = 440) => base * Math.pow(2, (PENTA[((i % 5) + 5) % 5] + 12 * Math.floor(i / 5)) / 12);
const buzz = (p) => { if (muted || !AC) return; try { navigator.vibrate && navigator.vibrate(p); } catch (e) {} };
const sfx = {
  hatch() { tone(1500 + Math.random() * 400, .05, 'triangle', .035, 0, 0, 0); noise(.08, .05, 1800, 0, 2); },
  squeak() { tone(1900 + Math.random() * 500, .07, 'sine', .03, 2700, 0, .1); },
  boop() { tone(880, .09, 'sine', .09, 1500); tone(1320, .12, 'sine', .05, 1900, .06); buzz(8); },
  pickup() { noise(.14, .1, 1400, 0, 1.2); tone(300, .16, 'triangle', .07, 700, 0, .05); buzz(12); },
  clunk(n) { const m = 1 + Math.min(n, 8) * .05; tone(150 * m, .16, 'triangle', .16, 70, 0, .05); noise(.09, .12, 900 * m, 0, 3); tone(620 * m, .08, 'square', .025, 300, .02, 0); buzz([10, 20, 30]); },
  rock() { noise(.22, .22, 260); tone(150, .22, 'sine', .14, 70); buzz(22); },
  crab() { noise(.1, .1, 2600, 0, 3); tone(900, .07, 'square', .03, 600, 0, 0); buzz(10); },
  gull() { tone(1150, .16, 'sawtooth', .05, 720); tone(950, .18, 'sawtooth', .045, 620, .12); buzz(14); },
  flip(c) { const b = note(c + 4); tone(b * .5, .14, 'triangle', .14, b); tone(b, .14, 'sine', .08, b * 1.5, .08); buzz([12, 30, 16]); },
  untangle(c) { noise(.12, .12, 3000, 0, .8, 'highpass'); const b = note(c + 5); tone(b * .5, .12, 'triangle', .12, b, .04); tone(b, .14, 'sine', .07, b * 1.5, .12); buzz([12, 30, 16]); },
  log() { noise(.22, .15, 380); tone(200, .15, 'triangle', .08, 120); buzz(16); },
  safe(i) { noise(.25, .05, 1500); tone(note(i), .4, 'sine', .12, 0, 0, .5); tone(note(i) * 2, .18, 'triangle', .03, 0, 0, .3); buzz(8); },
  warn() { tone(523, .1, 'square', .035, 0, 0, 0); tone(523, .1, 'square', .035, 0, .17, 0); },
  heart() { tone(58, .12, 'sine', .16, 45, 0, 0); tone(58, .12, 'sine', .12, 45, .16, 0); },
  uhoh() { tone(392, .22, 'sine', .1, 300); buzz(35); },
  grab() { tone(700, .25, 'sawtooth', .06, 1300); noise(.15, .08, 3000); buzz([25, 25, 25]); },
  lost() { tone(330, .45, 'sine', .1, 220, 0, .5); tone(262, .55, 'sine', .08, 196, .25, .5); buzz(70); },
  hey() { tone(260, .12, 'sawtooth', .06, 340); tone(340, .2, 'sawtooth', .06, 230, .1); buzz([10, 20, 30]); },
  flash() { noise(.05, .18, 5000, 0, .5); tone(2400, .04, 'square', .025, 0, 0, 0); },
  combo(n) { [0, 2, 4].forEach((k, i) => tone(note(n + k + 5), .2, 'triangle', .09, 0, i * .05, .4)); buzz([10, 15, 10, 15]); },
  win() { [0, 2, 4, 5, 7, 9, 10].forEach((n, i) => tone(note(n + 3), .5, 'sine', .11, 0, i * .09, .6)); buzz([30, 40, 30, 40, 90]); },
  // surface taps: every tap answers, and each surface sounds different
  sand() { noise(.09, .1, 500, 0, .8, 'lowpass', 0); buzz(6); },
  wetsand() { noise(.1, .1, 700, 0, 1.5, 'bandpass', 0); tone(180, .06, 'sine', .05, 120, 0, 0); buzz(6); },
  water() { tone(600, .08, 'sine', .08, 1200, 0, .3); tone(900, .06, 'sine', .05, 1600, .07, .3); noise(.18, .06, 2500, .02, 1, 'highpass', .2); buzz(6); },
  grass() { noise(.2, .07, 4200, 0, .7, 'highpass', .05); buzz(5); },
  sky() { pluck(midi(pick(MEL)) * 2, 0, .03); },
  thunder() { noise(2.2, .32, 140, 0, .7, 'lowpass', .5); noise(1.2, .2, 90, .15, .7, 'lowpass', .5); tone(55, 1.6, 'sine', .22, 38, .1, .4); buzz([60, 40, 90, 40, 140]); },
  bin() { tone(120, .2, 'triangle', .12, 80, 0, 0); noise(.1, .08, 600, 0, 2); buzz(15); }
};

/* ---------- renderer, scene, camera ---------- */
const cv3 = $('#cv3'), ov = $('#ov2'), oc = ov.getContext('2d');
const R = new THREE.WebGLRenderer({ canvas: cv3, antialias: true, powerPreference: 'high-performance' });
R.setPixelRatio(Math.min(2, devicePixelRatio || 1));
const scene = new THREE.Scene();
const FOG = new THREE.Color('#22406b');
scene.fog = new THREE.Fog(FOG, 30, 66);
const cam = new THREE.PerspectiveCamera(38, 1, .5, 260);
const ELEV = 50 * Math.PI / 180;
let W = 1, H = 1, camDist = 30, baseFocusZ = 0, zoom = 1, zoomTo = 1, horizonY = .2;
const focus = new THREE.Vector3(), focusTo = new THREE.Vector3(), camPos = new THREE.Vector3();
const _v = new THREE.Vector3();
function scr(x, y, z) { _v.set(x, y + curveY(z), z).project(cam); return { x: (_v.x * .5 + .5) * W, y: (-_v.y * .5 + .5) * H, ndc: _v.y }; }
function placeCamAt(fz, d) { cam.position.set(0, Math.sin(ELEV) * d, fz + Math.cos(ELEV) * d); cam.lookAt(0, 0, fz); cam.updateMatrixWorld(); }
function fitCamera() {
  // find the distance and focus that fit the play strip: nests at the bottom, the shore under the HUD
  const near = [[XMIN - .55, NEST_Z + 1.1], [XMAX + .55, NEST_Z + 1.1]], far = [[XMIN - .3, SHORE_Z - .4], [XMAX + .3, SHORE_Z - .4]];
  const BOT = -.84, TOP = .44;
  const ok = (fz, d) => { placeCamAt(fz, d); for (const [x, z] of near) { _v.set(x, groundH(x, z), z).project(cam); if (Math.abs(_v.x) > 1 || _v.y < BOT) return false; } for (const [x, z] of far) { _v.set(x, 0, z).project(cam); if (Math.abs(_v.x) > 1 || _v.y > TOP) return false; } return true; };
  let fz = 0, d = 30;
  for (let it = 0; it < 24; it++) {
    let lo = 6, hi = 140; for (let k = 0; k < 30; k++) { const m = (lo + hi) / 2; if (ok(fz, m)) hi = m; else lo = m; } d = hi;
    placeCamAt(fz, d); _v.set(0, 0, NEST_Z + 1.1).project(cam); const s1 = _v.y - BOT; _v.set(0, 0, SHORE_Z - .4).project(cam); const s2 = TOP - _v.y;
    fz -= (s1 - s2) * 1.6;
  }
  baseFocusZ = fz; camDist = d;
}
function resize() {
  const r = $('#app').getBoundingClientRect(); W = r.width; H = r.height;
  R.setSize(W, H, false); const dpr = Math.min(2, devicePixelRatio || 1); ov.width = W * dpr; ov.height = H * dpr; oc.setTransform(dpr, 0, 0, dpr, 0, 0);
  cam.aspect = W / H; cam.updateProjectionMatrix(); fitCamera();
  focus.set(0, 0, baseFocusZ); focusTo.copy(focus); placeCam(0);
  // where the curved sea meets the sky on screen
  let best = -2; for (let z = SHORE_Z; z > -220; z -= 1) { _v.set(0, curveY(z), z).project(cam); if (_v.z < 1) best = Math.max(best, _v.y); }
  horizonY = best; if (self.onHorizon) self.onHorizon();
}
let shake = 0;
function placeCam(dt) {
  zoom = lerp(zoom, zoomTo, 1 - Math.exp(-dt * 2.5)); focus.lerp(focusTo, 1 - Math.exp(-dt * 2.5));
  const dist = camDist * zoom; camPos.set(focus.x, focus.y + Math.sin(ELEV) * dist, focus.z + Math.cos(ELEV) * dist);
  if (shake > .005 && !REDUCE) { camPos.x += rnd(-shake, shake); camPos.y += rnd(-shake, shake); shake *= .86; }
  cam.position.copy(camPos); cam.lookAt(focus); cam.updateMatrixWorld();
}
addEventListener('resize', () => resize());

/* lights: cool moon sky, warm key from the camera side so faces read, moon rim from the sea */
const hemiL = new THREE.HemisphereLight(0xaabbe6, 0x6a5538, .48); scene.add(hemiL);
const keyL = new THREE.DirectionalLight(0xffe2b4, .66); keyL.position.set(-5, 12, 10); scene.add(keyL);
const rimL = new THREE.DirectionalLight(0xbfd8ff, .32); rimL.position.set(3, 6, -14); scene.add(rimL);

/* materials (all curved) */
const MAT = curved(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .62, metalness: 0 }), 'mat');
const MATT = curved(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .5, metalness: 0, transparent: true, opacity: .88 }), 'matt');
const MATE = curved(new THREE.MeshBasicMaterial({ vertexColors: true }), 'mate');

/* geometry helpers: merge parts into one vertex-coloured geometry. flat>0 = faceted low-poly with per-face shade jitter */
const _c = new THREE.Color();
function M(x = 0, y = 0, z = 0, sx = 1, sy = 1, sz = 1, rx = 0, ry = 0, rz = 0) { const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)); return new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), q, new THREE.Vector3(sx, sy, sz)); }
function merge(parts) {
  const P = [], N = [], C = [];
  for (const [geo, col, mat, flat] of parts) {
    let g = geo.index ? geo.toNonIndexed() : geo.clone(); if (mat) g.applyMatrix4(mat);
    if (flat !== undefined && flat !== false) g.computeVertexNormals();
    const p = g.attributes.position.array, n = g.attributes.normal.array;
    for (let i = 0; i < p.length; i++) { P.push(p[i]); N.push(n[i]); }
    const tris = p.length / 9;
    for (let t = 0; t < tris; t++) { _c.set(col); if (flat) _c.offsetHSL(0, 0, (Math.random() - .5) * flat); for (let k = 0; k < 3; k++) C.push(_c.r, _c.g, _c.b); }
  }
  const out = new THREE.BufferGeometry(); out.setAttribute('position', new THREE.Float32BufferAttribute(P, 3)); out.setAttribute('normal', new THREE.Float32BufferAttribute(N, 3)); out.setAttribute('color', new THREE.Float32BufferAttribute(C, 3)); out.computeBoundingSphere(); return out;
}
const S = (r, w = 14, h = 10) => new THREE.SphereGeometry(r, w, h);
const IC = (r, d = 1) => new THREE.IcosahedronGeometry(r, d);
const CY = (rt, rb, h, s = 10) => new THREE.CylinderGeometry(rt, rb, h, s);
const BX = (x, y, z) => new THREE.BoxGeometry(x, y, z);
const CN = (r, h, s = 6) => new THREE.ConeGeometry(r, h, s);
const TO = (r, t, rs = 6, ts = 14, arc = Math.PI * 2) => new THREE.TorusGeometry(r, t, rs, ts, arc);
function canvasTex(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); return t; }

/* instancing helper: writes matrices sequentially each frame */
class Batch {
  constructor(geo, mat, max) { this.m = new THREE.InstancedMesh(geo, mat, max); this.m.frustumCulled = false; this.n = 0; this.max = max; this.m.count = 0; scene.add(this.m); }
  begin() { this.n = 0; }
  add(mat4) { if (this.n < this.max) this.m.setMatrixAt(this.n++, mat4); }
  end() { this.m.count = this.n; this.m.instanceMatrix.needsUpdate = true; }
}
const _m = new THREE.Matrix4(), _m2 = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _p = new THREE.Vector3(), _s = new THREE.Vector3();
function compose(out, x, y, z, rx, ry, rz, sx, sy = sx, sz = sx, order = 'YXZ') { _e.set(rx, ry, rz, order); _q.setFromEuler(_e); _p.set(x, y, z); _s.set(sx, sy, sz); return out.compose(_p, _q, _s); }
