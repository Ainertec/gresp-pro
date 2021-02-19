import { Joi } from 'celebrate';

export const post = Joi.object().keys({
  name: Joi.string().required().exist(),
  response: Joi.string().required(),
  password: Joi.string().required(),
});
export const get = {
  name: Joi.string().required(),
};
