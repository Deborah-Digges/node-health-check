var mongoose = require("mongoose");

var url = process.env.MONGOLAB_URI || "mongodb://localhost/whatsup";

mongoose.connect(url, function () {
    console.log("mongodb connected");
});

module.exports = mongoose;
