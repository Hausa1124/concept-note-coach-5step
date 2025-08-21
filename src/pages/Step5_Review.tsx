import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";

export default function Step5_Review() {
  const nav = useNavigate();
  const { data } = useForm();
  const [busy, setBusy] = useState(false);

  async function submit() {
    try {
      setBusy(true);
      const res = await fetch("/.netlify/functions/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form: data }),
      });
      const json = await res.json();
      if (json.ok) {
        alert("Submitted!");
      } else {
        const msg = String(json.data ?? "");
        alert(`Submit failed: ${msg.slice(0, 200)}`);
      }
    } catch (e: any) {
      alert(`Network error: ${e?.message ?? e}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ maxWidth: 960, margin: "60px auto", padding: 16 }}>
      <h1>Concept Note Coach</h1>
      <h2>Step 5 of 5 — Review & Submit</h2>

      {/* Simple review block */}
      <div style={{ padding: "12px 16px", border: "1px solid #ddd", borderRadius: 8, margin: "0 0 16px" }}>
        <h3 style={{ marginTop: 0 }}>Please review your details</h3>
        <ul>
          <li><strong>Title:</strong> {data.title || "—"}</li>
          <li><strong>Country & Region:</strong> {data.countryRegion || "—"}</li>
          <li><strong>Organization:</strong> {data.organization || "—"}</li>
          <li><strong>Budget:</strong> {data.budget || "—"}</li>
          <li><strong>Duration:</strong> {data.duration || "—"}</li>
        </ul>

        {/* Optional: show more fields if you collected them in earlier steps */}
        {data.problem && (
          <>
            <h4>Problem</h4>
            <p style={{ whiteSpace: "pre-wrap" }}>{data.problem}</p>
          </>
        )}
        {data.overallObjective && (
          <>
            <h4>Overall Objective</h4>
            <p style={{ whiteSpace: "pre-wrap" }}>{data.overallObjective}</p>
          </>
        )}
        {/* Add more preview items as you like */}
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <button type="button" onClick={() => nav(-1)} disabled={busy} style={{ height: 44 }}>
          ← Back
        </button>
        <button type="button" onClick={submit} disabled={busy} style={{ height: 44 }}>
          {busy ? "Submitting…" : "Submit"}
        </button>
      </div>
    </div>
  );
}
