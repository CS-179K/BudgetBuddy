const Investment = require('../models/investmentModel');
const Budget = require('../models/budgetModel');
const Notification = require('../models/notificationModel');
const mongoose = require('mongoose');

const checkBudgetUsage = async (userId) => {
    try {
        const budgets = await Budget.find({ user_id: userId });
        const investments = await Investment.find({ user_id: userId });

        const totalBudgetValue = budgets.reduce((total, budget) => total + budget.amount, 0);
        const totalInvestmentValue = investments.reduce((total, investment) => total + investment.amount, 0);

        const usagePercentage = (totalInvestmentValue / totalBudgetValue) * 100;

        const createOrUpdateNotification = async (percentage, message) => {
            const existingNotification = await Notification.findOne({
                user_id: userId,
                type: 'BUDGET',
                percentage: percentage,
            });

            if (!existingNotification) {
                const newNotification = new Notification({
                    user_id: userId,
                    type: 'BUDGET',
                    message: message,
                    percentage: percentage,
                });

                await newNotification.save();
                console.log(`Notification created for user ID: ${userId} - ${message}`);
            } else if (existingNotification.isDismissed) {
                existingNotification.isDismissed = false;
                await existingNotification.save();
                console.log(`Notification reactivated for user ID: ${userId} - ${message}`);
            }
        };

        if (usagePercentage >= 100) {
            await createOrUpdateNotification(100, "Alert: You have exceeded your budget!");
        } else if (usagePercentage >= 75) {
            await createOrUpdateNotification(75, "Caution: You have used 75% of your budget.");
        } else if (usagePercentage >= 50) {
            await createOrUpdateNotification(50, "Attention: You have used 50% of your budget.");
        } else if (usagePercentage >= 25) {
            await createOrUpdateNotification(25, "Notice: You have used 25% of your budget.");
        }

    } catch (error) {
        console.error('Error checking budget usage and creating notifications:', error);
    }
};


// Get all of the investments
const getInvestments = async (req, res) => {
    const user_id = req.user._id;

    const investments = await Investment.find({ user_id }).sort({ createdAt: -1 });

    res.status(200).json(investments);
};

// Get a single investment
const getInvestment = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such investment' });
    }

    const investment = await Investment.findById(id);

    if (!investment) {
        return res.status(404).json({ error: 'No such investment' });
    }

    res.status(200).json(investment);
};

// Create a new investment
const createInvestment = async (req, res) => {
    const { title, amount, investmentType, investmentDescription } = req.body;

    let emptyFields = [];

    if (!title) emptyFields.push('title');
    if (!amount) emptyFields.push('amount');
    if (!investmentType) emptyFields.push('investmentType');
    if (!investmentDescription) emptyFields.push('investmentDescription');

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
    }

    try {
        const user_id = req.user._id;
        const investment = await Investment.create({ title, amount, investmentType, investmentDescription, user_id });

        // Check budget usage after creating the investment
        await checkBudgetUsage(user_id);

        res.status(200).json(investment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an investment
const deleteInvestment = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such investment' });
    }

    const investment = await Investment.findOneAndDelete({ _id: id });

    if (!investment) {
        return res.status(400).json({ error: 'No such investment' });
    }

    res.status(200).json(investment);
};

// Update an investment
const updateInvestment = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such investment' });
    }

    const investment = await Investment.findOneAndUpdate({ _id: id }, {
        ...req.body
    });

    if (!investment) {
        return res.status(400).json({ error: 'No such investment' });
    }

    res.status(200).json(investment);
};

module.exports = {
    getInvestments,
    getInvestment,
    createInvestment,
    deleteInvestment,
    updateInvestment
};
