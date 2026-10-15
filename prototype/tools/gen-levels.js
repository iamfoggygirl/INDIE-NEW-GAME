#!/usr/bin/env node
/* Generates and PROVES the 20 prototype levels.
 * Every level gets: a shortest winning line (par + hint move), a fair goal derived from the best reachable barn,
 * and a difficulty rating from random-play win rate. Levels that cannot be proven are rejected and re-rolled.
 * Usage: node prototype/tools/gen-levels.js            (writes prototype/src/levels.js + levels.report.txt)
 */
const fs = require('fs');
const path = require('path');
const E = require('../src/engine.js');

function mulberry32(a) { return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

// Hand-made tutorial levels: one idea each, solvable in a tap or two.
const HAND = [
  { name: 'First seed', twist: 'tap', crowDepth: 0, goal: 1, moves: 2, seeds: [0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 1, 1] },
  { name: 'Empty plot', twist: 'harvest', crowDepth: 0, goal: 5, moves: 3, seeds: [0, 2, 0, 0, 1, 0, 4, 0, 0, 2, 0, 1] },
  { name: 'Barn chain', twist: 'extra', crowDepth: 0, goal: 6, moves: 5, seeds: [0, 0, 4, 0, 1, 0, 0, 3, 0, 2, 0, 0] },
];

// name, twist, moves, crowDepth, rocks, fences, gold, tightness (fraction of the best reachable barn we ask for)
const SPEC = [
  ['Meadow',       'plain', 4, 0, 0, 0, 0, 0.70],
  ['Crows wake',   'crows', 4, 1, 0, 0, 0, 0.75],
  ['First rock',   'rocks', 5, 1, 1, 0, 0, 0.78],
  ['Stone path',   'rocks', 5, 1, 2, 0, 0, 0.80],
  ['Breather',     'plain', 5, 1, 1, 0, 0, 0.65],
  ['Sharp crows',  'smart', 5, 2, 0, 0, 0, 0.85],
  ['Hedge row',    'smart', 6, 2, 1, 0, 0, 0.88],
  ['The fence',    'fence', 5, 1, 0, 1, 0, 0.80],
  ['Gate keeper',  'fence', 6, 2, 0, 1, 0, 0.85],
  ['Gold plot',    'gold',  5, 1, 0, 0, 1, 0.75],
  ['Golden hour',  'gold',  6, 2, 1, 0, 1, 0.85],
  ['Locked gold',  'mix',   6, 2, 0, 1, 1, 0.88],
  ['Breather II',  'plain', 5, 1, 1, 0, 1, 0.65],
  ['Stone & gold', 'mix',   6, 2, 2, 0, 1, 0.90],
  ['Gatehouse',    'mix',   6, 3, 1, 1, 0, 0.90],
  ['Crow council', 'smart', 6, 3, 1, 0, 1, 0.92],
  ['Last light',   'mix',   7, 3, 1, 1, 1, 0.95],
];

function rollLevel(spec, rng) {
  const [name, twist, moves, crowDepth, nRocks, nFences, nGold, tight] = spec;
  const seeds = [];
  for (let i = 0; i < 12; i++) seeds.push(1 + Math.floor(rng() * 5)); // 1..5
  const slots = [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12];
  const pick = (pool) => pool.splice(Math.floor(rng() * pool.length), 1)[0];
  const rocks = [];
  const pool = slots.slice();
  for (let i = 0; i < nRocks; i++) rocks.push(pick(pool.filter((s) => s !== 5 && s !== 7)));
  const fences = [];
  for (let i = 0; i < nFences; i++) fences.push({ slot: pick([1, 2, 3, 4].filter((s) => !rocks.includes(s))), unlock: 2 });
  const gold = [];
  for (let i = 0; i < nGold; i++) gold.push(pick([0, 1, 2, 3, 4, 5].filter((s) => !rocks.includes(s) && !fences.some((f) => f.slot === s))));
  for (const r of rocks) { const idx = r <= 5 ? r : r - 1; seeds[idx] = 0; }
  const lv = { name, twist, crowDepth, moves, seeds, rocks, fences, gold, goal: 1 };
  return { lv, tight };
}

function finish(lv, tight, rng) {
  const st = E.makeState(lv);
  const best = E.maxBarn(lv, st, lv.moves);
  if (best < 3) return null;
  lv.goal = Math.max(2, Math.round(best * tight));
  const sol = E.solve(lv, st, { nodeCap: 1500000 });
  if (!sol.line) return null;
  lv.par = sol.moves;                // shortest proven win
  lv.line = sol.line;                // proven winning line (first element drives the hint hand)
  // fairness: don't allow par == full budget on early levels (needs slack), and avoid trivial par 1
  const slack = lv.moves - lv.par;
  lv.slack = slack;
  lv.winRate = +E.randomWinRate(lv, rng, 150).toFixed(3);
  return lv;
}

function main() {
  const out = [];
  const report = [];
  HAND.forEach((h, i) => {
    const lv = Object.assign({ rocks: [], fences: [], gold: [] }, h);
    const st = E.makeState(lv);
    const sol = E.solve(lv, st);
    if (!sol.line) throw new Error('hand level ' + (i + 1) + ' is NOT solvable');
    lv.par = sol.moves; lv.line = sol.line; lv.slack = lv.moves - lv.par;
    lv.winRate = +E.randomWinRate(lv, mulberry32(7 + i), 150).toFixed(3);
    out.push(lv);
  });
  SPEC.forEach((spec, k) => {
    const idx = out.length;
    let found = null, tries = 0;
    while (!found && tries < 400) {
      const rng = mulberry32(1000 * (idx + 1) + tries);
      tries++;
      const { lv, tight } = rollLevel(spec, rng);
      const done = finish(lv, tight, rng);
      if (!done) continue;
      // difficulty gates: tutorial-ish levels must be forgiving; late levels must not be a coin flip either way
      // sawtooth: breathers (name starts 'Breather') are easy + short; everything else climbs in par.
      const breather = spec[0].startsWith('Breather');
      const minPar = breather ? 2 : idx < 6 ? 2 : idx < 12 ? 3 : 4;
      const minSlack = idx < 9 ? 1 : 0;
      const lo = breather ? 0.30 : idx < 9 ? 0.08 : 0.02, hi = breather ? 0.85 : idx < 9 ? 0.60 : 0.30;
      if (done.goal <= 12 && done.goal >= 3 && done.slack >= minSlack && done.par >= minPar && done.winRate >= lo && done.winRate <= hi) found = done;
    }
    if (!found) throw new Error('could not generate level ' + (idx + 1) + ' (' + spec[0] + ')');
    found.tries = tries;
    out.push(found);
  });
  out.forEach((lv, i) => {
    lv.id = i + 1;
    report.push(`L${String(lv.id).padStart(2)} ${lv.name.padEnd(13)} twist=${lv.twist.padEnd(8)} crows=${lv.crowDepth} moves=${lv.moves} goal=${String(lv.goal).padStart(2)} par=${lv.par} slack=${lv.slack} randomWin=${(lv.winRate * 100).toFixed(0).padStart(3)}% rocks=${lv.rocks.length} fences=${lv.fences.length} gold=${lv.gold.length}`);
  });
  const dir = path.join(__dirname, '..', 'src');
  fs.writeFileSync(path.join(dir, 'levels.js'), '/* generated by tools/gen-levels.js - do not edit by hand */\n(function(r){r.LEVELS=' + JSON.stringify(out) + ';if(typeof module==="object")module.exports=r.LEVELS;})(typeof self!=="undefined"?self:this);\n');
  fs.writeFileSync(path.join(dir, '..', 'levels.report.txt'), report.join('\n') + '\n');
  console.log(report.join('\n'));
}
main();
