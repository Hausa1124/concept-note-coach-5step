import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";
import AppShell from "../ui/AppShell";
import LiveOutline from "../ui/LiveOutline";

export default function Step3_Objectives() {
  const nav = useNavigate();
  const { data, set } = useForm();

  return (
    <AppShell
      title="Concept Note Coach"
      subtitle="Clean, donor-ready structure. Powered by your inputs."
      step={3}
      total={5}
      outline={<LiveOutline />}
    >
      <h2 className="section-title">Step 3 of 5 — Objectives</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <label className="label">Overall Objective</label>
        <textarea
          className="input"
          rows={4}
          value={data.overallObjective ?? ""}
          onChange={(e) => set("overallObjective", e.target.value)}
          style={{ margin: "6px 0 18px" }}
          placeholder="High-level change your project contributes to…"
        />

        <label className="label">Specific Objectives</label>
        <textarea
          className="input"
          rows={6}
          value={data.specificObjectives ?? ""}
          onChange={(e) => set("specificObjectives", e.target.value)}
          style={{ margin: "6px 0 24px" }}
          placeholder="Bulleted or numbered list works great…"
        />

        <div style={{position:'sticky', bottom:-28, background:'linear-gradient(180deg, transparent 0%, rgba(2,6,23,.85) 40%)', paddingTop:16, marginTop:24}}>
          <div style={{display:'flex', justifyContent:'space-between', gap:12}}>
            <button type="button" className="btn btn-ghost" onClick={() => nav(-1)}>
              ← Back
            </button>
            <button type="button" className="btn btn-primary" onClick={() => nav("/beneficiaries")}>
              Next: Beneficiaries →
            </button>
          </div>
        </div>
      </form>
    </AppShell>
  );
}
