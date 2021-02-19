import { Joi } from 'celebrate';
import validObjectId from './validObjectId';

export const report = Joi.object().keys({
  initial: Joi.string().required(),
  final: Joi.string().required(),
});

export const reportDelete = {
  id: Joi.custom(validObjectId, 'valid id').required(),
};
