const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    },
    sent: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
