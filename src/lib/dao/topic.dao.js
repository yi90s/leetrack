
const pool = require('@lib/database/connection');
const logger = require('@lib/logger/logger')

async function add(topicName){
    try{
        const [result, fields] = await pool.execute('INSERT Topics SET name = ?', [topicName]);

    }catch(error){
        logger.error(`${error.message}\n${error.stack}`);
        throw error;
    }
}

async function addAll(topicNames){
    var query = "";
    topicNames.forEach(topicName => {
        query += `INSERT Topics SET name="${topicName}";`;
    });
    var result = await pool.query(query);
    return result;
}


module.exports = {add, addAll};