/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

// import sendMessage from '../publisher/manage';
import publisher from '../../publisher/publisher';
import service from '../../db/services';

type ParamsType = Record<string, never>;

type RequestBodyType = {
  severity: string;
  domain: string;
  numberOfStreams?: string;
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestBodyType, unknown>;

const startParsing: ControllerType = async (req, res, next) => {
  try {
    const { domain, severity, numberOfStreams } = req.body;

    const linkId = await service.domains.getLinkId(domain);

    publisher.sendToChannel({ severity, linkId, numberOfStreams: Number(numberOfStreams) });

    return res.sendStatus(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export default startParsing;
