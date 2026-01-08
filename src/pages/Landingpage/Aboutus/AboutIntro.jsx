// import { Box } from '@mui/material'
// import React from 'react'

// const AboutIntro = () => {
//   return (
//     <Box>Hello Aboutus</Box>
//   )
// }

// export default AboutIntro

// //my url is-'public/about' and my BaseUrl-'https://testapicms.pvorasp.com/api/'..get this type of responce-{
// //     "id": 1,
// //     "heading": "Mission and Vision",
// //     "content": "<p>Your HTML content here</p>",
// //     "image": "1764046919408-356044580.png",
// //     "createdAt": "2025-11-25T10:30:45.000Z",
// //     "updatedAt": "2025-11-25T05:01:59.000Z"
// // }....now i want a ui design according to my responce with very attrative in design according to fintech web

import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Skeleton } from '@mui/material';

const AboutIntro = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://testapicms.pvorasp.com/api/public/about');
        if (!response.ok) throw new Error('Failed to fetch');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#0a0e27', py: 8 }}>
        <Container maxWidth="lg">
          <Skeleton variant="rectangular" height={400} sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 4 }} />
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#0a0e27', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  // Use the image URL directly if it's a full URL, otherwise construct it
  const imageUrl = data?.image
    ? (data.image.startsWith('http') ? data.image : `https://testapicms.pvorasp.com/api/uploads/${data.image}`)
    : null;

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: '#0a0e27',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background gradient */}
      <Box sx={{
        position: 'absolute',
        top: '-50%',
        right: '-20%',
        width: '60%',
        height: '60%',
        background: 'radial-gradient(circle, rgba(0,230,118,0.15) 0%, transparent 70%)',
        filter: 'blur(80px)',
        animation: 'float 20s ease-in-out infinite',
        '@keyframes float': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-100px, 100px)' }
        }
      }} />
      
      <Box sx={{
        position: 'absolute',
        bottom: '-30%',
        left: '-10%',
        width: '50%',
        height: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
        filter: 'blur(80px)',
        animation: 'float 15s ease-in-out infinite reverse',
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 10 }}>
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="overline" 
            sx={{ 
              color: '#00e676',
              letterSpacing: 3,
              fontWeight: 600,
              fontSize: '0.875rem',
              display: 'block',
              mb: 2
            }}
          >
            ABOUT US
          </Typography>
          <Typography 
            variant="h2" 
            sx={{ 
              color: '#fff',
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '3.5rem' },
              mb: 2,
              background: 'linear-gradient(135deg, #fff 0%, #00e676 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {data?.heading || 'Our Story'}
          </Typography>
        </Box>

        {/* Main Content Card */}
        <Box sx={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
          backdropFilter: 'blur(10px)',
          borderRadius: 4,
          border: '1px solid rgba(255,255,255,0.1)',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 48px rgba(0,230,118,0.2)'
          }
        }}>
          {imageUrl && (
            <Box sx={{
              width: '100%',
              height: { xs: 300, md: 400 },
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '50%',
                background: 'linear-gradient(to top, rgba(10,14,39,0.9) 0%, transparent 100%)'
              }
            }}>
              <img 
                src={imageUrl}
                alt={data?.heading}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                  borderRadius: '0 0 32px 32px',
                  boxShadow: '0 4px 24px rgba(0,230,118,0.15)'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              />
            </Box>
          )}

          <Box sx={{ p: { xs: 4, md: 6 } }}>
            {/* Content with HTML rendering */}
            <Box 
              sx={{
                color: 'rgba(255,255,255,0.85)',
                fontSize: '1.125rem',
                lineHeight: 1.8,
                '& h1, & h2, & h3, & h4': {
                  color: '#fff',
                  fontWeight: 600,
                  mt: 3,
                  mb: 2
                },
                '& p': {
                  mb: 2
                },
                '& a': {
                  color: '#00e676',
                  textDecoration: 'none',
                  borderBottom: '1px solid transparent',
                  transition: 'border-color 0.3s',
                  '&:hover': {
                    borderBottomColor: '#00e676'
                  }
                },
                '& ul, & ol': {
                  pl: 3,
                  mb: 2
                },
                '& li': {
                  mb: 1
                },
                '& strong': {
                  color: '#00e676',
                  fontWeight: 600
                }
              }}
              dangerouslySetInnerHTML={{ __html: data?.content || '' }}
            />

            {/* Decorative elements */}
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              mt: 6,
              pt: 4,
              borderTop: '1px solid rgba(255,255,255,0.1)'
            }}>
              <Box sx={{
                flex: 1,
                p: 3,
                borderRadius: 2,
                background: 'linear-gradient(135deg, rgba(0,230,118,0.1) 0%, transparent 100%)',
                border: '1px solid rgba(0,230,118,0.2)',
                textAlign: 'center'
              }}>
                <Typography sx={{ color: '#00e676', fontSize: '2rem', fontWeight: 700, mb: 1 }}>
                  10+
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
                  Years Experience
                </Typography>
              </Box>
              <Box sx={{
                flex: 1,
                p: 3,
                borderRadius: 2,
                background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, transparent 100%)',
                border: '1px solid rgba(59,130,246,0.2)',
                textAlign: 'center'
              }}>
                <Typography sx={{ color: '#3b82f6', fontSize: '2rem', fontWeight: 700, mb: 1 }}>
                  500K+
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
                  Trusted Clients
                </Typography>
              </Box>
              <Box sx={{
                flex: 1,
                p: 3,
                borderRadius: 2,
                background: 'linear-gradient(135deg, rgba(168,85,247,0.1) 0%, transparent 100%)',
                border: '1px solid rgba(168,85,247,0.2)',
                textAlign: 'center'
              }}>
                <Typography sx={{ color: '#a855f7', fontSize: '2rem', fontWeight: 700, mb: 1 }}>
                  99.9%
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
                  Uptime SLA
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutIntro;