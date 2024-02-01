const mongoose = require("mongoose");
const marketingadmins = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, uniqe: true },
    password: { type: String, required: true },
    role: String,
    token: String
})
module.exports = mongoose.model("marketingadmins", marketingadmins)

