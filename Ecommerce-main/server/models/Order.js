const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    address:{
        type: Object,
        required: true
    },
    contact: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    cartItems:{
        type: Array,
        default: []
    },
    status:{
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("order", orderSchema, "order")