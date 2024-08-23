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

import InvestmentPieChart from '../components/InvestmentPieChart';

import Notification from '../components/Notification';
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
                )
                case 'Notifications':
                    return (
                      <div className="home">
                        <div className="Notifications" >
                          <h2>Alerts</h2>
                          <Notification notifications={notifications} onDismiss={dismissNotification} />
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

    useEffect(() => {
        /*const fetchInvestments = async () => {
            const response = await fetch('/api/investments', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_INVESTMENTS', payload: json });
            }
        };*/

        if (user) {
            fetchInvestments();
        }
    }, [dispatch, user]);

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

    useEffect(() => {
        /*const fetchBudgets = async () => {
            const response = await fetch('/api/budgets', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                budgetDispatch({ type: 'SET_BUDGETS', payload: json });
            }
        }; */

        if (user) {
            fetchBudgets();
        }
    }, [budgetDispatch, user]);

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

    useEffect(() => {
        /*const fetchIncomes = async () => {
            const response = await fetch('api/incomes', {
                headers: {
                    'Authorization' : `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                incomeDispatch({ type: 'SET_INCOMES', payload: json});
            }
        };*/

        if (user) {
            fetchIncomes();
        }
    }, [incomeDispatch, user]);

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

    useEffect(() => {
        /*const fetchFiles = async () => {
            const response = await fetch ('banks/upload', {
                headers: {
                    'Authorization' : `Bearer ${user.token}`
                }
            });

            const json = await response.json();

            if (response.ok) {
                fileDispatch({ type: 'SET_FILES', payload: json });
            }
        };*/

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

///////////////////////////////////////////////////////////////////////////////////////
useEffect(() => {
    if (user) {
      fetchInvestments();
      fetchBudgets();
      fetchIncomes();
    }
  }, [user]);
  

  // Ensuring data is available before attempting to reduce it
  useEffect(() => {
    if (investments && budgets && investments.length > 0 && budgets.length > 0) {
      checkBudgetUsage();
    }
  }, [investments, budgets]);

  /*const fetchInvestments = async () => {
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

  const fetchIncomes = async () => {
    const response = await fetch('api/incomes', {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();
    if (response.ok) {
      incomeDispatch({ type: 'SET_INCOMES', payload: json });
    }
  };*/



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

const dismissNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
};

// local Storage

/*useEffect(() => {
  const dismissedIds = JSON.parse(localStorage.getItem('dismissedNotifications')) || [];
  setNotifications(currentNotifications => currentNotifications.filter(notif => !dismissedIds.includes(notif.id)));
}, []);

const dismissNotification = (id) => {
setNotifications(currentNotifications => {
    const updatedNotifications = currentNotifications.filter(notif => notif.id !== id);
    const dismissedIds = updatedNotifications.map(notif => notif.id).concat(id);
    localStorage.setItem('dismissedNotifications', JSON.stringify(dismissedIds));
    return updatedNotifications;
});
};*/

// session storage

/*const dismissNotification = (id) => {
setNotifications(currentNotifications => {
    const updatedNotifications = currentNotifications.filter(notif => notif.id !== id);
    const dismissedIds = updatedNotifications.map(notif => notif.id).concat(id);
    sessionStorage.setItem('dismissedNotifications', JSON.stringify(dismissedIds));
    return updatedNotifications;
});
};*/

useEffect(() => {
const dismissedIds = JSON.parse(sessionStorage.getItem('dismissedNotifications')) || [];
setNotifications(currentNotifications => currentNotifications.filter(notif => !dismissedIds.includes(notif.id)));
}, []);

useEffect(() => {
if (investments && budgets) {
  const totalInvestmentValue = investments.reduce((total, investment) => total + investment.amount, 0);
  const totalBudgetValue = budgets.reduce((total, budget) => total + budget.amount, 0);
  const percentageUsed = (totalInvestmentValue / totalBudgetValue) * 100;

  if (percentageUsed >= 100) {
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
}
}, [investments, budgets]);

const handleClose = () => {
setIsModalOpen(false);
};



//<Sidebar setActiveView={handleSetActiveView} />
return (
  <div>
    <Sidebar setActiveView={setActiveView} notifications={notifications} />

    {renderView()}
    <div style={{ flex: 1, padding: '15px' }}>
      <h1>Account Summary</h1>
      <p>Your income is currently ${totalIncomeValue}.</p>
      <p>You are currently investing ${totalInvestmentValue} and your budget is ${totalBudgetValue}.</p>
      <p>You save ${totalBudgetValue - totalInvestmentValue} if you only spend on your investments.</p>
    </div>
    {renderView()}
    {renderViewInvestment()}
    <Modal isOpen={isModalOpen} onClose={handleClose}>
      <p>{modalContent}</p>
    </Modal>
  </div>
);
};


export default Home;