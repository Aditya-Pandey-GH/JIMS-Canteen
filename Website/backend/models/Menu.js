const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
	itemId: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	addedAt: {
		type: Date,
		default: new Date().toISOString(),
	},
});

module.exports = Menu = mongoose.model('menu', MenuSchema);
