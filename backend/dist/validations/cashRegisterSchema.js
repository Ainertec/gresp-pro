"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramIdCashRegister = exports.cashRegister = void 0;
const celebrate_1 = require("celebrate");
const validObjectId_1 = __importDefault(require("./validObjectId"));
const exits = celebrate_1.Joi.object().keys({
    login: celebrate_1.Joi.string().required(),
    description: celebrate_1.Joi.string().required(),
    value: celebrate_1.Joi.number().required(),
});
exports.cashRegister = celebrate_1.Joi.object().keys({
    thing: celebrate_1.Joi.number().required(),
    exits: celebrate_1.Joi.array().items(exits),
    closure: celebrate_1.Joi.number(),
});
exports.paramIdCashRegister = {
    id: celebrate_1.Joi.custom(validObjectId_1.default, 'valid id').required(),
};
//# sourceMappingURL=cashRegisterSchema.js.map