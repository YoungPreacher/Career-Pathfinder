import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useScrollTrigger,
  Slide,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
// Removed dashboard

// Hide AppBar on scroll down
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  // Check if the current path matches the button path
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <HideOnScroll>
      <AppBar position="sticky" color="primary" elevation={4}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.05)' }
              }} 
              onClick={() => navigate('/')}
            >
              <ExploreIcon sx={{ mr: 1, fontSize: 28 }} />
              <Typography variant="h5" component="div" fontWeight="bold">
                Career-Pathfinder
              </Typography>
            </Box>
            
            {isMobile ? (
              <>
                <IconButton
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenuOpen}
                  edge="end"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  PaperProps={{
                    elevation: 3,
                    sx: { borderRadius: 2, mt: 1, minWidth: 180 }
                  }}
                >
                  <MenuItem 
                    onClick={() => handleNavigation('/')}
                    selected={isActive('/')}
                    sx={{ py: 1.5 }}
                  >
                    <HomeIcon sx={{ mr: 1.5 }} /> Home
                  </MenuItem>
                  <MenuItem 
                    onClick={() => handleNavigation('/assessment')}
                    selected={isActive('/assessment')}
                    sx={{ py: 1.5 }}
                  >
                    <AssessmentIcon sx={{ mr: 1.5 }} /> Assessment
                  </MenuItem>
                  <Divider />
                  
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Tooltip title="Home" arrow>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/"
                    startIcon={<HomeIcon />}
                    sx={{
                      fontWeight: isActive('/') ? 700 : 500,
                      borderBottom: isActive('/') ? '3px solid white' : 'none',
                      borderRadius: 0,
                      pb: 0.5,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderBottom: !isActive('/') ? '3px solid rgba(255, 255, 255, 0.3)' : '3px solid white',
                      }
                    }}
                  >
                    Home
                  </Button>
                </Tooltip>
                <Tooltip title="Take Assessment" arrow>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/assessment"
                    startIcon={<AssessmentIcon />}
                    sx={{
                      fontWeight: isActive('/assessment') ? 700 : 500,
                      borderBottom: isActive('/assessment') ? '3px solid white' : 'none',
                      borderRadius: 0,
                      pb: 0.5,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderBottom: !isActive('/assessment') ? '3px solid rgba(255, 255, 255, 0.3)' : '3px solid white',
                      }
                    }}
                  >
                    Assessment
                  </Button>
                </Tooltip>
                
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
}

export default Navbar;