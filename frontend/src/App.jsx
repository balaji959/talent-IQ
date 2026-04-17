import React from 'react';
// CHANGE THESE:
import { useUser } from '@clerk/clerk-react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Import your pages
import HomePage from './pages/homepage';

import ProblemPage from './pages/problemPage'; 
import { Toaster } from 'react-hot-toast';
import DashboardPage from './pages/dashboardPaje';
function App() {
  const { isSignedIn, isLoaded } = useUser();

  // Prevents redirecting before Clerk knows if you're logged in
  if (!isLoaded) return null;

  return (
    <>
    <Routes>
      {/* Root Route: This fixes the blank page on localhost:5173 */}
      <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={isSignedIn ? <DashboardPage /> : <Navigate to="/" />} />

      
      
      {/* Protected Route */}
      <Route 
        path="/problem" 
        element={isSignedIn ? <ProblemPage /> : <Navigate to="/" />} 
      />

      {/* Catch-all 404 */}
      <Route path="*" element={<h1>404: Page Not Found</h1>} />
    </Routes>
<Toaster/>

</>




  );
}

export default App;