import amqp from 'amqplib';

import logger from '../utils/logger';
import config from '../config';

export enum PublishedQueueNamesENUM {
  domainsToParse = 'domainsToParse',
  parserSettingsUpdate = 'parserSettingsUpdate',
}

type OptionsType = {
  domainId: number;
  numberOfStreams: number;
};

class Publisher {
  private channel: amqp.Channel;

  init = async () => {
    const connection = await amqp.connect(config.rabbitHost);

    this.channel = await connection.createChannel();

    logger('SUCCESS', 'publisher.init', 'Message broker initialized, publisher is ready');
  };

  private sendToQueue = async (queueName: PublishedQueueNamesENUM, payload: unknown) => {
    await this.channel.assertQueue(queueName, {
      durable: false,
    });

    const stringifyedPayload = JSON.stringify(payload);
    this.channel.sendToQueue(queueName, Buffer.from(stringifyedPayload));
    logger('INFO', 'publisher.sendToQueue', `Message sent, payload: ${stringifyedPayload}`);
  };

  startDomainParsing = async (domainId: number) => {
    await this.sendToQueue(PublishedQueueNamesENUM.domainsToParse, domainId);
  };

  startSettingsUpdate = async (options: OptionsType) => {
    await this.sendToQueue(PublishedQueueNamesENUM.parserSettingsUpdate, options);
  };
}

export default new Publisher();
