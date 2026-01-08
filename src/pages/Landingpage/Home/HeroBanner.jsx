import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Rightimg from '../../../assets/Home/image.png';
import { apiClient } from '../../../services/api';

const HeroBanner = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiClient.get('public/home')
      .then((res) => {
        console.log("Hero API:", res.data);
        setData(res.data || {});
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: 40, color: '#fff' }}>Loading...</div>;
  if (error) return <div style={{ padding: 40, color: 'red' }}>{error}</div>;

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: '100vh', md: '95vh' },
        background: 'linear-gradient(135deg, #0f2027 0%, #203a43 25%, #2c5364 50%, #1a4d5e 75%, #0a1f2e 100%)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 8, md: 0 },
        width: '100%',
        margin: 0,
        padding: 0
      }}
    >
      {/* Animated Grid Background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          opacity: 0.4
        }}
      />

      {/* Glowing Orbs */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: { xs: '250px', md: '450px' },
          height: { xs: '250px', md: '450px' },
          background: 'radial-gradient(circle, rgba(0,255,200,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'pulse 6s ease-in-out infinite'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '5%',
          left: '10%',
          width: { xs: '200px', md: '350px' },
          height: { xs: '200px', md: '350px' },
          background: 'radial-gradient(circle, rgba(0,150,255,0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(70px)',
          animation: 'pulse 8s ease-in-out infinite reverse'
        }}
      />

      {/* Accent Lines */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: 0,
          width: '100%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,200,0.3) 50%, transparent 100%)',
          animation: 'slideRight 8s linear infinite'
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">

          {/* LEFT CONTENT */}
          <Grid item xs={12} md={6}>
            {/* Accent Badge */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 2.5,
                py: 1,
                mb: 3,
                borderRadius: '50px',
                background: 'rgba(0,255,200,0.1)',
                border: '1px solid rgba(0,255,200,0.3)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Box
                sx={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#00ffc8',
                  animation: 'blink 2s ease-in-out infinite'
                }}
              />
              <Typography
                sx={{
                  fontSize: '0.85rem',
                  color: '#00ffc8',
                  fontWeight: 600,
                  letterSpacing: '0.5px'
                }}
              >
                NEXT-GEN FINTECH
              </Typography>
            </Box>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5rem' },
                fontWeight: 800,
                lineHeight: 1.1,
                mb: 3,
                background: 'linear-gradient(135deg, #ffffff 0%, #00ffc8 50%, #00a8ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 40px rgba(0,255,200,0.2)'
              }}
              dangerouslySetInnerHTML={{ __html: data.heading || '' }}
            />

            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.15rem' },
                color: 'rgba(255,255,255,0.85)',
                mb: 5,
                lineHeight: 1.7,
                maxWidth: '600px'
              }}
              dangerouslySetInnerHTML={{ __html: data.content || '' }}
            />

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {data.buttonName && (
                <Button
                  href={data.buttonLink}
                  target="_blank"
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    background: 'linear-gradient(135deg, #00ffc8 0%, #00a8ff 100%)',
                    color: '#0a1f2e',
                    px: { xs: 3, md: 4 },
                    py: { xs: 1.3, md: 1.6 },
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: { xs: '0.95rem', md: '1rem' },
                    textTransform: 'none',
                    boxShadow: '0 10px 30px rgba(0,255,200,0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #00e6b8 0%, #0096e6 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 15px 40px rgba(0,255,200,0.4)'
                    }
                  }}
                >
                  {data.buttonName}
                </Button>
              )}

              <Button
                variant="outlined"
                startIcon={<PlayArrowIcon />}
                sx={{
                  color: '#00ffc8',
                  borderColor: 'rgba(0,255,200,0.4)',
                  borderWidth: '2px',
                  borderRadius: '12px',
                  px: { xs: 2.5, md: 3.5 },
                  py: { xs: 1.2, md: 1.5 },
                  fontWeight: 600,
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  textTransform: 'none',
                  backdropFilter: 'blur(10px)',
                  background: 'rgba(0,255,200,0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#00ffc8',
                    background: 'rgba(0,255,200,0.15)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 30px rgba(0,255,200,0.2)'
                  }
                }}
              >
                Watch Demo
              </Button>
            </Box>

            {/* Trust Indicators */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 4,
                mt: 6,
                pt: 4,
                borderTop: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              {[
                { label: 'Secure', value: '256-bit' },
                { label: 'Users', value: '500K+' },
                { label: 'Uptime', value: '99.9%' }
              ].map((stat, idx) => (
                <Box key={idx}>
                  <Typography
                    sx={{
                      fontSize: { xs: '1.5rem', md: '1.8rem' },
                      fontWeight: 700,
                      color: '#00ffc8',
                      mb: 0.5
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.85rem',
                      color: 'rgba(255,255,255,0.6)',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* RIGHT IMAGE */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {/* Glow Effect Behind Image */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '90%',
                  height: '90%',
                  background: 'radial-gradient(circle, rgba(0,255,200,0.2) 0%, transparent 70%)',
                  filter: 'blur(50px)',
                  animation: 'pulse 4s ease-in-out infinite'
                }}
              />

              {/* Image Container with Border Animation */}
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: { xs: '350px', sm: '450px', md: '550px' },
                  padding: '3px',
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, rgba(0,255,200,0.5), rgba(0,168,255,0.5))',
                  animation: 'borderPulse 3s ease-in-out infinite'
                }}
              >
                <Box
                  component="img"
                  src={data.image}
                  alt="Hero"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = Rightimg;
                  }}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '22px',
                    display: 'block',
                    backgroundColor: '#0a1f2e'
                  }}
                />
              </Box>

              {/* Floating Card Elements */}
              <Box
                sx={{
                  position: 'absolute',
                  top: { xs: '10%', md: '15%' },
                  left: { xs: '-5%', md: '-8%' },
                  px: 2.5,
                  py: 1.5,
                  borderRadius: '12px',
                  background: 'rgba(10,31,46,0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(0,255,200,0.3)',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                  animation: 'float 3s ease-in-out infinite',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', mb: 0.5 }}>
                  Transaction Volume
                </Typography>
                <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, color: '#00ffc8' }}>
                  $2.4M
                </Typography>
              </Box>

              <Box
                sx={{
                  position: 'absolute',
                  bottom: { xs: '10%', md: '20%' },
                  right: { xs: '-5%', md: '-8%' },
                  px: 2.5,
                  py: 1.5,
                  borderRadius: '12px',
                  background: 'rgba(10,31,46,0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(0,168,255,0.3)',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                  animation: 'float 3s ease-in-out infinite 1s',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', mb: 0.5 }}>
                  Active Users
                </Typography>
                <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, color: '#00a8ff' }}>
                  45.2K
                </Typography>
              </Box>
            </Box>
          </Grid>

        </Grid>
      </Container>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
          @keyframes slideRight {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes borderPulse {
            0%, 100% { 
              box-shadow: 0 0 20px rgba(0,255,200,0.4), 0 0 40px rgba(0,168,255,0.2);
            }
            50% { 
              box-shadow: 0 0 40px rgba(0,255,200,0.6), 0 0 80px rgba(0,168,255,0.4);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default HeroBanner;



// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Container,
//   Typography,
//   Button,
//   Grid,
//   Card
// } from '@mui/material';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import LockIcon from '@mui/icons-material/Lock';
// import FlashOnIcon from '@mui/icons-material/FlashOn';
// import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import Rightimg from '../../../assets/Home/image.png';
// import { apiClient } from '../../../services/api';

// const HeroBanner = () => {
//   const [data, setData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     apiClient.get('public/home')
//       .then((res) => {
//         setData(res.data || {});
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Failed to load data");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return (
//     <Box sx={{ 
//       minHeight: '100vh', 
//       display: 'flex', 
//       alignItems: 'center', 
//       justifyContent: 'center',
//       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
//     }}>
//       <Typography sx={{ color: '#fff', fontSize: '1.5rem', fontWeight: 600 }}>
//         Loading...
//       </Typography>
//     </Box>
//   );
  
//   if (error) return (
//     <Box sx={{ 
//       minHeight: '100vh', 
//       display: 'flex', 
//       alignItems: 'center', 
//       justifyContent: 'center',
//       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
//     }}>
//       <Typography sx={{ color: '#ff6b6b', fontSize: '1.2rem', fontWeight: 600 }}>
//         {error}
//       </Typography>
//     </Box>
//   );

//   return (
//     <Box
//       sx={{
//         position: 'relative',
//         minHeight: { xs: '100vh', md: '100vh' },
//         background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
//         overflow: 'hidden',
//         display: 'flex',
//         alignItems: 'center',
//         pt: { xs: 8, md: 0 }
//       }}
//     >
//       {/* Animated gradient orbs */}
//       <Box
//         sx={{
//           position: 'absolute',
//           top: '-20%',
//           right: '-10%',
//           width: '600px',
//           height: '600px',
//           background: 'radial-gradient(circle, rgba(102,126,234,0.4) 0%, transparent 70%)',
//           borderRadius: '50%',
//           filter: 'blur(60px)',
//           animation: 'pulse 8s ease-in-out infinite'
//         }}
//       />
//       <Box
//         sx={{
//           position: 'absolute',
//           bottom: '-20%',
//           left: '-10%',
//           width: '700px',
//           height: '700px',
//           background: 'radial-gradient(circle, rgba(138,43,226,0.3) 0%, transparent 70%)',
//           borderRadius: '50%',
//           filter: 'blur(80px)',
//           animation: 'pulse 10s ease-in-out infinite reverse'
//         }}
//       />

//       {/* Grid pattern overlay */}
//       <Box
//         sx={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundImage: `
//             linear-gradient(rgba(102,126,234,0.03) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(102,126,234,0.03) 1px, transparent 1px)
//           `,
//           backgroundSize: '50px 50px',
//           opacity: 0.3
//         }}
//       />

//       <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
//         <Grid container spacing={8} alignItems="center">

//           {/* LEFT CONTENT */}
//           <Grid item xs={12} md={6}>
//             {/* Trust badge */}
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
//               <VerifiedUserIcon sx={{ color: '#4ade80', fontSize: '1.2rem' }} />
//               <Typography sx={{ 
//                 color: '#4ade80', 
//                 fontSize: '0.9rem',
//                 fontWeight: 600,
//                 letterSpacing: '0.05em'
//               }}>
//                 SECURE & TRUSTED BY 10,000+ BUSINESSES
//               </Typography>
//             </Box>

//             <Typography
//               variant="h1"
//               sx={{
//                 fontSize: { xs: '2.8rem', sm: '3.8rem', md: '5rem' },
//                 fontWeight: 900,
//                 lineHeight: 1.1,
//                 mb: 3,
//                 background: 'linear-gradient(135deg, #ffffff 0%, #a78bfa 100%)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 backgroundClip: 'text'
//               }}
//               dangerouslySetInnerHTML={{ __html: data.heading || 'Accept Payments<br/>Built for Scale' }}
//             />

//             <Typography
//               sx={{
//                 fontSize: '1.25rem',
//                 color: 'rgba(255,255,255,0.8)',
//                 mb: 5,
//                 lineHeight: 1.8,
//                 maxWidth: '540px'
//               }}
//               dangerouslySetInnerHTML={{ 
//                 __html: data.content || 'The most powerful and developer-friendly payment infrastructure. Start accepting payments in minutes with our simple APIs.' 
//               }}
//             />

//             {/* Feature pills */}
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 5 }}>
//               <Box sx={{ 
//                 display: 'flex', 
//                 alignItems: 'center', 
//                 gap: 1,
//                 px: 2.5,
//                 py: 1,
//                 borderRadius: '50px',
//                 background: 'rgba(255,255,255,0.1)',
//                 backdropFilter: 'blur(10px)',
//                 border: '1px solid rgba(255,255,255,0.1)'
//               }}>
//                 <FlashOnIcon sx={{ color: '#fbbf24', fontSize: '1.2rem' }} />
//                 <Typography sx={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>
//                   Instant Setup
//                 </Typography>
//               </Box>
//               <Box sx={{ 
//                 display: 'flex', 
//                 alignItems: 'center', 
//                 gap: 1,
//                 px: 2.5,
//                 py: 1,
//                 borderRadius: '50px',
//                 background: 'rgba(255,255,255,0.1)',
//                 backdropFilter: 'blur(10px)',
//                 border: '1px solid rgba(255,255,255,0.1)'
//               }}>
//                 <LockIcon sx={{ color: '#4ade80', fontSize: '1.2rem' }} />
//                 <Typography sx={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>
//                   Bank-Level Security
//                 </Typography>
//               </Box>
//               <Box sx={{ 
//                 display: 'flex', 
//                 alignItems: 'center', 
//                 gap: 1,
//                 px: 2.5,
//                 py: 1,
//                 borderRadius: '50px',
//                 background: 'rgba(255,255,255,0.1)',
//                 backdropFilter: 'blur(10px)',
//                 border: '1px solid rgba(255,255,255,0.1)'
//               }}>
//                 <TrendingUpIcon sx={{ color: '#60a5fa', fontSize: '1.2rem' }} />
//                 <Typography sx={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>
//                   99.99% Uptime
//                 </Typography>
//               </Box>
//             </Box>

//             <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
//               {data.buttonName && (
//                 <Button
//                   href={data.buttonLink}
//                   target="_blank"
//                   variant="contained"
//                   endIcon={<ArrowForwardIcon />}
//                   sx={{
//                     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                     px: 5,
//                     py: 2,
//                     borderRadius: '16px',
//                     fontWeight: 700,
//                     fontSize: '1.1rem',
//                     textTransform: 'none',
//                     boxShadow: '0 20px 40px rgba(102,126,234,0.4)',
//                     transition: 'all 0.3s ease',
//                     '&:hover': {
//                       transform: 'translateY(-2px)',
//                       boxShadow: '0 25px 50px rgba(102,126,234,0.5)',
//                       background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'
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
//                   color: '#fff',
//                   borderColor: 'rgba(255,255,255,0.3)',
//                   borderWidth: '2px',
//                   px: 4,
//                   py: 2,
//                   borderRadius: '16px',
//                   fontWeight: 600,
//                   fontSize: '1.1rem',
//                   textTransform: 'none',
//                   backdropFilter: 'blur(10px)',
//                   background: 'rgba(255,255,255,0.05)',
//                   transition: 'all 0.3s ease',
//                   '&:hover': {
//                     borderColor: '#fff',
//                     borderWidth: '2px',
//                     background: 'rgba(255,255,255,0.1)',
//                     transform: 'translateY(-2px)'
//                   }
//                 }}
//               >
//                 Watch Demo
//               </Button>
//             </Box>
//           </Grid>

//           {/* RIGHT VISUAL - Payment Gateway Mockup */}
//           <Grid item xs={12} md={6}>
//             <Box sx={{ position: 'relative' }}>
//               {/* Main payment card */}
//               <Card
//                 sx={{
//                   background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
//                   backdropFilter: 'blur(20px)',
//                   border: '1px solid rgba(255,255,255,0.2)',
//                   borderRadius: '32px',
//                   p: 4,
//                   boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
//                   position: 'relative',
//                   zIndex: 2,
//                   animation: 'float 6s ease-in-out infinite'
//                 }}
//               >
//                 <Box sx={{ mb: 3 }}>
//                   <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', mb: 1 }}>
//                     Transaction Amount
//                   </Typography>
//                   <Typography sx={{ 
//                     color: '#fff', 
//                     fontSize: '3rem', 
//                     fontWeight: 800,
//                     letterSpacing: '-0.02em'
//                   }}>
//                     $12,450.00
//                   </Typography>
//                 </Box>

//                 <Box sx={{ 
//                   display: 'grid', 
//                   gridTemplateColumns: '1fr 1fr',
//                   gap: 2,
//                   mb: 3
//                 }}>
//                   <Box>
//                     <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', mb: 0.5 }}>
//                       Processing Time
//                     </Typography>
//                     <Typography sx={{ color: '#4ade80', fontSize: '1.1rem', fontWeight: 700 }}>
//                       Instant
//                     </Typography>
//                   </Box>
//                   <Box>
//                     <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', mb: 0.5 }}>
//                       Success Rate
//                     </Typography>
//                     <Typography sx={{ color: '#60a5fa', fontSize: '1.1rem', fontWeight: 700 }}>
//                       99.8%
//                     </Typography>
//                   </Box>
//                 </Box>

//                 <Box sx={{ 
//                   display: 'flex', 
//                   gap: 2,
//                   p: 2,
//                   background: 'rgba(0,0,0,0.2)',
//                   borderRadius: '16px'
//                 }}>
//                   {['Visa', 'Mastercard', 'PayPal', 'Crypto'].map((method) => (
//                     <Box key={method} sx={{ 
//                       flex: 1,
//                       py: 1,
//                       textAlign: 'center',
//                       background: 'rgba(255,255,255,0.1)',
//                       borderRadius: '12px',
//                       fontSize: '0.75rem',
//                       color: 'rgba(255,255,255,0.8)',
//                       fontWeight: 600
//                     }}>
//                       {method}
//                     </Box>
//                   ))}
//                 </Box>
//               </Card>

//               {/* Floating stats cards */}
//               <Card
//                 sx={{
//                   position: 'absolute',
//                   top: '-20px',
//                   right: '-30px',
//                   background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
//                   borderRadius: '20px',
//                   p: 2.5,
//                   boxShadow: '0 20px 40px rgba(74,222,128,0.4)',
//                   zIndex: 3,
//                   animation: 'float 5s ease-in-out infinite 1s'
//                 }}
//               >
//                 <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.8rem', mb: 0.5 }}>
//                   Today's Revenue
//                 </Typography>
//                 <Typography sx={{ color: '#fff', fontSize: '1.5rem', fontWeight: 800 }}>
//                   $45.2K
//                 </Typography>
//                 <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem' }}>
//                   ↑ 12.5% from yesterday
//                 </Typography>
//               </Card>

//               <Card
//                 sx={{
//                   position: 'absolute',
//                   bottom: '-30px',
//                   left: '-40px',
//                   background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
//                   borderRadius: '20px',
//                   p: 2.5,
//                   boxShadow: '0 20px 40px rgba(245,158,11,0.4)',
//                   zIndex: 1,
//                   animation: 'float 5s ease-in-out infinite 2s'
//                 }}
//               >
//                 <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.8rem', mb: 0.5 }}>
//                   Active Users
//                 </Typography>
//                 <Typography sx={{ color: '#fff', fontSize: '1.5rem', fontWeight: 800 }}>
//                   8,421
//                 </Typography>
//                 <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem' }}>
//                   Live transactions
//                 </Typography>
//               </Card>
//             </Box>
//           </Grid>

//         </Grid>
//       </Container>

//       <style>
//         {`
//           @keyframes float {
//             0%, 100% { transform: translateY(0px) rotate(0deg); }
//             50% { transform: translateY(-20px) rotate(1deg); }
//           }
          
//           @keyframes pulse {
//             0%, 100% { opacity: 0.3; transform: scale(1); }
//             50% { opacity: 0.5; transform: scale(1.05); }
//           }
//         `}
//       </style>
//     </Box>
//   );
// };

// export default HeroBanner;