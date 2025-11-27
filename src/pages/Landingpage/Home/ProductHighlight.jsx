import React from 'react'
import { NavLink } from 'react-router-dom'
import { Box, Container, Grid, Typography, Button, Paper, useTheme } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const ProductHighlight = () => {
  const theme = useTheme()
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, background: '#fff' }}>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: { xs: 4, md: 6 }, borderRadius: 3 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
                Introducing Pivora Gateway
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, maxWidth: 680 }}>
                Accept payments globally with instant settlements and full compliance. Pivora Gateway
                provides a secure, scalable platform with multi-channel support, fraud protection,
                and developer-friendly APIs so you can integrate quickly and confidently.
              </Typography>

              <Button
                component={NavLink}
                to="/gateway"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{ textTransform: 'none', fontWeight: 700, borderRadius: 2 }}
              >
                Get Started
              </Button>
            </Grid>

            <Grid item xs={12} md={5}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
                <Box
                  sx={{
                    width: { xs: 260, md: 320 },
                    height: { xs: 160, md: 200 },
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}22, ${theme.palette.primary.light}11)`,
                    boxShadow: '0 12px 40px rgba(16,24,40,0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 2
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    Multi-channel
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                    Cards · UPI · Wallets · Netbanking
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}

export default ProductHighlight