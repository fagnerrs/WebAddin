// variables
var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var https = require('https');
var fs = require('fs');

///// CONFIGURATIONS ///////////////////////////
var config = require('./Config/Config.js');

// declaring routes
var loginRoute = require('./Routes/LoginRoute');
var grantsEmailRoute = require('./Routes/OrganizationRoute');

// setting up configurations
var app = express();
app.set('port', config.server_port);
app.set('address', config.server_ip_address);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./'));

app.use('/login', loginRoute);
app.use('/organization', grantsEmailRoute);

// start http server
app.listen(app.get('port'), app.get('address'), function () {
    console.log(" Server started at port: " + app.get('port'));
});


var options = {
    key: fs.readFileSync('./Cert/key.pem'),
    cert: fs.readFileSync('./Cert/cert.pem')
};

// start https server
https.createServer(options, app).listen(3000);

