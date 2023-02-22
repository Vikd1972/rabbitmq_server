/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import sendMessage from '../publisher/send';

type ParamsType = Record<string, never>;

type RequestType = {
  data: string[];
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, unknown>;

const control: ControllerType = async (req, res, next) => {
  try {
    // const { data } = req.body;

    sendMessage();

    return res.sendStatus(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

export default control;
