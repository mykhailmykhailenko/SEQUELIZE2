const {Group, User} = require('../models/index');


module.exports.createGroup = async (req, res, next) => {
    try {
        const {body: {name, imagePath, description}} = req;
        const group = await Group.create({name, imagePath, description});
        res.status(201).send(group);
    } catch(err) {
        next(err)
    }
}


module.exports.addUserToGroup = async (req, res, next) => {
    try {
        const {params: {groupId}, body: {userId}} = req;
        const groupInstance = await Group.findByPk(groupId);
        const userInstance = await User.findByPk(userId);
        const [result] = await groupInstance.addUser(userInstance);
        res.status(200).send(result);
    } catch(err) {
        next(err);
    }
}


/*
1. Написати метод контроллера, який повертає групу зі всіма її юзерами
*/


module.exports.getGroupWithMembers = async (req, res, next) => {
    try {
        const {params: {groupId}} = req;
        /* 
        Magic methods
        const group = await Group.findByPk(groupId);
         const groupWithMembers = await group.getUsers();
         res.status(200).send({group, members: groupWithMembers});
        */

         const group = await Group.findByPk(groupId, {
            include: [{
                model: User,
                attributes: {
                    exclude: ['password']
                }
            }]
         });

         res.status(200).send(group)
    } catch (err) {
        next(err);
    }
}


/*
1. Оновлення групи.
2. Видалення групи.
.delete('/:groupId')
3. Видалення юзера з групи.
.delete('/:groupId/:userId')
*/

module.exports.updateGroup = async(req, res, next) => {
    try {
        const {params: {groupId}, body} = req;
        const updated = await Group.update(body, {
            where: {
                id: groupId
            }
        });
        res.status(200).send(updated);
    } catch(error) {
        next(error)
    }
}

module.exports.deleteGroup = async(req, res, next) => {
    try {
        const {params: {groupId}} = req;
        const deleted = await Group.destroy({
            where: {
                id: groupId
            }
        });
        res.status(204).send();
    } catch(error) {
        next(error)
    }
}

module.exports.deleteUserFromGroup = async(req, res, next) => {
    try {
        const {params: {groupId}, userInstance} = req;
        const group = await Group.findByPk(groupId);
        const result = await group.removeUser(userInstance);
        res.status(200).send(result);
    } catch(error) {
        next(error)
    }
} 

/*
{
  fieldname: 'groupImage',
  originalname: 'art.png',
  encoding: '7bit',
  mimetype: 'image/png',
  destination: '/home/freshcodealice/Стільниця/ALICE/onl-js-2 (fd)/fd-sequelize/public/images',
  filename: '1673964851512.art.png',
  path: '/home/freshcodealice/Стільниця/ALICE/onl-js-2 (fd)/fd-sequelize/public/images/1673964851512.art.png',
  size: 146878
}
*/

module.exports.createGroupImage = async(req, res, next) => {
    //   console.log(req.file.filename);
       try {
       const {params: {groupId}, file: {filename}} = req;
           const [rowCount, [updatedGroup]] = await Group.update({imagePath: filename}, {
               where: {
                   id: groupId
               },
               returning: true
           });
           res.status(200).send(updatedGroup);
       }catch(error) {
           next(error);
       }
   }
