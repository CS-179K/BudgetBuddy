const Notification = require('../models/notificationModel')
const mongoose = require('mongoose')

// Get all of the Notification
const getNotifications = async (req, res) => {
    const user_id = req.user._id

    const investments = await Notification.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(investments)
}


// Get a single investment
const getNotification = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such notification'})
    }

    const investment = await Investment.findById(id)

    if (!investment) {
        return res.status(404).json({error: 'No such notification'})
    }

    res.status(200).json(investment)
}


const addNotification = async (req, res) => {
    try {
        const { user_id, message } = req.body;

        // Generate a unique ID for the notification (or use a library to handle this)
        const _id = new mongoose.Types.ObjectId().toString();

        const newNotification = new Notification({
            _id,
            user_id,
            message
        });

        await newNotification.save();

        res.status(200).json({ message: 'Notification added successfully', notification: newNotification });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add notification', error: error.message });
    }
};

module.exports = {
    getNotifications,
    getNotification,
    addNotification
}