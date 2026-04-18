import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import HomePage from './pages/HomePage';
import ProblemsPage from './pages/ProblemsPage';
import ProblemPage from './pages/ProblemPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;

  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={!isSignedIn ? <HomePage /> : <Navigate to="/dashboard" />} 
        />
        <Route 
          path="/dashboard" 
          element={isSignedIn ? <DashboardPage /> : <Navigate to="/" />} 
        />
        {/* Problem LIST page - /problem */}
        <Route 
          path="/problem" 
          element={isSignedIn ? <ProblemsPage /> : <Navigate to="/" />} 
        />
        {/* Problem EDITOR page - /problem/:id */}
        <Route 
          path="/problem/:id" 
          element={isSignedIn ? <ProblemPage /> : <Navigate to="/" />} 
        />

        {/* Catch-all 404 */}
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;