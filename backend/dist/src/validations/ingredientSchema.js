"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramNameIngredients = exports.paramIdIngredients = exports.ingredient = void 0;
var celebrate_1 = require("celebrate");
var validObjectId_1 = __importDefault(require("./validObjectId"));
exports.ingredient = celebrate_1.Joi.object().keys({
    name: celebrate_1.Joi.string().required(),
    description: celebrate_1.Joi.string(),
    price: celebrate_1.Joi.number().required(),
    stock: celebrate_1.Joi.number().required(),
    unit: celebrate_1.Joi.string().required(),
});
exports.paramIdIngredients = {
    id: celebrate_1.Joi.custom(validObjectId_1.default, 'valid id').required(),
};
exports.paramNameIngredients = {
    name: celebrate_1.Joi.string(),
};
