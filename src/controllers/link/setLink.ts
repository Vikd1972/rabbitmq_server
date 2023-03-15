/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import type Link from '../../db/entities/links';
import service from '../../db/services';

type ParamsType = Record<string, never>;

type RequestBodyType = {
  newItemLink: Link;
};

type ResponseBodyType = {
  link: Link;
};

type ControllerType = RequestHandler<ParamsType, ResponseBodyType, RequestBodyType, unknown>;

const setLink: ControllerType = async (req, res, next) => {
  try {
    const { newItemLink } = req.body;

    const link = await service.links.setLink(newItemLink);

    return res.status(StatusCodes.OK).json({ link });
  } catch (err) {
    next(err);
  }
};

export default setLink;
