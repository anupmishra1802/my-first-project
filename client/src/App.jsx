import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import ResumeForm from "./pages/ResumeForm";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import Templates from "./pages/Templates";
import ResumePreview from "./pages/ResumePreview";
import ResumeTemplate from "./pages/ResumeTemplate";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Debug currentUser value
  console.log("🔍 CURRENT USER IN APP.JS:", currentUser);
  console.log("🔍 Boolean value:", !!currentUser);
  console.log("🔍 Type of currentUser:", typeof currentUser);

  useEffect(() => {
    // Redux Persist initialize hone ka wait karein
    const checkAuth = () => {
      console.log("🔄 Checking authentication status...");
      
      // Check if currentUser actually has valid data
      const hasValidUser = currentUser && 
                          typeof currentUser === 'object' && 
                          Object.keys(currentUser).length > 0 &&
                          currentUser.email; // Ya koi specific field check karein
      
      console.log("✅ Has valid user:", hasValidUser);
      setIsAuthenticated(hasValidUser);
      setIsCheckingAuth(false);
    };

    // Thoda delay dein taki Redux Persist properly initialize ho jaye
    const timer = setTimeout(checkAuth, 1500);

    return () => clearTimeout(timer);
  }, [currentUser]);

  // Loading state
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your resume builder...</p>
        </div>
      </div>
    );
  }

  console.log("🎯 Final Auth Status:", isAuthenticated);
  console.log("🎯 Redirecting to:", isAuthenticated ? "/home" : "/login");

  return (
    <Router>
      <Routes>
        {/* Public Routes - agar already logged in hai to home redirect */}
        <Route 
          path="/register" 
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <Register />
          } 
        />
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <Login />
          } 
        />
        
        {/* Protected Routes - agar logged in nahi hai to login redirect */}
        <Route 
          path="/home" 
          element={
            isAuthenticated ? <Home /> : <Navigate to="/login" replace />
          } 
        />
        
        <Route 
          path="/resume-form" 
          element={
            isAuthenticated ? <ResumeForm /> : <Navigate to="/login" replace />
          } 
        />
        
        <Route 
          path="/templates" 
          element={
            isAuthenticated ? <Templates /> : <Navigate to="/login" replace />
          } 
        />
        
        <Route 
          path="/resume/preview/:resumeId" 
          element={
            isAuthenticated ? <ResumePreview /> : <Navigate to="/login" replace />
          } 
        />
        
        <Route 
          path="/resume/:templateId" 
          element={
            isAuthenticated ? <ResumeTemplate /> : <Navigate to="/login" replace />
          } 
        />

        {/* Root path - properly check authentication */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
            <Navigate to="/home" replace /> : 
            <Navigate to="/login" replace />
          } 
        />

        {/* Catch all route */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
              <button 
                onClick={() => window.location.href = isAuthenticated ? '/home' : '/login'}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Go to {isAuthenticated ? 'Home' : 'Login'}
              </button>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;