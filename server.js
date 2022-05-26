const http = require('http');
const app = require('./src/app');
const db = require('./src/db');
const config = require('./config');

const startApp = async () => {
  try {
    config.logger.info('Waiting for DATABASE Connection...');
    await db.connect();
    const server = http.createServer(app);

    // Start Listening on the http server on PORT
    server.listen(config.APP_PORT, () => config.logger.info(
      `Env: ${config.NODE_ENV}: Server started on PORT ${config.APP_PORT}`,
    ));
    // connect server to Websocket
    // eslint-disable-next-line no-new
  } catch (err) {
    config.logger.error(err.stack);
    process.emit('SIGTERM');
  }
};

startApp();
