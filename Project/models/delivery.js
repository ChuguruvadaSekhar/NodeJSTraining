const mongoose = require("mongoose");
mongoose.pluralize(null);
const autoIncrement = require("mongoose-sequence")(mongoose);

const deliver = new shcema({
    deliveryId: { carrierId: { type: String }, leadTime: { type: String }, pickupDate: { type: Date }, warehouseId: { type: String } },

});

const delivery = mongoose.model("deliver", deliver);
module.exports = delivery;