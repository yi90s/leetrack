const express = require('express')
const axios = require('axios');
const router = express.Router();
const topicDao = require('@lib/dao/topic.dao')
const logger = require('@lib/logger/logger');

router.post('/reload', async function (req, res, next) {

    const query = `
        query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
            problemsetQuestionList: questionList(
                categorySlug: $categorySlug
                limit: $limit
                skip: $skip
                filters: $filters
            ){
                total: totalNum
                questions: data {
                    acRate
                    difficulty
                    status
                    title
                    titleSlug
                    topicTags{
                        name
                        slug
                    }
                }
            }
        }
    `;

    const variables = {"categorySlug": "", "skip": 0, "limit": 200, "filters": {}};
   
    const response = await axios.post('https://leetcode.com/graphql/', { query, variables });
    
    var topics = new Set();
    const problems = response.data.data.problemsetQuestionList.questions;
    
    try{
        problems.forEach(problem => {
            problem.topicTags.forEach(topicTag =>{
                topics.add(topicTag.name);
            })
        });
        
        topics = Array.from(topics);

        for(var i = 0; i < topics.length; i++){
            await topicDao.add(topics[i]);
        }

        res.send(topics);

    }catch(err){
        logger.error(err.message, err.stack);
        res.status(500).json({error: "an unexpected error ocurred"})
    }

    
})




module.exports = router;