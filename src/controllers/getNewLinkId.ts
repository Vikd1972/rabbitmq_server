/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import sendMessage from '../publisher/manage';
import service from '../db/services/links';

type ParamsType = Record<string, never>;

type RequestType = {
  domen: string;
  linkId: string;
  numberOfStreams: string;
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, unknown>;

const getNewLinkId: ControllerType = async (req, res, next) => {
  try {
    const { domen, numberOfStreams } = req.body;
    let linkId = Number(req.body.linkId);

    if (domen) {
      linkId = await service.getNewLinkId(domen);
    }

    sendMessage({ linkId, numberOfStreams: Number(numberOfStreams) });

    return res.sendStatus(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export default getNewLinkId;
