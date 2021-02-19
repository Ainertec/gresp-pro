import { Joi } from 'celebrate';
import validObjectId from './validObjectId';

export const user = Joi.object().keys({
  name: Joi.string().required(),
  password: Joi.string().required(),
  question: Joi.string().required(),
  response: Joi.string().required(),
  admin: Joi.boolean(),
});
export const userUpdate = Joi.object().keys({
  name: Joi.string(),
  password: Joi.string(),
  question: Joi.string().required(),
  response: Joi.string().required(),
  admin: Joi.boolean(),
});

export const paramIdUser = {
  id: Joi.custom(validObjectId, 'valid id').required(),
};
export const paramName = {
  name: Joi.string().required(),
};
