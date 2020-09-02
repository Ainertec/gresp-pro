"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryPage = exports.paramNameItem = exports.paramIdItem = exports.item = void 0;
var celebrate_1 = require("celebrate");
var validObjectId_1 = __importDefault(require("./validObjectId"));
var ingredients = celebrate_1.Joi.object().keys({
    material: celebrate_1.Joi.custom(validObjectId_1.default, 'valid id').required(),
    quantity: celebrate_1.Joi.number().required(),
});
exports.item = celebrate_1.Joi.object().keys({
    name: celebrate_1.Joi.string().required(),
    description: celebrate_1.Joi.string(),
    price: celebrate_1.Joi.number().required(),
    cost: celebrate_1.Joi.number(),
    ingredients: celebrate_1.Joi.array().items(ingredients),
    stock: celebrate_1.Joi.number(),
    drink: celebrate_1.Joi.boolean(),
    available: celebrate_1.Joi.boolean(),
    categoryId: celebrate_1.Joi.custom(validObjectId_1.default, 'valid id'),
});
exports.paramIdItem = {
    id: celebrate_1.Joi.custom(validObjectId_1.default, 'valid id').required(),
};
exports.paramNameItem = {
    name: celebrate_1.Joi.string(),
};
exports.queryPage = {
    page: celebrate_1.Joi.number(),
};
