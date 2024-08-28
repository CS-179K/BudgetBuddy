const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const investmentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    investmentType: {
        type: String,
        required: true
    },
    investmentDescription: {
        type: String,
        required: true
    },
    isRecurring: {
        type: Boolean,
        default: false
    },
    recurrenceFrequency: {
        type: String,
        enum: ['weekly', 'monthly', 'yearly'],
        default: ''
    },
    startDate: {
        type: Date,
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Investment', investmentSchema);
