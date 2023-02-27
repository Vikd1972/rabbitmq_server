import amqp from 'amqplib/callback_api';

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
      const msg = args.join(' ') || 'Hello World!';
      const severity = 'manage';

      channel.assertExchange(exchange, 'direct', {
        durable: false,
      });
      channel.publish(exchange, severity, Buffer.from(msg));
      showMessage('INFO', 'publisher.send', `Sent: ${msg}`);
    });

    setTimeout(() => {
      connection.close();
      // process.exit(0);
    }, 500);
  });
};

export default sendMessage;
