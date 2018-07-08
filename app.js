const express = require('express');
const mongoose = require('mongoose');
const app = express();
const apiRoutes = require('./api/routes/apis');
const webviewsRoutes = require('./webviews/routes/webviews');
const bodyParser = require('body-parser')

mongoose.connect(
	'mongodb+srv://startupmarketing:klepetalnirobot2018@startupmarketing-hzand.mongodb.net/test?retryWrites=true'
);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/kzs', express.static('public'));// setup static files into public folder

app.use('/kzs', apiRoutes);
app.use('/kzs/webviews', webviewsRoutes);

module.exports = app;
