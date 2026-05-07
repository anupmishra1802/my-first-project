import React from 'react';
import { Button, Box, Typography, Paper, Container, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, LinkedIn, Email, Phone, LocationOn, Logout } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice'; // Adjust path as per your project

const Home = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
        padding: 0
      }}
    >
      {/* ✅ Marquee Section - Ekdum Top Par */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: '#ff7eb3',
          color: 'white',
          padding: '12px 0',
          zIndex: 1000,
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          borderBottom: '3px solid #ff4d94'
        }}
      >
        <marquee behavior="scroll" direction="left" scrollamount="10">
          <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', fontSize: '1.2rem', mr: 4 }}>
            🚀 Welcome to Amazing Resume Builder! • Create Professional Resumes in Minutes • 100% Free • ATS Friendly Templates • Download PDF Instantly • 
            Stand Out from Competition • Get Your Dream Job Today! •
          </Typography>
        </marquee>
      </Box>

      {/* ✅ Logout Button - Top Right Corner */}
      {currentUser && (
        <Box
          sx={{
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            padding: '8px 16px',
            borderRadius: '25px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            border: '2px solid #ff7eb3'
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#667eea', 
              fontWeight: 'bold',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            Hi, {currentUser.email || currentUser.name || 'User'}!
          </Typography>
          <Button
            variant="contained"
            size="small"
            onClick={handleLogout}
            startIcon={<Logout />}
            sx={{
              backgroundColor: '#ff6b6b',
              color: 'white',
              borderRadius: '20px',
              padding: '6px 16px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#ff5252',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Logout
          </Button>
        </Box>
      )}

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 8, mt: 8 }}>
        <Container maxWidth="lg">
          <Paper
            elevation={16}
            sx={{
              padding: { xs: 4, md: 6 },
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.97)',
              borderRadius: 6,
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '6px',
                background: 'linear-gradient(90deg, #ff7eb3, #667eea, #764ba2)'
              }
            }}
          >
            {/* Animated Header */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h1"
                component="h1"
                gutterBottom
                sx={{
                  background: 'linear-gradient(45deg, #667eea, #764ba2, #ff7eb3)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  fontWeight: 'bold',
                  fontSize: { xs: '2.8rem', md: '4rem' },
                  mb: 2,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                  animation: 'pulse 2s infinite'
                }}
              >
                Amazing Resume Builder
              </Typography>

              <Typography
                variant="h4"
                color="text.secondary"
                sx={{
                  mb: 4,
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  maxWidth: '700px',
                  margin: '0 auto',
                  fontWeight: 300,
                  background: 'linear-gradient(45deg, #666, #333)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent'
                }}
              >
                Create Professional, Eye-Catching Resumes That Get You Hired!
              </Typography>
            </Box>

            {/* Stats Section */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
                gap: 3,
                mb: 6,
                textAlign: 'center'
              }}
            >
              {[
                { number: '10K+', label: 'Resumes Created' },
                { number: '95%', label: 'Success Rate' },
                { number: '50+', label: 'Templates' },
                { number: '24/7', label: 'Free Support' }
              ].map((stat, index) => (
                <Box key={index}>
                  <Typography variant="h3" color="primary" fontWeight="bold">
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Image Section */}
            <Box
              sx={{
                mb: 6,
                display: 'flex',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <img 
                src="/assets/img1.png" 
                alt="Resume Builder"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '20px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                  maxHeight: '400px',
                  border: '5px solid white'
                }}
                onError={(e) => {
                  // Placeholder agar image nahi hai
                  e.target.style.display = 'none';
                }}
              />
            </Box>

            {/* Features Grid */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                gap: 4,
                mb: 6
              }}
            >
              {[
                {
                  icon: '🎨',
                  title: 'Beautiful Templates',
                  desc: '50+ professionally designed ATS-friendly templates'
                },
                {
                  icon: '⚡',
                  title: 'Quick & Easy',
                  desc: 'Create your resume in just 5 minutes'
                },
                {
                  icon: '📱',
                  title: 'Mobile Friendly',
                  desc: 'Works perfectly on all devices'
                }
              ].map((feature, index) => (
                <Paper
                  key={index}
                  elevation={8}
                  sx={{
                    padding: 4,
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #f8f9ff, #ffffff)',
                    border: '1px solid rgba(102, 126, 234, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 25px 50px rgba(102, 126, 234, 0.2)'
                    }
                  }}
                >
                  <Typography variant="h3" sx={{ mb: 2 }}>
                    {feature.icon}
                  </Typography>
                  <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.desc}
                  </Typography>
                </Paper>
              ))}
            </Box>

            {/* Create Resume Button */}
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/resume-form"
              sx={{
                padding: '18px 50px',
                fontSize: '1.3rem',
                fontWeight: 'bold',
                borderRadius: '50px',
                background: 'linear-gradient(45deg, #ff7eb3, #667eea, #764ba2)',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 3s ease infinite',
                boxShadow: '0 15px 35px rgba(102, 126, 234, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #764ba2, #667eea, #ff7eb3)',
                  boxShadow: '0 20px 45px rgba(102, 126, 234, 0.6)',
                  transform: 'translateY(-5px)'
                },
                transition: 'all 0.3s ease',
                mb: 4
              }}
            >
              🚀 Create Your Resume Now - It's FREE!
            </Button>

            {/* Trust Badges */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap', mb: 2 }}>
              {['✅ No Credit Card Required', '✅ 100% Secure', '✅ Instant Download', '✅ Professional Quality'].map((badge, index) => (
                <Typography key={index} variant="body2" color="success.main" fontWeight="bold">
                  {badge}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* ✅ Attractive Footer */}
      <Box
        sx={{
          backgroundColor: '#2c3e50',
          color: 'white',
          padding: { xs: 4, md: 6 },
          textAlign: 'center',
          borderTop: '8px solid #ff7eb3'
        }}
      >
        <Container maxWidth="lg">
          {/* Footer Content */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4, mb: 4 }}>
            {/* Company Info */}
            <Box>
              <Typography variant="h5" gutterBottom fontWeight="bold" color="#ff7eb3">
                Amazing Resume Builder
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                Creating professional resumes that help you stand out and land your dream job since 2024.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, index) => (
                  <IconButton key={index} sx={{ color: '#ff7eb3', '&:hover': { color: 'white' } }}>
                    <Icon />
                  </IconButton>
                ))}
              </Box>
            </Box>

            {/* Quick Links */}
            <Box>
              <Typography variant="h6" gutterBottom fontWeight="bold" color="#ff7eb3">
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {['Home', 'Create Resume', 'Templates', 'Pricing'].map((link) => (
                  <Link 
                    key={link} 
                    to={link === 'Create Resume' ? '/resume-form' : '#'} 
                    style={{ 
                      color: 'white', 
                      textDecoration: 'none',
                      opacity: 0.8,
                      transition: 'opacity 0.3s'
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = '1'}
                    onMouseLeave={(e) => e.target.style.opacity = '0.8'}
                  >
                    {link}
                  </Link>
                ))}
              </Box>
            </Box>

            {/* Contact Info */}
            <Box>
              <Typography variant="h6" gutterBottom fontWeight="bold" color="#ff7eb3">
                Contact Us
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email sx={{ fontSize: 20, color: '#ff7eb3' }} />
                  <Typography variant="body2">Anup@resumebuilder.com</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone sx={{ fontSize: 20, color: '#ff7eb3' }} />
                  <Typography variant="body2">+1 (555) 123-4567</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn sx={{ fontSize: 20, color: '#ff7eb3' }} />
                  <Typography variant="body2">Lodha Palava Street, Job City,Dobivali Thane ,Maharastra India</Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Copyright */}
          <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.2)', pt: 3 }}>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              © 2024 Amazing Resume Builder. All rights reserved. | Made with ❤️ for job seekers
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Add CSS Animations */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
          }
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </Box>
  );
};

export default Home;