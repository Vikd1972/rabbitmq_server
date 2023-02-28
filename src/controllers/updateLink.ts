/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import type Link from '../db/entities/links';
import service from '../db/services/links';

type ParamsType = Record<string, never>;

type RequestType = {
  newItemLink: Link;
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, unknown>;

const updateLink: ControllerType = async (req, res, next) => {
  try {
    const { newItemLink } = req.body;

    const link = await service.updateLink(newItemLink);

    return res.sendStatus(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export default updateLink;
