import { useInvestmentsContext } from '../hooks/useInvestmentsContext';
import { useAuthContext } from '../hooks/useAuthContext';

// Date FNS Library
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const InvestmentDetails = ({ investment }) => {
    const { dispatch } = useInvestmentsContext();
    const { user } = useAuthContext();

    const handleClick = async () => {
        if (!user) {
            return;
        }

        const response = await fetch('/api/investments/' + investment._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_INVESTMENT', payload: json });
        }
    };

    return (
        <div className="investment-details">
            <h4>{investment.title}</h4>
            <p><strong>Amount in $:</strong> {investment.amount}</p>
            <p><strong>Type:</strong> {investment.investmentType}</p>
            <p><strong>Description:</strong> {investment.investmentDescription}</p>
            
            {investment.isRecurring && (
                <>
                    <p><strong>Recurring:</strong> Yes</p>
                    <p><strong>Frequency:</strong> {investment.recurrenceFrequency}</p>
                    <p><strong>Start Date:</strong> {new Date(investment.startDate).toLocaleDateString()}</p>
                </>
            )}
            
            <p>{formatDistanceToNow(new Date(investment.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    );
};

export default InvestmentDetails;
