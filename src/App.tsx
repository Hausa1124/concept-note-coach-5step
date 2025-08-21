import { Routes, Route } from "react-router-dom";
import Step1_Basics from "./pages/Step1_Basics";
import Step2_Problem from "./pages/Step2_Problem";
import Step3_Objectives from "./pages/Step3_Objectives";
import Step4_Beneficiaries from "./pages/Step4_Beneficiaries";
import Step5_Review from "./pages/Step5_Review";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Step1_Basics />} />
      <Route path="/problem" element={<Step2_Problem />} />
      <Route path="/objectives" element={<Step3_Objectives />} />
      <Route path="/beneficiaries" element={<Step4_Beneficiaries />} />
      <Route path="/review" element={<Step5_Review />} />
    </Routes>
  );
}
