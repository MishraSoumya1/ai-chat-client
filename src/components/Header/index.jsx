import './Header.css';
import React, { useState } from 'react';

const Header = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== 'application/json') {
      setUploadStatus('❌ Please upload a valid JSON file.');
      return;
    }

    setIsLoading(true);
    setUploadStatus('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:8000/ingest', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer mysecrettoken'
        },
        body: formData
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || 'Upload failed');
      }

      const result = await res.json();
      setUploadStatus(`✅ Uploaded ${result.count} incident(s) successfully.`);
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadStatus(`❌ ${error.message}`);
    } finally {
      setIsLoading(false);
      e.target.value = ''; // reset file input
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <span className="logo">🤖</span>
        <span className="app-name">AIChat</span>
      </div>
      <div className="header-right">
        <label className="upload-label">
          {isLoading ? (
            <span className="loader" />
          ) : (
            <>
              📁 Upload Incidents JSON
              <input
                type="file"
                accept=".json"
                onChange={handleUpload}
                className="file-input"
              />
            </>
          )}
        </label>
        {uploadStatus && <span className="upload-status">{uploadStatus}</span>}
      </div>
    </header>
  );
};

export default Header;
