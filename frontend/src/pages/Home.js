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
    const [selectedMonth, setSelectedMonth] = useState('{select month}');
    const [selectedMonthStatements, setSelectedMonthStatements] = useState('{select month}');
    const [totalInvestmentValue, setTotalInvestmentValue] = useState(0);
    const [totalStatementValue, setTotalStatementValue] = useState(0);
    const [totalIncomeValue, setTotalIncomeValue] = useState(0);
    const [totalBudgetValue, setTotalBudgetValue] = useState(0);
    const [filteredInvestments, setFilteredInvestments] = useState([]);
    const [filteredFiles, setFilteredFiles] = useState([]);
    const [filteredBudgets, setFilteredBudgets] = useState([]);
    const [filteredIncomes, setFilteredIncomes] = useState([]);
    const { investments, dispatch } = useInvestmentsContext();
    const { budgets, budgetDispatch } = useBudgetsContext();
    const { incomes, incomeDispatch } = useIncomesContext();
    const { files, fileDispatch } = useBanksContext();
    const { user } = useAuthContext();

    const capitalizeFirstLetter = (string) => {
        if (typeof string !== 'string') return '';
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };    

    //Filters investments by month
    useEffect(() => {
        if (investments && Array.isArray(investments)) {
            const filtered = investments.filter(investment => {
                const investmentDate = new Date(investment.createdAt);
                const investmentMonth = capitalizeFirstLetter(investmentDate.toLocaleString('default', { month: 'long' }));
                return investmentMonth === capitalizeFirstLetter(selectedMonth);
            });
    
            setFilteredInvestments(filtered);
    
            const totalValue = filtered.reduce((total, investment) => total + investment.amount, 0);
            setTotalInvestmentValue(totalValue);
        }
    }, [investments, selectedMonth]);

    //Filters statements by month
    useEffect(() => {
        if (files && Array.isArray(files)) {
            const filteredFiles = files.filter(file => {
                const fileDate = new Date(file.date);
                const fileMonth = capitalizeFirstLetter(fileDate.toLocaleString('default', { month: 'long' }));
                return fileMonth === capitalizeFirstLetter(selectedMonthStatements);
            });
    
            setFilteredFiles(filteredFiles);
    
            const totalValue = filteredFiles.reduce((total, file) => total - file.amount, 0);
            setTotalStatementValue(totalValue);
        }
    }, [files, selectedMonthStatements]);

    //Filters incomes by month
    useEffect(() => {
        if (incomes && Array.isArray(incomes)) {
            const filteredIncomes = incomes.filter(income => {
                const incomeDate = new Date(income.createdAt);
                const incomeMonth = capitalizeFirstLetter(incomeDate.toLocaleString('default', { month: 'long' }));
                return incomeMonth === capitalizeFirstLetter(selectedMonthStatements);
            });
    
            setFilteredIncomes(filteredIncomes);
    
            const totalValue = filteredIncomes.reduce((total, income) => total + income.amount, 0);
            setTotalIncomeValue(totalValue);
        }
    }, [incomes, selectedMonthStatements]);

    // Filters budgets by month
    useEffect(() => {
        if (budgets && Array.isArray(budgets)) {
            const filteredBudgets = budgets.filter(budget => {
                const budgetDate = new Date(budget.createdAt);
                const budgetMonth = capitalizeFirstLetter(budgetDate.toLocaleString('default', { month: 'long' }));
                return budgetMonth === capitalizeFirstLetter(selectedMonth);
            });
    
            setFilteredBudgets(filteredBudgets);
    
            const totalValue = filteredBudgets.reduce((total, budget) => total + budget.amount, 0);
            setTotalBudgetValue(totalValue);
        }
    }, [budgets, selectedMonth]);

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    const handleMonthChangeStatements = (e) => {
        setSelectedMonthStatements(e.target.value);
    }

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

                            <form className="create">
                                <label>Month:</label>
                                <select value={selectedMonth} onChange={handleMonthChange}>
                                    <option value=""></option>
                                    <option value="January">January</option>
                                    <option value="February">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="August">August</option>
                                    <option value="September">September</option>
                                    <option value="October">October</option>
                                    <option value="November">November</option>
                                    <option value="December">December</option>
                                </select>
                            </form>

                            <BudgetDiffChart selectedMonth = {selectedMonth} />
                            {filteredBudgets && filteredBudgets.length > 0 ? (
                                filteredBudgets.map((budget) => (
                                    <BudgetDetails key={budget._id} budget={budget} />
                                ))
                            ) : (
                                <p>No budgets for the selected month.</p>
                            )}
                        </div>
                        <BudgetForm />
                    </div>
                );
            case 'incomes':
                return (
                    <div className="home">
                        <div className="incomes">
                            <h2>Income</h2>

                            <form className="create">
                                <label>Month:</label>
                                <select value={selectedMonthStatements} onChange={handleMonthChangeStatements}>
                                    <option value=""></option>
                                    <option value="January">January</option>
                                    <option value="February">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="August">August</option>
                                    <option value="September">September</option>
                                    <option value="October">October</option>
                                    <option value="November">November</option>
                                    <option value="December">December</option>
                                </select>
                            </form>

                            <IncomePieChart selectedMonth = {selectedMonthStatements}/>
                            {filteredIncomes && filteredIncomes.length > 0 ? (
                                filteredIncomes.map((income) => (
                                    <IncomeDetails key={income._id} income={income} />
                                ))
                            ) : (
                                <p>No incomes for the selected month.</p>
                            )}
                        </div>
                        <IncomeForm />
                    </div>
                );
            case 'statements':
                return (
                    <div className = "home">
                        <div className="budgets">
                            <h2>Statements</h2>

                            <form className="create">
                                <label>Month:</label>
                                <select value={selectedMonthStatements} onChange={handleMonthChangeStatements}>
                                    <option value=""></option>
                                    <option value="January">January</option>
                                    <option value="February">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="August">August</option>
                                    <option value="September">September</option>
                                    <option value="October">October</option>
                                    <option value="November">November</option>
                                    <option value="December">December</option>
                                </select>
                            </form>
                    
                            {filteredFiles && filteredFiles.length > 0 ? (
                                filteredFiles.map((file) => (
                                    <StatementDetails key={file._id} file={file} />
                                ))
                            ) : (
                                <p>No statements for the selected month.</p>
                            )}
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
                                    <option value="January">January</option>
                                    <option value="February">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="August">August</option>
                                    <option value="September">September</option>
                                    <option value="October">October</option>
                                    <option value="November">November</option>
                                    <option value="December">December</option>
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

    return (
        <div>
            <Sidebar setActiveView={handleSetActiveView} />
            <div style={{ flex: 1, padding: '15px' }}>
                <h1>Account Summary</h1>
                <p>Your income is currently ${totalIncomeValue} and you spent ${totalStatementValue.toFixed(2)} in {selectedMonthStatements}.</p>
                <p>You saved ${(totalIncomeValue - totalStatementValue).toFixed(2)} in {selectedMonthStatements}.</p>
                <p>Your budget is ${totalBudgetValue} and you plan to spend ${totalInvestmentValue} in {selectedMonth}.</p>
                <p>You plan to save ${totalBudgetValue - totalInvestmentValue} in {selectedMonth}.</p>
            </div>
            {renderView()}
            {renderViewInvestment()}
        </div>
    );
};

export default Home;