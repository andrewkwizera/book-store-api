const express = require('express')

const {register, login, getUserProfile, initiatePasswordReset, resetPassword, logout} = require('../controllers/users')
const {authenticate, authorize} = require('../middlewares/auth')

const router = express.Router({mergeParams:true});

router.route('/').post(register)
router.route('/auth/login').post(login)
router.route('auth/initiate').post(initiatePasswordReset)
router.route('auth/reset').post(resetPassword)
router.route('auth/logout').post(logout)

router.route('/profile').get(authenticate, getUserProfile).delete()



module.exports = router 
