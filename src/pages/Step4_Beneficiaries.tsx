import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";
import { polishText } from "../utils/polishText";

export default function Step4_Beneficiaries() {
  const nav = useNavigate();
  const { data, set } = useForm();
  const [polishing, setPolishing] = useState<string | null>(null);

  const handleBlurWithPolish = async (field: keyof typeof data.beneficiaries, value: string) => {
    if (!value.trim() || value.length < 6) return;
    
    setPolishing(field);
    try {
      const polished = await polishText(value);
      if (polished !== value) {
        set("beneficiaries", { ...data.beneficiaries, [field]: polished });
      }
    } catch (error) {
      console.error('Polish failed:', error);
    } finally {
      setPolishing(null);
    }
  };

  return (
    <div className="card">
      <h2>Step 4 of 5 — Beneficiaries</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>Target Groups</label>
          <textarea
            rows={4}
            value={data.beneficiaries.targetGroups}
            onChange={(e) => set("beneficiaries", { ...data.beneficiaries, targetGroups: e.target.value })}
            onBlur={(e) => handleBlurWithPolish("targetGroups", e.target.value)}
            placeholder="Who benefits and how…"
            disabled={polishing === 'targetGroups'}
          />
          {polishing === 'targetGroups' && (
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              ✨ Polishing grammar...
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Direct Beneficiaries</label>
          <input
            value={data.beneficiaries.direct}
            onChange={(e) => set("beneficiaries", { ...data.beneficiaries, direct: e.target.value })}
            placeholder="e.g., 2,500 farmers"
          />
        </div>

        <div className="form-group">
          <label>Indirect Beneficiaries</label>
          <input
            value={data.beneficiaries.indirect}
            onChange={(e) => set("beneficiaries", { ...data.beneficiaries, indirect: e.target.value })}
            placeholder="e.g., 10,000 household members"
          />
        </div>

        <div className="nav-buttons">
          <button type="button" className="btn btn-ghost" onClick={() => nav(-1)}>
            ← Back
          </button>
          <button type="button" className="btn btn-primary" onClick={() => nav("/review")}>
            Next: Review & Submit →
          </button>
        </div>
      </form>
    </div>
  );
}