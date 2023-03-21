import { Router } from 'express';
import {
  list, show, store, update,
} from '../controllers/UserController.js';

const userRouter = Router();

userRouter.get('/users', list);
userRouter.get('/users/:id', show);
userRouter.post('/users', store);
userRouter.put('/users/:id', update);

export default userRouter;
