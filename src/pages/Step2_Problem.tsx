import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";
import AppShell from "../ui/AppShell";
import LiveOutline from "../ui/LiveOutline";

export default function Step2_Problem() {
  const nav = useNavigate();
  const { data, set } = useForm();

  return (
    <AppShell
      title="Concept Note Coach"
      subtitle="Clean, donor-ready structure. Powered by your inputs."
      step={2}
      total={5}
      outline={<LiveOutline />}
    >
      <h2 className="section-title">Step 2 of 5 — Problem Analysis</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <label className="label">Problem Statement</label>
        <textarea
          className="input"
          rows={6}
          value={data.problem ?? ""}
          onChange={(e) => set("problem", e.target.value)}
          style={{ margin: "6px 0 18px" }}
          placeholder="Describe the core problem your project addresses…"
        />

        <label className="label">Root Causes</label>
        <textarea
          className="input"
          rows={4}
          value={data.rootCauses ?? ""}
          onChange={(e) => set("rootCauses", e.target.value)}
          style={{ margin: "6px 0 18px" }}
          placeholder="Key causes, barriers, constraints…"
        />

        <label className="label">Evidence</label>
        <textarea
          className="input"
          rows={4}
          value={data.evidence ?? ""}
          onChange={(e) => set("evidence", e.target.value)}
          style={{ margin: "6px 0 24px" }}
          placeholder="Data, studies, reports that support the problem…"
        />

        <div style={{position:'sticky', bottom:-28, background:'linear-gradient(180deg, transparent 0%, rgba(2,6,23,.85) 40%)', paddingTop:16, marginTop:24}}>
          <div style={{display:'flex', justifyContent:'space-between', gap:12}}>
            <button type="button" className="btn btn-ghost" onClick={() => nav(-1)}>
              ← Back
            </button>
            <button type="button" className="btn btn-primary" onClick={() => nav("/objectives")}>
              Next: Objectives →
            </button>
          </div>
        </div>
      </form>
    </AppShell>
  );
}
