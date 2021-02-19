import { Joi } from 'celebrate';
import validObjectId from './validObjectId';

export const ingredient = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
  unit: Joi.string().required(),
});
export const paramIdIngredients = {
  id: Joi.custom(validObjectId, 'valid id').required(),
};
export const paramNameIngredients = {
  name: Joi.string(),
};
