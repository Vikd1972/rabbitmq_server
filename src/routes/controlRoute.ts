import express from 'express';

import control from '../controllers/control';

const controlRoute = express.Router();

controlRoute.post('/', control);

export default controlRoute;
