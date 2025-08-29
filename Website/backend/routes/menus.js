const express = require('express');
const router = express.Router();

const Menu = require('../models/Menu');

router.get('/', (req, res) => {
	Menu.find()
		.sort({ itemId: 1 })
		.then(menus => res.json(menus))
		.catch(err => res.status(404).json({ nomenuitemsfound: 'No items found in the menu' }));
});

router.post('/', (req, res) => {
	const newItem = new Menu({
		itemId: req.body.itemId,
		quantity: req.body.quantity,
	});

	newItem.save().then(menu => res.json(menu));
});

router.put('/:id', (req, res) => {
	console.log(req.body);
	Menu.findOneAndUpdate({ itemId: req.params.id }, req.body, { new: true })
		.then(menu => res.json(menu))
		.catch(err => res.status(400).json({ updatefailed: 'Update failed' }));
});

router.delete('/:id', (req, res) => {
	Menu.findOneAndDelete({ itemId: req.params.id })
		.then(() => res.json({ success: true }))
		.catch(err => res.status(404).json({ deletefailed: 'Delete failed' }));
});

module.exports = router;
