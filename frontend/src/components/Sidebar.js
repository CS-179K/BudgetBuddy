import React, { useState } from 'react';

const Sidebar = ({ setActiveView, notifications }) => {
  const [activeButton, setActiveButton] = useState(null); // State to track the active button

  // Ensure notifications is always an array before accessing its properties
  const safeNotifications = notifications || [];
  const hasNotifications = safeNotifications.length > 0; // Check if there are any notifications

  const handleClick = (view) => {
    setActiveView(view);
    setActiveButton(view); // Set the clicked button as active
  };

  // Dynamic styles for buttons
  const getButtonStyle = (view) => {
    let baseStyle = {
      padding: '10px 20px',
      backgroundColor: activeButton === view ? 'grey' : 'white', // Active button turns grey
      color: activeButton === view ? 'white' : 'green', // Active button text turns white
      border: 'none',
      cursor: 'pointer',
    };

    // Apply additional styles for the notifications button if there are notifications
    if (view === 'notifications' && hasNotifications) {
      baseStyle.backgroundColor = activeButton === view ? 'grey' : 'red'; // Red when there are notifications
      baseStyle.color = 'white'; // White text for visibility
    }

    return baseStyle;
  };

  return (
    <nav>
      <ul className="sidebar">
        <li className="sidebar">
          <button 
            style={getButtonStyle('investments')} 
            onClick={() => handleClick('investments')}
          >
            Investments
          </button>
        </li>
        <li className="sidebar">
          <button 
            style={getButtonStyle('budgets')} 
            onClick={() => handleClick('budgets')}
          >
            Budgets
          </button>
        </li>
        <li className="sidebar">
          <button 
            style={getButtonStyle('incomes')} 
            onClick={() => handleClick('incomes')}
          >
            Incomes
          </button>
        </li>
        <li className="sidebar">
          <button 
            style={getButtonStyle('statements')} 
            onClick={() => handleClick('statements')}
          >
            Statements
          </button>
        </li>
        <li className="sidebar">
          <button 
            style={getButtonStyle('spendingSummary')} 
            onClick={() => handleClick('spendingSummary')}
          >
            Spending Summary
          </button>
        </li>
        <li className="sidebar">
          <button 
            style={getButtonStyle('notifications')} 
            onClick={() => handleClick('notifications')}
          >
            Notifications {hasNotifications && <span>({safeNotifications.length})</span>}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
