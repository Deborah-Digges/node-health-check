var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var statusController = require('./controllers/statuses');
var pushInterval = 10000;
var port = process.env.PORT || 3000;


app.use(bodyParser());
require('./config/routes')(app);
app.set('port', port);
app.use(require('./controllers/static'));

io.on('connection', function(socket){
    setInterval(function(){ statusController.postDetailsToClient(socket) }, pushInterval);
});

http.listen(app.get('port'), '0.0.0.0',  function () {
      console.log('Server listening on', app.get('port'));
});
