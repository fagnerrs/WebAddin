var express = require('express');
var router = express.Router();

router.get('/message/', function (req, res, next) {
    console.log("message id: " + req.query.id);
    res.send({
        "success": true, "data": [
            {
                "model_type": "Request", "description": "Related grants", 
                "organizations": [
                    { "id": 4921, "description": "ABC Grant", "address": "New York, NY, USA", "phone": "G-9985-69854" },
                    { "id": 23111, "description": "DEF Living", "address": "New York, NY, USA", "phone": "G-9985-69854" }
                ], "emails": [{ "message_id": 1234, "conversation_id": 456 },
                              { "message_id": 1234, "conversation_id": 456 }]
            },
            {
                "model_type": "Request", "description": "Related requests", 
                "organizations": [
                    { "id": 1234, "description": "FGH Snow", "phone" : "G-9985-69854" },
                    { "id": 1235, "description": "IJL Board", "address": "New York, NY, USA" }
                ], "emails": []
            },
            {
                "model_type": "User", "description": "Related people",
                "organizations": [
                    { "id": 1236, "description": "MNO Showhouse", "address": "New York, NY, USA", "phone": "G-9985-69854" },
                    { "id": 1237, "description": "PQR Stakeholder", "address": "New York, NY, USA", "phone": "G-9985-69854" }
                ], "emails": []
            },
        ]
    });

    res.end();
});

router.post('/:organizationId/email', function (req, res, next) {

    console.log(req.params.organizationId);

    res.end();
});

module.exports = router;