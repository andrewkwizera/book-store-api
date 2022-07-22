const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    balance: {
        type: Number, 
        default: 0
    }    

})

module.exports = mongoose.model('Users', UserSchema)