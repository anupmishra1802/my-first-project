import React from "react";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Box,
  Paper,
  Container,
  Button,
  Divider,
  Chip
} from "@mui/material";
import {
  Email,
  Phone,
  LinkedIn,
  GitHub,
  Code,
  Person,
  Home,
  ArrowForward,
  Public,
  Work,
  School,
  Star
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/profileSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const currentProfile = useSelector((state) => state.profileDetails);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateProfile({ [name]: value }));
  };

  // Field configurations for better organization
  const fieldGroups = [
    {
      title: "👤 Basic Information",
      icon: <Person color="primary" />,
      fields: [
        {
          name: "firstName",
          label: "First Name",
          icon: <Person color="action" />,
          required: true,
          grid: { xs: 12, sm: 6 }
        },
        {
          name: "lastName",
          label: "Last Name",
          icon: <Person color="action" />,
          required: true,
          grid: { xs: 12, sm: 6 }
        }
      ]
    },
    {
      title: "📞 Contact Details",
      icon: <Phone color="primary" />,
      fields: [
        {
          name: "email",
          label: "Email Address",
          icon: <Email color="action" />,
          type: "email",
          required: true,
          grid: { xs: 12, sm: 6 }
        },
        {
          name: "mobile",
          label: "Mobile Number",
          icon: <Phone color="action" />,
          required: true,
          grid: { xs: 12, sm: 6 }
        },
        {
          name: "address",
          label: "Full Address",
          icon: <Home color="action" />,
          multiline: true,
          rows: 2,
          grid: { xs: 12 }
        }
      ]
    },
    {
      title: "🌐 Professional Profiles",
      icon: <Public color="primary" />,
      fields: [
        {
          name: "linkedIn",
          label: "LinkedIn Profile",
          icon: <LinkedIn color="primary" />,
          grid: { xs: 12, sm: 6, md: 4 }
        },
        {
          name: "github",
          label: "GitHub Profile",
          icon: <GitHub color="action" />,
          grid: { xs: 12, sm: 6, md: 4 }
        },
        {
          name: "leetcode",
          label: "LeetCode Profile",
          icon: <Code color="warning" />,
          grid: { xs: 12, sm: 6, md: 4 }
        },
        {
          name: "codechef",
          label: "CodeChef Profile",
          icon: <Code color="success" />,
          grid: { xs: 12, sm: 6, md: 4 }
        },
        {
          name: "codeforces",
          label: "Codeforces Profile",
          icon: <Code color="error" />,
          grid: { xs: 12, sm: 6, md: 4 }
        }
      ]
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper 
        elevation={8} 
        sx={{ 
          borderRadius: 4,
          background: 'linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)',
          overflow: 'hidden',
          border: '1px solid #e0e0e0'
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            py: 4,
            px: 4,
            textAlign: 'center'
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            👤 Personal Details
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Let's start with your basic information - this will appear on your resume
          </Typography>
        </Box>

        <CardContent sx={{ p: 4 }}>
          {fieldGroups.map((group, groupIndex) => (
            <Box key={groupIndex} mb={4}>
              {/* Group Header */}
              <Box display="flex" alignItems="center" mb={3}>
                {group.icon}
                <Typography 
                  variant="h5" 
                  fontWeight="bold" 
                  sx={{ ml: 1, color: 'primary.main' }}
                >
                  {group.title}
                </Typography>
              </Box>

              {/* Fields Grid */}
              <Grid container spacing={3}>
                {group.fields.map((field, fieldIndex) => (
                  <Grid item {...field.grid} key={fieldIndex}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type={field.type || "text"}
                      name={field.name}
                      label={field.label}
                      required={field.required}
                      multiline={field.multiline}
                      rows={field.rows || 1}
                      value={currentProfile?.[field.name] || ""}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {field.icon}
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 3,
                          backgroundColor: 'white',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: '#fafafa',
                          },
                          '&.Mui-focused': {
                            backgroundColor: 'white',
                            boxShadow: '0 0 0 2px rgba(102, 126, 234, 0.2)',
                          }
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#667eea',
                        }
                      }}
                    />
                  </Grid>
                ))}
              </Grid>

              {/* Divider between sections (except last) */}
              {groupIndex < fieldGroups.length - 1 && (
                <Divider sx={{ mt: 4, mb: 2 }} />
              )}
            </Box>
          ))}

          {/* Progress Indicator */}
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3, 
              mt: 4, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #f0f4ff 0%, #ffffff 100%)',
              border: '1px solid #e0e7ff',
              borderRadius: 3
            }}
          >
            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
              <Star color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" color="primary" fontWeight="bold">
                Profile Completion
              </Typography>
            </Box>
            
            <Box display="flex" justifyContent="center" gap={1} flexWrap="wrap">
              {['Profile', 'Education', 'Projects', 'Experience', 'Extra Details'].map((step, index) => (
                <Chip
                  key={index}
                  label={step}
                  variant={index === 0 ? "filled" : "outlined"}
                  color={index === 0 ? "primary" : "default"}
                  size="small"
                  icon={index === 0 ? <Person /> : undefined}
                />
              ))}
            </Box>
          </Paper>

          {/* Navigation Section */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              mt: 4,
              pt: 3,
              borderTop: '1px solid #e0e0e0'
            }}
          >
            <Button
              component={Link}
              to="/education"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              Continue to Education
            </Button>
          </Box>

          {/* Quick Tips */}
          <Paper 
            elevation={1} 
            sx={{ 
              p: 2, 
              mt: 3, 
              backgroundColor: '#e8f4fd',
              border: '1px solid #b6e0fe',
              borderRadius: 2
            }}
          >
            <Typography variant="body2" color="info.main" sx={{ display: 'flex', alignItems: 'center' }}>
              💡 <strong>Tip:</strong> Fill all required fields for best results. You can always come back and update this information later.
            </Typography>
          </Paper>
        </CardContent>
      </Paper>
    </Container>
  );
};

export default Profile;