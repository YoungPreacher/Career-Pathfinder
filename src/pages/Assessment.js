import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  StepConnector,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  useTheme,
  alpha,
  LinearProgress,
  Tooltip,
  Zoom,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AssessmentIcon from '@mui/icons-material/Assessment';

// Career matching questions with their options
const careerQuestions = [
  {
    id: 1,
    question: 'How do you prefer to communicate in a professional setting?',
    options: [
      { label: 'A. I enjoy public speaking and presenting', value: 'I enjoy public speaking and presenting' },
      { label: 'B. I prefer writing reports or emails', value: 'I prefer writing reports or emails' },
      { label: 'C. I like casual one-on-one conversations', value: 'I like casual one-on-one conversations' },
      { label: 'D. I\'m more of a listener than a speaker', value: 'I\'m more of a listener than a speaker' },
    ],
  },
  {
    id: 2,
    question: 'How do you handle decision-making under pressure?',
    options: [
      { label: 'A. I thrive under pressure and make quick decisions', value: 'I thrive under pressure and make quick decisions' },
      { label: 'B. I prefer to analyze data before deciding', value: 'I prefer to analyze data before deciding' },
      { label: 'C. I seek input from others before making decisions', value: 'I seek input from others before making decisions' },
      { label: 'D. I avoid high-pressure situations', value: 'I avoid high-pressure situations' },
    ],
  },
  {
    id: 3,
    question: 'What role do you usually take in group settings?',
    options: [
      { label: 'A. I lead and delegate tasks', value: 'I lead and delegate tasks' },
      { label: 'B. I organize and keep everyone on track', value: 'I organize and keep everyone on track' },
      { label: 'C. I support and help where needed', value: 'I support and help where needed' },
      { label: 'D. I prefer working alone', value: 'I prefer working alone' },
    ],
  },
  {
    id: 4,
    question: 'How comfortable are you with strategic planning?',
    options: [
      { label: 'A. I often think long-term and plan ahead', value: 'I often think long-term and plan ahead' },
      { label: 'B. I can plan short-term, but not strategic goals', value: 'I can plan short-term, but not strategic goals' },
      { label: 'C. I prefer when others handle strategy', value: 'I prefer when others handle strategy' },
      { label: 'D. I focus on the now, not the future', value: 'I focus on the now, not the future' },
    ],
  },
  {
    id: 5,
    question: 'What\'s your approach to solving complex problems?',
    options: [
      { label: 'A. I break it into steps and analyze each one', value: 'I break it into steps and analyze each one'},
      { label: 'B. I brainstorm creatively for unique solutions', value: 'I brainstorm creatively for unique solutions' },
      { label: 'C. I consult with others to find a path forward', value: 'I consult with others to find a path forward' },
      { label: 'D. I usually avoid complex problems', value: 'I usually avoid complex problems' },
    ],
  },
  {
    id: 6,
    question: 'Which work environment suits you best?',
    options: [
      { label: 'A. Fast-paced and dynamic', value: 'Fast-paced and dynamic' },
      { label: 'B. Structured and predictable', value: 'Structured and predictable' },
      { label: 'C. Creative and open', value: 'Creative and open' },
      { label: 'D. Independent and quiet', value: 'Independent and quiet' },
    ],
  },
  {
    id: 7,
    question: 'How do you feel about managing or leading others?',
    options: [
      { label: 'A. I enjoy being in charge and mentoring others', value: 'I enjoy being in charge and mentoring others' },
      { label: 'B. I can lead if needed, but don\'t seek it', value: 'I can lead if needed, but don\'t seek it' },
      { label: 'C. I prefer supporting roles', value: 'I prefer supporting roles' },
      { label: 'D. I avoid leadership roles', value: 'I avoid leadership roles' },
    ],
  },
  {
    id: 8,
    question: 'Which of these best describes your time management?',
    options: [
      { label: 'A. I\'m excellent at juggling multiple tasks', value: 'I\'m excellent at juggling multiple tasks' },
      { label: 'B. I work best on one task at a time', value: 'I work best on one task at a time' },
      { label: 'C. I often need help prioritizing', value: 'I often need help prioritizing' },
      { label: 'D. I work best without strict deadlines', value: 'I work best without strict deadlines' },
    ],
  },
  {
    id: 9,
    question: 'How do you prefer to handle interpersonal relationships at work?',
    options: [
      { label: 'A. I enjoy networking and building connections', value: 'I enjoy networking and building connections' },
      { label: 'B. I like working with a small, close-knit team', value: 'I like working with a small, close-knit team' },
      { label: 'C. I prefer minimal social interaction', value: 'I prefer minimal social interaction' },
      { label: 'D. I work well with all types of people', value: 'I work well with all types of people' },
    ],
  },
  {
    id: 10,
    question: 'What\'s your comfort level with making public decisions?',
    options: [
      { label: 'A. Very comfortable — I can justify my decisions', value: 'Very comfortable — I can justify my decisions' },
      { label: 'B. Somewhat comfortable — I prefer private settings', value: 'Somewhat comfortable — I prefer private settings' },
      { label: 'C. I avoid decision-making roles', value: 'I avoid decision-making roles' },
      { label: 'D. I follow directions more than I lead', value: 'I follow directions more than I lead' },
    ],
  },
  {
    id: 11,
    question: 'How do you feel about working with data and analytics?',
    options: [
      { label: 'A. I love analyzing numbers and trends', value: 'I love analyzing numbers and trends' },
      { label: 'B. I can work with data, but prefer people-focused tasks', value: 'I can work with data, but prefer people-focused tasks' },
      { label: 'C. I avoid data-heavy work', value: 'I avoid data-heavy work' },
      { label: 'D. I enjoy visualizing data for storytelling', value: 'I enjoy visualizing data for storytelling' },
    ],
  },
  {
    id: 12,
    question: 'Which skill comes most naturally to you?',
    options: [
      { label: 'A. Persuasion and negotiation', value: 'Persuasion and negotiation' },
      { label: 'B. Critical thinking and analysis', value: 'Critical thinking and analysis' },
      { label: 'C. Empathy and understanding', value: 'Empathy and understanding' },
      { label: 'D. Creativity and innovation', value: 'Creativity and innovation' },
    ],
  },
  {
    id: 13,
    question: 'How do you approach learning new information?',
    options: [
      { label: 'A. I enjoy self-directed learning and growth', value: 'I enjoy self-directed learning and growth' },
      { label: 'B. I learn best through mentorship', value: 'I learn best through mentorship' },
      { label: 'C. I prefer formal training programs', value: 'I prefer formal training programs' },
      { label: 'D. I like learning through hands-on experiences', value: 'I like learning through hands-on experiences' },
    ],
  },
  {
    id: 14,
    question: 'Which type of impact motivates you most?',
    options: [
      { label: 'A. Influencing company strategy or growth', value: 'Influencing company strategy or growth' },
      { label: 'B. Helping people directly', value: 'Helping people directly' },
      { label: 'C. Solving technical or operational problems', value: 'Solving technical or operational problems' },
      { label: 'D. Creating something meaningful or beautiful', value: 'Creating something meaningful or beautiful' },
    ],
  },
  {
    id: 15,
    question: 'What kind of feedback do you prefer?',
    options: [
      { label: 'A. Direct and constructive', value: 'Direct and constructive' },
      { label: 'B. Encouraging and supportive', value: 'Encouraging and supportive' },
      { label: 'C. Formal performance reviews', value: 'Formal performance reviews' },
      { label: 'D. Minimal — I prefer working independently', value: 'Minimal — I prefer working independently' },
    ],
  },
];

// Define steps for the stepper
const steps = ['Career Skills', 'Work Environment', 'Personal Preferences', 'Review'];

// Custom styled Radio component
const StyledRadio = styled(Radio)(({ theme }) => ({
  '&.Mui-checked': {
    color: theme.palette.primary.main,
  },
  padding: '12px',
}));

// Custom StepConnector
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.MuiStepConnector-alternativeLabel`]: {
    top: 22,
  },
  [`&.MuiStepConnector-active`]: {
    [`& .MuiStepConnector-line`]: {
      backgroundImage: `linear-gradient(95deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
    },
  },
  [`&.MuiStepConnector-completed`]: {
    [`& .MuiStepConnector-line`]: {
      backgroundImage: `linear-gradient(95deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
    },
  },
  [`& .MuiStepConnector-line`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

function Assessment({ setRecommendations }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  // Calculate progress percentage
  useEffect(() => {
    const answeredCount = Object.keys(answers).length;
    const totalQuestions = careerQuestions.length;
    setProgress((answeredCount / totalQuestions) * 100);
  }, [answers]);

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Build a string from the answers - all the values joined by commas
      const answersString = Object.entries(answers)
        .sort(([a], [b]) => parseInt(a) - parseInt(b)) // Sort by question ID to maintain order
        .map(([_, answer]) => answer)
        .join(',');

      console.log('Answers string to send to backend:', answersString);
      
      // Send assessment data to backend
      console.log('Sending answers to backend:', answersString);
      
      console.log('Sending query to backend:', answersString);
      
      const response = await fetch(`http://localhost:5000/search?query=${encodeURIComponent(answersString)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend error:', errorText);
        throw new Error(`Failed to get recommendations: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Backend response:', data);

      if (data && Array.isArray(data)) {
        // Extract the job titles from the response
        const recommendations = data.map(item => item.job_title || item.text).filter(Boolean);
        console.log('Setting recommendations:', recommendations);
        
        if (recommendations.length > 0) {
          setRecommendations(recommendations);
          navigate('/results');
        } else {
          throw new Error('No valid recommendations received');
        }
      } else {
        console.error('Invalid response format:', data);
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Error getting recommendations:', error);
      alert('There was an error connecting to the backend. Please check the console for more details.');
      
      // For debugging purposes, show the error in console
      console.log('Full error details:', {
        message: error.message,
        stack: error.stack
      });
      
      // Fallback to mock data if backend is not available
      const mockRecommendations = [
        'Software Engineer',
        'Data Scientist', 
        'Product Manager',
        'UX Designer',
        'Marketing Manager'
      ];
      setRecommendations(mockRecommendations);
      navigate('/results');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render questions for the current step
  const getStepContent = (step) => {
    // Calculate which questions to show based on the current step
    let questionsToShow = [];
    if (step === 0) {
      questionsToShow = careerQuestions.slice(0, 5);
    } else if (step === 1) {
      questionsToShow = careerQuestions.slice(5, 10);
    } else if (step === 2) {
      questionsToShow = careerQuestions.slice(10, 15);
    } else if (step === 3) {
      // Review step - show all answers
      return (
        <Box sx={{ mt: 3, px: { xs: 1, md: 3 } }}>
          <Typography variant="h5" gutterBottom color="primary.dark" fontWeight="600">
            Review Your Answers
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
            Please review your answers before submitting. You can go back to any section to make changes.
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
            <Typography variant="h6" fontWeight="500">
              Completion Status
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                {Object.keys(answers).length} of {careerQuestions.length} questions answered
              </Typography>
              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress 
                  variant="determinate" 
                  value={progress} 
                  size={40} 
                  thickness={4} 
                  sx={{ color: progress === 100 ? theme.palette.success.main : theme.palette.primary.main }}
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
                  <Typography variant="caption" component="div" color="text.secondary">
                    {`${Math.round(progress)}%`}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          {steps.map((sectionTitle, index) => {
            const sectionQuestions = careerQuestions.slice(index * 5, (index + 1) * 5);
            const sectionAnswered = sectionQuestions.filter(q => answers[q.id]).length;
            const sectionProgress = (sectionAnswered / sectionQuestions.length) * 100;
            
            return (
              <Card 
                key={index} 
                elevation={0} 
                sx={{ 
                  mb: 3, 
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  borderRadius: 2,
                  overflow: 'visible'
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" fontWeight="500" color="primary.dark">
                      {sectionTitle}
                    </Typography>
                    <Button 
                      size="small" 
                      onClick={() => setActiveStep(index)}
                      startIcon={<ArrowBackIcon fontSize="small" />}
                    >
                      Edit Section
                    </Button>
                  </Box>
                  
                  <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={sectionProgress} 
                      sx={{ 
                        flexGrow: 1, 
                        mr: 2, 
                        height: 8, 
                        borderRadius: 4,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                          backgroundColor: sectionProgress === 100 ? theme.palette.success.main : theme.palette.primary.main,
                        }
                      }} 
                    />
                    <Typography variant="body2" color="text.secondary">
                      {sectionAnswered}/{sectionQuestions.length}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ pl: 2 }}>
                    {sectionQuestions.map((question) => {
                      const answer = answers[question.id];
                      const selectedOption = question.options.find(opt => opt.value === answer);
                      
                      return (
                        <Box key={question.id} sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                          {answer && (
                            <CheckCircleOutlineIcon 
                              sx={{ 
                                color: theme.palette.success.main, 
                                mr: 1,
                                mt: 0.5,
                                fontSize: 20 
                              }} 
                            />
                          )}
                          <Box>
                            <Typography variant="subtitle2" fontWeight="500">
                              {question.id}. {question.question}
                            </Typography>
                            {answer ? (
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                {selectedOption?.label}
                              </Typography>
                            ) : (
                              <Typography variant="body2" color="error" sx={{ mt: 0.5, fontStyle: 'italic' }}>
                                Not answered
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      );
    }

    return (
      <Box sx={{ mt: 3 }}>
        {questionsToShow.map((question) => {
          const isAnswered = answers[question.id];
          
          return (
            <Card 
              key={question.id} 
              elevation={0} 
              sx={{ 
                mb: 4, 
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.primary.main, isAnswered ? 0.2 : 0.1)}`,
                transition: 'all 0.3s ease',
                backgroundColor: isAnswered ? alpha(theme.palette.primary.light, 0.05) : 'transparent',
                '&:hover': {
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                  boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Typography 
                    variant="h6" 
                    fontWeight="500" 
                    gutterBottom
                    sx={{ color: theme.palette.primary.dark }}
                  >
                    {question.id}. {question.question}
                  </Typography>
                  {isAnswered && (
                    <Tooltip title="Question answered" arrow TransitionComponent={Zoom}>
                      <CheckCircleOutlineIcon 
                        sx={{ 
                          color: theme.palette.success.main, 
                          ml: 1,
                          mt: 0.5 
                        }} 
                      />
                    </Tooltip>
                  )}
                </Box>
                
                <FormControl component="fieldset" fullWidth>
                  <RadioGroup
                    value={answers[question.id] || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  >
                    {question.options.map((option) => (
                      <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<StyledRadio />}
                        label={
                          <Typography variant="body1">
                            {option.label}
                          </Typography>
                        }
                        sx={{ 
                          mb: 1.5,
                          ml: 0.5,
                          p: 1,
                          borderRadius: 2,
                          transition: 'all 0.2s',
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.05),
                          },
                          ...(answers[question.id] === option.value && {
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          })
                        }}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    );
  };

  // Calculate if the current step is complete (all questions answered)
  const isStepComplete = () => {
    if (activeStep === 0) {
      return careerQuestions.slice(0, 5).every(q => answers[q.id]);
    } else if (activeStep === 1) {
      return careerQuestions.slice(5, 10).every(q => answers[q.id]);
    } else if (activeStep === 2) {
      return careerQuestions.slice(10, 15).every(q => answers[q.id]);
    }
    return true;
  };

  // Calculate if all questions have been answered
  const allQuestionsAnswered = () => {
    return careerQuestions.every(q => answers[q.id]);
  };

  return (
    <Container maxWidth="md" sx={{ mb: 6, px: { xs: 2, sm: 3 } }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        textAlign: 'center',
        mt: { xs: 4, md: 6 },
        mb: 4
      }}>
        <Box 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            mb: 3
          }}
        >
          <AssessmentIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
        </Box>
        <Typography 
          component="h1" 
          variant="h3" 
          align="center" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            color: theme.palette.primary.dark,
            mb: 2
          }}
        >
          Career Matching Assessment
        </Typography>
        <Typography 
          variant="h6" 
          align="center" 
          color="text.secondary"
          sx={{ 
            maxWidth: 600,
            mb: 2,
            fontWeight: 400
          }}
        >
          Answer these questions to find your ideal career path
        </Typography>
        
        <Box sx={{ width: '100%', mb: 2 }}>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
              height: 8, 
              borderRadius: 4,
              mb: 1,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                backgroundColor: progress === 100 ? theme.palette.success.main : theme.palette.primary.main,
              }
            }} 
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              Progress: {Math.round(progress)}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {Object.keys(answers).length}/{careerQuestions.length} questions
            </Typography>
          </Box>
        </Box>
      </Box>
      
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 2, sm: 4 }, 
          borderRadius: 3,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          boxShadow: `0 8px 40px ${alpha(theme.palette.primary.main, 0.1)}`,
        }}
      >
        <Stepper 
          activeStep={activeStep} 
          alternativeLabel 
          connector={<ColorlibConnector />}
          sx={{ 
            mb: 5,
            '& .MuiStepLabel-label': {
              mt: 1,
              fontWeight: 500,
            },
            '& .MuiStepLabel-label.Mui-active': {
              color: theme.palette.primary.main,
              fontWeight: 600,
            },
            '& .MuiStepLabel-label.Mui-completed': {
              color: theme.palette.success.main,
              fontWeight: 600,
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Box 
              sx={{ 
                width: 100,
                height: 100,
                borderRadius: '50%',
                backgroundColor: alpha(theme.palette.success.main, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3
              }}
            >
              <CheckCircleOutlineIcon sx={{ fontSize: 50, color: theme.palette.success.main }} />
            </Box>
            <Typography variant="h4" gutterBottom fontWeight="600" color="primary.dark">
              Assessment Complete!
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph sx={{ maxWidth: 500, mx: 'auto', mb: 4 }}>
              Thank you for completing the assessment. We're ready to analyze your responses and find your ideal career matches.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleSubmit}
              disabled={isSubmitting}
              endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <ArrowForwardIcon />}
              sx={{ 
                mt: 2,
                py: 1.5,
                px: 4,
                borderRadius: '50px',
                fontWeight: 600,
                boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                '&:hover': {
                  boxShadow: '0 12px 20px rgba(0,0,0,0.18)',
                }
              }}
            >
              {isSubmitting ? 'Processing...' : 'Get Career Recommendations'}
            </Button>
          </Box>
        ) : (
          <>
            {getStepContent(activeStep)}
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                mt: 4,
                pt: 3,
                borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
              }}
            >
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<ArrowBackIcon />}
                sx={{ 
                  borderRadius: '50px',
                  px: 3,
                  py: 1,
                }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={activeStep === 3 ? !allQuestionsAnswered() : !isStepComplete()}
                endIcon={<ArrowForwardIcon />}
                sx={{ 
                  borderRadius: '50px',
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                }}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default Assessment;