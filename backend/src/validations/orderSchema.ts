import { Joi } from 'celebrate';
import { ArraySchema } from '@hapi/joi';

import { ItemInterface } from '../interfaces/base';

interface Items extends ArraySchema {
  product: ItemInterface;
  quantity: number;
}

export const order = Joi.object().keys({
  note: Joi.string(),
  identification: Joi.number().required(),
  items: Joi.array().required(),
});
export const orderUpdate = Joi.object().keys({
  note: Joi.string(),
  items: Joi.array().required(),
});

export const paramIdentification = {
  identification: Joi.number().required(),
};
export const paramIdenPayment = {
  identification: Joi.number().required(),
  payment: Joi.string().required(),
};
