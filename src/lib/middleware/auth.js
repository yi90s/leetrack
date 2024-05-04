const jsonwebtoken = require('jsonwebtoken')

function jwt(){

    return (req, res, next) => {
        const header = req.headers['authorization'];

        // unauthorized request
        if (header == null || !header.startWith('Bearer')){
            return res.sendStatus(401);  
        }

        
        const splits = header.split(' ')

        // missing the token
        if(splits.length < 2){
            res.status(401).send('JWT token is empty');
        }
        
        const token = splits[1];

        try{
            const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET);
            
            // attach user in req object for later use
            req.user = payload.user;

        }catch(verifyErr){
            return res.status(401).send(verifyErr.message);
        }
        
        
        next(); // pass the auth'ed request to handlers
    }
}

module.exports = {jwt};