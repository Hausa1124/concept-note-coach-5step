import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";
import AppShell from "../ui/AppShell";
import LiveOutline from "../ui/LiveOutline";

export default function Step4_Beneficiaries() {
  const nav = useNavigate();
  const { data, set } = useForm();

  return (
    <AppShell
      title="Concept Note Coach"
      subtitle="Clean, donor-ready structure. Powered by your inputs."
      step={4}
      total={5}
      outline={<LiveOutline />}
    >
      <h2 className="section-title">Step 4 of 5 — Beneficiaries</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <label className="label">Target Groups</label>
        <textarea
          className="input"
          rows={4}
          value={data.targetGroups ?? ""}
          onChange={(e) => set("targetGroups", e.target.value)}
          style={{ margin: "6px 0 18px" }}
          placeholder="Who benefits and how…"
        />

        <label className="label">Direct Beneficiaries</label>
        <input
          className="input"
          value={data.directBeneficiaries ?? ""}
          onChange={(e) => set("directBeneficiaries", e.target.value)}
          style={{ margin: "6px 0 18px" }}
          placeholder="e.g., 2,500 farmers"
        />

        <label className="label">Indirect Beneficiaries</label>
        <input
          className="input"
          value={data.indirectBeneficiaries ?? ""}
          onChange={(e) => set("indirectBeneficiaries", e.target.value)}
          style={{ margin: "6px 0 24px" }}
          placeholder="e.g., 10,000 household members"
        />

        <div style={{position:'sticky', bottom:-28, background:'linear-gradient(180deg, transparent 0%, rgba(2,6,23,.85) 40%)', paddingTop:16, marginTop:24}}>
          <div style={{display:'flex', justifyContent:'space-between', gap:12}}>
            <button type="button" className="btn btn-ghost" onClick={() => nav(-1)}>
              ← Back
            </button>
            <button type="button" className="btn btn-primary" onClick={() => nav("/review")}>
              Next: Review & Submit →
            </button>
          </div>
        </div>
      </form>
    </AppShell>
  );
}
