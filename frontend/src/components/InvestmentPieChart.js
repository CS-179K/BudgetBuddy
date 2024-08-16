import React from 'react'
import { Chart } from 'react-google-charts'
import { useInvestmentsContext } from '../hooks/useInvestmentsContext'

const InvestmentPieChart = () => {
    const { investments } = useInvestmentsContext()

    const data = [
        ['Investment', 'Amount'],
        ...investments.map(investment => [investment.title, investment.amount])
    ]

    const options = {
        title: 'Investment Chart',
        is3D: false,
    }

    return (
        <div className="investment-chart">
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width="900px"
                height="500px"
            />
        </div>
    )
}

export default InvestmentPieChart