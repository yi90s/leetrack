
const pool = require('../databases/connPool');

async function add(topicName){
    
    var result = await pool.execute('INSERT Topics SET name = ?', [topicName]);
    return result;
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