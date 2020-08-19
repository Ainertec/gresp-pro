"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ItemSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
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
