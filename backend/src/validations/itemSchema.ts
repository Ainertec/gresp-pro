import { Joi } from 'celebrate';
import validObjectId from './validObjectId';

const ingredients = Joi.object().keys({
  material: Joi.custom(validObjectId, 'valid id').required(),
  quantity: Joi.number().required(),
});

export const item = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number().required(),
  cost: Joi.number(),
  ingredients: Joi.array().items(ingredients),
  stock: Joi.number(),
  drink: Joi.boolean(),
  available: Joi.boolean(),
  categoryId: Joi.custom(validObjectId, 'valid id'),
});

export const paramIdItem = {
  id: Joi.custom(validObjectId, 'valid id').required(),
};
export const paramNameItem = {
  name: Joi.string(),
};
export const queryPage = {
  page: Joi.number(),
};
