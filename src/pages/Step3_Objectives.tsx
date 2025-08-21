import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";
import { SECTOR_OBJECTIVES, DONOR_GUIDANCE } from "../data/objectiveMappings";
import { polishText } from "../utils/polishText";

type Objective = {
  type: string;
  text: string;
  example: boolean;
};

export default function Step3_Objectives() {
  const nav = useNavigate();
  const { data, set } = useForm();
  const [polishing, setPolishing] = useState<string | null>(null);

  // Pre-seed objectives based on sector on mount
  useEffect(() => {
    if (data.sector && data.objectives.length === 0) {
      const suggestions = SECTOR_OBJECTIVES[data.sector as keyof typeof SECTOR_OBJECTIVES] || SECTOR_OBJECTIVES.Other;
      set("objectives", [...suggestions]);
    }
  }, [data.sector, data.objectives.length, set]);

  const addObjective = () => {
    const newObjective: Objective = {
      type: "Output",
      text: "",
      example: false,
    };
    set("objectives", [...data.objectives, newObjective]);
  };

  const updateObjective = (index: number, field: keyof Objective, value: string | boolean) => {
    const updated = data.objectives.map((obj, i) => 
      i === index ? { ...obj, [field]: value } : obj
    );
    set("objectives", updated);
  };

  const removeObjective = (index: number) => {
    const filtered = data.objectives.filter((_, i) => i !== index);
    set("objectives", filtered);
  };

  const handleObjectiveBlur = async (index: number, value: string) => {
    if (!value.trim() || value.length < 6) return;
    
    setPolishing(`objective-${index}`);
    try {
      const polished = await polishText(value);
      if (polished !== value) {
        updateObjective(index, 'text', polished);
      }
    } catch (error) {
      console.error('Polish failed:', error);
    } finally {
      setPolishing(null);
    }
  };

  const donorGuidance = data.donorChoice && data.donorChoice !== 'Other' 
    ? DONOR_GUIDANCE[data.donorChoice as keyof typeof DONOR_GUIDANCE]
    : null;

  return (
    <div className="card">
      <h2>Step 3 of 5 — Objectives & Outcomes</h2>

      {donorGuidance && (
        <div style={{ 
          background: 'var(--bg-secondary)', 
          padding: '12px 16px', 
          borderRadius: '8px', 
          marginBottom: '24px',
          fontSize: '0.875rem',
          color: 'var(--text-secondary)'
        }}>
          <strong>{data.donorChoice} Guidance:</strong> {donorGuidance}
        </div>
      )}

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <label style={{ margin: 0 }}>Project Objectives</label>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={addObjective}
              style={{ padding: '8px 16px', fontSize: '0.8125rem' }}
            >
              + Add Objective
            </button>
          </div>

          {data.objectives.map((objective, index) => (
            <div key={index} style={{ 
              border: '1px solid var(--border-light)', 
              borderRadius: '8px', 
              padding: '16px', 
              marginBottom: '12px',
              background: objective.example ? 'var(--bg-secondary)' : 'var(--bg-tertiary)'
            }}>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                <select
                  value={objective.type}
                  onChange={(e) => updateObjective(index, 'type', e.target.value)}
                  style={{ width: '120px' }}
                >
                  <option value="Outcome">Outcome</option>
                  <option value="Output">Output</option>
                  <option value="Impact">Impact</option>
                </select>
                
                {objective.example && (
                  <span style={{ 
                    fontSize: '0.75rem', 
                    color: 'var(--accent-blue)', 
                    alignSelf: 'center',
                    fontWeight: '500'
                  }}>
                    ✨ Suggested
                  </span>
                )}
                
                <button
                  type="button"
                  onClick={() => removeObjective(index)}
                  style={{ 
                    marginLeft: 'auto',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  ✕
                </button>
              </div>
              
              <textarea
                rows={2}
                value={objective.text}
                onChange={(e) => updateObjective(index, 'text', e.target.value)}
                onBlur={(e) => handleObjectiveBlur(index, e.target.value)}
                placeholder="Describe the objective..."
                style={{ marginBottom: 0 }}
                disabled={polishing === `objective-${index}`}
              />
              {polishing === `objective-${index}` && (
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  ✨ Polishing grammar...
                </div>
              )}
            </div>
          ))}

          {data.objectives.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '32px', 
              color: 'var(--text-muted)',
              fontStyle: 'italic'
            }}>
              No objectives yet. Click "Add Objective" to get started.
            </div>
          )}
        </div>

        <div className="nav-buttons">
          <button type="button" className="btn btn-ghost" onClick={() => nav(-1)}>
            ← Back
          </button>
          <button type="button" className="btn btn-primary" onClick={() => nav("/beneficiaries")}>
            Next: Beneficiaries →
          </button>
        </div>
      </form>
    </div>
  );
}