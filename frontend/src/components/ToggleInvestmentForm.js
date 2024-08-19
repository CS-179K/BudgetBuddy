// ToggleInvestmentForm.js
import React from 'react';

const ToggleInvestmentForm = ({ setActiveViewInvestment }) => (
  <nav>
    <ul className = "sidebar">
      <li className = "sidebar"><button onClick={() => setActiveViewInvestment('investmentForm')}>Investment Analysis</button></li>
      <li className = "sidebar"><button onClick={() => setActiveViewInvestment('investmentAnalysis')}>Investment Form</button></li>
    </ul>
  </nav>
);

export default ToggleInvestmentForm;
