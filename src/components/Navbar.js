import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';

function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" color="primary" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box 
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} 
            onClick={() => navigate('/')}
          >
            <ExploreIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="div">
              Career-Pathfinder
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/signup"
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'secondary.dark',
                },
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;