var express = require("express");
const { handle } = require("express/lib/application");
const { Schema } = require("mongoose");
var shipment = require('../models/shipmentStatus');
var orders = require('../models/orders');
const customer = require("../models/customer");
const product = require("../models/product");
const delivery = require("../models/delivery")
const res = require("express/lib/response");
const { route } = require("express/lib/router");
const { v4: uuidv4 } = require('uuid');


var router = express.Router();

const shipmentStatus = (req, res) => {

    const createShipment = new shipment({
        "orderId": new mongoose.Types.ObjectId(),
        "customerId": req.body.customerId,
        "status": {
            "type": req.body.status.type,
            "date": req.body.status.date
        },
        "shipmentId": req.body.shipmentId,
        "creationDate": req.body.creationDate,
        "deliveryId": {
            "carrierId": req.body.deliveryId.carrierId,
            "leadTime": req.body.deliveryId.leadTime,
            "pickupDate": req.body.deliveryId.pickupDate,
            "warehouseId": req.body.deliveryId.warehouseId
        },
        "updatedDate": req.body.updatedDate
    })
    createShipment.save((result, err) => {
        if (err) {
            return handleError(err);
        }
        // const order = new Order({

        //     orderId: createShipment.orderId
        // });

        shipment.save(function(err) {

            if (err) {
                return handleError(err)
            } else {
                let uid = uuidv4();
                ShipmentId = uid;
                console.log(result);
                return res.status(200).json({
                    status: "200",
                    message: "Successfully Created",
                    ShipmentId: ShipmentId,
                    delivery: {
                        carrierId: carrierId
                    },
                    expectedDeliveryDate: expectedDeliveryDate,
                    orderId: orderId
                })
            }
        })
    })
}

//Create Delivery Information
const deliver = (req, res) => {
    const createDelivery = new delivery({
        "deliveryId": {
            "carrierId": req.body.deliveryId.carrierId,
            "leadTime": req.body.deliveryId.leadTime,
            "pickupDate": req.body.deliveryId.pickupDate,
            "warehouseId": req.body.deliveryId.warehouseId
        },
    })
    createDelivery.save((result, err) => {
        if (err) {
            return this.handleError(err);
        }
        delivery.save(function(err) {
            if (err) {
                return this.handleError(err);
            } else {
                console.log(result);
                return res.status(200).json({
                    status: "200",
                })

            }
        })

    })
}



const getOrderId = (req, res) => {
    orders.findOne({ "orderId": req.body.orderId }, (err, result) => {
        if (err) {
            console.log(err);
            return res.send(err);
        } else {
            console.log(result);
            return res.send({ result: result })
        }
    })
}


const getCustomer = (req, res) => {
    customer.findOne({ "userName": req.body.userName }, (err, result) => {
        if (err) {
            console.log(err);
            return res.send(err);
        } else {
            return res.send({ result: result });
        }
    })
}

const getProduct = (req, res) => {
    product.findOne({ "productName": req.body.productName, "qty": req.body.qty, "class": req.body.class }, (err, result) => {
        if (err) {
            console.log(err);
            return res.send(err);
        } else {
            return res.send({ result: result });
        }
    })
}

const updateOrder = (req, res) => {
        const updateOderId = { "orderId": req.body.orderId, customerId: req.body.customerId };
        const updateStatus = { "status": { "type": req.body.type }, "date": req.body.date };
        const statusUpdate = new Promise((resolve, reject) => {
            shipment.findOneAndUpdate(updateStatus, updateOderId, { "runValidators": true }, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    resolve(result);
                }
            })
        })
        statusUpdate.then((data) => {
            return res.status(200).json({
                status: "200",
                message: "Successfully picked up from warehouse"
            });
        })
    }
    // Delivery Delay
const delayOrder = (req, res) => {
    const delayOrd = { "orderId": req.body.orderId, customerId: req.body.customerId };
    const deliveryStatus = { "status": { "type": req.body.type }, "date": req.body.date };
    const statusDelivery = new Promise((resolve, reject) => {
        if (err) {
            console.log(err);
        } else {
            resolve(result);
        }
    })
    statusDelivery.then(data => {
        return res.status(200).json({
            status: "200 OK",
            message: "Due to heavey rain  your order is delay"
        })
    })
}

const deliverStatus = (req, res) => {
    const order = { "orderId": req.body.orderId, customerId: req.body.customerId };
    const deliveryStatus = { "status": { "type": req.body.type }, "date": req.body.date };
    const status = new Promise((resolve, reject) => {
        if (err) {
            return this.handleError(err)
        } else if (status.type === "deliveredToHub") {
            return res.status(200).json({ status: "200 Ok", message: "deliveryToHub" });
        } else if (status.type === "inTransitFromHub") {
            return res.status(200).json({ status: "200 Ok", message: "In TransmitFrom Hub" });
        } else if (status.type === "deliveredToLocal") {
            return res.status(200).json({ status: "200 OK", message: "deliveredToLocal" });
        } else if (status.type === "outForDelivery") {
            return res.status(200).json({ status: "200 OK", message: "outForDelivery" })
        } else if (status.type === "delivered") {
            return res.status(200).json({ status: "200 OK", message: "delivered" })
        }
    })
}

// Routers
router.post("/shipmentStatus", shipmentStatus);
router.get("/getOrderId", getOrderId);
router.get("/getCustomer", getCustomer);
router.get("/getProduct", getProduct);
router.put("/updateOrder", updateOrder);
router.post("/deliver", deliver);
router.post("delayOrder", delayOrder);
router.post("/deliverStatus", deliverStatus);

module.exports = router;