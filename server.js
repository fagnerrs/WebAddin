// variables
var http = require('http');
var https = require('https');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fs = require('fs');

///// CONFIGURATIONS ///////////////////////////
var config = require('./Config/Config.js');

// declaring routes
var loginRoute = require('./Routes/LoginRoute');

// setting configuration
var app = express();
app.set('port', config.server_port);
app.set('address', config.server_ip_address);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('./'));

app.use('/user', loginRoute);


// start http server
app.listen(app.get('port'), app.get('address'), function() {
  console.log(" Server started... ");
});

//https.createServer({
//    key: fs.readFileSync('./Cert/key.pem'),
//    cert: fs.readFileSync('./Cert/cert.pem')
//}, app).listen(443);


