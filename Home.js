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

import Notification from '../components/Notifications';
import Modal from '../components/Modal';  



const Home = () => {
    const [activeView, setActiveView] = useState('investments');
    const [activeViewInvestment, setActiveViewInvestment] = useState('neither');
    const { investments, dispatch } = useInvestmentsContext();
    const { budgets, budgetDispatch } = useBudgetsContext();
    const { incomes, incomeDispatch } = useIncomesContext();
    const { files, fileDispatch } = useBanksContext();
    const { user } = useAuthContext();

    const [notifications, setNotifications] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [lastPercentageUsed, setLastPercentageUsed] = useState(null);
    const [generateNotifications, setGenerateNotifications] = useState(null);

    // Dismiss notification function
    const dismissNotification = (id) => {
        setNotifications(notifications.filter(notif => notif.id !== id));
    };

    // Fetch Investments
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

    // Fetch Budgets
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

    // Fetch Incomes
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

    // Fetch Files
    const fetchFiles = async () => {
        const response = await fetch('banks/upload', {
            headers: {
                'Authorization' : `Bearer ${user.token}`
            }
        });
        const json = await response.json();
        if (response.ok) {
            fileDispatch({ type: 'SET_FILES', payload: json });
        }
    };

    useEffect(() => {
        if (user) {
            fetchInvestments();
            fetchBudgets();
            fetchIncomes();
            fetchFiles();
        }
    }, [user]);

    // Use effect to check budget usage after investments and budgets are fetched
    useEffect(() => {
        if (investments && budgets && investments.length > 0 && budgets.length > 0) {
            checkBudgetUsage();
        }
    }, [investments, budgets]);

    // Function to check budget usage and generate notifications
    const checkBudgetUsage = () => {
        const totalInvestmentValue = investments.reduce((total, investment) => total + investment.amount, 0);
        const totalBudgetValue = budgets.reduce((total, budget) => total + budget.amount, 0);
        const percentageUsed = (totalInvestmentValue / totalBudgetValue) * 100;

        const newNotifications = [];

        if (percentageUsed >= 100 && !notifications.find(n => n.message.includes("exceeded your budget"))) {
            newNotifications.push({ id: Date.now(), message: "Alert: You have exceeded your budget!", timestamp: new Date() });
        } 
        if (percentageUsed >= 75 && !notifications.find(n => n.message.includes("75% of your budget"))) {
            newNotifications.push({ id: Date.now() + 1, message: "Caution: You have used 75% of your budget.", timestamp: new Date() });
        }
        if (percentageUsed >= 50 && !notifications.find(n => n.message.includes("50% of your budget"))) {
            newNotifications.push({ id: Date.now() + 2, message: "Attention: You have used 50% of your budget.", timestamp: new Date() });
        }
        if (percentageUsed >= 25 && !notifications.find(n => n.message.includes("25% of your budget"))) {
            newNotifications.push({ id: Date.now() + 3, message: "Notice: You have used 25% of your budget.", timestamp: new Date() });
        }

        if (newNotifications.length > 0) {
            setNotifications([...notifications, ...newNotifications]);
        }
    };

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

    // Handle view change
    const handleSetActiveView = (view) => {
        setActiveView(view);
        if (view === 'budgets' || view === 'incomes' || view === 'statements') {
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
            case 'Notifications':
                return (
                    <div className="home">
                        <div className="Notifications">
                            <h2>Alerts</h2>
                            <Notification notifications={notifications} onDismiss={dismissNotification} />
                        </div>
                    </div>
                );            
            default:
                return <div className="home"></div>;
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
                return <div className="home"></div>;
            default:
                return <div className="home"></div>;
        }
    };


useEffect(() => {
    const dismissedIds = JSON.parse(sessionStorage.getItem('dismissedNotifications')) || [];
    setNotifications(currentNotifications => currentNotifications.filter(notif => !dismissedIds.includes(notif.id)));
  }, []);
  
  useEffect(() => {
    if (investments && budgets) {
        const totalInvestmentValue = investments.reduce((total, investment) => total + investment.amount, 0);
        const totalBudgetValue = budgets.reduce((total, budget) => total + budget.amount, 0);
        const percentageUsed = (totalInvestmentValue / totalBudgetValue) * 100;

        console.log(`Percentage Used: ${percentageUsed}, Last Percentage Used: ${lastPercentageUsed}`);

        if (percentageUsed !== lastPercentageUsed) {
            console.log("Percentage has changed, updating...");
            setLastPercentageUsed(percentageUsed); // Update the last known percentage
            
            if (generateNotifications) {
                generateNotifications(percentageUsed);
            }
        }
    }
}, [investments, budgets, lastPercentageUsed,generateNotifications]);

useEffect(() => {
    const newGenerateNotifications = (percentageUsed) => {
        if(percentageUsed === lastPercentageUsed){
            console.log("No change in the budget percentage.");
            setIsModalOpen(false)
        }else if (percentageUsed >= 100) {
            setModalContent('Alert: You have exceeded your budget!');
            setIsModalOpen(true);
        } else if (percentageUsed >= 75) {
            setModalContent('Caution: You have used 75% of your budget.');
            setIsModalOpen(true);
        } else if (percentageUsed >= 50) {
            setModalContent('Attention: You have used 50% of your budget.');
            setIsModalOpen(true);
        } else if (percentageUsed >= 25) {
            setModalContent('Notice: You have used 25% of your budget.');
            setIsModalOpen(true);
        }
        
    };

    setGenerateNotifications(() => newGenerateNotifications);
}, []);

  
  const handleClose = () => {
    setIsModalOpen(false);
  };
  
      

    return (
        <div>
            <Sidebar setActiveView={setActiveView} notifications={notifications} />

            <div style={{ flex: 1, padding: '15px' }}>
                <h1>Account Summary</h1>
                <p>Your income is currently ${totalIncomeValue}.</p>
                <p>You are currently investing ${totalInvestmentValue} and your budget is ${totalBudgetValue}.</p>
                <p>You save ${totalBudgetValue - totalInvestmentValue} if you only spend on your investments.</p>
            </div>

            {renderView()}
            {renderViewInvestment()}
            {isModalOpen && (
    <Modal onClose={handleClose}>
        <p>{modalContent}</p>
    </Modal>
)}

        </div>
    );
};

export default Home;
