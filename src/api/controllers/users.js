const bcrypt = require('bcrypt');
const logger = require('../../config/logger')

const User = require('../../models/users')
const Wallet = require('../../models/wallet')
const {NotFound, BadRequest, Unauthorized} = require('http-errors')
const asyncHandler = require('../middlewares/async')
const {createUserActivationToken, checkUserActivationToken, createUserResetToken, checkUserResetToken} = require('../../services/auth')
const {sendUserActivationEmail, sendUserPasswordResetEmail} = require('../../services/mail')

const register = asyncHandler(async (req, res, next) => {
    const existingUser = await User.findOne({email:req.body.email})
    if(existingUser) throw new BadRequest('a user with this email already exists')
    const user = new User(req.body)
    await user.save()
    const activationToken = await createUserActivationToken(user)
    await sendUserActivationEmail(activationToken, user)
    res.status(201).json({
        success:true,
        data: {
            token: activationToken
        }
    })
})

const activateUserAccount = asyncHandler(async (req, res, next) => {
    const activationToken = req.body.token ||req.params.token
    const userInfo = await checkUserActivationToken(activationToken)
    const user = await User.findById(userInfo.id)
    if(!user) throw new BadRequest('user not found')
    user.active = true 
    await user.save()
    res.status(201).json({
        success:true,
        data: {
            token: activationToken
        }
    })
})



const login = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body
    const user = await User.findOne({email:email})
    if(!user) throw new NotFound('no user with this email exists')
    const valid = await bcrypt.compare(password, user.password)
    if(!valid) throw new BadRequest('invalid password')
    const sessionData =  {
        id: user._id,
        authenticated: true, 
        role: user.role

    }
    req.session.user = sessionData
    res.status(200).json({
        success:true,
        data:user
    })


})

const initiatePasswordReset = asyncHandler(async (req, res, next) => {
   const {email} = req.body 
   const user = await User.findOne({email:email})
   if(!user) throw new NotFound('no user with this email found')
   const resetToken = await createUserResetToken(user)
   await sendUserPasswordResetEmail(resetToken, user)
   res.status(201).json({
    success:true,
    data: {
        token: resetToken
    }
})

})


const resetPassword = asyncHandler(async (req, res, next) => {
    const resetToken = req.body.token ||req.params.token

    const userInfo = await checkUserResetToken(resetToken)
    const user = await User.findById(userInfo.id)
    if(!user) throw new NotFound('user not found')
    user.password = req.body.password
    await user.save()
    res.status(200).send({
        success: true, 
        data: {}
    })
})



/**
 * @description returns the user private profile
 */
const getUserProfile = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({_id:req.user.id})
    res.status(200).send({
        success: true, 
        data: user
    })
})


/**
 * @descriptin returns the users public proile 
 */
const getUserById = asyncHandler(async (req, res, next) => {
    if(!req.params.id) throw new BadRequest('no user id provided')
    const user = await User.findOne({_id:req.params.id})
    res.status(200).send({
        success: true, 
        data: user
    })
})


const logout = asyncHandler(async (req, res, next) => {
    req.session.destoy(() => {
        logger.info('user session destroyed!')
    })
})



module.exports = {
   register,
   activateUserAccount,
   login,
   logout,
   getUserById,
   getUserProfile,
   initiatePasswordReset,
   resetPassword
}