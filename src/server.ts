import config from './config';
import express from 'express';

import sendMessge from './publisher/send';

const app = express();

void (async () => {
  try {
    app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log('Server start on port', config.port);
    });

    sendMessge();
  } catch (error) {
    console.error(error);
  }
})();