const mongoose = require("mongoose");
const teachers = mongoose.Schema({
    name: { type: String, },
    email: { type: String, },
    password: { type: String, },
    // address: { type: String, required: false },
    // jobTitle: { type: String, required: false },
    // message: { type: String, required: false }
})

module.exports = mongoose.model("teachers", teachers)
