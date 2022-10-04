const configureGAM = require('@randall-reilly/package-global/config/gam');

const config = configureGAM({ basePath: 'hwt' });

config
  .setAliasAdUnits('default', [
    { name: 'leaderboard', templateName: 'LEADERBOARD', path: 'leaderboard' },
    { name: 'inline-leaderboard-mobile', templateName: 'INLINE-LEADERBOARD-MOBILE', path: 'leaderboard' },
    { name: 'leaderboard-desktop', templateName: 'LEADERBOARD-DESKTOP', path: 'leaderboard' },
    { name: 'rotation-desktop', templateName: 'ROTATION-DESKTOP', path: 'rotation' },
    { name: 'rotation', templateName: 'ROTATION', path: 'rotation' },
    { name: 'rail-1', templateName: 'GEAR', path: 'rail-1' },
    { name: 'inline-content-mobile', templateName: 'INLINE-CONTENT-MOBILE', path: 'rotation' },
    { name: 'inline-content-desktop', templateName: 'INLINE-CONTENT-DESKTOP', path: 'rotation' },
    { name: 'wallpaper-left', templateName: 'WALLPAPER', path: 'wallpaper-left' },
    { name: 'wallpaper-right', templateName: 'WALLPAPER', path: 'wallpaper-right' },
  ]);

const aliases = [
  'trucks',
  'alternative-power',
  'maintenance',
  'technology',
];

aliases.forEach(alias => config.setAliasAdUnits(alias, [
  { name: 'leaderboard', templateName: 'LEADERBOARD', path: `${alias}-leaderboard` },
  { name: 'inline-leaderboard-mobile', templateName: 'INLINE-LEADERBOARD-MOBILE', path: `${alias}-leaderboard` },
  { name: 'leaderboard-desktop', templateName: 'LEADERBOARD-DESKTOP', path: `${alias}-leaderboard` },
  { name: 'rotation-desktop', templateName: 'ROTATION-DESKTOP', path: `${alias}-rotation` },
  { name: 'rotation', templateName: 'ROTATION', path: `${alias}-rotation` },
  { name: 'inline-content-mobile', templateName: 'INLINE-CONTENT-MOBILE', path: `${alias}-rotation` },
  { name: 'inline-content-desktop', templateName: 'INLINE-CONTENT-DESKTOP', path: `${alias}-rotation` },
]));

module.exports = config;
