require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const investmentRoutes = require('./routes/investments')
const budgetRoutes = require('./routes/budgets')
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
app.use('/api/user', userRoutes)

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