import express from 'express';

import setLink from '../controllers/link/setLink';

const router = express.Router();

router.post('/', setLink);

export default router;
