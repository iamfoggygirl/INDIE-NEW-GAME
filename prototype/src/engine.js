/* Harvest Sow rules engine. Pure functions, no DOM. Shared by the browser game and the Node level tools.
 *
 * Slots (14): 0-5 your plots, 6 your barn, 7-12 the crows' plots, 13 crows' barn.
 * Sowing runs 0 -> 13 -> 0 (counter-clockwise on screen). You skip the crows' barn, they skip yours.
 * Rules (Kalah-style, chosen for clarity; swap for Ayo captures later behind one function):
 *   - Last seed in YOUR barn            -> extra move
 *   - Last seed in an EMPTY plot of yours, opposite plot has seeds -> harvest both into your barn
 *   - Rocks are skipped by sowing. Fences lock a plot of yours until your barn reaches `unlock`.
 *   - Gold plot: a harvest touching it pays +2 bonus.
 *   - Goal: barn >= lv.goal within lv.moves of your sows.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Sow = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  const P_BARN = 6, C_BARN = 13;
  const barnOf = (who) => (who === 0 ? P_BARN : C_BARN);
  const owns = (who, slot) => (who === 0 ? slot >= 0 && slot <= 5 : slot >= 7 && slot <= 12);

  function makeState(lv) {
    const s = new Array(14).fill(0);
    for (let i = 0; i < 6; i++) { s[i] = lv.seeds[i]; s[7 + i] = lv.seeds[6 + i]; }
    return { s, turn: 0, used: 0, status: 'play' };
  }
  const clone = (st) => ({ s: st.s.slice(), turn: st.turn, used: st.used, status: st.status });

  function isLocked(lv, st, slot) {
    if (!lv.fences) return false;
    for (const f of lv.fences) if (f.slot === slot && st.s[P_BARN] < f.unlock) return true;
    return false;
  }

  function legalMoves(lv, st, who) {
    const out = [];
    const base = who === 0 ? 0 : 7;
    for (let k = 0; k < 6; k++) {
      const slot = base + k;
      if (st.s[slot] > 0 && !(lv.rocks && lv.rocks.includes(slot)) && !(who === 0 && isLocked(lv, st, slot))) out.push(slot);
    }
    return out;
  }

  function sweep(n) {
    for (let i = 0; i < 6; i++) { n.s[P_BARN] += n.s[i]; n.s[i] = 0; }
    for (let i = 7; i < 13; i++) { n.s[C_BARN] += n.s[i]; n.s[i] = 0; }
  }

  // Apply one sow. Returns { state, events }. opts.noLimit ignores the move budget (used by AI search).
  function applyMove(lv, st, slot, opts) {
    opts = opts || {};
    const ev = [];
    const n = clone(st);
    const who = n.turn;
    const rocks = lv.rocks || [];
    const gold = lv.gold || [];
    let seeds = n.s[slot];
    n.s[slot] = 0;
    ev.push({ t: 'lift', slot, n: seeds, who });
    const skip = who === 0 ? C_BARN : P_BARN;
    let pos = slot;
    while (seeds > 0) {
      pos = (pos + 1) % 14;
      if (pos === skip || rocks.includes(pos)) continue;
      n.s[pos]++; seeds--;
      ev.push({ t: 'drop', slot: pos, who });
    }
    const last = pos;
    let extra = false;
    if (last === barnOf(who)) {
      extra = true; ev.push({ t: 'extra', who });
    } else if (owns(who, last) && n.s[last] === 1) {
      const opp = 12 - last;
      if (n.s[opp] > 0) {
        const bonus = gold.includes(last) || gold.includes(opp) ? 2 : 0;
        const amount = n.s[opp] + 1;
        n.s[opp] = 0; n.s[last] = 0; n.s[barnOf(who)] += amount + bonus;
        ev.push({ t: 'harvest', who, from: last, opp, amount, bonus });
      }
    }
    if (who === 0) n.used++;
    if (who === 0 && n.s[P_BARN] >= lv.goal) { n.status = 'won'; return { state: n, events: ev }; }
    if (!extra) n.turn = 1 - who;
    if (legalMoves(lv, n, n.turn).length === 0) {
      sweep(n); ev.push({ t: 'sweep' });
      n.status = n.s[P_BARN] >= lv.goal ? 'won' : 'lost';
    } else if (who === 0 && !opts.noLimit && n.used >= lv.moves) {
      n.status = 'lost';
    }
    return { state: n, events: ev };
  }

  // ---- Crows AI ----------------------------------------------------------------------------
  function evalState(st) {
    if (st.status === 'won') return -1000;
    if (st.status === 'lost') return 1000;
    let cp = 0, pp = 0;
    for (let i = 0; i < 6; i++) { pp += st.s[i]; cp += st.s[7 + i]; }
    return st.s[C_BARN] - 1.5 * st.s[P_BARN] + 0.1 * (cp - pp);
  }
  function search(lv, st, depth) {
    if (st.status !== 'play' || depth === 0) return evalState(st);
    const moves = legalMoves(lv, st, st.turn);
    if (!moves.length) return evalState(st);
    let best = st.turn === 1 ? -Infinity : Infinity;
    for (const m of moves) {
      const v = search(lv, applyMove(lv, st, m, { noLimit: true }).state, depth - 1);
      if (st.turn === 1 ? v > best : v < best) best = v;
    }
    return best;
  }
  // depth 0: lowest plot (harmless, predictable). depth 1: greedy. 2-3: looks ahead. Ties -> lowest slot.
  function chooseCrow(lv, st, depth) {
    const moves = legalMoves(lv, st, 1);
    if (depth <= 0) return moves[0];
    let bestM = moves[0], bestV = -Infinity;
    for (const m of moves) {
      const v = search(lv, applyMove(lv, st, m, { noLimit: true }).state, depth - 1);
      if (v > bestV + 1e-9) { bestV = v; bestM = m; }
    }
    return bestM;
  }
  // Run the crows' whole turn (they may chain extra moves). Returns { state, turns:[{slot,events}] }.
  function crowsTurn(lv, st) {
    let cur = st; const turns = [];
    while (cur.status === 'play' && cur.turn === 1) {
      const m = chooseCrow(lv, cur, lv.crowDepth || 0);
      const r = applyMove(lv, cur, m, { noLimit: true });
      turns.push({ slot: m, events: r.events });
      cur = r.state;
    }
    return { state: cur, turns };
  }
  // One full player move plus the crows' reply (what the solver explores).
  function step(lv, st, slot) {
    const r = applyMove(lv, st, slot);
    if (r.state.status === 'play' && r.state.turn === 1) return crowsTurn(lv, r.state).state;
    return r.state;
  }

  // ---- Solver ------------------------------------------------------------------------------
  const key = (st, left) => st.s.join(',') + '|' + st.turn + '|' + left;
  // Iterative deepening: shortest winning line from st (or null). Proves solvability.
  function solve(lv, st, opts) {
    opts = opts || {};
    const maxLeft = Math.min(opts.maxMoves || lv.moves - st.used, lv.moves - st.used);
    const cap = opts.nodeCap || 400000;
    let nodes = 0, capped = false;
    for (let d = 1; d <= maxLeft; d++) {
      const dead = new Set();
      const dfs = (s, left) => {
        if (s.status === 'won') return [];
        if (s.status !== 'play' || left === 0) return null;
        if (++nodes > cap) { capped = true; return null; }
        const k = key(s, left);
        if (dead.has(k)) return null;
        for (const m of legalMoves(lv, s, 0)) {
          const r = dfs(step(lv, s, m), left - 1);
          if (r) return [m].concat(r);
          if (capped) return null;
        }
        dead.add(k);
        return null;
      };
      const line = dfs(st, d);
      if (line) return { line, moves: line.length, nodes };
      if (capped) return { line: null, capped: true, nodes };
    }
    return { line: null, nodes };
  }
  // Best barn reachable within `left` more moves (memoised). Used to set fair goals.
  function maxBarn(lv, st, left, memo) {
    memo = memo || new Map();
    if (st.status === 'won') return st.s[P_BARN];
    if (st.status !== 'play' || left === 0) return st.s[P_BARN];
    const k = key(st, left);
    if (memo.has(k)) return memo.get(k);
    let best = st.s[P_BARN];
    for (const m of legalMoves(lv, st, 0)) {
      const v = maxBarn(lv, step(lv, st, m), left - 1, memo);
      if (v > best) best = v;
    }
    memo.set(k, best);
    return best;
  }
  // Fraction of random-play rollouts that win. Low = hard. Deterministic with a seeded rng.
  function randomWinRate(lv, rng, trials) {
    let wins = 0;
    for (let t = 0; t < trials; t++) {
      let st = makeState(lv);
      while (st.status === 'play') {
        const mv = legalMoves(lv, st, 0);
        if (!mv.length) break;
        st = step(lv, st, mv[Math.floor(rng() * mv.length)]);
      }
      if (st.status === 'won') wins++;
    }
    return wins / trials;
  }

  return { P_BARN, C_BARN, barnOf, owns, makeState, clone, isLocked, legalMoves, applyMove,
    chooseCrow, crowsTurn, step, solve, maxBarn, randomWinRate };
});
