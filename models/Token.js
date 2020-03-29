const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    access_token: String
}, { selectPopulatedPaths: true });
const Token = mongoose.model("Token", tokenSchema);

module.exports = Token