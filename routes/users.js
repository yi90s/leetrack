var express = require('express');
var router = express.Router();
const userDao = require('../daos/user.dao');
const crypt = require('../encryp/crypt');

/* GET users listing. */
router.get('/:username', async function (req, res, next) {
	const users = await userDao.getByUsername(req.params.username);
	console.log(req.params.username);
	if (users.length <= 0) {
		res.send("no user found");
	}
	res.send(users);
});

router.post('/login', validateLogin, async function(req, res, next){
	const {username, password} = req.body;

	try{
		const user = await userDao.getByUsername(username);
		if(!user){
			return res.send("the user does not exist");
		}
		const pass = await crypt.compare(password, user.password);

		if(!pass){
			return res.send("the password is incorrect");
		}		
		
		res.send("login successfully")
	}catch(error){
		console.error(error);
		res.status(500);
	}
})

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
		console.error(error);
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
