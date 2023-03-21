import express from 'express';
import cors from 'cors';
import cakesRouter from './routes/cakes.js';
import clientsRouter from './routes/clients.js';
import flavoursRouter from './routes/flavours.js';
import ordersRouter from './routes/orders.js';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use([cakesRouter, clientsRouter, flavoursRouter, ordersRouter]);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
