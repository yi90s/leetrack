var express = require('express');
var router = express.Router();
// var logger = require('@lib/logger/logger')

router.get('/', async function(req, res, next){
    const problemId = req.query.problemId;
    
    if(req.user.username !== username){

    }
})

module.exports = router;