import React, { useEffect, useState } from 'react'
import { Box, Container, Link, CircularProgress, Typography } from '@mui/material'
import apiFetch from '../../../services/api'

// A simple, dependency-free horizontal marquee carousel for partner logos.
// Fetches from `/api/partners` expecting: [{ name, logo, url }]
// Falls back to inline SAMPLE data when the CMS is unavailable.

const SAMPLE = [
  { name: 'RetailCo', logo: 'https://via.placeholder.com/180x60?text=RetailCo', url: '#' },
  { name: 'EduPlatform', logo: 'https://via.placeholder.com/180x60?text=EduPlatform', url: '#' },
  { name: 'TravelNow', logo: 'https://via.placeholder.com/180x60?text=TravelNow', url: '#' },
  { name: 'FinServe', logo: 'https://via.placeholder.com/180x60?text=FinServe', url: '#' },
  { name: 'ShopEasy', logo: 'https://via.placeholder.com/180x60?text=ShopEasy', url: '#' },
  { name: 'GlobalPay', logo: 'https://via.placeholder.com/180x60?text=GlobalPay', url: '#' }
]

const PartnerLogos = () => {
  const [partners, setPartners] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function load() {
      try {
        const res = await apiFetch('/partners')
        if (!res.ok) throw new Error('no-cms')
        const data = await res.json()
        if (mounted && Array.isArray(data) && data.length) setPartners(data)
        else if (mounted) setPartners(SAMPLE)
      } catch {
        if (mounted) setPartners(SAMPLE)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()
    return () => {
      mounted = false
    }
  }, [])

  const items = (partners || SAMPLE)
  // duplicate list to create a seamless scrolling effect
  const loop = [...items, ...items]

  return (
    <Box component="section" sx={{ py: { xs: 4, md: 8 }, background: 'transparent' }}>
      <Container maxWidth="lg">
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Trusted by merchants & partners</Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ position: 'relative', overflow: 'hidden' }}>
            <style>{`
              .partner-marquee{ --gap:24px; }
              .partner-track{ display:flex; gap:var(--gap); align-items:center; width:max-content; animation:marquee 20s linear infinite; }
              .partner-item{ display:flex; align-items:center; justify-content:center; padding:8px 12px; }
              .partner-item img{ height:56px; object-fit:contain; filter:grayscale(0.05); }
              .partner-track:hover{ animation-play-state:paused; }
              @keyframes marquee{ 0%{ transform:translateX(0);} 100%{ transform:translateX(-50%);} }
              @media (max-width:600px){ .partner-item img{ height:40px; } .partner-track{ gap:16px; } }
            `}</style>

            <Box className="partner-marquee">
              <Box className="partner-track" sx={{ py: 1 }}>
                {loop.map((p, i) => (
                  <Box className="partner-item" key={i} sx={{ minWidth: 160 }}>
                    <Link href={p.url || '#'} target="_blank" rel="noopener noreferrer" aria-label={p.name} sx={{ display: 'block' }}>
                      <img src={p.logo} alt={p.name} />
                    </Link>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default PartnerLogos