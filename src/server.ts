import config from './config';
import app from './app';
import connectToDb from './db/connectToDb';
import showMessage from './utils/showMessage';

(async () => {
  try {
    app.listen(config.port, () => {
      connectToDb();
      showMessage('SUCCESS', 'server', `Server start on port: ${config.port}`);
    });
  } catch (error) {
    showMessage('ERROR', 'server', error.message);
  }
})();
