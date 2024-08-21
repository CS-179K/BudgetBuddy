const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bankSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true })

module.exports = mongoose.model('Bank', bankSchema)