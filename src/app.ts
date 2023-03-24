import express from 'express';
import cors from 'cors';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const setRoutes = require('./routes');
import setRoutes from './routes';
// import getDataRoute from './routes/startParsing';

const app = express();

app.use(express.json({ limit: '50MB' }));
app.use(express.json());
app.use(cors());

setRoutes(app);

// app.use('/api', getDataRoute);

export default app;
