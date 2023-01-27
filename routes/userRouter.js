const {Router} = require('express');
const UserController = require('../controllers/user.controller');
const {getUserInstance} = require('../middlewares/getUserInstance');
const userRouter = Router();

userRouter.post('/', UserController.createUser);
userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:userId', getUserInstance, UserController.getOneUser);
userRouter.delete('/:userId', UserController.deleteUser);
userRouter.put('/:userId', UserController.updateUser);


module.exports = userRouter;