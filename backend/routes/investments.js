const express = require('express')
const {
    createInvestment,
    getInvestments,
    getInvestment,
    deleteInvestment,
    updateInvestment
} = require('../controllers/investmentController')

const router = express.Router()

// GET all investments
router.get('/', getInvestments)

// GET a single investment
router.get('/:id', getInvestment)

// POST a new investment
router.post('/', createInvestment)

// DELETE a new investment
router.delete('/:id', deleteInvestment)

// UPDATE a investment
router.patch('/:id', updateInvestment)

module.exports = router