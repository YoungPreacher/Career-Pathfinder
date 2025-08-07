import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  WorkOutline,
  TrendingUp,
  School,
  AttachMoney,
  Star,
} from '@mui/icons-material';

function Dashboard() {
  // Mock data - replace with actual API data
  const careerMatches = [
    {
      title: 'Software Developer',
      matchScore: 95,
      salary: '$80,000 - $120,000',
      growth: '22% (Much faster than average)',
      skills: ['JavaScript', 'React', 'Node.js', 'Python'],
    },
    {
      title: 'Data Scientist',
      matchScore: 88,
      salary: '$90,000 - $140,000',
      growth: '31% (Much faster than average)',
      skills: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
    },
    {
      title: 'UX Designer',
      matchScore: 85,
      salary: '$70,000 - $110,000',
      growth: '13% (Faster than average)',
      skills: ['UI Design', 'User Research', 'Prototyping', 'Figma'],
    },
  ];

  const learningPaths = [
    'Complete a Full-Stack Development Bootcamp',
    'Take Advanced JavaScript Courses',
    'Learn Cloud Computing Fundamentals',
    'Get AWS Certification',
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" gutterBottom>
              Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Here are your personalized career recommendations based on your assessment.
            </Typography>
          </Paper>
        </Grid>

        {/* Top Career Matches */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Top Career Matches
          </Typography>
          <Grid container spacing={3}>
            {careerMatches.map((career, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      transition: 'transform 0.2s ease-in-out',
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {career.title}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Match Score
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={career.matchScore}
                            sx={{ height: 8, borderRadius: 5 }}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {career.matchScore}%
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <AttachMoney sx={{ verticalAlign: 'bottom' }} />
                      {career.salary}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <TrendingUp sx={{ verticalAlign: 'bottom' }} />
                      {career.growth}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" gutterBottom>
                        Key Skills:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {career.skills.map((skill, idx) => (
                          <Chip
                            key={idx}
                            label={skill}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Skill Development */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Recommended Learning Path
            </Typography>
            <List>
              {learningPaths.map((path, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <School color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={path} />
                </ListItem>
              ))}
            </List>
            <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
              View All Recommendations
            </Button>
          </Paper>
        </Grid>

        {/* Market Insights */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Market Insights
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <TrendingUp color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Tech Industry Growth"
                  secondary="15% increase in job openings compared to last year"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Star color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="In-Demand Skills"
                  secondary="Cloud Computing, AI/ML, and Data Analytics are trending"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <WorkOutline color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Remote Work Trends"
                  secondary="70% of tech companies now offer hybrid work options"
                />
              </ListItem>
            </List>
            <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
              View Detailed Insights
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;