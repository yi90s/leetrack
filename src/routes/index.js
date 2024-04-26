var express = require('express');
var router = express.Router();
var logger = require('@lib/logger/logger')

router.get('/', async function(req, res, next){

    res.status(200).send("welcome to leetrack")
})

module.exports = router;