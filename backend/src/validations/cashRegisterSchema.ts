import { Joi } from 'celebrate';
import validObjectId from './validObjectId';

const exits = Joi.object().keys({
    login: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required(),
});

export const cashRegister = Joi.object().keys({
  thing: Joi.number().required(),
  exits: Joi.array().items(exits),
  closure: Joi.number(),
});

export const paramIdCashRegister = {
  id: Joi.custom(validObjectId, 'valid id').required(),
};
