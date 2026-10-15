/* ===================== GAME: nights, entities, one-tap help ===================== */
/* ---------- levels: 7 hand-made lessons, then an endless seeded generator (same level = same layout, so retries are fair) ---------- */
const INTRO = [
  { name: 'First hatch', mood: 'dusk', terrain: 'gold', fresh: 10, nests: 1, litter: 4, tangle: 0, rocks: 0, castles: 0, crabs: 0, gulls: 0, tourists: 0, pace0: .28, pace1: .46, events: [{ at: .45, kind: 'trip' }], teach: 'litter', new: 'Tap trash to bin it', fact: "Hatchlings crawl toward the brightest horizon. On a natural beach that is the sea, but lights from buildings can pull them the wrong way." },
  { name: 'Sandcastle', mood: 'night', terrain: 'gold', fresh: 11, nests: 2, litter: 3, tangle: 0, rocks: 1, castles: 2, crabs: 2, crabT: 5, crabSpd: 1.1, burrow: .6, pace0: .26, pace1: .44, events: [{ at: .5, kind: 'crabs' }, { at: .8, kind: 'trip' }], teach: 'castle', new: 'Smash sandcastles. Shoo crabs', fact: "Holes and sandcastles can trap or confuse hatchlings. Fill holes in and knock sandcastles down before you leave the beach." },
  { name: 'Crab beach', mood: 'dawn', terrain: 'gold', fresh: 11, nests: 2, litter: 3, tangle: 1, rocks: 0, castles: 1, umbrellas: 1, crabs: 3, crabT: 3, crabSpd: 1.2, burrow: .55, pace0: .26, pace1: .42, events: [{ at: .4, kind: 'crabs' }, { at: .75, kind: 'gust' }], teach: 'crab', new: 'Crabs pop up from the sand. Fold umbrellas', fact: "Ghost crabs, raccoons and foxes hunt hatchlings on the beach, and the longer a hatchling stays on the sand, the greater the risk." },
  { name: 'Windy shore', mood: 'dusk', terrain: 'blush', fresh: 11, nests: 2, litter: 3, tangle: 1, wind: 4, rocks: 0, castles: 1, umbrellas: 1, holes: 1, crabs: 2, gulls: 0, tourists: 0, balls: 2, burrow: .5, crabSpd: 1.15, pace0: .26, pace1: .42, events: [{ at: .35, kind: 'balls' }, { at: .7, kind: 'hole' }], teach: 'tangle', new: 'Free tangled turtles. Pop balls. Fill holes', fact: "Left-behind beach chairs and umbrellas can confuse or deter nesting mother turtles, and holes can trap hatchlings." },
  { name: 'Gull cove', mood: 'night', terrain: 'pale', fresh: 12, nests: 2, litter: 3, tangle: 2, rocks: 1, castles: 1, holes: 1, crabs: 2, gulls: 1, tourists: 1, tourT: 14, burrow: .5, crabSpd: 1.2, pace0: .25, pace1: .4, events: [{ at: .3, kind: 'trip' }, { at: .6, kind: 'gull' }], teach: 'gull', new: 'Gulls dive. Tourists flash lights', fact: "Bright lights can draw hatchlings away from the ocean. Walk by moonlight or use a red flashlight on the beach at night." },
  { name: 'Rainy season', mood: 'storm', terrain: 'gold', fresh: 12, nests: 2, litter: 3, tangle: 2, rocks: 0, castles: 1, umbrellas: 1, holes: 1, crabs: 2, gulls: 1, tourists: 0, balls: 1, stream: true, rain: true, burrow: .5, crabSpd: 1.2, pace0: .26, pace1: .42, events: [{ at: .3, kind: 'trash' }, { at: .55, kind: 'crabs' }, { at: .8, kind: 'trip' }], teach: 'log', new: 'Rain brings trash and swells the stream', fact: "Only about 1 in 1,000 hatchlings is thought to survive to adulthood. Every one counts." },
  { name: 'The Arribada', place: 'Rushikulya · India', mood: 'night', terrain: 'gold', fresh: 22, nests: 3, litter: 5, tangle: 2, rocks: 1, castles: 1, umbrellas: 1, holes: 1, crabs: 3, gulls: 2, tourists: 1, balls: 1, burrow: .5, crabSpd: 1.25, spawn: .15, events: [{ at: .25, kind: 'crabs' }, { at: .5, kind: 'gull' }, { at: .7, kind: 'hole' }, { at: .85, kind: 'trash' }], teach: 'arribada', big: true, new: 'Thousands arrive at once', fact: "Olive ridleys nest together in huge numbers. Rushikulya in India has seen over 200,000 nests in a single event, and Ostional in Costa Rica is the third largest arribada in the world." }
];
const ATTRACT = { name: '', mood: 'dusk', terrain: 'gold', fresh: 7, nests: 2, litter: 0, tangle: 0, rocks: 0, castles: 0, crabs: 0, gulls: 0, tourists: 0, teach: '', fact: '', attract: true };
const CH_TERRAIN = ['gold', 'blush', 'dark', 'gold', 'pale', 'blush', 'dark', 'pale', 'gold', 'blush'];
const CHAPTERS = ['Tortuguero · Costa Rica', 'Raine Island · Australia', 'Rushikulya · India', 'Ostional · Costa Rica', 'La Escobilla · Mexico', 'Ixtapilla · Mexico', 'Chacocente · Nicaragua', 'Andaman Islands · India', 'Nancite · Costa Rica', 'La Flor · Nicaragua'];
const LNAMES = ['Low tide', 'Hatch time', 'Silver sands', 'Dune dash', 'Starry shore', 'Foam line', 'Quiet cove', 'Night tide', 'Salt breeze', 'Lantern walk', 'Pearl cove', 'Midnight run', 'Shell steps', 'Moon path', 'Tide pools', 'Sandbar', 'Windy point', 'Reef edge', 'Calm waters', 'Last light'];
const FACTS = ['The sand\'s temperature decides whether hatchlings are male or female. Warm nests make females, and about 29°C gives an even mix.', 'Raine Island in Australia, a major green turtle beach, has produced almost only female hatchlings since the 1990s as the sand warmed.', 'Hatchlings pulled the wrong way by lights rest often, which keeps them on the beach longer and raises the risk from crabs and sun.', 'Playa La Escobilla in Mexico was once the largest arribada site on the planet.', 'Scientists are testing ways to cool turtle nests, including shading and spraying water.', 'Ostional in Costa Rica has the third largest arribada in the world.', 'Left-behind beach chairs and umbrellas can confuse or deter nesting mother turtles.', 'In real life, never pick up a hatchling. Clear its path and let it crawl on its own.', 'Green turtles nest in huge numbers at Tortuguero in Costa Rica.', 'Nesting at Nancite in Costa Rica has fallen by about 90 percent since the early 1970s.', 'Walk the beach by moonlight or use a red flashlight so hatchlings are not drawn off course.', 'Beach trash is a hazard for hatchlings and nesting turtles. Pack out what you bring in.'];
const _spec = {};
function srand(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function withSeed(seed, fn) { const o = Math.random, r = srand(seed); Math.random = r; try { fn(); } finally { Math.random = o; } }
function levelSpec(i) {
  if (i < 0) return ATTRACT;
  if (i < INTRO.length) return INTRO[i];
  if (_spec[i]) return _spec[i];
  const r = srand(i * 7919 + 101), k = i - INTRO.length, num = i + 1;
  const mega = num % 25 === 0, boss = !mega && num % 10 === 0, easy = !mega && !boss && num % 5 === 0;
  let D = 2.2 + k * .3 + (r() - .5) * 1.8; if (easy) D -= 2.4; if (boss) D += 1.4; D = clamp(D, 1.2, 12);
  const S = { name: mega ? 'Big hatch' : boss ? ['Busy night', 'Crowded cove', 'Rush hour', 'Full moon rush'][(num / 10 | 0) % 4] : easy ? 'Easy breezy' : LNAMES[(i * 7) % LNAMES.length], big: mega, fact: FACTS[(i * 5) % FACTS.length] };
  S.fresh = Math.round(7 + D * .8 + r() * 3); S.spawn = 0;
  if (mega) { S.fresh = 22 + Math.floor(D); S.spawn = .16; }
  S.nests = S.fresh <= 8 ? 2 : 3;
  S.litter = Math.round(3 + D * .55 + r() * 2) - (easy ? 1 : 0); S.tangle = Math.min(4, 1 + Math.floor(D / 2.8) + (r() < .3 ? 1 : 0));
  S.rocks = r() < .5 ? 1 : (r() < .5 ? 2 : 0);
  S.castles = r() < .65 ? 1 + (D > 6 && r() < .5 ? 1 : 0) : 0;
  S.umbrellas = r() < .5 ? 1 + (D > 8 && r() < .4 ? 1 : 0) : 0;
  S.holes = i >= 9 && r() < .6 ? 1 + (D > 7 && r() < .5 ? 1 : 0) : 0;
  S.crabs = Math.min(4, 1 + Math.floor(D / 2.6)); S.crabSpd = Math.min(1.8, 1.1 + D * .06); S.burrow = clamp(.3 + D * .05 + (r() - .5) * .3, .2, .85); S.crabT = 3 + r() * 3;
  S.gulls = D >= 2.4 ? (D >= 6.5 && r() < .55 ? 2 : 1) : 0;
  S.tourists = D >= 3.4 ? (D >= 7.5 && r() < .5 ? 2 : 1) : 0; S.tourT = 8 + r() * 6;
  S.balls = r() < .65 ? (D >= 6 && r() < .5 ? 2 : 1) : 0;
  S.wind = r() < .4 ? 2 + Math.floor(D / 3) : 0;
  S.stream = i >= 11 && r() < .22;
  S.pace0 = .27 + r() * .12; S.pace1 = S.pace0 + .14 + r() * .2; S.lull = r() < .45 ? .9 + r() * .9 : 0;
  // one flavour per level so they stop feeling the same
  const flav = easy ? 'chill' : boss || mega ? 'mix' : ['rush', 'crabfest', 'litterbug', 'gusty', 'birds', 'plain', 'plain'][Math.floor(r() * 7)];
  if (flav === 'rush') { S.pace0 = .2; S.pace1 = .34; S.fresh += 3; S.tag = 'Rush hour'; }
  else if (flav === 'crabfest') { S.crabs = 4; S.burrow = .8; S.crabSpd = Math.min(1.8, S.crabSpd + .1); S.tag = 'Crab party'; }
  else if (flav === 'litterbug') { S.litter += 4; S.tangle = Math.min(5, S.tangle + 1); S.holes += 1; S.tag = 'Litterbug'; }
  else if (flav === 'gusty') { S.wind = 4 + Math.floor(D / 3); S.balls = Math.max(S.balls, 2); S.tag = 'Gusty'; }
  else if (flav === 'birds') { S.gulls = 2; S.tourists = Math.max(1, S.tourists); S.tag = 'Birds and flashes'; }
  else if (flav === 'chill') { S.crabs = Math.max(1, S.crabs - 1); S.tag = 'Easy breezy'; }
  const mr = r(); S.mood = mr < .38 ? 'night' : mr < .6 ? 'dusk' : mr < .8 ? 'dawn' : 'storm'; S.rain = S.mood === 'storm'; S.terrain = CH_TERRAIN[(i / 10 | 0) % 10];
  // surprises that fire mid-level
  const kinds = ['trip', 'crabs', 'gust', 'trash']; if (S.balls) kinds.push('balls'); if (S.gulls) kinds.push('gull'); if (S.tourists) kinds.push('tourist'); if (S.holes) kinds.push('hole');
  const ne = clamp(Math.round(D / 3 + r() * 1.3) + (boss || mega ? 1 : 0) - (easy ? 1 : 0), easy ? 0 : 1, 4), at = [];
  for (let e = 0; e < ne; e++) at.push(.22 + r() * .66); at.sort((x, y) => x - y);
  S.events = at.map((t) => ({ at: t, kind: kinds[Math.floor(r() * kinds.length)] }));
  S.teach = '';
  return (_spec[i] = S);
}
const BIN_CAP = 6;
const POWERS = ['clean', 'surge', 'ranger'];

/* ---------- state ---------- */
let night = 0, crew = 0, carry = 0, spec = INTRO[0], attract = false, paused = false, charge = 0, powerReady = false, powerKind = null, surgeT = 0, rangerT = 0, introT = 0, introMax = 1, rainT = 0, boltT = 9, bolt = 0;
const season = { met: 0, saved: 0, spawned: 0, binned: 0 };
let T = [], litter = [], rocks = [], crabs = [], gulls = [], tourists = [], logs = [], nests = [], balls = [];
let spawnLeft = 0, spawnT = 0, safeN = 0, lostN = 0, total = 0, binnedN = 0, running = false, ended = false, time = 0, nightT = 0, windLeft = 0, windT = 0;
let evDone = [], lastTapT = 0, idleHeartT = 8, dangerOn = false, dangerT = 0, passed = false, taught = {}, hand = null, combo = 0, comboT = 0, comboKind = 'tidy', slow = 1, slowT = 0, freeze = 0, lastOne = false, tidyNow = 0;
const surfLog = [];
const nightRoot = new THREE.Group(); scene.add(nightRoot);
const bin = makeBin(4.5, 3.4);
const vol = Object.assign(makePerson('vol'), { st: 'idle', x: 8, z: 3.6, walk: 0, t: 0, dir: -1 });
const crabPool = [makeCrab(), makeCrab(), makeCrab(), makeCrab()], gullPool = [makeGull(), makeGull(), makeGull()], touristPool = [makePerson('tourist'), makePerson('tourist')];
touristPool.forEach((p) => { p.cone = new THREE.Mesh(GEO.flashCone, flashMat); p.cone.position.set(0, 1.3, .3); p.tilt.add(p.cone); });
const allowedLoss = () => Math.max(0, total - Math.ceil(total * .7));
const dolMesh = new THREE.Mesh(GEO.dolphin, MAT); dolMesh.visible = false; dolMesh.rotation.order = 'YXZ'; scene.add(dolMesh);
const dol = { on: false, p: 0, next: 14, dir: 1, z: -11, splashed: 0 };
function updateDolphin(dt) {
  if (!dol.on) { if (spec.mood !== 'storm' && (dol.next -= dt) <= 0) { dol.on = true; dol.p = 0; dol.dir = Math.random() < .5 ? -1 : 1; dol.z = SHORE_Z - rnd(2.4, 4.4); dol.splashed = 0; } else return; }
  dol.p += dt / 1.7; const u = dol.p;
  if (u >= 1) { dol.on = false; dolMesh.visible = false; dol.next = rnd(26, 48); const x = 4.6 * dol.dir; ui.fx('splash', x, 0, dol.z); burst3(x, .05, dol.z, ['#bfe8e0', '#ffffff'], 8, { up: 1.2, size: .8 }); return; }
  const x = lerp(-4.6, 4.6, u) * dol.dir, y = Math.sin(u * Math.PI) * 1.35 - .3, ang = Math.atan2(Math.cos(u * Math.PI) * Math.PI * 1.35, 9.2);
  dolMesh.visible = y > -.25; dolMesh.position.set(x, y, dol.z); dolMesh.scale.setScalar(1.25); dolMesh.rotation.set(0, dol.dir > 0 ? 0 : Math.PI, ang);
  if (!dol.splashed && y > -.2) { dol.splashed = 1; ui.fx('splash', x, 0, dol.z); burst3(x, .05, dol.z, ['#bfe8e0', '#ffffff'], 8, { up: 1.2, size: .8 }); sfx.water(); }
}
const tidy = () => season.spawned ? season.binned / season.spawned : 0;

function clearNight() {
  while (nightRoot.children.length) { const c = nightRoot.children[0]; nightRoot.remove(c); if (c.userData.own) c.geometry.dispose(); }
  for (const c of crabPool) c.g.visible = false; for (const g of gullPool) { g.g.visible = false; g.sil.visible = false; } for (const p of touristPool) p.g.visible = false;
  T = []; litter = []; rocks = []; crabs = []; gulls = []; tourists = []; logs = []; nests = []; balls = [];
}
function freeSpot(minD, zmin, zmax, L) {
  for (let tr = 0; tr < 120; tr++) {
    const x = rnd(-3.3, 3.3), z = rnd(zmin, zmax);
    if (L.stream && z > ST0 - .8 && z < ST1 + .8) continue;
    if ([...rocks, ...litter].some((o) => d2(o.x, o.z, x, z) < minD)) continue;
    if (nests.some((n) => d2(n.x, n.z, x, z) < 1.8)) continue;
    return [x, z];
  }
  return [rnd(-3.5, 3.5), rnd(zmin, zmax)];
}
function startNight(i) {
  clearNight(); night = i; const L = spec = levelSpec(i); ended = false; applyLook(L.mood, L.terrain); powerKind = i >= 2 ? POWERS[i % 3] : null; charge = powerKind ? .25 : 0; powerReady = false; surgeT = rangerT = 0; paused = false; if (vol.st === 'patrol') { vol.st = 'idle'; vol.g.visible = false; }
  introMax = introT = attract ? 0 : (i === 0 ? 1.5 : 1.1); evDone = []; lastTapT = 0; idleHeartT = 8; dangerOn = false; passed = false; ui.danger(false); rainT = 4; boltT = rnd(5, 9);
  total = L.fresh; season.met += L.fresh; spawnLeft = total; spawnT = attract ? .9 : (i === 0 ? 1.6 : 1.1); safeN = 0; lostN = 0; binnedN = 0; running = true; nightT = 0; lastOne = false; combo = 0; slow = 1; hand = null;
  windLeft = L.wind || 0; windT = 4; streamG.visible = !!L.stream;
  setTidiness(tidyNow = tidy());
  withSeed(i * 2654435 + 977, () => {
  let xs = L.nests === 1 ? [0] : L.nests === 2 ? [-2.1, 2.1] : [-3, 0, 3];
  if (!L.teach && !L.attract) xs = L.nests === 2 ? [rnd(-3.5, -1.3), rnd(1.3, 3.5)] : [rnd(-3.6, -2.2), rnd(-.9, .9), rnd(2.2, 3.6)];
  for (const x of xs) { const m = new THREE.Mesh(GEO.nest, MAT); m.position.set(x, groundH(x, NEST_Z), NEST_Z); m.scale.setScalar(1.15); nightRoot.add(m); nests.push({ x, z: NEST_Z, left: 0, wob: 0, eggs: Array.from({ length: 9 }, (_, k) => [Math.cos(k * 2.4) * (k ? .32 : 0) * (1 + (k % 2) * .3), Math.sin(k * 2.4) * (k ? .22 : 0)]) }); }
  for (let k = 0; k < total; k++) nests[k % nests.length].left++;
  for (let k = 0; k < L.rocks; k++) { const [x, z] = freeSpot(2.2, SHORE_Z + 2, NEST_Z - 2.2, L); const r = rnd(.48, .62); const m = new THREE.Mesh(rockGeo(r, Math.random() < .25), MAT); m.userData.own = 1; m.position.set(x, groundH(x, z) + r * .25, z); nightRoot.add(m); rocks.push({ x, z, r, st: 'idle', vx: 0, vy: 0, y: 0, rot: 0, m }); }
  for (let k = 0; k < (L.castles || 0); k++) { const [x, z] = freeSpot(2.4, SHORE_Z + 2, NEST_Z - 2.4, L); const m = new THREE.Mesh(GEO.castle, MAT); m.scale.setScalar(1.15); m.position.set(x, groundH(x, z), z); m.rotation.y = rnd(-.4, .4); nightRoot.add(m); rocks.push({ x, z, r: .62, st: 'idle', vx: 0, vy: 0, y: 0, rot: 0, m, castle: true, ct: 0, bs: 1.15 }); }
  for (let k = 0; k < (L.umbrellas || 0); k++) { const [x, z] = freeSpot(2.6, SHORE_Z + 2.4, NEST_Z - 2.6, L); const m = new THREE.Mesh(GEO.umbrella, MAT); m.scale.setScalar(1.1); m.position.set(x, groundH(x, z), z); m.rotation.y = rnd(-.5, .5); nightRoot.add(m); rocks.push({ x, z, r: .66, st: 'idle', vx: 0, vy: 0, y: 0, rot: 0, m, castle: true, umb: true, ct: 0, bs: 1.1 }); }
  const nL = L.litter;
  for (let k = 0; k < nL; k++) { const tang = k < L.tangle; const [x, z] = freeSpot(1.7, SHORE_Z + 1.6, NEST_Z - 2.4, L); addLitter(tang ? pick(TANGLERS) : pick(BLOCKERS), x, z); }
  for (let k = 0; k < (L.holes || 0); k++) { const [x, z] = freeSpot(1.9, SHORE_Z + 2.6, NEST_Z - 3, L); addLitter('hole', x, z); }
  // teaching night: put the first piece of trash right in the path of the first hatchling
  if (L.teach === 'litter' && litter[0]) { litter[0].x = rnd(-.4, .4); litter[0].z = NEST_Z - 3.2; }
  if (L.teach === 'castle') { const c0 = rocks.find((r) => r.castle && !r.umb); if (c0) { c0.x = nests[0].x + .2; c0.z = NEST_Z - 3.4; c0.m.position.set(c0.x, groundH(c0.x, c0.z), c0.z); } }
  for (let k = 0; k < L.crabs; k++) crabs.push({ st: 'wait', t: (L.crabT || 3) + k * 3.5, x: 0, z: 0, vx: 0, vz: 0, sp: 0, tgt: null, leg: 0, claw: 0, retT: 0, v: crabPool[k] });
  for (let k = 0; k < L.gulls; k++) gulls.push({ st: 'off', t: 5 + k * 4, x: 0, y: 3, z: 0, dir: 1, flap: 0, tgt: null, v: gullPool[k] });
  for (let k = 0; k < L.tourists; k++) tourists.push({ st: 'wait', t: (L.tourT || 7) + k * 6, x: 0, z: 0, tx: 0, dir: 1, walk: 0, flashT: 0, stand: 0, bow: 0, v: touristPool[k] });
  if (L.stream) for (let k = 0; k < 3; k++) { const m = new THREE.Mesh(GEO.log, MAT); const w = rnd(1.6, 2.3); m.scale.set(w, 1, 1); nightRoot.add(m); logs.push({ x: -8 + k * 5.5, z: rnd(ST0 + .35, ST1 - .35), w, st: 'float', vx: 0, vz: 0, rot: 0, m }); }
  for (let k = 0; k < (L.balls || 0); k++) { const m = new THREE.Mesh(GEO.ball, MAT); m.scale.setScalar(MS); m.visible = false; nightRoot.add(m); balls.push({ st: 'wait', t: 6 + k * 4.5, x: 0, z: 0, y: .3, dir: 1, rot: 0, ph: rnd(0, 6), pt: 0, hitCool: 0, m }); }
  });
  ui.night(); ui.power();
  if (L.teach === 'arribada') { shake = .25; sfx.win(); }
}
GEO.log = merge([[CY(.19, .19, 1, 8), '#8a5a34', M(0, 0, 0, 1, 1, 1, 0, 0, Math.PI / 2), .08], [CY(.17, .17, .02, 8), '#d5a36c', M(.5, 0, 0, 1, 1, 1, 0, 0, Math.PI / 2)], [CY(.17, .17, .02, 8), '#d5a36c', M(-.5, 0, 0, 1, 1, 1, 0, 0, Math.PI / 2)], [CN(.05, .2, 4), '#5f8a45', M(.2, .2, 0, 1, 1, 1, 0, 0, -.4)]]);
function addLitter(kind, x, z, drift) {
  const m = new THREE.Mesh(GEO.litter[kind], MAT); m.scale.setScalar(MS * 1.15); nightRoot.add(m);
  const l = { kind, tang: TANGLERS.includes(kind) || kind === 'hole', hole: kind === 'hole', x, z, y: 0, st: drift ? 'drift' : 'lie', m, rot: rnd(0, 6), t: null, ft: 0, fx: 0, fy: 0, fz: 0, tx: 0, wob: rnd(0, 6), r: kind === 'bag' ? .32 : .26 };
  if (drift) { l.dir = x < 0 ? 1 : -1; l.tx = rnd(-2.8, 2.8); }
  litter.push(l); if (!l.hole) season.spawned++; return l;
}

/* ---------- hatching ---------- */
function spawnTurtle() {
  const live = nests.filter((n) => n.left > 0); const n = live[(Math.random() * live.length) | 0]; n.left--;
  const idx = total - spawnLeft, isCrew = idx < crew;
  let tx = clamp(n.x + rnd(-2.4, 2.4), -3.9, 3.9);
  if (idx === 0 && spec.teach === 'litter' && litter[0]) tx = litter[0].x;
  if (idx === 0 && spec.teach === 'castle') { const c0 = rocks.find((r) => r.castle && !r.umb); if (c0) tx = c0.x; }
  T.push({ x: n.x + rnd(-.25, .25), z: n.z - .25, tx, st: 'walk', flipT: 0, ph: Math.random() * 6, hd: Math.PI, sp: rnd(.85, 1.05) * (spec.teach === 'arribada' ? 1.1 : 1), stuck: 0, block: null, vy: 0, hgt: 0, crew: isCrew, pop: 0, born: 0, hop: 0, lure: 0, lx: 0, lz: 0, sink: 0, gone: 0, printT: 0, step: 1, tang: null, boopT: 0, lostWhy: '', look: 0 });
  if (night === 0 && idx === 2 && !taught.lore && !hand && !attract) { taught.lore = 1; ui.cap("You can't steer them. Clear what people left behind.", 3.4); }
  spawnLeft--; n.wob = .4; sfx.hatch(); burst3(n.x, .2, n.z, ['#f4ead2', '#e6cfa0'], 8, { size: .9 });
}

/* ---------- input ---------- */
ov.addEventListener('pointerdown', (e) => { au(); if (!running || paused) return; const r = ov.getBoundingClientRect(); tap(e.clientX - r.left, e.clientY - r.top); });
const _ray = new THREE.Raycaster(), _nd = new THREE.Vector2();
function groundAt(px, py) {
  _nd.set(px / W * 2 - 1, -(py / H) * 2 + 1); if (_nd.y > horizonY - .01) return null; _ray.setFromCamera(_nd, cam); const o = _ray.ray.origin, d = _ray.ray.direction;
  if (d.y > -.02) return null;
  let h = 0, x = 0, z = 0; for (let i = 0; i < 3; i++) { const t = (h - o.y) / d.y; x = o.x + d.x * t; z = o.z + d.z * t; h = Math.max(-.1, groundH(x, z)); }
  if (z < SHORE_Z - 12) return null; return { x, z };
}
function tap(px, py) {
  lastTapT = nightT; let best = null, bd = 1e9; const k = W / 390;
  const consider = (o, sx, sy, lim, kind) => { const d = Math.hypot(px - sx, py - sy); if (d < lim && d < bd) { bd = d; best = { o, kind }; } };
  // urgent rescues first
  for (const t of T) if (t.st === 'flip' || t.st === 'tangle') { const s = scr(t.x, .25, t.z); consider(t, s.x, s.y, 52 * k, t.st); }
  for (const g of gulls) if (g.st === 'circle' || g.st === 'dive' || g.st === 'carry') { const s = scr(g.x, g.y, g.z); consider(g, s.x, s.y, 62 * k, 'gull'); if (g.st === 'dive' && g.tgt) { const s2 = scr(g.tgt.x, .2, g.tgt.z); consider(g, s2.x, s2.y, 52 * k, 'gull'); } }
  if (!best) {
    for (const c of crabs) if (c.st === 'walk' || c.st === 'leave' || c.st === 'emerge') { const s = scr(c.x, .25, c.z); consider(c, s.x, s.y, 50 * k, 'crab'); }
    for (const tr of tourists) if (tr.st === 'enter' || tr.st === 'stand') { const s = scr(tr.x, 1.4, tr.z); consider(tr, s.x, s.y, 72 * k, 'tourist'); const s2 = scr(tr.x, .3, tr.z); consider(tr, s2.x, s2.y, 56 * k, 'tourist'); }
    for (const l of logs) if (l.st === 'float') { const a = scr(l.x - l.w / 2, .1, l.z), b = scr(l.x + l.w / 2, .1, l.z); const u = clamp(((px - a.x) * (b.x - a.x) + (py - a.y) * (b.y - a.y)) / ((b.x - a.x) ** 2 + (b.y - a.y) ** 2 || 1), 0, 1); consider(l, a.x + (b.x - a.x) * u, a.y + (b.y - a.y) * u, 38 * k, 'log'); }
    for (const b of balls) if (b.st === 'roll') { const s = scr(b.x, b.y, b.z); consider(b, s.x, s.y, 58 * k, 'ball'); }
    for (const l of litter) if (l.st === 'lie' || l.st === 'drift') { const s = scr(l.x, .15, l.z); consider(l, s.x, s.y, 46 * k, 'litter'); }
    for (const r of rocks) if (r.st === 'idle') { const s = scr(r.x, .2, r.z), e = scr(r.x + r.r, .2, r.z); consider(r, s.x, s.y, Math.abs(e.x - s.x) + 30 * k, 'rock'); if (r.umb) { const s3 = scr(r.x, 1.5, r.z); consider(r, s3.x, s3.y, 64 * k, 'rock'); } }
  }
  if (!best) { for (const t of T) if (t.st === 'walk') { const s = scr(t.x, .25, t.z); consider(t, s.x, s.y, 34 * k, 'boop'); } const sb = scr(bin.x, 1, bin.z); consider(bin, sb.x, sb.y, 44 * k, 'bin'); }
  if (!best) { surfaceTap(px, py); return; }
  const o = best.o; hand = null; freeze = .05;
  if (best.kind === 'flip') { o.st = 'walk'; o.flipT = 0; o.pop = 1; o.look = 1.3; rescue('rescue', o, pick(['Saved!', 'Phew!', 'Up you get!'])); ui.fact('hands'); sfx.flip(combo); burst3(o.x, .35, o.z, ['#ffd166', '#ffffff', '#8fd19e'], 14); ui.fx('sparkle', o.x, .5, o.z); }
  else if (best.kind === 'tangle') { toss(o.tang); }
  else if (best.kind === 'gull') shoo(o);
  else if (best.kind === 'crab') { o.st = 'flee'; o.dir = o.x < 0 ? -1 : 1; sfx.crab(); burst3(o.x, .1, o.z, ['#e9d3a6', '#d9bd86'], 10); if (o.tgt) rescue('shoo', null); ui.float(o.x, .6, o.z, 'Shoo!'); ui.fact('crab'); }
  else if (best.kind === 'tourist') { o.st = 'sorry'; o.bow = 0; o.dir = o.x < 0 ? -1 : 1; sfx.hey(); ui.float(o.x, 2.7, o.z, 'Sorry!'); burst3(o.x, 1.6, o.z, ['#fff1c0', '#ffffff'], 10, { g: 3 }); rescue('shoo', null); ui.fact('light'); }
  else if (best.kind === 'log') { o.st = 'push'; o.vx = 9; o.vz = rnd(-.5, .5); sfx.log(); burst3(o.x, .15, o.z, ['#bfe6ff', '#ffffff', '#46b4c6'], 14); }
  else if (best.kind === 'litter') toss(o);
  else if (best.kind === 'ball') { o.st = 'pop'; o.pt = 0; sfx.boop(); sfx.rock(); burst3(o.x, o.y, o.z, ['#e8664a', '#fbf1d8', '#3f9bf0', '#E0B040'], 20, { g: 3 }); rescue('shoo', null); ui.float(o.x, 1, o.z, 'Pop!'); ui.fact('gear'); }
  else if (best.kind === 'rock' && o.castle) { o.st = 'crumble'; o.ct = 0; sfx.rock(); burst3(o.x, .4, o.z, ['#e2c27c', '#e8cd8c', '#fff1d0', '#c9a55e'], 26, { up: 1.4 }); shake = .16; rescue('tidy', null); ui.float(o.x, 1.2, o.z, o.umb ? 'Folded!' : 'Smash!'); ui.fact(o.umb ? 'gear' : 'castle'); }
  else if (best.kind === 'rock') { o.st = 'roll'; o.vx = (o.x < 0 ? -1 : 1) * 8.5; o.vy = 3; sfx.rock(); burst3(o.x, .15, o.z, ['#e9d3a6', '#c9ab72', '#fff1d0'], 16); shake = .12; rescue('tidy', null); }
  else if (best.kind === 'boop') { if (o.boopT <= 0) { o.hop = 1; o.boopT = .45; o.look = 1; sfx.boop(); ui.fx('heart', o.x, .7, o.z); } }
  else if (best.kind === 'bin') { bin.sq = 1; bin.lidT = .5; sfx.bin(); }
  ui.ripple(px, py, best.kind === 'boop' || best.kind === 'bin' ? 'rgba(255,255,255,.5)' : 'rgba(255,209,102,.8)');
}
/* every tap answers: water splashes, sand puffs, grass rustles, the sky twinkles */
function surfaceTap(px, py) {
  const g = groundAt(px, py); let kind;
  if (!g) { kind = 'sky'; sfx.sky(); ui.fx('twinkle', 0, 0, 0, px, py); }
  else if (g.z < shore(g.x, time) - .05) { kind = 'water'; sfx.water(); burst3(g.x, .05, g.z, ['#bfe8e0', '#ffffff', '#47c1bb'], 9, { up: 1.1, size: .8 }); ui.fx('splash', g.x, 0, g.z); }
  else if (isGrass(g.x, g.z)) { kind = 'grass'; sfx.grass(); burst3(g.x, .25, g.z, ['#6f9a4e', '#9cbf68', '#86ad5a'], 7, { g: 4, flat: true, size: .9 }); }
  else if (g.z < SHORE_Z + 1.7) { kind = 'wet'; sfx.wetsand(); burst3(g.x, .05, g.z, ['#b89b70', '#a3895f'], 6, { up: .6, size: .8 }); ui.fx('ring', g.x, 0, g.z); }
  else { kind = 'sand'; sfx.sand(); burst3(g.x, .05, g.z, ['#e6cfa0', '#f1dfb6', '#d9be8c'], 7, { up: .8, size: .8 }); }
  surfLog.push(kind); if (surfLog.length > 20) surfLog.shift();
  ui.ripple(px, py, 'rgba(255,255,255,.35)');
}
function addCharge(v) {
  if (!powerKind || powerReady) return; charge = Math.min(1, charge + v);
  if (charge >= 1) { powerReady = true; sfx.ready(); if (!taught.power) { taught.power = 1; ui.cap('Boost ready! Tap the glowing button', 3.2); } }
  ui.power();
}
function usePower() {
  if (!powerKind || !running || paused) return false;
  if (powerReady) { powerReady = false; charge = 0; } else if (PROG.boosts > 0) { PROG.boosts--; saveProg(); } else return false;
  sfx.power(); shake = .2;
  if (powerKind === 'clean') {
    let n = 0; for (const l of litter.slice()) if (l.st === 'lie' || l.st === 'drift' || l.st === 'tangle') { setTimeout(() => { if (l.st !== 'fly' && l.st !== 'binned') toss(l); }, n * 70); n++; }
    for (const r of rocks) if (r.st === 'idle') { if (r.castle) { r.st = 'crumble'; r.ct = 0; } else { r.st = 'roll'; r.vx = (r.x < 0 ? -1 : 1) * 8.5; r.vy = 3; } burst3(r.x, .4, r.z, ['#e2c27c', '#fff1d0'], 14); }
    ui.cap('Beach clean!', 1.8);
  } else if (powerKind === 'surge') { surgeT = 6.5; ui.cap('Moon surge!', 1.8); }
  else { rangerT = 9; vol.st = 'patrol'; vol.x = 8.5; vol.z = NEST_Z - 3.2; vol.dir = -1; vol.g.visible = true; ui.cap('Ranger on patrol!', 1.8); }
  ui.power(); return true;
}
function rescue(kind, t, label) {
  addCharge(kind === 'rescue' ? .14 : .09); if (t && kind === 'rescue') t.helped = 1;
  combo = comboT > 0 ? combo + 1 : 1; comboT = 2.6; comboKind = kind;
  if (t && label) ui.float(t.x, .6, t.z, label);
  if (combo >= 2) { sfx.combo(combo); ui.combo(combo, kind); }
}
function shoo(g) {
  if (g.st === 'carry' && g.tgt) { const t = g.tgt; t.st = 'drop'; t.vy = 0; t.hgt = g.y - .5; ui.float(t.x, t.hgt + .4, t.z, 'Got it back!'); rescue('rescue', null); slow = 1; slowT = 0; if (!taught.drop) { taught.drop = 1; ui.cap('Now flip it back!', 2.5); } }
  else if (g.st === 'dive') { rescue('shoo', null); ui.fact('gull'); }
  g.st = 'shoo'; g.tgt = null; g.v.sil.visible = false; sfx.gull(); burst3(g.x, g.y, g.z, ['#ffffff', '#f4efe3', '#dfe7ef'], 14, { g: 1.2, flat: true, sp: 1.2 }); g.t = rnd(3, 5);
}
function fillHole(l) {
  if (l.t) { const t = l.t; t.st = 'walk'; t.tang = null; t.flipT = 0; t.pop = 1; t.look = 1.3; l.t = null; sfx.untangle(combo); rescue('rescue', t, 'Out you pop!'); ui.fx('sparkle', t.x, .5, t.z); }
  else { rescue('tidy', null); ui.float(l.x, .7, l.z, 'Filled in!'); }
  l.st = 'filled'; l.m.visible = false; sfx.sand(); burst3(l.x, .15, l.z, ['#e6cfa0', '#f1dfb6', '#d9be8c', '#fff1d0'], 20, { up: 1.2 }); ui.fact('hole');
  if (hand && hand.o === l) hand = null;
}
function toss(l) {
  if (!l || l.st === 'fly' || l.st === 'binned' || l.st === 'filled') return;
  if (l.hole) { fillHole(l); return; }
  if (l.t) { ui.fact('tangle'); const t = l.t; t.st = 'walk'; t.tang = null; t.flipT = 0; t.pop = 1; t.look = 1.3; l.t = null; sfx.untangle(combo); rescue('rescue', t, 'Free!'); ui.fx('sparkle', t.x, .5, t.z); burst3(t.x, .3, t.z, ['#ffd166', '#ffffff', '#8fd19e'], 12); }
  else { sfx.pickup(); rescue('tidy', l, null); ui.fact(l.kind === 'bag' || l.kind === 'line' || l.kind === 'rings' ? 'tangle' : 'litter'); }
  l.st = 'fly'; l.ft = 0; l.fx = l.x; l.fz = l.z; l.fy = l.y; burst3(l.x, .1, l.z, ['#e6cfa0', '#f1dfb6'], 8, { size: .8 });
  if (hand && hand.o === l) hand = null;
}
function landInBin(l) {
  l.st = 'binned'; l.m.visible = false; bin.n++; binnedN++; season.binned++; bin.sq = 1; bin.lidT = .45;
  if (!taught.binned) { taught.binned = 1; ui.cap('Into the bin. Keep the path clear!', 2.4); buzz([10, 30, 14]); }
  sfx.clunk(bin.n); burst3(bin.x, 1.35, bin.z, ['#4FA3D9', '#ffffff', '#bfe8e0'], 8, { size: .7 });
  ui.fx('recycle', bin.x, 1.6, bin.z); ui.hud();
  const pile = bin.pile.children; for (let i = 0; i < pile.length; i++) pile[i].visible = false;   // items disappear into the bin; a visible pile looked like the trash had come back out
  if (bin.n >= BIN_CAP - 1 && vol.st === 'idle') { vol.st = 'enter'; vol.x = 8.5; vol.z = bin.z + .8; vol.g.visible = true; }
}

/* ---------- update ---------- */
function update(dt) {
  time += dt; nightT += dt; timeU.value += dt; const L = spec; updateDolphin(dt);
  if (comboT > 0) comboT -= dt;
  if (running && spawnLeft > 0 && (spawnT -= dt) <= 0) { spawnTurtle(); spawnT = FAST ? .12 : (L.spawn ? rnd(L.spawn * .6, L.spawn * 1.4) : L.pace0 ? rnd(L.pace0, L.pace1) + (L.lull && (total - spawnLeft) % 5 === 0 ? L.lull : 0) : rnd(.38, .62)); }
  for (const n of nests) n.wob = Math.max(0, n.wob - dt);
  if (introT > 0) { introT -= dt; if (Math.random() < dt * 7) { const n = pick(nests); n.wob = .35; tone(700 + Math.random() * 500, .05, 'square', .018, 0, 0, 0); buzz(4); } if (!taught.hatching && introT < 2.2 && !attract && night === 0) { taught.hatching = 1; ui.cap('The eggs are hatching…', 2.2); } }
  if (L.rain) {
    if (running && (rainT -= dt) <= 0) { rainT = rnd(5.5, 8); const left = Math.random() < .5; addLitter(pick(['can', 'bottle', 'bag', 'cup']), left ? -6.5 : 6.5, rnd(SHORE_Z + 2, NEST_Z - 2.5), true); if (!taught.rain) { taught.rain = 1; ui.cap('The rain washes trash ashore…', 2.4); ui.fact('rain'); } }
    if ((boltT -= dt) <= 0) { boltT = rnd(9, 16); bolt = 1; setTimeout(() => sfx.thunder(), 380 + Math.random() * 500); }
  }
  if (bolt > 0) bolt = Math.max(0, bolt - dt * 2.4);
  if (surgeT > 0) surgeT -= dt;
  if (rangerT > 0) {
    rangerT -= dt;
    for (const c of crabs) if (c.st === 'walk') { c.st = 'flee'; c.dir = c.x < 0 ? -1 : 1; c.tgt = null; sfx.crab(); burst3(c.x, .1, c.z, ['#e9d3a6', '#d9bd86'], 8); }
    for (const g of gulls) if (g.st === 'circle' || g.st === 'dive' || g.st === 'carry') shoo(g);
    for (const tr of tourists) if (tr.st === 'enter' || tr.st === 'stand') { tr.st = 'sorry'; tr.bow = 0; tr.dir = tr.x < 0 ? -1 : 1; }
    for (const b of balls) if (b.st === 'roll') { b.st = 'pop'; b.pt = 0; sfx.boop(); burst3(b.x, b.y, b.z, ['#e8664a', '#fbf1d8', '#3f9bf0'], 12); }
  }
  // wind blows bags in from the side
  if (windLeft > 0 && (windT -= dt) <= 0) { windLeft--; windT = rnd(5, 8); const left = Math.random() < .5; addLitter('bag', left ? -6.5 : 6.5, rnd(SHORE_Z + 2, NEST_Z - 2.5), true); if (!taught.wind) { taught.wind = 1; ui.cap('The wind brings bags…', 2.2); } }
  // surprises that fire as the night goes on
  if (running && !attract && L.events) { const fr = (total - spawnLeft) / total; L.events.forEach((ev, k) => { if (!evDone[k] && fr >= ev.at) { evDone[k] = 1; doEvent(ev.kind); } }); }
  // last heart: the screen pulses red
  const al = allowedLoss(), dg = running && !attract && al > 0 && lostN === al;
  if (dg !== dangerOn) { dangerOn = dg; ui.danger(dg); dangerT = 0; if (dg && !hand) ui.cap('Last heart! No more mistakes', 2.2); }
  if (dangerOn && (dangerT -= dt) <= 0) { dangerT = 1.15; sfx.heart(); buzz([10, 60, 10]); }
  // turtles
  for (const t of T) {
    t.ph += dt * 11; t.born += dt; if (t.look > 0) t.look -= dt; else if (t.st === 'walk' && Math.random() < dt * .12) t.look = rnd(.6, 1.1); if (t.pop > 0) t.pop -= dt * 3; if (t.hop > 0) t.hop -= dt / .45; if (t.boopT > 0) t.boopT -= dt; if (t.lure > 0) t.lure -= dt;
    if (t.st === 'walk') {
      if (t.born < .35) continue;
      const inStream = L.stream && t.z > ST0 && t.z < ST1;
      const lured = t.lure > 0 && surgeT <= 0;
      let gx = t.tx, gz = SHORE_Z - 1; if (lured) { gx = t.lx; gz = t.lz + .4; }
      const dx = gx - t.x, dz = gz - t.z, d = Math.hypot(dx, dz) || 1;
      const rush = t.z < SHORE_Z + 2.3 ? 1.75 : 1;
      const sp = t.sp * rush * (lured ? .55 : 1) * (inStream ? .55 : 1) * (surgeT > 0 ? 1.75 : 1);
      let vx = dx / d * sp, vz = dz / d * sp;
      if (inStream) vx += .55;
      for (const o of T) if (o !== t && (o.st === 'walk' || o.st === 'flip' || o.st === 'tangle')) { const ox = t.x - o.x, oz = t.z - o.z, od = Math.hypot(ox, oz); if (od > 0 && od < .66) { vx += ox / od * .9; vz += oz / od * .35; } }
      const nx = t.x + vx * dt, nz = t.z + vz * dt; let blk = null;
      for (const r of rocks) if (r.st === 'idle' && d2(nx, nz, r.x, r.z) < r.r + .22 && t.z > r.z - .1) blk = r;
      for (const l of litter) if (l.st === 'lie') { const dd = d2(nx, nz, l.x, l.z); if (l.tang && dd < .38) { tangle(t, l); break; } if (!l.tang && dd < l.r + .2 && t.z > l.z - .1) blk = l; }
      if (t.st !== 'walk') continue;
      for (const tr of tourists) if ((tr.st === 'stand' || tr.st === 'enter') && d2(nx, nz, tr.x, tr.z) < .55 && t.z > tr.z - .1) blk = tr;
      for (const l of logs) if (l.st === 'float' && nx > l.x - l.w / 2 - .1 && nx < l.x + l.w / 2 + .1 && Math.abs(nz - l.z) < .32) { blk = l; t.x += .7 * dt; }
      if (blk) {
        t.stuck += dt; t.block = blk;
        t.blockT = (t.blockT || 0) + dt;
        if (t.blockT > 3.2 && !blk.w) { const side = Math.sign(t.x - blk.x) || (Math.random() < .5 ? -1 : 1); t.tx = clamp(blk.x + side * ((blk.r || .4) + .75), -3.9, 3.9); t.x += side * .12; t.blockT = 0; }   // after a while it finds its own way around
        if (t.stuck > .35) teachBlock(blk, t);
      } else { t.stuck = 0; t.block = null; t.x = nx; t.z = nz; t.hd = Math.atan2(vx, vz); if (Math.random() < dt * .2) sfx.squeak(); if ((t.printT -= dt) <= 0) { t.printT = .17; t.step *= -1; const px = Math.cos(t.hd) * .14 * t.step, pz = -Math.sin(t.hd) * .14 * t.step; addPrint(t.x + px, t.z + pz, t.hd); } }
      if (t.x < -5.3 || t.x > 5.3) loseTurtle(t, 'Lost its way');
      if (t.st === 'walk' && t.z <= shore(t.x, time) + .1) reachSea(t);
    } else if (t.st === 'flip' || t.st === 'tangle') { t.flipT -= dt; if (t.flipT <= 0) loseTurtle(t, t.st === 'tangle' ? 'Tangled' : 'Stranded'); }
    else if (t.st === 'drop') { t.vy += 14 * dt; t.hgt -= t.vy * dt; if (t.hgt <= 0) { t.hgt = 0; burst3(t.x, .05, t.z, ['#e9d3a6'], 8); shake = .08; flip(t); } }
    else if (t.st === 'swim') { t.z -= .9 * dt; t.sink += dt; if (t.sink > 1.6) t.st = 'gone'; }
    else if (t.st === 'lost') { t.gone += dt; if (t.gone > .9) t.st = 'gone'; }
  }
  // last turtle: slow everything, ease the camera in
  const alive = T.filter((t) => ['walk', 'flip', 'tangle', 'drop', 'carried'].includes(t.st));
  if (running && spawnLeft === 0 && alive.length === 1 && total > 3) { if (!lastOne) { lastOne = true; ui.cap('The last one…', 2); musicMood = 2; } const t = alive[0]; focusTo.set(t.x * .6, 0, lerp(baseFocusZ, t.z, .55)); zoomTo = .74; }
  else if (introT > 0) { const u = clamp(introT / introMax, 0, 1); focusTo.set(0, 0, lerp(baseFocusZ, NEST_Z - 2.2, u)); zoomTo = 1 - .24 * u; }
  else { focusTo.set(0, 0, baseFocusZ); zoomTo = 1; if (!lastOne) musicMood = gulls.some((g) => g.st === 'dive') ? 1 : 0; }
  // litter
  for (const l of litter) {
    if (l.st === 'drift') { l.x += l.dir * 1.3 * dt; l.rot += dt * 4 * l.dir; l.y = .25 + Math.abs(Math.sin(time * 4 + l.wob)) * .35; if ((l.dir > 0 && l.x >= l.tx) || (l.dir < 0 && l.x <= l.tx)) { l.st = 'lie'; l.y = 0; burst3(l.x, .05, l.z, ['#e6cfa0'], 5); } }
    else if (l.st === 'fly') {
      l.ft += dt / .5; const u = Math.min(1, l.ft), e = 1 - Math.pow(1 - u, 2);
      l.x = lerp(l.fx, bin.x, e); l.z = lerp(l.fz, bin.z, e); l.y = lerp(l.fy, 1.4, e) + Math.sin(u * Math.PI) * 2.6; l.rot += dt * 14;
      if (u >= 1) landInBin(l);
    } else if (l.st === 'tangle' && l.t && !l.hole) { l.x = l.t.x; l.z = l.t.z; }
  }
  // rocks get kicked away
  for (const r of rocks) if (r.st === 'roll') { r.x += r.vx * dt; r.vy -= 14 * dt; r.y = Math.max(0, r.y + r.vy * dt); if (r.y === 0 && r.vy < 0) r.vy = -r.vy * .35; r.rot += r.vx * dt / r.r; if (Math.abs(r.x) > 10) { r.st = 'gone'; r.m.visible = false; } }
  for (const r of rocks) if (r.st === 'crumble') { r.ct += dt; if (r.ct > .3) { r.st = 'gone'; r.m.visible = false; } }
  updateBalls(dt, L); updateCrabs(dt, L); updateGulls(dt); updateTourists(dt, L); updateLogs(dt, L); updateVolunteer(dt);
  if (L.stream && !taught.log && logs.some((l) => l.st === 'float' && T.some((t) => t.st === 'walk' && Math.abs(t.z - l.z) < .45 && Math.abs(t.x - l.x) < l.w / 2))) { taught.log = 1; const l = logs.find((l) => l.st === 'float'); hand = { o: l, y: .2, kind: 'log' }; ui.cap('Push the logs away!', 2.6); }
  if (hand) { const o = hand.o; const done = (hand.kind === 'flip' && o.st !== 'flip') || (hand.kind === 'tangle' && o.st !== 'tangle') || (hand.kind === 'tourist' && o.st !== 'enter' && o.st !== 'stand') || (hand.kind === 'crab' && o.st !== 'walk' && o.st !== 'emerge') || ((hand.kind === 'litter' || hand.kind === 'drift') && o.st !== 'lie' && o.st !== 'drift') || (hand.kind === 'rock' && o.st !== 'idle') || (hand.kind === 'ball' && o.st !== 'roll') || (hand.kind === 'log' && o.st !== 'float'); if (done) { hand = null; ui.capOff(); } }
  if (running && !ended && spawnLeft === 0 && T.every((t) => ['swim', 'gone', 'lost'].includes(t.st))) { ended = true; running = false; musicMood = 0; if (attract) setTimeout(() => { if (attract) { begin(-1); running = true; } }, 1800); else setTimeout(endNight, 1200); }
}
function doEvent(kind) {
  const cap = (s) => { if (!hand) ui.cap(s, 1.7); };
  const side = () => (Math.random() < .5 ? -6.5 : 6.5), zz = () => rnd(SHORE_Z + 2.2, NEST_Z - 2.6);
  if (kind === 'trip') { const w = T.filter((t) => t.st === 'walk' && t.born > .6 && t.z > SHORE_Z + 2.2 && t.z < NEST_Z - 1.4); if (w.length) { const t = pick(w); flip(t); ui.float(t.x, .9, t.z, 'Oops!'); burst3(t.x, .2, t.z, ['#e9d3a6'], 8); } }
  else if (kind === 'crabs') { for (const c of crabs) if (c.st === 'wait') { c.t = .15 + Math.random() * .8; c.force = true; } cap('Crab alert!'); }
  else if (kind === 'gust') { addLitter('bag', side(), zz(), true); addLitter('bag', side(), zz(), true); cap('A gust of wind!'); }
  else if (kind === 'balls') { for (const b of balls) if (b.st === 'wait') b.t = .2; cap('Beach ball!'); }
  else if (kind === 'gull') { for (const g of gulls) if (g.st === 'off') g.t = .2; cap('Gull overhead!'); }
  else if (kind === 'tourist') { for (const tr of tourists) if (tr.st === 'wait') tr.t = .2; cap('A tourist with a torch!'); }
  else if (kind === 'hole') { const x = rnd(-3.2, 3.2), z = rnd(SHORE_Z + 2.8, NEST_Z - 4); addLitter('hole', x, z); burst3(x, .1, z, ['#e6cfa0', '#d9be8c'], 8); cap('Someone dug a hole!'); }
  else if (kind === 'trash') { for (let k = 0; k < 3; k++) addLitter(pick(['can', 'bottle', 'bag', 'cup']), side(), zz(), true); cap('Trash washes ashore!'); }
}
function teachBlock(blk, t) {
  if (litter.includes(blk) && !taught.litter) { taught.litter = 1; hand = { o: blk, y: .15, kind: 'litter' }; ui.cap('Tap the trash!', 99); }
  else if (blk.castle && !taught.castle && !blk.umb) { taught.castle = 1; hand = { o: blk, y: .5, kind: 'rock' }; ui.cap('Smash the sandcastle!', 99); }
  else if (blk.umb && !taught.umb) { taught.umb = 1; hand = { o: blk, y: 1.2, kind: 'rock' }; ui.cap('Fold the umbrella!', 99); }
  else if (rocks.includes(blk) && !blk.castle && !taught.rock) { taught.rock = 1; hand = { o: blk, y: .2, kind: 'rock' }; ui.cap('Kick the rock away!', 99); }
}
function tangle(t, l) { t.st = 'tangle'; t.flipT = 5.5; t.tang = l; l.st = 'tangle'; l.t = t; sfx.uhoh(); burst3(t.x, .1, t.z, ['#e9d3a6'], 6); if (!taught.tangle) { taught.tangle = 1; hand = { o: t, y: .25, kind: 'tangle' }; ui.cap('Tap to free it!', 99); } }
function flip(t) { if (t.st === 'flip') return; t.st = 'flip'; t.flipT = 5; sfx.uhoh(); burst3(t.x, .1, t.z, ['#e9d3a6'], 6); if (!taught.flip) { taught.flip = 1; hand = { o: t, y: .25, kind: 'flip' }; ui.cap('Tap to flip it back!', 99); } }
function reachSea(t) { t.st = 'swim'; t.safe = true; safeN++; if (t.helped && !attract) { ui.fx('heart', t.x, .9, t.z); buzz(8); } if (t.helped && !attract) { ui.fx('heart', t.x, .9, t.z); buzz([8, 40, 8]); } if (!attract && !passed && safeN >= Math.ceil(total * .7)) { passed = true; sfx.ready(); if (!hand) ui.cap('Level passed! Save them all for 3 stars', 2.4); } if (!attract) PROG.saved++; season.saved++; ui.hud('safe'); sfx.safe(safeN); burst3(t.x, .1, t.z, ['#eaf7ff', '#bfe8e0', '#ffffff'], 14); ui.fx('splash', t.x, 0, t.z); ui.float(t.x, .5, t.z, '+1'); }
function loseTurtle(t, why) {
  if (t.st === 'lost' || t.st === 'gone') return;
  if (t.tang) { t.tang.st = 'lie'; t.tang.t = null; if (!t.tang.hole) { t.tang.x = t.x; t.tang.z = t.z; } t.tang = null; }
  t.st = 'lost'; t.gone = 0; lostN++; ui.hud('lost'); sfx.lost(); ui.float(t.x, .6, t.z, why || 'Lost'); if (hand && hand.o === t) { hand = null; ui.capOff(); }
}

/* crabs chase the nearest walking hatchling, sideways, and keep coming back */
function updateCrabs(dt, L) {
  for (const c of crabs) {
    c.leg += dt * (c.st === 'flee' ? 40 : 22); c.claw += dt;
    if (c.st === 'wait') { if (running && (c.t -= dt) <= 0) { const prey = T.filter((t) => t.st === 'walk' && t.z < NEST_Z - 1 && t.z > SHORE_Z + 1.5); if (!prey.length) { c.t = 1; continue; } const p = pick(prey);
      if (c.force || Math.random() < (L.burrow || 0)) { c.force = false; let z = clamp(p.z - rnd(1, 1.9), SHORE_Z + 1.6, NEST_Z - 1.6); if (L.stream && z > ST0 - .5 && z < ST1 + .5) z = ST0 - .8; const x = clamp(p.x + rnd(-1.5, 1.5), -4.3, 4.3); Object.assign(c, { x, z, sp: rnd(1.3, 1.6) * (L.crabSpd || 1), st: 'emerge', et: 0, tgt: p, retT: 0, vx: 0, vz: 0 }); c.v.g.visible = true; sfx.sand(); burst3(x, .1, z, ['#e6cfa0', '#d9be8c', '#fff1d0'], 14, { up: 1.3 }); ui.fx('ring', x, 0, z); if (!taught.crab) { taught.crab = 1; hand = { o: c, y: .3, kind: 'crab' }; ui.cap('A crab pops out! Shoo it!', 99); } continue; }
      const left = Math.random() < .5; let z = clamp(p.z - rnd(.5, 2), SHORE_Z + 1.5, NEST_Z - 1.5); if (L.stream && z > ST0 - .5 && z < ST1 + .5) z = ST0 - .8; Object.assign(c, { x: left ? -5.6 : 5.6, z, sp: rnd(1.3, 1.6) * (L.crabSpd || 1), st: 'walk', tgt: p, retT: 0 }); c.v.g.visible = true; } continue; }
    if (c.st === 'emerge') { c.et += dt; if (c.et >= .7) { c.st = 'walk'; c.retT = 0; } continue; }
    if (c.st === 'walk') {
      if (!taught.crab && Math.abs(c.x) < 4.3) { taught.crab = 1; hand = { o: c, y: .3, kind: 'crab' }; ui.cap('Shoo the crab!', 99); }
      if ((c.retT -= dt) <= 0) { c.retT = .5; let bd = 1e9, b = null; for (const t of T) if (t.st === 'walk') { const d = d2(c.x, c.z, t.x, t.z); if (d < bd) { bd = d; b = t; } } c.tgt = b; }
      const t = c.tgt; if (!t || t.st !== 'walk') { if (!T.some((t) => t.st === 'walk')) { c.st = 'leave'; c.dir = c.x < 0 ? -1 : 1; } continue; }
      const dx = t.x - c.x, dz = t.z - c.z, d = Math.hypot(dx, dz) || 1; c.vx = dx / d * c.sp; c.vz = dz / d * c.sp; c.x += c.vx * dt; c.z += c.vz * dt;
      if (d < .5) { flip(t); c.st = 'leave'; c.dir = c.x < 0 ? -1 : 1; c.tgt = null; }
    } else { const sp = c.st === 'flee' ? 8 : 2.2; c.vx = c.dir * sp; c.vz = 0; c.x += c.vx * dt; if (Math.abs(c.x) > 6.2) { c.st = 'wait'; c.t = rnd(2.5, 4.5); c.v.g.visible = false; } }
  }
}
function updateBalls(dt, L) {
  for (const b of balls) {
    if (b.st === 'wait') {
      if (running && (b.t -= dt) <= 0) {
        if (!T.some((t) => t.st === 'walk')) { b.t = 1; continue; }
        const left = Math.random() < .5; let z; do { z = rnd(SHORE_Z + 2.2, NEST_Z - 2); } while (L.stream && z > ST0 - .8 && z < ST1 + .8);
        Object.assign(b, { st: 'roll', x: left ? -6.2 : 6.2, z, dir: left ? 1 : -1, y: .3, rot: 0, hitCool: 0 }); b.m.visible = true;
        if (!taught.ball) { taught.ball = 1; hand = { o: b, y: .4, kind: 'ball' }; ui.cap('Pop the beach ball!', 99); }
      }
    } else if (b.st === 'roll') {
      b.x += b.dir * 2.4 * dt; b.rot += dt * 7 * b.dir; b.y = .3 + Math.abs(Math.sin(time * 5 + b.ph)) * .32; b.hitCool -= dt;
      if (b.hitCool <= 0) for (const t of T) if (t.st === 'walk' && t.born > .4 && d2(t.x, t.z, b.x, b.z) < .5) { flip(t); b.hitCool = .8; burst3(t.x, .4, t.z, ['#e8664a', '#fbf1d8', '#3f9bf0'], 10); ui.float(t.x, .9, t.z, 'Bonk!'); shake = .1; break; }
      if (Math.abs(b.x) > 6.6) { b.st = 'wait'; b.t = rnd(4, 7); b.m.visible = false; }
    } else if (b.st === 'pop') { b.pt += dt; if (b.pt > .25) { b.st = 'wait'; b.t = rnd(5, 8); b.m.visible = false; } }
  }
}
function updateGulls(dt) {
  for (const g of gulls) {
    g.flap += dt * (g.st === 'carry' ? 16 : 9);
    if (g.st === 'off' || g.st === 'shoo') {
      if (g.st === 'shoo') { g.x += g.dir * 6 * dt; g.y += 5 * dt; if (g.y > 9) g.v.g.visible = false; }
      if (running && (g.t -= dt) <= 0) { g.st = 'circle'; g.x = Math.random() < .5 ? -5.8 : 5.8; g.z = rnd(SHORE_Z + 3, NEST_Z - 3); g.y = 3.3; g.dir = g.x < 0 ? 1 : -1; g.cT = rnd(1.3, 2.3); g.v.g.visible = true; tone(1250, .14, 'sawtooth', .035, 800); }
    } else if (g.st === 'circle') {
      g.x += g.dir * 2.2 * dt; g.z += Math.sin(time * 1.5) * .6 * dt; g.y = 3.3 + Math.sin(time * 2) * .15;
      if ((g.cT -= dt) <= 0) {
        const prey = T.filter((t) => t.st === 'walk' && t.born > .5 && t.z < NEST_Z - .8 && t.z > SHORE_Z + .9), stuck = prey.filter((t) => t.stuck > .3); const pool = stuck.length ? stuck : prey;
        if (pool.length) { g.tgt = pick(pool); g.st = 'dive'; g.dT = 1.75; g.sx = g.x; g.sy = g.y; g.sz = g.z; sfx.warn(); sfx.heart(); if (!taught.gull) { taught.gull = 1; ui.cap('Tap the gull!', 99); } } else g.cT = 1;
      }
      if (Math.abs(g.x) > 5.4) g.dir = -Math.sign(g.x);
    } else if (g.st === 'dive') {
      const t = g.tgt; if (!t || t.st !== 'walk') { g.st = 'circle'; g.cT = 1.4; g.tgt = null; g.v.sil.visible = false; continue; }
      g.dT -= dt; const p = 1 - clamp(g.dT / 1.75, 0, 1), e = p * p * p;
      g.x = lerp(g.sx, t.x, e); g.z = lerp(g.sz, t.z, e); g.y = lerp(g.sy, .55, e); g.dir = t.x > g.sx ? 1 : -1;
      if (Math.random() < dt * 2) sfx.heart();
      if (g.dT <= 0) { g.st = 'carry'; t.st = 'carried'; sfx.grab(); slow = .3; slowT = .65; shake = .1; g.v.sil.visible = false; }
    } else if (g.st === 'carry') {
      const t = g.tgt; g.x += g.dir * 1.3 * dt; g.y += 1.45 * dt; g.z -= 1.1 * dt; t.x = g.x; t.z = g.z; t.hgt = g.y - .5;
      if (g.y > 7) { loseTurtle(t, 'Carried off'); t.st = 'gone'; g.st = 'off'; g.tgt = null; g.t = rnd(4, 6); g.v.g.visible = false; }
    }
  }
}
function updateTourists(dt, L) {
  for (const tr of tourists) {
    if (tr.st === 'wait') { if (running && (tr.t -= dt) <= 0) { const left = Math.random() < .5; let z; do { z = rnd(SHORE_Z + 2.5, NEST_Z - 2.5); } while (L.stream && z > ST0 - .8 && z < ST1 + .8); Object.assign(tr, { st: 'enter', x: left ? -5.8 : 5.8, z, tx: rnd(-2.2, 2.2), dir: left ? 1 : -1, stand: 0 }); tr.v.g.visible = true; if (!taught.tourist) { taught.tourist = 1; hand = { o: tr, y: 1.4, kind: 'tourist' }; ui.cap('Shoo the tourist!', 99); } } continue; }
    if (tr.st === 'enter') { tr.x += tr.dir * 1.3 * dt; tr.walk += dt * 9; if ((tr.dir > 0 && tr.x >= tr.tx) || (tr.dir < 0 && tr.x <= tr.tx)) { tr.st = 'stand'; tr.flashT = .8; } }
    else if (tr.st === 'stand') {
      tr.stand += dt; tr.walk = 0;
      if ((tr.flashT -= dt) <= 0) { tr.flashT = 2.6; tr.flash = .45; sfx.flash(); ui.fx('flash', tr.x, 1.8, tr.z); for (const t of T) if (t.st === 'walk' && d2(t.x, t.z, tr.x, tr.z) < 3.3) { t.lure = 1.8; t.lx = tr.x; t.lz = tr.z; } }
      if (tr.stand > 12) { tr.st = 'flee'; tr.dir = tr.x < 0 ? -1 : 1; }
    } else if (tr.st === 'sorry') { tr.bow += dt; if (tr.bow > .7) tr.st = 'flee'; }
    else if (tr.st === 'flee') { tr.x += tr.dir * 5 * dt; tr.walk += dt * 22; if (Math.abs(tr.x) > 7) { tr.st = 'wait'; tr.t = rnd(7, 11); tr.v.g.visible = false; } }
    if (tr.flash > 0) tr.flash -= dt;
  }
}
function updateLogs(dt) {
  for (const l of logs) {
    if (l.st === 'float') { l.x += .75 * dt; if (l.x > 9) l.x = -9 - rnd(0, 3); }
    else if (l.st === 'push') { l.x += l.vx * dt; l.z += l.vz * dt; l.rot += dt * 4; l.vx *= .985; l.z = clamp(l.z, ST0 + .25, ST1 - .25); if (l.x > 10) { l.st = 'float'; l.x = -10 - rnd(2, 6); l.z = rnd(ST0 + .35, ST1 - .35); l.rot = 0; } }
  }
}
function updateVolunteer(dt) {
  if (vol.st === 'idle') return;
  vol.walk += dt * 9;
  if (vol.st === 'patrol') { vol.x -= 2 * dt; vol.dir = -1; if (vol.x < -8.5) { vol.st = 'idle'; vol.g.visible = false; } }
  else if (vol.st === 'enter') { vol.x -= 2.6 * dt; vol.dir = -1; if (vol.x <= bin.x + .75) { vol.st = 'empty'; vol.t = 0; } }
  else if (vol.st === 'empty') {
    vol.walk = 0; vol.t += dt;
    if (vol.t > .5 && bin.n > 0) { bin.n = 0; bin.lidT = .5; bin.sq = 1; for (const m of bin.pile.children) m.visible = false; sfx.clunk(0); noise(.3, .08, 1200, .05); ui.float(bin.x, 2.2, bin.z, 'Thanks!'); ui.fx('recycle', bin.x, 1.8, bin.z); }
    if (vol.t > 1.1) { vol.st = 'leave'; }
  } else if (vol.st === 'leave') { vol.x += 2.6 * dt; vol.dir = 1; if (vol.x > 8.5) { vol.st = 'idle'; vol.g.visible = false; } }
}

/* ---------- per-frame: write every visual from the simulation ---------- */
const POSE = { x: 0, y: 0, z: 0, yaw: 0, pitch: 0, roll: 0, sx: 1, sy: 1, sz: 1, head: [0, 0, 0], fr: [0, 0, 0], fl: [0, 0, 0], br: [0, 0, 0], bl: [0, 0, 0] };
function setF(a, x, y, z) { a[0] = x; a[1] = y; a[2] = z; }
function sync() {
  for (const b of Object.values(TB)) b.begin(); shadows.begin(); eggs.begin();
  for (const n of nests) { let shown = Math.min(9, n.left); for (let k = 0; k < shown; k++) { const [ex, ez] = n.eggs[k]; const wob = k === shown - 1 ? Math.sin(time * 30) * .25 * (n.wob > 0 ? 1 : .25 * Math.max(0, Math.sin(time * 3))) : 0; eggs.add(compose(_m, n.x + ex, groundH(n.x, n.z) - .02 + (k > 4 ? .06 : 0), n.z + ez, 0, 0, wob, 1.3)); } }
  for (const t of T) {
    if (t.st === 'gone') continue;
    const P = POSE, y0 = groundH(t.x, t.z); P.x = t.x; P.z = t.z; P.y = y0; P.yaw = t.hd; P.pitch = 0; P.roll = 0; P.sx = P.sy = P.sz = 1;
    let sc = 1 + Math.max(0, t.pop) * .45; if (t.born < .35) { const u = t.born / .35; sc *= u < .7 ? u / .7 * 1.15 : 1.15 - (u - .7) / .3 * .15; P.y += Math.sin(u * Math.PI) * .25; }
    P.sx = P.sy = P.sz = sc; setF(P.head, 0, 0, 0);
    let shadowS = .36;
    if (t.st === 'flip' || t.st === 'drop') {
      P.y = (t.st === 'drop' ? y0 + t.hgt : y0) + .28 * MS * sc; P.roll = Math.PI + Math.sin(time * 14) * .18; const f = Math.sin(time * 22) * .8;
      setF(P.fr, 0, 0, f); setF(P.fl, 0, 0, -f); setF(P.br, 0, 0, -f * .7); setF(P.bl, 0, 0, f * .7); setF(P.head, Math.sin(time * 9) * .3, 0, 0);
    } else if (t.st === 'carried') {
      P.y = t.hgt; P.pitch = Math.sin(time * 9) * .3; P.roll = Math.sin(time * 11) * .2; const f = Math.sin(time * 25) * .8; setF(P.fr, 0, f, 0); setF(P.fl, 0, f, 0); setF(P.br, 0, -f, 0); setF(P.bl, 0, -f, 0); shadowS = .2;
    } else if (t.st === 'swim') {
      P.y = -.08 - t.sink * .3; const f = Math.sin(time * 8) * .9; setF(P.fr, 0, f, .2); setF(P.fl, 0, f, -.2); setF(P.br, 0, -f * .4, 0); setF(P.bl, 0, -f * .4, 0); shadowS = 0;
    } else if (t.st === 'lost') {
      const k = Math.max(.01, 1 - t.gone / .9); P.sx = P.sy = P.sz = k; P.yaw = t.hd + t.gone * 9; P.y = y0 + t.gone * .5; shadowS = .36 * k;
    } else if (t.st === 'tangle') {
      P.roll = Math.sin(time * 16) * .14; P.y += Math.abs(Math.sin(time * 16)) * .03; const f = Math.sin(time * 26) * .5; setF(P.fr, 0, f, 0); setF(P.fl, 0, -f, 0); setF(P.br, 0, f, 0); setF(P.bl, 0, -f, 0); setF(P.head, Math.sin(time * 13) * .25, 0, 0);
    } else {
      const moving = t.stuck === 0, w = moving ? Math.sin(t.ph) : Math.sin(t.ph * .3) * .35, rush = t.z < SHORE_Z + 2.3;
      P.y += Math.abs(Math.sin(t.ph)) * .025; P.roll = w * .08; P.pitch = rush ? -.05 : 0;
      setF(P.fr, 0, w * .55, .1 + Math.max(0, w) * .25); setF(P.fl, 0, w * .55, -.1 - Math.max(0, -w) * .25); setF(P.br, 0, -w * .45, 0); setF(P.bl, 0, -w * .45, 0);
      const glance = t.look > 0 ? Math.sin(Math.min(1, t.look / .35) * Math.PI / 2) * (t.x > 0 ? -1.15 : 1.15) : 0;
      setF(P.head, Math.sin(t.ph * 2) * .05 + (t.look > 0 ? -.25 : 0), t.stuck > .3 ? Math.sin(time * 2.5 + t.ph) * 1.1 : Math.sin(t.ph * .2) * .12 + glance, 0);
      if (t.hop > 0) { const h = Math.sin((1 - t.hop) * Math.PI); P.y += h * .32; P.sy = sc * (1 + h * .18); P.sx = P.sz = sc * (1 - h * .08); setF(P.head, -.3 * h, 0, 0); }
      if (t.lure > 0) P.yaw += Math.sin(time * 6) * .25;
    }
    drawTurtle(t, P); if (shadowS) shadowAt(t.x, t.z, shadowS * sc * MS * .75);
  }
  for (const b of Object.values(TB)) b.end(); eggs.end();
  for (const l of litter) {
    if (l.st === 'binned' || l.st === 'filled') continue;
    let y = groundH(l.x, l.z) + l.y, s = MS * 1.15 * (l.hole ? 1.6 : 1);
    if (l.st === 'tangle' && l.t && !l.hole) { y = groundH(l.x, l.z) + .15; s = MS * .9; }
    if (l.st === 'lie' && l.kind === 'bag') { const f = Math.sin(time * 5 + l.wob); l.m.scale.set(s * (1 + f * .05), s * (1 - f * .08), s); } else l.m.scale.setScalar(l.st === 'fly' ? s * (1 - l.ft * .35) : s);
    l.m.position.set(l.x, y, l.z); l.m.rotation.set(l.st === 'fly' || l.st === 'drift' ? l.rot * .7 : 0, l.rot, 0);
    if (l.st !== 'fly' && !l.hole) shadowAt(l.x, l.z, .26);
  }
  for (const r of rocks) if (r.st !== 'gone') { r.m.position.set(r.x, groundH(r.x, r.z) + (r.castle ? 0 : r.r * .25) + r.y, r.z); if (r.castle) { r.m.scale.setScalar(r.bs * Math.max(.01, 1 - r.ct / .3)); } else r.m.rotation.z = -r.rot; shadowAt(r.x, r.z, r.r * 1.1); }
  for (const b of balls) if (b.st !== 'wait') { b.m.position.set(b.x, groundH(b.x, b.z) + b.y, b.z); b.m.rotation.set(b.rot * .6, 0, b.rot); b.m.scale.setScalar(MS * (b.st === 'pop' ? Math.max(.01, 1 - b.pt / .25) : 1)); if (b.st === 'roll') shadowAt(b.x, b.z, .32); }
  for (const c of crabs) {
    if (c.st === 'wait') continue; const v = c.v; const y = groundH(c.x, c.z);
    const em = c.st === 'emerge' ? clamp(c.et / .55, .05, 1) : 1; v.g.scale.setScalar(MS * em);
    v.g.position.set(c.x, y + Math.abs(Math.sin(c.leg)) * .03 - (1 - em) * .12, c.z);
    // sideways walk: face the camera-ish while moving along x
    v.g.rotation.y = Math.atan2(-c.vz * .4, 1) * Math.sign(c.vx || 1);
    const s = Math.sin(c.leg); v.ll.rotation.z = s * .25; v.lr.rotation.z = -s * .25; v.ll.position.y = Math.max(0, s) * .03; v.lr.position.y = Math.max(0, -s) * .03;
    const raise = c.st === 'flee' ? 1 : (c.st === 'walk' && c.tgt && d2(c.x, c.z, c.tgt.x, c.tgt.z) < 1.6 ? .8 : 0), snap = Math.sin(c.claw * 14) * .25 * raise;
    v.cl.rotation.set(-raise * .9 + snap, 0, raise * .3); v.cr.rotation.set(-raise * .9 - snap, 0, -raise * .3);
    shadowAt(c.x, c.z, .45);
  }
  for (const g of gulls) {
    const v = g.v; if (!v.g.visible) continue;
    v.g.position.set(g.x, g.y, g.z); v.g.rotation.set(g.st === 'dive' ? .55 : (g.st === 'carry' ? -.25 : 0), g.st === 'dive' && g.tgt ? Math.atan2(g.tgt.x - g.x, g.tgt.z - g.z) : (g.st === 'carry' ? Math.atan2(g.dir * 1.3, -1.1) : (g.dir > 0 ? Math.PI / 2 : -Math.PI / 2)), 0);
    const f = Math.sin(g.flap) * (g.st === 'dive' ? .2 : .75); v.wl.rotation.z = f + (g.st === 'dive' ? .5 : 0); v.wr.rotation.z = -f - (g.st === 'dive' ? .5 : 0);
    if (g.st === 'dive' && g.tgt) { const p = 1 - clamp(g.dT / 1.75, 0, 1); v.sil.visible = true; v.sil.position.set(g.tgt.x, groundH(g.tgt.x, g.tgt.z) + .04, g.tgt.z); v.sil.rotation.y = v.g.rotation.y; v.sil.scale.setScalar(.6 + p * .55); v.sil.material.opacity = .25 + p * .4; }
    shadowAt(g.x, g.z, clamp(1.1 - g.y * .14, .25, .9) * .8);
  }
  for (const tr of tourists) {
    const v = tr.v; if (tr.st === 'wait') continue;
    const y = groundH(tr.x, tr.z); v.g.position.set(tr.x, y + Math.abs(Math.sin(tr.walk)) * .05, tr.z);
    v.g.rotation.y = tr.st === 'stand' ? 0 : (tr.st === 'sorry' ? 0 : (tr.dir > 0 ? Math.PI / 2 : -Math.PI / 2));
    const w = Math.sin(tr.walk) * .6; v.l1.rotation.x = w; v.l2.rotation.x = -w;
    v.arm.rotation.x = tr.st === 'stand' ? -2.5 + Math.sin(time * 3) * .05 : -w * .6;
    v.tilt.rotation.x = tr.st === 'sorry' ? Math.sin(Math.min(1, tr.bow / .35) * Math.PI / 2) * .55 : 0;
    v.cone.visible = tr.st === 'stand'; v.cone.material.opacity = tr.st === 'stand' ? .08 + Math.max(0, tr.flash || 0) * .7 : 0;
    shadowAt(tr.x, tr.z, .55);
  }
  if (vol.st !== 'idle') { vol.g.position.set(vol.x, groundH(vol.x, vol.z) + Math.abs(Math.sin(vol.walk)) * .05, vol.z); vol.g.rotation.y = vol.st === 'empty' ? -1.2 : (vol.dir > 0 ? Math.PI / 2 : -Math.PI / 2); const w = Math.sin(vol.walk) * .6; vol.l1.rotation.x = w; vol.l2.rotation.x = -w; vol.arm.rotation.x = vol.st === 'empty' ? -1.2 : -w * .5; vol.tilt.rotation.x = vol.st === 'empty' ? .3 : 0; shadowAt(vol.x, vol.z, .55); }
  for (const l of logs) { l.m.position.set(l.x, groundH(0, l.z) + .16 + Math.sin(time * 2 + l.x) * .03, l.z); l.m.rotation.set(0, l.rot, 0); }
  // bin: squash on every catch, lid flaps
  if (bin.sq > 0) bin.sq = Math.max(0, bin.sq - .05); const sq = Math.sin(bin.sq * Math.PI) * .18; bin.g.scale.set(1.25 * (1 + sq), 1.25 * (1 - sq), 1.25 * (1 + sq));
  if (bin.lidT > 0) bin.lidT = Math.max(0, bin.lidT - .016); bin.lid.rotation.x = -Math.sin(Math.min(1, bin.lidT / .45) * Math.PI) * 1.2;
  shadowAt(bin.x, bin.z, .75);
  shadows.end();
  if (streamG.visible) streamTex.offset.x -= .0025;
  for (const [i, s] of lanternGlows.entries()) s.material.opacity = (.75 + Math.sin(time * 3 + i * 2) * .08 + Math.sin(time * 11 + i) * .04) * LK.lant;
}
