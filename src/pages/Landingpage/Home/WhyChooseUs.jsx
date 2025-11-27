import React from 'react'
import { Box, Container, Grid, Typography, useTheme } from '@mui/material'
import SecurityIcon from '@mui/icons-material/Security'
import CloudQueueIcon from '@mui/icons-material/CloudQueue'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'

const items = [
  {
    title: 'Secure',
    text: 'Bank-grade security, encryption and fraud protection across all layers.',
    icon: <SecurityIcon fontSize="large" />
  },
  {
    title: 'Scalable',
    text: 'Horizontal scaling and resilient architecture to handle peak volume.',
    icon: <CloudQueueIcon fontSize="large" />
  },
  {
    title: 'Reliable',
    text: '99.99% uptime SLAs, real-time monitoring and observability.',
    icon: <CheckCircleIcon fontSize="large" />
  },
  {
    title: 'Global Support',
    text: '24/7 regional support and onboarding assistance for merchants.',
    icon: <SupportAgentIcon fontSize="large" />
  }
]

const WhyChooseUs = () => {
  const theme = useTheme()
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, background: '#ffffff' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
          Why Choose Pivora
        </Typography>

        <Grid container spacing={3}>
          {items.map((it) => (
            <Grid key={it.title} item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  p: 3,
                  borderRadius: 2,
                  textAlign: 'left',
                  transition: 'transform 0.24s ease, box-shadow 0.24s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 12px 40px rgba(16,24,40,0.08)'
                  }
                }}
              >
                <Box sx={{ color: theme.palette.primary.main }}>{it.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {it.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {it.text}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default WhyChooseUs