import { Joi } from 'celebrate';
import validObjectId from './validObjectId';

const itemsArray = Joi.object().keys({
  product: Joi.custom(validObjectId, 'valid id').required(),
  quantity: Joi.number().required(),
  courtesy: Joi.boolean(),
});

export const order = Joi.object().keys({
  note: Joi.string(),
  identification: Joi.number().required(),
  items: Joi.array().items(itemsArray).required(),
});
export const orderUpdate = Joi.object().keys({
  note: Joi.string(),
  items: Joi.array().required(),
});

export const paramIdentification = {
  identification: Joi.number().required(),
};
export const paramIdentPayment = {
  identification: Joi.number().required(),
  payment: Joi.string().required(),
};

export const orderDelete = {
  id: Joi.custom(validObjectId, 'valid id').required(),
};
