/*const notificationButton = document.getElementById('notificationButton');
let unreadNotifications = 0;

function updateNotificationButton() {
  notificationButton.textContent = `Notifications (${unreadNotifications})`;
}

function showNotification(message) {
  // Display the notification (e.g., using a modal or popup)
  unreadNotifications++;
  updateNotificationButton();
}

notificationButton.addEventListener('click', () => {
  // Handle button click (e.g., show a list of unread notifications)
  unreadNotifications = 0;
  updateNotificationButton();
});*/



/* const Notification = ({ message }) => {
  return (
    <div className="notification">
      {message}
    </div>
  );
}; */

/* const Notification = ({ notifications, onDismiss }) => {
  return (
      <div className="notification-container">
          {notifications.map(notif => (
              <div key={notif.id} className="notification">
                  {notif.message}
                  <button onClick={() => onDismiss(notif.id)}>Dismiss</button>
              </div>
          ))}
      </div>
  );
};*/

import React from 'react';

const Notification = ({ notifications, onDismiss }) => {
    // Define the date formatting function to convert the timestamp into a readable format
    const formatDate = (date) => {
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${date.toLocaleDateString()}`;
    };

    // Determine if there are any notifications to adjust the styling accordingly
    const hasNotifications = notifications.length > 0;
    const notificationStyle = {
        backgroundColor: hasNotifications ? 'red' : 'transparent', // Red when there are notifications, transparent otherwise
        color: hasNotifications ? 'white' : 'black', // White text on red background
        padding: '10px',
        margin: '10px',
    };

    return (
        <div className="notification-container" style={notificationStyle}>
            {notifications.map(notif => (
                <div key={notif.id} className="notification">
                    <p>{notif.message}</p>
                    <p className="timestamp">{formatDate(new Date(notif.timestamp))}</p>
                    <button onClick={() => onDismiss(notif.id)}>Dismiss</button>
                </div>
            ))}
        </div>
    );
};

export default Notification;

