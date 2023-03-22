import Joi from 'joi';
import validator from './validator.js';

const storeClientSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().required().min(10).max(11)
    .pattern(/^\d+$/),
});

const validateStoreClientSchema = validator(storeClientSchema);
export default validateStoreClientSchema;
