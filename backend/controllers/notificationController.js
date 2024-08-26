const Notification = require('../models/notificationModel');
const Budget = require('../models/budgetModel');
const Investment = require('../models/investmentModel');

// Function to get all notifications for a user
const getNotifications = async (req, res) => {
    const { userId } = req.params;

    try {
        const notifications = await Notification.find({ user_id: userId });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to dismiss a notification
const updateNotification = async (req, res) => {
    const { id } = req.params;

    try {
        const notification = await Notification.findByIdAndUpdate(id, { isDismissed: true }, { new: true });
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteNotification = async (req, res) => {
    const { id } = req.params;

    try {
        const notification = await Notification.findByIdAndUpdate(id, { isDismissed: false }, { new: true });
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getNotifications,
    updateNotification,
    deleteNotification
};

