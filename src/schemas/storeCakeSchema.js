import Joi from 'joi';
import validator from './validator.js';

const storeCakeSchema = Joi.object({
  name: Joi.string().required().min(2),
  price: Joi.number().required().min(0),
  image: Joi.string().required().uri(),
  description: Joi.string().required(),
  flavourId: Joi.number(),
});

const validateStoreCakeSchema = validator(storeCakeSchema);
export default validateStoreCakeSchema;
