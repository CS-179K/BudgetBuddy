import React from 'react';
import { Chart } from 'react-google-charts';
import { useInvestmentsContext } from '../hooks/useInvestmentsContext';

const CategoryBarChart = () => {
    const { investments } = useInvestmentsContext();

    const investmentTypeTotals = investments.reduce((acc, investment) => {
        const { investmentType, amount } = investment;
        if (!acc[investmentType]) {
            acc[investmentType] = 0;
        }
        acc[investmentType] += amount;
        return acc;
    }, {});

    const data = [
        ['Investment Type', 'Amount', { role: 'tooltip', type: 'string' }],
        ...Object.entries(investmentTypeTotals).map(([type, amount]) => [type, amount, `Type: ${type}\nAmount: $${amount}`])
    ];

    const options = {
        title: 'Spending By Type',
        backgroundColor: 'transparent',
        legend: { position: 'left' },
        is3D: false,
    };

    return (
        <div>
            <Chart
                chartType="BarChart"
                data={data}
                options={options}
                width="100%"
                height="100%"
            />
        </div>
    );
};

export default CategoryBarChart;