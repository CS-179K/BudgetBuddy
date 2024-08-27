const express = require('express')
const {
    addNotification,
    getNotifications,
    getNotification,
} = require('../controllers/notificationController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// Require Auth for all Notification routes
router.use(requireAuth)

// GET all Notification
router.get('/', getNotifications)

// GET Notifications by userId
router.get('/:userId', getNotification)

// Create a new Notification
router.post('/', addNotification)



module.exports = router