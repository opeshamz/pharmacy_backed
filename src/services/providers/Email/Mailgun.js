/* eslint-disable no-param-reassign */
const { isEmpty } = require('lodash');
const mailgun = require('mailgun-js');
const config = require('../../../../config');

const defaultOptions = {
  apiKey: config.MAILGUN_API_KEY,
  domain: config.MAILGUN_DOMAIN,
};

class Mailgun {
  constructor(options) {
    // eslint-disable-next-line no-param-reassign
    if (isEmpty(options)) options = defaultOptions;
    this.config = options;
    this.client = mailgun({ apiKey: options.apiKey, domain: options.domain });
  }

  async sendMail(to, subject, content, from = '') {
    return new Promise((resolve, reject) => {
      this.client.messages().send({
        from, to, subject, html: content,
      }, (error, body) => {
        if (error) return reject(error);
        config.logger.info(body, 'EMAIL RESPONSE BODY');
        // Body returns something like
        //   {
        //       id: '<20210906102248.1.BF6F6F3C68067D60@sandbox7ce6f
        // 9c26fdf49c39263e9438ba2f987.mailgun.org>',
        //           message: 'Queued. Thank you.'
        //   }
        return resolve(true);
      });
    });
  }

  // async sendVerificationMail(to, code) {
  //   config.logger.info('Received request to send verification email', code);
  //   return this.sendMail(to, 'Please verify your account', Verification(code));
  // }
}

module.exports = new Mailgun();
