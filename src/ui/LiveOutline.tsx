import React from 'react';
import { useForm } from '../context/FormContext';

const F = (v?: string) => (v && v.trim() ? v : "— not filled —");

export default function LiveOutline() {
  const { data } = useForm();

  return (
    <div>
      <h1>Concept Note Coach</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
        Clean, donor-ready structure. Powered by your inputs.
      </p>

      <div className="outline-section">
        <h4>Project Basics</h4>
        <div className="outline-item">Title: {F(data.title)}</div>
        <div className="outline-item">Region: {F(data.countryRegion)}</div>
        <div className="outline-item">Organization: {F(data.organization)}</div>
        <div className="outline-item">Budget: {F(data.budget)}</div>
        <div className="outline-item">Duration: {F(data.duration)}</div>
        <div className="outline-item">Sector: {F(data.sector === 'Other' ? data.sectorOther : data.sector)}</div>
        <div className="outline-item">Donor: {F(data.donorChoice === 'Other' ? data.donorOther : data.donorChoice)}</div>
      </div>

      <div className="outline-section">
        <h4>Problem Analysis</h4>
        <div className="outline-item">Problem: {F(data.problem)}</div>
        <div className="outline-item">Causes: {F(data.causes)}</div>
        <div className="outline-item">Evidence: {F(data.evidence)}</div>
      </div>

      <div className="outline-section">
        <h4>Objectives & Outcomes</h4>
        <div className="outline-item">
          Objectives: {data.objectives.length > 0 ? `${data.objectives.length} defined` : "— not filled —"}
        </div>
      </div>

      <div className="outline-section">
        <h4>Beneficiaries</h4>
        <div className="outline-item">Target Groups: {F(data.beneficiaries.targetGroups)}</div>
        <div className="outline-item">Direct: {F(data.beneficiaries.direct)}</div>
        <div className="outline-item">Indirect: {F(data.beneficiaries.indirect)}</div>
      </div>

      <div className="outline-section">
        <h4>Summary</h4>
        <div className="outline-item">Draft: {F(data.summaryDraft)}</div>
        <div className="outline-item">Final: {F(data.finalAnalysis)}</div>
      </div>
    </div>
  );
}