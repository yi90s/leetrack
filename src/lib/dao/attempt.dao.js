const knex = require('knex')

async function getById(attemptId){
    const attempts = await knex.select().from('Attempts').where('attempt_id', attemptId);
    return attempts[0];
}

async function getByUserId(userId){
    return await knex.select().from('Attempts').where('user_id', userId);
}

async function add(attempt){
    const result = await knex('Attempts').insert({
        user_id : attempt.user_id,
        problem_id : attempt.problem_id,
        timestmp: attempt.timestmp
    });

    return result[0];
}

module.exports = {getById, getByUserId, add}