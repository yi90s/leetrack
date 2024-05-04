const jwt = require('jsonwebtoken')

function sign(user){
    return jwt.sign({user:user}, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = {sign};