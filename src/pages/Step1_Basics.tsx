import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";

export default function Step1_Basics() {
  const nav = useNavigate();
  const { data, set } = useForm();

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <h1>Concept Note Coach</h1>
      <h2>Step 1 of 5 — Project Basics</h2>

      <label style={{ display: "block", marginTop: 12 }}>
        Project Title
        <input
          style={{ display: "block", width: "100%", padding: 8 }}
          value={data.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="e.g., Pineapple Value Chain Upgrade"
        />
      </label>

      <label style={{ display: "block", marginTop: 12 }}>
        Country & Region
        <input
          style={{ display: "block", width: "100%", padding: 8 }}
          value={data.region}
          onChange={(e) => set("region", e.target.value)}
          placeholder="e.g., Rwanda, Kigali Province"
        />
      </label>

      <label style={{ display: "block", marginTop: 12 }}>
        Implementing Organization
        <input
          style={{ display: "block", width: "100%", padding: 8 }}
          value={data.organization}
          onChange={(e) => set("organization", e.target.value)}
          placeholder="e.g., E4Impact Foundation"
        />
      </label>

      <label style={{ display: "block", marginTop: 12 }}>
        Budget Range (USD)
        <select
          style={{ display: "block", width: "100%", padding: 8 }}
          value={data.budget}
          onChange={(e) => set("budget", e.target.value)}
        >
          <option value="">Select budget range</option>
          <option value="under-50k">Under $50,000</option>
          <option value="50k-100k">$50,000 - $100,000</option>
          <option value="100k-500k">$100,000 - $500,000</option>
          <option value="500k-1m">$500,000 - $1M</option>
          <option value="over-1m">Over $1M</option>
        </select>
      </label>

      <label style={{ display: "block", marginTop: 12 }}>
        Duration (months)
        <input
          style={{ display: "block", width: "100%", padding: 8 }}
          type="number"
          value={data.duration}
          onChange={(e) => set("duration", e.target.value)}
          placeholder="e.g., 24"
        />
      </label>

      <button
        style={{ marginTop: 24, padding: "12px 24px", fontSize: 16 }}
        onClick={() => nav("/step2")}
      >
        Next: Problem Analysis →
      </button>
    </div>
  );
}
