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

const updateDomain: ControllerType = async (req, res, next) => {
  try {
    const { id } = req.params;
    await service.domains.updateDomain(+id);
    return res.sendStatus(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export default updateDomain;
