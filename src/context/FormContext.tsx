
import React, { createContext, useContext, useState } from "react";

export type FormData = {
  title: string;
  region: string;
  donor: string;
  problem: string;
  objectives: string;
  beneficiaries: string;
};

const initialData: FormData = {
  title: "",
  region: "",
  donor: "",
  problem: "",
  objectives: "",
  beneficiaries: "",
};

type Ctx = {
  data: FormData;
  set<K extends keyof FormData>(key: K, value: FormData[K]): void;
};

const FormContext = createContext<Ctx | null>(null);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<FormData>(initialData);
  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }
  return <FormContext.Provider value={{ data, set }}>{children}</FormContext.Provider>;
}

export function useForm() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useForm must be used inside <FormProvider>");
  return ctx;
}
