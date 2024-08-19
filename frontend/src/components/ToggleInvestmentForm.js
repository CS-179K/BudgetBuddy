// ToggleInvestmentForm.js
import React from 'react';

const ToggleInvestmentForm = ({ setActiveViewInvestment }) => (
  <nav>
    <ul className = "investmentBar">
      <li className = "investmentBar"><button onClick={() => setActiveViewInvestment('investmentAnalysis')}>Investment Analysis</button></li>
      <li className = "investmentBar"><button onClick={() => setActiveViewInvestment('investmentForm')}>Investment Form</button></li>
    </ul>
  </nav>
);

export default ToggleInvestmentForm;
