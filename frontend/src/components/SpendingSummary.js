import React from 'react';
import { useInvestmentsContext } from '../hooks/useInvestmentsContext';
import { useIncomesContext } from '../hooks/useIncomesContext';
import CategoryBarChart from './CategoryBarChart';
import './InvestmentForm.css';

const SpendingSummary = () => {
    const { investments } = useInvestmentsContext();
    const { incomes } = useIncomesContext();

    const totalInvestmentValue = investments.reduce((total, investment) => total + investment.amount, 0);
    const totalIncomeValue = incomes.reduce((total, income) => total + income.amount, 0);
    const remainingIncome = totalIncomeValue - totalInvestmentValue;
    const investmentPercentage = totalIncomeValue > 0 ? (totalInvestmentValue / totalIncomeValue) * 100 : 0;

    return (
        <div className="spending-summary">
            <p>Total monthly investments: ${totalInvestmentValue.toFixed(2)}</p>
            <form className="create">
                <label>Month:</label>
                <select>
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
            <CategoryBarChart/>
            <p>Percentage of income spent: {investmentPercentage.toFixed(2)}%</p>
            <p>Remaining income after investments: ${remainingIncome.toFixed(2)}</p>
        </div>
    );
};

export default SpendingSummary;