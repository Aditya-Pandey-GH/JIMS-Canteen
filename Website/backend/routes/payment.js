const express = require('express');
const router = express();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/', (req, res) => {
	// console.log(req.body);
	const name = req.body.Name;
	const amount = req.body.Amount;
	// res.send("Redirecting...<br>Please don't close the window");
	res.redirect(`http://192.168.1.105:3000/payment?name=${encodeURIComponent(name)}&amount=${encodeURIComponent(amount)}`);
});

module.exports = router;