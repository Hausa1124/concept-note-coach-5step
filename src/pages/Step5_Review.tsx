import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";
import { validateJSON } from "../utils/validation";

export default function Step5_Review() {
  const nav = useNavigate();
  const { data } = useForm();
  const [busy, setBusy] = useState(false);

  async function submit() {
    try {
      setBusy(true);
      
      // MANDATORY: Validate outbound payload
      validateJSON(data, "Outbound payload");
      
      const res = await fetch("/.netlify/functions/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form: data }),
      });
      
      const json = await res.json();
      
      // MANDATORY: Validate inbound response
      validateJSON(json, "Inbound response");
      
      if (json.ok) {
        // If Make returns a structured body under json.data, store it for Final Analysis
        try {
          // Accept either a JSON string or already-parsed object
          const payload = typeof json.data === 'string' ? JSON.parse(json.data) : json.data;
          validateJSON(payload, "Webhook response data");
          sessionStorage.setItem('cnc_result', JSON.stringify(payload));
        } catch {
          // Fall back to using the current form; Final_Analysis.tsx already handles fallback
          sessionStorage.removeItem('cnc_result');
        }

        // navigate to final analysis
        nav('/final-analysis');
      } else {
        const msg = String(json.data ?? "");
        alert(`Submit failed: ${msg.slice(0, 200)}`);
      }
    } catch (e: any) {
      alert(`Network error: ${e?.message ?? e}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="app-layout">
      <aside className="live-outline">
        <h1>Concept Note Coach</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
          Clean, donor-ready structure. Powered by your inputs.
        </p>

        <div className="outline-section">
          <h4>Project Basics</h4>
          <div className="outline-item">Title: {data.title || "— not filled —"}</div>
          <div className="outline-item">Region: {data.countryRegion || "— not filled —"}</div>
          <div className="outline-item">Organization: {data.organization || "— not filled —"}</div>
          <div className="outline-item">Budget: {data.budget || "— not filled —"}</div>
          <div className="outline-item">Duration: {data.duration || "— not filled —"}</div>
          <div className="outline-item">Sector: {data.sector === 'Other' ? data.sectorOther : data.sector || "— not filled —"}</div>
          <div className="outline-item">Donor: {data.donorChoice === 'Other' ? data.donorOther : data.donorChoice || "— not filled —"}</div>
        </div>

        <div className="outline-section">
          <h4>Problem Analysis</h4>
          <div className="outline-item">Problem: {data.problem || "— not filled —"}</div>
          <div className="outline-item">Causes: {data.causes || "— not filled —"}</div>
          <div className="outline-item">Evidence: {data.evidence || "— not filled —"}</div>
        </div>

        <div className="outline-section">
          <h4>Objectives & Outcomes</h4>
          <div className="outline-item">
            Objectives: {data.objectives.length > 0 ? `${data.objectives.length} defined` : "— not filled —"}
          </div>
        </div>

        <div className="outline-section">
          <h4>Beneficiaries</h4>
          <div className="outline-item">Target Groups: {data.beneficiaries.targetGroups || "— not filled —"}</div>
          <div className="outline-item">Direct: {data.beneficiaries.direct || "— not filled —"}</div>
          <div className="outline-item">Indirect: {data.beneficiaries.indirect || "— not filled —"}</div>
        </div>
      </aside>

      <main className="step-content">
        <div className="card">
          <h2>Step 5 of 5 — Review & Submit</h2>

          <div style={{ marginBottom: '24px' }}>
            <h3>Project Basics</h3>
            <div className="review-section">
              <div><strong>Title:</strong> {data.title || "—"}</div>
              <div><strong>Country & Region:</strong> {data.countryRegion || "—"}</div>
              <div><strong>Organization:</strong> {data.organization || "—"}</div>
              <div><strong>Budget:</strong> {data.budget || "—"}</div>
              <div><strong>Duration:</strong> {data.duration || "—"}</div>
              <div><strong>Sector:</strong> {data.sector === 'Other' ? data.sectorOther : data.sector || "—"}</div>
              <div><strong>Donor:</strong> {data.donorChoice === 'Other' ? data.donorOther : data.donorChoice || "—"}</div>
            </div>
          </div>

          {data.problem && (
            <div style={{ marginBottom: '24px' }}>
              <h3>Problem Analysis</h3>
              <div className="review-section">
                <div><strong>Problem:</strong></div>
                <p style={{ whiteSpace: "pre-wrap", marginLeft: '16px' }}>{data.problem}</p>
                {data.causes && (
                  <>
                    <div><strong>Causes:</strong></div>
                    <p style={{ whiteSpace: "pre-wrap", marginLeft: '16px' }}>{data.causes}</p>
                  </>
                )}
                {data.evidence && (
                  <>
                    <div><strong>Evidence:</strong></div>
                    <p style={{ whiteSpace: "pre-wrap", marginLeft: '16px' }}>{data.evidence}</p>
                  </>
                )}
              </div>
            </div>
          )}

          {data.objectives.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h3>Objectives & Outcomes</h3>
              <div className="review-section">
                {data.objectives.map((obj, index) => (
                  <div key={index} style={{ marginBottom: '8px' }}>
                    <strong>{obj.type}:</strong> {obj.text}
                  </div>
                ))}
              </div>
            </div>
          )}

          {(data.beneficiaries.targetGroups || data.beneficiaries.direct || data.beneficiaries.indirect) && (
            <div style={{ marginBottom: '24px' }}>
              <h3>Beneficiaries</h3>
              <div className="review-section">
                {data.beneficiaries.targetGroups && (
                  <>
                    <div><strong>Target Groups:</strong></div>
                    <p style={{ whiteSpace: "pre-wrap", marginLeft: '16px' }}>{data.beneficiaries.targetGroups}</p>
                  </>
                )}
                {data.beneficiaries.direct && (
                  <div><strong>Direct Beneficiaries:</strong> {data.beneficiaries.direct}</div>
                )}
                {data.beneficiaries.indirect && (
                  <div><strong>Indirect Beneficiaries:</strong> {data.beneficiaries.indirect}</div>
                )}
              </div>
            </div>
          )}

          <div className="nav-buttons">
            <button type="button" className="btn btn-ghost" onClick={() => nav(-1)} disabled={busy}>
              ← Back
            </button>
            <button type="button" className="btn btn-primary" onClick={submit} disabled={busy}>
              {busy ? "Submitting…" : "Submit for AI Analysis"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}