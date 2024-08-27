import React, { useState } from 'react';
import { useInvestmentsContext } from '../hooks/useInvestmentsContext';
import { useIncomesContext } from '../hooks/useIncomesContext';
import CategoryBarChart from './CategoryBarChart';
import './InvestmentForm.css';

const SpendingSummary = () => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      
    const now = new Date();
    const monthIndex = now.getMonth();
    const monthName = months[monthIndex];

    const { investments } = useInvestmentsContext();
    const [selectedMonth, setSelectedMonth] = useState(monthName);
    const { incomes } = useIncomesContext();

    const filteredInvestments = investments.filter(investment => {
        const investmentDate = new Date(investment.createdAt);
        const investmentMonth = investmentDate.toLocaleString('default', { month: 'long' }).toLowerCase();
        return investmentMonth === selectedMonth;
    });

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    // Get the total amount of investments
    const totalInvestmentValue = filteredInvestments.reduce((total, investment) => total + investment.amount, 0);
    
    // Get the income total
    const totalIncomeValue = incomes.reduce((total, income) => total + income.amount, 0);

    // Subtracted amount of investments from total income
    const remainingIncome = totalIncomeValue - totalInvestmentValue;

    // Calculate the percentage of income spent on investments if nonnegative
    const investmentPercentage = totalIncomeValue > 0 ? (totalInvestmentValue / totalIncomeValue) * 100 : 0;

    return (
        <div className="spending-summary">
            <p>Total monthly investments: ${totalInvestmentValue.toFixed(2)}</p>
            <form className="create">
                <label>Month:</label>
                <select value={selectedMonth} onChange={handleMonthChange}>
                    <option value=""></option>
                    <option value="january">January</option>
                    <option value="february">February</option>
                    <option value="march">March</option>
                    <option value="april">April</option>
                    <option value="may">May</option>
                    <option value="june">June</option>
                    <option value="july">July</option>
                    <option value="august">August</option>
                    <option value="september">September</option>
                    <option value="october">October</option>
                    <option value="november">November</option>
                    <option value="december">December</option>
                </select>
            </form>
            {/* Pass the selected month to use */}
            <CategoryBarChart selectedMonth={selectedMonth} />
            <label><strong>Year:</strong></label>
            <p>Percentage of income spent: {investmentPercentage.toFixed(2)}%</p>
            <p>Remaining income after investments: ${remainingIncome.toFixed(2)}</p>
        </div>
    );
};

export default SpendingSummary;