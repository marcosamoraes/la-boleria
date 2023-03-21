import Joi from 'joi';
import validator from './validator.js';

const storeFlavourSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().min(10).max(11).pattern(/^\d+$/)
    .required(),
  cpf: Joi.string().length(11).pattern(/^\d+$/).required(),
  birthday: Joi.date().required(),
});

const validateStoreFlavourSchema = validator(storeFlavourSchema);
export default validateStoreFlavourSchema;
