import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Rating,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  CircularProgress,
  useTheme,
  alpha,
  Avatar,
  Fade,
  Zoom,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  TrendingUp,
  School,
  LocationOn,
  AttachMoney,
  WorkOutline,
  CheckCircle,
  Refresh,
  EmojiEvents,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Compare from "@mui/icons-material/Compare";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Psychology from "@mui/icons-material/Psychology";
import Business from "@mui/icons-material/Business";
import BarChart from "@mui/icons-material/BarChart";
import ThumbUp from "@mui/icons-material/ThumbUp";
import ThumbDown from "@mui/icons-material/ThumbDown";


// Career data - will be fetched from backend
let careerData = {
  'Software Engineer': {
    description: 'Develop software applications and systems using programming languages and development tools.',
    salary: {
      entry: 65000,
      mid: 95000,
      senior: 130000,
      average: 95000
    },
    skills: ['Programming', 'Problem Solving', 'Team Collaboration', 'System Design'],
    education: 'Bachelor\'s in Computer Science or related field',
    workEnvironment: 'Office/Hybrid/Remote',
    growth: 4.5,
    workLifeBalance: 3.5,
    demand: 'High',
    locations: ['San Francisco', 'New York', 'Seattle', 'Austin'],
    pros: ['High salary potential', 'Remote work options', 'Continuous learning'],
    cons: ['Long hours sometimes', 'Constant technology changes', 'High stress']
  },
  'Data Scientist': {
    description: 'Analyze complex data sets to help organizations make better decisions.',
    salary: {
      entry: 70000,
      mid: 100000,
      senior: 140000,
      average: 103000
    },
    skills: ['Statistics', 'Machine Learning', 'Python', 'Data Visualization'],
    education: 'Master\'s in Data Science, Statistics, or related field',
    workEnvironment: 'Office/Hybrid/Remote',
    growth: 4.8,
    workLifeBalance: 4.0,
    demand: 'Very High',
    locations: ['San Francisco', 'New York', 'Seattle', 'Boston'],
    pros: ['High demand', 'Good work-life balance', 'Intellectual challenge'],
    cons: ['Requires advanced education', 'Can be isolating', 'High expectations']
  },
  'Product Manager': {
    description: 'Lead product development from conception to launch, working with cross-functional teams.',
    salary: {
      entry: 75000,
      mid: 110000,
      senior: 150000,
      average: 112000
    },
    skills: ['Leadership', 'Strategic Thinking', 'Communication', 'Market Analysis'],
    education: 'Bachelor\'s degree, MBA preferred',
    workEnvironment: 'Office/Hybrid',
    growth: 4.2,
    workLifeBalance: 3.0,
    demand: 'High',
    locations: ['San Francisco', 'New York', 'Seattle', 'Austin'],
    pros: ['High salary potential', 'Leadership opportunities', 'Strategic impact'],
    cons: ['High stress', 'Long hours', 'Accountability for failures']
  },
  'UX Designer': {
    description: 'Create user-centered designs for digital products and services.',
    salary: {
      entry: 60000,
      mid: 85000,
      senior: 120000,
      average: 88000
    },
    skills: ['User Research', 'Design Thinking', 'Prototyping', 'Visual Design'],
    education: 'Bachelor\'s in Design, HCI, or related field',
    workEnvironment: 'Office/Hybrid/Remote',
    growth: 4.0,
    workLifeBalance: 4.2,
    demand: 'High',
    locations: ['San Francisco', 'New York', 'Seattle', 'Austin'],
    pros: ['Creative work', 'Good work-life balance', 'Growing field'],
    cons: ['Subjective feedback', 'Design by committee', 'Constant iteration']
  },
  'Marketing Manager': {
    description: 'Develop and execute marketing strategies to promote products and services.',
    salary: {
      entry: 55000,
      mid: 80000,
      senior: 110000,
      average: 82000
    },
    skills: ['Digital Marketing', 'Analytics', 'Communication', 'Strategy'],
    education: 'Bachelor\'s in Marketing, Business, or related field',
    workEnvironment: 'Office/Hybrid',
    growth: 3.8,
    workLifeBalance: 3.5,
    demand: 'Medium',
    locations: ['New York', 'Los Angeles', 'Chicago', 'Boston'],
    pros: ['Creative opportunities', 'Good work-life balance', 'Diverse industries'],
    cons: ['Results-driven pressure', 'Budget constraints', 'Fast-changing trends']
  }
};

function Results({ results = [] }) {
  const navigate = useNavigate();

  const [selectedCareers, setSelectedCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [careerDataState, setCareerDataState] = useState({});

  useEffect(() => {
    // Initialize with the local career data
    setCareerDataState(careerData);
    setLoading(false);
  }, []);

  const handleCareerSelect = (career) => {
    if (selectedCareers.includes(career)) {
      setSelectedCareers(selectedCareers.filter(c => c !== career));
    } else if (selectedCareers.length < 3) {
      setSelectedCareers([...selectedCareers, career]);
    }
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(salary);
  };

  const getSalaryColor = (salary) => {
    if (salary >= 100000) return '#4caf50';
    if (salary >= 80000) return '#8bc34a';
    if (salary >= 60000) return '#ffc107';
    return '#ff9800';
  };

  // Helper to safely get career details
  const getCareerData = (career) => {
    const data = careerDataState[career] || careerData[career];
    return data || null;
  };

  // Build a safe list of careers to render
  const defaultCareers = [
    'Software Engineer',
    'Data Scientist',
    'Product Manager',
    'UX Designer',
    'Marketing Manager'
  ];
  const incoming = Array.isArray(results) ? results : [];
  const baseCareers = incoming.length > 0 ? incoming : defaultCareers;
  const careersToRender = baseCareers.filter((c) => !!getCareerData(c));

  // Custom styled components
  const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconFilled': {
      color: theme.palette.primary.main,
    },
  }));
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    padding: theme.spacing(2),
  }));
  
  const StyledTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
    '& .MuiTableCell-head': {
      color: theme.palette.primary.dark,
      fontWeight: 600,
      borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    },
  }));
  
  const StyledAccordion = styled(Accordion)(({ theme }) => ({
    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    borderRadius: '8px !important',
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
    '&.Mui-expanded': {
      margin: theme.spacing(1, 0),
      boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
    },
    marginBottom: theme.spacing(2),
  }));
  
  const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
    borderRadius: '8px',
    '&.Mui-expanded': {
      borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  }));
  
  const theme = useTheme();
  
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: { xs: 4, md: 8 } }}>
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh'
        }}>
          <Box sx={{ position: 'relative', mb: 4 }}>
            <CircularProgress 
              size={80} 
              thickness={4} 
              sx={{ color: theme.palette.primary.main }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <EmojiEvents sx={{ fontSize: 40, color: theme.palette.primary.dark }} />
            </Box>
          </Box>
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              color: theme.palette.primary.dark,
              mb: 2
            }}
          >
            Analyzing Your Assessment...
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              maxWidth: 600,
              mb: 4,
              fontWeight: 400
            }}
          >
            Finding the best career matches based on your unique profile
          </Typography>
          <LinearProgress 
            sx={{ 
              mt: 2, 
              width: '60%', 
              height: 8, 
              borderRadius: 4,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
              }
            }} 
          />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 4, md: 6 }, mb: 6, px: { xs: 2, sm: 3 } }}>
      {/* Header */}
      <Box sx={{ 
        textAlign: 'center', 
        mb: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Box 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: alpha(theme.palette.success.main, 0.1),
            mb: 3
          }}
        >
          <EmojiEvents sx={{ fontSize: 40, color: theme.palette.success.main }} />
        </Box>
        <Typography 
          variant="h3" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            color: theme.palette.primary.dark,
            mb: 2
          }}
        >
          Your Career Recommendations
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          sx={{ 
            maxWidth: 700,
            mb: 4,
            fontWeight: 400
          }}
        >
          Based on your assessment, we've identified these career paths that align with your skills, 
          interests, and preferences
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            size="large"
            startIcon={<Refresh />}
            onClick={() => navigate('/assessment')}
            sx={{ 
              borderRadius: '50px',
              px: 3,
              py: 1.2,
            }}
          >
            Retake Assessment
          </Button>
        </Box>
      </Box>

      {/* Career Cards Grid */}
      <Typography 
        variant="h5" 
        sx={{ 
          mb: 3, 
          fontWeight: 600,
          color: theme.palette.primary.dark,
          textAlign: 'center'
        }}
      >
        Top Career Matches
      </Typography>
      <Typography 
        variant="body1" 
        color="text.secondary" 
        sx={{ 
          mb: 4, 
          textAlign: 'center',
          maxWidth: 800,
          mx: 'auto'
        }}
      >
        Click on a career card to select it for detailed comparison. You can select up to 3 careers.
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {((Array.isArray(incoming) && incoming.length > 0) ? incoming : (Array.isArray(careersToRender) ? careersToRender : defaultCareers)).map((item, index) => {
          const career = typeof item === 'string' ? item : (item.job_title || item.text || 'Result');
          const description = typeof item === 'string' ? (getCareerData(item)?.description || '') : (item.text || '');
          const data = getCareerData(career) || {};
          const isSelected = selectedCareers.includes(career);
          return (
            <Grid item xs={12} md={6} lg={4} key={career}>
              <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                <Card 
                  sx={{ 
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                    boxShadow: isSelected ? 
                      `0 8px 32px ${alpha(theme.palette.primary.main, 0.25)}` : 
                      `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
                    borderRadius: 3,
                    overflow: 'hidden',
                    position: 'relative',
                    border: isSelected ? 
                      `2px solid ${theme.palette.primary.main}` : 
                      `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    '&:hover': {
                      boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.2)}`,
                    }
                  }}
                  onClick={() => handleCareerSelect(career)}
                >
                  {isSelected && (
                    <Box 
                      sx={{ 
                        position: 'absolute', 
                        top: 12, 
                        right: 12, 
                        zIndex: 2,
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: '50%',
                        width: 32,
                        height: 32,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
                      }}
                    >
                      <CheckCircle sx={{ color: 'white', fontSize: 20 }} />
                    </Box>
                  )}
                  
                  <Box 
                    sx={{ 
                      height: 8, 
                      width: '100%', 
                      backgroundColor: theme.palette.primary.main,
                      opacity: isSelected ? 1 : 0.7,
                    }}
                  />
                  
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography 
                        variant="h5" 
                        component="h2" 
                        sx={{ 
                          fontWeight: 600,
                          color: theme.palette.primary.dark
                        }}
                      >
                        {career}
                      </Typography>
                      <Chip 
                        label={data?.demand || 'Unknown'}
                        color={data?.demand === 'Very High' ? 'error' : data?.demand === 'High' ? 'warning' : 'success'}
                        size="small"
                        sx={{ 
                          fontWeight: 500,
                          borderRadius: '50px',
                          px: 1
                        }}
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, minHeight: 60 }}>
                      {description || data?.description || 'No description available.'}
                    </Typography>

                    <Box 
                      sx={{ 
                        p: 2, 
                        mb: 3, 
                        borderRadius: 2,
                        backgroundColor: alpha(theme.palette.primary.main, 0.05),
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <Avatar 
                          sx={{ 
                            width: 36, 
                            height: 36, 
                            backgroundColor: alpha(getSalaryColor((data && data.salary && data.salary.average) ? data.salary.average : 0), 0.1),
                            mr: 1.5
                          }}
                        >
                          <AttachMoney sx={{ color: getSalaryColor((data && data.salary && data.salary.average) ? data.salary.average : 0) }} />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                            Average Salary
                          </Typography>
                          <Typography variant="h6" sx={{ color: getSalaryColor((data && data.salary && data.salary.average) ? data.salary.average : 0), fontWeight: 600 }}>
                            {(data && data.salary && data.salary.average) ? formatSalary(data.salary.average) : 'N/A'}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          sx={{ 
                            width: 36, 
                            height: 36, 
                            backgroundColor: alpha(theme.palette.success.main, 0.1),
                            mr: 1.5
                          }}
                        >
                          <TrendingUp sx={{ color: theme.palette.success.main }} />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                            Growth Potential
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <StyledRating value={(data && data.growth) ? data.growth : 0} readOnly size="small" precision={0.5} />
                            <Typography variant="body2" sx={{ ml: 1, fontWeight: 500 }}>
                              {(data && data.growth) ? data.growth : 0}/5
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                      Key Skills:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 3 }}>
                      {(data && Array.isArray(data.skills) ? data.skills : []).map((skill) => (
                        <Chip 
                          key={skill} 
                          label={skill} 
                          size="small" 
                          sx={{ 
                            borderRadius: '50px',
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.dark,
                            fontWeight: 500,
                            '&:hover': {
                              backgroundColor: alpha(theme.palette.primary.main, 0.2),
                            }
                          }} 
                        />
                      ))}
                    </Box>

                    <Divider sx={{ mb: 2 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <WorkOutline sx={{ mr: 1, color: theme.palette.text.secondary, fontSize: 20 }} />
                        <Typography variant="body2" color="text.secondary">
                          {(data && data.workEnvironment) ? data.workEnvironment : 'N/A'}
                        </Typography>
                      </Box>
                      <Tooltip 
                        title="Work-Life Balance Rating" 
                        arrow 
                        placement="top"
                        TransitionComponent={Zoom}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <StyledRating value={(data && data.workLifeBalance) ? data.workLifeBalance : 0} readOnly size="small" precision={0.5} />
                        </Box>
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          );
        })}
      </Grid>

      {/* Comparison Section removed */}
      {false && (
        <Fade in={true} timeout={800}>
          <Box sx={{ mt: 8 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mb: 4
            }}>
              <Box 
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  mr: 2
                }}
              >
                <Compare sx={{ fontSize: 28, color: theme.palette.primary.main }} />
              </Box>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 600,
                  color: theme.palette.primary.dark
                }}
              >
                Career Comparison
              </Typography>
            </Box>
            
            <TableContainer 
              component={Paper} 
              sx={{ 
                mb: 5, 
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: `0 8px 40px ${alpha(theme.palette.primary.main, 0.1)}`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              }}
            >
              <Table>
                <StyledTableHead>
                  <TableRow>
                    <StyledTableCell>Career</StyledTableCell>
                    <StyledTableCell align="center">Average Salary</StyledTableCell>
                    <StyledTableCell align="center">Growth Potential</StyledTableCell>
                    <StyledTableCell align="center">Work-Life Balance</StyledTableCell>
                    <StyledTableCell align="center">Demand</StyledTableCell>
                    <StyledTableCell align="center">Education Required</StyledTableCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                  {selectedCareers.map((career) => {
                    const data = getCareerData(career);
                    if (!data) return null;
                    return (
                      <TableRow key={career} sx={{ '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.02) } }}>
                        <StyledTableCell component="th" scope="row">
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.primary.dark }}>
                            {career}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Typography variant="h6" sx={{ color: getSalaryColor((data && data.salary && data.salary.average) ? data.salary.average : 0), fontWeight: 600 }}>
                            {(data && data.salary && data.salary.average) ? formatSalary(data.salary.average) : 'N/A'}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <StyledRating value={(data && data.growth) ? data.growth : 0} readOnly precision={0.5} />
                            <Typography variant="body2" sx={{ ml: 1, fontWeight: 500 }}>
                              {(data && data.growth) ? data.growth : 0}/5
                            </Typography>
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <StyledRating value={(data && data.workLifeBalance) ? data.workLifeBalance : 0} readOnly precision={0.5} />
                            <Typography variant="body2" sx={{ ml: 1, fontWeight: 500 }}>
                              {(data && data.workLifeBalance) ? data.workLifeBalance : 0}/5
                            </Typography>
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Chip 
                            label={(data && data.demand) ? data.demand : 'Unknown'}
                            color={(data && data.demand === 'Very High') ? 'error' : (data && data.demand === 'High') ? 'warning' : 'success'}
                            size="small"
                            sx={{ 
                              fontWeight: 500,
                              borderRadius: '50px',
                              px: 1
                            }}
                          />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <School sx={{ mr: 1, color: theme.palette.primary.main, fontSize: 20 }} />
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {(data && data.education) ? data.education : 'N/A'}
                            </Typography>
                          </Box>
                        </StyledTableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

          {/* Detailed Comparison */}
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 3, 
              fontWeight: 600,
              color: theme.palette.primary.dark
            }}
          >
            Detailed Career Information
          </Typography>
          
          <Grid container spacing={3}>
            {selectedCareers.map((career) => {
              const data = getCareerData(career);
              if (!data) return null;
              return (
                <Grid item xs={12} md={6} key={career}>
                  <Card 
                    sx={{ 
                      borderRadius: 3,
                      overflow: 'hidden',
                      boxShadow: `0 8px 40px ${alpha(theme.palette.primary.main, 0.1)}`,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    }}
                  >
                    <Box 
                      sx={{ 
                        p: 3, 
                        borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                        backgroundColor: alpha(theme.palette.primary.main, 0.03),
                      }}
                    >
                      <Typography 
                        variant="h5" 
                        gutterBottom 
                        sx={{ 
                          fontWeight: 600,
                          color: theme.palette.primary.dark,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <WorkOutline sx={{ mr: 1.5, color: theme.palette.primary.main }} />
                        {career}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {(data && data.description) ? data.description : 'No description available.'}
                      </Typography>
                    </Box>
                    
                    <CardContent sx={{ p: 0 }}>
                      <StyledAccordion defaultExpanded>
                        <StyledAccordionSummary 
                          expandIcon={<ExpandMore />}
                          sx={{ px: 3, py: 1.5 }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AttachMoney sx={{ mr: 1.5, color: theme.palette.primary.main }} />
                            <Typography variant="subtitle1" fontWeight={600}>Salary Breakdown</Typography>
                          </Box>
                        </StyledAccordionSummary>
                        <AccordionDetails sx={{ px: 3, py: 2, backgroundColor: alpha(theme.palette.background.default, 0.5) }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <Box 
                              sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                p: 1.5,
                                borderRadius: 2,
                                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                              }}
                            >
                              <Typography fontWeight={500}>Entry Level:</Typography>
                              <Typography sx={{ color: getSalaryColor((data && data.salary && data.salary.entry) ? data.salary.entry : 0), fontWeight: 600 }}>
                                {(data && data.salary && data.salary.entry) ? formatSalary(data.salary.entry) : 'N/A'}
                              </Typography>
                            </Box>
                            <Box 
                              sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                p: 1.5,
                                borderRadius: 2,
                                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                              }}
                            >
                              <Typography fontWeight={500}>Mid Level:</Typography>
                              <Typography sx={{ color: getSalaryColor((data && data.salary && data.salary.mid) ? data.salary.mid : 0), fontWeight: 600 }}>
                                {(data && data.salary && data.salary.mid) ? formatSalary(data.salary.mid) : 'N/A'}
                              </Typography>
                            </Box>
                            <Box 
                              sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                p: 1.5,
                                borderRadius: 2,
                                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                              }}
                            >
                              <Typography fontWeight={500}>Senior Level:</Typography>
                              <Typography sx={{ color: getSalaryColor((data && data.salary && data.salary.senior) ? data.salary.senior : 0), fontWeight: 600 }}>
                                {(data && data.salary && data.salary.senior) ? formatSalary(data.salary.senior) : 'N/A'}
                              </Typography>
                            </Box>
                          </Box>
                        </AccordionDetails>
                      </StyledAccordion>

                      <StyledAccordion>
                        <StyledAccordionSummary 
                          expandIcon={<ExpandMore />}
                          sx={{ px: 3, py: 1.5 }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Psychology sx={{ mr: 1.5, color: theme.palette.primary.main }} />
                            <Typography variant="subtitle1" fontWeight={600}>Skills & Requirements</Typography>
                          </Box>
                        </StyledAccordionSummary>
                        <AccordionDetails sx={{ px: 3, py: 2, backgroundColor: alpha(theme.palette.background.default, 0.5) }}>
                          <Box>
                            <Typography variant="subtitle2" fontWeight={600} gutterBottom color="primary.dark">
                              Required Skills:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 3 }}>
                              {(data && data.skills ? data.skills : []).map((skill) => (
                                <Chip 
                                  key={skill} 
                                  label={skill} 
                                  size="small" 
                                  sx={{ 
                                    borderRadius: '50px',
                                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                    color: theme.palette.primary.dark,
                                    fontWeight: 500,
                                  }} 
                                />
                              ))}
                            </Box>
                            <Typography variant="subtitle2" fontWeight={600} gutterBottom color="primary.dark">
                              Education:
                            </Typography>
                            <Box 
                              sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                mb: 3,
                                p: 1.5,
                                borderRadius: 2,
                                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                              }}
                            >
                              <School sx={{ mr: 1.5, color: theme.palette.primary.main }} />
                              <Typography variant="body2" fontWeight={500}>
                                {(data && data.education) ? data.education : 'N/A'}
                              </Typography>
                            </Box>
                            <Typography variant="subtitle2" fontWeight={600} gutterBottom color="primary.dark">
                              Work Environment:
                            </Typography>
                            <Box 
                              sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                p: 1.5,
                                borderRadius: 2,
                                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                              }}
                            >
                              <Business sx={{ mr: 1.5, color: theme.palette.primary.main }} />
                              <Typography variant="body2" fontWeight={500}>
                                {(data && data.workEnvironment) ? data.workEnvironment : 'N/A'}
                              </Typography>
                            </Box>
                          </Box>
                        </AccordionDetails>
                      </StyledAccordion>

                      <StyledAccordion>
                        <StyledAccordionSummary 
                          expandIcon={<ExpandMore />}
                          sx={{ px: 3, py: 1.5 }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <BarChart sx={{ mr: 1.5, color: theme.palette.primary.main }} />
                            <Typography variant="subtitle1" fontWeight={600}>Pros & Cons</Typography>
                          </Box>
                        </StyledAccordionSummary>
                        <AccordionDetails sx={{ px: 3, py: 2, backgroundColor: alpha(theme.palette.background.default, 0.5) }}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <Box 
                                sx={{ 
                                  p: 2, 
                                  borderRadius: 2,
                                  backgroundColor: alpha(theme.palette.success.main, 0.05),
                                  border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                                  height: '100%',
                                }}
                              >
                                <Typography 
                                  variant="subtitle2" 
                                  color="success.main" 
                                  gutterBottom
                                  sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    fontWeight: 600,
                                    mb: 1.5
                                  }}
                                >
                                  <ThumbUp sx={{ mr: 1, fontSize: 18 }} />
                                  Pros:
                                </Typography>
                                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                                  {data.pros.map((pro, index) => (
                                    <Typography 
                                      key={index} 
                                      component="li" 
                                      variant="body2"
                                      sx={{ mb: 0.8 }}
                                    >
                                      {pro}
                                    </Typography>
                                  ))}
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box 
                                sx={{ 
                                  p: 2, 
                                  borderRadius: 2,
                                  backgroundColor: alpha(theme.palette.error.main, 0.05),
                                  border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                                  height: '100%',
                                }}
                              >
                                <Typography 
                                  variant="subtitle2" 
                                  color="error.main" 
                                  gutterBottom
                                  sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    fontWeight: 600,
                                    mb: 1.5
                                  }}
                                >
                                  <ThumbDown sx={{ mr: 1, fontSize: 18 }} />
                                  Cons:
                                </Typography>
                                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                                  {data.cons.map((con, index) => (
                                    <Typography 
                                      key={index} 
                                      component="li" 
                                      variant="body2"
                                      sx={{ mb: 0.8 }}
                                    >
                                      {con}
                                    </Typography>
                                  ))}
                                </Box>
                              </Box>
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                      </StyledAccordion>

                      <StyledAccordion>
                        <StyledAccordionSummary 
                          expandIcon={<ExpandMore />}
                          sx={{ px: 3, py: 1.5 }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocationOn sx={{ mr: 1.5, color: theme.palette.primary.main }} />
                            <Typography variant="subtitle1" fontWeight={600}>Top Locations</Typography>
                          </Box>
                        </StyledAccordionSummary>
                        <AccordionDetails sx={{ px: 3, py: 2, backgroundColor: alpha(theme.palette.background.default, 0.5) }}>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                            {(data && data.locations ? data.locations : []).map((location) => (
                              <Chip 
                                key={location} 
                                label={location} 
                                size="small" 
                                icon={<LocationOn sx={{ fontSize: '1rem !important' }} />}
                                sx={{ 
                                  borderRadius: '50px',
                                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                  color: theme.palette.primary.dark,
                                  fontWeight: 500,
                                  px: 0.5
                                }} 
                              />
                            ))}
                          </Box>
                        </AccordionDetails>
                      </StyledAccordion>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Fade>
      )}

      {/* Action Buttons */}
      <Box 
        sx={{ 
          textAlign: 'center', 
          mt: 6,
          pt: 4,
          borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography 
          variant="h6" 
          color="text.secondary" 
          sx={{ 
            mb: 3,
            maxWidth: 600,
            fontWeight: 400
          }}
        >
          {selectedCareers.length === 0 ? 
            "Select up to 3 careers to compare them side by side" : 
            `You've selected ${selectedCareers.length} ${selectedCareers.length === 1 ? 'career' : 'careers'} for comparison`
          }
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/assessment')}
            startIcon={<Refresh />}
            sx={{ 
              borderRadius: '50px',
              px: 4,
              py: 1.5,
            }}
          >
            Retake Assessment
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Results;