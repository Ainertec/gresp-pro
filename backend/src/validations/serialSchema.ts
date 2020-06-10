import { Joi } from 'celebrate';

const serialSchema = Joi.object().keys({
  password: Joi.string().required(),
});

export default serialSchema;
