"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var celebrate_1 = require("celebrate");
var sessionSchema = celebrate_1.Joi.object().keys({
    name: celebrate_1.Joi.string().required(),
    password: celebrate_1.Joi.string().required(),
});
exports.default = sessionSchema;
