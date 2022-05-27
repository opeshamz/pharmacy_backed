const { isEmpty } = require('lodash');
const Joi = require('joi');
const axios = require('axios').default;
const { FLW_SECRET_KEY, FLW_PUBLIC_KEY, NODE_ENV } = require('../../../../config');
const { ValidationError } = require('../../../utils/errors');

const defaultConfig = {
  public_key: FLW_PUBLIC_KEY,
  private_key: FLW_SECRET_KEY,
  env: NODE_ENV,
};

const paySpec = Joi.object().keys({
  tx_ref: Joi.string().required(),
  amount: Joi.number().positive().required(),
  currency: Joi.string().default('NGN'),
  redirect_url: Joi.string().uri(),
  payment_options: Joi.forbidden().default('card,account,banktransfer,qr,ussd,barter,credit,paga'),
  customer: Joi.object().keys({
    full_name: Joi.string().required(),
    id: Joi.string().required(),
    email: Joi.string().email(),
    phone_number: Joi.string(),
  }),
  meta: {
    title: 'Payments',
    // logo: ',
    source: 'API', //
  },
});

const verifySpec = Joi.number().required();
class Flutterwave {
  constructor(config, http = axios) {
    // eslint-disable-next-line no-param-reassign
    if (isEmpty(config)) config = defaultConfig;
    this.config = config;

    this.apiUrl = 'https://api.flutterwave.com';
    this._client = http.create({
      baseURL: this.apiUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.private_key}`,
      },

    });
  }

  async pay(payload) {
    const { error, value } = paySpec.validate(payload);
    if (error) throw new ValidationError(error.message);
    const response = await this._client.post('/v3/payments', value);
    return response.data;
  }

  async verify(id) {
    const { error, value } = verifySpec.validate(id);
    if (error) throw new ValidationError(error.message);
    const response = await this._client.get(`/v3/transactions/${value}/verify`);
    return response.data;
  }
}
module.exports = (config) => new Flutterwave(config);
