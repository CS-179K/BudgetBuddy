import React from 'react';
import { Chart } from 'react-google-charts';
import { useIncomesContext } from '../hooks/useIncomesContext';

const IncomePieChart = () => {
    const { incomes } = useIncomesContext();
    
    const incomeTypeTotals = incomes.reduce((acc, income) => {
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