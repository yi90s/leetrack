const express = require('express')
const axios = require('axios');
const router = express.Router();
const topicDao = require('../../daos/topic.dao')

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
    
    const topics = new Set();
    const problems = response.data.data.problemsetQuestionList.questions;
    
    problems.forEach(problem => {
        problem.topicTags.forEach(topicTag =>{
            topics.add(topicTag.name);
        })
    });

    try{
        console.log(topics);
        topics.forEach(async function (val, val, set){
            await topicDao.add(val);
        })
    }catch (err){
    }


    // topicDao.addAll(Array.from(topics));

    res.send(topics.toString());
})

function load(leetcodeCookie) {

}



module.exports = router;