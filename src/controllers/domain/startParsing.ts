import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import service from '../../db/services';
import publisher from '../../publisher/Publisher';
import type { PublishedQueueNamesENUM } from '../../publisher/Publisher';

type ParamsType = Record<string, never>;

type RequestBodyType = {
  queueName: PublishedQueueNamesENUM;
  domain?: string;
  domainId?: number;
  numberOfStreams: number;
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestBodyType, unknown>;

const startParsing: ControllerType = async (req, res, next) => {
  try {
    const { queueName, domain, domainId, numberOfStreams } = req.body;

    if (queueName === 'domainsToParse') {
      const domainId = await service.domains.getLinkId(domain);
      publisher.startDomainParsing(domainId);
    } else {
      publisher.startSettingsUpdate({ domainId, numberOfStreams });
    }

    return res.sendStatus(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export default startParsing;
