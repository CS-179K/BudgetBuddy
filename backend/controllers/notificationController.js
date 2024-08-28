const Notification = require('../models/notificationModel');
const mongoose = require('mongoose')

// Get all of the investments
const getNotifications = async (req, res) => {
    const user_id = req.user._id

    const notifications = await Notification.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(notifications)
}

// Add a notification
const updateNotification = async (req, res) => {
    const {message, sent} = req.body

    // Add document to database
    try {
        const user_id = req.user._id
        const notification = await Notification.create({message, sent, user_id})
        res.status(200).json(notification)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

// Delete a investment
const deleteNotification = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such investment'})
    }

    const notification = await Notification.findOneAndDelete({_id: id})

    if (!notification) {
        return res.status(400).json({error: 'No such investment'})
    }

    res.status(200).json(notification)
}

module.exports = {
    getNotifications,
    updateNotification,
    deleteNotification,
};

