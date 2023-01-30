const NotFoundError = require('./errors/NotFoundError');

module.exports.errorHandler = async (error, req, res, next) => {
    if (error instanceof NotFoundError) {
       return res.status(404).send({error: error.message});
    }



    return res.status(500).send({error: error.message || 'Server error'})
}