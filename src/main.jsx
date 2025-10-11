import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/home.page'
import DashboardPage from './pages/dashboard.page'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
   <Routes>
     <Route path="/" element={<HomePage />} />
    <Route path="/dashboard" element={<DashboardPage />} /> 
   </Routes>
   </BrowserRouter>
  </StrictMode>
);
