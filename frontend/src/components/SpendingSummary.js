import React from 'react';
import { useInvestmentsContext } from '../hooks/useInvestmentsContext';
import { useIncomesContext } from '../hooks/useIncomesContext';

const SpendingSummary = () => {
    const { investments } = useInvestmentsContext();
    const { incomes } = useIncomesContext();

    const totalInvestmentValue = investments.reduce((total, investment) => total + investment.amount, 0);
    const totalIncomeValue = incomes.reduce((total, income) => total + income.amount, 0);
    const remainingIncome = totalIncomeValue - totalInvestmentValue;

    return (
        <div className="spending-summary">
            <p>Total monthly investments: ${totalInvestmentValue.toFixed(2)}</p>
            <p>Remaining income after investments: ${remainingIncome.toFixed(2)}</p>
        </div>
    );
};

export default SpendingSummary;