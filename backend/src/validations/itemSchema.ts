import { Joi } from 'celebrate';
import validObjectId from './validObjectId';

export const item = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number().required(),
  stock: Joi.number(),
  drink: Joi.boolean(),
});

export const paramIdItem = {
  id: Joi.custom(validObjectId, 'valid id').required(),
};
export const paramNameItem = {
  name: Joi.string(),
};
