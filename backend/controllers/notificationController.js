const Notification = require('../models/notificationModel')
const mongoose = require('mongoose')
const Investment = require("../models/investmentModel");

// Get all of the Notification
const getNotifications = async (req, res) => {

    const notification = await Notification.find().sort({createdAt: -1})

    res.status(200).json(notification)
}


// Get notification by UserId
const getNotification = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such notification'})
    }

    const notification = await Notification.find({ user_id: id, read: false });

    if (!notification) {
        return res.status(404).json({error: 'No such notification'})
    }

    res.status(200).json(notification)
}


// Delete a Notification
const deleteNotification = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Notification'})
    }

    const notification = await Notification.findOneAndDelete({_id: id})

    if (!notification) {
        return res.status(400).json({error: 'No such Notification'})
    }

    res.status(200).json(notification)
}

const addNotification = async (req, res) => {
    try {
        const { user_id, message } = req.body;

        // Generate a unique ID for the notification
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
    addNotification,
    deleteNotification
}