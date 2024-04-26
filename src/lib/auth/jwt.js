const jwt = require('jsonwebtoken')

function sign(username){
    return jwt.sign({name: username}, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = {sign};