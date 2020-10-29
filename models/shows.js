var mongoose = require("mongoose");

var setSchema = mongoose.Schema({
    set: Array,
    company: String,
})

module.exports = mongoose.model("Set", setSchema);