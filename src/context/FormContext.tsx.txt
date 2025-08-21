import React, { createContext, useContext, useState } from "react";

// Rename away from DOM FormData to avoid collisions
export type CoachForm = {
  title: string;
  countryRegion: string;
  organization: string;
  budget: string;
  duration: string;

  // other steps can add more; the index keeps TypeScript happy for any extra keys
  [key: string]: any;
};

type FormContextType = {
  data: CoachForm;
  setValue: <K extends keyof CoachForm>(key: K, value: CoachForm[K]) => void;
  reset: () => void;
};

const defaultData: CoachForm = {
  title: "",
  countryRegion: "",
  organization: "",
  budget: "",
  duration: "",
};

const FormContext = createContext<FormContextType>({
  data: defaultData,
  // no-ops for initial context default
  setValue: () => {},
  reset: () => {},
});

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CoachForm>(defaultData);

  const setValue = (key: keyof CoachForm, value: CoachForm[keyof CoachForm]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const reset = () => setData(defaultData);

  return (
    <FormContext.Provider value={{ data, setValue, reset }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
