import config from './config';
import app from './app';
import connectToDb from './db/connectToDb';
import publisher from './publisher/publisher';
import logger from './utils/logger';

(async () => {
  try {
    await connectToDb();
    await publisher.init();
    app.listen(config.port, () => {
      logger('SUCCESS', 'server', `Server start on port: ${config.port}`);
    });
  } catch (error) {
    logger('ERROR', 'server', error.message);
    process.exit(1);
  }
})();
