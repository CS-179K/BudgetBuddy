const express = require('express');
const router = express.Router();
const { getNotifications, 
        updateNotification,
        deleteNotification } = require('../controllers/notificationController');

// Route to get notifications for a user
router.get('/', getNotifications);

// Route to delete a notification for a user
router.delete('/:id', deleteNotification);

// Route to dismiss a notification
router.patch('/:id', updateNotification);

module.exports = router;
