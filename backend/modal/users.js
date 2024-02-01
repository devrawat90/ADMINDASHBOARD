const mongoose = require("mongoose");
const allleadusers = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: Number },
    address: { type: String },
    status: { type: String },
    password: { type: String },
    admin_id: { type: String },
    message: { type: String }
})
const leadusers = mongoose.model("allleadusers", allleadusers)



module.exports = { leadusers }