// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Container,
//   Typography,
//   Button,
//   Grid
// } from '@mui/material';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import Rightimg from '../../../assets/Home/image.png';
// import { apiClient } from '../../../services/api';

// const HeroBanner = () => {
//   const [data, setData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     apiClient.get('public/home')
//       .then((res) => {
//         console.log("Hero API:", res.data);
//         setData(res.data || {});
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setError("Failed to load data");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div style={{ padding: 40, color: '#fff' }}>Loading...</div>;
//   if (error) return <div style={{ padding: 40, color: 'red' }}>{error}</div>;

//   return (
//     <Box
//       sx={{
//         position: 'relative',
//         minHeight: { xs: '100vh', md: '95vh' },
//         background: 'linear-gradient(135deg, #0f2027 0%, #203a43 25%, #2c5364 50%, #1a4d5e 75%, #0a1f2e 100%)',
//         overflow: 'hidden',
//         display: 'flex',
//         alignItems: 'center',
//         pt: { xs: 8, md: 0 },
//         width: '100%',
//         margin: 0,
//         padding: 0
//       }}
//     >
//       {/* Animated Grid Background */}
//       <Box
//         sx={{
//           position: 'absolute',
//           inset: 0,
//           backgroundImage: 'linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px)',
//           backgroundSize: '50px 50px',
//           opacity: 0.4
//         }}
//       />

//       {/* Glowing Orbs */}
//       <Box
//         sx={{
//           position: 'absolute',
//           top: '10%',
//           right: '5%',
//           width: { xs: '250px', md: '450px' },
//           height: { xs: '250px', md: '450px' },
//           background: 'radial-gradient(circle, rgba(0,255,200,0.15) 0%, transparent 70%)',
//           borderRadius: '50%',
//           filter: 'blur(60px)',
//           animation: 'pulse 6s ease-in-out infinite'
//         }}
//       />
//       <Box
//         sx={{
//           position: 'absolute',
//           bottom: '5%',
//           left: '10%',
//           width: { xs: '200px', md: '350px' },
//           height: { xs: '200px', md: '350px' },
//           background: 'radial-gradient(circle, rgba(0,150,255,0.2) 0%, transparent 70%)',
//           borderRadius: '50%',
//           filter: 'blur(70px)',
//           animation: 'pulse 8s ease-in-out infinite reverse'
//         }}
//       />

//       {/* Accent Lines */}
//       <Box
//         sx={{
//           position: 'absolute',
//           top: '20%',
//           left: 0,
//           width: '100%',
//           height: '2px',
//           background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,200,0.3) 50%, transparent 100%)',
//           animation: 'slideRight 8s linear infinite'
//         }}
//       />

//       <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
//         <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">

//           {/* LEFT CONTENT */}
//           <Grid item xs={12} md={6}>
//             {/* Accent Badge */}
//             <Box
//               sx={{
//                 display: 'inline-flex',
//                 alignItems: 'center',
//                 gap: 1,
//                 px: 2.5,
//                 py: 1,
//                 mb: 3,
//                 borderRadius: '50px',
//                 background: 'rgba(0,255,200,0.1)',
//                 border: '1px solid rgba(0,255,200,0.3)',
//                 backdropFilter: 'blur(10px)'
//               }}
//             >
//               <Box
//                 sx={{
//                   width: '8px',
//                   height: '8px',
//                   borderRadius: '50%',
//                   background: '#00ffc8',
//                   animation: 'blink 2s ease-in-out infinite'
//                 }}
//               />
//               <Typography
//                 sx={{
//                   fontSize: '0.85rem',
//                   color: '#00ffc8',
//                   fontWeight: 600,
//                   letterSpacing: '0.5px'
//                 }}
//               >
//                 NEXT-GEN FINTECH
//               </Typography>
//             </Box>

//             <Typography
//               variant="h1"
//               sx={{
//                 fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5rem' },
//                 fontWeight: 800,
//                 lineHeight: 1.1,
//                 mb: 3,
//                 background: 'linear-gradient(135deg, #ffffff 0%, #00ffc8 50%, #00a8ff 100%)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 backgroundClip: 'text',
//                 textShadow: '0 0 40px rgba(0,255,200,0.2)'
//               }}
//               dangerouslySetInnerHTML={{ __html: data.heading || '' }}
//             />

//             <Typography
//               sx={{
//                 fontSize: { xs: '1rem', md: '1.15rem' },
//                 color: 'rgba(255,255,255,0.85)',
//                 mb: 5,
//                 lineHeight: 1.7,
//                 maxWidth: '600px'
//               }}
//               dangerouslySetInnerHTML={{ __html: data.content || '' }}
//             />

//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
//               {data.buttonName && (
//                 <Button
//                   href={data.buttonLink}
//                   target="_blank"
//                   variant="contained"
//                   endIcon={<ArrowForwardIcon />}
//                   sx={{
//                     background: 'linear-gradient(135deg, #00ffc8 0%, #00a8ff 100%)',
//                     color: '#0a1f2e',
//                     px: { xs: 3, md: 4 },
//                     py: { xs: 1.3, md: 1.6 },
//                     borderRadius: '12px',
//                     fontWeight: 700,
//                     fontSize: { xs: '0.95rem', md: '1rem' },
//                     textTransform: 'none',
//                     boxShadow: '0 10px 30px rgba(0,255,200,0.3)',
//                     transition: 'all 0.3s ease',
//                     '&:hover': {
//                       background: 'linear-gradient(135deg, #00e6b8 0%, #0096e6 100%)',
//                       transform: 'translateY(-2px)',
//                       boxShadow: '0 15px 40px rgba(0,255,200,0.4)'
//                     }
//                   }}
//                 >
//                   {data.buttonName}
//                 </Button>
//               )}

//               <Button
//                 variant="outlined"
//                 startIcon={<PlayArrowIcon />}
//                 sx={{
//                   color: '#00ffc8',
//                   borderColor: 'rgba(0,255,200,0.4)',
//                   borderWidth: '2px',
//                   borderRadius: '12px',
//                   px: { xs: 2.5, md: 3.5 },
//                   py: { xs: 1.2, md: 1.5 },
//                   fontWeight: 600,
//                   fontSize: { xs: '0.95rem', md: '1rem' },
//                   textTransform: 'none',
//                   backdropFilter: 'blur(10px)',
//                   background: 'rgba(0,255,200,0.05)',
//                   transition: 'all 0.3s ease',
//                   '&:hover': {
//                     borderColor: '#00ffc8',
//                     background: 'rgba(0,255,200,0.15)',
//                     transform: 'translateY(-2px)',
//                     boxShadow: '0 10px 30px rgba(0,255,200,0.2)'
//                   }
//                 }}
//               >
//                 Watch Demo
//               </Button>
//             </Box>

//             {/* Trust Indicators */}
//             <Box
//               sx={{
//                 display: 'flex',
//                 flexWrap: 'wrap',
//                 gap: 4,
//                 mt: 6,
//                 pt: 4,
//                 borderTop: '1px solid rgba(255,255,255,0.1)'
//               }}
//             >
//               {[
//                 { label: 'Secure', value: '256-bit' },
//                 { label: 'Users', value: '500K+' },
//                 { label: 'Uptime', value: '99.9%' }
//               ].map((stat, idx) => (
//                 <Box key={idx}>
//                   <Typography
//                     sx={{
//                       fontSize: { xs: '1.5rem', md: '1.8rem' },
//                       fontWeight: 700,
//                       color: '#00ffc8',
//                       mb: 0.5
//                     }}
//                   >
//                     {stat.value}
//                   </Typography>
//                   <Typography
//                     sx={{
//                       fontSize: '0.85rem',
//                       color: 'rgba(255,255,255,0.6)',
//                       textTransform: 'uppercase',
//                       letterSpacing: '1px'
//                     }}
//                   >
//                     {stat.label}
//                   </Typography>
//                 </Box>
//               ))}
//             </Box>
//           </Grid>

//           {/* RIGHT IMAGE */}
//           <Grid item xs={12} md={6}>
//             <Box
//               sx={{
//                 position: 'relative',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center'
//               }}
//             >
//               {/* Glow Effect Behind Image */}
//               <Box
//                 sx={{
//                   position: 'absolute',
//                   width: '90%',
//                   height: '90%',
//                   background: 'radial-gradient(circle, rgba(0,255,200,0.2) 0%, transparent 70%)',
//                   filter: 'blur(50px)',
//                   animation: 'pulse 4s ease-in-out infinite'
//                 }}
//               />

//               {/* Image Container with Border Animation */}
//               <Box
//                 sx={{
//                   position: 'relative',
//                   width: '100%',
//                   height: { xs: '350px', sm: '450px', md: '550px' },
//                   padding: '3px',
//                   borderRadius: '24px',
//                   background: 'linear-gradient(135deg, rgba(0,255,200,0.5), rgba(0,168,255,0.5))',
//                   animation: 'borderPulse 3s ease-in-out infinite'
//                 }}
//               >
//                 <Box
//                   component="img"
//                   src={data.image}
//                   alt="Hero"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = Rightimg;
//                   }}
//                   sx={{
//                     width: '100%',
//                     height: '100%',
//                     objectFit: 'cover',
//                     borderRadius: '22px',
//                     display: 'block',
//                     backgroundColor: '#0a1f2e'
//                   }}
//                 />
//               </Box>

//               {/* Floating Card Elements */}
//               <Box
//                 sx={{
//                   position: 'absolute',
//                   top: { xs: '10%', md: '15%' },
//                   left: { xs: '-5%', md: '-8%' },
//                   px: 2.5,
//                   py: 1.5,
//                   borderRadius: '12px',
//                   background: 'rgba(10,31,46,0.9)',
//                   backdropFilter: 'blur(20px)',
//                   border: '1px solid rgba(0,255,200,0.3)',
//                   boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
//                   animation: 'float 3s ease-in-out infinite',
//                   display: { xs: 'none', sm: 'block' }
//                 }}
//               >
//                 <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', mb: 0.5 }}>
//                   Transaction Volume
//                 </Typography>
//                 <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, color: '#00ffc8' }}>
//                   $2.4M
//                 </Typography>
//               </Box>

//               <Box
//                 sx={{
//                   position: 'absolute',
//                   bottom: { xs: '10%', md: '20%' },
//                   right: { xs: '-5%', md: '-8%' },
//                   px: 2.5,
//                   py: 1.5,
//                   borderRadius: '12px',
//                   background: 'rgba(10,31,46,0.9)',
//                   backdropFilter: 'blur(20px)',
//                   border: '1px solid rgba(0,168,255,0.3)',
//                   boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
//                   animation: 'float 3s ease-in-out infinite 1s',
//                   display: { xs: 'none', sm: 'block' }
//                 }}
//               >
//                 <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', mb: 0.5 }}>
//                   Active Users
//                 </Typography>
//                 <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, color: '#00a8ff' }}>
//                   45.2K
//                 </Typography>
//               </Box>
//             </Box>
//           </Grid>

//         </Grid>
//       </Container>

//       <style>
//         {`
//           @keyframes float {
//             0%, 100% { transform: translateY(0px); }
//             50% { transform: translateY(-15px); }
//           }
//           @keyframes pulse {
//             0%, 100% { opacity: 0.6; transform: scale(1); }
//             50% { opacity: 1; transform: scale(1.05); }
//           }
//           @keyframes blink {
//             0%, 100% { opacity: 1; }
//             50% { opacity: 0.3; }
//           }
//           @keyframes slideRight {
//             0% { transform: translateX(-100%); }
//             100% { transform: translateX(100%); }
//           }
//           @keyframes borderPulse {
//             0%, 100% { 
//               box-shadow: 0 0 20px rgba(0,255,200,0.4), 0 0 40px rgba(0,168,255,0.2);
//             }
//             50% { 
//               box-shadow: 0 0 40px rgba(0,255,200,0.6), 0 0 80px rgba(0,168,255,0.4);
//             }
//           }
//         `}
//       </style>
//     </Box>
//   );
// };

// export default HeroBanner;

import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, CircularProgress, Alert } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const HeroBanner = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://testapicms.pvorasp.com/api/public/home');
        if (!response.ok) throw new Error('Failed to fetch data');
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
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '80vh',
        bgcolor: '#0a0e27'
      }}>
        <CircularProgress sx={{ color: '#00d4ff' }} size={50} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">Error: {error}</Alert>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0a0e27 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 80% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 8 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 4, md: 6 },
            alignItems: 'center',
            minHeight: { xs: 'auto', md: '600px' }
          }}
        >
          {/* Left Side - Content */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 3,
              order: { xs: 2, md: 1 },
              pr: { xs: 0, md: 4 }
            }}
          >
            {/* Subtitle/Badge */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                bgcolor: 'rgba(0, 212, 255, 0.1)',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                borderRadius: '50px',
                px: 2.5,
                py: 1,
                width: 'fit-content',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: '#00d4ff',
                  animation: 'pulse 2s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.5 }
                  }
                }}
              />
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#00d4ff',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}
              >
                Financial Technology
              </Typography>
            </Box>

            {/* Main Heading */}
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.25rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
                lineHeight: 1.1,
                background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                mb: 1
              }}
            >
              {data?.heading}
            </Typography>

            {/* Content */}
            <Box
              sx={{
                '& p': {
                  fontSize: { xs: '1.0625rem', md: '1.125rem' },
                  color: '#cbd5e1',
                  lineHeight: 1.7,
                  margin: 0,
                  fontWeight: 400
                }
              }}
              dangerouslySetInnerHTML={{ __html: data?.content }}
            />

            {/* CTA Button */}
            {data?.buttonName && data?.buttonLink && (
              <Box sx={{ mt: 1 }}>
                <Button
                  variant="contained"
                  size="large"
                  href={data.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    background: 'linear-gradient(135deg, #00d4ff 0%, #6366f1 100%)',
                    color: 'white',
                    px: 4,
                    py: 1.75,
                    fontSize: '1.0625rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0, 212, 255, 0.3)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                      transition: 'left 0.5s'
                    },
                    '&:hover': {
                      background: 'linear-gradient(135deg, #00b8e6 0%, #5558dd 100%)',
                      boxShadow: '0 12px 48px rgba(0, 212, 255, 0.4)',
                      transform: 'translateY(-2px)',
                      '&::before': {
                        left: '100%'
                      }
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {data.buttonName}
                </Button>
              </Box>
            )}

            {/* Trust Indicators */}
            <Box
              sx={{
                display: 'flex',
                gap: 4,
                mt: 2,
                flexWrap: 'wrap'
              }}
            >
              <Box>
                <Typography sx={{ fontSize: '0.75rem', color: '#64748b', mb: 0.5, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Secure
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', color: '#cbd5e1', fontWeight: 600 }}>
                  Bank-grade encryption
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: '0.75rem', color: '#64748b', mb: 0.5, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Fast
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', color: '#cbd5e1', fontWeight: 600 }}>
                  Real-time processing
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Right Side - Image */}
          <Box
            sx={{
              order: { xs: 1, md: 2 },
              height: { xs: '400px', sm: '500px', md: '600px' },
              width: '100%',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Decorative elements */}
            <Box
              sx={{
                position: 'absolute',
                top: '10%',
                right: '10%',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, transparent 70%)',
                filter: 'blur(40px)',
                animation: 'float 6s ease-in-out infinite',
                '@keyframes float': {
                  '0%, 100%': { transform: 'translateY(0px)' },
                  '50%': { transform: 'translateY(-20px)' }
                }
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: '10%',
                left: '10%',
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
                filter: 'blur(40px)',
                animation: 'float 8s ease-in-out infinite',
                animationDelay: '1s'
              }}
            />

            {/* Image Container */}
            <Box
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: '24px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)',
                backdropFilter: 'blur(10px)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, transparent 100%)',
                  pointerEvents: 'none',
                  zIndex: 1
                }
              }}
            >
              <Box
                component="img"
                src={data?.image}
                alt={data?.heading || 'Hero image'}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroBanner;