const knex = require('knex')

async function getById(attemptId){
    const attempts = await knex.select().from('Attempts').where('attempt_id', attemptId);
    return attempts[0];
}

async function getByUserId(userId){
    return await knex.select().from('Attempts').where('user_id', userId);
}

module.exports = {getById, getByUserId}