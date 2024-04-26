
const pool = require('@lib/database/connection');

const conn = pool;
const knex = pool.knex;

function update(user){

}

async function add(user){
    const {username, email, password} = user;

    var result = await conn.execute('INSERT Users SET username = ?, email_address = ?, password = ?', [username, email, password]);
    return result;
}

async function getByUsername(username){
    const rows = knex.select().from('Users').where('username', username);
    return rows;
}

async function getByEmail(email){
    const [rows, fields] = await conn.execute('SELECT * FROM Users WHERE email_address = ?', [email]);
    return rows[0];
}


module.exports = {add, update, getByEmail, getByUsername};