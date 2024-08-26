const express = require('express');
const router = express.Router();
const { getNotifications, updateNotification } = require('../controllers/notificationController');

// Route to get notifications for a user
router.get('/:userId', getNotifications);

// Route to dismiss a notification
router.patch('/:id', updateNotification);

module.exports = router;
