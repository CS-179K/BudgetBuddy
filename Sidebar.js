import React from 'react';

const Sidebar = ({ setActiveView, notifications }) => {
  // Ensure notifications is always an array before accessing its properties
  const safeNotifications = notifications || [];
  const hasNotifications = safeNotifications.length > 0; // Check if there are any notifications
  
  const notificationButtonStyle = {
    backgroundColor: hasNotifications ? 'red' : 'inherit', // Change background color if there are notifications
    color: hasNotifications ? 'white' : 'inherit', // Change text color for better visibility on red background
  };

  return (
    <nav>
      <ul className="sidebar">
        <li className="sidebar"><button onClick={() => setActiveView('investments')}>Investments</button></li>
        <li className="sidebar"><button onClick={() => setActiveView('budgets')}>Budgets</button></li>
        <li className="sidebar"><button onClick={() => setActiveView('incomes')}>Incomes</button></li>
        <li className="sidebar"><button onClick={() => setActiveView('statements')}>Statements</button></li>
        <li className = "sidebar"><button onClick={() => setActiveView('spendingSummary')}>Spending Summary</button></li>
        <li className="sidebar">
          <button 
            style={notificationButtonStyle} 
            onClick={() => setActiveView('Notifications')}
          >
            Notifications {hasNotifications && <span>({safeNotifications.length})</span>}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
