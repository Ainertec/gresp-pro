import { Joi } from 'celebrate';

const printer = Joi.object().keys({
  identification: Joi.number().required(),
  type: Joi.string().required(),
});

export default printer;
