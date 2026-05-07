import { Box, Button, Link, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import Education from "../components/Education";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import ExtraDetails from "../components/ExtraDetails";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const ResumeForm = () => {
  const [activeComponent, setActiveComponent] = useState("profile");
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(false);

  // Handling next
  const handleNext = () => {
    if (activeComponent === "profile") {
      setActiveComponent("educationalDetails");
    } else if (activeComponent === "educationalDetails") {
      setActiveComponent("projectsDetails");
    } else if (activeComponent === "projectsDetails") {
      setActiveComponent("experienceDetails");
    } else if (activeComponent === "experienceDetails") {
      setActiveComponent("extraDetails");
    }
  };

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasSeenWelcome");

    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem("hasSeenWelcome", true);
    }
  }, []);

  // Effect to hide the welcome message after 3 seconds
  useEffect(() => {
    let timeout;
    if (showWelcome) {
      timeout = setTimeout(() => {
        setShowWelcome(false);
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [showWelcome]);

  // Handling back
  const handleBack = () => {
    if (activeComponent === "educationalDetails") {
      setActiveComponent("profile");
    } else if (activeComponent === "projectsDetails") {
      setActiveComponent("educationalDetails");
    } else if (activeComponent === "experienceDetails") {
      setActiveComponent("projectsDetails");
    } else if (activeComponent === "extraDetails") {
      setActiveComponent("experienceDetails");
    }
  };

  // FIXED: Review Resume function
  const handleResume = () => {
    // Check if data is saved
    const resumeId = localStorage.getItem('currentResumeId');
    const selectedTemplate = localStorage.getItem('selectedTemplate') || '1';
    
    if (resumeId) {
      // Navigate to resume preview with saved data
      navigate(`/resume/preview/${resumeId}?template=${selectedTemplate}`);
    } else {
      // If no saved data, go to template selection
      navigate('/templates');
      alert("Please save your data first before reviewing resume");
    }
  };

  // NEW: Template Selection function
  const handleTemplateSelect = () => {
    const resumeId = localStorage.getItem('currentResumeId');
    
    if (resumeId) {
      navigate('/templates');
    } else {
      alert("Please save your data first before selecting templates");
    }
  };

  const customStyle = {
    margin: "10px",
    height: "auto",
    width: "80%",
    padding: "20px",
    backgroundColor: "#fff",
  };
  
  const containerStyle = {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
  };

  const getPageNumber = () => {
    switch (activeComponent) {
      case "profile":
        return 1;
      case "educationalDetails":
        return 2;
      case "projectsDetails":
        return 3;
      case "experienceDetails":
        return 4;
      case "extraDetails":
        return 5;
      default:
        return 1;
    }
  };

  return (
    <Box style={containerStyle}>
      <Paper elevation={3} style={customStyle}>
        {showWelcome && (
          <div className="welcome-container">
            <h1 className="welcome-text">Welcome!</h1>
          </div>
        )}
        
        {/* Render the appropriate step component based on the active step */}
        {activeComponent === "profile" && <Profile onNext={handleNext} />}
        {activeComponent === "educationalDetails" && (
          <Education onBack={handleBack} onNext={handleNext} />
        )}
        {activeComponent === "projectsDetails" && (
          <Projects onBack={handleBack} onNext={handleNext} />
        )}
        {activeComponent === "experienceDetails" && (
          <Experience onBack={handleBack} onNext={handleNext} />
        )}
        {activeComponent === "extraDetails" && (
          <ExtraDetails onBack={handleBack} />
        )}

        <div style={{ textAlign: "center", marginTop: 16, marginRight: 10 }}>
          {activeComponent !== "profile" && (
            <Button
              variant="contained"
              onClick={handleBack}
              sx={{ marginRight: "5px", borderRadius: "20px", width: "5rem" }}
            >
              Back
            </Button>
          )}
          
          {activeComponent !== "extraDetails" && (
            <Button 
              variant="contained" 
              onClick={handleNext} 
              sx={{ borderRadius: "20px", width: "5rem" }}
            >
              Next
            </Button>
          )}

          <div style={{ textAlign: "center", marginTop: 16 }}>
            {activeComponent === "extraDetails" && (
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                {/* Template Selection Button */}
                <Button 
                  variant="outlined" 
                  onClick={handleTemplateSelect}
                  sx={{ 
                    borderRadius: "20px",
                    padding: "8px 16px"
                  }}
                >
                  Choose Template
                </Button>
                
                {/* Review Resume Button */}
                <Button 
                  variant="contained" 
                  onClick={handleResume}
                  sx={{ 
                    borderRadius: "20px",
                    padding: "8px 16px"
                  }}
                >
                  Review Your Resume
                </Button>
              </div>
            )}
          </div>
          
          <div style={{ marginTop: "10px" }}>
            <p style={{ fontWeight: "300" }}>Page {getPageNumber()}</p>
          </div>
        </div>
      </Paper>
    </Box>
  );
};

export default ResumeForm;