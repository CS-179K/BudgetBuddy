require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const investmentRoutes = require('./routes/investments')
const budgetRoutes = require('./routes/budgets')
const incomeRoutes = require('./routes/incomes')
const bankRoutes = require('./routes/banks')
const notificationRoutes = require('./routes/notificationRoutes') // Ensure this is the correct path

const { checkBudgetUsage } = require('./controllers/notificationController') // Ensure this is the correct path

const userRoutes = require('./routes/user')

// Creates an Express app
const app = express()

// Middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api/investments', investmentRoutes)
app.use('/api/budgets', budgetRoutes)
app.use('/api/incomes', incomeRoutes)
app.use('/api/user', userRoutes)
app.use('/api/notifications', notificationRoutes)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/banks', bankRoutes)

// Temporary route to test notifications
app.get('/test-notifications/:userId', async (req, res) => {
    try {
        await checkBudgetUsage(req.params.userId);
        res.send('Notifications checked!');
    } catch (error) {
        res.status(500).send('Error checking notifications');
    }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to MongoDB and listening on Port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
