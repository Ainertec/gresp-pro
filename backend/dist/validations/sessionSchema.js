"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const sessionSchema = celebrate_1.Joi.object().keys({
    name: celebrate_1.Joi.string().required(),
    password: celebrate_1.Joi.string().required(),
});
exports.default = sessionSchema;
//# sourceMappingURL=sessionSchema.js.map