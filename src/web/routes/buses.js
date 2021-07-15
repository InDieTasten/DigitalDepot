var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/all', function (req, res, next) {
    let rawBuses = fs.readFileSync('./json/buses.json');
    res.send(JSON.parse(rawBuses));
});

router.get('/:id',  function (req, res, next) {
    let rawBuses = fs.readFileSync('./json/buses.json');
    let buses = JSON.parse(rawBuses);

    res.send(JSON.stringify(buses[req.params.id]));
});
router.get('/:id/position', function (req, res, next) {
    let rawPosition = fs.readFileSync('./json/position.json');
    let position = JSON.parse(rawPosition);
    for (let i = 0; i < position.length; ++i) {
        console.log(i);
        let bus = position[i].buses.find(bus => bus.bus.id == req.params.id);
        if (bus) {
            res.send(JSON.stringify("{lane:"+ (i+1) + ", position:" + (position[i].buses.indexOf(bus) + 1) + "}"));
            return;
        }
    }
   res.send(JSON.stringify("ERROR"));
});


module.exports = router;