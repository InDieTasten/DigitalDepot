var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/all', function (req, res, next) {
    let rawLanes = fs.readFileSync('./json/lanes.json');
    res.send(JSON.parse(rawLanes));
});

router.get('/:id',  function (req, res, next) {
    let rawLanes = fs.readFileSync('./json/lanes.json');
    let lanes = JSON.parse(rawLanes);

    res.send(JSON.stringify(lanes[req.params.id]));
});
module.exports = router;