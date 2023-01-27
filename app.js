const express = require('express');
const UserController = require('./controllers/user.controller');

const app = express();
const bodyParser = express.json();

app.use(bodyParser);

app.post('/', UserController.createUser);


module.exports = app;