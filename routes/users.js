const express = require('express')
const {createUser, getUsers} = require('../controllers/users')

const router = express.Router({mergeParams:true});

router.route('/').post(createUser).get(getUsers)

module.exports = router 
