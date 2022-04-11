const mongoose = require("mongoose");
mongoose.pluralize(null);
const autoIncrement = require("mongoose-sequence")(mongoose);

const products = new shcema({
    productrName: { type: String },
    qty: { type: String },
    class: { type: String }
});

const product = mongoose.model("products", products);
module.exports = product;