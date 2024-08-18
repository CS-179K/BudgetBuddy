const express = require('express')
const {
    createBudget,
    getBudgets,
    getBudget,
    deleteBudget,
    updateBudget
} = require('../controllers/budgetController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// Require Auth for all budget routes
router.use(requireAuth)

// GET all budgets
router.get('/', getBudgets)

// GET a single budget
router.get('/:id', getBudget)

// POST a new budget
router.post('/', createBudget)

// DELETE a budget
router.delete('/:id', deleteBudget)

// UPDATE a budget
router.patch('/:id', updateBudget)

module.exports = router