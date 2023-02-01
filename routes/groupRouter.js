const {Router} = require('express');
const GroupController = require('../controllers/group.controller')
const {getUserInstance} = require('../middlewares/getUserInstance');
const multer  = require('multer');
const path = require('path');


const imagePath = path.resolve(__dirname, '../public/images');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagePath)
    },
    filename:  function (req, file, cb) {
        cb(null, `${Date.now()}.${file.originalname}`)
      }
})

const upload = multer({storage})



const groupRouter = Router();

groupRouter.post('/', GroupController.createGroup);
groupRouter.post('/:groupId', GroupController.addUserToGroup);
groupRouter.get('/:groupId', GroupController.getGroupWithMembers);
groupRouter.put('/:groupId', GroupController.updateGroup);
groupRouter.delete('/:groupId', GroupController.deleteGroup);
groupRouter.delete('/:groupId/:userId', getUserInstance, GroupController.deleteUserFromGroup );
groupRouter.patch('/:groupId', upload.single('groupImage'), GroupController.createGroupImage);

module.exports = groupRouter;
 