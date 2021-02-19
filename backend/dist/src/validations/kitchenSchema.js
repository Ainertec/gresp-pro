"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var celebrate_1 = require("celebrate");
var kitchen = celebrate_1.Joi.object().keys({
    identification: celebrate_1.Joi.number().required(),
});
exports.default = kitchen;
