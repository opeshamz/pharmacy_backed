const mongoose = require('mongoose');
require('mongoose-sequence')(mongoose);

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const { logger, DATABASE_URL } = require('../config');

let pool;

const moongoseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connect = async () => {
  try {
    const connection = await mongoose.connect(
      `${DATABASE_URL}`,
      moongoseConfig,
    );
    pool = connection;
    logger.info('DATABASE connected successfully!');
  } catch (error) {
    logger.error('DATABASE connection failed! Exiting Now');
    logger.error(error);
    process.emit('SIGTERM');
    process.exit(1);
  }
  return true;
};

process.on('SIGTERM', () => {
  if (pool) {
    logger.info('Pool is ', pool);
    pool.close();
  }
});
const getPool = () => pool;

module.exports = { connect, getPool };
