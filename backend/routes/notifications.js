<<<<<<< HEAD
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
=======
const express = require('express');

const { getNotifications, 
        updateNotification,
        deleteNotification } = require('../controllers/notificationController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Require Auth for all notifications routes
router.use(requireAuth)

// Route to get notifications for a user
router.get('/', getNotifications);

// Route to delete a notification for a user
router.delete('/:id', deleteNotification);

// Route to add a notification
router.post('/', updateNotification);

module.exports = router;
>>>>>>> origin/main
