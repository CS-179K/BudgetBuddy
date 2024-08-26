import { useBanksContext } from '../hooks/useBanksContext';
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const StatementDetails = ({ file }) => {
    const { fileDispatch } = useBanksContext();
    const { user } = useAuthContext();

    // Function to safely convert strings to Date objects
    const safeDate = (dateStr) => {
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? null : date;
    };

    const handleClick = async () => {
        if (!user) {
            return;
        }

        const response = await fetch('banks/upload/' + file._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
        });

        const json = await response.json();

        if (response.ok) {
            fileDispatch({ type: 'DELETE_FILE', payload: json });
        }
    };

    // Convert file.createdAt and file.date to Date objects
    const createdAtDate = safeDate(file.createdAt);
    const fileDate = safeDate(file.date);

    return (
        <div className="investment-details">
            <h4>{file.title}</h4>
            <p><strong>Amount in $: </strong>{file.amount}</p>
            <p><strong>Date: </strong>{fileDate ? fileDate.toDateString() : 'Invalid date'}</p>
            <p><strong>Description: </strong>{file.description}</p>
            <p>{createdAtDate ? formatDistanceToNow(createdAtDate, { addSuffix: true }) : 'Invalid date'}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    );
};

export default StatementDetails;
