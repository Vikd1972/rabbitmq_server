import express from 'express';

import startParsing from '../controllers/domain/startParsing';
import getDomain from '../controllers/domain/getDomain';
import setLink from '../controllers/link/setLink';
import updateDomain from '../controllers/domain/updateDomain';

const getDataRoute = express.Router();

getDataRoute.post('/', startParsing); // start parsing by domain id
getDataRoute.get('/domain/:id', getDomain); // get domen data by id
getDataRoute.patch('/domain/:id', updateDomain); // update domen data by id
getDataRoute.post('/link', setLink); // set link
// getDataRoute.delete('/:linkId', stopParsing); // stop parsing by domain id

export default getDataRoute;
