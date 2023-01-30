const express = require('express');
const UserController = require('./controllers/user.controller');
const rootRouter = require('./routes');
const {errorHandler} = require('./errorHandler');

const app = express();
const bodyParser = express.json();

app.use(bodyParser);
app.use('/api', rootRouter);

app.use(errorHandler)

module.exports = app;