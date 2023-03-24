import express from 'express';

import startParsing from '../controllers/domain/startParsing';
import getDomain from '../controllers/domain/getDomain';
import updateDomain from '../controllers/domain/updateDomain';

const router = express.Router();

router.post('/', startParsing);
router.get('/:id', getDomain);
router.patch('/:id', updateDomain);

export default router;
