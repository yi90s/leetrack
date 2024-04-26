const knex = require('@lib/database/connection').knex;

const logger = require('@lib/logger/logger')

async function add(problem){
    const query = `
        INSERT Problems SET name = ?, difficulty_id = ?, topic_id = ?, url = ?;
    `;
    try{
        await pool.query(query, [problem.name, problem.difficultyId, problem.topicId, problem.url]);
    }catch (error){
        logger.error(error);
        throw new Error("Failed to add problem to database");
    }
    

}

module.exports = {}