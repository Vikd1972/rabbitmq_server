import express from 'express';
import cors from 'cors';

import getDataRoute from './routes/getDataRoute';

const app = express();

app.use(express.json({ limit: '50MB' }));
app.use(express.json());
app.use(cors());

app.use('/api', getDataRoute);

export default app;
