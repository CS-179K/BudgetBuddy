import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { InvestmentsContextProvider } from './context/InvestmentContext'
import { BudgetsContextProvider } from './context/BudgetContext'
import { IncomesContextProvider } from './context/IncomeContext'
import { AuthContextProvider } from './context/AuthContext'
import { BanksContextProvider } from './context/BankContext'
import { NotificationsContextProvider } from './context/NotificationContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <InvestmentsContextProvider>
        <BudgetsContextProvider>
          <IncomesContextProvider>
            <BanksContextProvider>
              <NotificationsContextProvider>
                <App />
              </NotificationsContextProvider>
            </BanksContextProvider>
          </IncomesContextProvider>
        </BudgetsContextProvider>
      </InvestmentsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);