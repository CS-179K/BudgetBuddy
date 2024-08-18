const mongoose = require('mongoose')

const Schema = mongoose.Schema

const budgetSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Budget', budgetSchema)