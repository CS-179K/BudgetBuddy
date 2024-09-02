import { useState } from "react";
import { useInvestmentsContext } from "../hooks/useInvestmentsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import './InvestmentForm.css';

const InvestmentForm = () => {
    const { dispatch } = useInvestmentsContext();
    const { user } = useAuthContext();

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [investmentType, setInvestmentType] = useState('');
    const [customInvestmentType, setCustomInvestmentType] = useState('');
    const [investmentDescription, setDescription] = useState('');
    const [isRecurring, setIsRecurring] = useState(false);
    const [recurrenceFrequency, setRecurrenceFrequency] = useState('');
    const [startDate, setStartDate] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in');
            return;
        }

        // Create the investment object with the necessary fields
        let investment = {
            title,
            amount,
            investmentType: investmentType === 'other' ? customInvestmentType : investmentType,
            investmentDescription,
            isRecurring,
        };

        // Only include recurrenceFrequency and startDate if isRecurring is true
        if (isRecurring) {
            if (!recurrenceFrequency) {
                setError('Recurrence frequency is required for recurring payments.');
                setEmptyFields(['recurrenceFrequency']);
                return;
            }

            if (!startDate) {
                setError('Start date is required for recurring payments.');
                setEmptyFields(['startDate']);
                return;
            }

            investment.recurrenceFrequency = recurrenceFrequency;
            investment.startDate = startDate;
        }

        const response = await fetch('/api/investments', {
            method: 'POST',
            body: JSON.stringify(investment),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields || []);
        } else {
            setTitle('');
            setAmount('');
            setInvestmentType('');
            setCustomInvestmentType('');
            setDescription('');
            setIsRecurring(false);
            setRecurrenceFrequency('');
            setStartDate('');
            setError(null);
            setEmptyFields([]);
            console.log('New Investment Added', json);
            dispatch({ type: 'CREATE_INVESTMENT', payload: json });
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Investment</h3>

            <label>Investment Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Amount in $:</label>
            <input
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                min="0"
                className={emptyFields.includes('amount') ? 'error' : ''}
            />

            <label>Type:</label>
            <select
                onChange={(e) => setInvestmentType(e.target.value)}
                value={investmentType}
                className={emptyFields.includes('investmentType') ? 'error' : ''}
            >
                <option value=""></option>
                <option value="gas">Gas</option>
                <option value="groceries">Groceries</option>
                <option value="subscriptions">Subscriptions</option>
                <option value="other">Other</option>
            </select>

            {investmentType === 'other' && (
                <>
                    <label>Custom Investment Type:</label>
                    <input
                        type="text"
                        onChange={(e) => setCustomInvestmentType(e.target.value)}
                        value={customInvestmentType}
                        className={emptyFields.includes('customInvestmentType') ? 'error' : ''}
                    />
                </>
            )}

            <label>Is this a recurring payment?</label>
            <input
                style = {{width: '30px', height: '30px'}}
                type="checkbox"
                onChange={(e) => setIsRecurring(e.target.checked)}
                checked={isRecurring}
            />

            {isRecurring && (
                <>
                    <label>Recurrence Frequency:</label>
                    <select
                        onChange={(e) => setRecurrenceFrequency(e.target.value)}
                        value={recurrenceFrequency}
                        className={emptyFields.includes('recurrenceFrequency') ? 'error' : ''}
                    >
                        <option value=""></option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>

                    <label>Start Date:</label>
                    <input
                        type="date"
                        onChange={(e) => setStartDate(e.target.value)}
                        value={startDate}
                        className={emptyFields.includes('startDate') ? 'error' : ''}
                    />
                </>
            )}

            <label>Investment Description:</label>
            <textarea
                type = "text"
                onChange={(e) => setDescription(e.target.value)}
                value={investmentDescription}
                className={emptyFields.includes('investmentDescription') ? 'error' : 'description'}
            />

            <button>Add Investment</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default InvestmentForm;
