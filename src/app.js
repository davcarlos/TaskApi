// para utilizar express en vez de require

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import taskRoutes from './routes/taskRoutes'

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/task',taskRoutes);

export default app;