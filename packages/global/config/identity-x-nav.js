const { isArray } = Array;

module.exports = ({ site }) => {
  const idxConfig = site.get('identityX');

  const enabled = site.get('idxNavItems.enable');
  if (!enabled) return;
  const defaultTargets = [
    'navigation.desktopMenu.user',
  ];
  const targets = site.getAsArray('idxNavItems.navigationTargets').length ? site.getAsArray('idxNavItems.navigationTargets') : defaultTargets;
  const navConfig = [
    {
      href: idxConfig.getEndpointFor('login'),
      label: 'Log In',
      when: 'logged-out',
      modifiers: ['user'],
    },
    {
      href: idxConfig.getEndpointFor('profile'),
      label: 'My Account',
      when: 'logged-in',
      modifiers: ['user'],
    },
    {
      href: idxConfig.getEndpointFor('logout'),
      label: 'Log Out',
      when: 'logged-in',
      modifiers: ['user'],
    },
    {
      href: idxConfig.getEndpointFor('register'),
      label: 'Register',
      when: 'logged-out',
      modifiers: ['user'],
    },
  ];
  targets.forEach((target) => {
    const nav = site.get(target);
    if (isArray(nav)) nav.unshift(...navConfig);
  });
};
