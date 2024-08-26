const express = require('express')
const {
    addNotification,
    getNotifications,
    getNotification,
} = require('../controllers/investmentController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// Require Auth for all Notification routes
router.use(requireAuth)

// GET all Notification
router.get('/notifications', getNotifications)

// GET a single Notification
router.get('/notifications/:id', getNotification)

// POST a new Notification
router.post('/notifications', addNotification)



module.exports = router