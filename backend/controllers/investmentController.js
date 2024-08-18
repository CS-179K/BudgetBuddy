const Investment = require('../models/investmentModel')
const mongoose = require('mongoose')

// Get all of the investments
const getInvestments = async (req, res) => {
    const user_id = req.user._id

    const investments = await Investment.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(investments)
}

// Get a single investment
const getInvestment = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such investment'})
    }

    const investment = await Investment.findById(id)

    if (!investment) {
        return res.status(404).json({error: 'No such investment'})
    }

    res.status(200).json(investment)
}

// Create a new investment
const createInvestment = async (req, res) => {
    const {title, amount, investmentType, investmentDescription} = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!amount) {
        emptyFields.push('amount')
    }
    if (!investmentType) {
        emptyFields.push('investmentType')
    }
    if (!investmentDescription) {
        emptyFields.push('investmentDescription')
    }

    if (emptyFields.length > 0) {
        console.log(emptyFields)
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }
    // Add document to database
    try {
        const user_id = req.user._id
        const investment = await Investment.create({title, amount, investmentType, investmentDescription, user_id})
        res.status(200).json(investment)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Delete a investment
const deleteInvestment = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such investment'})
    }

    const investment = await Investment.findOneAndDelete({_id: id})

    if (!investment) {
        return res.status(400).json({error: 'No such investment'})
    }

    res.status(200).json(investment)
}

// Update a investment
const updateInvestment = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such investment'})
    }

    const investment = await Investment.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!investment) {
        return res.status(400).json({error: 'No such investment'})
    }

    res.status(200).json(investment)
}

module.exports = {
    getInvestments,
    getInvestment,
    createInvestment,
    deleteInvestment,
    updateInvestment
}