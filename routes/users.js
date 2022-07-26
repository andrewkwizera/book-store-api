const express = require('express')
const {register, login, getUser} = require('../controllers/users')

const router = express.Router({mergeParams:true});

router.route('/').post(register).get(getUser)
router.route('/login').post(login)

module.exports = router 
