const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
  balance: {
    type: String,
    default: 0,
  },
});

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
    unique: false,
    lowercase: true,
  },

  password: {
    type: String,
    required: false,
    minlength: 6,
  },

  wallet: {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Wallet'
  }
});

module.exports = mongoose.model("User", UserSchema);
