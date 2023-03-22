import Joi from 'joi';
import validator from './validator.js';

const storeOrderSchema = Joi.object({
  clientId: Joi.number().required(),
  cakeId: Joi.number().required(),
  quantity: Joi.number().required().min(0).max(5),
  totalPrice: Joi.number().required(),
});

const validateStoreOrderSchema = validator(storeOrderSchema);
export default validateStoreOrderSchema;
