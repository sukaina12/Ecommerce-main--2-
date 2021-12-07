const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    
    SKU:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    name:{
        type: String,
        trim: true,
        required: true
    },
    price:{
        type: Number,
        trim: true,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: Object,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    stock:{
        type: Number,
        default: 0
    },
    checked:{
        type: Boolean,
        default: false
    },
    sold:{
        type: Number,
        default: 0
    }
}, {
    timestamps: true 
})


module.exports = mongoose.model('product', productSchema, 'product')