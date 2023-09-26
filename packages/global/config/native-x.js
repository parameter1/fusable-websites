const NativeXConfiguration = require('@parameter1/base-cms-marko-web-native-x/config');

module.exports = ({
  uri = 'https://delivery.mindfulcms.com/rr/default/compat/native-website',
  enabled = false,
} = {}) => new NativeXConfiguration(uri, { enabled, tenantKey: 'randallreilly' });
