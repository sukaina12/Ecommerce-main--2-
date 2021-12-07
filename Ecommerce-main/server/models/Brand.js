const mongoose = require('mongoose')


const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    contact: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('brand', brandSchema, 'brand')