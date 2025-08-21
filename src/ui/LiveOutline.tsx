import React from "react";
import { useForm } from "../context/FormContext";

const F = (v?: string) => (v && v.trim() ? v : "— not filled —");

export default function LivePreview() {
  const { data } = useForm();

  return (
    <aside style={{ padding: "16px", borderRight: "1px solid #e5e7eb" }}>
      <h2 style={{ margin: 0 }}>Concept Note Coach</h2>
      <p>Clean, donor-ready structure. Powered by your inputs.</p>

      <h3 style={{ marginTop: 24 }}>Progress</h3>
      <p>Step 1 of 5</p>

      <h3>Project Basics</h3>
      <div>Title: {F(data.title)}</div>
      <div>Region: {F(data.countryRegion)}</div>
      <div>Org: {F(data.organization)}</div>
      <div>Budget: {F(data.budget)}</div>
      <div>Duration: {F(data.duration)}</div>

      <h3 style={{ marginTop: 24 }}>Problem Analysis</h3>
      <div>Problem: {F(data.problem)}</div>
      <div>Causes: {F(data.causes)}</div>
      <div>Evidence: {F(data.evidence)}</div>

      <h3 style={{ marginTop: 24 }}>Summary</h3>
      <div>Will be generated on submit.</div>
    </aside>
  );
}
