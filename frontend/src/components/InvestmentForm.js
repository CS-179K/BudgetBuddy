import { useState } from "react"
import { useInvestmentsContext } from "../hooks/useInvestmentsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import './InvestmentForm.css';
const InvestmentForm = () => {
    const { dispatch } = useInvestmentsContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState('')
    const [error, setError] = useState(null)
    const [type, setType] = useState('');
    const [InvestmentDescription, setDescription] = useState('');
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const investment = {title, amount}

        const response = await fetch('/api/investments', {
            method: 'POST',
            body: JSON.stringify(investment),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setAmount('')
            setType('')
            setError(null)
            setEmptyFields([])
            console.log('New Investment Added', json)
            dispatch({type: 'CREATE_INVESTMENT', payload: json})
        }
    }
    return (
        <form className = "create" onSubmit = {handleSubmit}>
            <h3> Add a New Investment</h3>

            <label> Investment Type: </label>
            <input
                type = "text"
                onChange = {(e) => setTitle(e.target.value)}
                value = {title}
                className = {emptyFields.includes('title') ? 'error' : 'title'}
            />

            <label> Amount in $: </label>
            <input
                type = "number"
                onChange = {(e) => setAmount(e.target.value)}
                value = {amount}
                min="0"
                className = {emptyFields.includes('amount') ? 'error' : 'amount'}
            />
            <label>Type:</label>
            <select
                onChange={(e) => setType(e.target.value)}
                value={type}
                className={emptyFields.includes('type') ? 'error' : 'type'}
            >
                <option value="gas">Gas</option>
                <option value="groceries">Groceries</option>
            </select>
            <label> Investment Description: </label>
            <input
                type = "text"
                onChange = {(e) => setDescription(e.target.value)}
                value = {InvestmentDescription}
                className = {emptyFields.includes('description') ? 'error' : 'description'}
            />

            <button> Add Investment </button>
            {error && <div className = "error">{error}</div>}
        </form>
    )
}

export default InvestmentForm