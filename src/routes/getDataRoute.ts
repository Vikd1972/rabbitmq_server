import express from 'express';

import startParsing from '../controllers/domain/startParsing';
import getLink from '../controllers/domain/getLink';
import addOrUpdateLink from '../controllers/addOrUpdateLink';

const getDataRoute = express.Router();

getDataRoute.post('/', startParsing); // start parsing by domain id
// getDataRoute.delete('/:linkId', stopParsing); // stop parsing by domain id
// getDataRoute.post('/:linkId', editParsing); // edit parsing by domain id
getDataRoute.get('/:linkId', getLink); // get domen data by id
getDataRoute.patch('/link', addOrUpdateLink); // save page info

export default getDataRoute;
