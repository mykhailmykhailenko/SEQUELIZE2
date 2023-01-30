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