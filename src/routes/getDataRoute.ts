import express from 'express';

import getLinkId from '../controllers/getLinkId';
import getLink from '../controllers/getLink';
import updateLink from '../controllers/updateLink';

const getDataRoute = express.Router();

getDataRoute.post('/', getLinkId);
getDataRoute.get('/:linkId', getLink);
getDataRoute.post('/link', updateLink);

export default getDataRoute;
