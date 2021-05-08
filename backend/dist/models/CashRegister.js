"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ExitsSchema = new mongoose_1.Schema({
    value: {
        type: Number,
        required: true,
    },
    login: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});
const CashRegisterSchema = new mongoose_1.Schema({
    thing: {
        type: Number,
        required: true,
    },
    debit: {
        type: Number,
        default: 0,
    },
    credit: {
        type: Number,
        default: 0,
    },
    cash: {
        type: Number,
        default: 0,
    },
    closure: {
        type: Number,
        default: 0,
    },
    exits: [ExitsSchema],
}, {
    timestamps: true,
});
exports.default = mongoose_1.model('CashRegister', CashRegisterSchema);
//# sourceMappingURL=CashRegister.js.map