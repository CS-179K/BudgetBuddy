import { useEffect } from 'react'
import { useInvestmentsContext } from "../hooks/useInvestmentsContext" 

// BudgetBuddy Components
import InvestmentDetails from '../components/InvestmentDetails'
import InvestmentForm from '../components/InvestmentForm'

const Home = () => {
    const {investments, dispatch} = useInvestmentsContext()

    useEffect(() => {
        const fetchInvestments = async () => {
            const response = await fetch('/api/investments')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_INVESTMENTS', payload: json})
            }
        }

        fetchInvestments()
    }, [dispatch])

    return (
        <div className = "home">
            <div className = "investments">
                {investments && investments.map((investment) => (
                    <InvestmentDetails key = {investment._id} investment = {investment} />
                ))}
            </div>
            <InvestmentForm />
        </div>
    )
}

export default Home