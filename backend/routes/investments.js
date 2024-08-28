const express = require('express')
const {
    createInvestment,
    getInvestments,
    getInvestment,
    deleteInvestment,
    updateInvestment
} = require('../controllers/investmentController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// Require Auth for all investment routes
router.use(requireAuth)

// GET all investments
router.get('/', getInvestments)

// GET a single investment
router.get('/:id', getInvestment)

// POST a new investment
router.post('/', createInvestment)

// DELETE a investment
router.delete('/:id', deleteInvestment)

// UPDATE a investment
router.patch('/:id', updateInvestment)

module.exports = router