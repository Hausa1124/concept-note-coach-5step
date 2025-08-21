import React, { createContext, useContext, useState, ReactNode } from "react";

// Reusable options
export const SECTOR_OPTIONS = [
  "Health",
  "Education",
  "WASH",
  "Agriculture",
  "Economic Development",
  "Other",
] as const;

export const DONOR_OPTIONS = [
  "EU",
  "USAID",
  "FAO",
  "WHO",
  "World Bank",
  "Other",
] as const;

type Sector = (typeof SECTOR_OPTIONS)[number] | "";
type Donor  = (typeof DONOR_OPTIONS)[number]  | "";

// Complete form structure
export type CoachForm = {
  // Step 1: Project Basics
  title: string;
  countryRegion: string;
  organization: string;
  budget: string;
  duration: string;
  sector: Sector;
  sectorOther?: string;
  donorChoice: Donor;
  donorOther?: string;

  // Step 2: Problem Analysis
  problem: string;
  causes: string;
  evidence: string;

  // Step 3: Objectives
  objectives: Array<{
    type: string;
    text: string;
    example: boolean;
  }>;

  // Step 4: Beneficiaries
  beneficiaries: {
    targetGroups: string;
    direct: string;
    indirect: string;
  };

  // Step 5: Summary
  summaryDraft: string;
  finalAnalysis: string;

  // Additional fields referenced by components
  rootCauses: string;
  overallObjective: string;
  specificObjectives: string;
  targetGroups: string;
  directBeneficiaries: string;
  indirectBeneficiaries: string;
};

type FormContextType = {
  data: CoachForm;
  setValue: <K extends keyof CoachForm>(key: K, value: CoachForm[K]) => void;
  set: <K extends keyof CoachForm>(key: K, value: CoachForm[K]) => void; // alias
  reset: () => void;
};

const defaultData: CoachForm = {
  }
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
  causes: "",
  evidence: "",
  objectives: [],
  beneficiaries: {
    targetGroups: "",
    direct: "",
    indirect: "",
  },
  summaryDraft: "",
  finalAnalysis: "",
  rootCauses: "",
  overallObjective: "",
  specificObjectives: "",
  targetGroups: "",
  directBeneficiaries: "",
  indirectBeneficiaries: "",
};

export const FormContext = createContext<FormContextType>({
  data: defaultData,
  setValue: () => {},
  set: () => {},
  reset: () => {},
});

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CoachForm>(defaultData);

  const setValue = <K extends keyof CoachForm>(key: K, value: CoachForm[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  // alias to match pages that call `set(...)`
  const set: typeof setValue = (key, value) => setValue(key, value);

  const reset = () => setData({ ...defaultData }); // clone to avoid shared reference

  return (
    <FormContext.Provider value={{ data, setValue, set, reset }}>
      {children}
    </FormContext.Provider>
  );
};

// Named export used by components
export const useForm = () => useContext(FormContext);

}