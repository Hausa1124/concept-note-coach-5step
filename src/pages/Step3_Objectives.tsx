import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";

export default function Step3_Objectives() {
  const nav = useNavigate();
  const { data, set } = useForm();

  return (
    <div style={{ maxWidth: 960, margin: "60px auto", padding: 16 }}>
      <h1>Concept Note Coach</h1>
      <h2>Step 3 of 5 — Objectives</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <label>Overall Objective</label>
        <textarea
          rows={4}
          value={data.overallObjective ?? ""}
          onChange={(e) => set("overallObjective", e.target.value)}
          style={{ width: "100%", margin: "6px 0 18px" }}
          placeholder="High-level change your project contributes to…"
        />

        <label>Specific Objectives</label>
        <textarea
          rows={6}
          value={data.specificObjectives ?? ""}
          onChange={(e) => set("specificObjectives", e.target.value)}
          style={{ width: "100%", margin: "6px 0 24px" }}
          placeholder="Bulleted or numbered list works great…"
        />

        <div style={{ display: "flex", gap: 12 }}>
          <button type="button" onClick={() => nav(-1)} style={{ height: 44 }}>
            ← Back
          </button>
          <button type="button" onClick={() => nav("/beneficiaries")} style={{ height: 44 }}>
            Next: Beneficiaries →
          </button>
        </div>
      </form>
    </div>
  );
}
