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
	const question = new Question({
		_id : new mongoose.Types.ObjectId(),
		messenger_id: req.body.messenger_id,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
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