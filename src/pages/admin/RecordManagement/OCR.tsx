import React, { useState } from 'react';

function PDSUploader() {
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        id: '',
        dob: '',
        address: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            setError('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        try {
            const res = await fetch('http://localhost:8000/api/ocr-process-file', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                throw new Error('Failed to process file');
            }

            const data = await res.json();
            setFormData({
                name: data.parsed_data.name || '',
                id: data.parsed_data.id || '',
                dob: data.parsed_data.dob || '',
                address: data.parsed_data.address || ''
            });
            setError('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleUpload}>
                <input type="file" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf" />
                <button type="submit" disabled={loading}>Upload</button>
            </form>

            {error && <p>{error}</p>}

            {loading && <p>Processing...</p>}

            <h3>Parsed Data:</h3>
            <div>
                <label>Name:</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div>
                <label>ID:</label>
                <input type="text" value={formData.id} onChange={(e) => setFormData({ ...formData, id: e.target.value })} />
            </div>
            <div>
                <label>Date of Birth:</label>
                <input type="text" value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} />
            </div>
            <div>
                <label>Address:</label>
                <input type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
            </div>
        </div>
    );
}

export default PDSUploader;
