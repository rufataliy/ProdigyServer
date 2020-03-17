const mongoose = require("mongoose");
const Klass = require("../models/Klass");

Klass.index({ author: 1 }, () => {
    console.log("INDEX CREATED");
});