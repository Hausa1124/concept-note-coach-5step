import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";
import { useState } from "react";

export default function Step5_Review() {
  const nav = useNavigate();
  const { data } = useForm();
  const [busy, setBusy] = useState(false);

  async function submit() {
    setBusy(true);
    try {
      const r = await fetch("/.netlify/functions/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form: data }),
      });
      const json = await r.json();
      const msg = json.ok
        ? "Submitted!"
        : "Submit failed: " + String(json.data).slice(0, 200);
      alert(msg);
    } catch (e: any) {
      alert("Network error: " + (e?.message || e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h2>Step 5 of 5 — Review & Submit</h2>
      <div style={{ display: "grid", gap: 8 }}>
        <div><strong>Title:</strong> {data.title || "(none)"} </div>
        <div><strong>Region:</strong> {data.region || "(none)"} </div>
        <div><strong>Donor:</strong> {data.donor || "(none)"} </div>
        <div><strong>Problem:</strong><br /> {data.problem || "(none)"} </div>
        <div><strong>Objectives & Outputs:</strong><br /> {data.objectives || "(none)"} </div>
        <div><strong>Beneficiaries:</strong><br /> {data.beneficiaries || "(none)"} </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <button onClick={() => nav(-1)}>Previous</button>
        <button onClick={submit} disabled={busy}>
          {busy ? "Submitting…" : "Submit to Make"}
        </button>
      </div>
    </div>
  );
}
