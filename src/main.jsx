import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './lib/redux/store'
import HomePage from './pages/home/home.page.jsx'
import DashboardPage from './pages/dashboard/dashboard.page.jsx'
import RootLayout from './layouts/rootLayout.jsx'
import MainLayout from './layouts/main.layout.jsx'
import DashboardLayout from './layouts/dashboard.layout.jsx'
import { ClerkProvider } from '@clerk/react-router'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <Routes>
              <Route element={<RootLayout />}>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<HomePage />} />
                </Route>
                <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
              </Route>
              </Route>
            </Routes>
          </ClerkProvider>
        </BrowserRouter>
      </Provider>
    </StrictMode>
);

