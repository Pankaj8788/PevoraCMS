import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Skeleton,
  Alert,
  useTheme,
  useMediaQuery,
  Stack,
  Paper
} from '@mui/material';
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  Award, 
  ArrowRight,
  Sparkles,
  Target,
  Zap
} from 'lucide-react';

const BASE_URL = 'https://testapicms.pvorasp.com/api/';

const CareersHero = () => {
  const [careerData, setCareerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchCareerData();
  }, []);

  const fetchCareerData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}public/career`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch career data');
      }
      
      const data = await response.json();
      console.log('Fetched career data:', data);
      setCareerData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching career data:', err);
    } finally {
      setLoading(false);
    }
  };

  const stripHtml = (html) => {
    if (!html) return '';
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const features = [
    {
      icon: <Users size={28} />,
      title: 'Amazing Team',
      description: 'Work with talented professionals'
    },
    {
      icon: <TrendingUp size={28} />,
      title: 'Career Growth',
      description: 'Continuous learning opportunities'
    },
    {
      icon: <Award size={28} />,
      title: 'Recognition',
      description: 'Your work matters and is valued'
    },
    {
      icon: <Zap size={28} />,
      title: 'Innovation',
      description: 'Be part of cutting-edge projects'
    }
  ];

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          py: 8,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Skeleton variant="text" width="80%" height={80} />
              <Skeleton variant="text" width="60%" height={40} sx={{ mt: 2 }} />
              <Skeleton variant="rectangular" width={200} height={50} sx={{ mt: 4, borderRadius: 2 }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 4 }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Alert severity="error" sx={{ borderRadius: 2 }}>
            {error}
          </Alert>
        </Container>
      </Box>
    );
  }

  if (!careerData) {
    return (
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            No career information available.
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: { xs: 'auto', md: '90vh' },
        display: 'flex',
        alignItems: 'center',
        py: { xs: 8, md: 12 },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          display: { xs: 'none', md: 'block' }
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          {/* Left Content */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                animation: 'fadeInUp 0.8s ease-out',
                '@keyframes fadeInUp': {
                  '0%': {
                    opacity: 0,
                    transform: 'translateY(30px)'
                  },
                  '100%': {
                    opacity: 1,
                    transform: 'translateY(0)'
                  }
                }
              }}
            >
              {/* Subtitle Badge */}
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  px: 2.5,
                  py: 1,
                  borderRadius: 50,
                  mb: 3,
                  border: '1px solid rgba(255,255,255,0.3)'
                }}
              >
                <Sparkles size={18} color="#FFD700" />
                <Typography
                  variant="caption"
                  sx={{
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    letterSpacing: '0.5px'
                  }}
                >
                  Join Our Team
                </Typography>
              </Box>

              {/* Main Heading */}
              <Typography
                variant={isMobile ? 'h3' : 'h2'}
                sx={{
                  fontWeight: 900,
                  color: 'white',
                  mb: 3,
                  lineHeight: 1.2,
                  textShadow: '2px 2px 10px rgba(0,0,0,0.2)',
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' }
                }}
              >
                {careerData.heading}
              </Typography>

              {/* Content */}
              <Typography
                variant={isMobile ? 'body1' : 'h6'}
                sx={{
                  color: 'rgba(255,255,255,0.95)',
                  mb: 4,
                  lineHeight: 1.8,
                  fontWeight: 400,
                  maxWidth: 550,
                  textShadow: '1px 1px 5px rgba(0,0,0,0.1)'
                }}
              >
                {stripHtml(careerData.content)}
              </Typography>

              {/* CTA Buttons */}
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ mb: 5 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowRight />}
                  sx={{
                    bgcolor: 'white',
                    color: '#667eea',
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 700,
                    borderRadius: 2,
                    textTransform: 'none',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'white',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 12px 30px rgba(0,0,0,0.3)'
                    }
                  }}
                >
                  View Open Positions
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.5)',
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    textTransform: 'none',
                    backdropFilter: 'blur(10px)',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.2)',
                      transform: 'translateY(-3px)'
                    }
                  }}
                >
                  Learn More
                </Button>
              </Stack>

              {/* Stats */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 4,
                  flexWrap: 'wrap',
                  pt: 3,
                  borderTop: '1px solid rgba(255,255,255,0.2)'
                }}
              >
                {[
                  { value: '500+', label: 'Employees' },
                  { value: '50+', label: 'Open Positions' },
                  { value: '4.8★', label: 'Glassdoor Rating' }
                ].map((stat, index) => (
                  <Box key={index}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 900,
                        color: 'white',
                        mb: 0.5
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'rgba(255,255,255,0.8)',
                        fontWeight: 500,
                        fontSize: '0.875rem'
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Right Content - Features Grid */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                animation: 'fadeInRight 0.8s ease-out 0.2s backwards',
                '@keyframes fadeInRight': {
                  '0%': {
                    opacity: 0,
                    transform: 'translateX(30px)'
                  },
                  '100%': {
                    opacity: 1,
                    transform: 'translateX(0)'
                  }
                }
              }}
            >
              <Grid container spacing={2}>
                {features.map((feature, index) => (
                  <Grid item xs={6} key={index}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        height: '100%',
                        bgcolor: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: 3,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.25)',
                          transform: 'translateY(-8px)',
                          boxShadow: '0 12px 30px rgba(0,0,0,0.2)'
                        }
                      }}
                    >
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          bgcolor: 'rgba(255,255,255,0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 2,
                          color: 'white'
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: 'white',
                          mb: 1,
                          fontSize: '1.1rem'
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(255,255,255,0.85)',
                          lineHeight: 1.6
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              {/* Decorative Element */}
              <Box
                sx={{
                  mt: 4,
                  p: 3,
                  bgcolor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}
              >
                <Target size={32} color="white" />
                <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'white',
                      fontWeight: 600,
                      mb: 0.5
                    }}
                  >
                    Ready to make an impact?
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.85)'
                    }}
                  >
                    Explore opportunities that match your passion
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Floating Animation Elements */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite',
          display: { xs: 'none', md: 'block' },
          '@keyframes float': {
            '0%, 100%': {
              transform: 'translateY(0px)'
            },
            '50%': {
              transform: 'translateY(-20px)'
            }
          }
        }}
      />
    </Box>
  );
};

export default CareersHero;