import React, { createContext, useContext, useState, ReactNode } from "react";

/** ====== Data shape (UI-only; all strings) ====== */
export interface CoachForm {
  // Step 1 — Basics
  title: string;
  countryRegion: string;
  organization: string;
  budget: string;
  duration: string;

  // NEW: Sector & Donor (with "Other")
  sector: string;          // "Health" | "Education" | "WASH" | "Agriculture" | "Economic Development" | "Other" | ""
  sectorOther?: string;    // when sector === "Other"
  donorChoice: string;     // "EU" | "USAID" | "FAO" | "WHO" | "World Bank" | "Other" | ""
  donorOther?: string;     // when donorChoice === "Other"

  // Step 2 — Problem
  problem: string;
  rootCauses: string;
  evidence: string;
  problemConsequence?: string;

  // Step 3 — Objectives
  overallObjective: string;
  specificObjectives: string;

  // Step 4 — Beneficiaries (and misc that may feed Make)
  targetGroups: string;
  directBeneficiaries: string;
  indirectBeneficiaries: string;

  // Optional fields some flows use
  activities?: string;
  expectedResults?: string;
  timeline?: string;
  budgetNotes?: string;
  partners?: string;
}

/** ====== Defaults ====== */
const defaultData: CoachForm = {
  title: "",
  countryRegion: "",
  organization: "",
  budget: "",
  duration: "",

  sector: "",
  sectorOther: "",
  donorChoice: "",
  donorOther: "",

  problem: "",
  rootCauses: "",
  evidence: "",
  problemConsequence: "",

  overallObjective: "",
  specificObjectives: "",

  targetGroups: "",
  directBeneficiaries: "",
  indirectBeneficiaries: "",

  activities: "",
  expectedResults: "",
  timeline: "",
  budgetNotes: "",
  partners: ""
};

/** ====== Option lists for dropdowns ====== */
export const SECTOR_OPTIONS = [
  "Health",
  "Education",
  "WASH",
  "Agriculture",
  "Economic Development",
  "Other"
] as const;

export const DONOR_OPTIONS = [
  "EU",
  "USAID",
  "FAO",
  "WHO",
  "World Bank",
  "Other"
] as const;

/** ====== Context ====== */
type FormContextValue = {
  form: CoachForm;
  setForm: React.Dispatch<React.SetStateAction<CoachForm>>;
  // alias used by pages (so we don't need to change them)
  set: <K extends keyof CoachForm>(key: K, value: CoachForm[K]) => void;
  reset: () => void;
};

const FormContext = createContext<FormContextValue | null>(null);

export function FormProvider({ children }: { children: ReactNode }) {
  const [form, setForm] = useState<CoachForm>(defaultData);

  const set = <K extends keyof CoachForm>(key: K, value: CoachForm[K]) => {
    setForm(prev => ({ ...prev, [key]: (value ?? "") as CoachForm[K] }));
  };

  const reset = () => setForm(defaultData);

  return (
    <FormContext.Provider value={{ form, setForm, set, reset }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useFormContext must be used within FormProvider");
  return ctx;
}
