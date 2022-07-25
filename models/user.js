const mongoose = require('mongoose')

const WalletSchema = new mongoose.Schema({
    balance: {
        type:String, 
        default: 0 
    }
})

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    }, 
    lastname: {
        type: String,
        required: true
    }, 

    email: {
        type: String,
        required:true, 
        lowercase:true
    },

    wallet: WalletSchema

})

module.exports = mongoose.model('Users', UserSchema)