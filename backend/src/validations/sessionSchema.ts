import { Joi } from 'celebrate';

const sessionSchema = Joi.object().keys({
  name: Joi.string().required(),
  password: Joi.string().required(),
});

export default sessionSchema;
