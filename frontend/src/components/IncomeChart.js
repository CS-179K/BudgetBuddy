import React from 'react';
import { Chart } from 'react-google-charts';
import { useIncomesContext } from '../hooks/useIncomesContext';

const IncomePieChart = ({ selectedMonth }) => {
    const { incomes } = useIncomesContext();
    
    const capitalizeFirstLetter = (string) => {
        if (typeof string !== 'string') return '';
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    const filteredIncomes = incomes.filter(income => { // Iterates through the budget
        const incomeDate = new Date(income.createdAt); // Use Date() and the createdAt field from the budget object
        const incomeMonth = capitalizeFirstLetter(incomeDate.toLocaleString('default', { month: 'long' })); // Turn into string and lowercase
        return incomeMonth === capitalizeFirstLetter(selectedMonth); // Condition to return 
    });

    const incomeTypeTotals = filteredIncomes.reduce((acc, income) => {
        const { incomeType, amount } = income;
        if (!acc[incomeType]) {
            acc[incomeType] = 0;
        }
        acc[incomeType] += amount;
        return acc;
    }, {});

    const data = [
        ['Income Type', 'Amount'],
        ...Object.entries(incomeTypeTotals).map(([type, amount]) => [type, Number(amount)])
    ];

    const options = {
        title: 'Income By Type',
        backgroundColor: 'transparent',
        legend: { position: 'left' },
        is3D: true,
        pieHole: 0.4,
    };

    return (
        <div className="income-chart-container">
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width="100%"
                height="400px"
            />
        </div>
    );
};

export default IncomePieChart;