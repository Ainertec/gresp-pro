"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ItemSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: null,
    },
    products: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Item',
        },
    ],
}, {
    timestamps: true,
});
exports.default = mongoose_1.model('Category', ItemSchema);
//# sourceMappingURL=Category.js.map