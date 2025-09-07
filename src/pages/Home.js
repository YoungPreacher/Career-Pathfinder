import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Paper,
  Divider,
  Avatar,
  useTheme,
  alpha,
} from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import BarChartIcon from '@mui/icons-material/BarChart';

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    {
      icon: <ExploreIcon />,
      title: 'Personalized Career Matching',
      description: 'Get data-driven career recommendations based on your skills, interests, and work preferences.'
    },
    {
      icon: <TrendingUpIcon />,
      title: 'Market Insights',
      description: 'Access real-time salary data, job market trends, and future career outlook predictions.'
    },
    {
      icon: <WorkIcon />,
      title: 'Skill Gap Analysis',
      description: 'Identify skill gaps and get personalized recommendations for professional development.'
    },
    {
      icon: <SchoolIcon />,
      title: 'Learning Pathways',
      description: 'Discover tailored learning resources and certification paths for your target career.'
    }
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 10 },
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `radial-gradient(circle at 20% 150%, ${alpha(theme.palette.secondary.main, 0.4)} 0%, transparent 50%)`,
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                animation: 'fadeIn 1s ease-out',
                '@keyframes fadeIn': {
                  '0%': { opacity: 0, transform: 'translateY(20px)' },
                  '100%': { opacity: 1, transform: 'translateY(0)' },
                }
              }}>
                <Typography
                  component="h1"
                  variant="h2"
                  gutterBottom
                  sx={{ 
                    fontWeight: 800,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    mb: 2,
                  }}
                >
                  Find Your Perfect <Box component="span" sx={{ color: theme.palette.secondary.main }}>Career Path</Box>
                </Typography>
                <Typography
                  variant="h5"
                  paragraph
                  sx={{ 
                    mb: 4,
                    opacity: 0.9,
                    maxWidth: '90%',
                    lineHeight: 1.5,
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                  }}
                >
                  Make informed career decisions with our data-driven recommendations
                  and comprehensive career insights.
                </Typography>
                <Box sx={{ mt: 5, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => navigate('/assessment')}
                    endIcon={<ArrowForwardIcon />}
                    sx={{ 
                      py: 1.5, 
                      px: 4,
                      fontWeight: 600,
                      borderRadius: '50px',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
                      }
                    }}
                  >
                    Get Started
                  </Button>
                  
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box sx={{ 
                position: 'relative',
                height: '400px',
                animation: 'float 6s ease-in-out infinite',
                '@keyframes float': {
                  '0%': { transform: 'translateY(0px)' },
                  '50%': { transform: 'translateY(-20px)' },
                  '100%': { transform: 'translateY(0px)' },
                }
              }}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: alpha(theme.palette.background.paper, 0.9),
                    boxShadow: '0 20px 80px rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <Box sx={{ 
                    position: 'relative', 
                    width: '80%', 
                    height: '80%',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '-10%',
                      left: '-10%',
                      width: '120%',
                      height: '120%',
                      background: `conic-gradient(from 180deg at 50% 50%, ${theme.palette.primary.light} 0deg, ${theme.palette.secondary.light} 120deg, ${theme.palette.primary.main} 240deg, ${theme.palette.secondary.main} 360deg)`,
                      borderRadius: '50%',
                      animation: 'spin 8s linear infinite',
                      '@keyframes spin': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' },
                      },
                    }
                  }}>
                    <Box sx={{ 
                      position: 'absolute', 
                      top: '10%', 
                      left: '10%', 
                      width: '80%', 
                      height: '80%', 
                      borderRadius: '50%', 
                      background: theme.palette.background.paper,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 1,
                    }}>
                      <ExploreIcon sx={{ fontSize: 80, color: theme.palette.primary.main }} />
                    </Box>
                  </Box>
                </Box>
                
                {/* Floating elements */}
                <Avatar sx={{ 
                  position: 'absolute', 
                  top: '15%', 
                  left: '20%', 
                  bgcolor: theme.palette.secondary.main,
                  width: 60,
                  height: 60,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                  animation: 'floatElement 7s ease-in-out infinite',
                  '@keyframes floatElement': {
                    '0%': { transform: 'translate(0, 0) rotate(0deg)' },
                    '50%': { transform: 'translate(-15px, 15px) rotate(10deg)' },
                    '100%': { transform: 'translate(0, 0) rotate(0deg)' },
                  },
                }}>
                  <WorkIcon fontSize="large" />
                </Avatar>
                
                <Avatar sx={{ 
                  position: 'absolute', 
                  bottom: '20%', 
                  left: '15%', 
                  bgcolor: theme.palette.primary.light,
                  width: 50,
                  height: 50,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                  animation: 'floatElement2 8s ease-in-out infinite',
                  '@keyframes floatElement2': {
                    '0%': { transform: 'translate(0, 0) rotate(0deg)' },
                    '50%': { transform: 'translate(20px, -10px) rotate(-5deg)' },
                    '100%': { transform: 'translate(0, 0) rotate(0deg)' },
                  },
                }}>
                  <SchoolIcon fontSize="medium" />
                </Avatar>
                
                <Avatar sx={{ 
                  position: 'absolute', 
                  top: '25%', 
                  right: '15%', 
                  bgcolor: alpha(theme.palette.primary.dark, 0.8),
                  width: 45,
                  height: 45,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                  animation: 'floatElement3 6s ease-in-out infinite',
                  '@keyframes floatElement3': {
                    '0%': { transform: 'translate(0, 0) rotate(0deg)' },
                    '50%': { transform: 'translate(-10px, -15px) rotate(8deg)' },
                    '100%': { transform: 'translate(0, 0) rotate(0deg)' },
                  },
                }}>
                  <EmojiObjectsIcon fontSize="medium" />
                </Avatar>
                
                <Avatar sx={{ 
                  position: 'absolute', 
                  bottom: '15%', 
                  right: '20%', 
                  bgcolor: theme.palette.secondary.light,
                  width: 55,
                  height: 55,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                  animation: 'floatElement4 9s ease-in-out infinite',
                  '@keyframes floatElement4': {
                    '0%': { transform: 'translate(0, 0) rotate(0deg)' },
                    '50%': { transform: 'translate(15px, 10px) rotate(-10deg)' },
                    '100%': { transform: 'translate(0, 0) rotate(0deg)' },
                  },
                }}>
                  <BarChartIcon fontSize="medium" />
                </Avatar>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: alpha(theme.palette.primary.light, 0.05) }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="overline" 
              component="div"
              sx={{ 
                color: theme.palette.secondary.main, 
                fontWeight: 600,
                letterSpacing: 1.5,
                mb: 1
              }}
            >
              EXPLORE OUR FEATURES
            </Typography>
            <Typography 
              variant="h3" 
              component="h2"
              sx={{ 
                fontWeight: 700,
                mb: 2,
                color: theme.palette.primary.main
              }}
            >
              How We Help Your Career Journey
            </Typography>
            <Divider sx={{ 
              width: '80px', 
              mx: 'auto', 
              borderColor: theme.palette.secondary.main,
              borderWidth: 3,
              borderRadius: 1,
              my: 3
            }} />
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ 
                maxWidth: '700px', 
                mx: 'auto',
                mb: 5,
                fontWeight: 400
              }}
            >
              Our platform combines AI-powered assessments with real-world data to provide you with personalized career guidance and insights.
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <Paper
                  elevation={0}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 4,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 12px 30px ${alpha(theme.palette.primary.main, 0.1)}`,
                      '& .feature-icon-wrapper': {
                        transform: 'scale(1.1)',
                      }
                    },
                  }}
                >
                  <Box sx={{ 
                    p: 3, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    textAlign: 'center',
                  }}>
                    <Box 
                      className="feature-icon-wrapper"
                      sx={{ 
                        mb: 3,
                        width: 70,
                        height: 70,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.8)} 0%, ${alpha(theme.palette.primary.dark, 0.9)} 100%)`,
                        color: 'white',
                        boxShadow: `0 10px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
                        transition: 'transform 0.3s ease',
                        '& svg': {
                          fontSize: 32
                        }
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography 
                      gutterBottom 
                      variant="h5" 
                      component="h3"
                      sx={{ 
                        fontWeight: 600,
                        mb: 1.5,
                        color: theme.palette.primary.dark
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      color="text.secondary"
                      sx={{ 
                        lineHeight: 1.6,
                        fontSize: '0.95rem'
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => navigate('/assessment')}
              endIcon={<ArrowForwardIcon />}
              sx={{ 
                borderRadius: '50px',
                px: 4,
                py: 1.5,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                }
              }}
            >
              Take the Assessment
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;