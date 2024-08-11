const mongoose = require('mongoose')

const Schema = mongoose.Schema

const investmentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Investment', investmentSchema)