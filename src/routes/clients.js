import { Router } from 'express';
import {
  store, listOrders,
} from '../controllers/ClientController.js';

const clientsRouter = Router();

clientsRouter.post('/clients', store);
clientsRouter.get('/clients/:id/orders', listOrders);

export default clientsRouter;
