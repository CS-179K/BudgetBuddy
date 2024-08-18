import { useState } from "react"
import { useBudgetsContext } from "../hooks/useBudgetsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import './BudgetForm.css';

const BudgetForm = () => {
    const { budgetDispatch } = useBudgetsContext()
    const { user } = useAuthContext()

    const [amount, setAmount] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const budget = {amount}

        const response = await fetch('/api/budgets', {
            method: 'POST',
            body: JSON.stringify(budget),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields || [])
        } else {
            setAmount('')
            setError(null)
            setEmptyFields([])
            console.log('New Budget Added', json)
            budgetDispatch({ type: 'CREATE_BUDGET', payload: json })
        }
    }
    return (
        <form className = "create" onSubmit = {handleSubmit}>
            <h3> Add a New Budget</h3>

            <label> Budget in $: </label>
            <input
                type = "number"
                onChange = {(e) => setAmount(e.target.value)}
                value = {amount}
                min = "0"
                className = {emptyFields.includes('amount') ? 'error' : ''}
            />

            <button> Add Budget </button>
            {error && <div className = "error">{error}</div>}
        </form>
    )
}

export default BudgetForm