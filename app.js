const express = require('express');

const UserController = require('./controllers/user.controller');
const rootRouter = require('./routes');
const {errorHandler} = require('./errorHandler');

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use('/api', rootRouter);

app.use(errorHandler)
module.exports = app;