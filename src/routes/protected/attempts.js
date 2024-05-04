var express = require('express');
var router = express.Router();
var attemptDao = require("@lib/dao/attempt.dao")
var userDao = require("@lib/dao/user.dao")
// var logger = require('@lib/logger/logger')

router.get('/', async function(req, res, next){
    const userid = req.user.userid;
})

router.post('/', async function(req, res, next){
    
    const addedRow = attemptDao.add({
        user_id: req.user.user_id,
        problem_id: req.query.problemId,
        timestmp: Date.now()
    })

    if(addedRow <= 0){
        res.status(401).send({
            "message":"failed to add the attempt"
        })
    }

    res.status(200).send({
        "message": "The Attempt has been added"
    })
})

module.exports = router;