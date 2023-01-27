const {User} = require('../models');

module.exports.getUserInstance = async (req, res, next) => {
    try {
        const {params: {userId}} = req;
        const user = await User.findByPk(userId);
        if(user) {
            req.userInstance = user;
            next()
        } else {
            res.status(404).send({error: 'No user'});
        }
    } catch(error) {
        next(error)
    }
}
