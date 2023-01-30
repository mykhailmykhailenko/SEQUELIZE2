const {User} = require('../models');
const NotFoundError = require('../errors/NotFoundError');

module.exports.createUser = async (req, res, next) => {
    try {
        const {body} = req;
        const result = await User.create(body);
        res.status(201).send(result);
    } catch(error) {
        next(error);
    }
}
module.exports.getAllUsers = async (req, res, next) => {
   try {
    const allUsers = await User.findAll({
        attributes: {
            exclude: ['password']
        }
    });
    res.status(200).send(allUsers);
   } catch(error) {
    next(error);
   }
}
module.exports.getOneUser = async (req, res, next) => {
    try {
        const {params: {userId}} = req;
        const user = await User.findByPk(userId, {
            attributes: {
                exclude: ['password']
            }
        })
        if (!user){
            throw new NotFoundError('User not found');
        }
        res.status(200).send(user);
    } catch(error) {
        next(error);
    }
}
module.exports.updateUser = async (req, res, next) => {
    try {
        const {body, params: {userId}} = req;
        const [rowCount, [updated]] = await User.update(body, {
            where: {
                id: userId
            },
            returning: true
        });
        res.status(200).send(updated);
    } catch(error) {
        next(error);
    }
}
module.exports.deleteUser = async (req, res, next) => {
    try {
        const {params: {userId}} = req;
        const deletedUser = await User.destroy({
            where: {
                id: userId
            }
        });
        if (deletedUser) {
            res.status(200).send({data: deletedUser})
        } else {
            res.status(404)
        }
    }catch(error) {
        next(error);
    }
}
module.exports.deleteInstance = async (req, res, next) => {
    try {
        const {userInstance} = req;
        const result = await userInstance.destroy();
        res.status(200).send();
    } catch(error) {
        next(error);
    }
}