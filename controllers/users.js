const User = require('../models/users')
const Wallet = require('../models/wallet')
const {NotFound, BadRequest} = require('http-errors')
const asyncHandler = require('../middlewares/async')

const createUser = asyncHandler(async (req, res, next) => {
    const existingUser = await User.findOne({email:req.body.email})
    if(existingUser) throw new BadRequest('a user with email adress already exists')
    const user = new User(req.body)
    await user.save()
    res.status(201).json({
        success:true, 
        data:user
    })
})

const getUsers = asyncHandler(async (req, res, next) => {
    req.session.visits = req.session.visits ? req.session.visits + 1 : 1;
    console.log(req.session)
    // const user = await User.find().populate('wallet')
    res.status(201).json({
        success:true, 
        data:''
    })
})


module.exports = {
    createUser,
    getUsers
}