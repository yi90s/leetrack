var axios = require('axios')
var knex = require('@lib/database/connection')

const LIMIT = 200;

async function getLeetcodeProblems(){
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
                difficulty
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

const variables = {"categorySlug": "", "skip": 0, "limit": LIMIT, "filters": {}};

const response = await axios.post('https://leetcode.com/graphql/', { query, variables });

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


}catch(err){

}
}