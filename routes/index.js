const {Router} = require('express');
const userRouter = require('./userRouter');
const taskRouter = require('./taskRouter');
const groupRouter = require('./groupRouter')

const rootRouter = Router();
rootRouter.use('/users', userRouter);
rootRouter.use('/tasks', taskRouter);
rootRouter.use('/groups', groupRouter);

module.exports = rootRouter;