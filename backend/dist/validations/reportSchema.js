"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportDelete = exports.report = void 0;
const celebrate_1 = require("celebrate");
const validObjectId_1 = __importDefault(require("./validObjectId"));
exports.report = celebrate_1.Joi.object().keys({
    initial: celebrate_1.Joi.string().required(),
    final: celebrate_1.Joi.string().required(),
});
exports.reportDelete = {
    id: celebrate_1.Joi.custom(validObjectId_1.default, 'valid id').required(),
};
//# sourceMappingURL=reportSchema.js.map