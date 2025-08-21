import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";

export default function Step3_Objectives() {
  const nav = useNavigate();
  const { data, set } = useForm();

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <h2>Step 3 of 5 — Objectives & Outputs</h2>

      <textarea
        style={{ display: "block", width: "100%", minHeight: 180, padding: 8 }}
        value={data.objectives}
        onChange={(e) => set("objectives", e.target.value)}
        placeholder="SMART objectives + expected outputs (bullets ok)."
      />

      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <button onClick={() => nav(-1)}>Previous</button>
        <button onClick={() => nav("/beneficiaries")}>Next</button>
      </div>
    </div>
  );
}
