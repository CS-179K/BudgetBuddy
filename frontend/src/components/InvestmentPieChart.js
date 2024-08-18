import React from 'react'
import { Chart } from 'react-google-charts'
import { useInvestmentsContext } from '../hooks/useInvestmentsContext'

const InvestmentPieChart = () => {
    const { investments } = useInvestmentsContext()

    const data = [
        ['Investment', 'Amount', { role: 'tooltip', type: 'string' }],
        ...(investments ? investments.map(investment => [investment.title, investment.amount, `Investment: ${investment.title}\nAmount: $${investment.amount}`]) : [])
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