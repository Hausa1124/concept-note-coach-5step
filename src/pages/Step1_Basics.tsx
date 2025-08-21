import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";
import AppShell from "../ui/AppShell";
import LiveOutline from "../ui/LiveOutline";

export default function Step1_Basics() {
  const nav = useNavigate();
  const { data, set } = useForm();

  return (
    <AppShell
      title="Concept Note Coach"
      subtitle="Clean, donor-ready structure. Powered by your inputs."
      step={1}
      total={5}
      outline={<LiveOutline />}
    >
      <h2 className="section-title">Step 1 of 5 — Project Basics</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <label className="label">Project Title</label>
        <input
          className="input"
          value={data.title ?? ""}
          onChange={(e) => set("title", e.target.value)}
          placeholder="e.g., Pineapple Value Chain Upgrade"
          style={{ margin: "6px 0 18px" }}
        />

        <label className="label">Country & Region</label>
        <input
          className="input"
          value={data.countryRegion ?? ""}
          onChange={(e) => set("countryRegion", e.target.value)}
          placeholder="e.g., Rwanda, Kigali Province"
          style={{ margin: "6px 0 18px" }}
        />

        <label className="label">Implementing Organization</label>
        <input
          className="input"
          value={data.organization ?? ""}
          onChange={(e) => set("organization", e.target.value)}
          placeholder="e.g., E4Impact Foundation"
          style={{ margin: "6px 0 18px" }}
        />

        <label className="label">Budget Range (USD)</label>
        <select
          value={data.budget ?? ""}
          onChange={(e) => set("budget", e.target.value)}
          style={{ margin: "6px 0 18px" }}
        >
          <option value="">Select budget range</option>
          <option>$0 - $50,000</option>
          <option>$50,000 - $100,000</option>
          <option>$100,000 - $500,000</option>
          <option>$500,000+</option>
        </select>

        <label className="label">Duration (months)</label>
        <input
          className="input"
          value={data.duration ?? ""}
          onChange={(e) => set("duration", e.target.value)}
          placeholder="e.g., 24"
          style={{ margin: "6px 0 24px" }}
        />

        <div style={{position:'sticky', bottom:-28, background:'linear-gradient(180deg, transparent 0%, rgba(2,6,23,.85) 40%)', paddingTop:16, marginTop:24}}>
          <div style={{display:'flex', justifyContent:'flex-end', gap:12}}>
            <button type="button" className="btn btn-primary" onClick={() => nav("/problem")}>
              Next: Problem Analysis →
            </button>
          </div>
        </div>
      </form>
    </AppShell>
  );
}
