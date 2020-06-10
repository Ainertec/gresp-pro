import { Joi } from 'celebrate';

const printer = {
  identification: Joi.number().required(),
  type: Joi.string().required(),
};

export default printer;
