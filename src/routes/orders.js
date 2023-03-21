import { Router } from 'express';
import {
  list, show, store, updateDelivered,
} from '../controllers/OrderController.js';

const ordersRouter = Router();

ordersRouter.get('/orders', list);
ordersRouter.get('/orders/:id', show);
ordersRouter.post('/orders', store);
ordersRouter.patch('/orders/:id', updateDelivered);

export default ordersRouter;
