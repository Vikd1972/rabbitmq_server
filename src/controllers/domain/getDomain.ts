import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import service from '../../db/services';
import type { Domain } from '../../db/entities/domains';

type ParamsType = {
  id: string;
};
type ResponseBodyType = {
  domain: Domain;
};

type RequestBodyType = Record<string, never>;

type ControllerType = RequestHandler<ParamsType, ResponseBodyType, RequestBodyType, unknown>;

const getDomain: ControllerType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const domain = await service.domains.getDomain(+id);
    return res.status(StatusCodes.OK).json({ domain });
  } catch (err) {
    next(err);
  }
};

export default getDomain;
