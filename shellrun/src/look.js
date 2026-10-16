/* ===================== LOOKS: moods (art sheet 16) x terrains. Pure data; world.js paints with it ===================== */
const MOODS = {
  night: { sky: ['#060e22', '#12203A', '#203c66', '#2c5080', '#22406b'], fog: '#22406b', hemi: [0xaabbe6, 0x6a5538, .48], key: [0xffe2b4, .66], rim: [0xbfd8ff, .32], sea: ['#38aaa8', '#17808e', '#0E5E70', '#123556', 0x03182a], disc: [0xffffff, .15, 1, 1], stars: 1, glit: [0xfff1c4, .6], lant: 1, clouds: 0, rain: 0, house: 1, rough: .95 },
  dusk: { sky: ['#2b2459', '#74406a', '#d8704f', '#f9a64f', '#7a4a60'], fog: '#7a4a60', hemi: [0xffd0b0, 0x7a5238, .5], key: [0xffb26e, .72], rim: [0xff9fa8, .34], sea: ['#44b0a8', '#2b8f9a', '#1b6280', '#1b3a62', 0x1a0c20], disc: [0xffd9a0, .08, 1.15, 1], stars: .5, glit: [0xffb36b, .55], lant: .9, clouds: 1, rain: 0, house: 1, rough: .95 },
  dawn: { sky: ['#78b4d8', '#a8d6e2', '#f4d8b6', '#fbe4bc', '#8fd0d2'], fog: '#8fd0d2', hemi: [0xfff4e0, 0x8a7a5a, .56], key: [0xfff0d0, .6], rim: [0xdff2ff, .3], sea: ['#74d2c8', '#4ab8c0', '#2c92aa', '#1f6c92', 0x082030], disc: [0xfff0a8, .05, 1.35, 1], stars: 0, glit: [0xfff7d0, .65], lant: .2, clouds: 1, rain: 0, house: 0, rough: .95, sun: 1 },
  storm: { sky: ['#0a1124', '#1b2a44', '#31465f', '#3f5873', '#2c4860'], fog: '#2c4860', hemi: [0x93a8cc, 0x4a4234, .62], key: [0xc9d5ee, .62], rim: [0xa8c0e8, .3], sea: ['#2f8f94', '#1c707e', '#104c62', '#0e2e4a', 0x041420], disc: [0xd8dcc0, .16, .9, .85], stars: 0, glit: [0xdde8d0, .32], lant: 1, clouds: 2, rain: 1, house: 1, rough: .55 },
  // sunrise: the sand heats up as the sun climbs, so hatchlings slow down (art strip panel 2)
  sunrise: { sky: ['#4a5aa8', '#b88ac0', '#f7a58a', '#ffd49a', '#f2b49a'], fog: '#e8b4a0', hemi: [0xffd8c0, 0x7a5a40, .5], key: [0xffc890, .62], rim: [0xffb0a0, .3], sea: ['#62ccc4', '#3aa8b8', '#2a80a0', '#2a5c88', 0x10202e], disc: [0xffd890, .02, 1.7, 1], stars: 0, glit: [0xffc890, .75], lant: .25, clouds: 1, cloudC: ['#ffc0b0', '#e994a8'], rain: 0, house: 1, rough: .95, sun: 1, heat: 1 },
  // fog: low visibility, the lighthouse beam sweeps the beach (art strip panel 3)
  fog: { sky: ['#5f6b7c', '#8a95a3', '#aab3bb', '#c2c8cc', '#a9b2b8'], fog: '#a9b2b8', fogN: 13, fogF: 40, hemi: [0xdde4ec, 0x6a6050, .68], key: [0xf0f0e8, .5], rim: [0xd0dce8, .3], sea: ['#5aa6a6', '#3d8a92', '#2c6a7a', '#3a5e70', 0x0a1a24], disc: [0xffffff, .1, .9, .3], stars: 0, glit: [0xe0e8e8, .22], lant: 1, clouds: 0, rain: 0, house: 1, rough: .9, mist: 1 },
  // full moon: bright night, glowing hatchlings, moonlight guides them (art strip panel 5)
  moon: { sky: ['#050d24', '#0f2650', '#24508a', '#3a70a8', '#284f80'], fog: '#284f80', hemi: [0xa8bce8, 0x5a4a38, .52], key: [0xffe6c4, .62], rim: [0xbfe0ff, .44], sea: ['#3fc8c4', '#1a8e9e', '#10607a', '#123a60', 0x063040], disc: [0xffffff, .13, 1.3, 1], stars: 1, glit: [0xeaf6ff, .9], lant: .6, clouds: 0, rain: 0, house: 1, rough: .9, glow: 1 },
  // gale: storm with a strong cross wind, bending palms and spray (art strip panel 4)
  gale: { sky: ['#0d1520', '#1f2e3c', '#3a4d58', '#4a606a', '#33505a'], fog: '#33505a', hemi: [0x9fb0c4, 0x4a4234, .64], key: [0xd0dae8, .6], rim: [0xa8c0e8, .32], sea: ['#2f9494', '#1c747e', '#105062', '#0e304a', 0x041420], disc: [0xd8dcc0, .16, .9, .6], stars: 0, glit: [0xdde8d0, .3], lant: 1, clouds: 2, rain: 1, house: 1, rough: .55, gale: 1 }
};
const TERRAINS = {
  gold: { sand: '#E6CFA0', wet: '#B89B70', under: '#7f6c4c', dune: '#dcc08c' },
  blush: { sand: '#EFC4A4', wet: '#B68A72', under: '#7b5a50', dune: '#e4b08e' },
  pale: { sand: '#EEE7D3', wet: '#B7AE98', under: '#8a8270', dune: '#d9d1bd' },
  dark: { sand: '#A89B8B', wet: '#6c6258', under: '#4d463f', dune: '#928676' },
  volcanic: { sand: '#5d5853', wet: '#3c3835', under: '#272422', dune: '#6c665e', glint: 1 },
  coral: { sand: '#EADBCB', wet: '#bfa999', under: '#8f7f78', dune: '#dccab8' },
  dune: { sand: '#EBD6A4', wet: '#bba476', under: '#7f6c4c', dune: '#e2c48c' }
};
let LK = MOODS.night, TR = TERRAINS.gold;
