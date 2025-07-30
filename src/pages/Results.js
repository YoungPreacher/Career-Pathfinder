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
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  TrendingUp,
  School,
  Work,
  LocationOn,
  AttachMoney,
  ExpandMore,
  Compare,
  Star,
  Business,
  Psychology,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

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

function Results({ recommendations = [] }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCareers, setSelectedCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [careerDataState, setCareerDataState] = useState({});

  useEffect(() => {
    const fetchCareerData = async () => {
      try {
        // Try to fetch career data from backend
        const response = await fetch('http://localhost:5000/api/careers');
        if (response.ok) {
          const data = await response.json();
          // Fetch detailed data for each career
          const detailedData = {};
          for (const career of data.careers) {
            const careerResponse = await fetch(`http://localhost:5000/api/career/${encodeURIComponent(career)}`);
            if (careerResponse.ok) {
              const careerData = await careerResponse.json();
              detailedData[career] = careerData.career;
            }
          }
          setCareerDataState(detailedData);
        } else {
          // Fallback to local data if backend is not available
          setCareerDataState(careerData);
        }
      } catch (error) {
        console.error('Error fetching career data:', error);
        // Fallback to local data
        setCareerDataState(careerData);
      } finally {
        setLoading(false);
      }
    };

    fetchCareerData();
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

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h4" gutterBottom>
            Analyzing Your Assessment...
          </Typography>
          <LinearProgress sx={{ mt: 2 }} />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Finding the best career matches for you
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
          Your Career Recommendations
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Based on your assessment, here are the top career paths that match your profile
        </Typography>
        <Button
          variant="outlined"
          onClick={() => navigate('/assessment')}
          sx={{ mr: 2 }}
        >
          Retake Assessment
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate('/dashboard')}
        >
          Save to Dashboard
        </Button>
      </Box>

      {/* Career Cards Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {(recommendations.length > 0 ? recommendations : [
          'Software Engineer',
          'Data Scientist',
          'Product Manager',
          'UX Designer',
          'Marketing Manager'
        ]).map((career) => {
          const data = careerDataState[career] || careerData[career];
          const isSelected = selectedCareers.includes(career);
          
          return (
            <Grid item xs={12} md={6} lg={4} key={career}>
              <Card 
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                  boxShadow: isSelected ? 8 : 2,
                  border: isSelected ? '2px solid #1976d2' : 'none',
                }}
                onClick={() => handleCareerSelect(career)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                      {career}
                    </Typography>
                    <Chip 
                      label={data.demand}
                      color={data.demand === 'Very High' ? 'error' : data.demand === 'High' ? 'warning' : 'default'}
                      size="small"
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {data.description}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AttachMoney sx={{ mr: 1, color: getSalaryColor(data.salary.average) }} />
                    <Typography variant="h6" sx={{ color: getSalaryColor(data.salary.average) }}>
                      {formatSalary(data.salary.average)} avg
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TrendingUp sx={{ mr: 1, color: '#4caf50' }} />
                    <Typography variant="body2">
                      {data.growth}/5 Growth Potential
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                    {data.skills.slice(0, 3).map((skill) => (
                      <Chip key={skill} label={skill} size="small" variant="outlined" />
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Rating value={data.workLifeBalance} readOnly size="small" />
                    <Typography variant="caption" color="text.secondary">
                      Work-Life Balance
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Comparison Section */}
      {selectedCareers.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
            <Compare sx={{ mr: 1, verticalAlign: 'middle' }} />
            Career Comparison
          </Typography>
          
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Career</TableCell>
                  <TableCell align="center">Average Salary</TableCell>
                  <TableCell align="center">Growth Potential</TableCell>
                  <TableCell align="center">Work-Life Balance</TableCell>
                  <TableCell align="center">Demand</TableCell>
                  <TableCell align="center">Education Required</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedCareers.map((career) => {
                  const data = careerDataState[career] || careerData[career];
                  return (
                    <TableRow key={career}>
                      <TableCell component="th" scope="row">
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {career}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="h6" sx={{ color: getSalaryColor(data.salary.average) }}>
                          {formatSalary(data.salary.average)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Typography variant="body2" sx={{ mr: 1 }}>
                            {data.growth}/5
                          </Typography>
                          <TrendingUp sx={{ color: '#4caf50' }} />
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Rating value={data.workLifeBalance} readOnly size="small" />
                      </TableCell>
                      <TableCell align="center">
                        <Chip 
                          label={data.demand}
                          color={data.demand === 'Very High' ? 'error' : data.demand === 'High' ? 'warning' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">
                          {data.education}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Detailed Comparison */}
          <Grid container spacing={3}>
            {selectedCareers.map((career) => {
              const data = careerDataState[career] || careerData[career];
              return (
                <Grid item xs={12} md={6} key={career}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                        {career}
                      </Typography>
                      
                      <Accordion sx={{ mb: 2 }}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography variant="subtitle1">Salary Breakdown</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography>Entry Level:</Typography>
                              <Typography sx={{ color: getSalaryColor(data.salary.entry) }}>
                                {formatSalary(data.salary.entry)}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography>Mid Level:</Typography>
                              <Typography sx={{ color: getSalaryColor(data.salary.mid) }}>
                                {formatSalary(data.salary.mid)}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography>Senior Level:</Typography>
                              <Typography sx={{ color: getSalaryColor(data.salary.senior) }}>
                                {formatSalary(data.salary.senior)}
                              </Typography>
                            </Box>
                          </Box>
                        </AccordionDetails>
                      </Accordion>

                      <Accordion sx={{ mb: 2 }}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography variant="subtitle1">Skills & Requirements</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box>
                            <Typography variant="subtitle2" gutterBottom>Required Skills:</Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                              {data.skills.map((skill) => (
                                <Chip key={skill} label={skill} size="small" />
                              ))}
                            </Box>
                            <Typography variant="subtitle2" gutterBottom>Education:</Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                              {data.education}
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom>Work Environment:</Typography>
                            <Typography variant="body2">
                              {data.workEnvironment}
                            </Typography>
                          </Box>
                        </AccordionDetails>
                      </Accordion>

                      <Accordion sx={{ mb: 2 }}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography variant="subtitle1">Pros & Cons</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography variant="subtitle2" color="success.main" gutterBottom>
                                Pros:
                              </Typography>
                              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                                {data.pros.map((pro, index) => (
                                  <Typography key={index} component="li" variant="body2">
                                    {pro}
                                  </Typography>
                                ))}
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="subtitle2" color="error.main" gutterBottom>
                                Cons:
                              </Typography>
                              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                                {data.cons.map((con, index) => (
                                  <Typography key={index} component="li" variant="body2">
                                    {con}
                                  </Typography>
                                ))}
                              </Box>
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                      </Accordion>

                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography variant="subtitle1">Top Locations</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {data.locations.map((location) => (
                              <Chip 
                                key={location} 
                                label={location} 
                                size="small" 
                                variant="outlined"
                                icon={<LocationOn />}
                              />
                            ))}
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}

      {/* Action Buttons */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Select up to 3 careers to compare them side by side
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/dashboard')}
          sx={{ mr: 2 }}
        >
          Save Recommendations
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate('/assessment')}
        >
          Retake Assessment
        </Button>
      </Box>
    </Container>
  );
}

export default Results; 