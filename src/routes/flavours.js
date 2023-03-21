import { Router } from 'express';
import store from '../controllers/FlavourController.js';

const flavoursRouter = Router();

flavoursRouter.post('/flavours', store);

export default flavoursRouter;
