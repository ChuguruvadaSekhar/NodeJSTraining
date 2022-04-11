const mongoose = require("mongoose");
mongoose.pluralize(null);
const autoIncrement = require("mongoose-sequence")(mongoose);

const orderStatus = new shcema({
    orderId: { type: String }
});

const order = mongoose.model("orderStatus", orderStatus);
module.exports = order;