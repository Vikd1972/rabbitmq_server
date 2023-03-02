import express from 'express';

import getNewLinkId from '../controllers/getNewLinkId';
import getLink from '../controllers/getLink';
import addOrUpdateLink from '../controllers/addOrUpdateLink';

const getDataRoute = express.Router();

getDataRoute.post('/', getNewLinkId);
getDataRoute.get('/:linkId', getLink);
getDataRoute.post('/link', addOrUpdateLink);

export default getDataRoute;
