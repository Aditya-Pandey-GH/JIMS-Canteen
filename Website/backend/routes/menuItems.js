const express = require('express');
const router = express.Router();

const MenuItem = require('../models/MenuItems');

router.get('/', (req, res) => {
    MenuItem.find()
        .sort({ itemId: 1 })
        .then(menuItems => res.json(menuItems))
        .catch(err => res.status(404).json({ noitemsfound: 'No items found in the menu' }));
});

router.post('/', (req, res) => {
    const newItem = new MenuItem({
        itemId: req.body.itemId,
        itemName: req.body.itemName,
        totalPrice: req.body.totalPrice,
    });

    newItem.save().then(menuItem => res.json(menuItem));
});

router.put('/:id', (req, res) => {
    MenuItem.findOneAndUpdate({ itemId: req.params.id }, req.body, { new: true })
        .then(menuItem => res.json(menuItem))
        .catch(err => res.status(400).json({ updatefailed: 'Update failed' }));
});

router.delete('/:id', (req, res) => {
    Menu.findOneAndDelete({ itemId: req.params.id })
        .then(() => res.json({ success: true }))
        .catch(err => res.status(404).json({ deletefailed: 'Delete failed' }));
});

module.exports = router;
