const express = require('express');
const router = express.Router();

//Testing req/res

router.get('', (req, res, next) => {
  res.status(200).json({
    message: 'Get request handled!'
  });
});

router.get('/quiz', (req, res, next) => {
res.sendFile('/var/www/messengerbot.si/api/kzs/static/public/quiz/index.html');
});


router.post('', (req, res, next) => {
	res.status(200).json({
		message: 'Post request handled!'
	});
});

module.exports = router;
