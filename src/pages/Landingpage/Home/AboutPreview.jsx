
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  useTheme
} from '@mui/material'

const AboutPreview = () => {
  const theme = useTheme()
  const [homeData, setHomeData] = useState([])

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/home')
        setHomeData(res.data)
      } catch (err) {
        console.error('Error fetching home data:', err)
      }
    }
    fetchHomeData()
  }, [])

  // Extract the sections we need
  const heroSection = homeData.find(item => item.section_key === 'hero_banner')
  const coreServices = homeData.find(item => item.section_key === 'core_services')

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background: 'linear-gradient(180deg, #f7fbff 0%, #eef6ff 100%)'
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={6}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 3,
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${theme.palette.primary.light}20 0%, rgba(255,255,255,0.6) 60%)`
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  mb: 2,
                  color: theme.palette.text.primary
                }}
              >
                {heroSection?.heading ||
                  'We build fintech & digital infrastructure that connects businesses with the future.'}
              </Typography>

              <Typography
                variant="body1"
                sx={{ color: 'text.secondary', mb: 3, maxWidth: 680 }}
              >
                {heroSection?.sub_text ||
                  'Pivora develops payment infrastructure and financial products designed for scale, security, and developer-first integration.'}
              </Typography>

              {heroSection?.cta_text && (
                <Button
                  component={NavLink}
                  to={heroSection?.cta_link || '/about'}
                  variant="contained"
                  size="large"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 700,
                    borderRadius: 2,
                    boxShadow: '0 8px 24px rgba(25,118,210,0.18)'
                  }}
                >
                  {heroSection.cta_text}
                </Button>
              )}
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'center', md: 'flex-end' }
                }}
              >
                <Box
                  sx={{
                    width: { xs: 220, md: 260 },
                    height: { xs: 140, md: 180 },
                    borderRadius: 3,
                    background: 'linear-gradient(135deg,#fff,#f3f6ff)',
                    boxShadow: '0 12px 40px rgba(16,24,40,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2
                  }}
                >
                  {heroSection?.image_url ? (
                    <img
                      src={heroSection.image_url}
                      alt="Hero Banner"
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '12px',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <svg
                      width="86"
                      height="86"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="1"
                        y="3"
                        width="22"
                        height="14"
                        rx="2"
                        stroke="#3b82f6"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M3 21h18"
                        stroke="#93c5fd"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <circle cx="8" cy="10" r="1" fill="#3b82f6" />
                      <circle cx="16" cy="10" r="1" fill="#3b82f6" />
                    </svg>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Display Core Services if available */}
          {coreServices && coreServices.extra_content?.services && (
            <Box sx={{ mt: 6 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, mb: 2, color: theme.palette.primary.main }}
              >
                {coreServices.heading}
              </Typography>
              <Grid container spacing={2}>
                {coreServices.extra_content.services.map((service, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Paper
                      sx={{
                        p: 2,
                        textAlign: 'center',
                        borderRadius: 2,
                        background: '#f9fbff',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {service}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  )
}

export default AboutPreview
