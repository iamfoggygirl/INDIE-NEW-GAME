/* ===================== UI: one icon family, glossy toy style (art ref: icon sheet) ===================== */
/* shared gradients live once in the page (never inside a hidden element, which breaks them in Chrome) */
const DEFS = `<defs>
${[['gG', '#a4ee70', '#54c23a', '#329a25'], ['gB', '#74cfff', '#3394ee', '#1d66c6'], ['gR', '#ff8b7b', '#ef4c3c', '#c43126'], ['gY', '#fff284', '#ffc928', '#f29200'], ['gS', '#d6dce6', '#9aa4b4', '#6f7989'], ['gT', '#94f4e6', '#33c8c0', '#1a969c'], ['gN', '#dca064', '#a9692f', '#7a471d'], ['gO', '#ffc878', '#f99a34', '#e2711a'], ['gP', '#cdb4ff', '#9a74ee', '#6b46c8'], ['gK', '#ffd3e0', '#ff9fbd', '#ef7097'], ['gC', '#fffdf5', '#f7ecd0', '#e9d6a8'], ['gW', '#ffffff', '#eef3f8', '#cfdae6'], ['gD', '#4a6aa0', '#2a4677', '#1a2f54'], ['gF', '#b5e488', '#86c75a', '#5f9e3c'],
  ['skc', '#5d9a55', '#3e6b3a', '#2c5229'], ['sks', '#ffd27a', '#f58a45', '#e0532e'], ['skco', '#56d0c6', '#2a9e98', '#1d7c76'], ['ski', '#e4f8ff', '#9ad8f2', '#5fb2dc'], ['skp', '#fff6de', '#efe2c0', '#d8c79c'], ['skg', '#5b4fc4', '#2e2a7a', '#1a1850'], ['skgl', '#1d6a60', '#0e3f3a', '#082826'], ['skgo', '#ffe680', '#e8b030', '#b98012']]
  .map(([id, a, b, c]) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient>`).join('')}
<radialGradient id="gGlow"><stop offset="0" stop-color="#7dffe0" stop-opacity=".9"/><stop offset="1" stop-color="#7dffe0" stop-opacity="0"/></radialGradient>
<radialGradient id="gSun"><stop offset="0" stop-color="#fff3b0"/><stop offset=".6" stop-color="#ffc928"/><stop offset="1" stop-color="#f29200"/></radialGradient>
</defs>`;
document.body.insertAdjacentHTML('afterbegin', `<svg width="0" height="0" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">${DEFS}</svg>`);
const O = '#16243b';
const ic = (body, vb = 32) => `<svg viewBox="0 0 ${vb} ${vb}">${body}</svg>`;
const st = (w = 2.2) => `stroke="${O}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const hl = (x, y, rx, ry, r = -30, o = .62) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#fff" opacity="${o}" transform="rotate(${r} ${x} ${y})"/>`;
const dot = (x, y, r = 1.1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity=".9"/>`;
const HEART = 'M16 27.5C8 21.6 3.5 17.4 3.5 11.6 3.5 7.6 6.6 4.6 10.4 4.6c2.4 0 4.4 1.2 5.6 3.1 1.2-1.9 3.2-3.1 5.6-3.1 3.8 0 6.9 3 6.9 7 0 5.8-4.5 10-12.5 15.9z';
const STAR = 'M16 2.8l4 8.3 9.1 1.2-6.6 6.3 1.7 9-8.2-4.4-8.2 4.4 1.7-9-6.6-6.3 9.1-1.2z';
const CLOUD = 'M8.5 21a5.5 5.5 0 0 1-.6-11 7.5 7.5 0 0 1 14.4-1.4A5.6 5.6 0 0 1 24 21z';

/* the hatchling, top-down and looking at you (art ref: crew sheet). skin decides the shell */
const SKIN_ART = {
  classic: ['skc', '#7fb070'], sunset: ['sks', '#ffe0a0'], coral: ['skco', '#a6ece2'], ice: ['ski', '#ffffff'], patch: ['skp', '#c9b388'], galaxy: ['skg', '#8f86e8'], glow: ['skgl', '#5dffd8'], gold: ['skgo', '#fff3b8']
};
function TURT(skin = 'classic', o = {}) {
  const [g, line] = SKIN_ART[skin] || SKIN_ART.classic, F = 'url(#gF)';
  const hex = '<path d="M20 12.3l4.2 2.5v4.9L20 22.2l-4.2-2.5v-4.9z" fill="none"/>', rays = '<path d="M20 12.3V6.6M24.2 14.8l6-2.6M24.2 19.7l6 2.7M20 22.2v5.4M15.8 19.7l-6 2.7M15.8 14.8l-6-2.6" fill="none"/>';
  let extra = '';
  if (skin === 'galaxy') extra = [[14, 11, .9], [25, 10, .7], [27, 18, 1], [12, 19, .8], [21, 24, .7], [18, 15, .5]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff6c8"/>`).join('') + '<path d="M23 21.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z" fill="#ffe680"/>';
  if (skin === 'coral') extra = '<path d="M12 21c1-2 0-4 1.5-5.5M13 18l-2-1.5M27 21c-.8-2 .4-3.6-.8-5.4M26.6 18l2-1.2" stroke="#ff7a5c" stroke-width="1.5" fill="none" stroke-linecap="round"/>' + [[17, 10], [24, 12], [20, 25], [14, 14]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.4" fill="#fff4d6"/><circle cx="${x}" cy="${y}" r=".6" fill="#ffb03a"/>`).join('');
  if (skin === 'patch') extra = '<path d="M20 12.3l4.2 2.5v4.9L20 22.2l-4.2-2.5v-4.9z" fill="#2fa8a0"/><path d="M20 6.4v5.9l-4.2 2.5-5.6-2.4A11.6 10.6 0 0 1 20 6.4z" fill="#e8664a"/><path d="M20 6.4v5.9l4.2 2.5 5.6-2.4A11.6 10.6 0 0 0 20 6.4z" fill="#ffd23f"/><path d="M15.8 19.7l-5.9 2.6a11.6 10.6 0 0 0 10.1 5.3v-5.4z" fill="#7DB05A"/><path d="M24.2 19.7l5.9 2.6a11.6 10.6 0 0 1-10.1 5.3v-5.4z" fill="#9b7be0"/>';
  if (skin === 'ice') extra = '<path d="M13 13l3 2M27 13l-3 2M14 22l2-2M26 22l-2-2" stroke="#fff" stroke-width="1.2" opacity=".8"/>';
  const glow = skin === 'glow' ? '<ellipse cx="20" cy="17" rx="17" ry="16" fill="url(#gGlow)" opacity=".75"/>' : '';
  const gold = skin === 'gold' && o.shine ? '<path d="M33 6l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" fill="#fff6c8"/>' : '';
  return `<svg viewBox="0 0 40 40">${glow}
  <g ${st(1.8)}><ellipse cx="11.5" cy="9.5" rx="4.6" ry="3" fill="${F}" transform="rotate(-38 11.5 9.5)"/><ellipse cx="28.5" cy="9.5" rx="4.6" ry="3" fill="${F}" transform="rotate(38 28.5 9.5)"/>
  <ellipse cx="7.2" cy="23.5" rx="6.4" ry="3.6" fill="${F}" transform="rotate(-24 7.2 23.5)"/><ellipse cx="32.8" cy="23.5" rx="6.4" ry="3.6" fill="${F}" transform="rotate(24 32.8 23.5)"/>
  <path d="M18.6 6.4L20 3l1.4 3.4z" fill="${F}"/></g>
  <g fill="#fff4d6"><circle cx="5" cy="22.6" r=".9"/><circle cx="7.4" cy="24.6" r=".75"/><circle cx="35" cy="22.6" r=".9"/><circle cx="32.6" cy="24.6" r=".75"/></g>
  <ellipse cx="20" cy="17" rx="12.6" ry="11.6" fill="#ecdcb0" ${st(2)}/>
  <ellipse cx="20" cy="16.6" rx="11.6" ry="10.6" fill="url(#${g})"/>${extra}
  <g stroke="${line}" stroke-width="1.3" opacity="${skin === 'glow' ? 1 : .55}">${hex}${rays}</g>
  ${hl(15, 10.5, 4.2, 2, -28, .45)}${dot(13, 9.4, .8)}
  <circle cx="20" cy="30" r="6.8" fill="${F}" ${st(2)}/>
  <ellipse cx="17.1" cy="29.6" rx="1.9" ry="2.3" fill="#14161c"/><ellipse cx="22.9" cy="29.6" rx="1.9" ry="2.3" fill="#14161c"/><circle cx="17.7" cy="28.8" r=".75" fill="#fff"/><circle cx="23.5" cy="28.8" r=".75" fill="#fff"/>
  <path d="M18.4 32.6q1.6 1.2 3.2 0" stroke="#2a3b22" stroke-width="1.1" fill="none" stroke-linecap="round"/>${hl(17.5, 26.6, 2.2, 1, -20, .4)}${gold}${o.badge || ''}</svg>`;
}
const ICON = {
  turtle: (skin, b, badge) => TURT(typeof skin === 'string' && SKIN_ART[skin] ? skin : 'classic', { badge }),
  ok: '<circle cx="33" cy="9" r="6.5" fill="url(#gG)" stroke="#16243b" stroke-width="1.8"/><path d="M30 9l2.2 2.2 4-4.2" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
  moon: ic(`<path d="M20 4a12 12 0 1 0 8.5 19.5A10.5 10.5 0 0 1 20 4z" fill="url(#gY)" ${st()}/><circle cx="12" cy="17" r="1.6" fill="#e9a400" opacity=".5"/><circle cx="16" cy="23" r="1.1" fill="#e9a400" opacity=".5"/>${hl(11, 11, 3, 1.6, -50)}`),
  sun: ic(`<g fill="url(#gY)" ${st(1.8)}>${Array.from({ length: 8 }, (_, i) => `<path d="M16 1.8l2.4 4.4h-4.8z" transform="rotate(${i * 45} 16 16)"/>`).join('')}</g><circle cx="16" cy="16" r="8.2" fill="url(#gSun)" ${st()}/>${hl(13, 12.5, 3, 1.6)}`),
  bin: ic(`<path d="M7 11h18l-1.8 16.2a2 2 0 0 1-2 1.8H10.8a2 2 0 0 1-2-1.8z" fill="url(#gB)" ${st()}/><rect x="5" y="6.5" width="22" height="5" rx="2.2" fill="url(#gB)" ${st()}/><rect x="12.5" y="3.5" width="7" height="3.6" rx="1.4" fill="url(#gB)" ${st(1.8)}/><g fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14 17.5l2-2.6 2 2.6"/><path d="M19.6 20.6l.7 2.6-2.9.3"/><path d="M12.6 23.4l-1.3-2.3 2.6-1.2"/></g>${hl(10, 8.4, 3, 1, 0, .5)}`),
  star: ic(`<path d="${STAR}" fill="url(#gY)" ${st(2.3)}/>${hl(12.5, 11.5, 3.2, 1.5, -40)}${dot(10.5, 13.2, .9)}`),
  starOff: ic(`<path d="${STAR}" fill="#2a3f66" ${st(2.3)}/><path d="M16 8.5l2.3 4.7 5.2.7-3.8 3.6 1 5.1L16 20.1l-4.7 2.5 1-5.1-3.8-3.6 5.2-.7z" fill="#22355a"/>`),
  play: ic(`<path d="M10 6.6v18.8c0 1.3 1.4 2 2.4 1.3l14.3-9.4c.9-.6.9-2 0-2.6L12.4 5.3C11.4 4.6 10 5.3 10 6.6z" fill="#fff" ${st(2.6)}/>`),
  ad: ic(`<rect x="3" y="7" width="26" height="18" rx="5" fill="url(#gB)" ${st()}/><path d="M13.2 11.6v8.8l7.6-4.4z" fill="#fff" ${st(1.6)}/>${hl(8, 10, 3, 1.2, 0, .5)}`),
  retry: ic(`<path d="M25 16.5a9 9 0 1 1-2.7-6.4" fill="none" stroke="${O}" stroke-width="7.4" stroke-linecap="round"/><path d="M25 16.5a9 9 0 1 1-2.7-6.4" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/><path d="M18.6 5.2l7.4 2.6-3.6 6.6z" fill="#fff" ${st(2)}/>`),
  sndOn: ic(`<path d="M4.5 12.5h5l7-6v19.5l-7-6h-5z" fill="url(#gT)" ${st()}/><path d="M21 11.5a6 6 0 0 1 0 9.5M24.5 8a11 11 0 0 1 0 16.5" fill="none" stroke="${O}" stroke-width="5" stroke-linecap="round"/><path d="M21 11.5a6 6 0 0 1 0 9.5M24.5 8a11 11 0 0 1 0 16.5" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>`),
  sndOff: ic(`<path d="M4.5 12.5h5l7-6v19.5l-7-6h-5z" fill="url(#gS)" ${st()}/><path d="M21 12l7 8m0-8l-7 8" stroke="${O}" stroke-width="5" stroke-linecap="round"/><path d="M21 12l7 8m0-8l-7 8" stroke="#ff8b7b" stroke-width="2.2" stroke-linecap="round"/>`),
  map: ic(`<path d="M3.5 8.5l7.5-3 10 3 7.5-3v18.5l-7.5 3-10-3-7.5 3z" fill="url(#gC)" ${st()}/><path d="M11 5.5v18.5M21 8.5V27" stroke="${O}" stroke-width="1.6" opacity=".45"/><path d="M7 20c3-1 3-6 7-6s4 4 8 2" fill="none" stroke="#ef4c3c" stroke-width="2" stroke-dasharray="2 2.4" stroke-linecap="round"/><path d="M22 10.5l3 3m0-3l-3 3" stroke="#ef4c3c" stroke-width="2.2" stroke-linecap="round"/>`),
  pause: ic(`<rect x="7" y="5.5" width="7" height="21" rx="3" fill="url(#gB)" ${st()}/><rect x="18" y="5.5" width="7" height="21" rx="3" fill="url(#gB)" ${st()}/>${hl(9.6, 9, 1, 2.2, 0, .6)}${hl(20.6, 9, 1, 2.2, 0, .6)}`),
  gear: ic(`<path d="M13.5 3h5l.8 3.6 2.6 1.1 3.1-2 3.5 3.5-2 3.1 1.1 2.6 3.6.8v5l-3.6.8-1.1 2.6 2 3.1-3.5 3.5-3.1-2-2.6 1.1-.8 3.6h-5l-.8-3.6-2.6-1.1-3.1 2-3.5-3.5 2-3.1-1.1-2.6L2 18.5v-5l3.6-.8 1.1-2.6-2-3.1 3.5-3.5 3.1 2 2.6-1.1z" fill="url(#gS)" ${st(2)}/><circle cx="16" cy="16" r="4.6" fill="#2a3f66" ${st(2)}/>${hl(11, 8.5, 3, 1.3)}`),
  pin: ic(`<path d="M16 29.5s9-8.8 9-15.7a9 9 0 0 0-18 0c0 6.9 9 15.7 9 15.7z" fill="url(#gR)" ${st()}/><circle cx="16" cy="13.6" r="3.4" fill="#fff" ${st(1.8)}/>${hl(11.6, 8.6, 2.4, 1.2, -45)}`),
  shop: ic(`<path d="M11 11V8.5a5 5 0 0 1 10 0V11" fill="none" stroke="${O}" stroke-width="5.4" stroke-linecap="round"/><path d="M11 11V8.5a5 5 0 0 1 10 0V11" fill="none" stroke="#ffd23f" stroke-width="2.4" stroke-linecap="round"/><path d="M5.5 10.5h21l-1.6 16a2.2 2.2 0 0 1-2.2 2h-13.4a2.2 2.2 0 0 1-2.2-2z" fill="url(#gR)" ${st()}/>${hl(10, 15, 1.6, 4, 0, .5)}`),
  heart: ic(`<path d="${HEART}" fill="url(#gR)" ${st(2.2)}/>${hl(9.6, 10, 2.8, 1.6, -40)}${dot(8, 12.5, .8)}`),
  heartX: ic(`<path d="M16 27.5C8 21.6 3.5 17.4 3.5 11.6 3.5 7.6 6.6 4.6 10.4 4.6c2.4 0 4.4 1.2 5.6 3.1l-2.2 5.2 3.2 3.4-2.4 5.4z" fill="#5d6f93" ${st(2)} transform="translate(-1.4 .6) rotate(-6 16 16)"/><path d="M16 27.5c8-5.9 12.5-10.1 12.5-15.9 0-4-3.1-7-6.9-7-2.4 0-4.4 1.2-5.6 3.1l-2.2 5.2 3.2 3.4-2.4 5.4z" fill="#5d6f93" ${st(2)} transform="translate(1.4 .6) rotate(6 16 16)"/>`),
  vib: ic(`<rect x="10" y="3.5" width="12" height="25" rx="3.5" fill="url(#gT)" ${st()}/><rect x="12.6" y="7" width="6.8" height="14" rx="1.5" fill="#1a4f66" opacity=".55"/><path d="M5.5 11v10M26.5 11v10M2.5 13.5v5M29.5 13.5v5" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>`),
  crown: ic(`<path d="M3.5 25.5L5.5 8l8 8 2.5-11 2.5 11 8-8 2 17.5z" fill="url(#gY)" ${st(2.2)}/><circle cx="16" cy="20" r="2.6" fill="url(#gR)" ${st(1.4)}/>${hl(9, 15, 1.5, 3, 20, .55)}`),
  crew: TURT('classic'),
  heartS: ic(`<path d="${HEART}" fill="url(#gR)" ${st(2.2)}/>`),
  leafB: ic(`<path d="M5 27C5 13 13.5 5 27.5 5c0 13.5-7.5 22-21.5 22" fill="#fff4d6"/><path d="M7 25.5C12 19 17 14 23 9.5" stroke="#3f8a2c" stroke-width="2.2" fill="none" stroke-linecap="round"/>`),
  leaf: ic(`<path d="M5 27C5 13 13.5 5 27.5 5c0 13.5-7.5 22-21.5 22" fill="url(#gG)" ${st(2)}/><path d="M7 25.5C12 19 17 14 23 9.5" stroke="#2c6a1d" stroke-width="1.8" fill="none" stroke-linecap="round"/>`),
  chest: ic(`<path d="M4 15h24v10.5a2.5 2.5 0 0 1-2.5 2.5h-19A2.5 2.5 0 0 1 4 25.5z" fill="url(#gN)" ${st()}/><path d="M4 15c0-5.5 4.5-9 12-9s12 3.5 12 9z" fill="url(#gN)" ${st()}/><path d="M9 6.8V28M23 6.8V28" stroke="url(#gY)" stroke-width="3.2"/><path d="M9 6.8V28M23 6.8V28" stroke="${O}" stroke-width="1" opacity=".35"/><path d="M4 15h24" stroke="${O}" stroke-width="2.2"/><rect x="12.8" y="12.5" width="6.4" height="7.5" rx="1.6" fill="url(#gY)" ${st(1.8)}/><circle cx="16" cy="16.2" r="1" fill="${O}"/>${hl(9, 9.5, 3, 1.1, -12, .5)}`),
  chestOpen: ic(`<circle cx="16" cy="12" r="11" fill="#ffe680" opacity=".55"/><path d="M5 9.5L7 3.5h18l2 6z" fill="url(#gN)" ${st()}/><g ${st(1.6)}><circle cx="11" cy="13" r="3.2" fill="url(#gY)"/><circle cx="16.5" cy="11.5" r="3.4" fill="url(#gY)"/><circle cx="21.5" cy="13.4" r="3.1" fill="url(#gY)"/><circle cx="14" cy="15.5" r="2.9" fill="url(#gY)"/><circle cx="19" cy="16" r="3" fill="url(#gY)"/></g><path d="M4 15.5h24v10a2.5 2.5 0 0 1-2.5 2.5h-19A2.5 2.5 0 0 1 4 25.5z" fill="url(#gN)" ${st()}/><path d="M9 15.5V28M23 15.5V28" stroke="url(#gY)" stroke-width="3.2"/><rect x="12.8" y="15" width="6.4" height="6.5" rx="1.6" fill="url(#gY)" ${st(1.8)}/>`),
  lock: ic(`<path d="M10 14.5v-3.5a6 6 0 0 1 12 0v3.5" fill="none" stroke="${O}" stroke-width="5.6"/><path d="M10 14.5v-3.5a6 6 0 0 1 12 0v3.5" fill="none" stroke="url(#gS)" stroke-width="2.6"/><rect x="6" y="14" width="20" height="15" rx="4" fill="url(#gY)" ${st()}/><path d="M16 19v4" stroke="${O}" stroke-width="3" stroke-linecap="round"/>${hl(10, 17.5, 2.2, 1.1, 0, .55)}`),
  crab: ic(`<g ${st(1.8)} fill="none"><path d="M7 19l-4 2.5M7 22.5l-3.5 3.5M25 19l4 2.5M25 22.5l3.5 3.5"/></g><path d="M9.5 13.5c-3-.5-5-3-4.5-6.5 1.5 1.5 3.5 1.8 5 1.5" fill="url(#gR)" ${st(1.8)}/><path d="M22.5 13.5c3-.5 5-3 4.5-6.5-1.5 1.5-3.5 1.8-5 1.5" fill="url(#gR)" ${st(1.8)}/><ellipse cx="16" cy="19.5" rx="10" ry="7" fill="url(#gR)" ${st()}/><g ${st(1.5)}><path d="M12.5 12v-3M19.5 12v-3"/></g><circle cx="12.5" cy="8.6" r="2.4" fill="#fff" ${st(1.5)}/><circle cx="19.5" cy="8.6" r="2.4" fill="#fff" ${st(1.5)}/><circle cx="12.9" cy="8.8" r="1" fill="${O}"/><circle cx="19.1" cy="8.8" r="1" fill="${O}"/><path d="M14 21q2 1.4 4 0" stroke="${O}" stroke-width="1.3" fill="none" stroke-linecap="round"/>${hl(11.5, 16, 2.6, 1.2, -15, .5)}`),
  gull: ic(`<path d="M3 13.5c4.5-1.5 8-.5 10.5 3" fill="url(#gS)" ${st(1.8)}/><path d="M6 18c0-4.5 4.5-7.5 10-7.5 4 0 6.5 1.6 8 3.5h3.2c.8 0 1 .9.4 1.3L24.5 17c-.6 4.5-4.5 7.5-10 7.5-4.7 0-8.5-2.6-8.5-6.5z" fill="url(#gW)" ${st()}/><path d="M13 14.5c3-3.5 8-4.5 11.5-3.5l-4 5z" fill="url(#gS)" ${st(1.8)}/><path d="M24.4 14.3h4.4l-3 2.5z" fill="url(#gY)" ${st(1.4)}/><circle cx="21.4" cy="13.4" r="1" fill="${O}"/><path d="M13 24.5v4M16.5 24.3v4" stroke="url(#gO)" stroke-width="2.2" stroke-linecap="round"/>`),
  ball: ic(`<circle cx="16" cy="16" r="12.5" fill="#fff" ${st()}/><path d="M16 3.5c-4 3-6 7.5-6 12.5s2 9.5 6 12.5" fill="url(#gR)"/><path d="M16 3.5c4 3 6 7.5 6 12.5s-2 9.5-6 12.5" fill="url(#gB)"/><path d="M16 3.5a12.5 12.5 0 0 1 12.5 12.5c-2.4 0-4.6-.7-6.5-1.7" fill="url(#gY)"/><circle cx="16" cy="16" r="12.5" fill="none" ${st()}/><circle cx="15" cy="9" r="2.4" fill="#fff" ${st(1.4)}/>${hl(9.5, 10, 2.6, 1.3, -40, .6)}`),
  bottle: ic(`<path d="M12.5 10.5c0-2 1-3 2-3.5V4h3v3c1 .5 2 1.5 2 3.5v15.5a2.5 2.5 0 0 1-2.5 2.5h-2a2.5 2.5 0 0 1-2.5-2.5z" fill="url(#gB)" ${st()} transform="rotate(14 16 16)"/><rect x="13.4" y="15" width="7.2" height="6" rx="1" fill="#fff4d6" ${st(1.4)} transform="rotate(14 16 16)"/><rect x="14.3" y="2.2" width="4" height="3" rx="1" fill="url(#gB)" ${st(1.6)} transform="rotate(14 16 16)"/>${hl(14.5, 11.5, .9, 2.4, 14, .6)}`),
  rain: ic(`<path d="${CLOUD}" fill="url(#gS)" ${st()}/>${hl(12, 11.5, 3, 1.2, -18, .5)}<g ${st(1.6)}><path d="M10 24.5c0 1.4-1 2.6-1 2.6s-1-1.2-1-2.6a1 1 0 0 1 2 0z" fill="url(#gB)"/><path d="M17 25.2c0 1.4-1 2.6-1 2.6s-1-1.2-1-2.6a1 1 0 0 1 2 0z" fill="url(#gB)"/><path d="M24 24.5c0 1.4-1 2.6-1 2.6s-1-1.2-1-2.6a1 1 0 0 1 2 0z" fill="url(#gB)"/></g>`),
  fog: ic(`<path d="M9 15.5a5 5 0 0 1-.5-9.8 7 7 0 0 1 13.4-1.2 5 5 0 0 1 1.6 11z" fill="url(#gS)" ${st()}/><g stroke="${O}" stroke-width="5" stroke-linecap="round"><path d="M5 20h22M8 25h16"/></g><g stroke="#cfd6e0" stroke-width="2.4" stroke-linecap="round"><path d="M5 20h22M8 25h16"/></g>`),
  wind: ic(`<g fill="none" stroke="${O}" stroke-width="5.4" stroke-linecap="round"><path d="M3.5 11.5h14a3.5 3.5 0 1 0-3.5-3.5M3.5 17h20a4 4 0 1 1-4 4M3.5 23h8"/></g><g fill="none" stroke="#5cc0ff" stroke-width="2.6" stroke-linecap="round"><path d="M3.5 11.5h14a3.5 3.5 0 1 0-3.5-3.5M3.5 17h20a4 4 0 1 1-4 4M3.5 23h8"/></g>`),
  bolt: ic(`<path d="M18.5 2.5L7 18h7.5l-2.5 11.5L25 13h-7.5z" fill="url(#gY)" ${st()}/>${hl(14, 9, 1.3, 3, 35, .6)}`),
  castle: ic(`<path d="M4 28V15h4v3h3v-3h3v-4h4v4h3v3h3v-3h4v13z" fill="url(#gO)" ${st()}/><rect x="13" y="21" width="6" height="7" rx="3" fill="#a9692f" ${st(1.6)}/><path d="M16 11V4l5 2-5 2" fill="url(#gR)" ${st(1.6)}/>`),
  chair: ic(`<path d="M8 27l6-16M22 27l-8-16M9 21h14" stroke="${O}" stroke-width="4.2" stroke-linecap="round"/><path d="M8 27l6-16M22 27l-8-16M9 21h14" stroke="#dfe4ea" stroke-width="1.8" stroke-linecap="round"/><path d="M11 6.5l12-1.5 2 12-11 2z" fill="#fff" ${st()}/><path d="M14.5 6l2 11.8M19 5.5l2 11.6" stroke="#3394ee" stroke-width="3"/><path d="M11 6.5l12-1.5 2 12-11 2z" fill="none" ${st()}/>`),
  lamp: ic(`<circle cx="21" cy="10.5" r="8" fill="#ffe680" opacity=".45"/><path d="M11 29V9a4 4 0 0 1 4-4h5" fill="none" stroke="${O}" stroke-width="4.6" stroke-linecap="round"/><path d="M11 29V9a4 4 0 0 1 4-4h5" fill="none" stroke="url(#gS)" stroke-width="2" stroke-linecap="round"/><path d="M16.5 7.5h9l-1.5 3.5h-6z" fill="url(#gD)" ${st(1.8)}/><circle cx="21" cy="12.6" r="2" fill="#fff6c8" ${st(1.4)}/><rect x="7" y="27" width="8" height="3" rx="1.4" fill="url(#gD)" ${st(1.6)}/>`),
  wave: ic(`<path d="M3 26c3-11 9-19 18-19 4.5 0 8 2.5 8 6.5 0 3-2.5 4.5-4.5 4.5-2.5 0-3.5-2-2.5-4-3 0-5.5 3.5-5.5 7 0 2.5 1.5 4 3.5 5z" fill="url(#gB)" ${st()}/><path d="M21 7c3 0 6.5 1.5 6.5 5" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M3 27.5h26" stroke="${O}" stroke-width="2.2" stroke-linecap="round"/>`),
  net: ic(`<path d="M6 7h20l-2 19H8z" fill="#bff2ea" ${st()}/><g stroke="#1f6f6a" stroke-width="1.4"><path d="M8.7 12h14.6M9.3 17.5h13.4M9.9 22.5h12.2M11.5 7l1 19M16 7v19M20.5 7l-1 19"/></g><path d="M6 7h20l-2 19H8z" fill="none" ${st()}/><circle cx="6.5" cy="7" r="2.6" fill="url(#gO)" ${st(1.6)}/><circle cx="25.5" cy="7" r="2.6" fill="url(#gO)" ${st(1.6)}/>`),
  dog: ic(`<path d="M6.5 8C3 9.5 3 17 5.5 19.5L10 16z" fill="url(#gN)" ${st(1.8)}/><path d="M25.5 8c3.5 1.5 3.5 9 1 11.5L22 16z" fill="url(#gN)" ${st(1.8)}/><path d="M16 5.5c6 0 9.5 4.5 9.5 10.5 0 6.5-4.5 10.5-9.5 10.5S6.5 22.5 6.5 16C6.5 10 10 5.5 16 5.5z" fill="url(#gO)" ${st()}/><path d="M16 15.5c3.5 0 6 2.5 6 5.5S19.4 26.5 16 26.5 10 24 10 21s2.5-5.5 6-5.5z" fill="#fff4e4"/><ellipse cx="16" cy="18.4" rx="2.4" ry="1.7" fill="${O}"/><path d="M16 20v1.4M13.6 22.2q2.4 1.6 4.8 0" stroke="${O}" stroke-width="1.4" fill="none" stroke-linecap="round"/><path d="M15 23.2h2v2.2a1 1 0 0 1-2 0z" fill="#ff8fb1" ${st(1.1)}/><circle cx="12" cy="13.5" r="1.5" fill="${O}"/><circle cx="20" cy="13.5" r="1.5" fill="${O}"/><circle cx="12.4" cy="13" r=".5" fill="#fff"/><circle cx="20.4" cy="13" r=".5" fill="#fff"/>`),
  rut: ic(`<circle cx="16" cy="16" r="12.5" fill="#3a3f4a" ${st()}/><circle cx="16" cy="16" r="6.5" fill="url(#gS)" ${st(1.8)}/><g stroke="#20242c" stroke-width="2.2">${Array.from({ length: 10 }, (_, i) => `<path d="M16 4.4v3.4" transform="rotate(${i * 36} 16 16)"/>`).join('')}</g><circle cx="16" cy="16" r="2" fill="${O}"/>${hl(13, 13, 1.8, .9)}`),
  clean: ic(`<path d="M21.5 3.5l-6.5 12" stroke="${O}" stroke-width="5.2" stroke-linecap="round"/><path d="M21.5 3.5l-6.5 12" stroke="url(#gN)" stroke-width="2.6" stroke-linecap="round"/><path d="M12.5 14.5l6.5 3.5-1 2.5-7-3.6z" fill="url(#gT)" ${st(1.6)}/><path d="M10.6 17l7.5 3.8c-1 4-3.5 7-8 8.2-2.5-.3-5-1.5-6.6-3.2 3-1.2 5.4-4.5 7.1-8.8z" fill="url(#gY)" ${st()}/><path d="M7 26l3.4-5M10.4 27.6l3-5.4M14 28l2-5" stroke="#b97a10" stroke-width="1.2" stroke-linecap="round"/>`),
  surge: ic(`<path d="M20 4a12 12 0 1 0 8.5 19.5A10.5 10.5 0 0 1 20 4z" fill="url(#gY)" ${st()}/>${hl(11, 11, 3, 1.6, -50)}<g stroke="#fff" stroke-width="2.4" stroke-linecap="round"><path d="M2.5 13h5M1.5 18h5M3 23h4"/></g>`),
  sunRush: ic(`<g fill="url(#gY)" ${st(1.8)}>${Array.from({ length: 8 }, (_, i) => `<path d="M18 2l2.2 4h-4.4z" transform="rotate(${i * 45} 18 14)"/>`).join('')}</g><circle cx="18" cy="14" r="7.4" fill="url(#gSun)" ${st()}/><g stroke="${O}" stroke-width="4.6" stroke-linecap="round"><path d="M2.5 22h8M4 27h9"/></g><g stroke="#fff" stroke-width="2.2" stroke-linecap="round"><path d="M2.5 22h8M4 27h9"/></g>`),
  ranger: ic(`<path d="M3 21c0-2 4-3.4 13-3.4s13 1.4 13 3.4-4.5 3.6-13 3.6S3 23 3 21z" fill="url(#gO)" ${st()}/><path d="M9.5 18.5c0-6 2.6-11 6.5-11s6.5 5 6.5 11c-2 .9-4.2 1.3-6.5 1.3s-4.5-.4-6.5-1.3z" fill="url(#gO)" ${st()}/><path d="M9.8 16c2 .9 4 1.3 6.2 1.3s4.2-.4 6.2-1.3l.3 2.6c-2 .9-4.2 1.3-6.5 1.3s-4.5-.4-6.5-1.3z" fill="url(#gG)" ${st(1.6)}/><path d="M16 7.5l-1 5" stroke="#b9661a" stroke-width="1.4"/>${hl(12.5, 11.5, 1.2, 2.6, 20, .5)}`),
  flipG: ic(`<path d="M27 12.5A12 12 0 0 0 6.5 9" fill="none" stroke="${O}" stroke-width="5.4" stroke-linecap="round"/><path d="M27 12.5A12 12 0 0 0 6.5 9" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><path d="M3.5 4.5l3.5 6.8 6-3.4z" fill="#fff" ${st(1.8)}/><ellipse cx="16" cy="20" rx="9" ry="7.5" fill="url(#skc)" ${st()}/><path d="M16 16.5l3 1.8v3.4l-3 1.8-3-1.8v-3.4z" fill="none" stroke="#7fb070" stroke-width="1.3"/><circle cx="16" cy="29" r="0" />${hl(12, 16.5, 2.4, 1.1)}`),
  shell: ic(`<path d="M16 28.5c-1.6 0-3-.6-4-1.6L5 19.5C3.4 17.8 3 15 4.2 12.6 6.6 7.4 11 4.5 16 4.5s9.4 2.9 11.8 8.1c1.2 2.4.8 5.2-.8 6.9l-7 7.4c-1 1-2.4 1.6-4 1.6z" fill="url(#gK)" ${st()}/><g stroke="#e0628a" stroke-width="1.4" stroke-linecap="round" fill="none"><path d="M16 27V7M16 27L9 9.4M16 27l7-17.6M16 27L5.5 15M16 27l10.5-12"/></g><rect x="12" y="25.6" width="8" height="4" rx="1.6" fill="url(#gK)" ${st(1.6)}/>${hl(11, 9.5, 2.6, 1.2, -30)}`),
  guide: ic(`<path d="M5 6.5c3.5-1 7.5-1 11 1.5v19.5c-3.5-2.5-7.5-2.5-11-1.5z" fill="url(#gG)" ${st()}/><path d="M27 6.5c-3.5-1-7.5-1-11 1.5v19.5c3.5-2.5 7.5-2.5 11-1.5z" fill="url(#gG)" ${st()}/><path d="M8 11c2-.4 4-.2 5.5.5M8 15c2-.4 4-.2 5.5.5M8 19c2-.4 4-.2 5.5.5" stroke="#fff4d6" stroke-width="1.5" stroke-linecap="round" opacity=".85"/><ellipse cx="21.5" cy="15.5" rx="3.4" ry="3" fill="#fff4d6" ${st(1.4)}/><circle cx="21.5" cy="11.5" r="1.4" fill="#fff4d6" ${st(1.2)}/>`),
  daily: ic(`<rect x="4" y="6.5" width="24" height="21.5" rx="4" fill="url(#gW)" ${st()}/><path d="M4 12.5V10.5a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v2z" fill="url(#gR)" ${st()}/><path d="M10 4v5M22 4v5" stroke="${O}" stroke-width="2.6" stroke-linecap="round"/><g fill="url(#gY)" ${st(1.4)}><circle cx="16" cy="20" r="4.4"/></g><g stroke="#f29200" stroke-width="1.6" stroke-linecap="round"><path d="M16 13.4v1.4M16 25.2v1.4M9.4 20h1.4M21.2 20h1.4M11.3 15.3l1 1M19.7 23.7l1 1M11.3 24.7l1-1M19.7 16.3l1-1"/></g>`),
  flame: ic(`<path d="M16 2.5c1.4 5 8.5 7.8 8.5 15.5a8.5 8.5 0 0 1-17 0c0-4 2.6-5.6 4-8.4 1.4 2.4 2.6 2.6 2.6 2.6 1.6-2.6 1.9-6.4 1.9-9.7z" fill="url(#gO)" ${st()}/><path d="M16 14.5c2.6 2.6 4 4 4 6.6a4 4 0 0 1-8 0c0-2.6 2.4-4 4-6.6z" fill="url(#gY)"/>`),
  gift: ic(`<rect x="4.5" y="13" width="23" height="15" rx="2.5" fill="url(#gR)" ${st()}/><rect x="3" y="9" width="26" height="6" rx="2.2" fill="url(#gR)" ${st()}/><path d="M16 9v19" stroke="url(#gY)" stroke-width="4"/><path d="M16 9c-4-6-10-3-7 0zM16 9c4-6 10-3 7 0z" fill="url(#gY)" ${st(1.6)}/>${hl(8.5, 11, 2.2, .9, 0, .55)}`),
  check: ic(`<circle cx="16" cy="16" r="12" fill="url(#gG)" ${st()}/><path d="M10.5 16.5l3.6 3.6 7.4-7.6" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>${hl(11, 9.6, 3, 1.3)}`),
  target: ic(`<circle cx="16" cy="16" r="12" fill="url(#gW)" ${st()}/><circle cx="16" cy="16" r="7.6" fill="url(#gR)" ${st(1.6)}/><circle cx="16" cy="16" r="3.2" fill="#fff" ${st(1.4)}/>`),
  golden: TURT('gold', { shine: 1 }),
  save: ic(`<rect x="4" y="4" width="24" height="24" rx="5" fill="url(#gB)" ${st()}/><rect x="9" y="4" width="14" height="8.5" rx="1.5" fill="url(#gW)" ${st(1.6)}/><rect x="8.5" y="17" width="15" height="8.5" rx="2" fill="url(#gW)" ${st(1.6)}/><path d="M18.5 6.4v4" stroke="${O}" stroke-width="2.2" stroke-linecap="round"/>`)
};
ICON.leafB = ICON.leafB; ICON.flip = ICON.flipG;
/* standalone copies (gradients inline) for drawing icons on the 2D canvas */
const svgImg = (svg) => { const i = new Image(); i.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.replace('<svg ', `<svg xmlns="http://www.w3.org/2000/svg" `).replace(/(<svg[^>]*>)/, `$1${DEFS}`)); return i; };
const PICK_IMG = { clean: svgImg(ICON.clean), guard: svgImg(ICON.ranger), flip: svgImg(ICON.flipG), moon: svgImg(ICON.surge), sun: svgImg(ICON.sunRush), shell: svgImg(ICON.shell) };

const ui = {};
const k = () => W / 390;

/* ---------- HUD ---------- */
ui.hud = function (bumpWhich) {
  $('#nightP').innerHTML = isDaily(night) ? `${ICON.daily}<span>DAILY</span>` : `${sunny() ? ICON.sun : ICON.moon}<span class="sub">LEVEL</span><span>${night + 1}</span>`;
  $('#safeP').innerHTML = `${ICON.turtle(skinNow, 0, ICON.ok)}<span>${safeN}</span><span class="sub">/${total}</span>`;
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
  levelFacts = []; ui.hud(); if (!started || PLAY) return;
  const L = spec; if (L.attract) return; $('#bannerT').className = 'ribbon' + (L.big ? ' coral' : '');
  $('#bannerT').innerHTML = `<small>${isDaily(night) ? 'DAILY BEACH' : L.big ? 'BIG HATCH · LEVEL ' + (night + 1) : 'LEVEL ' + (night + 1)}</small><i class="place">${L.place || CHAPTERS[(night / 10 | 0) % CHAPTERS.length]}</i>${L.name}${L.new ? `<span class="new">NEW · ${L.new}</span>` : L.tag ? `<span class="new tag">${L.tag}</span>` : ''}${goal ? `<span class="goalb">${ICON.target}Bonus: ${goal.t}</span>` : ''}`;
  ui.boostTip(); $('#banner').classList.add('on'); clearTimeout(bannerTO); bannerTO = setTimeout(() => $('#banner').classList.remove('on'), L.new ? 3800 : 2400); if (L.big) { buzz([30, 40, 30]); }
};
let capT = 0;
ui.danger = (on) => { const d = $('#dng'); if (d) d.classList.toggle('on', !!on); };
ui.boostTip = function () { if (!powerKind || attract || PROG.boostTip || PROG.boosts <= 0) return; PROG.boostTip = 1; saveProg(); setTimeout(() => { if (!hand && running) ui.cap(`You have ${PROG.boosts} boost${PROG.boosts > 1 ? 's' : ''}! Tap BOOST to use one`, 3); }, 3600); };
ui.cap = function (s, d) { if (attract || CLEAN) return; const c = $('#cap'); c.textContent = s; c.classList.add('on'); capT = d; };
ui.capOff = function () { $('#cap').classList.remove('on'); capT = 0; };

/* ---------- overlay effects (crisp 2D on top of 3D) ---------- */
const fx = [], floats = []; let comboFx = null;
ui.fx = (kind, x, y, z, sx, sy) => fx.push({ kind, x, y, z, sx, sy, t: 0, life: { hit: .24, sparkle: .7, heart: .9, recycle: .9, twinkle: .8, splash: .9, ring: .6, flash: .4 }[kind] || .7, r: Math.random() * 6 });
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
  if (LK.mist) {   // fog: drifting bands, thicker toward the sea, and the lighthouse beam sweeping through
    const top = scr(0, 0, SHORE_Z - 2).y, g = oc.createLinearGradient(0, top - H * .1, 0, H); g.addColorStop(0, 'rgba(214,222,228,.62)'); g.addColorStop(.35, 'rgba(214,222,228,.3)'); g.addColorStop(1, 'rgba(214,222,228,.08)'); oc.fillStyle = g; oc.fillRect(0, 0, W, H);
    for (let i = 0; i < 4; i++) { const y = (top + i * H * .2 + Math.sin(time * .2 + i) * 18 * K) % H, x = ((time * (12 + i * 5) * K + i * 160) % (W * 1.6)) - W * .3, gr = oc.createRadialGradient(x, y, 0, x, y, 180 * K); gr.addColorStop(0, 'rgba(235,240,244,.32)'); gr.addColorStop(1, 'rgba(235,240,244,0)'); oc.fillStyle = gr; oc.fillRect(x - 180 * K, y - 180 * K, 360 * K, 360 * K); }
    const hx = W * .13, hy = scr(0, 0, SHORE_Z - 40).y, a = Math.sin(time * .9) * .55 + .25; oc.save(); oc.translate(hx, hy); oc.rotate(a); const bg = oc.createLinearGradient(0, 0, W * 1.2, 0); bg.addColorStop(0, 'rgba(255,244,200,.38)'); bg.addColorStop(1, 'rgba(255,244,200,0)'); oc.fillStyle = bg; oc.beginPath(); oc.moveTo(0, 0); oc.lineTo(W * 1.2, -60 * K); oc.lineTo(W * 1.2, 60 * K); oc.closePath(); oc.fill(); oc.restore();
  }
  if (LK.heat && heatK > 0) {   // sunrise: warm wash and heat shimmer once the sand starts to cook
    oc.fillStyle = `rgba(255,150,60,${heatK * .16})`; oc.fillRect(0, 0, W, H); oc.strokeStyle = `rgba(255,236,200,${heatK * .22})`; oc.lineWidth = 2 * K;
    for (let i = 0; i < 9; i++) { const x = (i / 9 + .05) * W, y = H * (.45 + (i % 3) * .14) - ((time * 30 + i * 40) % 80) * K; oc.beginPath(); for (let j = 0; j < 6; j++) oc.lineTo(x + Math.sin(time * 6 + j + i) * 3 * K, y - j * 7 * K); oc.stroke(); }
  }
  if (LK.gale) { oc.strokeStyle = 'rgba(240,226,190,.28)'; oc.lineWidth = 1.6 * K; oc.beginPath(); for (let i = 0; i < 26; i++) { const y = ((i * 97) % 100) / 100 * H, x = ((time * 900 * K + i * 233) % (W + 200)) - 100; oc.moveTo(x, y); oc.lineTo(x + 46 * K, y + 4 * K); } oc.stroke(); }
  if (flipGuardT > 0) { oc.fillStyle = `rgba(120,240,200,${Math.min(1, flipGuardT) * .08})`; oc.fillRect(0, 0, W, H); }
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
  // nets: how many tears are left
  for (const r of rocks) if (r.net && r.st === 'idle') { const s = scr(r.x, .9, r.z); for (let i = 0; i < 3; i++) { const x = s.x + (i - 1) * 13 * K; oc.fillStyle = i < r.hp ? '#5cc4b0' : 'rgba(18,32,58,.5)'; oc.strokeStyle = '#16243b'; oc.lineWidth = 2.2 * K; oc.beginPath(); oc.arc(x, s.y, 5 * K, 0, 7); oc.fill(); oc.stroke(); } }
  // beach lights: a warm pull line to every dazzled hatchling
  for (const lp of lamps) if (lp.on) { const a = scr(lp.x, 2.2, lp.z); oc.strokeStyle = 'rgba(255,236,160,.35)'; oc.lineWidth = 2 * K; oc.setLineDash([3 * K, 6 * K]); for (const t of T) if (t.lure > 0 && t.lx === lp.px && t.st === 'walk') { const b = scr(t.x, .3, t.z); oc.beginPath(); oc.moveTo(a.x, a.y); oc.lineTo(b.x, b.y); oc.stroke(); } oc.setLineDash([]); }
  // boosts on the sand: glossy bubbles that bob and fade
  for (const p of pickups) {
    const s = scr(p.x, .75 + Math.sin(time * 4 + p.x) * .08, p.z), left = 1 - p.t / p.life, pop = Math.min(1, p.t / .25), r = 25 * K * (pop < 1 ? ease(pop) * 1.15 : 1), blink = left < .25 && Math.sin(time * 20) > 0 ? .45 : 1;
    oc.globalAlpha = blink; const g = oc.createRadialGradient(s.x - r * .3, s.y - r * .35, r * .1, s.x, s.y, r); g.addColorStop(0, '#ffffff'); g.addColorStop(.6, '#fff3c4'); g.addColorStop(1, '#ffd166'); oc.fillStyle = g; oc.beginPath(); oc.arc(s.x, s.y, r, 0, 7); oc.fill(); oc.strokeStyle = '#16243b'; oc.lineWidth = 3 * K; oc.stroke();
    segRing(s.x, s.y, r + 7 * K, left, 4 * K);
    const img = PICK_IMG[p.kind === 'speed' ? (sunny() ? 'sun' : 'moon') : p.kind]; if (img && img.complete) oc.drawImage(img, s.x - r * .72, s.y - r * .72, r * 1.44, r * 1.44);
    oc.globalAlpha = 1;
  }
  // golden hatchling: a little crown of light so it reads from across the beach
  for (const t of T) if (t.gold && (t.st === 'walk' || t.st === 'flip' || t.st === 'tangle')) { const s = scr(t.x, .75, t.z); oc.fillStyle = '#ffe680'; star4(s.x, s.y - 8 * K + Math.sin(time * 5) * 2 * K, 6 * K, time); }
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
    else if (p.kind === 'hit') { const r = (8 + u * 30) * K; oc.globalAlpha = (1 - u) * .95; oc.fillStyle = '#fffbe8'; oc.beginPath(); oc.arc(s.x, s.y, r * (1 - u) * .7, 0, 7); oc.fill(); oc.strokeStyle = '#ffffff'; oc.lineWidth = 3.5 * K * (1 - u); oc.beginPath(); oc.arc(s.x, s.y, r, 0, 7); oc.stroke(); oc.globalAlpha = 1; }
    else if (p.kind === 'flash') { oc.globalAlpha = a * .9; const g = oc.createRadialGradient(s.x, s.y, 0, s.x, s.y, 130 * K); g.addColorStop(0, 'rgba(255,255,240,1)'); g.addColorStop(1, 'rgba(255,255,240,0)'); oc.fillStyle = g; oc.fillRect(s.x - 130 * K, s.y - 130 * K, 260 * K, 260 * K); oc.fillStyle = '#fff'; star4(s.x, s.y, 26 * K * a, 0); }
  }
  oc.globalAlpha = 1;
  // floating words
  oc.font = `400 ${22 * K}px 'Lilita One',ui-rounded,system-ui,sans-serif`; oc.lineJoin = 'round';
  for (let i = floats.length - 1; i >= 0; i--) { const f = floats[i]; f.t += lastRaw; if (f.t > 1.15) { floats.splice(i, 1); continue; } const s = scr(f.x, f.y, f.z); const pop = f.t < .15 ? .7 + f.t / .15 * .35 : 1.05 - Math.min(.05, (f.t - .15)); oc.save(); oc.translate(s.x, s.y - f.t * 44 * K); oc.scale(pop, pop); oc.globalAlpha = 1 - Math.max(0, f.t - .7) / .45; oc.fillStyle = '#FFF3C4'; oc.strokeStyle = 'rgba(18,32,58,.75)'; oc.lineWidth = 5 * K; oc.strokeText(f.s, 0, 0); oc.fillText(f.s, 0, 0); oc.restore(); }
  oc.globalAlpha = 1;
  if (comboFx) { comboFx.t += lastRaw; const p = comboFx.t; if (p > 1.3) comboFx = null; else { const sc = 1 + Math.max(0, .35 - p) * 1.6; oc.save(); oc.translate(W / 2, H * .27); oc.scale(sc, sc); oc.globalAlpha = Math.min(1, 1.7 - p); oc.font = `700 ${38 * K}px Fredoka,ui-rounded,system-ui,sans-serif`; oc.lineJoin = 'round'; const cg = oc.createLinearGradient(0, -20 * K, 0, 14 * K); cg.addColorStop(0, '#fff284'); cg.addColorStop(.55, '#ffc928'); cg.addColorStop(1, '#f29200'); oc.fillStyle = cg; oc.strokeStyle = '#16243b'; oc.lineWidth = 9 * K; oc.shadowColor = '#16243b'; oc.shadowOffsetY = 4 * K; const s = `${{ tidy: 'Tidy', rescue: 'Rescue', shoo: 'Guard' }[comboFx.kind]} ×${comboFx.n}`; oc.strokeText(s, 0, 0); oc.shadowColor = 'transparent'; oc.fillText(s, 0, 0); oc.restore(); } }
  // teaching hand
  if (hand && !CLEAN) {
    const o = hand.o, s = scr(o.x, hand.y, o.z), b = Math.sin(time * 6) * 6 * K;
    oc.save(); oc.translate(s.x + 10 * K, s.y + 14 * K + b); oc.strokeStyle = 'rgba(255,243,196,.9)'; oc.lineWidth = 3 * K; oc.beginPath(); oc.arc(-10 * K, -14 * K, (12 + (time * 30 % 20)) * K, 0, 6.3); oc.stroke();
    oc.fillStyle = '#FFF3C4'; oc.strokeStyle = '#12203A'; oc.lineWidth = 2.5 * K; oc.beginPath(); oc.roundRect(-5 * K, -14 * K, 10 * K, 30 * K, 5 * K); oc.roundRect(-5 * K, 6 * K, 24 * K, 24 * K, 9 * K); oc.fill(); oc.stroke(); oc.restore();
  }
  if (CLEAN) return;
  if (zoom < .98) { const a = (1 - zoom) * 1.7; const g = oc.createRadialGradient(W / 2, H / 2, H * .22, W / 2, H / 2, H * .75); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(5,10,25,${a})`); oc.fillStyle = g; oc.fillRect(0, 0, W, H); }
}

/* ---------- progress (saved on the device) ---------- */
const PROG = (() => { let d = { best: {}, unlocked: 0, done: 0, facts: {}, boosts: 0, saved: 0, streak: 0, lastDay: '', noAds: false, gift: 0, chests: {}, mapSeen: -1, boostTip: 0, shells: 0, skin: 'classic', owned: { classic: 1 }, goals: {}, dailyDone: '', sessions: 0, guideSeen: 0 }; try { d = Object.assign(d, JSON.parse(localStorage.getItem('shellrun.v1') || '{}')); } catch (e) {} return d; })();
const saveProg = () => { try { localStorage.setItem('shellrun.v1', JSON.stringify(PROG)); } catch (e) {} };
for (const key of ['chests', 'goals', 'owned', 'facts', 'best']) if (typeof PROG[key] !== 'object' || !PROG[key]) PROG[key] = {};
const LAST_LEVEL = 100;
PROG.owned.classic = 1; PROG.unlocked = Math.min(PROG.unlocked, LAST_LEVEL);
const today = () => new Date().toDateString();
const addShells = (n) => { PROG.shells = Math.max(0, (PROG.shells || 0) + n); saveProg(); };

/* ---------- analytics: a local event ring today, forwarded to the native app or an ad network later ---------- */
const LOGK = 'shellrun.log';
function track(ev, data) {
  const e = Object.assign({ ev, t: Date.now() }, data || {});
  try { const a = JSON.parse(localStorage.getItem(LOGK) || '[]'); a.push(e); localStorage.setItem(LOGK, JSON.stringify(a.slice(-300))); } catch (er) {}
  try { if (self.ShellRunNative && self.ShellRunNative.track) self.ShellRunNative.track(ev, e); } catch (er) {}
}
/* ---------- ads: one adapter. Demo ads now; the native app plugs AdMob or AppLovin in behind the same calls ---------- */
const Ads = {
  native: () => self.ShellRunNative && self.ShellRunNative.ads,
  rewarded(placement, done) {
    track('ad_offer', { placement }); const n = Ads.native();
    if (n && n.rewarded) { n.rewarded(placement, (ok) => { track('ad_watch', { placement, ok }); if (ok) done(); }); return; }
    demoAd(true, () => { track('ad_watch', { placement, ok: true }); done(); });
  },
  interstitial(placement, then) {
    if (PROG.noAds || PROG.sessions < 2 || Date.now() - lastAd < 60000) return then();
    track('ad_offer', { placement }); const n = Ads.native();
    if (n && n.interstitial) { n.interstitial(placement, () => { lastAd = Date.now(); then(); }); return; }
    demoAd(false, () => { lastAd = Date.now(); then(); });
  }
};
const CLEAN = Q.has('clean');   // ad-footage mode: no HUD, no captions, no teaching hand
const chDone = (c) => { let n = 0; for (let i = c * 10; i < c * 10 + 10; i++) if (PROG.best[i] > 0) n++; return n; };
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
function demoAd(rewarded, then) {
  const v = document.createElement('div'); v.className = 'veil'; v.style.zIndex = 30;
  v.innerHTML = `<div class="card" style="margin-top:0"><div class="inner" style="padding-top:20px"><div class="lbl" style="margin-bottom:8px">DEMO AD · a real ad plays here</div><div class="adbox">${ICON.ad}</div><div class="btns"><button class="b-green" id="adgo" disabled>${rewarded ? 'Reward in 3' : 'Continue in 3'}</button></div></div></div>`;
  $('#app').appendChild(v); let n = 3; const b = v.querySelector('#adgo');
  const iv = setInterval(() => { n--; if (n > 0) b.textContent = (rewarded ? 'Reward in ' : 'Continue in ') + n; else { clearInterval(iv); b.disabled = false; b.innerHTML = ICON.play + (rewarded ? 'Collect' : 'Continue'); } }, 1000);
  b.onclick = () => { dismiss(v); then(); };
}
/* every panel leaves the way it arrived: a quick spring down and fade (no hard cuts) */
function dismiss(v, then) { if (!v || v.classList.contains('out')) return; v.classList.add('out'); setTimeout(() => v.remove(), 220); if (then) then(); }
function endNight() {
  if (PLAY) { playEnd(); return; }
  const L = spec, need = Math.ceil(total * .7), pass = safeN >= need, stars = !pass ? 0 : safeN === total ? 3 : safeN / total >= .8 ? 2 : 1, daily = isDaily(night);
  ui.capOff(); hand = null; powerKind = null; ui.power();
  if (safeN === total) { sfx.win(); for (let i = 0; i < 7; i++) setTimeout(() => { burst3((Math.random() - .5) * 7, .6, SHORE_Z + .6 + Math.random() * 2, ['#ffd166', '#ffffff', '#8fd19e', '#6fd1c8', '#E8664A'], 26, { g: 2.2, up: 2.3, size: 1.1 }); tone(note(i * 2 + 4), .5, 'triangle', .1, 0, 0, .5); buzz(14); shake = .14; }, i * 150); } else sfx.safe(0);
  // rewards: shells for new stars, the bonus goal (first time), the golden hatchling, the daily beach
  const prev = daily ? 0 : PROG.best[night] || 0, gm = pass && goalMet(), gFirst = gm && !daily && !PROG.goals[night];
  let earn = shellsGot + (pass && !daily ? Math.max(0, stars - prev) * 2 : 0) + (gFirst ? 5 : 0);
  const dailyFirst = daily && pass && PROG.dailyDone !== today(); if (dailyFirst) { earn += 8; PROG.dailyDone = today(); }
  if (pass && !daily) { PROG.best[night] = Math.max(prev, stars); PROG.unlocked = Math.min(LAST_LEVEL, Math.max(PROG.unlocked, night + 1)); }
  if (gFirst) PROG.goals[night] = 1;
  const ch = night / 10 | 0, chestNow = !daily && pass && night % 10 === 9 && !PROG.chests[ch];
  if (chestNow) { PROG.chests[ch] = 1; PROG.boosts += 2; earn += 10; setTimeout(() => { sfx.win(); buzz([20, 40, 20, 40, 30]); }, 900); }
  PROG.shells = (PROG.shells || 0) + earn; saveProg();
  track('level_end', { lv: daily ? 'daily' : night + 1, pass, stars, safe: safeN, total, lost: lostN, goal: goal ? goal.k : '', goalMet: gm, shells: earn, t: Math.round(nightT) });
  const head = !pass ? 'Not this time' : safeN === total ? 'Perfect rescue!' : safeN >= total - 2 ? 'So close!' : 'Level complete!';
  const tidyPct = Math.round(tidy() * 100), back = Math.min(3, lostN), canBring = lostN > 0 && !rewardUsed;
  const nextCh = Math.ceil((night + 1) / 10) * 10 || 10, dn = chDone(ch), left = 10 - dn, last = !daily && night >= LAST_LEVEL - 1;
  const goalRow = goal ? `<div class="bonus ${gm ? 'met' : ''}">${gm ? ICON.check : ICON.target}<span>${goal.t}</span>${gm ? (gFirst ? '<b>+5</b>' : '<em>done</em>') : '<em>missed</em>'}</div>` : '';
  const prog = !pass ? `<div class="goal">${ICON.turtle()}Save <b>${need}</b> of ${total} to pass</div>`
    : daily ? `<div class="goal">${ICON.daily}${dailyFirst ? 'Daily beach cleared! Come back tomorrow' : 'Already cleared today. New beach tomorrow'}</div>`
    : chestNow ? `<div class="reward pop-in" style="animation-delay:1s"><div class="rc">${ICON.chestOpen}</div><div><b>Chest opened! +2 boosts +10 shells</b><span>${ch < 9 ? `New beach unlocked: <b>${chapterOf(nextCh).split(' · ')[0]}</b>` : 'You cleared every beach!'}</span></div></div>`
    : `<div class="chp"><div class="chp-t"><span>${chapterOf(night).split(' · ')[0]}</span><b>${dn}/10</b></div><div class="chp-b"><div class="seg">${Array.from({ length: 10 }, (_, k) => `<i class="${k < dn ? 'on' : ''}${k === dn - 1 && night % 10 === dn - 1 ? ' new' : ''}"></i>`).join('')}</div><div class="cico ${left <= 2 ? 'near' : ''}">${PROG.chests[ch] ? ICON.chestOpen : ICON.chest}</div></div><div class="chp-s">${PROG.chests[ch] ? `${ICON.star}<b>${starTotal()}</b> stars · next: <b>${chapterOf(nextCh).split(' · ')[0]}</b>` : `${left} more level${left > 1 ? 's' : ''} to open the chest`}</div></div>`;
  const fact = FACTCARD[levelFacts[levelFacts.length - 1]] || L.fact;
  const btns = pass
    ? `<button class="b-green hero pop-in" id="next" style="animation-delay:.35s">${ICON.play}${daily || last ? 'Level map' : 'Next level'}</button>
       ${canBring && stars < 3 ? `<button class="b-teal" id="bring">${ICON.ad}Bring back ${back} · video</button>` : ''}
       <div class="duo"><button class="b-navy" id="retry">${ICON.retry}Play again</button><button class="b-navy" id="maps">${ICON.map}Map</button></div>`
    : `<button class="b-green hero pop-in" id="retry" style="animation-delay:.3s">${ICON.retry}Try again</button>
       ${canBring ? `<button class="b-teal" id="bring">${ICON.ad}Bring back ${back} · video</button>` : ''}
       <div class="duo" style="grid-template-columns:1fr"><button class="b-navy" id="maps">${ICON.map}Level map</button></div>`;
  const v = document.createElement('div'); v.className = 'veil';
  v.innerHTML = `<div class="card ${pass ? '' : 'fail'}"><div class="stars"><div class="glow"></div>${[0, 1, 2].map((i) => i < stars ? ICON.star : ICON.starOff).join('')}</div><div class="ribbon ${pass ? '' : 'coral'}">${head}</div><div class="inner">
    <div class="res"><div class="tu">${ICON.turtle(skinNow)}</div><div><div class="big"><b>0</b><span> / ${total}</span></div><div class="lbl">made it to the sea</div></div></div>
    <div class="srow"><div class="stat">${ICON.bin}<span>${binnedN}</span><div class="bar"><i style="width:0%"></i></div><span>${tidyPct}%</span></div>${earn ? `<div class="stat sh">${ICON.shell}<span>+<b>0</b></span></div>` : ''}</div>
    ${goalRow}
    ${prog}
    ${fieldNote(fact)}
    <div class="btns">${btns}</div></div></div>`;
  $('#ov').appendChild(v);
  const card = v.querySelector('.card');
  countUp(v.querySelector('.big b'), safeN, 600);
  const sb = v.querySelector('.stat.sh b'); if (sb) setTimeout(() => { countUp(sb, earn, 500); sfx.coin(); }, 700);
  setTimeout(() => { const b = v.querySelector('.bar i'); if (b) b.style.width = tidyPct + '%'; }, 380);
  v.querySelectorAll('.stars svg').forEach((s, i) => { setTimeout(() => { s.classList.add('show'); if (i < stars) { tone(note(4 + i * 2), .35, 'triangle', .13, 0, 0, .5); buzz(14 + i * 6); if (i === 2) v.querySelector('.stars').classList.add('lit'); } }, 260 + i * 210); });
  card.addEventListener('pointerdown', () => card.classList.add('skip'), { once: true });
  const b = v.querySelector('#bring');
  if (b) b.onclick = () => { b.disabled = true; Ads.rewarded('bring_back', () => { rewardUsed = true; safeN += back; lostN -= back; season.saved += back; v.remove(); endNight(); }); setTimeout(() => { b.disabled = false; }, 4000); };
  const nx = v.querySelector('#next');
  if (nx) nx.onclick = () => { au(); dismiss(v); rewardUsed = false; wins++; if (daily || last) { showMap(); return; } const go = () => begin(night + 1); if (night >= 5 && wins % 3 === 0) Ads.interstitial('level_end', go); else go(); };
  v.querySelector('#retry').onclick = () => { au(); dismiss(v); rewardUsed = false; Object.assign(season, snap.season); begin(night); };
  v.querySelector('#maps').onclick = () => { au(); dismiss(v); rewardUsed = false; showMap(); };
}
function begin(i) { snap = { season: { ...season } }; bin.n = 0; for (const m of bin.pile.children) m.visible = false; startNight(i); if (!attract && i >= 0) track('level_start', { lv: isDaily(i) ? 'daily' : i + 1 }); }

const TEACH_ICON = { litter: 'bottle', castle: 'castle', crab: 'crab', tangle: 'wind', wave: 'wave', gull: 'gull', log: 'rain', chair: 'chair', lamp: 'lamp', arribada: 'turtle', heat: 'sun', net: 'net', dog: 'dog', tide: 'wave', rut: 'rut', moon: 'moon', gale: 'wind' };
const TAG_ICON = { 'Crab party': 'crab', 'Rush hour': 'bolt', 'Litterbug': 'bottle', 'Gusty': 'wind', 'Birds and flashes': 'gull', 'Busy nest': 'turtle', 'Rough surf': 'wave' };
const HAZ = (i) => { const L = levelSpec(i), k = L.teach ? TEACH_ICON[L.teach] : TAG_ICON[(L.tag || '').split(' + ')[0]] || (L.dog ? 'dog' : L.nets ? 'net' : L.lamps ? 'lamp' : L.waves ? 'wave' : null); if (!k) return null; return k === 'turtle' ? ICON.turtle() : ICON[k]; };
/* ---------- level map 2.0: an authored coastline diorama (art ref: map diorama). One light from the top left ---------- */
const BIOME = [
  { sand: '#f1d79c', sand2: '#dcb878', grass: ['#9bd65c', '#6db13e'], tuft: '#5a9a34', rock: ['#b3b7be', '#868c95', '#63686f'], water: ['#1676bd', '#239ad6'], shallow: '#5fe0dc', path: ['#c99a5c', '#e7c487', '#f5dca8'], props: ['palm', 'palm', 'bush', 'bush', 'rock', 'fern'], hero: ['dock', 'lighthouse'] },
  { sand: '#fbf2e6', sand2: '#e6d4bc', grass: ['#bedc72', '#94c154'], tuft: '#7aa844', rock: ['#e2d8cc', '#bfb1a0', '#9c8e7e'], water: ['#0e98c8', '#2cc0e2'], shallow: '#86f4ea', path: ['#d6bc92', '#efdcbc', '#fff3e0'], props: ['palm', 'bush', 'rock', 'fern', 'bush'], hero: ['reef', 'tower'] },
  { sand: '#edc690', sand2: '#d3a468', grass: ['#93c656', '#68a43c'], tuft: '#558c30', rock: ['#aca79f', '#817c75', '#625e58'], water: ['#1a72ad', '#2994c8'], shallow: '#58d4d0', path: ['#c08e52', '#e1b97a', '#f0d29e'], props: ['palm', 'bush', 'hut', 'rock', 'fern'], hero: ['boat', 'hut'] },
  { sand: '#6e6862', sand2: '#4f4a45', grass: ['#67ae4a', '#468a34'], tuft: '#3a7428', rock: ['#5e5a56', '#44413e', '#2e2c2a'], water: ['#15649e', '#2282bc'], shallow: '#46c0c8', path: ['#857c72', '#a39a8f', '#c2b8ab'], props: ['palm', 'fern', 'rock', 'rock', 'bush'], hero: ['falls', 'lighthouse'] },
  { sand: '#f3dea8', sand2: '#dfc084', grass: ['#d0ca72', '#aaa652'], tuft: '#8e8a3a', rock: ['#cfba90', '#a8946c', '#8a7854'], water: ['#1a88c8', '#33a8de'], shallow: '#6ae4dc', path: ['#cfa866', '#ebcb8e', '#f8e2b0'], props: ['oats', 'oats', 'bush', 'rock', 'palm'], hero: ['dock', 'tower'] }
];
const TPL = [[.5, .64, .75, .7, .46, .27, .25, .43, .66, .58], [.42, .28, .3, .52, .73, .76, .55, .33, .36, .58], [.6, .74, .66, .42, .26, .34, .58, .76, .6, .4], [.5, .32, .25, .44, .68, .76, .6, .36, .28, .5]];
const MAPDRAW = {
  shadow: (x, y, rx, ry) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#0b2a12" opacity=".2"/>`,
  palm(x, y, s, lean, R) {
    const h = 58 * s, tx = x + lean * 20 * s, ty = y - h, leaves = [];
    for (let k = 0; k < 7; k++) { const a = -Math.PI / 2 + (k - 3) * .5 + (R() - .5) * .2, L = (34 + R() * 8) * s, ex = tx + Math.cos(a) * L * 1.15, ey = ty + Math.sin(a) * L * .7 + 10 * s, mx = tx + Math.cos(a) * L * .55, my = ty + Math.sin(a) * L * .4 - 8 * s;
      leaves.push(`<path d="M${tx} ${ty}Q${mx - 6 * s} ${my - 6 * s} ${ex} ${ey}Q${mx + 4 * s} ${my + 8 * s} ${tx} ${ty}" fill="${k % 2 ? '#3f9a3a' : '#57b546'}"/><path d="M${tx} ${ty}Q${mx} ${my} ${ex} ${ey}" stroke="#2e7a2c" stroke-width="${1.4 * s}" fill="none" opacity=".6"/>`); }
    return `<g class="palm" style="transform-origin:${x}px ${y}px">${MAPDRAW.shadow(x + 18 * s, y + 2, 30 * s, 9 * s)}<path d="M${x - 4 * s} ${y}Q${x + lean * 4 * s} ${y - h * .5} ${tx - 2 * s} ${ty}L${tx + 3 * s} ${ty}Q${x + lean * 6 * s + 6 * s} ${y - h * .5} ${x + 5 * s} ${y}z" fill="#9a6a3c"/>${Array.from({ length: 5 }, (_, i) => { const u = (i + .5) / 5, cx = lerp(x, tx, u * u * .8 + u * .2), cy = lerp(y, ty, u); return `<path d="M${cx - 4.5 * s} ${cy}h${9 * s}" stroke="#7a4e28" stroke-width="${1.6 * s}" opacity=".7"/>`; }).join('')}${leaves.join('')}<circle cx="${tx - 3 * s}" cy="${ty + 4 * s}" r="${3.4 * s}" fill="#7a4e28"/><circle cx="${tx + 3 * s}" cy="${ty + 5 * s}" r="${3.2 * s}" fill="#6a4220"/></g>`;
  },
  bush(x, y, s, R, fl) {
    const b = [[-10, 2, 11], [9, 2, 10], [0, -6, 13], [-4, 4, 9], [6, -1, 9]].map(([dx, dy, r], i) => `<circle cx="${x + dx * s}" cy="${y + dy * s}" r="${r * s}" fill="${['#3f8f34', '#4ea33e', '#5db84a', '#479a38', '#6cc456'][i]}"/>`).join('');
    const f = fl ? Array.from({ length: 2 + (R() * 2 | 0) }, () => { const fx = x + (R() - .5) * 20 * s, fy = y + (R() - .7) * 12 * s, c = R() < .7 ? '#e8463a' : '#fff4d6'; return `<g transform="translate(${fx.toFixed(1)} ${fy.toFixed(1)}) scale(${s.toFixed(2)})"><circle r="2.6" cx="0" cy="-2.6" fill="${c}"/><circle r="2.6" cx="2.5" cy="-.8" fill="${c}"/><circle r="2.6" cx="1.5" cy="2.1" fill="${c}"/><circle r="2.6" cx="-1.5" cy="2.1" fill="${c}"/><circle r="2.6" cx="-2.5" cy="-.8" fill="${c}"/><circle r="1.4" fill="#ffd23f"/></g>`; }).join('') : '';
    return `${MAPDRAW.shadow(x + 6 * s, y + 9 * s, 20 * s, 6 * s)}${b}<circle cx="${x - 3 * s}" cy="${y - 11 * s}" r="${4 * s}" fill="#8edc6c" opacity=".7"/>${f}`;
  },
  fern(x, y, s) { let p = ''; for (let k = 0; k < 6; k++) { const a = -Math.PI / 2 + (k - 2.5) * .55, ex = x + Math.cos(a) * 20 * s, ey = y + Math.sin(a) * 14 * s; p += `<path d="M${x} ${y}Q${(x + ex) / 2 + 4 * s} ${(y + ey) / 2 - 6 * s} ${ex} ${ey}Q${(x + ex) / 2 - 2 * s} ${(y + ey) / 2 + 2 * s} ${x} ${y}" fill="${k % 2 ? '#3d8c30' : '#58ac42'}"/>`; } return MAPDRAW.shadow(x + 4 * s, y + 3 * s, 16 * s, 5 * s) + p; },
  rock(x, y, s, c) { return `${MAPDRAW.shadow(x + 5 * s, y + 6 * s, 18 * s, 5 * s)}<path d="M${x - 15 * s} ${y + 5 * s}L${x - 11 * s} ${y - 7 * s}L${x - 1 * s} ${y - 13 * s}L${x + 11 * s} ${y - 8 * s}L${x + 16 * s} ${y + 4 * s}L${x + 4 * s} ${y + 9 * s}z" fill="${c[1]}"/><path d="M${x - 11 * s} ${y - 7 * s}L${x - 1 * s} ${y - 13 * s}L${x + 11 * s} ${y - 8 * s}L${x + 2 * s} ${y - 2 * s}z" fill="${c[0]}"/><path d="M${x + 2 * s} ${y - 2 * s}L${x + 11 * s} ${y - 8 * s}L${x + 16 * s} ${y + 4 * s}L${x + 4 * s} ${y + 9 * s}z" fill="${c[2]}"/>`; },
  wrock(x, y, s, c) { return `<ellipse cx="${x}" cy="${y + 6 * s}" rx="${22 * s}" ry="${8 * s}" fill="#fff" opacity=".5" class="ring"/>${MAPDRAW.rock(x, y, s, c)}`; },
  oats(x, y, s) { let p = MAPDRAW.shadow(x + 4, y + 2, 12 * s, 4 * s); for (let k = 0; k < 5; k++) { const dx = (k - 2) * 4 * s, h = (18 + (k % 3) * 6) * s; p += `<path d="M${x + dx} ${y}q${2 * s} ${-h * .5} ${-1 * s + (k - 2) * s} ${-h}" stroke="#b9a75a" stroke-width="${1.6 * s}" fill="none"/><ellipse cx="${x + dx + (k - 2) * s - 1 * s}" cy="${y - h}" rx="${2 * s}" ry="${5 * s}" fill="#e6c46a"/>`; } return p; },
  hut(x, y, s) { return `${MAPDRAW.shadow(x + 8 * s, y + 4 * s, 26 * s, 8 * s)}<rect x="${x - 16 * s}" y="${y - 18 * s}" width="${32 * s}" height="${20 * s}" fill="#e9dcc0"/><rect x="${x - 16 * s}" y="${y - 18 * s}" width="${32 * s}" height="${4 * s}" fill="#cbbb98"/><rect x="${x - 4 * s}" y="${y - 10 * s}" width="${8 * s}" height="${12 * s}" fill="#8a5a34"/><path d="M${x - 21 * s} ${y - 16 * s}L${x} ${y - 34 * s}L${x + 21 * s} ${y - 16 * s}z" fill="#e5533a"/><path d="M${x} ${y - 34 * s}L${x + 21 * s} ${y - 16 * s}L${x + 10 * s} ${y - 16 * s}z" fill="#c23e28"/>`; },
  shells(x, y, s, R) { return Array.from({ length: 3 }, () => { const sx = x + (R() - .5) * 26 * s, sy = y + (R() - .5) * 12 * s; return `<path d="M${sx - 4 * s} ${sy}a${4 * s} ${4 * s} 0 0 1 ${8 * s} 0z" fill="${R() < .5 ? '#fff6ea' : '#ffd0c0'}"/>`; }).join(''); },
  drift(x, y, s, r) { return `<g transform="rotate(${r} ${x} ${y})">${MAPDRAW.shadow(x + 3, y + 4, 22 * s, 4 * s)}<rect x="${x - 22 * s}" y="${y - 3.5 * s}" width="${44 * s}" height="${7 * s}" rx="${3.5 * s}" fill="#9a7048"/><rect x="${x - 22 * s}" y="${y - 3.5 * s}" width="${44 * s}" height="${2.5 * s}" rx="${1.2 * s}" fill="#b98a5c"/><path d="M${x + 6 * s} ${y - 3 * s}l${8 * s} ${-9 * s}" stroke="#8a6040" stroke-width="${3.4 * s}" stroke-linecap="round"/></g>`; },
  bottle(x, y, s, r) { return `<g transform="rotate(${r} ${x} ${y})"><rect x="${x - 7 * s}" y="${y - 3 * s}" width="${14 * s}" height="${6 * s}" rx="${3 * s}" fill="#3a8fe0"/><rect x="${x + 6 * s}" y="${y - 1.6 * s}" width="${4 * s}" height="${3.2 * s}" fill="#1f5fae"/><rect x="${x - 3 * s}" y="${y - 3 * s}" width="${5 * s}" height="${6 * s}" fill="#fff4d6" opacity=".9"/></g>`; },
  flower(x, y, s, c) { return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(2)})"><path d="M0 4v6" stroke="#3f8a2c" stroke-width="1.6"/><circle r="2.6" cx="0" cy="-2.4" fill="${c}"/><circle r="2.6" cx="2.3" cy="-.6" fill="${c}"/><circle r="2.6" cx="1.4" cy="2" fill="${c}"/><circle r="2.6" cx="-1.4" cy="2" fill="${c}"/><circle r="2.6" cx="-2.3" cy="-.6" fill="${c}"/><circle r="1.3" fill="#ffd23f"/></g>`; },
  // heroes: one or two per chapter, big, hand placed on the side with room
  lighthouse(x, y, s) { return `${MAPDRAW.shadow(x + 26 * s, y + 4, 44 * s, 12 * s)}<ellipse cx="${x}" cy="${y}" rx="${28 * s}" ry="${10 * s}" fill="#b9b2a6"/><rect x="${x + 6 * s}" y="${y - 20 * s}" width="${30 * s}" height="${20 * s}" fill="#f2ead8"/><path d="M${x + 2 * s} ${y - 18 * s}L${x + 21 * s} ${y - 32 * s}L${x + 40 * s} ${y - 18 * s}z" fill="#d8453a"/><path d="M${x - 13 * s} ${y}L${x - 9 * s} ${y - 78 * s}H${x + 9 * s}L${x + 13 * s} ${y}z" fill="#fbf4e4"/><path d="M${x + 1 * s} ${y}L${x + 3 * s} ${y - 78 * s}H${x + 9 * s}L${x + 13 * s} ${y}z" fill="#e2d6be"/><path d="M${x - 12 * s} ${y - 18 * s}H${x + 12 * s}L${x + 11.5 * s} ${y - 30 * s}H${x - 11.5 * s}z" fill="#e5533a"/><path d="M${x - 10.4 * s} ${y - 50 * s}H${x + 10.4 * s}L${x + 10 * s} ${y - 60 * s}H${x - 10 * s}z" fill="#e5533a"/><rect x="${x - 13 * s}" y="${y - 82 * s}" width="${26 * s}" height="${5 * s}" rx="${2 * s}" fill="#24304a"/><rect x="${x - 8 * s}" y="${y - 96 * s}" width="${16 * s}" height="${14 * s}" fill="#ffe48a"/><path d="M${x - 11 * s} ${y - 96 * s}H${x + 11 * s}L${x} ${y - 110 * s}z" fill="#24304a"/><circle cx="${x}" cy="${y - 89 * s}" r="${16 * s}" fill="#fff3b0" opacity=".45" class="lamp"/><path class="beam" d="M${x} ${y - 89 * s}L${x + 150 * s} ${y - 120 * s}V${y - 58 * s}z" fill="#fff6c8" opacity=".22" style="transform-origin:${x}px ${y - 89 * s}px"/></g>`.replace('</g>', ''); },
  dock(x, y, s, dir) { const L = 80 * s * dir; return `${MAPDRAW.shadow(x + L / 2 + 6, y + 10 * s, Math.abs(L) / 2 + 8, 6 * s)}${[0, .33, .66, 1].map((u) => `<rect x="${x + L * u - 2.5 * s}" y="${y - 2 * s}" width="${5 * s}" height="${18 * s}" fill="#5a3a20"/>`).join('')}<rect x="${Math.min(x, x + L)}" y="${y - 7 * s}" width="${Math.abs(L)}" height="${12 * s}" fill="#b9864f"/>${Array.from({ length: 9 }, (_, i) => `<path d="M${x + L * i / 8} ${y - 7 * s}v${12 * s}" stroke="#8a5e34" stroke-width="${1.2 * s}"/>`).join('')}<rect x="${Math.min(x, x + L)}" y="${y - 7 * s}" width="${Math.abs(L)}" height="${2.5 * s}" fill="#d4a06a"/>${MAPDRAW.boat(x + L + 18 * s * dir, y + 14 * s, s * .8, dir)}`; },
  boat(x, y, s, dir = 1) { return `<g class="bob"><ellipse cx="${x}" cy="${y + 8 * s}" rx="${30 * s}" ry="${7 * s}" fill="#fff" opacity=".4"/><path d="M${x - 26 * s} ${y - 4 * s}H${x + 26 * s}L${x + 18 * s} ${y + 8 * s}H${x - 18 * s}z" fill="#e5533a"/><path d="M${x - 26 * s} ${y - 4 * s}H${x + 26 * s}L${x + 24 * s} ${y}H${x - 24 * s}z" fill="#fff4e4"/><path d="M${x} ${y - 4 * s}V${y - 40 * s}" stroke="#7a4e28" stroke-width="${2.4 * s}"/><path d="M${x + 2 * s} ${y - 38 * s}L${x + 22 * s * dir} ${y - 10 * s}H${x + 2 * s}z" fill="#fbf4e4"/></g>`; },
  reef(x, y, s) { return `<ellipse cx="${x}" cy="${y}" rx="${46 * s}" ry="${22 * s}" fill="#7ff2e6" opacity=".45"/><g opacity=".95"><path d="M${x - 18 * s} ${y + 6 * s}v${-14 * s}m0 ${6 * s}l${-7 * s} ${-7 * s}m${7 * s} ${3 * s}l${7 * s} ${-9 * s}" stroke="#ff8a6b" stroke-width="${4 * s}" stroke-linecap="round" fill="none"/><ellipse cx="${x + 2 * s}" cy="${y + 2 * s}" rx="${11 * s}" ry="${8 * s}" fill="#ffb3c7"/><path d="M${x - 5 * s} ${y + 1 * s}q${7 * s} ${-5 * s} ${14 * s} 0M${x - 4 * s} ${y + 5 * s}q${6 * s} ${-4 * s} ${12 * s} 0" stroke="#e57f9d" stroke-width="${1.4 * s}" fill="none"/><circle cx="${x + 20 * s}" cy="${y + 6 * s}" r="${6 * s}" fill="#ffd23f"/><path d="M${x - 6 * s} ${y + 12 * s}l${4 * s} ${-8 * s} ${4 * s} ${8 * s}z" fill="#9b7be0"/></g><path class="fish" d="M${x + 30 * s} ${y - 12 * s}l${9 * s} ${4 * s}-${9 * s} ${4 * s} ${2 * s}-${4 * s}z" fill="#ffd23f"/>`; },
  tower(x, y, s) { return `${MAPDRAW.shadow(x + 14 * s, y + 4, 30 * s, 8 * s)}${[-12, 12].map((dx) => `<path d="M${x + dx * s} ${y}l${-dx * .2 * s} ${-34 * s}" stroke="#7a4e28" stroke-width="${3.4 * s}"/>`).join('')}<path d="M${x - 10 * s} ${y - 8 * s}L${x + 10 * s} ${y - 24 * s}M${x + 10 * s} ${y - 8 * s}L${x - 10 * s} ${y - 24 * s}" stroke="#8a5e34" stroke-width="${2 * s}"/><rect x="${x - 17 * s}" y="${y - 52 * s}" width="${34 * s}" height="${20 * s}" fill="#d9b27c"/><rect x="${x - 11 * s}" y="${y - 47 * s}" width="${9 * s}" height="${8 * s}" fill="#24304a"/><rect x="${x + 3 * s}" y="${y - 47 * s}" width="${9 * s}" height="${8 * s}" fill="#ffe48a"/><path d="M${x - 22 * s} ${y - 50 * s}L${x} ${y - 66 * s}L${x + 22 * s} ${y - 50 * s}z" fill="#3e8a5a"/><path d="M${x + 14 * s} ${y - 58 * s}v${-14 * s}" stroke="#24304a" stroke-width="${1.6 * s}"/><path d="M${x + 14 * s} ${y - 72 * s}l${12 * s} ${4 * s}-${12 * s} ${4 * s}z" fill="#ffd23f" class="flag" style="transform-origin:${x + 14 * s}px ${y - 70 * s}px"/>`; },
  falls(x, y, s, c) { return `${MAPDRAW.rock(x - 20 * s, y - 34 * s, 1.6 * s, c)}${MAPDRAW.rock(x + 22 * s, y - 30 * s, 1.4 * s, c)}<rect x="${x - 9 * s}" y="${y - 46 * s}" width="${18 * s}" height="${44 * s}" fill="#9be8f2"/><rect class="fall" x="${x - 9 * s}" y="${y - 46 * s}" width="${18 * s}" height="${44 * s}" fill="url(#mfall)"/><ellipse cx="${x}" cy="${y}" rx="${24 * s}" ry="${9 * s}" fill="#4fd0dc"/><ellipse cx="${x}" cy="${y - 1 * s}" rx="${16 * s}" ry="${5 * s}" fill="#fff" opacity=".7"/>`; }
};
function showMap() {
  running = false; if (CLEAN) $('#app').classList.add('clean');
  const done100 = PROG.unlocked >= LAST_LEVEL, cur = Math.min(PROG.unlocked, LAST_LEVEL - 1), curCh = cur / 10 | 0, showCh = Math.min(9, curCh + 1), N = (showCh + 1) * 10;
  const Wd = Math.min(560, $('#app').clientWidth || 390), RH = 100, BR = 96, BOT = 170, TOPZ = 470, Ht = BOT + (N - 1) * RH + showCh * BR + TOPZ;
  const py = (i) => Ht - BOT - i * RH - (i / 10 | 0) * BR, span = Math.min(Wd - 110, 340);
  const px = (i) => Wd / 2 + (TPL[(i / 10 | 0) % TPL.length][i % 10] - .5) * span * 1.6;
  const pathX = (y) => { if (y >= py(0)) return px(0); if (y <= py(N - 1)) return px(N - 1); let i = 0; while (i < N - 1 && py(i + 1) > y) i++; const u = (py(i) - y) / (py(i) - py(i + 1)); return lerp(px(i), px(i + 1), u * u * (3 - 2 * u)); };
  const chOf = (y) => { for (let c = showCh; c >= 1; c--) if (y < (py(c * 10 - 1) + py(c * 10)) / 2) return c; return 0; };
  const bandTop = (c) => c >= showCh ? -60 : (py(c * 10 + 9) + py(c * 10 + 10)) / 2, bandBot = (c) => c === 0 ? Ht + 60 : (py(c * 10 - 1) + py(c * 10)) / 2;
  const R = srand(4242), f1 = (v) => v.toFixed(1);
  // path: Catmull-Rom through every node, from below the screen into the clouds
  const P = [[px(0), Ht + 60], ...Array.from({ length: N }, (_, i) => [px(i), py(i)]), [px(N - 1) + 30, py(N - 1) - 260], [px(N - 1) + 40, -80]];
  let path = `M${f1(P[0][0])} ${f1(P[0][1])}`; for (let i = 0; i < P.length - 1; i++) { const a = P[Math.max(0, i - 1)], b = P[i], c = P[i + 1], d = P[Math.min(P.length - 1, i + 2)]; path += `C${f1(b[0] + (c[0] - a[0]) / 6)} ${f1(b[1] + (c[1] - a[1]) / 6)} ${f1(c[0] - (d[0] - b[0]) / 6)} ${f1(c[1] - (d[1] - b[1]) / 6)} ${f1(c[0])} ${f1(c[1])}`; }
  // land: a ribbon that follows the trail, with noisy coasts; plateau (grass) sits inside it on a rocky cliff
  const L = [], Rr = [], GL = [], GR = [];
  for (let y = -80; y <= Ht + 80; y += 18) { const x = pathX(y), l = 118 + 30 * Math.sin(y * .0093 + 1) + 14 * Math.sin(y * .031 + .7), r = 118 + 30 * Math.sin(y * .0081 + 2.1) + 14 * Math.sin(y * .027 + 1.9), il = 30 + 8 * Math.sin(y * .05), ir = 30 + 8 * Math.sin(y * .043 + 1); L.push([x - l, y]); Rr.push([x + r, y]); GL.push([x - l + il, y]); GR.push([x + r - ir, y]); }
  const poly = (A, B) => 'M' + A.map(([x, y]) => `${f1(x)} ${y}`).join('L') + 'L' + B.slice().reverse().map(([x, y]) => `${f1(x)} ${y}`).join('L') + 'z';
  const land = poly(L, Rr), plat = poly(GL, GR);
  const landEdge = (y, side) => { const i = clamp(Math.round((y + 80) / 18), 0, L.length - 1); return side < 0 ? L[i][0] : Rr[i][0]; }, platEdge = (y, side) => { const i = clamp(Math.round((y + 80) / 18), 0, GL.length - 1); return side < 0 ? GL[i][0] : GR[i][0]; };
  let defs = `<pattern id="mwv" width="90" height="46" patternUnits="userSpaceOnUse"><path d="M6 20q10-8 20 0M48 38q10-8 20 0" fill="none" stroke="#fff" stroke-opacity=".16" stroke-width="2.4" stroke-linecap="round"/></pattern><linearGradient id="mfall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".5" stop-color="#bff4ff" stop-opacity=".2"/><stop offset="1" stop-color="#fff" stop-opacity=".9"/></linearGradient><radialGradient id="mcl"><stop offset="0" stop-color="#fff"/><stop offset=".7" stop-color="#fff" stop-opacity=".92"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>`;
  let water = '', ground = '', lowProps = [], topProps = [], rivers = '', swim = '';
  for (let c = 0; c <= showCh; c++) {
    const B = BIOME[c % BIOME.length], y0 = bandTop(c), y1 = bandBot(c);
    defs += `<clipPath id="mc${c}"><rect x="-40" y="${f1(y0)}" width="${Wd + 80}" height="${f1(y1 - y0)}"/></clipPath><linearGradient id="mg${c}" x1="0" y1="0" x2="1" y2=".4"><stop offset="0" stop-color="${B.grass[0]}"/><stop offset="1" stop-color="${B.grass[1]}"/></linearGradient><linearGradient id="mw${c}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${B.water[0]}"/><stop offset=".5" stop-color="${B.water[1]}"/><stop offset="1" stop-color="${B.water[0]}"/></linearGradient>`;
    water += `<rect x="-40" y="${f1(y0)}" width="${Wd + 80}" height="${f1(y1 - y0)}" fill="url(#mw${c})"/>`;
    ground += `<g clip-path="url(#mc${c})"><path d="${land}" fill="none" stroke="${B.shallow}" stroke-width="64" stroke-linejoin="round" opacity=".5"/><path d="${land}" fill="none" stroke="#a8fff2" stroke-width="30" stroke-linejoin="round" opacity=".55"/><path class="foam" d="${land}" fill="none" stroke="#fff" stroke-width="9" stroke-dasharray="14 18" stroke-linejoin="round" opacity=".8"/><path d="${land}" fill="${B.sand}"/><path d="${land}" fill="none" stroke="${B.sand2}" stroke-width="7" opacity=".55"/>
      <path d="${plat}" fill="${B.rock[2]}" transform="translate(0 20)"/><path d="${plat}" fill="${B.rock[1]}" transform="translate(0 11)"/><path d="${plat}" fill="url(#mg${c})"/><path d="${plat}" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="3" transform="translate(-2 -2)"/></g>`;
    // grass tufts
    for (let k = 0; k < 26; k++) { const y = lerp(y0, y1, R()), side = R() < .5 ? -1 : 1, x = lerp(pathX(y) + side * 40, platEdge(y, side) - side * 12, R()); if ((x - platEdge(y, -1)) * (platEdge(y, 1) - x) < 0) continue; ground += `<path d="M${f1(x - 4)} ${f1(y)}l2-6 2 6 2-7 2 7" fill="none" stroke="${B.tuft}" stroke-width="1.6" stroke-linecap="round" opacity=".7" clip-path="url(#mc${c})"/>`; }
    // water life: rocks with foam, sparkles, a bird or two
    for (let k = 0; k < 5; k++) { const y = lerp(y0 + 30, y1 - 30, (k + R()) / 5), side = k % 2 ? 1 : -1, ex = landEdge(y, side), x = side < 0 ? Math.max(12, ex - 30 - R() * 50) : Math.min(Wd - 12, ex + 30 + R() * 50); if (side < 0 ? ex < 40 : ex > Wd - 40) continue; water += MAPDRAW.wrock(x, y, .7 + R() * .6, B.rock); }
    for (let k = 0; k < 10; k++) water += `<path class="spk" d="M${f1(R() * Wd)} ${f1(lerp(y0, y1, R()))}h${f1(6 + R() * 10)}" stroke="#fff" stroke-width="2" stroke-linecap="round" style="animation-delay:${(-R() * 3).toFixed(2)}s"/>`;
    // river at the chapter boundary + a little bridge
    if (c >= 1) { const yb = bandBot(c), bx = pathX(yb); rivers += `<g><path d="M-40 ${f1(yb - 26)}Q${Wd * .25} ${f1(yb - 36)} ${Wd / 2} ${f1(yb - 26)}T${Wd + 40} ${f1(yb - 26)}V${f1(yb + 26)}Q${Wd * .75} ${f1(yb + 36)} ${Wd / 2} ${f1(yb + 26)}T-40 ${f1(yb + 26)}z" fill="${B.water[1]}"/><path d="M-40 ${f1(yb - 22)}Q${Wd * .25} ${f1(yb - 32)} ${Wd / 2} ${f1(yb - 22)}T${Wd + 40} ${f1(yb - 22)}" stroke="#a8fff2" stroke-width="5" fill="none" opacity=".6"/><path class="foam" d="M-40 ${f1(yb + 4)}Q${Wd * .25} ${f1(yb - 6)} ${Wd / 2} ${f1(yb + 4)}T${Wd + 40} ${f1(yb + 4)}" stroke="#fff" stroke-width="3" fill="none" stroke-dasharray="10 22" opacity=".5"/></g>`;
      topProps.push([yb + 40, `<g>${MAPDRAW.shadow(bx + 6, yb + 34, 40, 6)}<rect x="${f1(bx - 30)}" y="${f1(yb - 40)}" width="60" height="80" rx="4" fill="#b9864f"/>${Array.from({ length: 9 }, (_, i) => `<path d="M${f1(bx - 30)} ${f1(yb - 40 + i * 10)}h60" stroke="#8a5e34" stroke-width="1.6"/>`).join('')}<path d="M${f1(bx - 32)} ${f1(yb - 42)}v84M${f1(bx + 32)} ${f1(yb - 42)}v84" stroke="#6a4424" stroke-width="5" stroke-linecap="round"/>${[-1, 1].map((sd) => [-42, 0, 42].map((dy) => `<circle cx="${f1(bx + sd * 32)}" cy="${f1(yb + dy)}" r="4.4" fill="#5a3a20"/>`).join('')).join('')}</g>`]); }
    // heroes
    B.hero.forEach((h, j) => {
      const i = c * 10 + (j ? 7 : 3); if (i >= N) return; const y = py(i) + 16, x0 = pathX(y), roomL = x0 - platEdge(y, -1), roomR = platEdge(y, 1) - x0, side = roomL > roomR ? -1 : 1;
      if (h === 'dock' || h === 'boat' || h === 'reef') { const ex = landEdge(y, side); const x = clamp(side < 0 ? ex - 6 : ex + 6, 30, Wd - 30); lowProps.push([y, h === 'dock' ? MAPDRAW.dock(ex, y, 1, side) : h === 'boat' ? MAPDRAW.boat(clamp(ex + side * 60, 40, Wd - 40), y + 10, 1, side) : MAPDRAW.reef(clamp(ex + side * 60, 50, Wd - 50), y, 1)]); return; }
      const x = clamp(lerp(x0 + side * 70, platEdge(y, side) - side * 26, .5), 40, Wd - 40); topProps.push([y, MAPDRAW[h](x, y, 1, B.rock)]);
    });
  }
  // props on the plateau and the beach, placed beside the trail, never on it
  for (let i = 0; i < N + 2; i++) {
    const c = Math.min(showCh, i / 10 | 0), B = BIOME[c % BIOME.length], yBase = i < N ? py(i) : py(N - 1) - (i - N + 1) * RH;
    for (let k = 0; k < 4; k++) {
      const y = yBase + (R() - .5) * RH, side = (k + i) % 2 ? 1 : -1, x0 = pathX(y), pe = platEdge(y, side), room = (pe - x0) * side;
      if (room < 70) continue; const x = x0 + side * (52 + R() * (room - 64)), kind = B.props[(R() * B.props.length) | 0], s = .8 + R() * .45;
      topProps.push([y, kind === 'palm' ? MAPDRAW.palm(x, y, s * 1.1, side * (.3 + R() * .6), R) : kind === 'bush' ? MAPDRAW.bush(x, y, s, R, R() < .6) : kind === 'fern' ? MAPDRAW.fern(x, y, s) : kind === 'oats' ? MAPDRAW.oats(x, y, s) : kind === 'hut' ? MAPDRAW.hut(x, y, s) : MAPDRAW.rock(x, y, s, B.rock)]);
    }
    // beach strip: driftwood, shells, and litter on the beaches still ahead of you
    if (i < N) { const side = i % 2 ? 1 : -1, y = py(i) + (R() - .5) * 60, x = lerp(landEdge(y, side), platEdge(y, side), .45);
      lowProps.push([y, i > cur ? MAPDRAW.bottle(x, y, 1, (R() * 360) | 0) : R() < .5 ? MAPDRAW.drift(x, y, .8, (R() * 60 - 30) | 0) : MAPDRAW.shells(x, y, 1, R)]);
      if (i < cur) { for (let k = 0; k < 2; k++) { const sd = k ? 1 : -1, yy = py(i) + (R() - .5) * 50, xx = pathX(yy) + sd * (34 + R() * 14); topProps.push([yy, MAPDRAW.flower(xx, yy, .9 + R() * .3, ['#ff8fb1', '#fff4d6', '#ffd23f'][k + (i % 2)])]); } }
      if (i < cur && i >= cur - 8) { const sd = i % 2 ? 1 : -1, sx = clamp(landEdge(py(i), sd) + sd * 34, 14, Wd - 14); swim += `<g transform="translate(${f1(sx)} ${f1(py(i) + 18)})"><g class="sw" style="animation-delay:${(-i * .7).toFixed(1)}s"><ellipse rx="6" ry="7.5" fill="#3e6b3a"/><ellipse rx="4" ry="5" cy="-.5" fill="#6fb04a"/><circle cy="-9.5" r="3" fill="#86c75a"/><ellipse cx="-7" cy="-3" rx="3.6" ry="1.8" fill="#86c75a" transform="rotate(-30 -7 -3)"/><ellipse cx="7" cy="-3" rx="3.6" ry="1.8" fill="#86c75a" transform="rotate(30 7 -3)"/></g></g>`; } }
  }
  // fences along a couple of switchbacks per chapter
  let fence = '';
  for (let i = 1; i < N - 1; i += 3) { const y0 = py(i), y1 = py(i + 1); for (const sd of [-1, 1]) { if ((i + sd) % 2) continue; let pts = []; for (let u = .15; u <= .85; u += .14) { const y = lerp(y0, y1, u), x = pathX(y) + sd * 31; pts.push([x, y]); } fence += pts.map(([x, y]) => `<rect x="${f1(x - 2)}" y="${f1(y - 11)}" width="4" height="13" rx="1.4" fill="#7a4e28"/>`).join('') + `<path d="M${pts.map(([x, y]) => `${f1(x)} ${f1(y - 8)}`).join('L')}" stroke="#a87444" stroke-width="2.6" fill="none"/>`; } }
  const sorted = (A) => A.sort((a, b) => a[0] - b[0]).map((a) => a[1]).join('');
  // clouds: a bank over the beaches still to come, with a peek card
  const topY = py(N - 1) - 150; let bank = '';
  for (let k = 0; k < 16; k++) { const x = (k / 15) * Wd + (R() - .5) * 40, y = topY - 40 - R() * 120, r = 70 + R() * 60; bank += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="url(#mcl)"/>`; }
  bank += `<rect x="-40" y="-80" width="${Wd + 80}" height="${f1(topY - 60 + 80)}" fill="#fff"/>`;
  const nextName = showCh < 9 ? chapterOf((showCh + 1) * 10).split(' · ')[0] : '';
  const lockI = ICON.lock;
  let nodes = '';
  for (let i = 0; i < N; i++) {
    const st = i < cur || (done100 && i === cur) ? 'done' : i === cur ? 'cur' : 'lock', b = PROG.best[i] || 0, big = (i + 1) % 25 === 0, boss = !big && (i + 1) % 10 === 0, hz = st !== 'done' ? HAZ(i) : null;
    if (i % 10 === 0 && i > 0) nodes += `<div class="chapmark" style="top:${f1(bandBot(i / 10) - 14)}px;${pathX(bandBot(i / 10)) > Wd / 2 ? 'left:10px' : 'right:10px'}"><small>Chapter ${i / 10 + 1}</small>${chapterOf(i).split(' · ')[0]}</div>`;
    nodes += `<button class="node ${st}${big ? ' big boss' : boss ? ' boss' : ''} pre" data-i="${i}" style="left:${f1(px(i) - 32)}px;top:${f1(py(i) - 32)}px"><span>${i + 1}</span>${st === 'lock' ? `<i class="lk">${lockI}</i>` : ''}${hz ? `<i class="hz">${hz}</i>` : ''}${PROG.goals[i] ? `<i class="gk">${ICON.check}</i>` : ''}${big ? `<i class="crown">${ICON.crown}</i>` : boss ? `<i class="crown chest">${PROG.chests[i / 10 | 0] ? ICON.chestOpen : ICON.chest}</i>` : ''}<em>${st === 'done' ? [0, 1, 2].map((s) => `<i class="${s < b ? 'on' : ''}"></i>`).join('') : ''}</em></button>`;
  }
  const v = document.createElement('div'); v.className = 'map';
  v.innerHTML = `<div class="maptop"><div class="pill">${ICON.star}<span>${starTotal()}</span></div><div class="pill shp">${ICON.shell}<span>${PROG.shells || 0}</span></div><button class="iconbtn" id="mhome" aria-label="Settings">${ICON.gear}</button></div>
    <div class="chapbar" id="chapbar"></div>
    <div class="scroller"><div class="track" style="width:${Wd}px;height:${Ht}px"><svg width="${Wd}" height="${Ht}" viewBox="0 0 ${Wd} ${Ht}"><defs>${defs}</defs>
      ${water}<rect x="-40" y="-80" width="${Wd + 80}" height="${Ht + 160}" fill="url(#mwv)"/>${swim}${ground}${sorted(lowProps)}${rivers}
      <path d="${path}" fill="none" stroke="#0b2a12" stroke-opacity=".18" stroke-width="50" stroke-linecap="round" stroke-linejoin="round" transform="translate(5 7)"/>
      <path d="${path}" fill="none" stroke="#b78a52" stroke-width="47" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="${path}" fill="none" stroke="#e8c88c" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="${path}" fill="none" stroke="#f7e2b2" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" opacity=".6" transform="translate(-3 -2)"/>
      <path d="${path}" fill="none" stroke="#c49a5e" stroke-width="3.4" stroke-linecap="round" stroke-dasharray="1.5 13" transform="translate(-6 0)"/><path d="${path}" fill="none" stroke="#c49a5e" stroke-width="3.4" stroke-linecap="round" stroke-dasharray="1.5 13" stroke-dashoffset="7" transform="translate(6 0)"/>
      ${fence}${sorted(topProps)}
      <g class="bank">${bank}</g>
    </svg>
    <div class="mclouds">${Array.from({ length: Math.ceil(Ht / 700) }, (_, k) => `<i style="top:${k * 700 + 120}px;left:${(k * 37) % 70}%"></i><i class="s" style="top:${k * 700 + 420}px;left:${(k * 53 + 30) % 80}%"></i>`).join('')}</div>
    ${nodes}<div class="tease" style="top:${f1(topY - 150)}px"><div class="tc">${showCh < 9 ? `<small>Next beach</small><b>${nextName}</b><span>${lockI}Finish chapter ${showCh + 1} to reveal</span>` : `<small>The whole coast</small><b>More beaches coming soon</b><span>${ICON.turtle()}You reached the last beach</span>`}</div></div>
    <i class="meT">${ICON.turtle(skinNow)}</i></div></div>
    <div class="mfront"><i class="fl"></i><i class="fr"></i></div>
    <div class="mapbot"><div class="dkm"><button class="b-gold sq" id="mshop" aria-label="Shop">${ICON.shop}</button><span>Shop</span></div><button class="b-green hero" id="mplay">${ICON.play}${done100 ? 'Replay' : 'Level ' + (cur + 1)}</button><div class="dkm"><button class="b-coral sq" id="mcrew" aria-label="Crew">${ICON.turtle(skinNow)}</button><span>Crew</span></div></div>`;
  $('#app').appendChild(v);
  const sc = v.querySelector('.scroller'), me = v.querySelector('.meT'), bar = v.querySelector('#chapbar'), clouds = v.querySelector('.mclouds'), front = v.querySelector('.mfront');
  const placeMe = (i) => { me.style.left = (px(i) - 26) + 'px'; me.style.top = (py(i) - 84) + 'px'; };
  const from = PROG.mapSeen >= 0 && PROG.mapSeen < cur ? PROG.mapSeen : cur;
  placeMe(from); sc.scrollTop = Math.max(0, py(from) - sc.clientHeight * .58);
  let lastC = -1;
  const drawBar = () => { const mid = sc.scrollTop + sc.clientHeight * .55, c = chOf(mid), dn = chDone(c); if (c === lastC) return; if (lastC >= 0) { buzz(8); tone(note(4 + c), .06, 'triangle', .04); bar.classList.remove('swap'); void bar.offsetWidth; bar.classList.add('swap'); } lastC = c; bar.innerHTML = `<small>Chapter ${c + 1}</small><b>${chapterOf(c * 10)}</b><div class="cb"><div class="seg">${Array.from({ length: 10 }, (_, k) => `<i class="${k < dn ? 'on' : ''}"></i>`).join('')}</div><span class="cico">${PROG.chests[c] ? ICON.chestOpen : ICON.chest}</span></div>`; };
  // scroll impact: parallax clouds, foreground fronds lean with the swipe and spring back
  let raf = 0, lastTop = sc.scrollTop, vel = 0, lean = 0;
  const tick = () => { raf = 0; const t = sc.scrollTop; vel = t - lastTop; lastTop = t; clouds.style.transform = `translate3d(0,${(t * .42).toFixed(1)}px,0)`; lean = clamp(lean * .8 + vel * .25, -9, 9); front.style.setProperty('--lean', lean.toFixed(2) + 'deg'); drawBar(); if (Math.abs(lean) > .05) raf = requestAnimationFrame(tick); };
  sc.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(tick); }, { passive: true }); tick();
  // nodes pop in as they scroll into view (springy, staggered)
  const io = 'IntersectionObserver' in self ? new IntersectionObserver((es) => { let n = 0; for (const e of es) if (e.isIntersecting) { const el = e.target; el.style.animationDelay = (n++ * 40) + 'ms'; el.classList.remove('pre'); el.classList.add('in'); io.unobserve(el); } }, { root: sc, rootMargin: '60px 0px' }) : null;
  v.querySelectorAll('.node').forEach((n) => { if (io) io.observe(n); else n.classList.remove('pre'); });
  if (from !== cur) {   // you unlocked something: the turtle hops there and the lock pops
    const node = v.querySelector(`.node[data-i="${cur}"]`);
    setTimeout(() => {
      sc.scrollTo({ top: Math.max(0, py(cur) - sc.clientHeight * .58), behavior: 'smooth' });
      const a = { l: px(from) - 26, t: py(from) - 84 }, b = { l: px(cur) - 26, t: py(cur) - 84 };
      const anim = me.animate([{ left: a.l + 'px', top: a.t + 'px' }, { left: (a.l + b.l) / 2 + 'px', top: Math.min(a.t, b.t) - 46 + 'px' }, { left: b.l + 'px', top: b.t + 'px' }], { duration: 760, easing: 'cubic-bezier(.45,0,.3,1)' });
      tone(note(5), .08, 'triangle', .05); setTimeout(() => tone(note(7), .08, 'triangle', .05), 380);
      anim.onfinish = () => { placeMe(cur); if (node) { node.classList.add('unlocked'); sfx.ready(); buzz([14, 30, 20]); } };
    }, 520);
  }
  PROG.mapSeen = cur; saveProg(); track('map_open', { lv: cur + 1 });
  const startAt = (i) => { au(); dismiss(v); $('#app').classList.add('playing'); begin(i); running = true; ui.night(); };
  v.querySelectorAll('.node').forEach((n) => { n.onclick = () => { const i = +n.dataset.i; if (i <= cur) startAt(i); else { n.classList.remove('shake'); void n.offsetWidth; n.classList.add('shake'); sfx.uhoh(); buzz(20); ui.toast && ui.toast(`Finish level ${cur + 1} first`); } }; });
  v.querySelector('#mplay').onclick = () => startAt(cur);
  v.querySelector('#mshop').onclick = () => { au(); showShop(); };
  v.querySelector('#mcrew').onclick = () => { au(); showCrew(); };
  v.querySelector('#mhome').onclick = () => { au(); showSettings(); };
}

/* ---------- crew: shell skins bought with shells earned in play ---------- */
function showCrew() {
  const v = document.createElement('div'); v.className = 'veil'; v.style.zIndex = 14; let sel = PROG.skin || 'classic';
  const draw = () => {
    const k = SKINS[sel], own = !!PROG.owned[sel], on = PROG.skin === sel, need = k.price - (PROG.shells || 0);
    v.innerHTML = panel('Crew', `<div class="crewtop"><div class="cprev">${ICON.turtle(sel)}</div><div><b>${k.name}</b><span>${own ? (on ? 'Your hatchlings wear this' : 'Owned') : `${ICON.shell}${k.price} shells`}</span></div><div class="pill shp sm">${ICON.shell}<span>${PROG.shells || 0}</span></div></div>
      <div class="crewgrid">${SKIN_ORDER.map((id) => `<button class="ct ${id === sel ? 'sel' : ''} ${PROG.owned[id] ? 'own' : ''}" data-id="${id}">${ICON.turtle(id)}${PROG.skin === id ? `<i class="eq">${ICON.check}</i>` : PROG.owned[id] ? '' : `<em>${ICON.shell}${SKINS[id].price}</em>`}</button>`).join('')}</div>
      <div class="goal">Earn shells: new stars, bonus goals, golden hatchlings, daily beach</div>
      <div class="btns">${own ? `<button class="b-green hero" id="cx" ${on ? 'disabled' : ''}>${on ? 'Equipped' : 'Wear it'}</button>` : need <= 0 ? `<button class="b-gold hero" id="cb">${ICON.shell}Unlock · ${k.price}</button>` : `<button class="b-navy" id="cs">${ICON.shell}${need} more shells · Shop</button>`}<button class="b-navy" id="cc">Back</button></div>`);
    v.querySelectorAll('.ct').forEach((b) => { b.onclick = () => { sel = b.dataset.id; tone(note(3 + SKIN_ORDER.indexOf(sel)), .08, 'triangle', .06); buzz(8); draw(); }; });
    const x = v.querySelector('#cx'); if (x) x.onclick = () => { PROG.skin = sel; setSkin(sel); saveProg(); sfx.ready(); buzz([12, 30, 12]); track('skin_equip', { skin: sel }); draw(); refreshHome(); };
    const bb = v.querySelector('#cb'); if (bb) bb.onclick = () => { if ((PROG.shells || 0) < k.price) return; PROG.shells -= k.price; PROG.owned[sel] = 1; PROG.skin = sel; setSkin(sel); saveProg(); sfx.gold(); burstUI(v.querySelector('.cprev')); track('skin_buy', { skin: sel, price: k.price }); draw(); refreshHome(); };
    const cs = v.querySelector('#cs'); if (cs) cs.onclick = () => { au(); showShop(); };
    v.querySelector('#cc').onclick = () => { au(); dismiss(v); };
  };
  draw(); $('#app').appendChild(v);
}
function burstUI(el) { if (!el) return; el.classList.remove('boom'); void el.offsetWidth; el.classList.add('boom'); }
/* ---------- field guide: every fact you've met, collected ---------- */
const GUIDE = [['litter', 'bottle', 'Beach trash'], ['castle', 'castle', 'Sandcastles'], ['crab', 'crab', 'Ghost crabs'], ['tangle', 'wind', 'Bags and lines'], ['hole', 'target', 'Holes'], ['wave', 'wave', 'The swim frenzy'], ['gull', 'gull', 'Seabirds'], ['light', 'lamp', 'Torches'], ['rain', 'rain', 'Storms'], ['chair', 'chair', 'Beach chairs'], ['lamp', 'lamp', 'Lights out'], ['gear', 'ball', 'Beach toys'], ['heat', 'sun', 'Hot sand'], ['net', 'net', 'Ghost nets'], ['dog', 'dog', 'Dogs'], ['tide', 'wave', 'King tides'], ['rut', 'rut', 'Tyre ruts'], ['moon', 'moon', 'Moonlight'], ['hands', 'heart', 'Hands off']];
function showGuide() {
  const v = document.createElement('div'); v.className = 'veil'; v.style.zIndex = 14; const got = GUIDE.filter(([k]) => PROG.facts[k]).length;
  v.innerHTML = panel('Field guide', `<div class="lbl">${got} of ${GUIDE.length} found</div><div class="gbar"><i style="width:${Math.round(got / GUIDE.length * 100)}%"></i></div>
    <div class="glist">${GUIDE.map(([k, ic, t]) => PROG.facts[k] ? `<div class="gi"><div class="gic">${ICON[ic] || ICON.leaf}</div><div><b>${t}</b><p>${FACTCARD[k]}</p></div></div>` : `<div class="gi lock"><div class="gic">${ICON[ic] || ICON.leaf}</div><div><b>???</b><p>Meet it on the beach to unlock</p></div></div>`).join('')}</div>
    <div class="btns"><button class="b-green hero" id="gx">Done</button></div>`);
  $('#app').appendChild(v); v.querySelector('#gx').onclick = () => { au(); dismiss(v); }; PROG.guideSeen = got; saveProg(); refreshHome();
}
/* ---------- daily beach ---------- */
const dayNo = () => Math.floor((Date.now() - new Date().getTimezoneOffset() * 6e4) / 864e5);
function showDaily() {
  const v = document.createElement('div'); v.className = 'veil'; v.style.zIndex = 14; const done = PROG.dailyDone === today();
  v.innerHTML = panel('Daily beach', `<div class="dhero">${ICON.daily}</div><div class="lbl">A new beach every day</div>
    <div class="goal">${done ? `${ICON.check}Cleared today. Play again for fun` : `Clear it for <b>+8</b>${ICON.shell} and a golden hatchling`}</div>
    <div class="btns"><button class="b-green hero" id="dg">${ICON.play}Play today's beach</button><button class="b-navy" id="dc">Back</button></div>`);
  $('#app').appendChild(v);
  v.querySelector('#dc').onclick = () => { au(); dismiss(v); };
  v.querySelector('#dg').onclick = () => { au(); dismiss(v); document.querySelectorAll('.map').forEach((m) => m.remove()); if ($('#start')) { $('#start').classList.add('out'); setTimeout(() => $('#start') && $('#start').remove(), 500); } started = true; attract = false; $('#app').classList.add('playing'); begin(100000 + dayNo()); running = true; ui.night(); };
}
function showSettings() {
  const v = document.createElement('div'); v.className = 'veil'; v.style.zIndex = 14;
  const draw = () => {
    v.innerHTML = panel('Settings', `<div class="tog"><button class="b-teal ${muted ? 'off' : ''}" id="st1">${muted ? ICON.sndOff : ICON.sndOn}${muted ? 'Sound off' : 'Sound on'}</button><button class="b-teal ${hapOn ? '' : 'off'}" id="st2">${ICON.vib}${hapOn ? 'Buzz on' : 'Buzz off'}</button></div>
      <div class="goal">${ICON.star}<b>${starTotal()}</b> stars · <b>${PROG.saved}</b> turtles guided home</div>
      <button class="b-navy wide" id="st3">${ICON.save}Move my progress</button>
      ${fieldNote('Facts in Shell Run come from sea turtle conservation groups such as Leave No Trace and the State of the World\'s Sea Turtles. <a href="privacy.html" target="_blank" rel="noopener">Privacy</a>', 'About')}
      <div class="btns"><button class="b-green hero" id="sx">Done</button></div>`);
    v.querySelector('#st1').onclick = () => { au(); setMuted(!muted); $('#snd').innerHTML = muted ? ICON.sndOff : ICON.sndOn; draw(); };
    v.querySelector('#st2').onclick = () => { setHaptics(!hapOn); if (hapOn) buzz(30); draw(); };
    v.querySelector('#st3').onclick = () => { au(); showSaveCode(); };
    v.querySelector('#sx').onclick = () => { au(); dismiss(v); };
  };
  draw(); $('#app').appendChild(v);
}
/* save code: progress travels between phones without accounts */
function showSaveCode() {
  const v = document.createElement('div'); v.className = 'veil'; v.style.zIndex = 16; let code = '';
  try { code = 'SR1-' + btoa(unescape(encodeURIComponent(JSON.stringify(PROG)))); } catch (e) {}
  v.innerHTML = panel('Move progress', `<div class="lbl">Your save code</div><textarea class="code" readonly>${code}</textarea>
    <div class="btns"><button class="b-teal" id="cp">Copy code</button></div>
    <div class="lbl" style="margin-top:12px">Paste a code from another phone</div><textarea class="code" id="ci" placeholder="SR1-…"></textarea>
    <div class="btns"><button class="b-gold" id="cl">Load this code</button><button class="b-navy" id="cq">Back</button></div><div class="demo" id="cmsg"></div>`);
  $('#app').appendChild(v); const msg = v.querySelector('#cmsg');
  v.querySelector('#cp').onclick = () => { const t = v.querySelector('.code'); t.select(); try { navigator.clipboard.writeText(code).then(() => { msg.textContent = 'Copied!'; }, () => { document.execCommand('copy'); msg.textContent = 'Copied!'; }); } catch (e) { document.execCommand('copy'); msg.textContent = 'Copied!'; } buzz(10); };
  v.querySelector('#cl').onclick = () => { const s = v.querySelector('#ci').value.trim(); try { if (!s.startsWith('SR1-')) throw 0; const d = JSON.parse(decodeURIComponent(escape(atob(s.slice(4))))); if (typeof d.unlocked !== 'number') throw 0; localStorage.setItem('shellrun.v1', JSON.stringify(d)); msg.textContent = 'Loaded! Restarting…'; setTimeout(() => location.reload(), 700); } catch (e) { msg.textContent = 'That code did not work. Check it and try again.'; sfx.uhoh(); } };
  v.querySelector('#cq').onclick = () => { au(); dismiss(v); };
}

/* ---------- pause ---------- */
$('#pauseB').innerHTML = ICON.pause;
ui.pause = function () {
  if (paused || !running || ended || attract || !started || PLAY) return;
  paused = true; const v = document.createElement('div'); v.className = 'veil';
  const need = Math.ceil(total * .7);
  const draw = () => {
    v.innerHTML = panel('Paused', `<div class="lbl">${isDaily(night) ? 'Daily beach' : 'Level ' + (night + 1)} · ${spec.name}</div>
      <div class="prog"><div class="bar"><i style="width:${Math.round(safeN / total * 100)}%"></i><em style="left:${(need / total * 100).toFixed(1)}%"></em></div><b>${safeN} / ${total}</b></div>
      <div class="goal">Save <b>${need}</b> to pass · <b>${Math.max(0, allowedLoss() - lostN)}</b> heart${allowedLoss() - lostN === 1 ? '' : 's'} left</div>
      ${goal ? `<div class="bonus ${goalMet() ? 'met' : ''}">${goalMet() ? ICON.check : ICON.target}<span>${goal.t}</span></div>` : ''}
      ${fieldNote(FACTCARD[levelFacts[levelFacts.length - 1]] || 'You can\'t steer the turtles. The obstacles are man-made, so we can remove them.', levelFacts.length ? 'Turtle fact' : 'Remember')}
      <div class="btns"><button class="b-green hero" id="pr">${ICON.play}Resume</button>
      <div class="duo"><button class="b-navy" id="prs">${ICON.retry}Restart</button><button class="b-navy" id="pm">${ICON.map}Map</button></div>
      <div class="tog"><button class="b-teal ${muted ? 'off' : ''}" id="pt1">${muted ? ICON.sndOff : ICON.sndOn}${muted ? 'Sound off' : 'Sound on'}</button><button class="b-teal ${hapOn ? '' : 'off'}" id="pt2">${ICON.vib}${hapOn ? 'Buzz on' : 'Buzz off'}</button></div></div>`);
    const close = () => { dismiss(v); paused = false; };
    v.querySelector('#pr').onclick = () => { au(); close(); };
    v.querySelector('#prs').onclick = () => { au(); close(); Object.assign(season, snap.season); begin(night); };
    v.querySelector('#pm').onclick = () => { au(); close(); running = false; powerKind = null; ui.power(); track('quit', { lv: night + 1, safe: safeN, total, t: Math.round(nightT) }); showMap(); };
    v.querySelector('#pt1').onclick = () => { au(); setMuted(!muted); $('#snd').innerHTML = muted ? ICON.sndOff : ICON.sndOn; draw(); };
    v.querySelector('#pt2').onclick = () => { setHaptics(!hapOn); if (hapOn) buzz(30); draw(); };
  };
  draw(); $('#ov').appendChild(v);
};
$('#pauseB').onclick = (e) => { e.stopPropagation(); au(); ui.pause(); };
document.addEventListener('visibilitychange', () => { if (document.hidden && !CLEAN) ui.pause(); });
addEventListener('keydown', (e) => { if (e.key === 'Escape' || e.key === 'p') { const r = document.querySelector('#pr'); if (r) r.click(); else ui.pause(); } });

/* ---------- boost button ---------- */
const powerIcon = (k) => k === 'surge' ? (sunny() ? ICON.sunRush : ICON.surge) : k === 'flip' ? ICON.flipG : k === 'ranger' ? ICON.ranger : ICON.clean;
ui.power = function () {
  const b = $('#power'); if (!powerKind || attract || !started) { b.classList.remove('on', 'ready'); return; }
  b.classList.add('on'); b.classList.toggle('ready', powerReady); b.style.setProperty('--p', Math.round((powerReady ? 1 : charge) * 100));
  $('#powerIn').innerHTML = powerIcon(powerKind); const c = $('#powerCnt'); c.textContent = '×' + PROG.boosts; c.style.display = PROG.boosts > 0 ? 'grid' : 'none';
};
$('#power').onclick = (e) => { e.stopPropagation(); au(); if (paused) return; if (!usePower()) { ui.cap('Help turtles to fill the ring', 1.6); buzz(20); sfx.uhoh(); } };

/* ---------- facts: collected at the moment of the action, shown in pause, results and the Field guide ---------- */
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
  hands: 'In real life, never pick up a hatchling. Clear its path and let it crawl on its own.',
  wave: 'Once they reach the water, hatchlings swim almost nonstop for a day or more. Scientists call it the swim frenzy.',
  chair: 'Beach chairs left out overnight can block nesting mothers and trap hatchlings. Stack them away at night.',
  lamp: 'Artificial lights pull hatchlings away from the sea. Many coastal towns switch lights off during nesting season.',
  heat: 'Hot sand is dangerous for hatchlings, which is why most of them emerge at night when the sand is cooler.',
  net: 'Lost and abandoned fishing nets, called ghost nets, can keep trapping sea life for years.',
  dog: 'Dogs on nesting beaches can dig up nests and chase hatchlings. Keep pets on a leash.',
  tide: 'Very high tides can wash over nests, so trained conservation teams sometimes move nests higher up the beach.',
  rut: 'Tyre ruts from vehicles driven on the sand can trap hatchlings on their way to the sea.',
  moon: 'Hatchlings head for the brightest, lowest horizon. On a natural beach that is the moonlit sea.'
};
let levelFacts = [];
ui.fact = function (key) {
  if (attract || !FACTCARD[key]) return; if (!levelFacts.includes(key)) levelFacts.push(key); if (!PROG.facts[key]) { PROG.facts[key] = 1; saveProg(); if (!PLAY) ui.toast(`${ICON.guide}<b>New in your Field guide</b>`); }
};
let toastTO = 0;
ui.toast = function (html) { if (CLEAN) return; const t = $('#toast'); t.innerHTML = html; t.classList.add('on'); clearTimeout(toastTO); toastTO = setTimeout(() => t.classList.remove('on'), 1800); };

/* ---------- shop (demo store until the app wraps real purchases) ---------- */
function showShop() {
  const v = document.createElement('div'); v.className = 'veil'; v.style.zIndex = 15;
  const draw = () => {
    const offer = (id, ic, bg, t, sub, btn, cls, off, best) => `<div class="offer"><div class="ic" style="background:${bg}">${ic}</div><div style="flex:1;min-width:0"><b>${t}${best ? '<i class="best">BEST VALUE</i>' : ''}</b><span>${sub}</span></div><button class="${cls}" id="${id}" ${off ? 'disabled' : ''}>${btn}</button></div>`;
    v.innerHTML = panel('Shop', `<div class="wallet"><span>${ICON.bolt}<b>${PROG.boosts}</b> boosts</span><span>${ICON.shell}<b>${PROG.shells || 0}</b> shells</span></div>
      ${offer('b0', ICON.ad, 'linear-gradient(#63e1d5,#1a95a8)', 'Free boost', 'Watch a short video', 'Watch', 'b-teal', false)}
      ${offer('b4', ICON.shell, 'linear-gradient(#ffd3e0,#ef7097)', '120 shells', 'Unlock Crew skins sooner', '$0.99', 'b-gold', false)}
      ${offer('b1', ICON.bolt, 'linear-gradient(#3a5a8e,#1d3558)', '5 boosts', 'Fire the level power any time', '$0.99', 'b-gold', false)}
      ${offer('b2', ICON.chestOpen, 'linear-gradient(#3a5a8e,#1d3558)', '20 boosts + 300 shells', 'The big beach bundle', '$4.99', 'b-gold', false, true)}
      ${offer('b3', ICON.ad, 'linear-gradient(#ff9c7d,#dc4f34)', 'No level ads', 'Videos stay optional', PROG.noAds ? 'Owned' : '$2.99', 'b-gold', PROG.noAds)}
      <div class="demo">DEMO STORE · NO REAL CHARGES</div>
      <div class="btns"><button class="b-navy" id="bc">Back</button></div>`);
    v.querySelector('#bc').onclick = () => { au(); dismiss(v); };
    const add = (n, sh, id) => { PROG.boosts += n; PROG.shells = (PROG.shells || 0) + (sh || 0); saveProg(); sfx.win(); buzz([20, 30, 20]); track('purchase_tap', { id }); draw(); refreshHome(); };
    v.querySelector('#b1').onclick = () => add(5, 0, 'boost5'); v.querySelector('#b2').onclick = () => add(20, 300, 'bundle'); v.querySelector('#b4').onclick = () => add(0, 120, 'shells120');
    v.querySelector('#b3').onclick = () => { PROG.noAds = true; saveProg(); sfx.win(); track('purchase_tap', { id: 'noads' }); draw(); };
    v.querySelector('#b0').onclick = (e) => { e.currentTarget.disabled = true; Ads.rewarded('shop_boost', () => add(1, 0, 'ad_boost')); setTimeout(draw, 3500); };
  };
  draw(); $('#app').appendChild(v);
}

/* ---------- loop + boot ---------- */
let last = 0, booted = false, started = false, lastRaw = 0;
const TS = clamp(+(Q.get('ts') || 1) | 0, 1, 8);   // test-only time scale for bots
const PLAY = Q.get('mode') === 'playable' || !!self.PLAYABLE_AD;   // the ad build (see playable.js)
let playTick = null;
function loop(ts) {
  const raw = Math.min(.05, (ts - last) / 1000 || 0); last = ts; lastRaw = raw;
  if (slowT > 0) { slowT -= raw; if (slowT <= 0) slow = 1; }
  let dt = raw * (lastOne ? .62 : 1) * slow;
  if (freeze > 0) { freeze -= raw; dt = 0; }
  if (playTick) dt = playTick(raw, dt);
  if (capT > 0 && capT < 90 && (capT -= raw) <= 0) ui.capOff();
  if (capT >= 90 && !hand && !T.some((t) => t.st === 'flip' || t.st === 'carried' || t.st === 'tangle') && !gulls.some((g) => g.st === 'dive')) capT = 1.2;
  if (!paused) for (let s = 0; s < TS; s++) update(dt); updateSea(time); updatePrints(); updateParts(dt); sync(); placeCam(raw);
  R.render(scene, cam); overlay();
  if (!booted) { booted = true; $('#load').remove(); }
  requestAnimationFrame(loop);
}
self.onHorizon = buildSky;
['gesturestart', 'gesturechange', 'dblclick', 'contextmenu'].forEach((ev) => document.addEventListener(ev, (e) => e.preventDefault(), { passive: false }));
document.addEventListener('touchmove', (e) => { if (e.touches && e.touches.length > 1) e.preventDefault(); }, { passive: false });
resize();
setSkin(PROG.skin); if (CLEAN) $('#app').classList.add('clean');
function refreshHome() {
  if (!$('#start')) return;
  $('#title').innerHTML = TURT(PROG.skin) + 'Shell Run';
  $('#go').innerHTML = ICON.play + (PROG.unlocked ? 'Continue' : 'Play');
  $('#where').innerHTML = `${ICON.pin}${chapterOf(Math.min(PROG.unlocked, LAST_LEVEL - 1)).split(' · ')[0]} · Level ${Math.min(PROG.unlocked + 1, LAST_LEVEL)}`;
  $('#hmap i').innerHTML = ICON.map; $('#hcrew i').innerHTML = TURT(PROG.skin); $('#hguide i').innerHTML = ICON.guide; $('#hshop i').innerHTML = ICON.shop; $('#gear').innerHTML = ICON.gear; $('#daily').innerHTML = ICON.daily + '<span>Daily</span>' + (PROG.dailyDone !== today() && PROG.unlocked >= 3 ? '<b></b>' : '');
  const got = GUIDE.filter(([k]) => PROG.facts[k]).length; $('#hguide em').style.display = got > (PROG.guideSeen || 0) ? '' : 'none';
  const nextSkin = SKIN_ORDER.find((id) => !PROG.owned[id]); $('#hcrew em').style.display = nextSkin && (PROG.shells || 0) >= SKINS[nextSkin].price ? '' : 'none';
  $('#daily').style.display = PROG.unlocked >= 3 ? '' : 'none';
}
(function title() {
  const td = today(), y = new Date(Date.now() - 864e5).toDateString();
  PROG.sessions = (PROG.sessions || 0) + 1;
  if (PROG.lastDay !== td) { PROG.streak = PROG.lastDay === y ? PROG.streak + 1 : 1; PROG.lastDay = td; const g = Math.min(30, 5 + PROG.streak * 5); PROG.shells = (PROG.shells || 0) + g; PROG.gift = g; } else PROG.gift = 0;
  saveProg(); track('session', { n: PROG.sessions, lv: PROG.unlocked + 1 });
  $('#tagstats').innerHTML = `<span class="chip">${ICON.flame}Day ${PROG.streak}</span>${PROG.saved ? `<span class="chip">${ICON.turtle(PROG.skin)}${PROG.saved} home</span>` : ''}${PROG.gift ? `<span class="chip gift">${ICON.shell}+${PROG.gift} shells</span>` : ''}`;
  refreshHome();
})();
const n0 = Q.has('n') ? Math.max(0, +Q.get('n') | 0) : 0;
if (PLAY) { /* playable.js takes over */ } else if (Q.has('n')) { begin(n0); running = false; } else { attract = true; begin(-1); running = true; }
requestAnimationFrame(loop);
function enter(toMap) { au(); buzz([12, 40, 18]); $('#start').classList.add('out'); setTimeout(() => $('#start') && $('#start').remove(), 500); started = true; const was = attract; attract = false; Object.assign(season, { met: 0, saved: 0, spawned: 0, binned: 0 }); if (!toMap && (PROG.unlocked === 0 || Q.has('n'))) { $('#app').classList.add('playing'); if (was) begin(Q.has('n') ? n0 : 0); running = true; ui.night(); } else { if (was) running = false; showMap(); } }
$('#go').onclick = () => enter(false);
$('#hmap').onclick = () => enter(true);
$('#hcrew').onclick = () => { au(); showCrew(); };
$('#hguide').onclick = () => { au(); showGuide(); };
$('#hshop').onclick = () => { au(); showShop(); };
$('#gear').onclick = () => { au(); showSettings(); };
$('#daily').onclick = () => { au(); showDaily(); };
self.G = {
  forceEnd: (s, l) => { safeN = s; lostN = l; running = false; ended = true; endNight(); }, showCrew: () => showCrew(), showSettings: () => showSettings(), showGuide, showDaily, showSaveCode, pause: () => ui.pause(),
  dolGo: () => { dol.next = 0; }, wave: (b) => startWave(b !== false), drop: (k) => dropPickup(0, 0, k),
  get T() { return T; }, get litter() { return litter; }, get balls() { return balls; }, get rocks() { return rocks; }, get crabs() { return crabs; }, get gulls() { return gulls; }, get logs() { return logs; }, get tourists() { return tourists; }, get lamps() { return lamps; }, get dogs() { return dogs; }, get pickups() { return pickups; }, get waveSt() { return wave.st; },
  tap, scr, groundAt, surfaceTap, get running() { return running; }, get night() { return night; }, get safe() { return safeN; }, get lost() { return lostN; }, get total() { return total; }, get binned() { return binnedN; },
  get season() { return season; }, get carry() { return carry; }, get surf() { return surfLog; }, get bin() { return bin; }, get shoreZ() { return SHORE_Z; }, time: () => time,
  info: () => ({ calls: R.info.render.calls, tris: R.info.render.triangles, geos: R.info.memory.geometries, tex: R.info.memory.textures }), levels: LAST_LEVEL, begin, levelSpec, usePower, showShop, showMap, get power() { return { kind: powerKind, charge, ready: powerReady, surge: surgeT, ranger: rangerT }; }, get paused() { return paused; }, fact: (k) => ui.fact(k), PROG, get spec() { return spec; }, get goal() { return goal; }, goalMet: () => goalMet(), setSkin
};
