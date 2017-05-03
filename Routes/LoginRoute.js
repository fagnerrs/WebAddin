var express = require('express');
var UserModel = require('../Model/UserModel');
var router = express.Router();

var users = new UserModel().getUsers();

router.get('/:username/:password', function (req, res, next) {
    var success = false;
    users.forEach(function (value) {
        if (req.params.username == value.email && req.params.password == value.password) {
            success = true;
        }
    });

    if (!success) {
        console.log("User not found: " + req.params.username);
        res.send({
            "error": "User undefined",
            "success": false
        });
    }
    else {
        console.log("Login success: " + req.params.username);
        res.send({
            "access_token": "ABE421111",
            "success": true
        });
    }

    res.end();
});

module.exports = router;
