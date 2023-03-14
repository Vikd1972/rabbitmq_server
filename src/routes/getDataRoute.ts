import express from 'express';

import startParsing from '../controllers/startParsing';
import getLink from '../controllers/getLink';
import addOrUpdateLink from '../controllers/addOrUpdateLink';

const getDataRoute = express.Router();

getDataRoute.post('/', startParsing); // start parsing by domain id
getDataRoute.get('/:linkId', getLink); // get domen data by id
getDataRoute.patch('/link', addOrUpdateLink); // save page info

// edit parsing by domain id
// stop parsing by domain id

export default getDataRoute;
