/* ===================== CAST: every model built in code to match the art sheets ===================== */
const GEO = {};
const SHELL = PAL.shell, SKIN = PAL.skin, SPOT = PAL.cream, EYE = '#14161c', HI = '#ffffff';

/* ---- baby turtle (sheet 01). Local frame: faces +z, origin on the ground. Parts are instanced for every turtle. ---- */
function turtleBody(crew) {
  const sh = crew ? '#46773f' : SHELL, rim = crew ? PAL.gold : '#4d7a40', plate = crew ? '#f0c95a' : '#4b7b40';   // crew: green shell with gold rim and plates
  const parts = [
    [S(.25, 16, 8), '#ecdcb0', M(0, .07, 0, 1, .3, 1.12)],
    [IC(.27, 1), sh, M(0, .12, 0, 1, .52, 1.14), .07],
    [TO(.252, .042, 5, 18), rim, M(0, .1, 0, 1, 1.14, 1, Math.PI / 2, 0, 0), .06],
    [CN(.04, .11, 5), SKIN, M(0, .08, -.32, 1, 1, 1, -Math.PI / 2, 0, 0)]
  ];
  for (const [x, z, tx, tz] of [[0, 0, 0, 0], [0, .14, -.35, 0], [0, -.14, .35, 0], [.12, .06, -.1, -.45], [-.12, .06, -.1, .45], [.11, -.08, .15, -.45], [-.11, -.08, .15, .45]]) parts.push([CY(.07, .078, .028, 6), plate, M(x, (x || z) ? .238 : .262, z, 1, 1, 1, tx, 0, tz), .05]);
  return merge(parts);
}
GEO.tBody = turtleBody(false); GEO.tBodyCrew = turtleBody(true);
GEO.tHead = merge([   // pivot at the neck; eyes sit high on the sides so they read from behind as the turtles walk to the sea
  [S(.118, 16, 12), SKIN, M(0, .05, .085)],
  [S(.05, 12, 10), EYE, M(-.082, .1, .14, .8, 1.05, 1)], [S(.05, 12, 10), EYE, M(.082, .1, .14, .8, 1.05, 1)],
  [S(.016, 6, 4), HI, M(-.112, .125, .15)], [S(.016, 6, 4), HI, M(.112, .125, .15)],
  [TO(.024, .0065, 4, 10, Math.PI), '#2a3b22', M(0, .03, .2, 1, 1, 1, 0, 0, Math.PI)]
]);
function flipper(side, back) {
  const r = back ? .055 : .075, len = back ? 1.9 : 2.3, cx = back ? .1 : .15, ry = back ? .38 : -.32, a = side * ry;
  const at = (d) => [side * d * Math.cos(a), -.03 - d * Math.sin(ry)];
  const [x0, z0] = at(cx);
  const parts = [[S(r, 10, 8), SKIN, M(x0, 0, z0, len, .38, 1, 0, a, 0)]];
  (back ? [.06, .11, .15] : [.08, .15, .22]).forEach((d) => { const [x, z] = at(d); parts.push([S(back ? .015 : .02, 6, 4), SPOT, M(x, .024, z, 1, .45, 1)]); });
  return merge(parts);
}
GEO.fFR = flipper(1, false); GEO.fFL = flipper(-1, false); GEO.fBR = flipper(1, true); GEO.fBL = flipper(-1, true);
const TMAX = 90;
const TB = {
  body: new Batch(GEO.tBody, MAT, TMAX), crew: new Batch(GEO.tBodyCrew, MAT, TMAX), head: new Batch(GEO.tHead, MAT, TMAX),
  fr: new Batch(GEO.fFR, MAT, TMAX), fl: new Batch(GEO.fFL, MAT, TMAX), br: new Batch(GEO.fBR, MAT, TMAX), bl: new Batch(GEO.fBL, MAT, TMAX)
};
const PIV = { head: [0, .13, .26], fr: [.19, .07, .12], fl: [-.19, .07, .12], br: [.14, .06, -.17], bl: [-.14, .06, -.17] };
/* pose: {x,y,z,yaw,pitch,roll,sx,sy,sz, head:[rx,ry], fr/fl/br/bl:[rx,ry,rz]} */
function drawTurtle(t, P) {
  compose(_m2, P.x, P.y, P.z, P.pitch, P.yaw, P.roll, P.sx * MS, P.sy * MS, P.sz * MS);
  (t.crew ? TB.crew : TB.body).add(_m2);
  const part = (b, piv, r) => { compose(_m, piv[0], piv[1], piv[2], r[0], r[1], r[2], 1, 1, 1, 'XYZ'); _m.premultiply(_m2); b.add(_m); };
  part(TB.head, PIV.head, P.head); part(TB.fr, PIV.fr, P.fr); part(TB.fl, PIV.fl, P.fl); part(TB.br, PIV.br, P.br); part(TB.bl, PIV.bl, P.bl);
}

/* ---- ghost crab (sheet 03): coral, eye stalks, big claws, walks sideways ---- */
GEO.crabBody = merge([
  [IC(.24, 1), PAL.coral, M(0, .17, 0, 1.3, .55, 1), .08],
  [S(.22, 12, 8), '#f2c49b', M(0, .11, .01, 1.22, .32, .92)],
  [CY(.022, .022, .15, 5), PAL.coral, M(-.08, .29, .1)], [CY(.022, .022, .15, 5), PAL.coral, M(.08, .29, .1)],
  [S(.06, 12, 10), EYE, M(-.08, .38, .11)], [S(.06, 12, 10), EYE, M(.08, .38, .11)],
  [S(.019, 6, 4), HI, M(-.065, .405, .155)], [S(.019, 6, 4), HI, M(.095, .405, .155)],
  [TO(.035, .009, 4, 10, Math.PI), '#5a1f14', M(0, .19, .225, 1, 1, 1, 0, 0, Math.PI)]
]);
function claw(s) { return merge([[CY(.035, .03, .16, 5), PAL.coral, M(s * .05, .0, .06, 1, 1, 1, Math.PI / 2, 0, -s * .5), .06], [IC(.11, 0), PAL.coral, M(s * .1, .03, .17, 1, .8, 1.15), .08], [S(.075, 8, 6), '#f6c8a4', M(s * .1, .01, .2, 1, .6, 1)], [CN(.055, .13, 5), '#d9563a', M(s * .1, .09, .27, 1, .7, 1, Math.PI / 2 - .3, 0, 0), .06]]); }
GEO.clawR = claw(1); GEO.clawL = claw(-1);
function crabLegs(s) { const p = []; for (const z of [-.1, 0, .1]) { p.push([BX(.17, .04, .04), '#d9563a', M(s * .3, .13, z, 1, 1, 1, 0, -s * z * 2, s * .35), .05]); p.push([BX(.14, .035, .035), '#c94a30', M(s * .42, .05, z * 1.3, 1, 1, 1, 0, -s * z * 2, s * 1.1), .05]); } return merge(p); }
GEO.legsR = crabLegs(1); GEO.legsL = crabLegs(-1);
function makeCrab() {
  const g = new THREE.Group(), b = new THREE.Mesh(GEO.crabBody, MAT), cl = new THREE.Mesh(GEO.clawL, MAT), cr = new THREE.Mesh(GEO.clawR, MAT), ll = new THREE.Mesh(GEO.legsL, MAT), lr = new THREE.Mesh(GEO.legsR, MAT);
  cl.position.set(-.24, .16, .12); cr.position.set(.24, .16, .12); g.add(b, cl, cr, ll, lr); g.scale.setScalar(MS); g.visible = false; scene.add(g);
  return { g, b, cl, cr, ll, lr };
}

/* ---- seagull (sheet 03): cream body, navy wing tips, cheeky brows ---- */
const NAVYW = '#2a3456', GULLW = '#f4efe3';
GEO.gull = merge([
  [S(.2, 14, 10), GULLW, M(0, 0, 0, 1, .85, 1.65)], [S(.145, 14, 12), GULLW, M(0, .13, .3)],
  [CN(.045, .17, 6), '#e7a93a', M(0, .1, .47, 1, .8, 1, Math.PI / 2, 0, 0)],
  [S(.03, 8, 6), EYE, M(-.078, .165, .4)], [S(.03, 8, 6), EYE, M(.078, .165, .4)], [S(.01, 4, 3), HI, M(-.07, .175, .425)], [S(.01, 4, 3), HI, M(.086, .175, .425)],
  [BX(.075, .02, .02), NAVYW, M(-.07, .21, .41, 1, 1, 1, 0, 0, -.45)], [BX(.075, .02, .02), NAVYW, M(.07, .21, .41, 1, 1, 1, 0, 0, .45)],
  [CN(.11, .24, 4), NAVYW, M(0, .02, -.38, 1, .3, 1, -Math.PI / 2, 0, 0), .06],
  [BX(.05, .14, .05), '#e9a03a', M(-.06, -.17, .02)], [BX(.05, .14, .05), '#e9a03a', M(.06, -.17, .02)]
]);
function gullWing(s) { return merge([[BX(.52, .04, .34), GULLW, M(s * .26, 0, 0), .05], [BX(.36, .036, .28), NAVYW, M(s * .66, 0, -.03), .05], [BX(.2, .03, .2), NAVYW, M(s * .88, 0, -.06, 1, 1, 1, 0, s * .3, 0), .05]]); }
GEO.wingL = gullWing(-1); GEO.wingR = gullWing(1);
function makeGull() {
  const g = new THREE.Group(), b = new THREE.Mesh(GEO.gull, MAT), wl = new THREE.Mesh(GEO.wingL, MAT), wr = new THREE.Mesh(GEO.wingR, MAT);
  wl.position.set(-.14, .06, .02); wr.position.set(.14, .06, .02); g.add(b, wl, wr); g.scale.setScalar(MS * .82); g.visible = false; scene.add(g);
  // ground telegraph: gull silhouette shadow (sheet 20)
  const shp = new THREE.Shape(); shp.moveTo(0, .35); shp.quadraticCurveTo(.25, .15, 1.0, .25); shp.lineTo(.75, .02); shp.quadraticCurveTo(.3, -.05, .12, -.35); shp.lineTo(0, -.25); shp.lineTo(-.12, -.35); shp.quadraticCurveTo(-.3, -.05, -.75, .02); shp.lineTo(-1.0, .25); shp.quadraticCurveTo(-.25, .15, 0, .35);
  const sg = new THREE.ShapeGeometry(shp); sg.rotateX(-Math.PI / 2);
  const sil = new THREE.Mesh(sg, curved(new THREE.MeshBasicMaterial({ color: 0x12203A, transparent: true, opacity: .5, depthWrite: false }), 'sil')); sil.visible = false; sil.renderOrder = 2; scene.add(sil);
  return { g, wl, wr, sil };
}

/* ---- people (sheet 04): tourist with phone flash, volunteer with picker and sack ---- */
const SKINP = '#f2c497', HAIR = '#23345a';
function head(y, hat) {
  const p = [[S(.27, 16, 12), SKINP, M(0, y, 0)], [new THREE.SphereGeometry(.29, 14, 8, 0, 6.283, 0, 1.2), HAIR, M(0, y + .02, -.02)], [S(.25, 12, 8), HAIR, M(0, y - .02, -.09, 1, 1, .8)],
    [S(.048, 10, 8), EYE, M(-.095, y - .01, .238, 1, 1.15, .7)], [S(.048, 10, 8), EYE, M(.095, y - .01, .238, 1, 1.15, .7)],
    [S(.014, 4, 3), HI, M(-.083, y + .01, .27)], [S(.014, 4, 3), HI, M(.107, y + .01, .27)],
    [S(.05, 8, 6), '#9a3b33', M(0, y - .11, .245, 1, .55, .4)], [S(.05, 8, 6), '#f0a090', M(-.16, y - .07, .2, 1, .6, .4)], [S(.05, 8, 6), '#f0a090', M(.16, y - .07, .2, 1, .6, .4)]];
  return p.concat(hat);
}
GEO.tourist = merge([
  [BX(.5, .28, .32), '#d8c398', M(0, .8, 0), .05],
  [IC(.31, 1), '#3f7fc4', M(0, 1.2, 0, 1, 1.12, .78), .06],
  ...[[-.14, 1.32, .23], [.12, 1.12, .24], [.02, 1.42, .2], [-.18, 1.06, .2], [.17, 1.36, .19]].map(([x, y, z]) => [IC(.045, 0), '#f6efd6', M(x, y, z, 1, 1, .5)]),
  [IC(.3, 0), '#5e7a45', M(0, 1.22, -.28, 1, 1.2, .6), .08],
  [CY(.065, .06, .45, 6), SKINP, M(-.33, 1.08, 0, 1, 1, 1, 0, 0, .15)], [S(.075, 8, 6), SKINP, M(-.37, .84, 0)],
  ...head(1.75, [[CY(.47, .47, .035, 16), '#e2c78e', M(0, 1.97, 0), .06], [CY(.24, .28, .2, 10), '#e2c78e', M(0, 2.07, 0), .06], [CY(.285, .285, .06, 10), '#22406e', M(0, 2.0, 0)]])
]);
GEO.touristArm = merge([[CY(.065, .06, .45, 6), '#3f7fc4', M(0, -.08, 0, 1, .35, 1)], [CY(.06, .055, .42, 6), SKINP, M(0, -.22, 0)], [S(.075, 8, 6), SKINP, M(0, -.45, 0)], [BX(.13, .21, .035), '#22304f', M(0, -.5, .07)], [BX(.06, .06, .02), '#fff8d0', M(.03, -.44, .09)]]);
GEO.leg = merge([[CY(.085, .075, .48, 7), SKINP, M(0, -.24, 0)], [BX(.15, .05, .25), '#7a5232', M(0, -.5, .04)]]);
GEO.volunteer = merge([
  [BX(.5, .34, .32), '#25476b', M(0, .78, 0), .05],
  [IC(.3, 1), '#2f8fb0', M(0, 1.2, 0, 1, 1.12, .8), .06],
  [BX(.5, .5, .5), '#f3d34a', M(0, 1.18, 0, 1.12, 1, .9), .05], [BX(.58, .05, .48), '#e9eef2', M(0, 1.12, 0)], [BX(.58, .05, .48), '#e9eef2', M(0, 1.28, 0)],
  [CY(.065, .06, .45, 6), '#2f8fb0', M(-.33, 1.1, 0, 1, 1, 1, 0, 0, .2)], [S(.08, 8, 6), '#f4f4f0', M(-.38, .86, 0)],
  [IC(.22, 1), '#3f7fd4', M(-.42, .62, .05, 1, 1.1, 1), .08],
  ...head(1.75, [[new THREE.SphereGeometry(.3, 14, 8, 0, 6.283, 0, 1.45), '#2e6f9e', M(0, 1.8, 0, 1, .9, 1)], [CY(.24, .24, .03, 12), '#2e6f9e', M(0, 1.86, .2, 1, 1, .9)], [S(.1, 8, 6), HAIR, M(0, 1.7, -.3, 1, 1.4, 1)]])
]);
GEO.volArm = merge([[CY(.065, .06, .45, 6), '#2f8fb0', M(0, -.18, 0)], [S(.08, 8, 6), '#f4f4f0', M(0, -.42, 0)], [CY(.018, .018, 1.0, 5), '#b9c2cc', M(0, -.7, .18, 1, 1, 1, .35, 0, 0)], [BX(.1, .1, .04), '#2f86d6', M(0, -1.15, .34)]]);
GEO.legV = merge([[CY(.085, .075, .48, 7), '#25476b', M(0, -.24, 0)], [BX(.15, .07, .25), '#6b4a2e', M(0, -.5, .04)]]);
function makePerson(kind) {
  const g = new THREE.Group(), tilt = new THREE.Group(); g.add(tilt);
  const body = new THREE.Mesh(kind === 'vol' ? GEO.volunteer : GEO.tourist, MAT), arm = new THREE.Mesh(kind === 'vol' ? GEO.volArm : GEO.touristArm, MAT);
  const l1 = new THREE.Mesh(kind === 'vol' ? GEO.legV : GEO.leg, MAT), l2 = new THREE.Mesh(kind === 'vol' ? GEO.legV : GEO.leg, MAT);
  arm.position.set(.33, 1.38, 0); l1.position.set(-.13, .68, 0); l2.position.set(.13, .68, 0);
  tilt.add(body, arm, l1, l2); g.scale.setScalar(MS * .9); g.visible = false; scene.add(g);
  return { g, tilt, arm, l1, l2 };
}
/* phone flash: a soft additive cone + glow on the sand (sheet 20) */
const flashMat = curved(new THREE.MeshBasicMaterial({ color: 0xfff1c0, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }), 'flash');
GEO.flashCone = new THREE.ConeGeometry(1.2, 3.2, 18, 1, true); GEO.flashCone.translate(0, -1.6, 0); GEO.flashCone.rotateX(-Math.PI / 2 + .55);

/* ---- litter (sheet 05) ---- */
GEO.litter = {
  bottle: merge([[CY(.11, .11, .42, 8), PAL.litter, M(0, .11, 0, 1, 1, 1, 0, .4, Math.PI / 2), .08], [CY(.116, .116, .14, 8), '#f1e2c0', M(0, .11, 0, 1, 1, 1, 0, .4, Math.PI / 2), .05], [CN(.1, .12, 8), PAL.litter, M(.25 * Math.cos(.4), .11, -.25 * Math.sin(.4), 1, 1, 1, 0, .4, -Math.PI / 2), .06], [CY(.05, .05, .07, 8), '#1f5fae', M(.33 * Math.cos(.4), .11, -.33 * Math.sin(.4), 1, 1, 1, 0, .4, Math.PI / 2)]]),
  can: merge([[CY(.1, .09, .3, 8), '#e5583f', M(0, .1, 0, 1, 1, .8, 0, -.5, Math.PI / 2), .14], [CY(.1, .1, .03, 8), '#c9ced6', M(.16 * Math.cos(-.5), .1, -.16 * Math.sin(-.5), 1, 1, .8, 0, -.5, Math.PI / 2)], [CY(.1, .1, .03, 8), '#c9ced6', M(-.16 * Math.cos(-.5), .1, .16 * Math.sin(-.5), 1, 1, .8, 0, -.5, Math.PI / 2)]]),
  cup: merge([[CY(.1, .08, .27, 8), '#f1e2c0', M(0, .135, 0), .05], [CY(.103, .093, .1, 8), '#e5583f', M(0, .12, 0), .05], [CY(.11, .11, .05, 8), '#e9d8b4', M(0, .29, 0), .05]]),
  flipflop: merge([[CY(.12, .11, .045, 12), '#2f86d6', M(0, .025, 0, 1, 1, 2.1, 0, .6, 0), .05], [CY(.12, .11, .02, 12), '#1f5fae', M(0, .005, 0, 1, 1, 2.1, 0, .6, 0)], [TO(.085, .02, 5, 10, Math.PI), '#a8e0d2', M(0, .05, 0, 1, 1, 1.3, 0, .6, 0)]]),
  bag: merge([[IC(.24, 1), '#efe2c4', M(0, .16, 0, 1, .72, .8), .1], [TO(.07, .025, 5, 10, Math.PI), '#efe2c4', M(-.1, .3, 0, 1, 1, 1, 0, 0, 0), .06], [TO(.07, .025, 5, 10, Math.PI), '#efe2c4', M(.1, .3, 0, 1, 1, 1, 0, 0, 0), .06]]),
  rings: merge([...[[-.19, -.1], [0, -.1], [.19, -.1], [-.19, .1], [0, .1], [.19, .1]].map(([x, z]) => [TO(.085, .022, 4, 12), '#efe0bd', M(x, .03, z, 1, 1, 1, Math.PI / 2, 0, 0), .05])]),
  line: merge(Array.from({ length: 7 }, (_, i) => [TO(rnd(.08, .14), .012, 3, 14), '#1f7f8a', M(rnd(-.08, .08), .07 + rnd(-.02, .03), rnd(-.08, .08), 1, 1, 1, rnd(0, 6), rnd(0, 6), rnd(0, 6))]))
};
const BLOCKERS = ['bottle', 'can', 'cup', 'flipflop'], TANGLERS = ['bag', 'rings', 'line'];

/* ---- rocks (sheet 06) ---- */
function rockGeo(r, mossy) {
  const g = IC(r, 1).toNonIndexed(); const p = g.attributes.position, seed = Math.random() * 9;
  for (let i = 0; i < p.count; i++) { _v.set(p.getX(i), p.getY(i), p.getZ(i)); const k = 1 + .2 * Math.sin(_v.x * 7 + seed) * Math.cos(_v.z * 6 - seed); _v.multiplyScalar(k); _v.y *= .72; p.setXYZ(i, _v.x, _v.y, _v.z); }
  g.computeVertexNormals(); const col = [];
  for (let i = 0; i < p.count; i += 3) { const yy = (p.getY(i) + p.getY(i + 1) + p.getY(i + 2)) / 3; _c.set(mossy && yy > r * .5 ? '#7a9152' : '#938a7c').offsetHSL(0, 0, yy / r * .08 + (Math.random() - .5) * .06); for (let k = 0; k < 3; k++) col.push(_c.r, _c.g, _c.b); }
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3)); return g;
}

/* ---- sandcastle: a tidy little blocker that crumbles when tapped ---- */
GEO.castle = merge([
  [CY(.42, .5, .34, 8), '#e2c27c', M(0, .17, 0), .1],
  [CY(.2, .24, .5, 8), '#e8cd8c', M(-.2, .55, .05), .1], [CN(.25, .24, 8), '#d9575a', M(-.2, .92, .05), .05],
  [CY(.17, .2, .4, 8), '#e8cd8c', M(.22, .5, -.05), .1], [CN(.21, .22, 8), '#3f9bf0', M(.22, .81, -.05), .05],
  [BX(.18, .12, .04), '#c9a55e', M(0, .3, .42)],
  [BX(.05, .26, .02), '#f4ead2', M(.22, 1.0, -.05)]
]);
/* ---- beach umbrella left on the sand: a big blocker that folds when tapped ---- */
GEO.umbrella = (function () {
  const p = [[CY(.04, .045, 1.25, 6), '#8a6a43', M(.05, .62, 0, 1, 1, 1, 0, 0, -.1)], [CY(.3, .42, .12, 8), '#e2c27c', M(0, .06, 0), .1]];
  for (let k = 0; k < 8; k++) p.push([new THREE.ConeGeometry(.85, .45, 1, 1, false, k * Math.PI / 4, Math.PI / 4), k % 2 ? '#fbf1d8' : '#E8664A', M(.12, 1.32, 0, 1, 1, 1, 0, 0, -.1), .12]);
  p.push([S(.05, 6, 4), '#E0B040', M(.1, 1.58, 0, 1, 1, 1)]);
  return merge(p);
})();
/* ---- a hole in the sand: traps hatchlings (sheet 14 / Leave No Trace advice) ---- */
GEO.litter.hole = merge([[TO(.26, .07, 5, 12), '#d9be8c', M(0, .03, 0, 1, 1, 1, Math.PI / 2, 0, 0), .1], [CY(.25, .2, .05, 12), '#3b2d1c', M(0, .02, 0), .1], [CY(.12, .1, .04, 10), '#241a10', M(0, .01, 0)]]);
/* ---- beach ball: spins across the sand and flips anything it hits ---- */
GEO.ball = (function () {
  const g = S(.3, 12, 8).toNonIndexed(); const p = g.attributes.position, col = [], cs = ['#e8664a', '#fbf1d8', '#3f9bf0', '#E0B040', '#7DB05A', '#fbf1d8'];
  for (let i = 0; i < p.count; i += 3) { const a = Math.atan2(p.getZ(i), p.getX(i)) + Math.PI; _c.set(cs[Math.floor(a / (Math.PI * 2) * 6) % 6]); for (let k = 0; k < 3; k++) col.push(_c.r, _c.g, _c.b); }
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3)); g.computeVertexNormals(); return g;
})();

/* ---- nest (sheet 09): sand crater with raised rim, pebbles, sprouts; eggs are instanced ---- */
GEO.nest = (function () {
  const prof = [[.5, -.07], [.56, .02], [.64, .14], [.74, .2], [.88, .1], [1.02, -.02]].map(([x, y]) => new THREE.Vector2(x, y));
  const p = [[new THREE.LatheGeometry(prof, 12), '#e2c896', M(0, 0, 0, 1, 1, .8), .07], [new THREE.CircleGeometry(.5, 10).rotateX(-Math.PI / 2), '#b8955f', M(0, -.06, 0, 1, 1, .8)]];
  for (let i = 0; i < 5; i++) { const a = i / 5 * 6.283 + .4; p.push([IC(.05, 0), '#9b8b74', M(Math.cos(a) * .82, .1, Math.sin(a) * .66), .1]); }
  for (const a of [.9, 2.4, 4.1, 5.4]) for (const s of [-1, 1]) p.push([S(.07, 6, 4), '#5f9a45', M(Math.cos(a) * .95 + s * .04, .2, Math.sin(a) * .76, .5, 1.4, .25, 0, a, s * .55)]);
  return merge(p);
})();
GEO.egg = merge([[S(.09, 10, 8), '#f4ead2', M(0, .07, 0, 1, 1.05, 1)]]);
const eggs = new Batch(GEO.egg, MAT, 48);

/* ---- recycling bin (sheet 10) ---- */
GEO.bin = merge([
  [new THREE.CylinderGeometry(.42, .35, .9, 4, 1, true), '#2f8be0', M(0, .45, 0, 1, 1, 1, 0, Math.PI / 4, 0), .05],
  [BX(.66, .07, .1), '#3f9bf0', M(0, .9, .28), .05], [BX(.66, .07, .1), '#3f9bf0', M(0, .9, -.28), .05], [BX(.1, .07, .46), '#3f9bf0', M(.28, .9, 0), .05], [BX(.1, .07, .46), '#3f9bf0', M(-.28, .9, 0), .05],
  [BX(.5, .03, .5), '#14202e', M(0, .56, 0)],
  [CY(.12, .12, .07, 10), '#1d2533', M(.32, .1, -.24, 1, 1, 1, 0, 0, Math.PI / 2)], [CY(.12, .12, .07, 10), '#1d2533', M(-.32, .1, -.24, 1, 1, 1, 0, 0, Math.PI / 2)]
]);
GEO.binLid = merge([[BX(.64, .07, .64), '#3f9bf0', M(0, 0, .32), .05], [BX(.2, .05, .06), '#2f7bd0', M(0, .05, .62)]]);
const recycleTex = canvasTex(128, 128, (c) => {
  c.translate(64, 66); c.fillStyle = '#f1e2c0';
  for (let i = 0; i < 3; i++) { c.save(); c.rotate(i * 2.094); c.beginPath(); c.moveTo(-14, -38); c.lineTo(16, -38); c.lineTo(30, -14); c.lineTo(38, -19); c.lineTo(32, 4); c.lineTo(10, 0); c.lineTo(18, -5); c.lineTo(8, -24); c.lineTo(-6, -24); c.closePath(); c.fill(); c.restore(); }
});
function makeBin(x, z) {
  const g = new THREE.Group(), body = new THREE.Mesh(GEO.bin, MAT), lid = new THREE.Mesh(GEO.binLid, MAT); lid.position.set(0, .94, -.32);
  const logo = new THREE.Mesh(new THREE.PlaneGeometry(.42, .42), curved(new THREE.MeshLambertMaterial({ map: recycleTex, transparent: true }), 'logo')); logo.position.set(0, .48, .315); logo.rotation.x = -.08;
  const pile = new THREE.Group(); const kinds = ['bottle', 'can', 'bag', 'cup', 'line', 'flipflop', 'bottle', 'can'];
  kinds.forEach((k, i) => { const m = new THREE.Mesh(GEO.litter[k], MAT); m.scale.setScalar(.85); m.position.set(rnd(-.12, .12), .66 + i * .035, rnd(-.1, .1)); m.rotation.set(rnd(0, 6), rnd(0, 6), 0); m.visible = false; pile.add(m); });
  g.add(body, lid, logo, pile); g.position.set(x, groundH(x, z), z); g.rotation.y = -.35; g.scale.setScalar(1.25); scene.add(g);
  return { g, lid, pile, x, z, n: 0, sq: 0, lidT: 0, open: 0 };
}

/* ---- a dolphin that leaps through the sea now and then (ocean-life easter egg) ---- */
GEO.dolphin = merge([[S(.5, 10, 8), '#6f8fa8', M(0, 0, 0, 1.7, .62, .62), .06], [S(.46, 8, 6), '#dfe9ef', M(.02, -.15, 0, 1.6, .4, .55)], [CN(.13, .5, 6), '#6f8fa8', M(.98, -.05, 0, 1, 1, 1, 0, 0, -Math.PI / 2)], [CN(.17, .4, 4), '#5f7f98', M(-.05, .42, 0, 1, 1, 1, 0, 0, .35)], [CN(.12, .6, 5), '#6f8fa8', M(-1.1, .05, 0, 1, 1, 1, 0, 0, Math.PI / 2)], [S(.2, 6, 4), '#5f7f98', M(-1.45, .1, 0, .35, .06, .6)], [S(.12, 6, 4), '#5f7f98', M(.35, -.22, .3, .6, .12, .3)], [S(.12, 6, 4), '#5f7f98', M(.35, -.22, -.3, .6, .12, .3)]]);
