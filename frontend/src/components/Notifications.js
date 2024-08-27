import { useNotificationsContext } from '../hooks/useNotificationsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// Date FNS Library
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const NotificationDetails = ({ notification }) => {
    const { notificationDispatch } = useNotificationsContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/api/notifications/' + notification._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (response.ok) {
            notificationDispatch({type: 'DELETE_NOTIFICATION', payload: json})
        }
    }
    return (
        <div className = "investment-details">
            <p><strong>{notification.message}</strong></p>
            <p>{formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true})}</p>
            <span className = "material-symbols-outlined" onClick = {handleClick}>delete</span>
        </div>
    )
}

export default NotificationDetails