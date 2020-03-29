const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    token: String
}, { selectPopulatedPaths: true });
const Token = mongoose.model("Klass", tokenSchema);

module.exports = Token;