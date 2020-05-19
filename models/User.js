const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nickname: String,
    name: String,
    picture: String,
    email: String,
    email_verified: mongoose.SchemaTypes.Boolean,
});

const User = mongoose.model("User", userSchema);

module.exports = User;