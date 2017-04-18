// variables
var http = require('http');
var path = require('path');
var express = require('express');

///// CONFIGURATIONS ///////////////////////////
var config = require('./Config/config.js');

// setting configuration
var app = express();
app.set('port', config.server_port);
app.set('address', config.server_ip_address);

app.use(express.static('./'));

// start http server
app.listen(app.get('port'), app.get('address'), function () {
    console.log(" Server started at port: " + app.get('port'));
    console.log(" Go to: https:// " + app.get('address') + ":" + app.get('port') + "/Views/Login/Login.html");
});