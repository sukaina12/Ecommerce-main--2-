const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },

    lname: {
      type: String,
      required: true,
      trim: true
    },
   
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
      type: Number,
      required: true,
  },
    password: {
        type: String,
        required: true
    },

    role: {
        type: Number,
        default: 0
    },
    cartItems: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('user', userSchema, 'user')
