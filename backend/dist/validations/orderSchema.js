"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderDelete = exports.paramIdentPayment = exports.paramIdentification = exports.orderFees = exports.orderUpdate = exports.order = void 0;
const celebrate_1 = require("celebrate");
const validObjectId_1 = __importDefault(require("./validObjectId"));
const itemsArray = celebrate_1.Joi.object().keys({
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
exports.orderFees = celebrate_1.Joi.object().keys({
    tip: celebrate_1.Joi.number().required(),
    cardfee: celebrate_1.Joi.number().required(),
});
exports.paramIdentification = {
    identification: celebrate_1.Joi.number().required(),
};
exports.paramIdentPayment = {
    identification: celebrate_1.Joi.number().required(),
    payment: celebrate_1.Joi.string().required(),
};
exports.orderDelete = {
    id: celebrate_1.Joi.custom(validObjectId_1.default, 'valid id').required(),
};
//# sourceMappingURL=orderSchema.js.map