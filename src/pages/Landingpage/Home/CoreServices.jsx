import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  useTheme
} from '@mui/material'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'
import ApiIcon from '@mui/icons-material/Api'
import GavelIcon from '@mui/icons-material/Gavel'
import CloudQueueIcon from '@mui/icons-material/CloudQueue'

const services = [
  {
    title: 'Fintech Integration',
    desc: 'Connect with banks, wallets, and payment rails for seamless fund flows.',
    icon: <SettingsSuggestIcon fontSize="large" color="primary" />
  },
  {
    title: 'Payment Gateway Setup',
    desc: 'Fast onboarding and configuration to start accepting payments globally.',
    icon: <CreditCardIcon fontSize="large" color="primary" />
  },
  {
    title: 'API Development',
    desc: 'Developer-first REST APIs and SDKs for quick integration and testing.',
    icon: <ApiIcon fontSize="large" color="primary" />
  },
  {
    title: 'Compliance Consulting',
    desc: 'Guidance for PCI-DSS, RBI regulations, and security best practices.',
    icon: <GavelIcon fontSize="large" color="primary" />
  },
  {
    title: 'Cloud & Security Solutions',
    desc: 'Scalable cloud architecture with strong encryption and observability.',
    icon: <CloudQueueIcon fontSize="large" color="primary" />
  }
]

const CoreServices = () => {
  const theme = useTheme()
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, background: '#f8fbff' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
          Core Services
        </Typography>

        <Grid container spacing={3}>
          {services.map((s) => (
            <Grid item xs={12} sm={6} md={4} key={s.title}>
              <Card sx={{ height: '100%', borderRadius: 3, boxShadow: '0 8px 30px rgba(16,24,40,0.06)' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ color: theme.palette.primary.main }}>{s.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{s.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>{s.desc}</Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                  <Button component={NavLink} to="/services" size="small" sx={{ textTransform: 'none' }}>
                    Learn more
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default CoreServices