import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";
import AppShell from "../ui/AppShell";
import LiveOutline from "../ui/LiveOutline";

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
        // If Make returns a structured body under json.data, store it for Results
        try {
          // Accept either a JSON string or already-parsed object
          const payload = typeof json.data === 'string' ? JSON.parse(json.data) : json.data;
          sessionStorage.setItem('cnc_result', JSON.stringify(payload));
        } catch {
          // Fall back to using the current form; Results.tsx already handles fallback
          sessionStorage.removeItem('cnc_result');
        }

        // navigate to results
        window.location.href = '/results';
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
    <AppShell
      title="Concept Note Coach"
      subtitle="Clean, donor-ready structure. Powered by your inputs."
      step={5}
      total={5}
      outline={<LiveOutline />}
    >
      <h2 className="section-title">Step 5 of 5 — Review & Submit</h2>

      {/* Simple review block */}
      <div className="card" style={{ padding: "16px 20px", margin: "0 0 24px" }}>
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

      <div style={{position:'sticky', bottom:-28, background:'linear-gradient(180deg, transparent 0%, rgba(2,6,23,.85) 40%)', paddingTop:16, marginTop:24}}>
        <div style={{display:'flex', justifyContent:'space-between', gap:12}}>
          <button type="button" className="btn btn-ghost" onClick={() => nav(-1)} disabled={busy}>
            ← Back
          </button>
          <button type="button" className="btn btn-primary" onClick={submit} disabled={busy}>
            {busy ? "Submitting…" : "Submit"}
          </button>
        </div>
      </div>
    </AppShell>
  );
}
