import Joi from '@hapi/joi';

export interface IValidateSession {
  session: Joi.ObjectSchema;
  forgot: Joi.ObjectSchema;
  forgotGet: { name: Joi.StringSchema };
}

export interface IValidateUser {
  user: Joi.ObjectSchema;
  userUpdate: Joi.ObjectSchema;
  paramName: { name: Joi.StringSchema };
  paramIdUser: { id: Joi.AnySchema };
}

export interface IValidationItem {
  item: Joi.ObjectSchema;
  paramIdItem: { id: Joi.AnySchema };
  paramNameItem: { name: Joi.StringSchema };
  queryPage: { page: Joi.NumberSchema };
}
export interface IValidationsIngredient {
  paramNameIngredients: { name: Joi.StringSchema };
  ingredient: Joi.ObjectSchema;
  paramIdIngredients: { id: Joi.AnySchema };
}

export interface IValidationCategory {
  category: Joi.ObjectSchema;
  paramIdCategory: { id: Joi.AnySchema };
}

export interface IValidationOrder {
  order: Joi.ObjectSchema;
  orderUpdate: Joi.ObjectSchema;
  orderFees: Joi.ObjectSchema;
  paramIdentification: { identification: Joi.NumberSchema };
  paramIdentPayment: {
    identification: Joi.NumberSchema;
    payment: Joi.StringSchema;
  };
  orderDelete: { id: Joi.AnySchema };
}

export interface IValidationReport {
  report: Joi.ObjectSchema;
  reportDelete: { id: Joi.AnySchema };
}

export interface IValidationKitchen {
  kitchen: Joi.ObjectSchema;
}

export interface IValidationPrinter {
  printer: Joi.ObjectSchema;
  printerComprovant: Joi.ObjectSchema;
}
