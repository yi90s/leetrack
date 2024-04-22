
const pool = require('../databases/connPool');

const conn = pool.pool;

function update(user){

}

async function add(user){
    const {username, email, password} = user;

    var result = await conn.execute('INSERT Users SET username = ?, email_address = ?, password = ?', [username, email, password]);
    return result;
}

async function getByUsername(username){
    const [rows, fields] = await conn.execute('SELECT * FROM Users WHERE username = ?', [username]);
    return rows[0];
}

async function getByEmail(email){
    const [rows, fields] = await conn.execute('SELECT * FROM Users WHERE email_address = ?', [email]);
    return rows[0];
}


module.exports = {add, update, getByEmail, getByUsername};