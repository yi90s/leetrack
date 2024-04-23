const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
    const header = req.headers['authorization'];
    if (header == null) return res.sendStatus(401);
    
    const tokenParts = header.split(' ');
    if(tokenParts.length == 2 && tokenParts[0].toLowerCase() === 'bearer'){
        jwt.verify(tokenParts[1], process.env.JWT_SECRET, (err, user) => {
            if (err) return res.send(err.message);
            req.user = user;
            next();
        });
    }

};

function sign(username){
    console.log(username);
    return jwt.sign({name: username}, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = {authenticateToken, sign};