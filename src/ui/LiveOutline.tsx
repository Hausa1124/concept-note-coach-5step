import React from 'react';
import { useForm } from '../context/FormContext';

export default function LiveOutline() {
  const { data } = useForm();
  const nf = (v?: string | number) => (v && String(v).trim() ? String(v) : '— not filled —');

  return (
    <div>
      <div className="outline-group">
        <strong>Project Basics</strong>
        <div>Title: {nf(data.title)}</div>
        <div>Region: {nf(data.countryRegion)}</div>
        <div>Org: {nf(data.organization)}</div>
        <div>Budget: {nf(data.budget)}</div>
        <div>Duration: {nf(data.duration)}</div>
      </div>

      <div className="outline-group">
        <strong>Problem Analysis</strong>
        <div>Problem: {nf(data.problem)}</div>
        <div>Causes: {nf(data.rootCauses)}</div>
        <div>Evidence: {nf(data.evidence)}</div>
      </div>

      <div className="outline-group">
        <strong>Objectives & Outcomes</strong>
        <div>Overall: {nf(data.overallObjective)}</div>
        <div>Specific: {nf(data.specificObjectives)}</div>
      </div>

      <div className="outline-group">
        <strong>Beneficiaries</strong>
        <div>Target groups: {nf(data.targetGroups)}</div>
        <div>Direct: {nf(data.directBeneficiaries)}</div>
        <div>Indirect: {nf(data.indirectBeneficiaries)}</div>
      </div>

      <div className="outline-group">
        <strong>Summary</strong>
        <div>Will be generated on submit.</div>
      </div>
    </div>
  );
}