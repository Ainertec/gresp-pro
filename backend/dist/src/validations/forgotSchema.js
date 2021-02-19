"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.post = void 0;
var celebrate_1 = require("celebrate");
exports.post = celebrate_1.Joi.object().keys({
    name: celebrate_1.Joi.string().required().exist(),
    response: celebrate_1.Joi.string().required(),
    password: celebrate_1.Joi.string().required(),
});
exports.get = {
    name: celebrate_1.Joi.string().required(),
};
