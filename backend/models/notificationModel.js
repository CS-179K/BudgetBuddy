<<<<<<< HEAD
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const notificationSchema = new Schema({

    user_id: {
        type: String,
        required: true
=======
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
>>>>>>> origin/main
    },
    message: {
        type: String,
        required: true
    },
<<<<<<< HEAD
    read: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

module.exports = mongoose.model('Notification', notificationSchema)
=======
    sent: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
>>>>>>> origin/main
