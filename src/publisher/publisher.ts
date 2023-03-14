import amqp from 'amqplib';

import logger from '../utils/logger';
import config from '../config';

type OptionsType = {
  severity: string;
  linkId: number;
  numberOfStreams?: number;
};

const Publisher = class {
  channel: Promise<amqp.Channel>;

  init = async () => {
    const connection = await amqp.connect(config.rabbitHost);

    this.channel = connection.createChannel();

    const result = (await this.channel).assertExchange(config.rabbitExchange, 'direct', {
      durable: false,
    });

    const pointExchange = Object.values(await result);

    logger('SUCCESS', 'publisher.init', `Point of exchange "${pointExchange}" created`);
    return pointExchange;
  };

  sendToChannel = async (options: OptionsType) => {
    const message = JSON.stringify(options);
    const isSend = (await this.channel)
      .publish(config.rabbitExchange, options.severity, Buffer.from(message));

    if (isSend) {
      logger('INFO', 'publisher.sendToChannel', `Message ${message} sent`);
    }
  };
};

export default new Publisher();
