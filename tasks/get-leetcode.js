var axios = require('axios')
var knex = require('../src/lib/database/connection').knex;

async function getLeetcodeProblems() {
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

    const variables = { "categorySlug": "", "skip": 0, "limit": 4000, "filters": {} };
    const response = await axios.post('https://leetcode.com/graphql/', { query, variables });
    const problems = response.data.data.problemsetQuestionList.questions;
    
    return knex.transaction(async (trx) => {
        try{
            const difficulties = await trx('Difficulties').select('difficulty_id', 'name');
            const difficultyMap = {};
            difficulties.forEach(difficulty => {
                difficultyMap[difficulty.name.toLowerCase()] = difficulty.difficulty_id;
            });

            for(const problem of problems){
                const difficultyId = difficultyMap[problem.difficulty.toLowerCase()];
                if(!difficultyId){
                    throw new Error(`Difficulty with name ${problem.difficulty} does not exist`)
                }
                await trx('Problems').insert({title: problem.title, title_slug: problem.titleSlug, difficulty_id: difficultyId});
            }

            await trx.commit();
            console.log('All problems inserted successfully')

        } catch (error){
            await trx.rollback();
            console.error('Error inserting problem:', error);
        }
    })

}

getLeetcodeProblems()
    .then(() => {
        // Close the database connection
        knex.destroy();
        // Exit the process with success status
        process.exit(0);
    })
    .catch((error) => {
        // Close the database connection
        knex.destroy();
        // Log the error
        console.error('Error:', error);
        // Exit the process with error status
        process.exit(1);
    });