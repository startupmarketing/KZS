const express = require('express');
const router = express.Router();

//Testing req/res

router.get('', (req, res, next) => {
  res.status(200).json({
    message: 'Get request handled!'
  });
});


router.post('', (req, res, next) => {
	res.status(200).json({
		message: 'Post request handled!'
	});
});

module.exports = router;
