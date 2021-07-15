var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/all', function (req, res, next) {
    let rawPosition = fs.readFileSync('./json/position.json');
    res.send(JSON.parse(rawPosition));
});

router.get('/:id', function (req, res, next) {
    let rawPosition = fs.readFileSync('./json/position.json');
    let position = JSON.parse(rawPosition);

    res.send(JSON.stringify(position[req.params.id]));
});
router.get('/:lane/:pos', function (req, res, next) {
    let rawPosition = fs.readFileSync('./json/position.json');
    let position = JSON.parse(rawPosition);

    res.send(JSON.stringify(position[req.params.lane].buses[req.params.pos]));
});
module.exports = router;