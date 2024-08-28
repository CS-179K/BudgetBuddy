import { useState } from "react"
import { useIncomesContext } from "../hooks/useIncomesContext"
import { useAuthContext } from "../hooks/useAuthContext"
import './IncomeForm.css'

const IncomeForm = () => {
    const { incomeDispatch } = useIncomesContext()
    const { user } = useAuthContext()

    const [amount, setAmount] = useState('')
    const [error, setError] = useState(null)
    const [incomeType, setIncomeType] = useState('')
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const income = {amount, incomeType}

        const response = await fetch('/api/incomes', {
            method: 'POST',
            body: JSON.stringify(income),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.EmptyFields || [])
        } else {
            setAmount('')
            setIncomeType('')
            setError(null)
            setEmptyFields([])
            console.log('New Income Added', json)
            incomeDispatch({ type: 'CREATE_INCOME', payload: json })
        }
    }
    return (
        <form className = "create" onSubmit = {handleSubmit}>
            <h3> Add a New Income Source </h3>

            <label> Amount in $: </label>
            <input
                type = "number"
                onChange = {(e) => setAmount(e.target.value)}
                value = {amount}
                min = "0"
                className = {emptyFields.includes('amount') ? 'error' : ''}
            />
            
            <label> Income Type: </label>
            <select
                onChange = {(e) => setIncomeType(e.target.value)}
                value = {incomeType}
                className = {emptyFields.includes('incomeType') ? 'error' : ''}
            >
                <option value = ""> </option>
                <option value = "active"> Active </option>
                <option value = "passive"> Passive </option>
            </select>

            <button> Add Income </button>
            {error && <div className = "error"> {error} </div>}
        </form>
    )
}

export default IncomeForm