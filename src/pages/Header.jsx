
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
import Logo from '../assets/Header/Pevora.jpg';

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
          background: 'linear-gradient(135deg, rgba(15,32,39,0.98) 0%, rgba(32,58,67,0.98) 100%)',
          borderBottom: '1px solid rgba(0,255,200,0.2)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
          width: '100%',
          margin: 0,
          padding: 0
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 3 } }}>
          <Toolbar 
            disableGutters
            sx={{ 
              minHeight: { xs: 70, md: 80 },
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
                gap: '12px'
              }}
            >
              <Box
                sx={{
                  width: { xs: 42, md: 48 },
                  height: { xs: 42, md: 48 },
                  background: 'linear-gradient(135deg, #00ffc8 0%, #00a8ff 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(0,255,200,0.3)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
                    animation: 'shine 3s infinite'
                  }
                }}
              >
                <img
    src={Logo}
    alt="Pivora Logo"
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '12px'
    }}
  />
              </Box>
              <Typography 
                variant="h6" 
                component="div"
                sx={{ 
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #00ffc8 0%, #ffffff 50%, #00a8ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '1.1rem', md: '1.4rem' },
                  letterSpacing: '-0.5px',
                  textShadow: '0 0 30px rgba(0,255,200,0.3)'
                }}
              >
                Pevora Global Technology
              </Typography>
            </NavLink>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {navigationItems.slice(0, -1).map((item) => (
                  <Button
                    key={item.path}
                    component={NavLink}
                    to={item.path}
                    end={item.path === '/'}
                    sx={{
                      color: 'rgba(255,255,255,0.8)',
                      textTransform: 'none',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      px: 2.5,
                      py: 1,
                      borderRadius: '10px',
                      position: 'relative',
                      transition: 'all 0.3s ease',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: '2px',
                        background: 'linear-gradient(90deg, #00ffc8, #00a8ff)',
                        transition: 'width 0.3s ease'
                      },
                      '&.active': {
                        color: '#00ffc8',
                        fontWeight: 600,
                        background: 'rgba(0,255,200,0.1)',
                        '&::before': {
                          width: '70%'
                        }
                      },
                      '&:hover': {
                        color: '#00ffc8',
                        background: 'rgba(0,255,200,0.08)',
                        transform: 'translateY(-2px)',
                        '&::before': {
                          width: '70%'
                        }
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
                
                {/* CTA Buttons */}
                <Button
                  component={NavLink}
                  to="/login"
                  variant="outlined"
                  sx={{
                    ml: 1,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    px: 3,
                    py: 1,
                    borderRadius: '10px',
                    color: '#00ffc8',
                    borderColor: 'rgba(0,255,200,0.4)',
                    borderWidth: '1.5px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#00ffc8',
                      background: 'rgba(0,255,200,0.1)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(0,255,200,0.25)'
                    }
                  }}
                >
                  Login
                </Button>

                <Button
                  variant="contained"
                  disableElevation
                  sx={{
                    ml: 1.5,
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    px: 3.5,
                    py: 1,
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #00ffc8 0%, #00a8ff 100%)',
                    color: '#0a1f2e',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 6px 20px rgba(0,255,200,0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #00e6b8 0%, #0096e6 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 30px rgba(0,255,200,0.5)'
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
                  color: '#00ffc8',
                  background: 'rgba(0,255,200,0.1)',
                  borderRadius: '10px',
                  padding: '10px',
                  '&:hover': {
                    background: 'rgba(0,255,200,0.2)',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                <MenuIcon sx={{ fontSize: 28 }} />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '85%', sm: 340 },
            maxWidth: '400px',
            background: 'linear-gradient(180deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
            borderLeft: '1px solid rgba(0,255,200,0.2)',
            boxShadow: '-10px 0 40px rgba(0,0,0,0.5)'
          }
        }}
      >
        {/* Drawer Header */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 3,
            borderBottom: '1px solid rgba(0,255,200,0.2)',
            background: 'rgba(0,255,200,0.05)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                background: 'linear-gradient(135deg, #00ffc8 0%, #00a8ff 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 20px rgba(0,255,200,0.3)'
              }}
            >
              <RocketLaunchIcon sx={{ color: '#0a1f2e', fontSize: 22, fontWeight: 'bold' }} />
            </Box>
            <Typography 
              variant="subtitle1"
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #00ffc8 0%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '1.1rem'
              }}
            >
              Pivora
            </Typography>
          </Box>
          <IconButton 
            onClick={toggleDrawer(false)}
            sx={{ 
              color: 'rgba(255,255,255,0.8)',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              '&:hover': {
                background: 'rgba(255,255,255,0.15)',
                color: '#00ffc8'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Drawer Navigation */}
        <List sx={{ px: 2.5, py: 3, flexGrow: 1 }}>
          {navigationItems.map((item, ) => (
            <ListItemButton
              key={item.path}
              component={NavLink}
              to={item.path}
              end={item.path === '/'}
              onClick={handleDrawerLinkClick}
              sx={{
                py: 1.8,
                px: 2.5,
                mb: 1,
                borderRadius: '12px',
                color: 'rgba(255,255,255,0.8)',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: '3px',
                  background: 'linear-gradient(180deg, #00ffc8, #00a8ff)',
                  transform: 'scaleY(0)',
                  transition: 'transform 0.3s ease'
                },
                '&.active': {
                  color: '#00ffc8',
                  fontWeight: 700,
                  background: 'rgba(0,255,200,0.15)',
                  boxShadow: '0 4px 15px rgba(0,255,200,0.2)',
                  '&::before': {
                    transform: 'scaleY(1)'
                  }
                },
                '&:hover': {
                  background: 'rgba(0,255,200,0.1)',
                  color: '#00ffc8',
                  transform: 'translateX(5px)',
                  '&::before': {
                    transform: 'scaleY(1)'
                  }
                }
              }}
            >
              <Typography variant="body1" sx={{ fontSize: '0.95rem', fontWeight: 'inherit' }}>
                {item.label}
              </Typography>
            </ListItemButton>
          ))}
        </List>

        {/* Mobile CTA Buttons */}
        <Box sx={{ px: 3, pb: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            component={NavLink}
            to="/login"
            variant="outlined"
            fullWidth
            onClick={handleDrawerLinkClick}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              py: 1.5,
              borderRadius: '12px',
              color: '#00ffc8',
              borderColor: 'rgba(0,255,200,0.5)',
              borderWidth: '1.5px',
              '&:hover': {
                borderColor: '#00ffc8',
                background: 'rgba(0,255,200,0.1)',
                boxShadow: '0 4px 15px rgba(0,255,200,0.25)'
              }
            }}
          >
            Login
          </Button>

          <Button
            variant="contained"
            fullWidth
            disableElevation
            onClick={handleDrawerLinkClick}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '0.95rem',
              py: 1.5,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #00ffc8 0%, #00a8ff 100%)',
              color: '#0a1f2e',
              boxShadow: '0 6px 20px rgba(0,255,200,0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #00e6b8 0%, #0096e6 100%)',
                boxShadow: '0 8px 30px rgba(0,255,200,0.5)'
              }
            }}
          >
            Get Started
          </Button>
        </Box>

        {/* Decorative Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '30%',
            right: '-50px',
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(0,255,200,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            pointerEvents: 'none'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            left: '-50px',
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(0,168,255,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            pointerEvents: 'none'
          }}
        />
      </Drawer>

      <style>
        {`
          @keyframes shine {
            0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
            100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
          }
        `}
      </style>
    </>
  );
};

export default Header;