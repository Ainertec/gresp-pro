import { Joi } from 'celebrate';

const report = Joi.object().keys({
  initial: Joi.string().required(),
  final: Joi.string().required(),
});
export default report;
