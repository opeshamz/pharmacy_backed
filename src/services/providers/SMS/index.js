const Twilio = require('./Twilio');

const PROVIDERS = {
  TWILIO: Twilio,
};

function getProvider(provider = 'TWILIO', config = {}) {
  return PROVIDERS[provider](config);
}

module.exports = getProvider;
