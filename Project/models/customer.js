const mongoose = require("mongoose");
mongoose.pluralize(null);
const autoIncrement = require("mongoose-sequence")(mongoose);

const customers = new shcema({
    userName: { type: String }
});

const customer = mongoose.model("customers", customers);
module.exports = customer;