import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../context/FormContext';

export default function Final_Analysis() {
  const nav = useNavigate();
  const { data } = useForm();

  // Try to read the final analysis from sessionStorage (set by webhook response)
  let finalAnalysis = '';
  try {
    const stored = sessionStorage.getItem('cnc_result');
    if (stored) {
      const parsed = JSON.parse(stored);
      finalAnalysis = parsed.finalAnalysis || parsed.final_analysis || '';
    }
  } catch {
    // Fallback to form data
    finalAnalysis = data.finalAnalysis;
  }

  const handleDownload = () => {
    // TODO: Implement download functionality
    alert('Download functionality will be implemented later');
  };

  const handleBackToEdit = () => {
    nav('/');
  };

  return (
    <div className="card">
      <h2>Final Analysis — AI-Generated Concept Note</h2>

      {finalAnalysis ? (
        <div>
          <div style={{ 
            background: 'var(--bg-secondary)', 
            padding: '16px', 
            borderRadius: '8px',
            marginBottom: '24px',
            whiteSpace: 'pre-wrap',
            lineHeight: '1.6'
          }}>
            {finalAnalysis}
          </div>

          <div className="nav-buttons">
            <button 
              type="button" 
              className="btn btn-ghost" 
              onClick={handleBackToEdit}
            >
              ← Back to Edit
            </button>
            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={handleDownload}
            >
              Download Document
            </button>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '48px 24px' }}>
          <div style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
            No final analysis available
          </div>
          <button 
            type="button" 
            className="btn btn-primary" 
            onClick={handleBackToEdit}
          >
            Back to Form
          </button>
        </div>
      )}
    </div>
  );
}