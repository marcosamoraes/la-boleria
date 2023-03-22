import Joi from 'joi';
import validator from './validator.js';

const storeFlavourSchema = Joi.object({
  name: Joi.string().required(),
});

const validateStoreFlavourSchema = validator(storeFlavourSchema);
export default validateStoreFlavourSchema;
