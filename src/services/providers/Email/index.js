const Mailgun = require('./Mailgun');

const PROVIDERS = {
  MAILGUN: Mailgun,
};
function getProvider(provider = 'MAILGUN', config = {}) {
  return PROVIDERS[provider](config);
}
module.exports = getProvider;
