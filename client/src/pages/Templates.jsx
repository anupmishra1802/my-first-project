import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Box, Paper, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import t1 from '../assets/t1.jpg';
import t2 from '../assets/t2.jpg';

const Templates = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getResumeId = () => {
    if (location.state?.resumeId) {
      return location.state.resumeId;
    }
    const savedResumeId = localStorage.getItem('currentResumeId');
    if (savedResumeId) {
      return savedResumeId;
    }
    return null;
  };

  const handleTemplateSelect = async (templateId) => {
    const resumeId = getResumeId();
    
    if (!resumeId) {
      alert("Please create and save your resume first before selecting a template");
      navigate('/create-resume');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert("Please login again");
        navigate('/login');
        return;
      }

      console.log("🔑 Updating template for resume:", resumeId);

      const response = await fetch(`http://localhost:5000/api/resume/update-template/${resumeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          templateType: templateId === 1 ? 'professional' : 'modern'
        })
      });

      // Check if response is OK
      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Server response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ Template update response:", result);

      if (result.success) {
        localStorage.setItem('selectedTemplate', templateId);
        navigate(`/resume/preview/${resumeId}`, { 
          state: { templateId: templateId }
        });
      } else {
        alert("Failed to save template: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error('❌ Template save error:', error);
      
      if (error.message.includes('401') || error.message.includes('Authentication')) {
        localStorage.clear();
        alert("Session expired. Please login again.");
        navigate('/login');
      } else {
        // Fallback to localStorage only
        localStorage.setItem('selectedTemplate', templateId);
        alert("Template saved locally. You can still preview your resume.");
        navigate(`/resume/preview/${resumeId}`, { 
          state: { templateId: templateId }
        });
      }
    }
  };

  const handlePreviewCurrent = () => {
    const resumeId = getResumeId();
    if (resumeId) {
      navigate(`/resume/preview/${resumeId}`);
    } else {
      alert("No saved resume found. Please create a resume first.");
      navigate('/create-resume');
    }
  };

  const templates = [
    { 
      id: 1, 
      name: "Professional", 
      description: "Clean and professional design for corporate jobs",
      image: t1,
      category: "Corporate",
      templateType: "professional"
    },
    { 
      id: 2, 
      name: "Modern", 
      description: "Contemporary style with modern layout",
      image: t2,
      category: "Creative",
      templateType: "modern"
    }
  ];

  return (
    <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', padding: '20px', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Paper elevation={3} style={{ padding: '30px', width: '90%', maxWidth: '1200px', background: 'white' }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50', mb: 2 }}>
          Choose Your Resume Template
        </Typography>
        
        <Typography variant="h6" align="center" sx={{ mb: 4, color: '#7f8c8d' }}>
          Select a template that matches your personality and career goals
        </Typography>
        
        <Grid container spacing={4} justifyContent="center">
          {templates.map((template) => (
            <Grid item xs={12} sm={6} md={4} key={template.id}>
              <Card 
                sx={{ 
                  cursor: 'pointer', 
                  transition: '0.3s',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': { 
                    transform: 'translateY(-10px)',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.2)'
                  }
                }}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={template.image}
                  alt={template.name}
                  sx={{ 
                    objectFit: 'cover',
                    borderBottom: '2px solid #f0f0f0'
                  }}
                />
                
                <CardContent sx={{ 
                  textAlign: 'center', 
                  padding: '20px',
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      backgroundColor: template.id === 1 ? '#e3f2fd' : '#f3e5f5',
                      color: template.id === 1 ? '#1976d2' : '#7b1fa2',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontWeight: 'bold',
                      alignSelf: 'flex-start',
                      mb: 1
                    }}
                  >
                    {template.category}
                  </Typography>
                  
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                    {template.name}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                    {template.description}
                  </Typography>
                  
                  <Button 
                    variant="contained" 
                    color="primary"
                    fullWidth
                    sx={{
                      background: template.id === 1 
                        ? 'linear-gradient(135deg, #1976d2 0%, #004ba0 100%)'
                        : 'linear-gradient(135deg, #7b1fa2 0%, #4a0072 100%)',
                      fontWeight: 'bold',
                      borderRadius: '8px',
                      padding: '10px'
                    }}
                  >
                    Use This Template
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 4, pt: 3, borderTop: '1px solid #e0e0e0' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            💡 You can preview and customize the template after selection
          </Typography>
          
          <Button 
            variant="outlined" 
            onClick={() => navigate('/home')}
            sx={{ mr: 2 }}
          >
            Back to Home
          </Button>
          
          <Button 
            variant="contained"
            color="secondary"
            onClick={handlePreviewCurrent}
          >
            Preview with Current Template
          </Button>
        </Box>

        {/* Debug Info */}
        <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Debug: Resume ID: {getResumeId() || 'Not found'} | 
            Token: {localStorage.getItem('token') ? 'Present' : 'Missing'}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Templates;