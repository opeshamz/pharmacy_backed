const Flutterwave = require('./Flutterwave');

const PROVIDERS = {
  FLUTTERWAVE: Flutterwave,
};

function getProvider(provider = 'FLUTTERWAVE', config = {}) {
  return PROVIDERS[provider](config);
}

module.exports = getProvider;
