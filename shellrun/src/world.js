/* ===================== WORLD: wide moonlit nesting beach (art target: image 15) ===================== */

/* sky: screen-space gradient that lines up with the curved horizon */
let skyTex = null;
function cloud(x, cx, cy, r, c1, c2) {
  const puff = (px, py, pr, col) => { x.fillStyle = col; x.beginPath(); const n = 9; for (let i = 0; i < n; i++) { const a = i / n * 6.283, k = pr * (.86 + ((i * 7919) % 5) * .05); x[i ? 'lineTo' : 'moveTo'](px + Math.cos(a) * k * 1.25, py + Math.sin(a) * k * .8); } x.closePath(); x.fill(); };
  for (const [dx, dy, k] of [[-1.1, .2, .62], [-.45, -.25, .8], [.35, -.15, .85], [1.05, .15, .6], [0, .22, .9]]) puff(cx + dx * r, cy + dy * r, r * k, c1);
  x.globalAlpha = .55; for (const [dx, dy, k] of [[-.4, .45, .55], [.45, .4, .55], [0, .5, .7]]) puff(cx + dx * r, cy + dy * r, r * k * .8, c2); x.globalAlpha = 1;
}
function buildSky() {
  const hf = clamp(1 - (horizonY * .5 + .5), .05, .6);           // horizon height from the top, 0..1
  if (skyTex) skyTex.dispose();
  skyTex = canvasTex(256, 512, (x, w, h) => {
    const S = LK.sky, g = x.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, S[0]); g.addColorStop(Math.max(.01, hf * .5), S[1]); g.addColorStop(Math.max(.02, hf - .03), S[2]); g.addColorStop(hf, S[3]); g.addColorStop(Math.min(1, hf + .03), S[4]); g.addColorStop(1, S[4]);
    x.fillStyle = g; x.fillRect(0, 0, w, h);
    const hy = hf * h;
    if (LK.clouds === 2) { for (const [cx, cy, r, c1, c2] of [[40, .22, 62, '#1c2740', '#0c1426'], [150, .12, 74, '#16213a', '#0a1122'], [230, .3, 58, '#233250', '#0e1730'], [100, .42, 46, '#2a3b58', '#121b30'], [200, .55, 44, '#304260', '#141d34']]) cloud(x, cx, cy * hy, r, c1, c2); }
    else if (LK.clouds === 1) { const dusk = LK.sky[2] === '#d8704f'; for (const [cx, cy, r] of [[34, .55, 30], [210, .4, 38], [120, .75, 24]]) cloud(x, cx, cy * hy, r, dusk ? '#a8506a' : '#fdf3e6', dusk ? '#5a3258' : '#e9c9b4'); }
    if (LK.house) {   // tiny far-off lighthouse on the horizon (sheet 14)
      const lx = w * .13, lb = hy + 1, lh = 26; x.fillStyle = 'rgba(255,238,170,.5)'; const gl = x.createRadialGradient(lx, lb - lh, 1, lx, lb - lh, 22); gl.addColorStop(0, 'rgba(255,236,160,.8)'); gl.addColorStop(1, 'rgba(255,236,160,0)'); x.fillStyle = gl; x.fillRect(lx - 24, lb - lh - 24, 48, 48);
      x.fillStyle = '#f3ead0'; x.beginPath(); x.moveTo(lx - 4.5, lb); x.lineTo(lx - 2.8, lb - lh); x.lineTo(lx + 2.8, lb - lh); x.lineTo(lx + 4.5, lb); x.fill(); x.fillStyle = '#E8664A'; x.fillRect(lx - 3.9, lb - 9, 7.8, 4); x.fillRect(lx - 3.3, lb - 19, 6.6, 3.4); x.fillStyle = '#12203A'; x.fillRect(lx - 3.6, lb - lh - 3, 7.2, 3); x.fillStyle = '#ffe9a0'; x.fillRect(lx - 2, lb - lh - 1, 4, 3);
    }
  });
  scene.background = skyTex;
  placeMoon();
}
/* stars as points far behind everything (not curved, never fogged) */
const starGeo = new THREE.BufferGeometry();
(function () { const P = []; for (let i = 0; i < 220; i++) P.push(rnd(-1, 1), rnd(0, 1), 0); starGeo.setAttribute('position', new THREE.Float32BufferAttribute(P, 3)); })();
const starTex = canvasTex(32, 32, (x) => { const g = x.createRadialGradient(16, 16, 0, 16, 16, 16); g.addColorStop(0, 'rgba(255,250,230,1)'); g.addColorStop(.3, 'rgba(255,250,230,.6)'); g.addColorStop(1, 'rgba(255,250,230,0)'); x.fillStyle = g; x.fillRect(0, 0, 32, 32); });
const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ size: 2.2, map: starTex, transparent: true, depthWrite: false, depthTest: false, fog: false, sizeAttenuation: false, color: 0xfff6dc }));
stars.renderOrder = -2; stars.frustumCulled = false; scene.add(stars);
/* moon sprite with soft glow, placed above the horizon on screen */
const moonTex = canvasTex(256, 256, (x) => {
  const g = x.createRadialGradient(128, 128, 30, 128, 128, 128); g.addColorStop(0, 'rgba(255,243,196,.55)'); g.addColorStop(.45, 'rgba(255,243,196,.12)'); g.addColorStop(1, 'rgba(255,243,196,0)'); x.fillStyle = g; x.fillRect(0, 0, 256, 256);
  // low-poly disc: a 14-gon with gently shaded facets
  const n = 14, r = 40; for (let i = 0; i < n; i++) { const a0 = i / n * 6.283, a1 = (i + 1) / n * 6.283; x.fillStyle = `hsl(48,${85 - (i % 3) * 6}%,${90 - (i % 4) * 2.5}%)`; x.beginPath(); x.moveTo(128, 128); x.lineTo(128 + Math.cos(a0) * r, 128 + Math.sin(a0) * r); x.lineTo(128 + Math.cos(a1) * r, 128 + Math.sin(a1) * r); x.closePath(); x.fill(); }
  x.fillStyle = 'rgba(214,200,160,.45)'; x.beginPath(); x.arc(116, 118, 8, 0, 6.3); x.arc(138, 140, 5, 0, 6.3); x.arc(140, 112, 4, 0, 6.3); x.fill();
});
const moon = new THREE.Sprite(new THREE.SpriteMaterial({ map: moonTex, depthTest: false, depthWrite: false, fog: false }));
moon.renderOrder = -1; scene.add(moon);
let moonNdcX = .42, moonNdcY = .7;
function ndcToWorld(nx, ny, dist) { _v.set(nx, ny, .5).unproject(cam).sub(cam.position).normalize(); return cam.position.clone().addScaledVector(_v, dist); }
function placeMoon() {
  placeCamAt(baseFocusZ, camDist);
  moonNdcY = Math.min(.82, horizonY + LK.disc[1]);
  moon.position.copy(ndcToWorld(moonNdcX, moonNdcY, 150)); moon.scale.setScalar(150 * .15 * LK.disc[2] * (844 / Math.max(H, 400)));
  // stars live in a band above the horizon
  const p = starGeo.attributes.position, base = [];
  const fr = (v) => { const s = Math.sin(v) * 43758.5453; return s - Math.floor(s); };
  for (let i = 0; i < p.count; i++) { const sx = fr(i * 12.9898) * 2 - 1, sy = horizonY + .04 + fr(i * 78.233 + 1.7) * (1.05 - horizonY); const w = ndcToWorld(sx, sy, 200); p.setXYZ(i, w.x, w.y, w.z); }
  p.needsUpdate = true; starGeo.computeBoundingSphere();
  placeGlitter();
  placeCam(0);
}

/* ---------- ground (colours are painted per terrain + mood) ---------- */
let groundGeo = null, groundJ = null; const groundMat = curved(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .95, metalness: 0 }), 'ground');
(function ground() {
  const g = new THREE.PlaneGeometry(70, 26, 140, 52); g.rotateX(-Math.PI / 2); g.translate(0, 0, 7);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) { const x = p.getX(i), z = p.getZ(i); p.setY(i, groundH(x, z)); }
  groundGeo = g.toNonIndexed(); const n = groundGeo.attributes.position.count;
  groundGeo.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(n * 3), 3)); groundGeo.computeVertexNormals();
  groundJ = new Float32Array(n / 3); for (let i = 0; i < groundJ.length; i++) groundJ[i] = (Math.random() - .5) * .012;
  scene.add(new THREE.Mesh(groundGeo, groundMat));
})();
function paintGround() {
  const q = groundGeo.attributes.position, col = groundGeo.attributes.color, c = new THREE.Color();
  const dry = new THREE.Color(TR.sand), wet = new THREE.Color(TR.wet), under = new THREE.Color(TR.under), dune = new THREE.Color(TR.dune), grass = new THREE.Color('#6f9a4e'), grass2 = new THREE.Color('#87ad5c');
  for (let i = 0, t = 0; i < q.count; i += 3, t++) {
    const x = (q.getX(i) + q.getX(i + 1) + q.getX(i + 2)) / 3, z = (q.getZ(i) + q.getZ(i + 1) + q.getZ(i + 2)) / 3;
    c.copy(dry);
    if (z < SHORE_Z + 1.9) c.lerp(wet, clamp((SHORE_Z + 1.9 - z) / 1.6, 0, 1));
    if (z < SHORE_Z - .2) c.lerp(under, clamp((SHORE_Z - .2 - z) / 1.5, 0, 1));
    if (z > 8.7 || Math.abs(x) > 4.7) c.lerp(dune, .6);
    if (isGrass(x, z)) c.lerp(Math.sin(x * 2.1 + z * 1.7) > 0 ? grass : grass2, clamp(Math.min(Math.abs(x) - 5.9, z - 9.3 > 0 ? 3 : 0) + .5, 0, .8) * (.6 + .4 * Math.sin(x * .7 + z * .9)));
    if (LK.rain && z > SHORE_Z + .6) c.lerp(wet, .55);     // rain-soaked sand
    c.offsetHSL(0, 0, groundJ[t] + Math.sin(x * .9 + z * .35) * Math.sin(z * .6 - x * .2) * .025);
    for (let k = 0; k < 3; k++) col.setXYZ(i + k, c.r, c.g, c.b);
  }
  col.needsUpdate = true;
}

/* ---------- sea: faceted vertex-animated water ---------- */
const seaGeo = new THREE.PlaneGeometry(120, 96, 80, 64); seaGeo.rotateX(-Math.PI / 2); seaGeo.translate(0, 0, SHORE_Z + 1.3 - 48);
const seaBase = seaGeo.attributes.position.array.slice();
seaGeo.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(seaGeo.attributes.position.count * 3), 3));
function paintSea() {
  const c = new THREE.Color(), [A, B, D, E] = LK.sea.slice(0, 4).map((h) => new THREE.Color(h)), col = seaGeo.attributes.color, p = seaGeo.attributes.position;
  for (let i = 0; i < p.count; i++) { const z = p.getZ(i), k = SHORE_Z - z; if (k < 2) c.copy(A).lerp(B, clamp(k / 2, 0, 1)); else if (k < 9) c.copy(B).lerp(D, (k - 2) / 7); else c.copy(D).lerp(E, clamp((k - 9) / 25, 0, 1)); col.setXYZ(i, c.r, c.g, c.b); }
  col.needsUpdate = true; sea.material.emissive.setHex(LK.sea[4]);
}
const sea = new THREE.Mesh(seaGeo, curved(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .62, metalness: .04, flatShading: true, emissive: 0x03182a, transparent: true, opacity: .97 }), 'sea'));
sea.frustumCulled = false; scene.add(sea);
function foamStrip(width, op) { const n = 96, P = new Float32Array(n * 2 * 3), idx = []; for (let i = 0; i < n - 1; i++) { const a = i * 2; idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); } const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(P, 3)); g.setIndex(idx); const m = new THREE.Mesh(g, curved(new THREE.MeshBasicMaterial({ color: 0xeefaf6, transparent: true, opacity: op, depthWrite: false, side: THREE.DoubleSide }), 'foam')); m.userData = { n, width }; m.frustumCulled = false; scene.add(m); return m; }
const foam1 = foamStrip(.34, .92), foam2 = foamStrip(.14, .5), foam3 = foamStrip(.1, .35);
const bubbles = new Batch(IC(1, 0), curved(new THREE.MeshBasicMaterial({ color: 0xf4fffb }), 'bub'), 70);
const bubbleData = Array.from({ length: 70 }, () => ({ x: rnd(-16, 16), off: rnd(-.6, .4), s: rnd(.04, .1), ph: rnd(0, 6) }));
function updateSea(t) {
  const p = seaGeo.attributes.position.array;
  for (let i = 0; i < p.length; i += 3) {
    const x = seaBase[i], z = seaBase[i + 2]; let zz = z;
    if (z > SHORE_Z - .9) zz = Math.min(z, shore(x, t) + .05);
    p[i + 2] = zz; p[i + 1] = -.05 + Math.sin(x * .45 + z * .38 + t * 1.5) * .09 + Math.sin(x * 1.2 - t * 2.0 + z * .2) * .035;
  }
  seaGeo.attributes.position.needsUpdate = true;
  for (const [m, off] of [[foam1, -.02], [foam2, -.55], [foam3, -1.4]]) {
    const P = m.geometry.attributes.position.array, n = m.userData.n;
    for (let i = 0; i < n; i++) { const x = -24 + i / (n - 1) * 48, z = shore(x, t) + off - Math.max(0, Math.sin(t * 1.1 + off * 3)) * (off < -.1 ? .25 : 0) + Math.sin(x * 1.7 + t * 3) * .05, k = i * 6; P[k] = x; P[k + 1] = .04; P[k + 2] = z; P[k + 3] = x; P[k + 4] = .04; P[k + 5] = z - m.userData.width * (.7 + .3 * Math.sin(x * 2.3 + t)); }
    m.geometry.attributes.position.needsUpdate = true;
  }
  bubbles.begin(); for (const b of bubbleData) { const z = shore(b.x, t) + b.off, s = b.s * (.6 + .4 * Math.sin(t * 2 + b.ph)); bubbles.add(compose(_m, b.x, .06, z, 0, 0, 0, s, s * .6, s)); } bubbles.end();
}
/* moon glitter path on the water, lined up under the moon */
const glitMats = [0, 1, 2].map(() => curved(new THREE.MeshBasicMaterial({ color: 0xfff1c4, transparent: true, opacity: .6, depthWrite: false, blending: THREE.AdditiveBlending }), 'glit'));
const glit = glitMats.map((m) => new Batch(new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2), m, 40));
function placeGlitter() {
  for (const b of glit) b.begin();
  for (let i = 0; i < 110; i++) {
    const z = SHORE_Z - .6 - Math.pow(i / 110, 1.5) * 70;
    // x so the column sits under the moon on screen
    _v.set(0, curveY(z), z).project(cam); const x0 = _v.x; _v.set(10, curveY(z), z).project(cam); const sx = (_v.x - x0) / 10;
    const cx = (moonNdcX - x0) / (sx || 1), spread = .35 + (SHORE_Z - z) * .05;
    glit[i % 3].add(compose(_m, cx + rnd(-1, 1) * spread * 1.6, .05, z, 0, rnd(-.1, .1), 0, rnd(.4, 1.3) * (1 + (SHORE_Z - z) * .03), 1, .07 + (SHORE_Z - z) * .006));
  }
  for (const b of glit) b.end();
}

/* ---------- vegetation: instanced, swaying in the shader ---------- */
const SWAY = 'float hh = max(transformed.y, 0.0); wPos.x += sin(uTime*1.6 + wPos.x*.8 + wPos.z*.6) * hh * .28; wPos.z += cos(uTime*1.1 + wPos.x*.5) * hh * .1;';
(function grass() {
  const blade = new THREE.ConeGeometry(.05, .75, 3, 1, true); blade.translate(0, .375, 0);
  const mat = curved(new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide }), 'grass', SWAY);
  const spots = [];
  for (let i = 0; i < 9000 && spots.length < 4200; i++) { const x = rnd(-18, 18), z = rnd(SHORE_Z + 2, 15); if (!isGrass(x, z)) continue; if (Math.sin(x * 1.3 + z * .7) + Math.random() * .9 < -.2) continue; spots.push([x, z]); }
  const im = new THREE.InstancedMesh(blade, mat, spots.length); const greens = ['#6f9a4e', '#86ad5a', '#5d8743', '#9cbf68', '#a9b86a', '#7fa654'];
  spots.forEach(([x, z], i) => { const s = rnd(.6, 1.5); im.setMatrixAt(i, M(x, groundH(x, z) - .02, z, s, s * rnd(.7, 1.5), s, rnd(-.25, .25), rnd(0, 6), rnd(-.25, .25))); _c.set(pick(greens)); im.setColorAt(i, _c); });
  scene.add(im);
})();
(function seaOats() {
  const geo = merge([[CY(.012, .016, 1.1, 3), '#b9a76a', M(0, .55, 0)], [IC(.06, 0), '#e2be6a', M(0, 1.12, 0, 1, 2.6, 1), .08], [IC(.045, 0), '#d6b05c', M(.03, .98, 0, 1, 2.2, 1, 0, 0, -.4), .08], [IC(.045, 0), '#d6b05c', M(-.03, .9, 0, 1, 2.2, 1, 0, 0, .4), .08]]);
  const mat = curved(new THREE.MeshLambertMaterial({ vertexColors: true }), 'oats', SWAY);
  const spots = []; for (let i = 0; i < 4000 && spots.length < 230; i++) { const x = rnd(-16, 16), z = rnd(SHORE_Z + 3, 14); if (!isGrass(x, z) || (Math.abs(x) < 5.0 && z < 9.5)) continue; spots.push([x, z]); }
  const im = new THREE.InstancedMesh(geo, mat, spots.length);
  spots.forEach(([x, z], i) => { const s = rnd(.8, 1.4); im.setMatrixAt(i, M(x, groundH(x, z) - .03, z, s, s, s, rnd(-.15, .15), rnd(0, 6), rnd(-.15, .15))); });
  scene.add(im);
})();
const decoParts = [], glowParts = [];
function clump(x, z, s) { const y = groundH(x, z); for (let k = 0; k < 7; k++) { const a = k / 7 * 6.283 + rnd(-.3, .3); decoParts.push([CN(.09 * s, .9 * s, 4), pick(['#5d8a43', '#6f9a4e', '#4f7d3a']), M(x + Math.cos(a) * .12 * s, y + .4 * s, z + Math.sin(a) * .12 * s, 1, 1, .35, Math.sin(a) * .5, a, -Math.cos(a) * .5), .1]); } }
function palm(x, z, lean) {
  const y0 = groundH(x, z); let px = x, py = y0, pz = z;
  for (let i = 0; i < 7; i++) { const ny = py + .55, nx = px + lean * .09 * i; decoParts.push([CY(.12 - i * .008, .14 - i * .008, .6, 6), i % 2 ? '#8a6a43' : '#9b7a4f', M((px + nx) / 2, (py + ny) / 2, pz, 1, 1, 1, 0, 0, -lean * .09 * i * .9), .05]); px = nx; py = ny; }
  for (let k = 0; k < 7; k++) { const a = k / 7 * 6.283; decoParts.push([IC(.5, 0), k % 2 ? '#3f7d3c' : '#4f9447', M(px + Math.cos(a) * .8, py - .22, pz + Math.sin(a) * .8, 2.1, .14, .5, 0, -a, Math.cos(a) * .35), .06]); }
  for (let k = 0; k < 3; k++) decoParts.push([IC(.11, 0), '#7a5a2e', M(px + rnd(-.15, .15), py - .2, pz + rnd(-.15, .15)), .05]);
}
palm(-7.4, 1.5, -1); palm(7.6, -1.5, 1); palm(-8.2, 6.8, -.6); palm(8.4, 5.2, .8); palm(-6.4, 11.2, -.4); palm(10.5, 11, .5); palm(-11, -2.5, -.6); palm(12, 1.5, .7);
for (let i = 0; i < 70; i++) { const side = i % 2 ? 1 : -1; const x = side * (i < 40 ? rnd(4.9, 6.5) : rnd(6.5, 14)), z = rnd(SHORE_Z + 3, 13); if (isGrass(x, z)) clump(x, z, rnd(.9, 1.6)); }
for (let i = 0; i < 16; i++) clump(rnd(-6, 6), rnd(9.6, 12), rnd(.8, 1.3));
(function shells() {
  for (let i = 0; i < 38; i++) { const x = rnd(-6.5, 6.5), z = rnd(SHORE_Z + .4, 8.4); decoParts.push([S(.07, 7, 4), pick(['#f6e8d6', '#f3c9b5', '#fff1e0', '#efd9c4']), M(x, groundH(x, z) + .005, z, 1, .32, 1.25, 0, rnd(0, 6), 0), .06]); }
  for (let i = 0; i < 30; i++) { const x = rnd(-8, 8), z = rnd(SHORE_Z + .6, 9); decoParts.push([IC(.06, 0), pick(['#9b8b74', '#8a7c68', '#a89880']), M(x, groundH(x, z) + .02, z, 1, .6, 1, 0, rnd(0, 6), 0), .1]); }
})();
function driftwood(x, z, r, len) { const y = groundH(x, z); decoParts.push([CY(.16, .2, len, 7), '#8a6a4a', M(x, y + .1, z, 1, 1, 1, 0, r, Math.PI / 2), .1]); decoParts.push([CY(.07, .09, len * .4, 5), '#7a5c40', M(x + Math.cos(r) * len * .25, y + .25, z - Math.sin(r) * len * .25, 1, 1, 1, .6, r, Math.PI / 2 - .4), .1]); }
driftwood(-6.3, -3.2, .4, 2.2); driftwood(6.6, 4.2, -.3, 1.8); driftwood(-9, 8.5, .2, 2.4);
/* rope fence around the nesting area, lanterns on two posts */
const lanterns = [];
(function fence() {
  const zf = 8.95, posts = []; for (let x = -6.6; x <= 6.61; x += 1.65) posts.push(x);
  for (const x of posts) { const y = groundH(x, zf); decoParts.push([CY(.06, .07, .8, 6), '#8a6a43', M(x, y + .4, zf), .08]); decoParts.push([CN(.075, .1, 6), '#7a5a3a', M(x, y + .85, zf), .08]); }
  for (let i = 0; i < posts.length - 1; i++) { const a = posts[i], b = posts[i + 1]; for (let k = 0; k < 4; k++) { const t0 = k / 4, t1 = (k + 1) / 4, x0 = lerp(a, b, t0), x1 = lerp(a, b, t1); const sag = (t) => -Math.sin(t * Math.PI) * .12; const ya = groundH(x0, zf) + .66 + sag(t0), yb = groundH(x1, zf) + .66 + sag(t1); const len = Math.hypot(x1 - x0, yb - ya); decoParts.push([CY(.018, .018, len, 4), '#e8dcc0', M((x0 + x1) / 2, (ya + yb) / 2, zf, 1, 1, 1, 0, 0, Math.PI / 2 + Math.atan2(yb - ya, x1 - x0))]); } }
  for (const x of [posts[1], posts[posts.length - 2]]) { const y = groundH(x, zf) + .98; decoParts.push([BX(.2, .05, .2), '#3b3b3b', M(x, y + .14, zf)]); decoParts.push([BX(.2, .05, .2), '#3b3b3b', M(x, y - .14, zf)]); glowParts.push([BX(.16, .22, .16), '#ffd27a', M(x, y, zf)]); lanterns.push([x, y, zf]); }
})();
/* keep-off sign: pictogram only (turtle + crossed-out footprint), no letters */
(function sign() {
  const x = -5.25, z = 8.2, y = groundH(x, z);
  decoParts.push([CY(.06, .07, 1.3, 6), '#7a5a3a', M(x, y + .65, z), .08]);
  const tex = canvasTex(256, 176, (c) => {
    c.fillStyle = '#7a5a3a'; c.fillRect(0, 0, 256, 176); c.fillStyle = '#fff3c4'; c.beginPath(); c.roundRect(10, 10, 236, 156, 18); c.fill();
    c.fillStyle = '#3E6B3A'; c.beginPath(); c.ellipse(78, 98, 40, 30, 0, 0, 6.3); c.fill(); c.fillStyle = '#8cc063'; c.beginPath(); c.arc(126, 92, 15, 0, 6.3); c.fill(); for (const [fx, fy] of [[50, 72], [106, 72], [50, 124], [106, 124]]) { c.beginPath(); c.ellipse(fx, fy, 13, 7, fx < 78 ? .6 : -.6, 0, 6.3); c.fill(); }
    c.fillStyle = '#12203A'; c.beginPath(); c.ellipse(190, 96, 15, 24, -.25, 0, 6.3); c.fill(); for (let i = 0; i < 5; i++) { c.beginPath(); c.arc(176 + i * 7, 62 - Math.sin(i / 4 * 3.1) * 5, 4.2, 0, 6.3); c.fill(); }
    c.strokeStyle = '#D93A3A'; c.lineWidth = 11; c.lineCap = 'round'; c.beginPath(); c.arc(190, 90, 42, 0, 6.3); c.stroke(); c.beginPath(); c.moveTo(161, 61); c.lineTo(219, 119); c.stroke();
  });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(1.2, .82), curved(new THREE.MeshLambertMaterial({ map: tex, side: THREE.DoubleSide }), 'sign'));
  m.position.set(x, y + 1.35, z + .06); m.rotation.set(-.3, .3, 0); scene.add(m);
})();
scene.add(new THREE.Mesh(merge(decoParts), MAT));
scene.add(new THREE.Mesh(merge(glowParts), MATE));
const glowTex = canvasTex(64, 64, (x) => { const g = x.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, 'rgba(255,214,130,.85)'); g.addColorStop(.35, 'rgba(255,200,110,.3)'); g.addColorStop(1, 'rgba(255,200,110,0)'); x.fillStyle = g; x.fillRect(0, 0, 64, 64); });
const lanternGlows = lanterns.map(([x, y, z]) => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true })); s.position.set(x, y, z); s.scale.setScalar(2.2); scene.add(s); return s; });

/* tidiness made visible: flowers bloom and dune litter fades as the season gets cleaner */
const flowerSpots = [], debrisSpots = [];
for (let i = 0; i < 4000 && flowerSpots.length < 140; i++) { const x = rnd(-13, 13), z = rnd(SHORE_Z + 3, 13); if (isGrass(x, z)) flowerSpots.push([x, z]); }
for (let i = 0; i < 4000 && debrisSpots.length < 40; i++) { const x = rnd(-9, 9), z = rnd(SHORE_Z + 2.5, 12); if (isGrass(x, z) || z > 8.9) debrisSpots.push([x, z]); }
const flowers = new THREE.InstancedMesh(merge([[IC(.07, 0), '#ffffff', M(0, .05, 0, 1, .5, 1)], [IC(.03, 0), '#ffe38a', M(0, .09, 0)]]), curved(new THREE.MeshLambertMaterial({ vertexColors: true }), 'flw'), flowerSpots.length);
flowerSpots.forEach(([x, z], i) => { flowers.setMatrixAt(i, M(x, groundH(x, z) + .05, z, rnd(.9, 1.6))); _c.set(pick(['#ff8fb1', '#ffd1e0', '#f6f0ff', '#ffb3c7', '#c9a8ff'])); flowers.setColorAt(i, _c); });
scene.add(flowers);
const debris = new THREE.InstancedMesh(BX(.16, .04, .1), curved(new THREE.MeshLambertMaterial({ color: 0xffffff }), 'deb'), debrisSpots.length);
debrisSpots.forEach(([x, z], i) => { debris.setMatrixAt(i, M(x, groundH(x, z) + .02, z, rnd(.8, 1.5), 1, rnd(.8, 1.5), 0, rnd(0, 6), 0)); _c.set(pick([PAL.litter, '#e8e4dc', '#e5583f', '#7fc7e8'])); debris.setColorAt(i, _c); });
scene.add(debris);
function setTidiness(t) { flowers.count = Math.round(flowerSpots.length * (.15 + .85 * t)); debris.count = Math.round(debrisSpots.length * (1 - t)); }

/* ---------- stream (night 6): flowing water band with low banks ---------- */
const streamG = new THREE.Group(); scene.add(streamG); streamG.visible = false;
const streamTex = canvasTex(256, 64, (c) => { const g = c.createLinearGradient(0, 0, 0, 64); g.addColorStop(0, '#2f8fb0'); g.addColorStop(.5, '#46b4c6'); g.addColorStop(1, '#2a7fa6'); c.fillStyle = g; c.fillRect(0, 0, 256, 64); c.strokeStyle = 'rgba(230,250,255,.55)'; c.lineWidth = 2; for (let i = 0; i < 16; i++) { const y = 6 + Math.random() * 52, x = Math.random() * 256; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 24, y); c.stroke(); } });
streamTex.wrapS = THREE.RepeatWrapping; streamTex.repeat.set(5, 1);
(function () {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(34, ST1 - ST0), curved(new THREE.MeshBasicMaterial({ map: streamTex, transparent: true, opacity: .95 }), 'stream')); m.rotation.x = -Math.PI / 2; m.position.set(0, groundH(0, (ST0 + ST1) / 2) + .05, (ST0 + ST1) / 2); m.renderOrder = 1; streamG.add(m);
  const bank = []; for (let i = 0; i < 50; i++) { const x = -17 + i * .7; bank.push([IC(.2, 0), '#b49a6c', M(x, groundH(x, ST0) + .02, ST0 - .05 + rnd(-.05, .05), 1.7, .3, .8), .08]); bank.push([IC(.2, 0), '#b49a6c', M(x + .3, groundH(x, ST1) + .02, ST1 + .05 + rnd(-.05, .05), 1.7, .3, .8), .08]); if (i % 3 === 0) bank.push([CN(.05, .7, 3), '#5f8a45', M(x + rnd(-.2, .2), groundH(x, ST1) + .3, ST1 + .2)]); }
  streamG.add(new THREE.Mesh(merge(bank), MAT));
})();

/* ---------- shared pools: blob shadows, footprints, chunky particles ---------- */
const shadowTex = canvasTex(64, 64, (x) => { const g = x.createRadialGradient(32, 32, 4, 32, 32, 32); g.addColorStop(0, 'rgba(30,26,50,.42)'); g.addColorStop(.6, 'rgba(30,26,50,.22)'); g.addColorStop(1, 'rgba(30,26,50,0)'); x.fillStyle = g; x.fillRect(0, 0, 64, 64); });
const shadows = new Batch(new THREE.PlaneGeometry(2, 2).rotateX(-Math.PI / 2), curved(new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }), 'shd'), 160);
shadows.m.renderOrder = 1;
function shadowAt(x, z, s, sy) { shadows.add(compose(_m, x, groundH(x, z) + .02, z, 0, 0, 0, s, 1, sy || s)); }
const PRINTS = 900, prints = new Batch(new THREE.CircleGeometry(1, 6).rotateX(-Math.PI / 2), curved(new THREE.MeshBasicMaterial({ color: 0xa88c62, transparent: true, opacity: .32, depthWrite: false }), 'prt'), PRINTS);
const printD = Array.from({ length: PRINTS }, () => ({ x: 0, z: 0, r: 0, t: -99 })); let printI = 0;
function addPrint(x, z, r) { const p = printD[printI]; printI = (printI + 1) % PRINTS; p.x = x; p.z = z; p.r = r; p.t = timeU.value; }
function updatePrints() {
  prints.begin(); const now = timeU.value;
  for (const p of printD) { const age = now - p.t; if (age > 7) continue; const f = age < 5 ? 1 : 1 - (age - 5) / 2; prints.add(compose(_m, p.x, groundH(p.x, p.z) + .015, p.z, 0, p.r, 0, .045 * f, 1, .03 * f)); }
  prints.end();
}
const PCOUNT = 320;
const parts = new Batch(IC(1, 0), curved(new THREE.MeshLambertMaterial({ color: 0xffffff }), 'prt3'), PCOUNT);
parts.m.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(PCOUNT * 3).fill(1), 3);   // allocate for the full pool (count starts at 0)
const pd = []; // live particles
function burst3(x, y, z, cols, n, opt = {}) {
  if (REDUCE) n = Math.ceil(n / 3);
  for (let i = 0; i < n && pd.length < PCOUNT; i++) {
    const a = Math.random() * 6.283, s = rnd(.8, 2.4) * (opt.sp || 1);
    pd.push({ x, y, z, vx: Math.cos(a) * s, vz: Math.sin(a) * s, vy: rnd(1.6, 4) * (opt.up || 1), g: opt.g ?? 9, c: cols[i % cols.length], r: rnd(.04, .09) * (opt.size || 1), life: rnd(.5, .9) * (opt.life || 1), t: 0, rx: rnd(0, 6), spin: rnd(-8, 8), flat: !!opt.flat });
  }
}
function updateParts(dt) {
  parts.begin();
  for (let i = pd.length - 1; i >= 0; i--) {
    const p = pd[i]; p.t += dt; if (p.t > p.life) { pd.splice(i, 1); continue; }
    p.vy -= p.g * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt; const gy = groundH(p.x, p.z); if (p.y < gy + p.r) { p.y = gy + p.r; p.vy *= -.3; p.vx *= .6; p.vz *= .6; }
    if (p.g < 2) { p.vx *= .97; p.vz *= .97; }
    p.rx += p.spin * dt; const k = 1 - Math.pow(p.t / p.life, 2);
    parts.m.setColorAt(parts.n, _c.set(p.c));
    parts.add(compose(_m, p.x, p.y, p.z, p.rx, p.rx * .7, 0, p.r * k, p.flat ? p.r * k * .25 : p.r * k, p.r * k));
  }
  parts.end(); if (parts.m.instanceColor) parts.m.instanceColor.needsUpdate = true;
}

/* ---------- apply a mood + terrain to the whole scene ---------- */
let lookKey = '';
function applyLook(mood, terrain) {
  const key = mood + '/' + terrain; if (key === lookKey) return; lookKey = key;
  LK = MOODS[mood] || MOODS.night; TR = TERRAINS[terrain] || TERRAINS.gold;
  scene.fog.color.set(LK.fog);
  hemiL.color.setHex(LK.hemi[0]); hemiL.groundColor.setHex(LK.hemi[1]); hemiL.intensity = LK.hemi[2];
  keyL.color.setHex(LK.key[0]); keyL.intensity = LK.key[1]; rimL.color.setHex(LK.rim[0]); rimL.intensity = LK.rim[1];
  groundMat.roughness = LK.rough; paintGround(); paintSea();
  stars.visible = LK.stars > 0; stars.material.opacity = LK.stars;
  moon.material.color.setHex(LK.disc[0]); moon.material.opacity = LK.disc[3];
  for (const m of glitMats) { m.color.setHex(LK.glit[0]); m.opacity = LK.glit[1]; }
  buildSky(); setRain(!!LK.rain);
}
