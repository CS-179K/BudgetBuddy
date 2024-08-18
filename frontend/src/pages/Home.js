import { useEffect } from 'react'
import { useInvestmentsContext } from "../hooks/useInvestmentsContext" 
import { useBudgetsContext } from "../hooks/useBudgetsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// BudgetBuddy Components
import InvestmentDetails from '../components/InvestmentDetails'
import InvestmentForm from '../components/InvestmentForm'
import BudgetDetails from '../components/BudgetDetails'
import BudgetForm from '../components/BudgetForm'

const Home = () => {
    const {investments, dispatch} = useInvestmentsContext()
    const {budgets, budgetDispatch} = useBudgetsContext()
    const {user} = useAuthContext()

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

            <div className = "budgets">
                <h2>Budget</h2>
                {budgets && budgets.map((budget) => (
                    <BudgetDetails key = {budget._id} budget = {budget} />
                ))}
            </div>
            <BudgetForm />
        </div>
    )
}

export default Home