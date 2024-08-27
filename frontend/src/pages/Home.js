import React, { useEffect, useState } from 'react';
import { useInvestmentsContext } from "../hooks/useInvestmentsContext";
import { useBudgetsContext } from "../hooks/useBudgetsContext";
import { useIncomesContext } from "../hooks/useIncomesContext";
import { useBanksContext } from "../hooks/useBanksContext";
import { useAuthContext } from "../hooks/useAuthContext";

// BudgetBuddy Components
import Sidebar from '../components/Sidebar';

import ToggleInvestmentForm from '../components/ToggleInvestmentForm';

import InvestmentDetails from '../components/InvestmentDetails';
import InvestmentForm from '../components/InvestmentForm';
import BudgetDetails from '../components/BudgetDetails';
import BudgetForm from '../components/BudgetForm';
import IncomeDetails from '../components/IncomeDetails';
import IncomeForm from '../components/IncomeForm';
import StatementDetails from '../components/StatementDetails';
import StatementUpload from '../components/StatementUpload';
import SpendingSummary from '../components/SpendingSummary';

import InvestmentPieChart from '../components/InvestmentPieChart';
import BudgetDiffChart from '../components/BudgetDiffChart';

const Home = () => {
    const [activeView, setActiveView] = useState('investments');
    const [activeViewInvestment, setActiveViewInvestment] = useState('neither');
    const { investments, dispatch } = useInvestmentsContext();
    const { budgets, budgetDispatch } = useBudgetsContext();
    const { incomes, incomeDispatch } = useIncomesContext();
    const { files, fileDispatch } = useBanksContext();
    const { user } = useAuthContext();
    const [notifications, setNotifications] = useState([]);

    const handleSetActiveView = (view) => {
        setActiveView(view);
        if (view === 'budgets' || view === 'incomes' || view === 'statements' || view === 'spendingSummary') {
            setActiveViewInvestment('neither');
        }
    };

    const renderView = () => {
        switch (activeView) {
            case 'investments':
                return (
                    <div className="home">
                        <ToggleInvestmentForm setActiveViewInvestment={setActiveViewInvestment} />
                    </div>
                );
            case 'budgets':
                return (
                    <div className="home">
                        <div className="budgets">
                            <h2>Budget</h2>
                            <BudgetDiffChart />
                            {budgets && budgets.map((budget) => (
                                <BudgetDetails key={budget._id} budget={budget} />
                            ))}
                        </div>
                        <BudgetForm />
                    </div>
                );
            case 'incomes':
                return (
                    <div className="home">
                        <div className="incomes">
                            <h2>Income</h2>
                            {incomes && incomes.map((income) => (
                                <IncomeDetails key={income._id} income={income} />
                            ))}
                        </div>
                        <IncomeForm />
                    </div>
                );
            case 'statements':
                return (
                    <div className = "home">
                        <div className="budgets">
                            <h2>Statements</h2>
                            {files && files.map((file) => (
                                <StatementDetails key={file._id} file={file} />
                            ))}
                        </div>  
                        <StatementUpload />
                    </div>
                );
            case 'spendingSummary':
                return (
                    <div className="home">
                        <div>
                            <h2>Spending Summary</h2>
                            <SpendingSummary />
                        </div>  
                    </div>
                );
            default:
                return (
                    <div className="home">
                    </div>
                );
        }
    };

    const renderViewInvestment = () => {
        switch (activeViewInvestment) {
            case 'investmentAnalysis':
                return (
                    <div className="home">
                        <div className="investments">
                            <h2>Investments</h2>
                            <div className="chart-container">
                                <InvestmentPieChart />
                            </div>
                            {investments && investments.map((investment) => (
                                <InvestmentDetails key={investment._id} investment={investment} />
                            ))}
                            <h3>Total Investment Value: ${totalInvestmentValue.toFixed(2)}</h3>
                        </div>
                    </div>
                );
            case 'investmentForm':
                return (
                    <div className="home">
                        <div className="investments">
                            <InvestmentForm />
                        </div>
                    </div>
                );
            case 'neither':
                return (
                    <div className="home">
                    </div>
                );
            default:
                return (
                    <div className="home">
                    </div>
                );
        }
    };

    useEffect(() => {
        const fetchInvestments = async () => {
            const response = await fetch('/api/investments', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_INVESTMENTS', payload: json });
            }
        };

        if (user) {
            fetchInvestments();
        }
    }, [dispatch, user]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await fetch(`/api/notifications/${user._id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if (response.ok) {
                setNotifications(json);
            }
        };

        if (user) {
            fetchNotifications();
        }
    }, [user]);

    // Function to create a notification
    const createNotification = async (message) => {
        const response = await fetch('/api/notifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ userId: user._id, message })
        });
        if (response.ok) {
            const newNotification = await response.json();
            setNotifications((prev) => [...prev, newNotification]);
        }
    };

    useEffect(() => {
        if (investments && budgets) {
            checkBudgetUsage();
        }
    }, [investments, budgets]);
    const checkBudgetUsage = () => {
        const totalInvestmentValue = investments.reduce((total, investment) => total + investment.amount, 0);
        const totalBudgetValue = budgets.reduce((total, budget) => total + budget.amount, 0);
        const percentageUsed = (totalInvestmentValue / totalBudgetValue) * 100;

        if (percentageUsed >= 90 && !notifications.some(n => n.percentage === 90)) {
            createNotification('Critical: You have used 90% of your budget.');
        }
        else if (percentageUsed >= 75 && !notifications.some(n => n.percentage === 75)) {
            createNotification('Caution: You have used 75% of your budget.');
        }
        else if (percentageUsed >= 50 && !notifications.some(n => n.percentage === 50)) {
            createNotification('Attention: You have used 50% of your budget.');
        }
    };
    useEffect(() => {
        const fetchBudgets = async () => {
            const response = await fetch('/api/budgets', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                budgetDispatch({ type: 'SET_BUDGETS', payload: json });
            }
        };

        if (user) {
            fetchBudgets();
        }
    }, [budgetDispatch, user]);

    useEffect(() => {
        const fetchIncomes = async () => {
            const response = await fetch('api/incomes', {
                headers: {
                    'Authorization' : `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                incomeDispatch({ type: 'SET_INCOMES', payload: json});
            }
        };

        if (user) {
            fetchIncomes();
        }
    }, [incomeDispatch, user]);

    useEffect(() => {
        const fetchFiles = async () => {
            const response = await fetch ('banks/upload', {
                headers: {
                    'Authorization' : `Bearer ${user.token}`
                }
            });

            const json = await response.json();

            if (response.ok) {
                fileDispatch({ type: 'SET_FILES', payload: json });
            }
        };

        if (user) {
            fetchFiles();
        }
    }, [fileDispatch, user]);

    const totalInvestmentValue = investments
        ? investments.reduce((total, investment) => total + investment.amount, 0)
        : 0;

    const totalBudgetValue = budgets
        ? budgets.reduce((total, budget) => total + budget.amount, 0)
        : 0;

    const totalIncomeValue = incomes
        ? incomes.reduce((total, income) => total + income.amount, 0)
        : 0;

    const totalStatementValue = files
        ? files.reduce((total, file) => total - file.amount, 0)
        : 0;

    return (
        <div>
            <Sidebar setActiveView={handleSetActiveView} />
            <div style={{ flex: 1, padding: '15px' }}>
                <h1>Account Summary</h1>
                <p>Your income is currently ${totalIncomeValue} and you spent ${totalStatementValue.toFixed(2)} last month.</p>
                <p>You saved ${(totalIncomeValue - totalStatementValue).toFixed(2)} last month.</p>
                <p>Your budget is ${totalBudgetValue} and you plan to spend ${totalInvestmentValue} this month.</p>
                <p>You plan to save ${totalBudgetValue - totalInvestmentValue} this month.</p>
            </div>
            {renderView()}
            {renderViewInvestment()}
            {/* Notifications tab */}
            {activeView === 'notifications' && (
                <div className="home">
                    <h2>Notifications</h2>
                    {notifications.map(notif => (
                        <div key={notif._id}>
                            <p>{notif.message}</p>
                            {/*<button onClick={deleteNotification}>Dismiss</button>*/}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;