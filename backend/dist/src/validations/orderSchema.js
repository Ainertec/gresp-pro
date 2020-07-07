"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramIdenPayment = exports.paramIdentification = exports.orderUpdate = exports.order = void 0;
var celebrate_1 = require("celebrate");
exports.order = celebrate_1.Joi.object().keys({
    note: celebrate_1.Joi.string(),
    identification: celebrate_1.Joi.number().required(),
    items: celebrate_1.Joi.array().required(),
});
exports.orderUpdate = celebrate_1.Joi.object().keys({
    note: celebrate_1.Joi.string(),
    items: celebrate_1.Joi.array().required(),
});
exports.paramIdentification = {
    identification: celebrate_1.Joi.number().required(),
};
exports.paramIdenPayment = {
    identification: celebrate_1.Joi.number().required(),
    payment: celebrate_1.Joi.string().required(),
};
