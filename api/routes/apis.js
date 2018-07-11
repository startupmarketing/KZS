const express = require('express');
const axios = require('axios');
const router = express.Router();
var qs = require('querystring');
const mongoose = require('mongoose');

const Question = require('../models/question');

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

//Api for quiz data
router.get('/quiz-broadcast', (req, res, next) => {
	res.status(200).json({
		message: 'Get request handled!'
	});
});

router.post('/quiz-broadcast', (req, res, next) => {

	const botId = process.env.CHATFUEL_BOT_ID;
	const chatfuelToken = process.env.CHATFUEL_TOKEN;

	const userId = req.query.userId;
	const blockName = 'WebviewResponse';
	const chatfuelMessage = "This is response";
	
	const broadcastApiUrl = 'https://api.chatfuel.com/bots/' + botId + '/users/' + userId + '/send?chatfuel_token=' + chatfuelToken + '&chatfuel_message_tag=' + chatfuelMessage + '&chatfuel_block_name=' + blockName;
	console.log(broadcastApiUrl);
	res.status(200).json({
		message: 'Post request handled!'
	});
});





//<=========PRODUCTION READY===========>



//get/delete/patch specific question
router.get('/questions/:questionId', (req, res, next) => {
	const id = req.params.questionId;
	Question.findById(id)
	.exec()
	.then(doc => {
		console.log("From database", doc);
		if(doc){
			res.status(200).json(doc);
		}else {
			res.status(404).json({
				message: "Object does not exist"
			})
		}
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({error : err});
	});
});

router.delete('/questions/:questionId', (req, res, next) => {
	const id = req.params.questionId;
	Question.remove({ _id: id })
	.exec()
	.then(result => {
		res.status(200).json(result);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({error : err});
	});
});

router.patch('/questions/:questionId', (req, res, next) => {
	const id = req.params.questionId;
	const updateOps = {};
	for(const ops of req.body){
		updateOps[ops.propName] = ops.value;
	}
	Question.update({ _id: id }, { $set: updateOps })
	.exec()
	.then(result => {
		res.status(200).json(result);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({error : err});
	});
});




//get/post requests for questions
router.get('/questions', (req, res, next) => {
	Question.find()
	.exec()
	.then(docs => {
		console.log(docs);
		res.status(200).json(docs);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({error : err});
	});
});

router.post('/questions', (req, res, next) => {
	const first_name = req.body['first name'];
	const last_name = req.body['last name'];
	const messenger_id = req.body['messenger user id'];
	const question = new Question({
		_id : new mongoose.Types.ObjectId(),
		messenger_id: messenger_id,
		first_name: first_name,
		last_name: last_name,
		question: req.body.question
	});
	question.save()
	.then(result => {
		console.log(result);
		res.status(200).json({
			message: 'Post request handled!',
			result : question
		});
	}).catch(err => {
		console.log(err)
		res.status(500).json({
			error: err
		})
	});
});
	
module.exports = router;