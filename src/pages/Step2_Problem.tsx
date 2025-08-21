import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";
import { polishText } from "../utils/polishText";

export default function Step2_Problem() {
  const nav = useNavigate();
  const { data, set } = useForm();
  const [polishing, setPolishing] = useState<string | null>(null);

  const handleBlurWithPolish = async (field: 'problem' | 'causes' | 'evidence', value: string) => {
    if (!value.trim() || value.length < 6) return;
    
    setPolishing(field);
    try {
      const polished = await polishText(value);
      if (polished !== value) {
        set(field, polished);
      }
    } catch (error) {
      console.error('Polish failed:', error);
    } finally {
      setPolishing(null);
    }
  };

  return (
    <div className="card">
      <h2>Step 2 of 5 — Problem Analysis</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>Problem Statement</label>
          <textarea
            rows={6}
            value={data.problem}
            onChange={(e) => set("problem", e.target.value)}
            onBlur={(e) => handleBlurWithPolish("problem", e.target.value)}
            placeholder="Describe the core problem your project addresses…"
            disabled={polishing === 'problem'}
          />
          {polishing === 'problem' && (
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              ✨ Polishing grammar...
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Root Causes</label>
          <textarea
            rows={4}
            value={data.causes}
            onChange={(e) => set("causes", e.target.value)}
            onBlur={(e) => handleBlurWithPolish("causes", e.target.value)}
            placeholder="Key causes, barriers, constraints…"
            disabled={polishing === 'causes'}
          />
          {polishing === 'causes' && (
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              ✨ Polishing grammar...
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Evidence</label>
          <textarea
            rows={4}
            value={data.evidence}
            onChange={(e) => set("evidence", e.target.value)}
            onBlur={(e) => handleBlurWithPolish("evidence", e.target.value)}
            placeholder="Data, studies, reports that support the problem…"
            disabled={polishing === 'evidence'}
          />
          {polishing === 'evidence' && (
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              ✨ Polishing grammar...
            </div>
          )}
        </div>

        <div className="nav-buttons">
          <button type="button" className="btn btn-ghost" onClick={() => nav(-1)}>
            ← Back
          </button>
          <button type="button" className="btn btn-primary" onClick={() => nav("/objectives")}>
            Next: Objectives →
          </button>
        </div>
      </form>
    </div>
  );
}