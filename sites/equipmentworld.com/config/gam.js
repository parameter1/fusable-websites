const configureGAM = require('@randall-reilly/package-global/config/gam');

const config = configureGAM({ basePath: 'eqw' });

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
  ])
  .setAliasAdUnits('contractor-of-the-year', [
    { name: 'leaderboard', templateName: 'LEADERBOARD', path: 'coty-leaderboard' },
    { name: 'inline-leaderboard-mobile', templateName: 'INLINE-LEADERBOARD-MOBILE', path: 'coty-leaderboard' },
    { name: 'leaderboard-desktop', templateName: 'LEADERBOARD-DESKTOP', path: 'coty-leaderboard' },
    { name: 'rotation-desktop', templateName: 'ROTATION-DESKTOP', path: 'coty-rotation' },
    { name: 'rotation', templateName: 'GEAR', path: 'coty-rotation' },
    { name: 'inline-content-mobile', templateName: 'INLINE-CONTENT-MOBILE', path: 'coty-rotation' },
    { name: 'inline-content-desktop', templateName: 'INLINE-CONTENT-DESKTOP', path: 'coty-rotation' },
  ]);

const aliases = [
  'business',
  'workforce',
  'economic-trends',
  'regulations',
  'trucks',
  'alternative-power',
  'equipment-controls',
  'maintenance',
  'technology',
  'heavy-equipment',
  'roadbuilding-equipment',
  'compact-equipment',
  'attachments',
  'aerial-lifting-equipment',
  'light-equipment',
  'landscaping-equipment',
];

aliases.forEach((alias) => config.setAliasAdUnits(alias, [
  { name: 'leaderboard', templateName: 'LEADERBOARD', path: `${alias}-leaderboard` },
  { name: 'inline-leaderboard-mobile', templateName: 'INLINE-LEADERBOARD-MOBILE', path: `${alias}-leaderboard` },
  { name: 'leaderboard-desktop', templateName: 'LEADERBOARD-DESKTOP', path: `${alias}-leaderboard` },
  { name: 'rotation-desktop', templateName: 'ROTATION-DESKTOP', path: `${alias}-rotation` },
  { name: 'rotation', templateName: 'ROTATION', path: `${alias}-rotation` },
  { name: 'inline-content-mobile', templateName: 'INLINE-CONTENT-MOBILE', path: `${alias}-rotation` },
  { name: 'inline-content-desktop', templateName: 'INLINE-CONTENT-DESKTOP', path: `${alias}-rotation` },
]));

module.exports = config;
