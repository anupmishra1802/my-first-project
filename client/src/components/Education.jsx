import React from "react";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  Box,
  Paper,
  Container,
  Button,
  Divider,
  Chip,
  Stepper,
  Step,
  StepLabel
} from "@mui/material";
import {
  Event,
  School,
  LocationCity,
  Grade,
  ArrowForward,
  ArrowBack,
  CastForEducation,
  WorkspacePremium,
  CalendarToday
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { updateEducation } from "../redux/educationSlice";
import { Link } from 'react-router-dom';

const Education = () => {
  const dispatch = useDispatch();
  const education = useSelector((state) => state.educationDetails);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateEducation({ ...education, [name]: value }));
  };

  const years = Array.from({ length: 30 }, (_, index) => 2030 - index);
  const engineeringFields = ["CS", "IT", "EnTC", "Electrical", "Mechanical", "Civil", "Chemical"];
  const otherFields = ["B.E.", "B.Tech", "BCA", "Bsc", "MBA", "M.Tech"];
  const higherCollegeBoard = ["Maharashtra State Board", "CBSE", "ICSE", "Diploma"];
  const schoolBoard = ["Maharashtra State Board", "CBSE", "ICSE"];

  const educationLevels = [
    { level: "college", title: "🎓 College/University", icon: <CastForEducation /> },
    { level: "higherSecondary", title: "📚 Higher Secondary (12th)", icon: <School /> },
    { level: "secondary", title: "🏫 Secondary (10th)", icon: <WorkspacePremium /> }
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
            📚 Educational Details
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Build your academic journey - from school to graduation
          </Typography>
        </Box>

        <CardContent sx={{ p: 4 }}>
          {/* Progress Stepper */}
          <Stepper alternativeLabel sx={{ mb: 6, mt: 2 }}>
            {['Profile', 'Education', 'Projects', 'Experience', 'Extra Details'].map((label) => (
              <Step key={label} completed={label === 'Education'}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* College/University Section */}
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              mb: 4, 
              borderRadius: 3,
              border: '2px solid',
              borderColor: 'primary.light',
              backgroundColor: '#f0f7ff'
            }}
          >
            <Box display="flex" alignItems="center" mb={3}>
              <CastForEducation color="primary" sx={{ fontSize: 32, mr: 2 }} />
              <Box>
                <Typography variant="h5" fontWeight="bold" color="primary">
                  🎓 College/University Details
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your graduation or post-graduation information
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={3}>
              {/* College Name */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="college"
                  label="College Name"
                  required
                  value={education.college || ""}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <School color="primary" />
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

              {/* Year */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  variant="outlined"
                  name="year"
                  label="Current Year"
                  value={education.year || ""}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarToday color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                >
                  <MenuItem value="F.E">First Year (F.E)</MenuItem>
                  <MenuItem value="S.E">Second Year (S.E)</MenuItem>
                  <MenuItem value="T.E">Third Year (T.E)</MenuItem>
                  <MenuItem value="B.E">Final Year (B.E)</MenuItem>
                </TextField>
              </Grid>

              {/* Field of Study */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  variant="outlined"
                  name="field"
                  label="Field of Study"
                  required
                  value={education.field || ""}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <WorkspacePremium color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                >
                  {otherFields.map((field) => (
                    <MenuItem key={field} value={field}>
                      {field}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Branch */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  variant="outlined"
                  name="branch"
                  label="Select Branch"
                  required
                  value={education.branch || ""}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                >
                  {engineeringFields.map((field) => (
                    <MenuItem key={field} value={field}>
                      {field}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Start & End Year */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  variant="outlined"
                  name="startYear"
                  label="Start Year"
                  value={education.startYear || ""}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Event color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  variant="outlined"
                  name="endYear"
                  label="End Year"
                  value={education.endYear || ""}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Event color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* City & CGPA */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="city"
                  label="City"
                  value={education.city || ""}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationCity color="primary" />
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

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="grades"
                  label="CGPA/Percentage"
                  value={education.grades || ""}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Grade color="primary" />
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
            </Grid>
          </Paper>

          <Divider sx={{ my: 4 }}>
            <Chip label="Previous Education" color="primary" />
          </Divider>

          {/* 12th Details Section */}
          <Paper 
            elevation={2} 
            sx={{ 
              p: 4, 
              mb: 4, 
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'secondary.light',
              backgroundColor: '#fffaf0'
            }}
          >
            <Box display="flex" alignItems="center" mb={3}>
              <School color="secondary" sx={{ fontSize: 28, mr: 2 }} />
              <Typography variant="h5" fontWeight="bold" color="secondary">
                📚 Higher Secondary (12th) Details
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="higherCollege"
                  label="School/College Name"
                  required
                  value={education.higherCollege || ""}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  select
                  variant="outlined"
                  name="startYear2"
                  label="Start Year"
                  value={education.startYear2 || ""}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  select
                  variant="outlined"
                  name="endYear2"
                  label="End Year"
                  value={education.endYear2 || ""}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="city2"
                  label="City"
                  value={education.city2 || ""}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="percentage"
                  label="Percentage"
                  value={education.percentage || ""}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  select
                  variant="outlined"
                  name="board1"
                  label="Education Board"
                  required
                  value={education.board1 || ""}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                >
                  {higherCollegeBoard.map((field) => (
                    <MenuItem key={field} value={field}>
                      {field}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Paper>

          {/* 10th Details Section */}
          <Paper 
            elevation={2} 
            sx={{ 
              p: 4, 
              mb: 4, 
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'success.light',
              backgroundColor: '#f0fff4'
            }}
          >
            <Box display="flex" alignItems="center" mb={3}>
              <WorkspacePremium color="success" sx={{ fontSize: 28, mr: 2 }} />
              <Typography variant="h5" fontWeight="bold" color="success.main">
                🏫 Secondary (10th) Details
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="school"
                  label="School Name"
                  required
                  value={education.school || ""}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  select
                  variant="outlined"
                  name="startYear3"
                  label="Start Year"
                  value={education.startYear3 || ""}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  select
                  variant="outlined"
                  name="endYear3"
                  label="End Year"
                  value={education.endYear3 || ""}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="city3"
                  label="City"
                  value={education.city3 || ""}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="percentage2"
                  label="Percentage"
                  value={education.percentage2 || ""}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  select
                  variant="outlined"
                  name="board2"
                  label="Education Board"
                  required
                  value={education.board2 || ""}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                >
                  {schoolBoard.map((field) => (
                    <MenuItem key={field} value={field}>
                      {field}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Paper>

          {/* Navigation Section */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mt: 4,
              pt: 3,
              borderTop: '1px solid #e0e0e0'
            }}
          >
            <Button
              component={Link}
              to="/profile"
              variant="outlined"
              size="large"
              startIcon={<ArrowBack />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.dark',
                  backgroundColor: 'primary.light',
                  color: 'white'
                }
              }}
            >
              Back to Profile
            </Button>

            <Button
              component={Link}
              to="/projects"
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
              Continue to Projects
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
            <Typography variant="body2" color="info.main">
              💡 <strong>Tip:</strong> Fill your most recent education first. Accurate dates and grades help recruiters verify your qualifications quickly.
            </Typography>
          </Paper>
        </CardContent>
      </Paper>
    </Container>
  );
};

export default Education;