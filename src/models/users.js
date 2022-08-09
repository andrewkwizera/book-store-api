const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  
  role: {
    type: String, 
    enum: ['user', 'admin'],
    default:'user'
  },

  active:{
    type: Boolean, 
    default: false
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

/**
 * Hashes the plain text password anytime a change is made to the collection 
 */
UserSchema.pre('save', async function(next) {
  if (this.isModified('password')){
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash 
  }
  next() 
})

module.exports = mongoose.model("User", UserSchema);
