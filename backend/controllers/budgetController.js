const Budget = require('../models/budgetModel')
const mongoose = require('mongoose')

// Get all of the budgets
const getBudgets = async (req, res) => {
    const user_id = req.user._id

    const budgets = await Budget.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(budgets)
}

// Get a single budget
const getBudget = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such budget'})
    }

    const budget = await Budget.findById(id)

    if (!budget) {
        return res.status(404).json({error: 'No such budget'})
    }

    res.status(200).json(budget)
}

// Create a new budget
const createBudget = async (req, res) => {
    const {amount} = req.body

    let emptyFields = []

    if (!amount) {
        emptyFields.push('amount')
    }

    if (emptyFields.length > 0) {
        console.log(emptyFields)
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }
    // Add document to database
    try {
        const user_id = req.user._id
        const budget = await Budget.create({amount, user_id})
        res.status(200).json(budget)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Delete a budget
const deleteBudget = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such budget'})
    }

    const budget = await Budget.findOneAndDelete({_id: id})

    if (!budget) {
        return res.status(400).json({error: 'No such budget'})
    }

    res.status(200).json(budget)
}

// Update a budget
const updateBudget = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such budget'})
    }

    const budget = await Budget.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!budget) {
        return res.status(400).json({error: 'No such budget'})
    }

    res.status(200).json(budget)
}

module.exports = {
    getBudgets,
    getBudget,
    createBudget,
    deleteBudget,
    updateBudget
}