import React, { createContext, useContext, useState } from "react";

// Avoid clash with DOM FormData
export type CoachForm = {
  title: string;
  countryRegion: string;
  organization: string;
  budget: string;
  duration: string;
  [key: string]: any;
};

type FormContextType = {
  data: CoachForm;
  // canonical setter
  setValue: <K extends keyof CoachForm>(key: K, value: CoachForm[K]) => void;
  // alias used by pages (so we don't need to change them)
  set: <K extends keyof CoachForm>(key: K, value: CoachForm[K]) => void;
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
  setValue: () => {},
  set: () => {},
  reset: () => {},
});

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CoachForm>(defaultData);

  const setValue = (key: keyof CoachForm, value: CoachForm[keyof CoachForm]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  // alias to match pages that call `set(...)`
  const set: typeof setValue = (key, value) => setValue(key, value);

  const reset = () => setData(defaultData);

  return (
    <FormContext.Provider value={{ data, setValue, set, reset }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
