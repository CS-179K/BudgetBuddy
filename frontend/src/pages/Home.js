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
import IncomePieChart from '../components/IncomeChart';

const Home = () => {
    const [activeView, setActiveView] = useState('investments');
    const [activeViewInvestment, setActiveViewInvestment] = useState('neither');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [totalInvestmentValue, setTotalInvestmentValue] = useState(0);
    const [filteredInvestments, setFilteredInvestments] = useState([]);
    const { investments, dispatch } = useInvestmentsContext();
    const { budgets, budgetDispatch } = useBudgetsContext();
    const { incomes, incomeDispatch } = useIncomesContext();
    const { files, fileDispatch } = useBanksContext();
    const { user } = useAuthContext();

    //Filters investments by month
    useEffect(() => {
        if (investments && Array.isArray(investments)) {
            const filtered = investments.filter(investment => {
                const investmentDate = new Date(investment.createdAt);
                const investmentMonth = investmentDate.toLocaleString('default', { month: 'long' }).toLowerCase();
                return investmentMonth === selectedMonth;
            });
    
            setFilteredInvestments(filtered);
    
            const totalValue = filtered.reduce((total, investment) => total + investment.amount, 0);
            setTotalInvestmentValue(totalValue);
        }
    }, [investments, selectedMonth]);

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

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
                            <IncomePieChart />
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
                            <form className="create">
                                <label>Month:</label>
                                <select value={selectedMonth} onChange={handleMonthChange}>
                                    <option value=""></option>
                                    <option value="january">January</option>
                                    <option value="february">February</option>
                                    <option value="march">March</option>
                                    <option value="april">April</option>
                                    <option value="may">May</option>
                                    <option value="june">June</option>
                                    <option value="july">July</option>
                                    <option value="august">August</option>
                                    <option value="september">September</option>
                                    <option value="october">October</option>
                                    <option value="november">November</option>
                                    <option value="december">December</option>
                                </select>
                            </form>
                            <div className="chart-container">
                                <InvestmentPieChart selectedMonth={selectedMonth}/>
                            </div>
                            {filteredInvestments && filteredInvestments.length > 0 ? (
                                filteredInvestments.map((investment) => (
                                    <InvestmentDetails key={investment._id} investment={investment} />
                                ))
                            ) : (
                                <p>No investments for the selected month.</p>
                            )}
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
        </div>
    );
};

export default Home;