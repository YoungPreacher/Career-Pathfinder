import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  TextField,
  Chip,
  Rating,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const steps = ['Basic Information', 'Skills & Experience', 'Interests & Preferences', 'Work Environment'];

function Assessment({ setRecommendations }) {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [formData, setFormData] = useState({
    currentJobTitle: '',
    yearsExperience: '',
    education: '',
    skills: [],
    problemSolving: 3,
    workStyle: 'balanced',
    workEnvironment: 'hybrid',
    salaryExpectation: [500, 50000],
    workLifeBalance: 3,
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSkillAdd = () => {
    if (newSkill && !skills.includes(newSkill)) {
      const updatedSkills = [...skills, newSkill];
      setSkills(updatedSkills);
      setFormData({ ...formData, skills: updatedSkills });
      setNewSkill('');
    }
  };

  const handleSkillDelete = (skillToDelete) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToDelete);
    setSkills(updatedSkills);
    setFormData({ ...formData, skills: updatedSkills });
  };

  const handleSubmit = async () => {
    // For now, we'll use mock data since we don't have a backend
    // In a real app, you would send the formData to your backend
    const mockRecommendations = [
      'Software Engineer',
      'Data Scientist', 
      'Product Manager',
      'UX Designer',
      'Marketing Manager'
    ];
    setRecommendations(mockRecommendations);
    navigate('/results');
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Current Job Title"
              margin="normal"
              value={formData.currentJobTitle || ''}
              onChange={(e) => setFormData({ ...formData, currentJobTitle: e.target.value })}
            />
            <TextField
              fullWidth
              label="Years of Experience"
              type="number"
              margin="normal"
              value={formData.yearsExperience || ''}
              onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
            />
            <TextField
              fullWidth
              label="Education Level"
              select
              margin="normal"
              value={formData.education || ''}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              SelectProps={{
                native: true,
              }}
            >
              <option value="">Select Education Level</option>
              <option value="high-school">High School</option>
              <option value="bachelors">Bachelor's Degree</option>
              <option value="masters">Master's Degree</option>
              <option value="phd">Ph.D.</option>
            </TextField>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Add your skills
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                label="Add a skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSkillAdd()}
              />
              <Button variant="contained" onClick={handleSkillAdd}>
                Add
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  onDelete={() => handleSkillDelete(skill)}
                />
              ))}
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 4, mt: 2 }}>
            {/* Problem-solving section */}
            <Box>
              <Typography gutterBottom>How much do you enjoy problem-solving?</Typography>
              <Rating
                name="problem-solving"
                value={formData.problemSolving || 3}
                onChange={(_, newValue) =>
                  setFormData({ ...formData, problemSolving: newValue || 0 })
                }
                size="large"
                sx={{ mb: 3 }}
              />
            </Box>

            {/* Preferred Work Style section */}
            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend">Preferred Work Style</FormLabel>
              <RadioGroup 
                value={formData.workStyle || 'balanced'}
                onChange={(e) => setFormData({ ...formData, workStyle: e.target.value })}
              >
                <FormControlLabel
                  value="independent"
                  control={<Radio />}
                  label="Independent Work"
                />
                <FormControlLabel
                  value="collaborative"
                  control={<Radio />}
                  label="Collaborative Work"
                />
                <FormControlLabel
                  value="balanced"
                  control={<Radio />}
                  label="Balanced Mix"
                />
              </RadioGroup>
            </FormControl>

            {/* Salary Range section */}
            <Box>
              <Typography gutterBottom>Desired Salary Range</Typography>
              <Slider
                value={formData.salaryExpectation}
                onChange={(_, newValue) =>
                  setFormData({ ...formData, salaryExpectation: newValue })
                }
                valueLabelDisplay="auto"
                min={500}
                max={200000}
                step={500}
                marks
                sx={{ mb: 3 }}
              />
            </Box>
          </Box>
        );

      case 3:
        return (
          <Box sx={{ mt: 2 }}>
            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend">Preferred Work Environment</FormLabel>
              <RadioGroup 
                value={formData.workEnvironment || 'hybrid'}
                onChange={(e) => setFormData({ ...formData, workEnvironment: e.target.value })}
              >
                <FormControlLabel
                  value="remote"
                  control={<Radio />}
                  label="Remote Work"
                />
                <FormControlLabel
                  value="office"
                  control={<Radio />}
                  label="Office-based"
                />
                <FormControlLabel
                  value="hybrid"
                  control={<Radio />}
                  label="Hybrid"
                />
              </RadioGroup>
            </FormControl>

            <Typography gutterBottom>Work-Life Balance Importance</Typography>
            <Rating
              name="work-life-balance"
              value={formData.workLifeBalance}
              onChange={(_, newValue) =>
                setFormData({ ...formData, workLifeBalance: newValue || 0 })
              }
              size="large"
            />
          </Box>
        );

      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="md" sx={{ mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 2 }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Career Assessment
        </Typography>
        <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
          Let's find the perfect career path for you
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length ? (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Thank you for completing the assessment!
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" paragraph>
              We're analyzing your responses to find the best career matches.
            </Typography>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 2 }}
            >
              Finish Assessment
            </Button>
          </Box>
        ) : (
          <>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
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