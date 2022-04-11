const mongoose = require('mongoose');


const connectDB = async() => {

    const mongoDB = 'mongodb+srv://ChiguruvadaSekhar:Asha5504@cluster0.on6bz.mongodb.net/trackingproject'

    await mongoose.connect(mongoDB);

    const db = mongoose.connection;

    db.on("error", () => {
        console.log(`Error:"MongoDB Error: Connection Failed"`);

    });

    db.once("open", function() {
        console.log("Connected Successfuly");
    });
};

module.exports = connectDB;