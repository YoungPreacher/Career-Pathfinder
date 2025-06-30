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

const steps = ['Basic Information', 'Skills & Experience', 'Interests & Preferences', 'Work Environment'];

function Assessment() {
  const [activeStep, setActiveStep] = useState(0);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [formData, setFormData] = useState({
    workExperience: '',
    education: '',
    interests: [],
    workStyle: '',
    workEnvironment: '',
    salaryExpectation: [50000, 100000],
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
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const handleSkillDelete = (skillToDelete) => {
    setSkills(skills.filter((skill) => skill !== skillToDelete));
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
            />
            <TextField
              fullWidth
              label="Years of Experience"
              type="number"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Education Level"
              select
              margin="normal"
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
          <Box sx={{ mt: 2 }}>
            <Typography gutterBottom>How much do you enjoy problem-solving?</Typography>
            <Rating
              name="problem-solving"
              defaultValue={3}
              size="large"
              sx={{ mb: 3 }}
            />

            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend">Preferred Work Style</FormLabel>
              <RadioGroup defaultValue="balanced">
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

            <Typography gutterBottom>Desired Salary Range</Typography>
            <Slider
              value={formData.salaryExpectation}
              onChange={(_, newValue) =>
                setFormData({ ...formData, salaryExpectation: newValue })
              }
              valueLabelDisplay="auto"
              min={30000}
              max={200000}
              step={5000}
              marks
              sx={{ mb: 3 }}
            />
          </Box>
        );

      case 3:
        return (
          <Box sx={{ mt: 2 }}>
            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend">Preferred Work Environment</FormLabel>
              <RadioGroup defaultValue="hybrid">
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
              onClick={() => setActiveStep(0)}
              sx={{ mt: 2 }}
            >
              Start Over
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