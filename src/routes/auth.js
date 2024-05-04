var express = require('express');
var router = express.Router();
const userDao = require('@lib/dao/user.dao');
const crypt = require('@lib/auth/crypt');
const jwt = require('@lib/auth/jwt')

router.post('/token', validateLogin, async function(req, res, next){
	const {username, password} = req.body;

	try{
		const user = (await userDao.getByUsername(username))[0];

		if(!user){
			return res.send("the user does not exist");
		}

		const pass = await crypt.compare(password, user.password);
		
		if(!pass){
			return res.send("the password is incorrect");
		}

        const jwtToken = jwt.sign(user);
		
		res.json({
            'jwtToken': jwtToken
        });
	}catch(error){
		console.error(error);
		res.status(500);
	}
})

// router.post('/logout', async function(req, res, next){

// })

router.post('/register', validateRegistration, async function (req, res, next) {
	const { username, password, email } = req.body;

	try {
		await userDao.add({
			'username': username,
			'password': await crypt.hash(password),
			'email': email
		});
		
		res.status(200).send('User registered successfully');
	} catch (error) {
		if(error.code == 'ER_DUP_ENTRY'){
			res.status(200).send('Username or Email already exists');
		}
		res.status(500);
	}

})

function validateRegistration(req, res, next) {
	const { username, password, email } = req.body;
	if (!username || username.length < 3) {
		console.log(username);
		return res.status(400).send("Invalid username");
	}
	if (!password || password.length < 6) {
		return res.status(400).send("Password must be at least 6 characters long");
	}
	next();
}

function validateLogin(req, res, next){
	const {username, password} = req.body;
	if(!username){
		return res.status(200).send("username cannot be empty");
	}
	if(!password){
		return res.status(200).send("password cannot be empty");
	}
	next();
}

module.exports = router;
