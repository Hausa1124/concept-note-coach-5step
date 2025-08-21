import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";

export default function Step4_Beneficiaries() {
  const nav = useNavigate();
  const { data, set } = useForm();

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <h2>Step 4 of 5 — Beneficiaries</h2>

      <textarea
        style={{ display: "block", width: "100%", minHeight: 160, padding: 8 }}
        value={data.beneficiaries}
        onChange={(e) => set("beneficiaries", e.target.value)}
        placeholder="Who benefits (direct/indirect), numbers, selection, location."
      />

      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <button onClick={() => nav(-1)}>Previous</button>
        <button onClick={() => nav("/review")}>Next</button>
      </div>
    </div>
  );
}
