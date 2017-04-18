var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('getting');
});

router.post('/register', function (req, res) {
    res.send('registering');
});

/* params
   Content-Type: application/json 
   body: { "Username":"user@fluxx.io", "Password":"" } */
router.post('/login', function (req, res, next) {
    
    res.send('Username: ' + req.body.Username);
});

router.get('/logout', function (req, res) {
    res.send('logout');
});

module.exports = router;
