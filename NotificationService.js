const Budget = require('../models/budgetModel');
const Investment = require('../models/investmentModel');
const Notification = require('../models/notificationModel');

const checkBudgetUsage = async (user_id) => {
    try {
        const budgets = await Budget.find({ user_id });
        const investments = await Investment.find({ user_id });

        const totalBudgetValue = budgets.reduce((total, budget) => total + budget.amount, 0);
        const totalInvestmentValue = investments.reduce((total, investment) => total + investment.amount, 0);

        const usagePercentage = (totalInvestmentValue / totalBudgetValue) * 100;

        const notifications = await Notification.find({ user_id, type: 'BUDGET' });

        const createOrUpdateNotification = async (percentage, message) => {
            const existingNotification = notifications.find(
                (notif) => notif.percentage === percentage
            );

            if (!existingNotification) {
                const newNotification = new Notification({
                    user_id,
                    type: 'BUDGET',
                    message,
                    percentage,
                });

                await newNotification.save();
                console.log(`Notification created for user ID: ${user_id} - ${message}`);
            } else if (existingNotification && existingNotification.isDismissed) {
                existingNotification.isDismissed = false;
                await existingNotification.save();
                console.log(`Notification reactivated for user ID: ${user_id} - ${message}`);
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

module.exports = {
    checkBudgetUsage
};
