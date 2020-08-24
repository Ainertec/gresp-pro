"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramIdCategory = exports.category = void 0;
var celebrate_1 = require("celebrate");
var validObjectId_1 = __importDefault(require("./validObjectId"));
exports.category = celebrate_1.Joi.object().keys({
    name: celebrate_1.Joi.string().required().exist(),
    products: celebrate_1.Joi.array().required(),
    color: celebrate_1.Joi.string(),
});
exports.paramIdCategory = {
    id: celebrate_1.Joi.custom(validObjectId_1.default, 'valid id').required(),
};
