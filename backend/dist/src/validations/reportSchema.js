"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var celebrate_1 = require("celebrate");
var report = celebrate_1.Joi.object().keys({
    initial: celebrate_1.Joi.string().required(),
    final: celebrate_1.Joi.string().required(),
});
exports.default = report;
