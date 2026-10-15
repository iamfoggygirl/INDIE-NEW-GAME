/* ===================== LOOKS: moods (art sheet 16) x terrains. Pure data; world.js paints with it ===================== */
const MOODS = {
  night: { sky: ['#060e22', '#12203A', '#203c66', '#2c5080', '#22406b'], fog: '#22406b', hemi: [0xaabbe6, 0x6a5538, .48], key: [0xffe2b4, .66], rim: [0xbfd8ff, .32], sea: ['#38aaa8', '#17808e', '#0E5E70', '#123556', 0x03182a], disc: [0xffffff, .15, 1, 1], stars: 1, glit: [0xfff1c4, .6], lant: 1, clouds: 0, rain: 0, house: 1, rough: .95 },
  dusk: { sky: ['#2b2459', '#74406a', '#d8704f', '#f9a64f', '#7a4a60'], fog: '#7a4a60', hemi: [0xffd0b0, 0x7a5238, .5], key: [0xffb26e, .72], rim: [0xff9fa8, .34], sea: ['#44b0a8', '#2b8f9a', '#1b6280', '#1b3a62', 0x1a0c20], disc: [0xffd9a0, .08, 1.15, 1], stars: .5, glit: [0xffb36b, .55], lant: .9, clouds: 1, rain: 0, house: 1, rough: .95 },
  dawn: { sky: ['#78b4d8', '#a8d6e2', '#f4d8b6', '#fbe4bc', '#8fd0d2'], fog: '#8fd0d2', hemi: [0xfff4e0, 0x8a7a5a, .56], key: [0xfff0d0, .6], rim: [0xdff2ff, .3], sea: ['#74d2c8', '#4ab8c0', '#2c92aa', '#1f6c92', 0x082030], disc: [0xfff0a8, .05, 1.35, 1], stars: 0, glit: [0xfff7d0, .65], lant: .2, clouds: 1, rain: 0, house: 0, rough: .95 },
  storm: { sky: ['#0a1124', '#1b2a44', '#31465f', '#3f5873', '#2c4860'], fog: '#2c4860', hemi: [0x93a8cc, 0x4a4234, .62], key: [0xc9d5ee, .62], rim: [0xa8c0e8, .3], sea: ['#2f8f94', '#1c707e', '#104c62', '#0e2e4a', 0x041420], disc: [0xd8dcc0, .16, .9, .85], stars: 0, glit: [0xdde8d0, .32], lant: 1, clouds: 2, rain: 1, house: 1, rough: .55 }
};
const TERRAINS = {
  gold: { sand: '#E6CFA0', wet: '#B89B70', under: '#7f6c4c', dune: '#dcc08c' },
  blush: { sand: '#EFC4A4', wet: '#B68A72', under: '#7b5a50', dune: '#e4b08e' },
  pale: { sand: '#EEE7D3', wet: '#B7AE98', under: '#8a8270', dune: '#d9d1bd' },
  dark: { sand: '#A89B8B', wet: '#6c6258', under: '#4d463f', dune: '#928676' }
};
let LK = MOODS.night, TR = TERRAINS.gold;
