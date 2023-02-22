import express from 'express';
import config from './config';

import sendMessage from './publisher/send';

const app = express();

(async () => {
  try {
    app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log('Server start on port', config.port);
    });

    sendMessage(['kern.error', 'A critical kernel NEW error']);
  } catch (error) {
    console.error(error);
  }
})();
