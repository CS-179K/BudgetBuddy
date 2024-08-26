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
module.exports = {
    getNotifications,
    getNotification,
}