const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
	itemId: {
		type: String,
		required: true,
	},
	itemName: {
		type: String,
		required: true,
	},
	totalPrice: {
		type: Number,
		required: true,
	},
});

module.exports = Menu = mongoose.model('menuItem', MenuSchema);
