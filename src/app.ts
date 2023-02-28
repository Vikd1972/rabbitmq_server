import express from 'express';
import cors from 'cors';
import path from 'path';

import getDataRoute from './routes/getDataRoute';

const app = express();

app.use(express.json({ limit: '50MB' }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../static')));

app.use('/api', getDataRoute);

export default app;
