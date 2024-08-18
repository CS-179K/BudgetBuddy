import React, { useEffect, useState } from 'react'
import { useInvestmentsContext } from "../hooks/useInvestmentsContext" 
import { useBudgetsContext } from "../hooks/useBudgetsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// BudgetBuddy Components
import Sidebar from '../components/Sidebar'
import InvestmentDetails from '../components/InvestmentDetails'
import InvestmentForm from '../components/InvestmentForm'
import BudgetDetails from '../components/BudgetDetails'
import BudgetForm from '../components/BudgetForm'

const Home = () => {
    const [activeView, setActiveView] = useState('investments')
    const {investments, dispatch} = useInvestmentsContext()
    const {budgets, budgetDispatch} = useBudgetsContext()
    const {user} = useAuthContext()

    const renderView = () => {
        switch (activeView) {
            case 'investments':
                return (
                    <div className = "home">
                        <div className = "investments">
                            <h2>Investments</h2>
                            {investments && investments.map((investment) => (
                                <InvestmentDetails key = {investment._id} investment = {investment} />
                            ))}
                            <h3>Total Investment Value: ${totalInvestmentValue.toFixed(2)}</h3>
                        </div>
                        <InvestmentForm />
                    </div>
                )
            case 'budgets':
                return ( 
                    <div className = "home">
                        <div className = "budgets">
                            <h2>Budget</h2>
                            {budgets && budgets.map((budget) => (
                                <BudgetDetails key = {budget._id} budget = {budget} />
                            ))}
                        </div>
                        <BudgetForm />
                    </div>
                )
            case 'transactions':
                return ( 
                    <div className = "home">
                    <div className = "budgets">
                            <h2>Budget</h2>
                            {budgets && budgets.map((budget) => (
                                <BudgetDetails key = {budget._id} budget = {budget} />
                            ))}
                        </div>
                        <BudgetForm />
                    </div>
                )
            default:
                return ( 
                    <div className = "home">
                        <div className = "investments">
                            <h2>Investments</h2>
                            {investments && investments.map((investment) => (
                                <InvestmentDetails key = {investment._id} investment = {investment} />
                            ))}
                            <h3>Total Investment Value: ${totalInvestmentValue.toFixed(2)}</h3>
                        </div>
                        <InvestmentForm />
                    </div>
                )
        }
    };

    useEffect(() => {
        const fetchInvestments = async () => {
            const response = await fetch('/api/investments', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_INVESTMENTS', payload: json})
            }
        }

        if (user) {
            fetchInvestments()
        }
    }, [dispatch])

    useEffect(() => {
        const fetchBudgets = async () => {
            const response = await fetch('/api/budgets', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                budgetDispatch({type: 'SET_BUDGETS', payload: json})
            }
        }

        if (user) {
            fetchBudgets()
        }
    }, [budgetDispatch])

    // Calculate the total investment value
    const totalInvestmentValue = investments
    ? investments.reduce((total, investment) => total + investment.amount, 0)
    : 0

    const totalBudgetValue = budgets
    ? budgets.reduce((total, budget) => total + budget.amount, 0)
    : 0

    return (
        <div>
            <Sidebar setActiveView={setActiveView} />
                <div style={{ flex: 1, padding: '15px' }}>
                    <h1>Account Summary</h1>
                    <p> You are currently investing ${totalInvestmentValue} and your budget is ${totalBudgetValue}.</p>
                    <p> You gain a net profit of ${totalBudgetValue - totalInvestmentValue} if you only spend on your investments.</p>
                {renderView()}
            </div>
        </div>
    )
}

export default Home