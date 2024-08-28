const express = require('express');
const {
    createInvestment,
    getInvestments,
    getInvestment,
    deleteInvestment,
    updateInvestment,
    getInvestmentsByDateRange  // Import the new controller function
} = require('../controllers/investmentController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Require Auth for all investment routes
router.use(requireAuth);

// GET all investments
router.get('/', getInvestments);

// GET a single investment
router.get('/:id', getInvestment);

// GET investments within a date range
router.get('/filterByDate', getInvestmentsByDateRange);  // Add the new route

// POST a new investment
router.post('/', createInvestment);

// DELETE an investment
router.delete('/:id', deleteInvestment);

// UPDATE an investment
router.patch('/:id', updateInvestment);

module.exports = router;
