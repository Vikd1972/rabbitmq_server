import express from 'express';
import cors from 'cors';
import path from 'path';

import controlRoute from './routes/controlRoute';

const app = express();

app.use(express.json({ limit: '50MB' }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../static')));

app.use('/api', controlRoute);

export default app;
