import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../context/FormContext';

export default function Step1_Basics() {
  const nav = useNavigate();
  const { data, set } = useForm();

  const canContinue = data.sector && data.donorChoice;

  const handleNext = () => {
    if (canContinue) {
      nav('/problem');
    }
  };

  return (
    <div className="card">
      <h2>Step 1 of 5 — Project Basics</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>Project Title</label>
          <input
            value={data.title}
            onChange={(e) => set('title', e.target.value)}
            placeholder="e.g., Pineapple Value Chain Upgrade"
          />
        </div>

        <div className="form-group">
          <label>Country & Region</label>
          <input
            value={data.countryRegion}
            onChange={(e) => set('countryRegion', e.target.value)}
            placeholder="e.g., Rwanda, Kigali Province"
          />
        </div>

        <div className="form-group">
          <label>Implementing Organization</label>
          <input
            value={data.organization}
            onChange={(e) => set('organization', e.target.value)}
            placeholder="e.g., E4Impact Foundation"
          />
        </div>

        <div className="form-group">
          <label>Budget Range (USD)</label>
          <input
            value={data.budget}
            onChange={(e) => set('budget', e.target.value)}
            placeholder="e.g., $100,000 - $500,000"
          />
        </div>

        <div className="form-group">
          <label>Duration (months)</label>
          <input
            value={data.duration}
            onChange={(e) => set('duration', e.target.value)}
            placeholder="e.g., 24"
          />
        </div>

        <div className="form-group">
          <label>Sector *</label>
          <select
            value={data.sector}
            onChange={(e) => set('sector', e.target.value as any)}
            required
          >
            <option value="">Select sector</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="WASH">WASH</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Economic Development">Economic Development</option>
            <option value="Other">Other</option>
          </select>
          {data.sector === 'Other' && (
            <input
              value={data.sectorOther || ''}
              onChange={(e) => set('sectorOther', e.target.value)}
              placeholder="Specify other sector"
              style={{ marginTop: '8px' }}
            />
          )}
        </div>

        <div className="form-group">
          <label>Target Donor *</label>
          <select
            value={data.donorChoice}
            onChange={(e) => set('donorChoice', e.target.value as any)}
            required
          >
            <option value="">Select donor</option>
            <option value="EU">EU</option>
            <option value="USAID">USAID</option>
            <option value="FAO">FAO</option>
            <option value="WHO">WHO</option>
            <option value="World Bank">World Bank</option>
            <option value="Other">Other</option>
          </select>
          {data.donorChoice === 'Other' && (
            <input
              value={data.donorOther || ''}
              onChange={(e) => set('donorOther', e.target.value)}
              placeholder="Specify other donor"
              style={{ marginTop: '8px' }}
            />
          )}
        </div>

        <div className="nav-buttons">
          <div></div>
          <button 
            type="button" 
            className={`btn ${canContinue ? 'btn-primary' : 'btn-secondary'}`}
            onClick={handleNext}
            disabled={!canContinue}
          >
            Next: Problem Analysis →
          </button>
        </div>
      </form>
    </div>
  );
}