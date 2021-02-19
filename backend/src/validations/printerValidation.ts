import { Joi } from 'celebrate';

const printer = Joi.object().keys({
  identification: Joi.number().required(),
  type: Joi.boolean().required(),
  oldItems: Joi.array(),
});

export default printer;
