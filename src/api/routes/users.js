const express = require('express')

const {register, login, getUserProfile, initiatePasswordReset, resetPassword, logout} = require('../controllers/users')
const {authenticate, authorize} = require('../middlewares/auth')

const router = express.Router({mergeParams:true});

router.route('/auth/register').post(register)
router.route('/').get(login)
router.route('auth/initiate').post(initiatePasswordReset)
router.route('auth/reset').post(resetPassword)
router.route('auth/logout').post(logout)

/** this routes serves the users private info, so its only accessible by the user 
 * the uuser info is retrieved via the req.user object which get the user id and  
 * info from the session
*/
router.route('/profile').get(authenticate, getUserProfile).delete()



module.exports = router 
