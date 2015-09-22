var async = require("async");
var Status = require("../models/status");
var request = require("request");
var status_cache = [];
var timeout = 20000;

function processResponse(error, response, status) {
    if(response) {
        response.on('error', function(exception) { console.log(exception); });
    }

    if (response === null || response === undefined) {
        status["status"] = false;
    }
    else if(!error && response){
        status["status"] = response.statusCode == 200? true: false;
    }
    else{
        status["status"] = false;
    }

    status["timestamp"] = Date.now();
}

exports.getStatuses = function (req, res, next) {
    
    Status.find()
    .exec( function(err, statuses) {

        if (err) { return next(err); }
        
        // For every service,
        // Call the health check URL
        // If the URL returns a status of 200, set status to true
        async.map(statuses, function(status, callback) {
            
            request({ url: status["url"], timeout: timeout }, function(error, response, html) {
                processResponse(error, response, status);
                callback(error, html);

            }).on('error', function(e) {
                    console.log('problem with request: ' + e.message);
                    status["timestamp"] = Date.now();
                    status["status"] = false;
                });
            ;

        }, function(err, results) {
            status_cache = statuses;
            res.json(statuses);
        });     

    });

}

exports.addStatus = function (req, res, next) { 
    var status = new Status({
        service: req.body.service,
        status: true,
        url: req.body.url,
        category: req.body.category,
        pointofcontact:  req.body.pointofcontact,
        uptime:  "-",
        timestamp: ""
    });

    status.save( function(err, status){
        if(err){ console.log(err); return next(err); }
        res.redirect('/');
    });
}

exports.postDetailsToClient = function (socket) {
    async.map(status_cache, function(status, callback) {
        
            request({url: status["url"], timeout: timeout}, function(error, response, html) {
                processResponse(error, response, status);
                callback(error, html);
                
            }).on('error', function(e) {
                    status["timestamp"] = Date.now();
                    status["status"] = false;
                });;
        
        }, function(err, results) {
            socket.emit("statuses", status_cache);
        }); 
}


