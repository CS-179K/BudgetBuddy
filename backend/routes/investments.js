const express = require('express');
const {
    createInvestment,
    getInvestments,
    getInvestment,
    deleteInvestment,
    updateInvestment,
    getInvestmentsByDateRange
} = require('../controllers/investmentController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Require Auth for all investment routes
router.use(requireAuth);

// GET all investments
router.get('/', getInvestments);

// GET a single investment
router.get('/:id', getInvestment);

// GET investments within a date range (Ensure this route is properly set up)
router.get('/filterByDate', getInvestmentsByDateRange);

// POST a new investment
router.post('/', createInvestment);

// DELETE an investment
router.delete('/:id', deleteInvestment);

// UPDATE an investment
router.patch('/:id', updateInvestment);

module.exports = router;
