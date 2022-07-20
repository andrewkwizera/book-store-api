const {Schema, model} = require('mongoose')
const adminSchema = new Schema({ firstname: { type: String, required: [true, ''] }, 
 lastname: { type: String, required: [true, ''] },
 email: { 
    type: String,
    match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please provide a valid email"],
    required: [true, '']
 }, 
 phone: { type: String, required: [true, '']
 }, 
 address: { type: String, required: [true, '']
 }
})
const Admins = model('admin', adminSchema)
module.exports = Admins