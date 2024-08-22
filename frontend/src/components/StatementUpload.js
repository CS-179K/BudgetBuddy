// StatementUpload.js
import { useState } from "react";
import { useBanksContext } from "../hooks/useBanksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import './StatementUpload.css';

const StatementUpload = () => {
    const { fileDispatch } = useBanksContext();
    const { user } = useAuthContext();

    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in');
            return;
        }

        if (!selectedFile) {
            setError('Please select a file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('/banks/upload/', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            const json = await response.json();

            if (response.ok) {
                console.log('New File Added', json);
                fileDispatch({ type: 'CREATE_FILE', payload: json });
                setError(null);
            } else {
                setError(json.error || 'Failed to upload file');
            }
        } catch (err) {
            setError('An error occurred while uploading the file');
        }
    };

    return (
        <form className="upload-form" onSubmit={handleSubmit}>
            <h3>Upload Bank Statement</h3>

            <label>Choose CSV file:</label>
            <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className={error ? 'error' : ''}
            />

            <button>Upload</button>

            {error && <div className="error-message">{error}</div>}
        </form>
    );
};

export default StatementUpload;
