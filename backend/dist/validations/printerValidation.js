"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printerComprovant = exports.printer = void 0;
const celebrate_1 = require("celebrate");
exports.printer = celebrate_1.Joi.object().keys({
    identification: celebrate_1.Joi.number().required(),
    type: celebrate_1.Joi.boolean().required(),
    oldItems: celebrate_1.Joi.array(),
});
exports.printerComprovant = celebrate_1.Joi.object().keys({
    identification: celebrate_1.Joi.number().required(),
});
//# sourceMappingURL=printerValidation.js.map