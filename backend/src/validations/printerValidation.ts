import { Joi } from 'celebrate';

export const printer = Joi.object().keys({
  identification: Joi.number().required(),
  type: Joi.boolean().required(),
  oldItems: Joi.array(),
});

export const printerComprovant = Joi.object().keys({
  identification: Joi.number().required(),
  payment:Joi.string().required(),
});
