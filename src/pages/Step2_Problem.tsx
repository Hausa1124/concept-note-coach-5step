import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";

export default function Step2_Problem() {
  const nav = useNavigate();
  const { data, set } = useForm();

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <h2>Step 2 of 5 — Problem Statement</h2>

      <textarea
        style={{ display: "block", width: "100%", minHeight: 180, padding: 8 }}
        value={data.problem}
        onChange={(e) => set("problem", e.target.value)}
        placeholder="Briefly describe the core problem, evidence, and why it matters now."
      />

      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <button onClick={() => nav(-1)}>Previous</button>
        <button onClick={() => nav("/objectives")}>Next</button>
      </div>
    </div>
  );
}
