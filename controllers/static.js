var express = require("express");
var router = express.Router();


router.get('/', function(req, res) {
    res.sendfile('views/index.html');
});

router.use('/public', express.static(__dirname + '/../public'));
module.exports = router;
