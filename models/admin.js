const {Schema, model} = require('mongoose')
const adminSchema = new Schema({ 
    firstname: { 
        type: String, 
        required: [true, ''] 
    }, 
    lastname: { 
        type: String, 
        required: [true, ''] 
    },
    email: { 
        type: String, 
        required: [true, ''] 
    },
    phone: { 
        type: String, 
        required: [true, ''],
        validate: {
            validator : function (phone) {
                validPhone == /^[0-9]{10}$/;
                if (!phone == validPhone){
                    console.log('Incorrect phone number')
                }
                else {
                    console.log('Phone number entered correctly!')
                }
            }
        },
 }, 
 address: { 
    type: String, 
    required: [true, '']
 }
})
const Admins = model('admin', adminSchema)
module.exports = Admins