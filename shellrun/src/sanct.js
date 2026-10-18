/* ===================== SANCTUARY: the home base you rebuild between levels =====================
   Shells earned on the beach build and upgrade five places. Each one gives a small, earned perk on the beach,
   so progress you can see turns into help you can feel. Nothing here can be bought with money, and the perks
   are gentle: they make good play smoother, they never play for you. */
const SANCT = [
  { k: 'hatch', name: 'Hatchery', at: 0, ic: 'nest', perk: (n) => `Boosts start ${25 + n * 12}% charged`, why: 'A fenced hatchery keeps nests safe until the eggs hatch.' },
  { k: 'recy', name: 'Recycling depot', at: 2, ic: 'bin', perk: (n) => n ? `+${n} shell${n > 1 ? 's' : ''} every level you pass` : 'No bonus shells yet', why: 'Litter you bin gets sorted and recycled.' },
  { k: 'vol', name: 'Volunteer hut', at: 5, ic: 'hands', perk: (n) => n ? `A volunteer bins litter every ${[0, 26, 21, 16][n]} s` : 'No volunteers yet', why: 'Volunteers walk the beach at dawn and pick up trash.' },
  { k: 'vet', name: 'Rescue centre', at: 9, ic: 'heart', perk: (n) => n ? `Flipped or tangled turtles hold on ${n * 20}% longer` : 'Turtles in trouble wait the usual time', why: 'Rescue teams care for turtles in trouble, then release them.' },
  { k: 'tower', name: 'Ranger tower', at: 14, ic: 'ranger', perk: (n) => n ? `Boosts last ${n * 15}% longer` : 'Boosts last the usual time', why: 'Rangers watch nesting beaches through the night.' }
];
const SANCT_COST = [30, 80, 160];
const sanctLv = (k) => ((PROG.sanct || {})[k] | 0);
/* the perk level used on the beach: never in the playable ad or the title screen's demo */
function perk(k) { if (PLAY || attract) return 0; return sanctLv(k); }
const sanctNext = () => SANCT.find((b) => PROG.unlocked >= b.at && sanctLv(b.k) < 3 && (PROG.shells || 0) >= SANCT_COST[sanctLv(b.k)]);

/* ---------- the diorama: one island, five plots, every tier changes the silhouette ---------- */
const SA = {
  plot: (lock) => `<ellipse cx="0" cy="0" rx="30" ry="9" fill="#e9c98a" ${st(2)}/><path d="M-22 0l6-4M-6 2l5-5M10 1l6-4" stroke="#c9a463" stroke-width="2" stroke-linecap="round"/><g transform="translate(0 -24)"><rect x="-3" y="0" width="6" height="22" rx="2" fill="url(#gN)" ${st(1.8)}/><rect x="-17" y="-14" width="34" height="16" rx="5" fill="#fff6dc" ${st(2)}/>${lock ? `<rect x="-5" y="-8" width="10" height="7.5" rx="1.6" fill="${O}"/><path d="M-3 -8 v-2.2 a3 3 0 0 1 6 0 v2.2" fill="none" stroke="${O}" stroke-width="1.8"/>` : `<path d="M-5-6h10M0-11v10" stroke="#3f9a2c" stroke-width="3" stroke-linecap="round"/>`}</g>`,
  hatch: (n) => {
    let s = `<ellipse cx="0" cy="2" rx="36" ry="11" fill="#e9c98a" ${st(2)}/>`;
    s += [[-10, -2], [2, -4], [12, 0], [-2, 3]].map(([x, y]) => `<ellipse cx="${x}" cy="${y - 4}" rx="5" ry="4" fill="#fff6dc" ${st(1.5)}/>`).join('');
    const posts = [-32, -21, -10, 1, 12, 23, 33];
    s += `<path d="M-33 -6 C-20 -12 20 -12 33 -6" fill="none" stroke="#7a471d" stroke-width="2"/>` + posts.map((x) => `<rect x="${x - 2}" y="-18" width="4" height="${n >= 2 ? 22 : 18}" rx="1.5" fill="url(#gN)" ${st(1.4)}/>`).join('');
    s += `<path d="M-33 -1 C-20 6 20 6 33 -1" fill="none" stroke="#7a471d" stroke-width="2"/>`;
    if (n >= 2) s += `<path d="M-36 -22 L0 -34 L36 -22 L30 -18 L0 -28 L-30 -18z" fill="url(#gT)" ${st(1.8)}/>${hl(-12, -27, 8, 2, -18, .5)}`;
    if (n >= 3) s += `<g transform="translate(40 -6)"><rect x="-2" y="-26" width="4" height="28" rx="1.5" fill="url(#gS)" ${st(1.4)}/><circle cx="0" cy="-28" r="6" fill="#ff6a5a" ${st(1.6)}/><circle cx="0" cy="-28" r="13" fill="#ff6a5a" opacity=".22"/></g>`;
    return s;
  },
  recy: (n) => {
    const cols = ['gB', 'gG', 'gY'], k = Math.max(1, n), w = 18;
    let s = `<ellipse cx="0" cy="2" rx="${18 + k * 12}" ry="9" fill="#e9c98a" ${st(2)}/>`;
    if (n >= 3) s += `<path d="M-40 -2 V-36 H40 V-2" fill="url(#gS)" ${st(2)}/><path d="M-46 -34 L0 -50 L46 -34z" fill="url(#gR)" ${st(2)}/>${hl(-16, -40, 10, 2.4, -16, .5)}`;
    for (let i = 0; i < k; i++) { const x = (i - (k - 1) / 2) * (w + 6); s += `<g transform="translate(${x} 0)"><path d="M-9 -2 L-8 -26 H8 L9 -2z" fill="url(#${cols[i]})" ${st(1.8)}/><rect x="-11" y="-31" width="22" height="6" rx="2.5" fill="url(#${cols[i]})" ${st(1.6)}/><path d="M-3 -16 a3 3 0 1 0 6 0" fill="none" stroke="#fff" stroke-width="1.8"/>${hl(-4, -20, 1.6, 4, 0, .45)}</g>`; }
    return s;
  },
  vol: (n) => {
    let s = `<ellipse cx="0" cy="2" rx="${n >= 2 ? 44 : 32}" ry="10" fill="#e9c98a" ${st(2)}/>`;
    const hut = (x, sc) => `<g transform="translate(${x} 0) scale(${sc})"><rect x="-16" y="-24" width="32" height="24" rx="3" fill="url(#gN)" ${st(2)}/><path d="M-21 -22 L0 -40 L21 -22z" fill="url(#gY)" ${st(2)}/><rect x="-5" y="-14" width="10" height="14" rx="2" fill="#7a471d" ${st(1.5)}/>${hl(-8, -30, 6, 2, -36, .5)}</g>`;
    s += hut(n >= 2 ? -12 : 0, 1);
    if (n >= 2) s += `<g transform="translate(26 0)"><path d="M-14 0 L0 -22 L14 0z" fill="url(#gO)" ${st(2)}/><path d="M0 -22 V0" stroke="${O}" stroke-width="1.6"/></g>`;
    if (n >= 3) s += [[-38, 0], [42, 2]].map(([x, y]) => `<g transform="translate(${x} ${y})"><rect x="-5" y="-14" width="10" height="13" rx="4" fill="url(#gG)" ${st(1.6)}/><circle cx="0" cy="-19" r="5" fill="#f2c79a" ${st(1.6)}/><rect x="4" y="-12" width="7" height="8" rx="2" fill="url(#gB)" ${st(1.3)}/></g>`).join('');
    return s;
  },
  vet: (n) => {
    let s = `<ellipse cx="0" cy="2" rx="${n >= 3 ? 50 : 38}" ry="10" fill="#e9c98a" ${st(2)}/>`;
    if (n >= 2) s += `<ellipse cx="${n >= 3 ? -30 : -26}" cy="-1" rx="13" ry="5" fill="url(#gT)" ${st(1.6)}/>${hl(-30, -2, 6, 1.4, 0, .6)}`;
    s += `<rect x="-14" y="-30" width="40" height="30" rx="4" fill="#fbf4e6" ${st(2)}/><path d="M-18 -28 H30 L26 -36 H-14z" fill="url(#gT)" ${st(2)}/><rect x="0" y="-14" width="10" height="14" rx="2" fill="url(#gB)" ${st(1.5)}/>`;
    s += `<g transform="translate(-4 -18) scale(.42)">${`<path d="${HEART}" transform="translate(-16 -16)" fill="url(#gR)" ${st(3)}/>`}</g>`;
    if (n >= 3) s += `<rect x="26" y="-22" width="20" height="22" rx="3" fill="#fbf4e6" ${st(2)}/><path d="M24 -20 H48 L45 -27 H27z" fill="url(#gT)" ${st(1.8)}/>`;
    return s;
  },
  tower: (n) => {
    const h = [0, 40, 52, 60][n];
    let s = `<ellipse cx="0" cy="2" rx="26" ry="8" fill="#e9c98a" ${st(2)}/>`;
    s += `<path d="M-13 0 L-8 -${h} M13 0 L8 -${h} M-11 -${h * .35} L10 -${h * .62} M11 -${h * .35} L-10 -${h * .62}" stroke="#7a471d" stroke-width="3.4" stroke-linecap="round"/><path d="M-13 0 L-8 -${h} M13 0 L8 -${h}" stroke="url(#gN)" stroke-width="1.8" stroke-linecap="round"/>`;
    s += `<rect x="-16" y="-${h + 14}" width="32" height="15" rx="3" fill="url(#gN)" ${st(2)}/><rect x="-10" y="-${h + 11}" width="20" height="7" rx="2" fill="#bfe9f5" ${st(1.2)}/>`;
    s += `<path d="M-20 -${h + 14} L0 -${h + 28} L20 -${h + 14}z" fill="url(#gR)" ${st(2)}/>`;
    if (n >= 2) s += `<path d="M0 -${h + 28} V-${h + 44}" stroke="${O}" stroke-width="2"/><path d="M1 -${h + 44} L15 -${h + 39} L1 -${h + 34}z" fill="url(#gY)" ${st(1.5)}/>`;
    if (n >= 3) s += `<path d="M-14 -${h + 4} L-60 -${h + 18} L-60 -${h - 10}z" fill="#fff6c8" opacity=".35"/>`;
    return s;
  }
};
const PLOTS = { hatch: [104, 200, 1.25], recy: [250, 206, 1.15], vol: [186, 146, 1.2], vet: [96, 128, 1.12], tower: [270, 134, 1.12] };
function sanctScene(sel) {
  let s = `<svg class="sa-svg" viewBox="0 6 360 236" preserveAspectRatio="xMidYMid meet">
    <defs><linearGradient id="saSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fe0e0"/><stop offset="1" stop-color="#2fb0c8"/></linearGradient>
    <linearGradient id="saSand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe7b0"/><stop offset="1" stop-color="#f2c47a"/></linearGradient></defs>
    <rect width="360" height="250" rx="18" fill="url(#saSea)"/>
    <g opacity=".5" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"><path class="sa-w1" d="M20 30 q10-6 20 0 t20 0"/><path class="sa-w2" d="M300 24 q10-6 20 0 t20 0"/><path class="sa-w1" d="M18 232 q10-6 20 0 t20 0"/></g>
    <path d="M30 150 C20 90 80 52 170 58 C260 50 340 80 334 150 C340 208 270 236 180 234 C90 238 36 214 30 150z" fill="#fff4d6" opacity=".55"/>
    <path d="M40 150 C32 98 86 64 170 68 C252 62 326 90 322 150 C326 200 262 226 180 224 C96 228 46 204 40 150z" fill="url(#saSand)" ${st(2.4)}/>
    <g transform="translate(318 186) scale(.82) rotate(8)"><path d="M0 0 C4 -20 2 -40 8 -58" fill="none" stroke="#7a471d" stroke-width="6" stroke-linecap="round"/><path d="M0 0 C4 -20 2 -40 8 -58" fill="none" stroke="url(#gN)" stroke-width="3" stroke-linecap="round"/>${[-150, -110, -60, -20, 20].map((a) => `<path d="M8 -58 q${Math.cos(a * Math.PI / 180) * 18} ${Math.sin(a * Math.PI / 180) * 10 - 6} ${Math.cos(a * Math.PI / 180) * 32} ${Math.sin(a * Math.PI / 180) * 16 + 4}" fill="none" stroke="#2c7a3a" stroke-width="7" stroke-linecap="round"/><path d="M8 -58 q${Math.cos(a * Math.PI / 180) * 18} ${Math.sin(a * Math.PI / 180) * 10 - 6} ${Math.cos(a * Math.PI / 180) * 32} ${Math.sin(a * Math.PI / 180) * 16 + 4}" fill="none" stroke="url(#gG)" stroke-width="4" stroke-linecap="round"/>`).join('')}</g>`;
  // tiny turtle tracks running to the sea
  s += `<g fill="#c9a463" opacity=".7">${Array.from({ length: 7 }, (_, i) => `<ellipse cx="${200 + i * 9}" cy="${222 + i * 3}" rx="2" ry="1.2"/><ellipse cx="${204 + i * 9}" cy="${226 + i * 3}" rx="2" ry="1.2"/>`).join('')}</g>`;
  for (const b of SANCT) {
    const [x, y, sc] = PLOTS[b.k], n = sanctLv(b.k), open = PROG.unlocked >= b.at, can = open && n < 3 && (PROG.shells || 0) >= SANCT_COST[n];
    s += `<g class="sa-p ${sel === b.k ? 'sel' : ''} ${open ? '' : 'lock'}" data-k="${b.k}" transform="translate(${x} ${y}) scale(${sc})"><ellipse class="sa-hit" cx="0" cy="-18" rx="50" ry="40" fill="transparent"/>${sel === b.k ? `<ellipse cx="0" cy="2" rx="48" ry="15" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="7 6" class="sa-ring"/>` : ''}<g class="sa-in">${n ? SA[b.k](n) : SA.plot(!open)}</g>${can ? `<g transform="translate(26 -${n ? 58 : 46})"><g class="sa-up"><circle r="10" fill="url(#gG)" ${st(2)}/><path d="M0 4V-4M-4 0l4-4 4 4" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g></g>` : ''}</g>`;
  }
  return s + '</svg>';
}
function showSanct(onClose) {
  const v = document.createElement('div'); v.className = 'veil sanct'; v.style.zIndex = 14;
  let how = !PROG.sanctIntro; PROG.sanctIntro = 1; saveProg();
  let sel = (sanctNext() || SANCT.find((b) => PROG.unlocked >= b.at && sanctLv(b.k) < 3) || SANCT[0]).k;
  const draw = (built) => {
    const b = SANCT.find((q) => q.k === sel), n = sanctLv(b.k), open = PROG.unlocked >= b.at, cost = SANCT_COST[n], have = PROG.shells || 0;
    const btn = !open ? `<button class="b-navy" disabled>${ICON.lock || ''}Opens after level ${b.at}</button>`
      : n >= 3 ? `<button class="b-navy" disabled>${ICON.check}Fully built</button>`
      : have >= cost ? `<button class="b-gold hero" id="sab">${ICON.shell}${n ? 'Upgrade' : 'Build'} · ${cost}</button>`
      : `<button class="b-navy" id="sas">${ICON.shell}${cost - have} more shells</button>`;
    v.innerHTML = panel('Sanctuary', `<div class="sa-top"><button class="sa-q ${how ? 'on' : ''}" aria-label="How it works">?</button><div class="lbl">Your turtle sanctuary</div><button class="sa-crew" id="sac" aria-label="Crew">${ICON.turtle(skinNow)}</button><div class="pill shp sm">${ICON.shell}<span>${have}</span></div></div>
      ${how ? `<div class="sa-how"><div><i>1</i><span>Earn shells on the beach</span></div><div><i>2</i><span>Build or upgrade a place</span></div><div><i>3</i><span>It helps you on every level</span></div></div>` : ''}
      <div class="sa-map">${sanctScene(sel)}</div>
      <div class="sa-info ${built ? 'boom' : ''}"><div class="sa-ic"><svg viewBox="-56 -76 112 86">${SA[b.k](Math.max(1, n))}</svg></div><div class="sa-tx"><b>${b.name}</b><div class="sa-lv">${[0, 1, 2].map((i) => `<i class="${i < n ? 'on' : ''}"></i>`).join('')}</div>
        <span class="sa-now">${n ? b.perk(n) : 'Not built yet'}</span>${n < 3 && open ? `<span class="sa-nx">${ICON.play}Next: ${b.perk(n + 1)}</span>` : ''}<span class="sa-why">${b.why}</span></div></div>
      <div class="btns">${btn}<button class="b-navy" id="sax" hidden>Back</button></div>`);
    v.querySelector('.sa-q').onclick = () => { how = !how; tone(note(5), .06, 'triangle', .05); draw(); };
    v.querySelectorAll('.sa-p').forEach((g) => { g.onclick = () => { sel = g.dataset.k; tone(note(3 + SANCT.findIndex((q) => q.k === sel)), .08, 'triangle', .06); buzz(8); draw(); }; });
    const bb = v.querySelector('#sab'); if (bb) bb.onclick = () => {
      if ((PROG.shells || 0) < cost || n >= 3) return;
      PROG.shells -= cost; PROG.sanct = PROG.sanct || {}; PROG.sanct[b.k] = n + 1; saveProg();
      sfx.gold(); buzz([14, 30, 20, 30, 24]); track('sanct_build', { k: b.k, lv: n + 1, cost });
      draw(true); const p = v.querySelector(`.sa-p[data-k="${b.k}"]`); if (p) p.classList.add('built'); refreshHome();
    };
    const sb = v.querySelector('#sas'); if (sb) sb.onclick = () => { au(); showShop(); };
    v.querySelector('#sax').onclick = () => { au(); dismiss(v); onClose && onClose(); };
    v.querySelector('#sac').onclick = () => { au(); dismiss(v); onClose && onClose(); showCrew(); };
  };
  draw(); $('#app').appendChild(v); track('sanct_open', {});
}
let sanctIco = ''; const sanctIcon = () => sanctIco || (sanctIco = (() => {
  const trunk = 'M24.5 26.5C25 21 24.4 16.5 25.6 11.5', fr = 'M25.6 11.5c-2.6-2.8-6.4-2.4-8 .2M25.6 11.5c2.4-2.6 5-2 5.8.4M25.6 11.5c-.6-3 .8-5.6 3-6.4';
  return ic(`<path d="M3.5 27h25" stroke="${O}" stroke-width="2.6" stroke-linecap="round"/>
    <path d="${trunk}" stroke="${O}" stroke-width="3.6" fill="none" stroke-linecap="round"/><path d="${trunk}" stroke="url(#gN)" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <path d="${fr}" stroke="${O}" stroke-width="4.2" fill="none" stroke-linecap="round"/><path d="${fr}" stroke="url(#gG)" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <rect x="4.5" y="15.5" width="15" height="11" rx="2" fill="url(#gN)" ${st(2)}/><path d="M2.5 17 L12 8 L21.5 17z" fill="url(#gY)" ${st(2)}/>
    <rect x="9.5" y="19.5" width="5" height="7" rx="1.2" fill="#7a471d" ${st(1.4)}/>${hl(8.5, 12.5, 3, 1, -40, .65)}`);
})());

/* the level banner lists the Sanctuary help that is active right now, so the perks are felt, not hidden */
function sanctChips() {
  if (PLAY || attract) return '';
  const n = (k) => sanctLv(k), out = [];
  if (n('hatch') && night >= 2) out.push(`Boost ${25 + n('hatch') * 12}% charged`);
  if (n('tower') && night >= 2) out.push(`Boosts +${n('tower') * 15}%`);
  if (n('vol')) out.push('Volunteer on duty');
  if (n('vet')) out.push('Rescue team');
  if (n('recy')) out.push(`+${n('recy')} recycling shells`);
  return out.length ? `<span class="perks">${sanctIcon()}${out.map((t) => `<em>${t}</em>`).join('')}</span>` : '';
}
