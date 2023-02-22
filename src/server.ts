import config from './config';
import showMessage from './utils/showMessage';
import app from './app';

(async () => {
  try {
    app.listen(config.port, () => {
      showMessage('SUCCESS', 'server', `Server start on port: ${config.port}`);
    });
  } catch (error) {
    showMessage('ERROR', 'server', error.message);
  }
})();
