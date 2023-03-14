/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import service from '../db/services/links';
import type Link from '../db/entities/links';

type ParamsType = {
  linkId: string;
};
type ResponseBodyType = {
  link: Link;
};

type RequestBodyType = Record<string, never>;

type ControllerType = RequestHandler<ParamsType, ResponseBodyType, RequestBodyType, unknown>;

const getLink: ControllerType = async (req, res, next) => {
  try {
    const { linkId } = req.params;
    const link = await service.getLink(+linkId);

    return res.status(StatusCodes.OK).json({ link });
  } catch (err) {
    next(err);
  }
};

export default getLink;
