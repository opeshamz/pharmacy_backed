/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-undef
const userController = new UserController(dependencies);
const axios = require('axios');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai.expect;
chai.use(sinonChai);

// eslint-disable-next-line no-undef
describe('UserController', () => {
  const sandbox = sinon.createSandbox();
  let UserController;

  // eslint-disable-next-line no-undef
  beforeEach(() => {
    // eslint-disable-next-line no-undef
    UserController = new UserController(dependencies);
  });

  // eslint-disable-next-line no-undef
  afterEach(() => {
    sandbox.restore();
  });

  // eslint-disable-next-line no-undef
  it('register a new user', async (done) => {
    const getStub = sandbox.stub(axios, 'get').resolves({
      data: {
        // eslint-disable-next-line no-undef
        email: req.body,
      },
    });
    // eslint-disable-next-line no-undef
    register()
      .then((result) => {
        expect(result).to.be.an('object');
        expect(result).to.have.property('email');
        done();
      })
      .catch(done);
  });
});
