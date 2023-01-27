const {Router} = require('express');
const userRouter = require('./userRouter');
const taskRouter = require('./taskRouter');

const rootRouter = Router();
rootRouter.use('/users', userRouter);
rootRouter.use('/tasks', taskRouter);


module.exports = rootRouter;