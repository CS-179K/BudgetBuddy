const express = require('express');

const { getNotifications, 
        updateNotification,
        deleteNotification,
        checkNotification } = require('../controllers/notificationController');

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

router.get('/:id', checkNotification);

module.exports = router;
