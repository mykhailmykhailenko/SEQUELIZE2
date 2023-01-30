const {Router} = require('express');
const GroupController = require('../controllers/group.controller')

const groupRouter = Router();

groupRouter.post('/', GroupController.createGroup);
groupRouter.post('/:groupId', GroupController.addUserToGroup);
groupRouter.get('/:groupId', GroupController.getGroupWithMembers);

module.exports = groupRouter;
