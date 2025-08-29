const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/', (req, res) => {
	const adminID = req.query.adminID;
	const pswd = req.query.pswd;
	let usrFound = false;
	let curUsr = null;
	User.find()
		.then(users => {
			users.map((user) => {
				if (user.adminID === adminID) {
					usrFound = true;
					if (user.pswd === pswd) {
						curUsr = user;
					}
				}
			});
			if (curUsr) {
				res.json(curUsr);
			} else {
				res.status(500).json({ alert: 'Invalid Credentials' })
			}
		})
		.catch(err => res.status(404).json({ noordersfound: 'No users found' }));
});

router.post('/', (req, res) => {
	const newUser = new User({
		adminID: req.body.adminID,
		pswd: req.body.pswd,
	});

	newUser.save().then(user => res.json(user));
});

router.put('/:id', (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then(user => res.json(user))
		.catch(err => res.status(400).json({ updatefailed: 'Update failed' }));
});

router.delete('/:id', (req, res) => {
	User.findByIdAndDelete(req.params.id)
		.then(() => res.json({ success: true }))
		.catch(err => res.status(404).json({ deletefailed: 'Delete failed' }));
});

module.exports = router;
