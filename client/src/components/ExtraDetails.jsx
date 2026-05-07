import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Button,
  Box,
  Paper,
  Chip,
  Container,
  Fab,
  Divider,
  Alert
} from "@mui/material";
import {
  EmojiEvents,
  AutoAwesome,
  Delete,
  ArrowForward,
  ArrowBack,
  Add,
  Save,
  Code,
  Language,
  Storage,
  Build,
  Psychology,
  SportsEsports,
  School,
  BugReport,
  Security
} from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addSkills,
  addAchievements,
  updateSkills,
  updateAchievements,
  updateExtraCoCurricular,
  addExtraCoCurricular,
  deleteSkills,
  deleteAchievements,
  deleteExtraCoCurricular,
  deleteCoreSubjects,
  updateCoreSubjects,
  addCoreSubjects
} from "../redux/extraDetailsSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api";

// ✅ Icons for different skill categories
const skillIcons = {
  languages: <Language sx={{ color: "#1976d2" }} />,
  web: <Code sx={{ color: "#d32f2f" }} />,
  webFrameworks: <Build sx={{ color: "#ed6c02" }} />,
  databases: <Storage sx={{ color: "#2e7d32" }} />,
  other: <Psychology sx={{ color: "#7b1fa2" }} />
};

// ✅ Main Component
const ExtraDetails = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state slices
  const profileData = useSelector((state) => state.profileDetails);
  const educationalData = useSelector((state) => state.educationDetails);
  const projectData = useSelector((state) => state.projectDetails);
  const experienceData = useSelector((state) => state.experienceDetails);
  const extraDetails = useSelector((state) => state.extraDetails);

  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // ✅ Authentication Check
  useEffect(() => {
    const token = localStorage.getItem("token") || currentUser?.token;
    if (!token) {
      toast.info("🔐 Please login to save your data");
    }
  }, [currentUser]);

  // ✅ Add Items
  const handleAddItem = (type) => {
    switch (type) {
      case "achievements":
        dispatch(addAchievements());
        break;
      case "extraCoCurricular":
        dispatch(addExtraCoCurricular());
        break;
      case "languages":
      case "web":
      case "webFrameworks":
      case "databases":
      case "other":
        dispatch(addSkills({ type }));
        break;
      case "coreSubjects":
        dispatch(addCoreSubjects());
        break;
      default:
        break;
    }
  };

  // ✅ Input Change Handler
  const handleInputChange = (index, type, value) => {
    if (["languages", "web", "webFrameworks", "databases", "other"].includes(type))
      dispatch(updateSkills({ type, index, value }));
    else if (type === "achievements") dispatch(updateAchievements({ index, value }));
    else if (type === "extraCoCurricular") dispatch(updateExtraCoCurricular({ index, value }));
    else if (type === "coreSubjects") dispatch(updateCoreSubjects({ index, value }));
  };

  // ✅ Delete Item
  const handleDeleteItem = (index, type) => {
    if (type === "achievements") dispatch(deleteAchievements(index));
    else if (type === "extraCoCurricular") dispatch(deleteExtraCoCurricular(index));
    else if (["languages", "web", "webFrameworks", "databases", "other"].includes(type))
      dispatch(deleteSkills({ type, index }));
    else if (type === "coreSubjects") dispatch(deleteCoreSubjects(index));
  };

  // ✅ Save Data to Backend
  const handleSave = async () => {
    const token = localStorage.getItem("token") || currentUser?.token;

    if (!currentUser?.id) {
      toast.error("🚫 Please login first to save data");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    if (!token) {
      toast.error("🔐 Authentication error. Please login again.");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    setLoading(true);
    setSaveSuccess(false);
    
    const resumeData = {
      profile: profileData,
      education: educationalData,
      projects: projectData,
      experience: experienceData,
      extraDetails: extraDetails,
    };

    const API_URL = `${BASE_URL}/resume/resume-data?id=${currentUser.id}`;

    try {
      const response = await axios.post(
        API_URL,
        { resumeData },
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("🎉 Data Saved Successfully!");
        setSaveSuccess(true);
        const resumeId = response.data.resumeId || currentUser.id;
        localStorage.setItem("currentResumeId", resumeId);
        
        // Auto hide success message after 3 seconds
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        toast.error(response.data.message || "❌ Failed to save data");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("🔐 Session expired. Please login again.");
        setTimeout(() => navigate("/login"), 2000);
      } else if (error.request) {
        toast.error("🌐 Network error. Please check backend server connection.");
      } else {
        toast.error("💥 Error saving data: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Skill Sections Configuration
  const skillSections = [
    { 
      title: "Programming Languages", 
      key: "languages", 
      tooltip: "C, C++, Java, Python, JavaScript, TypeScript",
      icon: <Language />
    },
    { 
      title: "Web Technologies", 
      key: "web", 
      tooltip: "HTML, CSS, JavaScript, REST APIs, GraphQL",
      icon: <Code />
    },
    { 
      title: "Frameworks & Libraries", 
      key: "webFrameworks", 
      tooltip: "React, Angular, Vue, Node.js, Express, Django",
      icon: <Build />
    },
    { 
      title: "Databases", 
      key: "databases", 
      tooltip: "MySQL, MongoDB, PostgreSQL, Redis, Firebase",
      icon: <Storage />
    },
    { 
      title: "Soft Skills & Tools", 
      key: "other", 
      tooltip: "Git, Docker, AWS, Leadership, Teamwork, Communication",
      icon: <Psychology />
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* ✅ Success Alert */}
      {saveSuccess && (
        <Alert 
          severity="success" 
          sx={{ 
            mb: 3, 
            borderRadius: 3,
            boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
          }}
        >
          🎉 Your data has been saved successfully! You can now proceed to templates.
        </Alert>
      )}

      <Paper 
        elevation={8} 
        sx={{ 
          borderRadius: 4,
          background: 'linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)',
          overflow: 'hidden',
          border: '1px solid #e0e0e0'
        }}
      >
        {/* ✅ Header Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            py: 3,
            px: 4,
            textAlign: 'center'
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            🚀 Extra Details
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Boost your resume with skills, achievements & activities
          </Typography>
        </Box>

        <CardContent sx={{ p: 4 }}>
          {/* ✅ Debug Section - Collapsible */}
          <Paper 
            elevation={2} 
            sx={{ 
              p: 2, 
              mb: 4, 
              backgroundColor: '#f8f9fa',
              border: '1px solid #e9ecef',
              borderRadius: 3
            }}
          >
            <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
              <Tooltip title="Check authentication status" arrow>
                <Button
                  variant="outlined"
                  color="info"
                  startIcon={<Security />}
                  onClick={() => {
                    const token = localStorage.getItem("token") || currentUser?.token;
                    alert(`User ID: ${currentUser?.id}\nToken: ${token ? "✅ Found" : "❌ Not Found"}`);
                  }}
                >
                  Auth Status
                </Button>
              </Tooltip>

              <Tooltip title="Add test token for debugging" arrow>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<BugReport />}
                  onClick={() => {
                    const testToken = "test_token_" + Math.random().toString(36).slice(2, 9);
                    localStorage.setItem("token", testToken);
                    toast.success("🔧 Test token stored!");
                  }}
                >
                  Test Token
                </Button>
              </Tooltip>
            </Box>
          </Paper>

          {/* ✅ Skills Sections */}
          {skillSections.map((section, sIdx) => (
            <Paper 
              key={sIdx} 
              elevation={2} 
              sx={{ 
                p: 3, 
                mb: 4, 
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'primary.light',
                backgroundColor: 'background.paper'
              }}
            >
              <Box display="flex" alignItems="center" mb={2}>
                {skillIcons[section.key]}
                <Typography variant="h6" fontWeight="bold" sx={{ ml: 1, flexGrow: 1 }}>
                  {section.title}
                </Typography>
                <Tooltip title={section.tooltip} arrow placement="top">
                  <IconButton size="small">
                    <AutoAwesome fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>

              <Grid container spacing={2}>
                {extraDetails?.skills?.[section.key]?.map((value, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <TextField
                      fullWidth
                      size="small"
                      label={`${section.title.split(' ')[0]} ${index + 1}`}
                      value={value}
                      onChange={(e) => handleInputChange(index, section.key, e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton 
                              size="small" 
                              onClick={() => handleDeleteItem(index, section.key)}
                              color="error"
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>
                ))}
              </Grid>

              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={() => handleAddItem(section.key)}
                sx={{ 
                  mt: 2, 
                  borderRadius: 2,
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    borderColor: 'primary.dark',
                    backgroundColor: 'primary.light',
                    color: 'white'
                  }
                }}
              >
                Add {section.title}
              </Button>
            </Paper>
          ))}

          <Divider sx={{ my: 4 }} />

          {/* ✅ Achievements Section */}
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3, 
              mb: 4, 
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'warning.light',
              backgroundColor: '#fffbf0'
            }}
          >
            <Box display="flex" alignItems="center" mb={2}>
              <EmojiEvents sx={{ color: '#ff9800', mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                🏆 Achievements & Certifications
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {extraDetails?.achievements?.map((ach, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <TextField
                    fullWidth
                    size="small"
                    label={`Achievement ${index + 1}`}
                    value={ach}
                    onChange={(e) => handleInputChange(index, "achievements", e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmojiEvents color="warning" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton 
                            size="small" 
                            onClick={() => handleDeleteItem(index, "achievements")}
                            color="error"
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                </Grid>
              ))}
            </Grid>

            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() => handleAddItem("achievements")}
              sx={{ 
                mt: 2, 
                borderRadius: 2,
                borderColor: 'warning.main',
                color: 'warning.main',
                '&:hover': {
                  borderColor: 'warning.dark',
                  backgroundColor: 'warning.light',
                  color: 'white'
                }
              }}
            >
              Add Achievement
            </Button>
          </Paper>

          {/* ✅ Extra Curricular Section */}
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3, 
              mb: 4, 
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'success.light',
              backgroundColor: '#f0f9f0'
            }}
          >
            <Box display="flex" alignItems="center" mb={2}>
              <SportsEsports sx={{ color: '#4caf50', mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                🎯 Extra Curricular Activities
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {extraDetails?.extraCoCurricular?.map((activity, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <TextField
                    fullWidth
                    size="small"
                    label={`Activity ${index + 1}`}
                    value={activity}
                    onChange={(e) => handleInputChange(index, "extraCoCurricular", e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SportsEsports color="success" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton 
                            size="small" 
                            onClick={() => handleDeleteItem(index, "extraCoCurricular")}
                            color="error"
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                </Grid>
              ))}
            </Grid>

            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() => handleAddItem("extraCoCurricular")}
              sx={{ 
                mt: 2, 
                borderRadius: 2,
                borderColor: 'success.main',
                color: 'success.main',
                '&:hover': {
                  borderColor: 'success.dark',
                  backgroundColor: 'success.light',
                  color: 'white'
                }
              }}
            >
              Add Activity
            </Button>
          </Paper>

          {/* ✅ Save Section */}
          <Paper 
            elevation={4} 
            sx={{ 
              p: 4, 
              textAlign: 'center', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: 3
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ opacity: 0.9 }}>
              💾 Almost there! Save your data before proceeding
            </Typography>
            
            <Button
              variant="contained"
              size="large"
              disabled={loading}
              onClick={handleSave}
              startIcon={loading ? <div className="spinner"></div> : <Save />}
              sx={{
                px: 6,
                py: 1.5,
                borderRadius: 3,
                backgroundColor: loading ? 'grey.400' : 'white',
                color: loading ? 'white' : '#667eea',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                boxShadow: 4,
                '&:hover': {
                  backgroundColor: loading ? 'grey.400' : '#f5f5f5',
                  transform: loading ? 'none' : 'translateY(-2px)',
                  boxShadow: 6
                },
                transition: 'all 0.3s ease'
              }}
            >
              {loading ? "Saving Your Data..." : "💾 Save All Data"}
            </Button>

            <Typography variant="body2" sx={{ mt: 2, opacity: 0.8 }}>
              * Your data will be securely stored and available for future sessions
            </Typography>
          </Paper>

          {/* ✅ Navigation */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, px: 2 }}>
            <Button
              component={Link}
              to="/experience"
              variant="outlined"
              startIcon={<ArrowBack />}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1
              }}
            >
              Back to Experience
            </Button>

            <Button
              component={Link}
              to="/templates"
              variant="contained"
              endIcon={<ArrowForward />}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                }
              }}
            >
              Choose Template
            </Button>
          </Box>
        </CardContent>
      </Paper>

      {/* ✅ Floating Action Button for Quick Add */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Add />
      </Fab>

      {/* ✅ Custom Spinner Style */}
      <style>
        {`
          .spinner {
            border: 2px solid #f3f3f3;
            border-radius: 50%;
            border-top: 2px solid #667eea;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </Container>
  );
};

export default ExtraDetails;