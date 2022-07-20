const Joi = require('joi')
const {BadRequest} = require('http-errors')

const validateCreateBook = async (req, res, next) => {
    try{
        const createBookSchema = Joi.object({
            name: Joi.string().required(),
            author: Joi.string().required(),
            ISBN: Joi.number().required(),
            category: Joi.string().required() 
        })
       await  createBookSchema.validateAsync(req.body)
       next()
    }catch(e){
        next(BadRequest(e.message))
    }
}


const validateUpdateBook = async (req, res, next) => {
    try{
        const updateBookSchema = Joi.object({
            author: Joi.string(),
            ISBN: Joi.number(),
            category: Joi.string()
        })
       await  updateBookSchema.validateAsync(req.body)
       next()
    }catch(e){
        next(BadRequest(e.message))
    }
}

module.exports = {
    validateCreateBook
}