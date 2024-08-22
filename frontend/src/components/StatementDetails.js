import { useBanksContext } from '../hooks/useBanksContext'
import { useAuthContext } from '../hooks/useAuthContext'

// Date FNS Library
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const StatementDetails = ({ file }) => {
    const { fileDispatch } = useBanksContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch ('banks/upload/' + file._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (response.ok) {
            fileDispatch({type: 'DELETE_FILE', payload: json})
        }
    }
    return (
        <div className = "investment-details">
            <h4>{file.title}</h4>
            <p><strong>Amount in $: </strong> {file.amount} </p>
            <p><strong>Date: </strong> {file.date} </p>
            <p><strong>Description: </strong> {file.description} </p>
            <p>{formatDistanceToNow(new Date(file.createdAt), { addSuffix: true })}</p>
            <span className = "material-symbols-outlined" onClick = {handleClick}>delete</span>
        </div>
    )
}

export default StatementDetails