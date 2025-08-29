const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = "mongodb://127.0.0.1:27017/JimsCanteenBackup";

mongoose
	.connect(db)
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

const users = require('./routes/users');
app.use('/api/users', users);
const menus = require('./routes/menus');
app.use('/api/menus', menus);
const menuItems = require('./routes/menuItems');
app.use('/api/menuItems', menuItems);
const payment = require('./routes/payment');
app.use('/api/payment', payment);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}`));
