const mongoose = require('mongoose')

const Schema = mongoose.Schema

const incomeSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    incomeType: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Income', incomeSchema)