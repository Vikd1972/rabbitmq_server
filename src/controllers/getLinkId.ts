/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import sendMessage from '../publisher/manage';
import service from '../db/services/links';

type ParamsType = Record<string, never>;

type RequestType = {
  domen: string;
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, unknown>;

const getLinkId: ControllerType = async (req, res, next) => {
  try {
    const { domen } = req.body;
    const linkId = await service.addLink(domen);

    sendMessage(linkId);

    return res.sendStatus(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export default getLinkId;
