import React from 'react';
import { Chart } from 'react-google-charts';
import { useBudgetsContext } from '../hooks/useBudgetsContext';
import { useInvestmentsContext } from '../hooks/useInvestmentsContext';

const BudgetDiffChart = () => {
    const { budgets } = useBudgetsContext();
    const { investments } = useInvestmentsContext();

    const totalBudget = budgets.reduce((total, budget) => total + budget.amount, 0);
    const totalInvestment = investments.reduce((total, investment) => total + investment.amount, 0);

    const oldData = [
        ['Category', 'Amount'],
        ['Total Budget', totalBudget]
    ];

    const newData = [
        ['Category', 'Amount'],
        ['Total Investment', totalInvestment]
    ];

    const options = {
        title: 'Budget vs Investment',
        backgroundColor: 'transparent',
        legend: { position: 'left' },
        isStacked: true,
        colors: totalInvestment > totalBudget ? ['red'] : ['green']
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