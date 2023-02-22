/* eslint-disable no-console */
import amqp from 'amqplib/callback_api';

const fibonacci = (n: number): number => {
  if (n === 0 || n === 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

const sendMessage = () => {
  amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }
      const queue = 'rpc_queue';

      channel.assertQueue(queue, {
        durable: false,
      });
      channel.prefetch(1);
      console.log(' [x] Awaiting RPC requests');
      channel.consume(queue, (msg) => {
        const n = parseInt(msg.content.toString(), 10);

        console.log(' [.] fib(%d)', n);

        const r = fibonacci(n);

        channel.sendToQueue(msg.properties.replyTo,
          Buffer.from(r.toString()),
          {
            correlationId: msg.properties.correlationId,
          });

        channel.ack(msg);
      });
    });
  });
};

export default sendMessage;
