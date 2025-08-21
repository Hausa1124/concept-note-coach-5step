import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";

export default function Step2_Problem() {
  const nav = useNavigate();
  const { data, set } = useForm();

  return (
    <div style={{ maxWidth: 960, margin: "60px auto", padding: 16 }}>
      <h1>Concept Note Coach</h1>
      <h2>Step 2 of 5 — Problem Analysis</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <label>Problem Statement</label>
        <textarea
          rows={6}
          value={data.problem ?? ""}
          onChange={(e) => set("problem", e.target.value)}
          style={{ width: "100%", margin: "6px 0 18px" }}
          placeholder="Describe the core problem your project addresses…"
        />

        <label>Root Causes</label>
        <textarea
          rows={4}
          value={data.rootCauses ?? ""}
          onChange={(e) => set("rootCauses", e.target.value)}
          style={{ width: "100%", margin: "6px 0 18px" }}
          placeholder="Key causes, barriers, constraints…"
        />

        <label>Evidence</label>
        <textarea
          rows={4}
          value={data.evidence ?? ""}
          onChange={(e) => set("evidence", e.target.value)}
          style={{ width: "100%", margin: "6px 0 24px" }}
          placeholder="Data, studies, reports that support the problem…"
        />

        <div style={{ display: "flex", gap: 12 }}>
          <button type="button" onClick={() => nav(-1)} style={{ height: 44 }}>
            ← Back
          </button>
          <button type="button" onClick={() => nav("/objectives")} style={{ height: 44 }}>
            Next: Objectives →
          </button>
        </div>
      </form>
    </div>
  );
}
