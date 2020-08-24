import { Joi } from 'celebrate';
import validObjectId from './validObjectId';

export const category = Joi.object().keys({
  name: Joi.string().required().exist(),
  products: Joi.array().required(),
  color: Joi.string(),
});
export const paramIdCategory = {
  id: Joi.custom(validObjectId, 'valid id').required(),
};
