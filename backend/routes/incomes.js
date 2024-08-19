const express = require('express')
const {
    createIncome,
    getIncomes,
    getIncome,
    deleteIncome,
    updateIncome
} = require('../controllers/incomeController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// Require Auth for all the income routes
router.use(requireAuth)

// GET all of the incomes
router.get('/', getIncomes)

// GET a single source of income
router.get('/:id', getIncome)

// POST a single source of income
router.post('/', createIncome)

// DELETE a single source of income
router.delete('/:id', deleteIncome)

// UPDATE a single source of income
router.patch('/:id', updateIncome)

module.exports = router