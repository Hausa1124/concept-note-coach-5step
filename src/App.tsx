
import { Routes, Route, Navigate } from 'react-router-dom'
import { FormProvider } from './context/FormContext'
import Step1 from './pages/Step1_Basics'
import Step2 from './pages/Step2_Problem'
import Step3 from './pages/Step3_Objectives'
import Step4 from './pages/Step4_Beneficiaries'
import Step5 from './pages/Step5_Review'

export default function App() {
  return (
    <FormProvider>
      <Routes>
        <Route path="/" element={<Step1 />} />
        <Route path="/problem" element={<Step2 />} />
        <Route path="/objectives" element={<Step3 />} />
        <Route path="/beneficiaries" element={<Step4 />} />
        <Route path="/review" element={<Step5 />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </FormProvider>
  )
}
