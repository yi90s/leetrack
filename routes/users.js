var express = require('express');
var router = express.Router();
const userDao = require('../daos/user.dao');


/* GET users listing. */
router.get('/:username', async function (req, res, next) {
	const users = await userDao.getByUsername(req.params.username);
	console.log(req.params.username);
	if (users.length <= 0) {
		res.send("no user found");
	}
	res.send(users);
});

module.exports = router;
