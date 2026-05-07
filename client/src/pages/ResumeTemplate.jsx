import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, Button } from '@mui/material';

const ResumeTemplate = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();

  return (
    <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', padding: '20px' }}>
      <Paper elevation={3} style={{ padding: '30px', width: '90%', maxWidth: '1000px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Resume Template {templateId}
        </Typography>
        
        <Box 
          sx={{ 
            border: '2px dashed #ccc', 
            padding: '40px', 
            textAlign: 'center',
            minHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px'
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Template {templateId} Content Will Appear Here
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/templates')}
          >
            Choose Different Template
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ResumeTemplate;