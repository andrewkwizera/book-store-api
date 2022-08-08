const {BadRequest} = require('http-errors')
const logger = require('../../config/logger')
const errorHandler =  (err, req, res, next) => {
    logger.error(err)

    let error = Object.assign(err, {})

    if(err.name === 'CastError') {
        error = new BadRequest('invalid object id provided')
    }
    

    res.status(error.statusCode || 500).json({
        success: false, 
        message: error.message
    })

}

module.exports = errorHandler