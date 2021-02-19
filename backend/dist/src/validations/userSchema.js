"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramName = exports.paramIdUser = exports.userUpdate = exports.user = void 0;
var celebrate_1 = require("celebrate");
var validObjectId_1 = __importDefault(require("./validObjectId"));
exports.user = celebrate_1.Joi.object().keys({
    name: celebrate_1.Joi.string().required(),
    password: celebrate_1.Joi.string().required(),
    question: celebrate_1.Joi.string().required(),
    response: celebrate_1.Joi.string().required(),
    admin: celebrate_1.Joi.boolean(),
});
exports.userUpdate = celebrate_1.Joi.object().keys({
    name: celebrate_1.Joi.string(),
    password: celebrate_1.Joi.string(),
    question: celebrate_1.Joi.string().required(),
    response: celebrate_1.Joi.string().required(),
    admin: celebrate_1.Joi.boolean(),
});
exports.paramIdUser = {
    id: celebrate_1.Joi.custom(validObjectId_1.default, 'valid id').required(),
};
exports.paramName = {
    name: celebrate_1.Joi.string().required(),
};
