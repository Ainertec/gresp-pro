const mongoose  = require("mongoose");

const DrinkableSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    stock: Number 
});

module.exports = mongoose.model("Drinkable", DrinkableSchema);