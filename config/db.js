var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/whatsup", function () {
    console.log("mongodb connected");
});

module.exports = mongoose;
