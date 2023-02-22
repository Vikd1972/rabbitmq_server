import amqp from 'amqplib/callback_api';

import sendToQueue from './sendToQueue';
import showMessage from '../utils/showMessage';

const sendMessage = (args: string[]) => {
  amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }
      const exchange = 'direct_logs';
      const msg = args.slice(1).join(' ') || 'Hello World!';
      const severity = (args.length > 0) ? args[0] : 'manage';

      if (severity !== 'manage') {
        sendToQueue(args);
      } else {
        channel.assertExchange(exchange, 'direct', {
          durable: false,
        });
        channel.publish(exchange, severity, Buffer.from(msg));
        showMessage('INFO', 'publisher.send', `Sent ${severity}: ${msg}`);
      }
    });

    setTimeout(() => {
      connection.close();
      // process.exit(0);
    }, 500);
  });
};

export default sendMessage;
