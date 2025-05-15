import React, { useState } from 'react';
import axios from 'axios';
import './FileEncryptor.css';

const API_BASE_URL = 'http://localhost:5000';

const FileEncryptor = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [encryptionType, setEncryptionType] = useState('AES');
    const [hashType, setHashType] = useState('SHA-256');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setError(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            setError('Please select a file first');
            return;
        }

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('encryption_type', encryptionType);
        formData.append('hash_type', hashType);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/encrypt`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResult(response.data);
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred during encryption');
        } finally {
            setLoading(false);
        }
    };

    const downloadEncryptedFile = () => {
        if (!result) return;

        const element = document.createElement('a');
        const file = new Blob([result.encrypted_data], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${selectedFile.name}.encrypted`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const downloadKeys = () => {
        if (!result?.encryption_info) return;

        const element = document.createElement('a');
        const file = new Blob([JSON.stringify(result.encryption_info, null, 2)], { type: 'application/json' });
        element.href = URL.createObjectURL(file);
        element.download = 'encryption_keys.json';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className="file-encryptor">
            <h2>File Encryption Tool</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Select File:</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".txt,.doc,.docx,.pdf"
                    />
                </div>

                <div className="form-group">
                    <label>Encryption Type:</label>
                    <select
                        value={encryptionType}
                        onChange={(e) => setEncryptionType(e.target.value)}
                    >
                        <option value="AES">AES</option>
                        <option value="RSA">RSA</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Hash Type:</label>
                    <select
                        value={hashType}
                        onChange={(e) => setHashType(e.target.value)}
                    >
                        <option value="SHA-256">SHA-256</option>
                        <option value="SHA-512">SHA-512</option>
                    </select>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Encrypt File'}
                </button>
            </form>

            {error && <div className="error">{error}</div>}

            {result && (
                <div className="result">
                    <h3>Encryption Results</h3>
                    <div className="hash-result">
                        <strong>File Hash ({hashType}):</strong>
                        <code>{result.hash}</code>
                    </div>
                    <div className="actions">
                        <button onClick={downloadEncryptedFile}>
                            Download Encrypted File
                        </button>
                        <button onClick={downloadKeys}>
                            Download Encryption Keys
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileEncryptor; 