import React from 'react';
import { Chart } from 'react-google-charts';
import { useInvestmentsContext } from '../hooks/useInvestmentsContext';

const CategoryBarChart = ({ selectedMonth }) => {
    const { investments } = useInvestmentsContext();

    const filteredInvestments = investments.filter(investment => { // Iterates through the investments
        const investmentDate = new Date(investment.createdAt); // Use Date() and the createdAt field from the investment object
        const investmentMonth = investmentDate.toLocaleString('default', { month: 'long' }).toLowerCase(); // Turn into string and lowercase
        return investmentMonth === selectedMonth; // Turned into lowercase to check against the optionvalue
    });

    const investmentTypeTotals = filteredInvestments.reduce((acc, investment) => {
        const { investmentType, amount } = investment;
        if (!acc[investmentType]) { // Check if the investment type is not in the acc array
            acc[investmentType] = 0; 
        }
        acc[investmentType] += amount; // Sums up for each investment type
        return acc;
    }, {});

    const data = [
        ['Investment Type', 'Amount'],
        ...Object.entries(investmentTypeTotals).map(([type, amount]) => [type, Number(amount)]) // Maps through investmentTypeTotals
    ];

    const options = {
        title: 'Spending By Type',
        backgroundColor: 'transparent',
        legend: { position: 'left' },
        hAxis: { title: 'Amount' },
        vAxis: { title: 'Investment Type' },
    };

    return (
        <div>
            {data.length > 1 ? (
                <Chart
                    chartType="BarChart"
                    data={data}
                    options={options}
                    width="100%"
                    height="400px"
                />
            ) : (
                <p>Nothing spent for the selected month.</p>
            )}
        </div>
    );
};

export default CategoryBarChart;