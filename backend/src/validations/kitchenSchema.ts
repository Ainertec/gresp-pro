import { Joi } from 'celebrate';

const kitchen = Joi.object().keys({
  identification: Joi.number().required(),
});
export default kitchen;
