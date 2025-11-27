// import React from 'react'

// const HeroBanner = () => {
//   return (
//     <div>HeroBanner</div>
//   )
// }

// export default HeroBanner

import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Rightimg from '../../../assets/Home/image.png'

const HeroBanner = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: '90vh', md: '92vh' },
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 4, md: 0 }
      }}
    >
      {/* Animated Background Shapes */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'float 8s ease-in-out infinite'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-15%',
          left: '-5%',
          width: '600px',
          height: '600px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          animation: 'float 10s ease-in-out infinite reverse'
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Announcement Banner */}
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            px: 3,
            py: 1,
            borderRadius: '50px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            mb: 4,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              transform: 'translateY(-2px)'
            }
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '0.875rem'
            }}
          >
            Pivora named a Leader in the IDC MarketScape
          </Typography>
          <Typography
            component="span"
            sx={{
              color: '#ffffff',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}
          >
            Read more
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Typography>
        </Box>

        <Grid container spacing={6} alignItems="center">
          {/* Left Content */}
          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5rem' },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  mb: 3,
                  color: '#2c3e50'
                }}
              >
                Financial
                <br />
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'block'
                  }}
                >
                  infrastructure
                </Box>
                <Box
                  component="span"
                  sx={{
                    color: '#1976d2'
                  }}
                >
                  to grow your
                  <br />
                  revenue
                </Box>
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  color: 'rgba(255, 255, 255, 0.95)',
                  mb: 4,
                  fontWeight: 400,
                  maxWidth: '540px',
                  lineHeight: 1.6
                }}
              >
                Empower your business with cutting-edge technology solutions.
                Scale faster, operate efficiently, and unlock new revenue streams.
              </Typography>

              {/* CTA Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexDirection: { xs: 'column', sm: 'row' },
                  mb: 4
                }}
              >
                <Button
                  component={NavLink}
                  to="/gateway"
                  variant="contained"
                  size="large"
                  disableElevation
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    px: 4,
                    py: 1.75,
                    fontSize: '1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: '12px',
                    backgroundColor: '#2c3e50',
                    color: '#ffffff',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#1a252f',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
                    }
                  }}
                >
                  Start now
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  sx={{
                    px: 4,
                    py: 1.75,
                    fontSize: '1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: '12px',
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                    color: '#ffffff',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.6)',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Watch demo
                </Button>
              </Box>

              {/* Trust Indicators */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 3,
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.875rem'
                  }}
                >
                  Trusted by industry leaders
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right Content - Full Image Display */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: { xs: '300px', md: '600px' }
              }}
            >
              {/* Full Image Background */}
              <Box
                component="img"
                src={Rightimg}
                alt="Hero Visual"
                sx={{
                  width: '100%',
                  ml: '90%',
                  mb: '20%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '24px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* CSS Animation */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default HeroBanner;