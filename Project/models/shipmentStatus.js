const mongoose = require("mongoose");
mongoose.pluralize(null);

const autoIncrement = require("mongoose-sequence")(mongoose);



const shipmentStatus = new shcema({

    orderId: { type: String, required: true },
    customerId: { type: String },
    status: { type: { type: String }, date: { type: Date } },

    shipmentId: { type: String },
    creationDate: { type: String },
    deliveryId: { carrierId: { type: String }, leadTime: { type: String }, pickupDate: { type: Date }, warehouseId: { type: String } },
    updatedDate: { type: String }
});

const trackingProject = mongoose.model("shipmentstatus", shipmentStatus);

module.exports = trackingProject