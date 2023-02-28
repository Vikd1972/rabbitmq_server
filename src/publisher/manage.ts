import amqp from 'amqplib/callback_api';

import showMessage from '../utils/showMessage';

type OptionsType = {
  linkId: number;
  numberOfStreams?: number;
};

const sendMessage = (options: OptionsType) => {
  amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }
      const exchange = 'direct_logs';
      const severity = 'manage';

      channel.assertExchange(exchange, 'direct', {
        durable: false,
      });

      channel.publish(exchange, severity, Buffer.from(`${options.linkId.toString()} ${options.numberOfStreams.toString()}`));
      showMessage('INFO', 'publisher.send', `Sent: ${options.linkId.toString()} ${options.numberOfStreams.toString()}`);
    });

    setTimeout(() => {
      connection.close();
      // process.exit(0);
    }, 500);
  });
};

export default sendMessage;
