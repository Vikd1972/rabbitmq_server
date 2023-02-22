import amqp from 'amqplib/callback_api';

import showMessage from '../utils/showMessage';

const sendToQueue = (msg: string[]) => {
  const queue = msg[0];
  // console.log(msg);
  // console.log(queue);

  amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }
      channel.sendToQueue(queue, Buffer.from(msg[1]), {
        persistent: true,
      });

      showMessage('SUCCESS', 'publisher.sendToQueue', `message send: ${msg[1]}`);
    });
    setTimeout(() => {
      connection.close();
      // process.exit(0);
    }, 500);
  });
};

export default sendToQueue;
