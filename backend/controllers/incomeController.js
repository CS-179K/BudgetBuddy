const Income = require('../models/incomeModel')
const mongoose = require('mongoose')

// Get all of the incomes
const getIncomes = async (req, res) => {
    const user_id = req.user._id

    const incomes = await Income.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(incomes)
}

// Get a single income source
const getIncome = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such income'})
    }

    const income = await Income.findById(id)

    if (!income) {
        return res.status(404).json({error: 'No such income'})
    }

    res.status(200).json(income)
}

// Create a new income source
const createIncome = async (req, res) => {
    const {amount, incomeType} = req.body

    let emptyFields = []

    if (!amount) {
        emptyFields.push('amount')
    }
    if (!incomeType) {
        emptyFields.push('incomeType')
    }

    if (emptyFields.length > 0) {
        console.log(emptyFields)
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    // Add document to the database
    try {
        const user_id = req.user._id
        const income = await Income.create({ amount, incomeType, user_id })
        res.status(200).json(income)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Delete a source of income
const deleteIncome = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such income' })
    }

    const income = await Income.findOneAndDelete({ _id: id })

    if (!income) {
        return res.status(400).json({ error: 'No such income' })
    }

    res.status(200).json(income)
}

// Update a source of income
const updateIncome = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such income'})
    }

    const income = await Income.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!income) {
        return res.status(400).json({ error: 'No such income' })
    }

    res.status(200).json(income)
}

module.exports = {
    getIncomes,
    getIncome,
    createIncome,
    deleteIncome,
    updateIncome
}