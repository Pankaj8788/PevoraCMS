import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Pivora Gateway', path: '/gateway' },
    { label: 'Blog', path: '/blog' },
    { label: 'Careers', path: '/careers' },
    { label: 'Contact', path: '/contact' },
    { label: 'Login', path: '/login' }
  ];

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleDrawerLinkClick = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          backgroundColor: '#ffffff',
          borderBottom: '1px solid',
          borderColor: 'rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(8px)'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar 
            disableGutters
            sx={{ 
              minHeight: { xs: 64, md: 72 },
              justifyContent: 'space-between'
            }}
          >
            {/* Logo/Brand */}
            <NavLink 
              to="/" 
              style={{ 
                textDecoration: 'none', 
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px 0 rgba(25, 118, 210, 0.25)'
                }}
              >
                <RocketLaunchIcon sx={{ color: '#fff', fontSize: 24 }} />
              </Box>
              <Typography 
                variant="h6" 
                component="div"
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '1.1rem', md: '1.35rem' },
                  letterSpacing: '-0.5px'
                }}
              >
                Pivora Global Technology
              </Typography>
            </NavLink>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {navigationItems.map((item) => (
                  <Button
                    key={item.path}
                    component={NavLink}
                    to={item.path}
                    end={item.path === '/'}
                    sx={{
                      color: '#616161',
                      textTransform: 'none',
                      fontSize: '0.9375rem',
                      fontWeight: 500,
                      px: 2,
                      py: 1,
                      borderRadius: '8px',
                      position: 'relative',
                      transition: 'all 0.2s ease',
                      '&.active': {
                        color: '#1976d2',
                        fontWeight: 600,
                        backgroundColor: 'rgba(25, 118, 210, 0.08)'
                      },
                      '&:hover': {
                        color: '#1976d2',
                        backgroundColor: 'rgba(25, 118, 210, 0.04)'
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
                
                {/* CTA Button */}
                <Button
                  component={NavLink}
                  to="/login"
                  variant="contained"
                  disableElevation
                  sx={{
                    ml: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.9375rem',
                    px: 3,
                    py: 1,
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
                    }
                  }}
                >
                  Get Started
                </Button>
              </Box>
            )}

            {/* Mobile Menu Icon */}
            {isMobile && (
              <IconButton
                edge="end"
                onClick={toggleDrawer(true)}
                sx={{ 
                  color: '#1976d2',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.08)'
                  }
                }}
              >
                <MenuIcon sx={{ fontSize: 28 }} />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 300,
            background: '#ffffff'
          }
        }}
      >
        {/* Drawer Header */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2.5,
            borderBottom: '1px solid',
            borderColor: 'rgba(0, 0, 0, 0.08)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <RocketLaunchIcon sx={{ color: '#fff', fontSize: 20 }} />
            </Box>
            <Typography 
              variant="subtitle1"
              sx={{ 
                fontWeight: 700,
                color: '#1976d2',
                fontSize: '1rem'
              }}
            >
              Pivora
            </Typography>
          </Box>
          <IconButton 
            onClick={toggleDrawer(false)}
            sx={{ 
              color: '#616161',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Drawer Navigation */}
        <List sx={{ px: 2, py: 3 }}>
          {navigationItems.map((item) => (
            <ListItemButton
              key={item.path}
              component={NavLink}
              to={item.path}
              end={item.path === '/'}
              onClick={handleDrawerLinkClick}
              sx={{
                py: 1.5,
                px: 2,
                mb: 0.5,
                borderRadius: '8px',
                color: '#616161',
                fontWeight: 500,
                transition: 'all 0.2s ease',
                '&.active': {
                  color: '#1976d2',
                  fontWeight: 600,
                  backgroundColor: 'rgba(25, 118, 210, 0.1)',
                  borderLeft: '3px solid #1976d2',
                  pl: 1.75
                },
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.04)',
                  color: '#1976d2'
                }
              }}
            >
              <Typography variant="body1" sx={{ fontSize: '0.9375rem', fontWeight: 'inherit' }}>
                {item.label}
              </Typography>
            </ListItemButton>
          ))}
        </List>

        {/* Mobile CTA Button */}
        <Box sx={{ px: 3, pb: 3 }}>
          <Button
            component={NavLink}
            to="/login"
            variant="contained"
            fullWidth
            disableElevation
            onClick={handleDrawerLinkClick}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.9375rem',
              py: 1.5,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
              }
            }}
          >
            Get Started
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;