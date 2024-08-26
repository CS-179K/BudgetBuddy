import React, { useState, useEffect } from 'react';
import { checkBudgetUsage } from '../services/NotificationService';
import { useAuthContext } from '../hooks/useAuthContext';

/*// Notification Item Component
const NotificationItem = ({ notification, onDismiss }) => {
    console.log("Rendering Notification: ", notification); // Log each notification
    return (
        <div className="notification">
            <p>{notification.message}</p>
            <button onClick={() => onDismiss(notification.id)}>Dismiss</button>
        </div>
    );
};

// Notifications List Component
const Notifications = () => {
    const { user } = useAuthContext();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            if (user) {
                try {
                    const newNotifications = await checkBudgetUsage(user._id, user.token);
                    setNotifications(newNotifications || []); // Ensure it's always an array
                } catch (err) {
                    console.error('Failed to fetch notifications', err);
                }
            }
        };

        fetchNotifications();
    }, [user]);

    const dismissNotification = async (id) => {
        try {
            await fetch(`/api/notifications/${id}/dismiss`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                }
            });

            setNotifications(notifications.filter(notification => notification.id !== id));
        } catch (err) {
            console.error('Failed to dismiss notification', err);
        }
    };

    return (
        <div className="notifications">
            <h3>Notifications</h3>
            {notifications.length > 0 ? (
                notifications.map(notification => (
                    <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onDismiss={dismissNotification}
                    />
                ))
            ) : (
                <p>No notifications to display.</p>
            )}
        </div>
    );
};

export default Notifications;*/


const Notification = ({ notifications, onDismiss }) => {
    return (
        <div className="notifications">
            {notifications.map(notification => (
                <div key={notification.id} className="notification">
                    <p>{notification.message}</p>
                    <button onClick={() => onDismiss(notification.id)}>Dismiss</button>
                </div>
            ))}
        </div>
        
    );
};

export default Notification;

