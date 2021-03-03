"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const kitchen = celebrate_1.Joi.object().keys({
    identification: celebrate_1.Joi.number().required(),
});
exports.default = kitchen;
//# sourceMappingURL=kitchenSchema.js.map