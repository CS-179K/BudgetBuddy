import React from 'react'
import { Chart } from 'react-google-charts'
import { useInvestmentsContext } from '../hooks/useInvestmentsContext'

const InvestmentPieChart = ({ selectedMonth }) => {
    const { investments } = useInvestmentsContext()

    const capitalizeFirstLetter = (string) => {
        if (typeof string !== 'string') return '';
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    const filteredInvestments = investments.filter(investment => { // Iterates through the investments
        const investmentDate = new Date(investment.createdAt); // Use Date() and the createdAt field from the investment object
        const investmentMonth = capitalizeFirstLetter(investmentDate.toLocaleString('default', { month: 'long' })); // Turn into string and lowercase
        return investmentMonth === capitalizeFirstLetter(selectedMonth); // Turned into lowercase to check against the optionvalue
    });

    const data = [
        ['Investment', 'Amount', { role: 'tooltip', type: 'string' }],
        ...(filteredInvestments ? filteredInvestments.map(investment => [investment.title, investment.amount, `Investment: ${investment.title}\nAmount: $${investment.amount}`]) : [])
    ];

    const options = {
        backgroundColor: 'transparent',
        legend: { position: 'left' },
        is3D: false,
        pieHole: 0.4,
    }

    return (
        <div className="investment-chart-container">
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width="100%"
                height="100%"
            />
        </div>
    )
}

export default InvestmentPieChart