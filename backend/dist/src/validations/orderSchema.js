"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramIdentPayment = exports.paramIdentification = exports.orderUpdate = exports.order = void 0;
var celebrate_1 = require("celebrate");
var validObjectId_1 = __importDefault(require("./validObjectId"));
var itemsArray = celebrate_1.Joi.object().keys({
    product: celebrate_1.Joi.custom(validObjectId_1.default, 'valid id').required(),
    quantity: celebrate_1.Joi.number().required(),
    courtesy: celebrate_1.Joi.boolean(),
});
exports.order = celebrate_1.Joi.object().keys({
    note: celebrate_1.Joi.string(),
    identification: celebrate_1.Joi.number().required(),
    items: celebrate_1.Joi.array().items(itemsArray).required(),
});
exports.orderUpdate = celebrate_1.Joi.object().keys({
    note: celebrate_1.Joi.string(),
    items: celebrate_1.Joi.array().required(),
});
exports.paramIdentification = {
    identification: celebrate_1.Joi.number().required(),
};
exports.paramIdentPayment = {
    identification: celebrate_1.Joi.number().required(),
    payment: celebrate_1.Joi.string().required(),
};
