//const Timestamps = require("mongoose-timestamp");
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    identification: Number,
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: Number
    }],
    drinkables: [{
        drinkable: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Drinkable",
        },
        quantity: Number
    }],
    closed: {
        type: Boolean,
        default: false
    },
    total: Number,
    note: String,
    payment: {
        type: String,
        default: null
    },
    finished:{
        type: Boolean,
        default: false,
    }
}, { timestamps: { createdAt: "create_at", updatedAt: "update_at" } });



module.exports = mongoose.model("Order", OrderSchema);
