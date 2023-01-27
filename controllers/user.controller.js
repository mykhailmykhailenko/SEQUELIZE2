const {User} = require('../models');

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
    //TODO
}


module.exports.getOneUser = async (req, res, next) => {
}

module.exports.updateUser = async (req, res, next) => {
}

module.exports.deleteUser = async (req, res, next) => {
}
