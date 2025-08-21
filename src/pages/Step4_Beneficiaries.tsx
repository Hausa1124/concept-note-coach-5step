import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";

export default function Step4_Beneficiaries() {
  const nav = useNavigate();
  const { data, set } = useForm();

  return (
    <div style={{ maxWidth: 960, margin: "60px auto", padding: 16 }}>
      <h1>Concept Note Coach</h1>
      <h2>Step 4 of 5 — Beneficiaries</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <label>Target Groups</label>
        <textarea
          rows={4}
          value={data.targetGroups ?? ""}
          onChange={(e) => set("targetGroups", e.target.value)}
          style={{ width: "100%", margin: "6px 0 18px" }}
          placeholder="Who benefits and how…"
        />

        <label>Direct Beneficiaries</label>
        <input
          value={data.directBeneficiaries ?? ""}
          onChange={(e) => set("directBeneficiaries", e.target.value)}
          style={{ width: "100%", margin: "6px 0 18px", height: 36 }}
          placeholder="e.g., 2,500 farmers"
        />

        <label>Indirect Beneficiaries</label>
        <input
          value={data.indirectBeneficiaries ?? ""}
          onChange={(e) => set("indirectBeneficiaries", e.target.value)}
          style={{ width: "100%", margin: "6px 0 24px", height: 36 }}
          placeholder="e.g., 10,000 household members"
        />

        <div style={{ display: "flex", gap: 12 }}>
          <button type="button" onClick={() => nav(-1)} style={{ height: 44 }}>
            ← Back
          </button>
          <button type="button" onClick={() => nav("/review")} style={{ height: 44 }}>
            Next: Review & Submit →
          </button>
        </div>
      </form>
    </div>
  );
}
