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

// Avoid clash with DOM FormData
export type CoachForm = {
  title: string;
  countryRegion: string;
  organization: string;
  budget: string;
  duration: string;
  sector: Sector;
  sectorOther?: string;
  donorChoice: Donor;
  donorOther?: string;
  // Step 2 fields already referenced in your UI:
  problem?: string;
  causes?: string;
  evidence?: string;
  [key: string]: any;
};

type FormContextType = {
  data: CoachForm;
  setValue: <K extends keyof CoachForm>(key: K, value: CoachForm[K]) => void;
  set: <K extends keyof CoachForm>(key: K, value: CoachForm[K]) => void; // alias
  reset: () => void;
};

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
  causes: "",
  evidence: "",
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

// ✅ Named export used by:  ../ui/LiveOutline  and  ../pages/Step1_Basics
export const useForm = () => useContext(FormContext);

