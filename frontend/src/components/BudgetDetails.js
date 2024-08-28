import { useBudgetsContext } from '../hooks/useBudgetsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// Date FNS Library
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const BudgetDetails = ({ budget }) => {
    const { budgetDispatch } = useBudgetsContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/api/budgets/' + budget._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (response.ok) {
            budgetDispatch({type: 'DELETE_BUDGET', payload: json})
        }
    }
    return (
        <div className = "budget-details">
            <p><strong> Budget in $: </strong> {budget.amount} </p>
            <p>{formatDistanceToNow(new Date(budget.createdAt), { addSuffix: true })}</p>
            <span className = "material-symbols-outlined" onClick = {handleClick}>delete</span>
        </div>
    )
}

export default BudgetDetails