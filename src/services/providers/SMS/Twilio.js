const twilio = require('twilio');
const { logger } = require('../../../../config');

class Twilio extends twilio.Twilio {
  constructor(config) {
    // twillio reads from env by default
    super(config.accountSID, config.authToken, { edge: 'frankfurt' });
  }

  async sendSMS(number, message, sender = '+15614199200') {
    const details = await SMS.create({ from: sender, to: number, message });
    try {
      const response = await this.messages.create({ to: number, body: message, from: sender });
      details.meta = JSON.parse(JSON.stringify(response));
      details.accountSID = response && response.accountSid;
      // Encrypt later
      details.message = response.body;
      details.delivery_status = response.status;
      await details.save();
    } catch (error) {
      details.delivery_status = 'failed';
      details.meta = error && error.stack;
      logger.error(error);
      await details.save();
    }
  }
}

module.exports = (config) => new Twilio(config);
