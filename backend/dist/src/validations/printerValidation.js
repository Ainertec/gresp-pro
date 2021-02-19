"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var celebrate_1 = require("celebrate");
var printer = celebrate_1.Joi.object().keys({
    identification: celebrate_1.Joi.number().required(),
    type: celebrate_1.Joi.boolean().required(),
    oldItems: celebrate_1.Joi.array(),
});
exports.default = printer;
