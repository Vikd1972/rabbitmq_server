import express from 'express';

import startParsing from '../controllers/domain/startParsing';
import getDomain from '../controllers/domain/getDomain';
import setLink from '../controllers/link/setLink';
import updateDomain from '../controllers/domain/updateDomain';

const getDataRoute = express.Router();

getDataRoute.post('/', startParsing);
getDataRoute.get('/domain/:id', getDomain);
getDataRoute.patch('/domain/:id', updateDomain);
getDataRoute.post('/link', setLink);

export default getDataRoute;
