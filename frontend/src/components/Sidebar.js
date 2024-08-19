// Sidebar.js
import React from 'react';

const Sidebar = ({ setActiveView }) => (
  <nav>
    <ul className = "sidebar">
      <li className = "sidebar"><button onClick={() => setActiveView('investments')}>Investments</button></li>
      <li className = "sidebar"><button onClick={() => setActiveView('budgets')}>Budgets</button></li>
      <li className = "sidebar"><button onClick={() => setActiveView('incomes')}>Incomes</button></li>
    </ul>
  </nav>
);

export default Sidebar;
