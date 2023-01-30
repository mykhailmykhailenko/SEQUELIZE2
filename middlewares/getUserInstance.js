const {User} = require('../models');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getUserInstance = async (req, res, next) => {
    try {
        const {params: {userId}} = req;
        const user = await User.findByPk(userId);
        if(user) {
            req.userInstance = user;
            next()
        } else {
            throw new NotFoundError ('User not found');
        }
    } catch(error) {
        next(error)
    }
}