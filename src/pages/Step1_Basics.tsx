import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";

export default function Step1_Basics() {
  const nav = useNavigate();
  const { data, set } = useForm();

  return (
    <div style={{ maxWidth: 960, margin: "60px auto", padding: 16 }}>
      <h1>Concept Note Coach</h1>
      <h2>Step 1 of 5 — Project Basics</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <label>Project Title</label>
        <input
          value={data.title ?? ""}
          onChange={(e) => set("title", e.target.value)}
          placeholder="e.g., Pineapple Value Chain Upgrade"
          style={{ width: "100%", margin: "6px 0 18px", height: 36 }}
        />

        <label>Country &amp; Region</label>
        <input
          value={data.countryRegion ?? ""}
          onChange={(e) => set("countryRegion", e.target.value)}
          placeholder="e.g., Rwanda, Kigali Province"
          style={{ width: "100%", margin: "6px 0 18px", height: 36 }}
        />

        <label>Implementing Organization</label>
        <input
          value={data.organization ?? ""}
          onChange={(e) => set("organization", e.target.value)}
          placeholder="e.g., E4Impact Foundation"
          style={{ width: "100%", margin: "6px 0 18px", height: 36 }}
        />

        <label>Budget Range (USD)</label>
        <select
          value={data.budget ?? ""}
          onChange={(e) => set("budget", e.target.value)}
          style={{ width: "100%", margin: "6px 0 18px", height: 36 }}
        >
          <option value="">Select budget range</option>
          <option>$0 - $50,000</option>
          <option>$50,000 - $100,000</option>
          <option>$100,000 - $500,000</option>
          <option>$500,000+</option>
        </select>

        <label>Duration (months)</label>
        <input
          value={data.duration ?? ""}
          onChange={(e) => set("duration", e.target.value)}
          placeholder="e.g., 24"
          style={{ width: "100%", margin: "6px 0 24px", height: 36 }}
        />

        <button type="button" onClick={() => nav("/problem")} style={{ height: 44 }}>
          Next: Problem Analysis →
        </button>
      </form>
    </div>
  );
}
