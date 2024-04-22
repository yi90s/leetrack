const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hash(plaintext){
    return await bcrypt.hash(plaintext, saltRounds);
}

async function compare(plaintext, hash){
    return await bcrypt.compare(plaintext, hash);
}

module.exports = {hash, compare}