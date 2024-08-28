require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cron = require('node-cron'); // Import cron
const Investment = require('./models/investmentModel'); // Import Investment model

const investmentRoutes = require('./routes/investments')
const budgetRoutes = require('./routes/budgets')
const incomeRoutes = require('./routes/incomes')
const bankRoutes = require('./routes/banks')
const notificationRoutes = require('./routes/notifications')

const userRoutes = require('./routes/user')
const notification = require("./routes/notifications");

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
app.use('/api/notifications', notification)
app.use('/api/incomes', incomeRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/user', userRoutes)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/banks', bankRoutes)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to MongoDB and listening on Port', process.env.PORT)

            // Place the cron job here
            cron.schedule('0 0 * * *', async () => {
                const recurringInvestments = await Investment.find({ isRecurring: true });

                recurringInvestments.forEach(async investment => {
                    const now = new Date();
                    const startDate = new Date(investment.startDate);

                    let shouldCreateEntry = false;
                    if (investment.recurrenceFrequency === 'weekly' && now > startDate) {
                        shouldCreateEntry = now.getDay() === startDate.getDay();
                    } else if (investment.recurrenceFrequency === 'monthly' && now > startDate) {
                        shouldCreateEntry = now.getDate() === startDate.getDate();
                    } else if (investment.recurrenceFrequency === 'yearly' && now > startDate) {
                        shouldCreateEntry = now.getMonth() === startDate.getMonth() && now.getDate() === startDate.getDate();
                    }

                    if (shouldCreateEntry) {
                        const newInvestment = await Investment.create({
                            title: investment.title,
                            amount: investment.amount,
                            investmentType: investment.investmentType,
                            investmentDescription: investment.investmentDescription,
                            isRecurring: investment.isRecurring,
                            recurrenceFrequency: investment.recurrenceFrequency,
                            startDate: investment.startDate,
                            user: investment.user
                        });
                        console.log('Recurring Investment Created:', newInvestment);
                    }
                });
            });
        })
    })
    .catch((error) => {
        console.log(error)
    })
