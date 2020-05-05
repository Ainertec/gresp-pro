const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    login: String,
    password: String
});

module.exports = mongoose.model("admin",AdminSchema);