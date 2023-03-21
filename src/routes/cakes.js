import { Router } from 'express';
import store from '../controllers/CakeController.js';

const cakesRouter = Router();

cakesRouter.post('/cakes', store);

export default cakesRouter;
