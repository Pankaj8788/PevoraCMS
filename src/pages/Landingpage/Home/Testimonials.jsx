import React, { useEffect, useState } from 'react'
import apiFetch from '../../../services/api'
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Rating,
  CircularProgress
} from '@mui/material'

// Component expects a CMS endpoint at `/api/testimonials` returning an array of
// { name, role, quote, rating, avatar } objects. If no CMS is available, it
// falls back to sample data.

const SAMPLE = [
  {
    name: 'Amit Shah',
    role: 'Head of Finance, RetailCo',
    quote: 'Pivora Gateway simplified our payments and improved settlement times dramatically.',
    rating: 5
  },
  {
    name: 'Sara Kapoor',
    role: 'CTO, EduPlatform',
    quote: 'Integration was fast, the APIs are well documented and robust.',
    rating: 5
  },
  {
    name: 'Michael Lee',
    role: 'COO, TravelNow',
    quote: 'Reliable payouts and excellent support — important for our global business.',
    rating: 4
  }
]

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function load() {
      try {
        const res = await apiFetch('/testimonials')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        if (mounted && Array.isArray(data) && data.length) {
          setTestimonials(data)
        } else if (mounted) {
          setTestimonials(SAMPLE)
        }
      } catch {
        if (mounted) setTestimonials(SAMPLE)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, background: '#f7fbff' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
          What our clients say
        </Typography>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        )}

        {!loading && (
          <Grid container spacing={3}>
            {(testimonials || SAMPLE).map((t, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card sx={{ height: '100%', borderRadius: 2, boxShadow: '0 8px 30px rgba(16,24,40,0.06)' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
                      <Avatar src={t.avatar || undefined} alt={t.name} sx={{ width: 56, height: 56 }} />
                      <Box>
                        <Typography sx={{ fontWeight: 700 }}>{t.name}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{t.role}</Typography>
                      </Box>
                    </Box>

                    <Typography variant="body1" sx={{ mb: 2 }}>&ldquo;{t.quote}&ldquo;</Typography>

                    <Rating value={t.rating || 5} precision={0.5} readOnly />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  )
}

export default Testimonials