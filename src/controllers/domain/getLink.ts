import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import service from '../../db/services';
import type { Domain } from '../../db/entities/domains';

type ParamsType = {
  linkId: string;
};
type ResponseBodyType = {
  domain: Domain;
};

type RequestBodyType = Record<string, never>;

type ControllerType = RequestHandler<ParamsType, ResponseBodyType, RequestBodyType, unknown>;

const getLink: ControllerType = async (req, res, next) => {
  try {
    const { linkId } = req.params;
    const domain = await service.domains.getLink(+linkId);
    return res.status(StatusCodes.OK).json({ domain });
  } catch (err) {
    next(err);
  }
};

export default getLink;
