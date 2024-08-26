import React from 'react';
import { Chart } from 'react-google-charts';
import { useBudgetsContext } from '../hooks/useBudgetsContext';
import { useInvestmentsContext } from '../hooks/useInvestmentsContext';

const BudgetDiffChart = ({ selectedMonth }) => {
    const { budgets } = useBudgetsContext();
    const { investments } = useInvestmentsContext();

    const capitalizeFirstLetter = (string) => {
        if (typeof string !== 'string') return '';
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    const filteredBudgets = budgets.filter(budget => { // Iterates through the investments
        const budgetDate = new Date(budget.createdAt); // Use Date() and the createdAt field from the investment object
        const budgetMonth = capitalizeFirstLetter(budgetDate.toLocaleString('default', { month: 'long' })); // Turn into string and lowercase
        return budgetMonth === capitalizeFirstLetter(selectedMonth); // Turned into lowercase to check against the optionvalue
    });

    const filteredInvestments = investments.filter(investment => { // Iterates through the investments
        const investmentDate = new Date(investment.createdAt); // Use Date() and the createdAt field from the investment object
        const investmentMonth = capitalizeFirstLetter(investmentDate.toLocaleString('default', { month: 'long' })); // Turn into string and lowercase
        return investmentMonth === capitalizeFirstLetter(selectedMonth); // Turned into lowercase to check against the optionvalue
    });

    const totalBudget = filteredBudgets.reduce((total, budget) => total + budget.amount, 0);
    const totalInvestment = filteredInvestments.reduce((total, investment) => total + investment.amount, 0);

    const oldData = [
        ['Category', 'Investment'],
        ['Total Budget', totalBudget]
    ];

    const newData = [
        ['Category', 'Investment'],
        ['Total Investment', totalInvestment]
    ];

    const options = {
        title: 'Budget vs Investment',
        backgroundColor: 'transparent',
        isStacked: true,
        colors: totalInvestment > totalBudget ? ['red'] : ['green'],
        legend: {
            position: 'top',
            textStyle: { fontSize: 15 } 
        }
    };

    return (
        <div>
            <Chart
                chartType="ColumnChart"
                diffdata={{ old: oldData, new: newData }}
                options={options}
                width="100%"
                height="100%"
            />
        </div>
    );
};

export default BudgetDiffChart;