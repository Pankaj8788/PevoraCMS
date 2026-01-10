// import React, { useState } from 'react';
// import {
//   Box,
//   Container,
//   Typography,
//   Button,
//   Grid,
//   Card,
//   CardContent,
//   Chip,
//   Stack,
//   Divider,
//   Paper,
//   Avatar,
//   IconButton,
//   useMediaQuery,
//   useTheme
// } from '@mui/material';
// import {
//   Language,
//   CurrencyExchange,
//   Schedule,
//   Assessment,
//   Security,
//   VerifiedUser,
//   TrendingUp,
//   AccountBalance,
//   Speed,
//   Shield,
//   CheckCircle,
//   Rocket,
//   Public,
//   Analytics,
//   Lock,
//   Timeline,
//   AutoAwesome,
//   CloudDone,
//   BarChart,
//   Menu,
//   Close,
//   ArrowForward,
//   Payments,
//   Api,
//   IntegrationInstructions
// } from '@mui/icons-material';

// const Gateway = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   const features = [
//     {
//       icon: <Language sx={{ fontSize: { xs: 28, md: 48 } }} />,
//       title: 'Cross-Border Collections',
//       description: 'Accept payments from 150+ countries with transparent FX and settlement visibility.',
//       color: '#6366F1',
//       gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)'
//     },
//     {
//       icon: <CurrencyExchange sx={{ fontSize: { xs: 28, md: 48 } }} />,
//       title: 'FX Transparency',
//       description: 'Real-time exchange rates with clear conversion margins and competitive rates.',
//       color: '#8B5CF6',
//       gradient: 'linear-gradient(135deg, #8B5CF6, #EC4899)'
//     },
//     {
//       icon: <Schedule sx={{ fontSize: { xs: 28, md: 48 } }} />,
//       title: 'Predictable Settlements',
//       description: 'Corridor-based payout cycles for cashflow visibility and financial planning.',
//       color: '#EC4899',
//       gradient: 'linear-gradient(135deg, #EC4899, #F97316)'
//     },
//     {
//       icon: <Assessment sx={{ fontSize: { xs: 28, md: 48 } }} />,
//       title: 'Centralized Reporting',
//       description: 'Unified dashboard for transactions, FX rates, settlements, and analytics.',
//       color: '#10B981',
//       gradient: 'linear-gradient(135deg, #10B981, #059669)'
//     },
//     {
//       icon: <VerifiedUser sx={{ fontSize: { xs: 28, md: 48 } }} />,
//       title: 'Embedded Compliance',
//       description: 'Built-in KYC, AML, sanctions screening, and regulatory compliance.',
//       color: '#F59E0B',
//       gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)'
//     },
//     {
//       icon: <Shield sx={{ fontSize: { xs: 28, md: 48 } }} />,
//       title: 'Risk Intelligence',
//       description: 'AI-powered fraud detection, chargeback prevention, and risk scoring.',
//       color: '#3B82F6',
//       gradient: 'linear-gradient(135deg, #3B82F6, #6366F1)'
//     }
//   ];

//   const stats = [
//     { value: '150+', label: 'Countries', icon: <Public /> },
//     { value: '99.9%', label: 'Uptime', icon: <CloudDone /> },
//     { value: '<2s', label: 'Processing', icon: <Speed /> },
//     { value: '24/7', label: 'Support', icon: <VerifiedUser /> }
//   ];

//   const integrations = [
//     { name: 'Stripe', logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&h=100&fit=crop' },
//     { name: 'PayPal', logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=100&fit=crop' },
//     { name: 'Shopify', logo: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=100&h=100&fit=crop' },
//     { name: 'WooCommerce', logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop' }
//   ];

//   const testimonials = [
//     {
//       name: 'Sarah Chen',
//       role: 'CFO, TechCorp',
//       image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
//       text: 'The FX transparency and settlement visibility transformed our international operations. We reduced processing costs by 40%.'
//     },
//     {
//       name: 'Michael Rodriguez',
//       role: 'VP Finance, GlobalTrade',
//       image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
//       text: 'Outstanding platform with real-time compliance monitoring. The unified dashboard saves us hours every week.'
//     },
//     {
//       name: 'Priya Sharma',
//       role: 'CEO, FinanceHub',
//       image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
//       text: 'Best-in-class security and fraud prevention. Our chargeback rate dropped by 65% within 3 months.'
//     }
//   ];

//   const useCases = [
//     {
//       title: 'E-commerce Platforms',
//       description: 'Accept global payments with automatic currency conversion and multi-currency settlement.',
//       icon: <Payments sx={{ fontSize: 40 }} />
//     },
//     {
//       title: 'SaaS Companies',
//       description: 'Recurring billing in 135+ currencies with subscription management and revenue recognition.',
//       icon: <Api sx={{ fontSize: 40 }} />
//     },
//     {
//       title: 'Marketplaces',
//       description: 'Split payments, escrow services, and multi-party settlement for complex transactions.',
//       icon: <IntegrationInstructions sx={{ fontSize: 40 }} />
//     }
//   ];

//   return (
//     <Box sx={{
//       minHeight: '100vh',
//       background: 'linear-gradient(180deg, #0a0e27, #1a1f3a)',
//       overflowX: 'hidden'
//     }}>
//       {/* NAVIGATION */}
//       <Box sx={{
//         py: 2,
//         px: { xs: 2, md: 4 },
//         borderBottom: '1px solid rgba(255,255,255,0.1)',
//         position: 'sticky',
//         top: 0,
//         backdropFilter: 'blur(10px)',
//         background: 'rgba(10, 14, 39, 0.9)',
//         zIndex: 1000
//       }}>
//         <Container maxWidth="lg">
//           <Stack direction="row" alignItems="center" justifyContent="space-between">
//             <Stack direction="row" alignItems="center" spacing={1}>
//               <AccountBalance sx={{ color: '#6366F1', fontSize: 32 }} />
//               <Typography variant="h6" color="white" fontWeight={800}>
//                 PayGlobal
//               </Typography>
//             </Stack>

//             {isMobile ? (
//               <IconButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)} sx={{ color: 'white' }}>
//                 {mobileMenuOpen ? <Close /> : <Menu />}
//               </IconButton>
//             ) : (
//               <Stack direction="row" spacing={3} alignItems="center">
//                 <Typography sx={{ color: 'rgba(255,255,255,0.8)', cursor: 'pointer', '&:hover': { color: 'white' } }}>
//                   Products
//                 </Typography>
//                 <Typography sx={{ color: 'rgba(255,255,255,0.8)', cursor: 'pointer', '&:hover': { color: 'white' } }}>
//                   Pricing
//                 </Typography>
//                 <Typography sx={{ color: 'rgba(255,255,255,0.8)', cursor: 'pointer', '&:hover': { color: 'white' } }}>
//                   Docs
//                 </Typography>
//                 <Button variant="contained" size="small" sx={{ px: 3 }}>
//                   Sign In
//                 </Button>
//               </Stack>
//             )}
//           </Stack>

//           {/* Mobile Menu */}
//           {mobileMenuOpen && isMobile && (
//             <Stack spacing={2} mt={2} pb={2}>
//               <Typography sx={{ color: 'white', py: 1 }}>Products</Typography>
//               <Typography sx={{ color: 'white', py: 1 }}>Pricing</Typography>
//               <Typography sx={{ color: 'white', py: 1 }}>Docs</Typography>
//               <Button variant="contained" fullWidth>Sign In</Button>
//             </Stack>
//           )}
//         </Container>
//       </Box>

//       <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
//         {/* HERO */}
//         <Box textAlign="center" mb={{ xs: 6, md: 10 }}>
//           <Chip
//             icon={<AutoAwesome />}
//             label="NEXT-GEN PAYMENT INFRASTRUCTURE"
//             sx={{
//               mb: { xs: 2, md: 3 },
//               px: { xs: 1.5, md: 2 },
//               py: { xs: 0.5, md: 1 },
//               fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.85rem' },
//               color: 'white',
//               background: 'rgba(255,255,255,0.15)',
//               backdropFilter: 'blur(10px)'
//             }}
//           />

//           <Typography
//             variant="h1"
//             sx={{
//               fontSize: { xs: '2rem', sm: '3rem', md: '4.5rem', lg: '5.5rem' },
//               fontWeight: 900,
//               color: 'white',
//               lineHeight: 1.1,
//               mb: 2,
//               px: { xs: 1, md: 0 }
//             }}
//           >
//             Global Payment Gateway
//           </Typography>

//           <Typography
//             sx={{
//               mt: 2,
//               fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
//               color: 'rgba(255,255,255,0.8)',
//               maxWidth: '800px',
//               mx: 'auto',
//               px: { xs: 2, md: 0 }
//             }}
//           >
//             Built for Compliance, Clarity and Control. Process payments across 150+ countries with enterprise-grade security.
//           </Typography>

//           {/* Hero Image */}
//           <Box
//             component="img"
//             src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop"
//             alt="Payment Dashboard"
//             sx={{
//               width: '100%',
//               maxWidth: '900px',
//               height: { xs: '200px', sm: '300px', md: '400px' },
//               objectFit: 'cover',
//               borderRadius: 4,
//               mt: { xs: 4, md: 6 },
//               boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
//             }}
//           />

//           {/* STATS */}
//           <Grid container spacing={{ xs: 1.5, md: 2 }} mt={{ xs: 4, md: 6 }}>
//             {stats.map((s, i) => (
//               <Grid item xs={6} sm={3} key={i}>
//                 <Box sx={{
//                   p: { xs: 2, md: 3 },
//                   borderRadius: { xs: 2, md: 3 },
//                   background: 'rgba(255,255,255,0.08)',
//                   backdropFilter: 'blur(10px)',
//                   textAlign: 'center',
//                   transition: '0.3s',
//                   '&:hover': {
//                     background: 'rgba(255,255,255,0.12)',
//                     transform: 'translateY(-4px)'
//                   }
//                 }}>
//                   <Box color="#a5b4fc" sx={{ mb: 1 }}>{s.icon}</Box>
//                   <Typography 
//                     fontWeight={800} 
//                     color="white"
//                     sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}
//                   >
//                     {s.value}
//                   </Typography>
//                   <Typography 
//                     color="rgba(255,255,255,0.7)"
//                     sx={{ fontSize: { xs: '0.8rem', md: '1rem' } }}
//                   >
//                     {s.label}
//                   </Typography>
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>

//           {/* CTA */}
//           <Stack 
//             direction={{ xs: 'column', sm: 'row' }} 
//             spacing={2} 
//             mt={{ xs: 4, md: 6 }}
//             justifyContent="center"
//             sx={{ px: { xs: 2, md: 0 } }}
//           >
//             <Button 
//               fullWidth={isMobile}
//               variant="contained" 
//               size="large"
//               endIcon={<ArrowForward />}
//               sx={{ 
//                 py: { xs: 1.5, md: 2 },
//                 px: { xs: 3, md: 5 },
//                 fontSize: { xs: '0.9rem', md: '1rem' }
//               }}
//             >
//               Get Started Free
//             </Button>
//             <Button 
//               fullWidth={isMobile}
//               variant="outlined" 
//               size="large"
//               sx={{ 
//                 py: { xs: 1.5, md: 2 },
//                 px: { xs: 3, md: 5 },
//                 color: 'white', 
//                 borderColor: 'white',
//                 fontSize: { xs: '0.9rem', md: '1rem' },
//                 '&:hover': { borderColor: 'white', background: 'rgba(255,255,255,0.1)' }
//               }}
//             >
//               Talk to Expert
//             </Button>
//           </Stack>
//         </Box>

//         <Divider sx={{ my: { xs: 6, md: 10 }, borderColor: 'rgba(255,255,255,0.1)' }} />

//         {/* FEATURES */}
//         <Box mb={{ xs: 6, md: 10 }}>
//           <Typography 
//             variant="h3" 
//             color="white" 
//             textAlign="center" 
//             mb={{ xs: 2, md: 3 }}
//             sx={{ 
//               fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
//               fontWeight: 800,
//               px: { xs: 2, md: 0 }
//             }}
//           >
//             Core Capabilities
//           </Typography>
//           <Typography
//             textAlign="center"
//             color="rgba(255,255,255,0.7)"
//             mb={{ xs: 4, md: 6 }}
//             sx={{ 
//               fontSize: { xs: '0.95rem', md: '1.1rem' },
//               px: { xs: 2, md: 0 }
//             }}
//           >
//             Enterprise-grade features designed for global commerce
//           </Typography>

//           <Grid container spacing={{ xs: 2, md: 3 }}>
//             {features.map((f, i) => (
//               <Grid item xs={12} sm={6} lg={4} key={i}>
//                 <Card sx={{
//                   height: '100%',
//                   borderRadius: { xs: 2, md: 3 },
//                   transition: '0.3s',
//                   background: 'rgba(255,255,255,0.05)',
//                   backdropFilter: 'blur(10px)',
//                   '&:hover': { 
//                     transform: 'translateY(-8px)',
//                     background: 'rgba(255,255,255,0.08)'
//                   }
//                 }}>
//                   <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
//                     <Box sx={{
//                       width: { xs: 50, md: 60 },
//                       height: { xs: 50, md: 60 },
//                       borderRadius: 2,
//                       background: f.gradient,
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       mb: 2,
//                       color: 'white'
//                     }}>
//                       {f.icon}
//                     </Box>
//                     <Typography 
//                       fontWeight={700}
//                       color="white"
//                       sx={{ fontSize: { xs: '1rem', md: '1.2rem' }, mb: 1 }}
//                     >
//                       {f.title}
//                     </Typography>
//                     <Typography 
//                       color="rgba(255,255,255,0.7)"
//                       sx={{ fontSize: { xs: '0.85rem', md: '0.95rem' } }}
//                     >
//                       {f.description}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>

//         <Divider sx={{ my: { xs: 6, md: 10 }, borderColor: 'rgba(255,255,255,0.1)' }} />

//         {/* USE CASES */}
//         <Box mb={{ xs: 6, md: 10 }}>
//           <Typography 
//             variant="h3" 
//             color="white" 
//             textAlign="center" 
//             mb={{ xs: 4, md: 6 }}
//             sx={{ 
//               fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
//               fontWeight: 800,
//               px: { xs: 2, md: 0 }
//             }}
//           >
//             Built for Your Industry
//           </Typography>

//           <Grid container spacing={{ xs: 2, md: 4 }}>
//             {useCases.map((uc, i) => (
//               <Grid item xs={12} md={4} key={i}>
//                 <Paper sx={{
//                   p: { xs: 3, md: 4 },
//                   borderRadius: { xs: 2, md: 3 },
//                   background: 'rgba(99, 102, 241, 0.1)',
//                   backdropFilter: 'blur(10px)',
//                   border: '1px solid rgba(99, 102, 241, 0.2)',
//                   transition: '0.3s',
//                   '&:hover': {
//                     background: 'rgba(99, 102, 241, 0.15)',
//                     transform: 'translateY(-4px)'
//                   }
//                 }}>
//                   <Box sx={{ color: '#6366F1', mb: 2 }}>
//                     {uc.icon}
//                   </Box>
//                   <Typography 
//                     variant="h6" 
//                     color="white" 
//                     fontWeight={700}
//                     mb={1}
//                     sx={{ fontSize: { xs: '1.1rem', md: '1.3rem' } }}
//                   >
//                     {uc.title}
//                   </Typography>
//                   <Typography 
//                     color="rgba(255,255,255,0.8)"
//                     sx={{ fontSize: { xs: '0.85rem', md: '0.95rem' } }}
//                   >
//                     {uc.description}
//                   </Typography>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>

//         <Divider sx={{ my: { xs: 6, md: 10 }, borderColor: 'rgba(255,255,255,0.1)' }} />

//         {/* INTEGRATIONS */}
//         <Box mb={{ xs: 6, md: 10 }}>
//           <Typography 
//             variant="h3" 
//             color="white" 
//             textAlign="center" 
//             mb={{ xs: 2, md: 3 }}
//             sx={{ 
//               fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
//               fontWeight: 800
//             }}
//           >
//             Seamless Integrations
//           </Typography>
//           <Typography
//             textAlign="center"
//             color="rgba(255,255,255,0.7)"
//             mb={{ xs: 4, md: 6 }}
//             sx={{ fontSize: { xs: '0.95rem', md: '1.1rem' } }}
//           >
//             Connect with your existing tools in minutes
//           </Typography>

//           <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
//             {integrations.map((int, i) => (
//               <Grid item xs={6} sm={3} key={i}>
//                 <Paper sx={{
//                   p: { xs: 2, md: 3 },
//                   textAlign: 'center',
//                   borderRadius: { xs: 2, md: 3 },
//                   background: 'rgba(255,255,255,0.05)',
//                   transition: '0.3s',
//                   '&:hover': {
//                     background: 'rgba(255,255,255,0.1)',
//                     transform: 'scale(1.05)'
//                   }
//                 }}>
//                   <Avatar
//                     src={int.logo}
//                     alt={int.name}
//                     sx={{ 
//                       width: { xs: 60, md: 80 }, 
//                       height: { xs: 60, md: 80 }, 
//                       mx: 'auto', 
//                       mb: 1 
//                     }}
//                   />
//                   <Typography 
//                     color="white" 
//                     fontWeight={600}
//                     sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}
//                   >
//                     {int.name}
//                   </Typography>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>

//         <Divider sx={{ my: { xs: 6, md: 10 }, borderColor: 'rgba(255,255,255,0.1)' }} />

//         {/* TESTIMONIALS */}
//         <Box mb={{ xs: 6, md: 10 }}>
//           <Typography 
//             variant="h3" 
//             color="white" 
//             textAlign="center" 
//             mb={{ xs: 4, md: 6 }}
//             sx={{ 
//               fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
//               fontWeight: 800,
//               px: { xs: 2, md: 0 }
//             }}
//           >
//             Trusted by Industry Leaders
//           </Typography>

//           <Grid container spacing={{ xs: 2, md: 3 }}>
//             {testimonials.map((t, i) => (
//               <Grid item xs={12} md={4} key={i}>
//                 <Card sx={{
//                   height: '100%',
//                   p: { xs: 2.5, md: 3 },
//                   borderRadius: { xs: 2, md: 3 },
//                   background: 'rgba(255,255,255,0.05)',
//                   backdropFilter: 'blur(10px)'
//                 }}>
//                   <Stack direction="row" spacing={2} mb={2} alignItems="center">
//                     <Avatar 
//                       src={t.image} 
//                       alt={t.name}
//                       sx={{ width: { xs: 50, md: 60 }, height: { xs: 50, md: 60 } }}
//                     />
//                     <Box>
//                       <Typography 
//                         color="white" 
//                         fontWeight={700}
//                         sx={{ fontSize: { xs: '0.95rem', md: '1.1rem' } }}
//                       >
//                         {t.name}
//                       </Typography>
//                       <Typography 
//                         color="rgba(255,255,255,0.6)"
//                         sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}
//                       >
//                         {t.role}
//                       </Typography>
//                     </Box>
//                   </Stack>
//                   <Typography 
//                     color="rgba(255,255,255,0.8)"
//                     sx={{ 
//                       fontSize: { xs: '0.9rem', md: '1rem' },
//                       fontStyle: 'italic'
//                     }}
//                   >
//                     "{t.text}"
//                   </Typography>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>

//         {/* FINAL CTA */}
//         <Paper sx={{
//           p: { xs: 4, md: 6 },
//           borderRadius: { xs: 3, md: 4 },
//           background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
//           textAlign: 'center'
//         }}>
//           <Typography 
//             variant="h3" 
//             color="white" 
//             fontWeight={800}
//             mb={2}
//             sx={{ fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' } }}
//           >
//             Ready to Go Global?
//           </Typography>
//           <Typography 
//             color="rgba(255,255,255,0.9)" 
//             mb={4}
//             sx={{ 
//               fontSize: { xs: '1rem', md: '1.2rem' },
//               maxWidth: '600px',
//               mx: 'auto'
//             }}
//           >
//             Join thousands of businesses processing billions in payments worldwide
//           </Typography>
//           <Stack 
//             direction={{ xs: 'column', sm: 'row' }} 
//             spacing={2}
//             justifyContent="center"
//           >
//             <Button 
//               fullWidth={isMobile}
//               variant="contained" 
//               size="large"
//               sx={{ 
//                 py: { xs: 1.5, md: 2 },
//                 px: { xs: 3, md: 5 },
//                 background: 'white',
//                 color: '#6366F1',
//                 '&:hover': { background: 'rgba(255,255,255,0.9)' }
//               }}
//             >
//               Start Free Trial
//             </Button>
//             <Button 
//               fullWidth={isMobile}
//               variant="outlined" 
//               size="large"
//               sx={{ 
//                 py: { xs: 1.5, md: 2 },
//                 px: { xs: 3, md: 5 },
//                 borderColor: 'white',
//                 color: 'white',
//                 '&:hover': { 
//                   borderColor: 'white',
//                   background: 'rgba(255,255,255,0.1)'
//                 }
//               }}
//             >
//               Schedule Demo
//             </Button>
//           </Stack>
//         </Paper>

//         {/* FOOTER */}
//         <Box mt={{ xs: 6, md: 10 }} pt={{ xs: 4, md: 6 }} borderTop="1px solid rgba(255,255,255,0.1)">
//           <Grid container spacing={{ xs: 3, md: 4 }}>
//             <Grid item xs={12} md={4}>
//               <Stack direction="row" alignItems="center" spacing={1} mb={2}>
//                 <AccountBalance sx={{ color: '#6366F1' }} />
//                 <Typography variant="h6" color="white" fontWeight={800}>
//                   PayGlobal
//                 </Typography>
//               </Stack>
//               <Typography 
//                 color="rgba(255,255,255,0.7)"
//                 sx={{ fontSize: { xs: '0.85rem', md: '0.95rem' } }}
//               >
//                 Next-generation payment infrastructure for global businesses
//               </Typography>
//             </Grid>
//             <Grid item xs={6} md={2}>
//               <Typography color="white" fontWeight={700} mb={2}>Product</Typography>
//               <Stack spacing={1}>
//                 <Typography color="rgba(255,255,255,0.7)" sx={{ fontSize: { xs: '0.85rem', md: '0.95rem' } }}>Features</Typography>
//                 <Typography color="rgba(255,255,255,0.7)" sx={{ fontSize: { xs: '0.85rem', md: '0.95rem' } }}>Pricing</Typography>
//                 <Typography color="rgba(255,255,255,0.7)" sx={{ fontSize: { xs: '0.85rem', md: '0.95rem' } }}>API</Typography>
//               </Stack>
//             </Grid>
//             <Grid item xs={6} md={2}>
//               <Typography color="white" fontWeight={700} mb={2}>Company</Typography>
//               <Stack spacing={1}>
//                 <Typography color="rgba(255,255,255,0.7)" sx={{ fontSize: { xs: '0.85rem', md: '0.95rem' } }}>About</Typography>
//                 <Typography color="rgba(255,255,255,0.7)" sx={{ fontSize: { xs: '0.85rem', md: '0.95rem' } }}>Careers</Typography>
//                 <Typography color="rgba(255,255,255,0.7)" sx={{ fontSize: { xs: '0.85rem', md: '0.95rem' } }}>Contact</Typography>
//               </Stack>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <Typography color="white" fontWeight={700} mb={2}>Stay Updated</Typography>
//               <Typography 
//                 color="rgba(255,255,255,0.7)" 
//                 mb={2}
//                 sx={{ fontSize: { xs: '0.85rem', md: '0.95rem' } }}
//               >
//                 Get the latest updates on payments and fintech
//               </Typography>
//               <Button 
//                 fullWidth={isMobile}
//                 variant="outlined" 
//                 sx={{ 
//                   borderColor: 'rgba(255,255,255,0.3)', 
//                   color: 'white',
//                   '&:hover': { borderColor: 'white' }
//                 }}
//               >
//                 Subscribe
//               </Button>
//             </Grid>
//           </Grid>
//           <Divider sx={{ my: { xs: 3, md: 4 }, borderColor: 'rgba(255,255,255,0.1)' }} />
//           <Typography 
//             textAlign="center" 
//             color="rgba(255,255,255,0.5)"
//             sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}
//           >
//             © 2026 PayGlobal. All rights reserved. | Terms | Privacy | Security
//           </Typography>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default Gateway;


import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
  Paper,
  Avatar,
  IconButton,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import {
  Language,
  CurrencyExchange,
  Schedule,
  Assessment,
  VerifiedUser,
  Shield,
  Public,
  CloudDone,
  Speed,
  Menu,
  Close,
  ArrowForward,
  Payments,
  Api,
  IntegrationInstructions,
  AccountBalance,
  AutoAwesome
} from '@mui/icons-material';

const Gateway = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      icon: <Language />,
      title: 'Cross-Border Collections',
      description: 'Accept payments from 150+ countries with transparent FX and settlement visibility.',
      gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)'
    },
    {
      icon: <CurrencyExchange />,
      title: 'FX Transparency',
      description: 'Real-time exchange rates with clear conversion margins and competitive rates.',
      gradient: 'linear-gradient(135deg, #8B5CF6, #EC4899)'
    },
    {
      icon: <Schedule />,
      title: 'Predictable Settlements',
      description: 'Corridor-based payout cycles for cashflow visibility and financial planning.',
      gradient: 'linear-gradient(135deg, #EC4899, #F97316)'
    },
    {
      icon: <Assessment />,
      title: 'Centralized Reporting',
      description: 'Unified dashboard for transactions, FX rates, settlements, and analytics.',
      gradient: 'linear-gradient(135deg, #10B981, #059669)'
    },
    {
      icon: <VerifiedUser />,
      title: 'Embedded Compliance',
      description: 'Built-in KYC, AML, sanctions screening, and regulatory compliance.',
      gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)'
    },
    {
      icon: <Shield />,
      title: 'Risk Intelligence',
      description: 'AI-powered fraud detection, chargeback prevention, and risk scoring.',
      gradient: 'linear-gradient(135deg, #3B82F6, #6366F1)'
    }
  ];

  const stats = [
    { value: '150+', label: 'Countries', icon: <Public /> },
    { value: '99.9%', label: 'Uptime', icon: <CloudDone /> },
    { value: '<2s', label: 'Processing', icon: <Speed /> },
    { value: '24/7', label: 'Support', icon: <VerifiedUser /> }
  ];

  const integrations = [
    { name: 'Stripe', initial: 'ST' },
    { name: 'PayPal', initial: 'PP' },
    { name: 'Shopify', initial: 'SH' },
    { name: 'WooCommerce', initial: 'WC' }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CFO, TechCorp',
      initial: 'SC',
      text: 'The FX transparency and settlement visibility transformed our international operations. We reduced processing costs by 40%.'
    },
    {
      name: 'Michael Rodriguez',
      role: 'VP Finance, GlobalTrade',
      initial: 'MR',
      text: 'Outstanding platform with real-time compliance monitoring. The unified dashboard saves us hours every week.'
    },
    {
      name: 'Priya Sharma',
      role: 'CEO, FinanceHub',
      initial: 'PS',
      text: 'Best-in-class security and fraud prevention. Our chargeback rate dropped by 65% within 3 months.'
    }
  ];

  const useCases = [
    {
      title: 'E-commerce Platforms',
      description: 'Accept global payments with automatic currency conversion and multi-currency settlement.',
      icon: <Payments />
    },
    {
      title: 'SaaS Companies',
      description: 'Recurring billing in 135+ currencies with subscription management and revenue recognition.',
      icon: <Api />
    },
    {
      title: 'Marketplaces',
      description: 'Split payments, escrow services, and multi-party settlement for complex transactions.',
      icon: <IntegrationInstructions />
    }
  ];

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0e27, #1a1f3a)',
      overflowX: 'hidden'
    }}>
      {/* NAVIGATION */}
      <Box sx={{
        py: { xs: 1.5, sm: 2 },
        px: { xs: 2, sm: 3, md: 4 },
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        position: 'sticky',
        top: 0,
        backdropFilter: 'blur(10px)',
        background: 'rgba(10, 14, 39, 0.95)',
        zIndex: 1000
      }}>
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1 }}>
              <AccountBalance sx={{ color: '#6366F1', fontSize: { xs: 24, sm: 28, md: 32 } }} />
              <Typography 
                variant="h6" 
                color="white" 
                fontWeight={800}
                sx={{ fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' } }}
              >
                PayGlobal
              </Typography>
            </Stack>

            {isTablet ? (
              <IconButton 
                onClick={() => setMobileMenuOpen(true)} 
                sx={{ color: 'white', p: { xs: 0.5, sm: 1 } }}
              >
                <Menu />
              </IconButton>
            ) : (
              <Stack direction="row" spacing={3} alignItems="center">
                <Typography sx={{ 
                  color: 'rgba(255,255,255,0.8)', 
                  cursor: 'pointer', 
                  fontSize: '0.95rem',
                  '&:hover': { color: 'white' } 
                }}>
                  Products
                </Typography>
                <Typography sx={{ 
                  color: 'rgba(255,255,255,0.8)', 
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  '&:hover': { color: 'white' } 
                }}>
                  Pricing
                </Typography>
                <Typography sx={{ 
                  color: 'rgba(255,255,255,0.8)', 
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  '&:hover': { color: 'white' } 
                }}>
                  Docs
                </Typography>
                <Button variant="contained" size="small" sx={{ px: 3 }}>
                  Sign In
                </Button>
              </Stack>
            )}
          </Stack>
        </Container>
      </Box>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '75%', sm: '300px' },
            background: 'rgba(10, 14, 39, 0.98)',
            backdropFilter: 'blur(10px)',
            p: 2
          }
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography color="white" fontWeight={700}>Menu</Typography>
          <IconButton onClick={() => setMobileMenuOpen(false)} sx={{ color: 'white' }}>
            <Close />
          </IconButton>
        </Stack>
        <List>
          <ListItem button onClick={() => setMobileMenuOpen(false)}>
            <ListItemText primary="Products" sx={{ color: 'white' }} />
          </ListItem>
          <ListItem button onClick={() => setMobileMenuOpen(false)}>
            <ListItemText primary="Pricing" sx={{ color: 'white' }} />
          </ListItem>
          <ListItem button onClick={() => setMobileMenuOpen(false)}>
            <ListItemText primary="Docs" sx={{ color: 'white' }} />
          </ListItem>
          <ListItem>
            <Button variant="contained" fullWidth sx={{ mt: 2 }}>
              Sign In
            </Button>
          </ListItem>
        </List>
      </Drawer>

      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 5, md: 8 } }}>
        {/* HERO */}
        <Box textAlign="center" mb={{ xs: 5, sm: 7, md: 10 }}>
          <Chip
            icon={<AutoAwesome sx={{ fontSize: { xs: 14, sm: 16 } }} />}
            label="NEXT-GEN PAYMENT INFRASTRUCTURE"
            sx={{
              mb: { xs: 2, sm: 2.5, md: 3 },
              px: { xs: 1, sm: 1.5, md: 2 },
              py: { xs: 0.3, sm: 0.5, md: 1 },
              fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.85rem' },
              color: 'white',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(10px)',
              height: 'auto'
            }}
          />

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3.5rem', lg: '5rem' },
              fontWeight: 900,
              color: 'white',
              lineHeight: { xs: 1.2, md: 1.1 },
              mb: { xs: 1.5, sm: 2 },
              px: { xs: 2, sm: 1, md: 0 }
            }}
          >
            Global Payment Gateway
          </Typography>

          <Typography
            sx={{
              mt: { xs: 1.5, sm: 2 },
              fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.3rem', lg: '1.5rem' },
              color: 'rgba(255,255,255,0.8)',
              maxWidth: '800px',
              mx: 'auto',
              px: { xs: 2, sm: 3, md: 0 },
              lineHeight: { xs: 1.5, md: 1.6 }
            }}
          >
            Built for Compliance, Clarity and Control. Process payments across 150+ countries with enterprise-grade security.
          </Typography>

          {/* Hero Image */}
          <Box
            sx={{
              width: '100%',
              maxWidth: '900px',
              height: { xs: '180px', sm: '250px', md: '350px', lg: '400px' },
              borderRadius: { xs: 2, sm: 3, md: 4 },
              mt: { xs: 3, sm: 4, md: 6 },
              mx: 'auto',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3))',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <Typography color="rgba(255,255,255,0.5)" sx={{ fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
              Dashboard Preview
            </Typography>
          </Box>

          {/* STATS */}
          <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }} mt={{ xs: 3, sm: 4, md: 6 }}>
            {stats.map((s, i) => (
              <Grid item xs={6} sm={3} key={i}>
                <Box sx={{
                  p: { xs: 1.5, sm: 2, md: 3 },
                  borderRadius: { xs: 2, sm: 2.5, md: 3 },
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(10px)',
                  textAlign: 'center',
                  transition: '0.3s',
                  border: '1px solid rgba(255,255,255,0.05)',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.12)',
                    transform: 'translateY(-4px)'
                  }
                }}>
                  <Box 
                    color="#a5b4fc" 
                    sx={{ 
                      mb: { xs: 0.5, sm: 1 },
                      '& svg': { fontSize: { xs: 20, sm: 24, md: 28 } }
                    }}
                  >
                    {s.icon}
                  </Box>
                  <Typography 
                    fontWeight={800} 
                    color="white"
                    sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' } }}
                  >
                    {s.value}
                  </Typography>
                  <Typography 
                    color="rgba(255,255,255,0.7)"
                    sx={{ fontSize: { xs: '0.7rem', sm: '0.85rem', md: '1rem' } }}
                  >
                    {s.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* CTA */}
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={{ xs: 1.5, sm: 2 }}
            mt={{ xs: 3, sm: 4, md: 6 }}
            justifyContent="center"
            sx={{ px: { xs: 2, sm: 0 } }}
          >
            <Button 
              fullWidth={isMobile}
              variant="contained" 
              size={isMobile ? "medium" : "large"}
              endIcon={<ArrowForward />}
              sx={{ 
                py: { xs: 1.25, sm: 1.5, md: 2 },
                px: { xs: 3, sm: 4, md: 5 },
                fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' }
              }}
            >
              Get Started Free
            </Button>
            <Button 
              fullWidth={isMobile}
              variant="outlined" 
              size={isMobile ? "medium" : "large"}
              sx={{ 
                py: { xs: 1.25, sm: 1.5, md: 2 },
                px: { xs: 3, sm: 4, md: 5 },
                color: 'white', 
                borderColor: 'white',
                fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
                '&:hover': { borderColor: 'white', background: 'rgba(255,255,255,0.1)' }
              }}
            >
              Talk to Expert
            </Button>
          </Stack>
        </Box>

        <Divider sx={{ my: { xs: 5, sm: 7, md: 10 }, borderColor: 'rgba(255,255,255,0.1)' }} />

        {/* FEATURES */}
        <Box mb={{ xs: 5, sm: 7, md: 10 }}>
          <Typography 
            variant="h3" 
            color="white" 
            textAlign="center" 
            mb={{ xs: 1.5, sm: 2, md: 3 }}
            sx={{ 
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
              fontWeight: 800,
              px: { xs: 2, md: 0 }
            }}
          >
            Core Capabilities
          </Typography>
          <Typography
            textAlign="center"
            color="rgba(255,255,255,0.7)"
            mb={{ xs: 3, sm: 4, md: 6 }}
            sx={{ 
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              px: { xs: 2, md: 0 }
            }}
          >
            Enterprise-grade features designed for global commerce
          </Typography>

          <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
            {features.map((f, i) => (
              <Grid item xs={12} sm={6} lg={4} key={i}>
                <Card sx={{
                  height: '100%',
                  borderRadius: { xs: 2, sm: 2.5, md: 3 },
                  transition: '0.3s',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  '&:hover': { 
                    transform: 'translateY(-8px)',
                    background: 'rgba(255,255,255,0.08)',
                    boxShadow: '0 8px 24px rgba(99, 102, 241, 0.2)'
                  }
                }}>
                  <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                    <Box sx={{
                      width: { xs: 45, sm: 50, md: 60 },
                      height: { xs: 45, sm: 50, md: 60 },
                      borderRadius: 2,
                      background: f.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: { xs: 1.5, md: 2 },
                      color: 'white',
                      '& svg': { fontSize: { xs: 24, sm: 28, md: 32 } }
                    }}>
                      {f.icon}
                    </Box>
                    <Typography 
                      fontWeight={700}
                      color="white"
                      sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' }, mb: { xs: 0.75, md: 1 } }}
                    >
                      {f.title}
                    </Typography>
                    <Typography 
                      color="rgba(255,255,255,0.7)"
                      sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' }, lineHeight: 1.6 }}
                    >
                      {f.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: { xs: 5, sm: 7, md: 10 }, borderColor: 'rgba(255,255,255,0.1)' }} />

        {/* USE CASES */}
        <Box mb={{ xs: 5, sm: 7, md: 10 }}>
          <Typography 
            variant="h3" 
            color="white" 
            textAlign="center" 
            mb={{ xs: 3, sm: 4, md: 6 }}
            sx={{ 
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
              fontWeight: 800,
              px: { xs: 2, md: 0 }
            }}
          >
            Built for Your Industry
          </Typography>

          <Grid container spacing={{ xs: 2, sm: 2.5, md: 4 }}>
            {useCases.map((uc, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Paper sx={{
                  p: { xs: 2.5, sm: 3, md: 4 },
                  borderRadius: { xs: 2, sm: 2.5, md: 3 },
                  background: 'rgba(99, 102, 241, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  transition: '0.3s',
                  '&:hover': {
                    background: 'rgba(99, 102, 241, 0.15)',
                    transform: 'translateY(-4px)'
                  }
                }}>
                  <Box sx={{ 
                    color: '#6366F1', 
                    mb: { xs: 1.5, md: 2 },
                    '& svg': { fontSize: { xs: 32, sm: 36, md: 40 } }
                  }}>
                    {uc.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    color="white" 
                    fontWeight={700}
                    mb={{ xs: 0.75, md: 1 }}
                    sx={{ fontSize: { xs: '1rem', sm: '1.15rem', md: '1.3rem' } }}
                  >
                    {uc.title}
                  </Typography>
                  <Typography 
                    color="rgba(255,255,255,0.8)"
                    sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' }, lineHeight: 1.6 }}
                  >
                    {uc.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: { xs: 5, sm: 7, md: 10 }, borderColor: 'rgba(255,255,255,0.1)' }} />

        {/* INTEGRATIONS */}
        <Box mb={{ xs: 5, sm: 7, md: 10 }}>
          <Typography 
            variant="h3" 
            color="white" 
            textAlign="center" 
            mb={{ xs: 1.5, sm: 2, md: 3 }}
            sx={{ 
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
              fontWeight: 800
            }}
          >
            Seamless Integrations
          </Typography>
          <Typography
            textAlign="center"
            color="rgba(255,255,255,0.7)"
            mb={{ xs: 3, sm: 4, md: 6 }}
            sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}
          >
            Connect with your existing tools in minutes
          </Typography>

          <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} justifyContent="center">
            {integrations.map((int, i) => (
              <Grid item xs={6} sm={4} md={3} key={i}>
                <Paper sx={{
                  p: { xs: 2, sm: 2.5, md: 3 },
                  textAlign: 'center',
                  borderRadius: { xs: 2, sm: 2.5, md: 3 },
                  background: 'rgba(255,255,255,0.05)',
                  transition: '0.3s',
                  border: '1px solid rgba(255,255,255,0.08)',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.1)',
                    transform: 'scale(1.05)'
                  }
                }}>
                  <Avatar
                    sx={{ 
                      width: { xs: 50, sm: 60, md: 80 }, 
                      height: { xs: 50, sm: 60, md: 80 }, 
                      mx: 'auto', 
                      mb: { xs: 1, md: 1.5 },
                      background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                      fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
                      fontWeight: 700
                    }}
                  >
                    {int.initial}
                  </Avatar>
                  <Typography 
                    color="white" 
                    fontWeight={600}
                    sx={{ fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' } }}
                  >
                    {int.name}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: { xs: 5, sm: 7, md: 10 }, borderColor: 'rgba(255,255,255,0.1)' }} />

        {/* TESTIMONIALS */}
        <Box mb={{ xs: 5, sm: 7, md: 10 }}>
          <Typography 
            variant="h3" 
            color="white" 
            textAlign="center" 
            mb={{ xs: 3, sm: 4, md: 6 }}
            sx={{ 
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
              fontWeight: 800,
              px: { xs: 2, md: 0 }
            }}
          >
            Trusted by Industry Leaders
          </Typography>

          <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
            {testimonials.map((t, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card sx={{
                  height: '100%',
                  p: { xs: 2, sm: 2.5, md: 3 },
                  borderRadius: { xs: 2, sm: 2.5, md: 3 },
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: '0.3s',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.08)'
                  }
                }}>
                  <Stack direction="row" spacing={{ xs: 1.5, md: 2 }} mb={{ xs: 1.5, md: 2 }} alignItems="center">
                    <Avatar 
                      sx={{ 
                        width: { xs: 45, sm: 50, md: 60 }, 
                        height: { xs: 45, sm: 50, md: 60 },
                        background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                        fontWeight: 700
                      }}
                    >
                      {t.initial}
                    </Avatar>
                    <Box>
                      <Typography 
                        color="white" 
                        fontWeight={700}
                        sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}
                      >
                        {t.name}
                      </Typography>
                      <Typography 
                        color="rgba(255,255,255,0.6)"
                        sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.9rem' } }}
                      >
                        {t.role}
                      </Typography>
                    </Box>
                  </Stack>
                  <Typography 
                    color="rgba(255,255,255,0.8)"
                    sx={{ 
                      fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                      fontStyle: 'italic',
                      lineHeight: 1.6
                    }}
                  >
                    "{t.text}"
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* FINAL CTA */}
        <Paper sx={{
          p: { xs: 3, sm: 4, md: 6 },
          borderRadius: { xs: 2, sm: 3, md: 4 },
          background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
          textAlign: 'center'
        }}>
          <Typography 
            variant="h3" 
            color="white" 
            fontWeight={800}
            mb={{ xs: 1.5, md: 2 }}
            sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' } }}
          >
            Ready to Go Global?
          </Typography>
          <Typography 
            color="rgba(255,255,255,0.9)" 
            mb={{ xs: 3, md: 4 }}
            sx={{ 
              fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.2rem' },
              maxWidth: '600px',
              mx: 'auto',
              px: { xs: 1, sm: 0 }
            }}
          >
            Join thousands of businesses processing billions in payments worldwide
          </Typography>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={{ xs: 1.5, sm: 2 }}
            justifyContent="center"
            sx={{ px: { xs: 2, sm: 0 } }}
          >
            <Button 
              fullWidth={isMobile}
              variant="contained" 
              size={isMobile ? "medium" : "large"}
              sx={{ 
                py: { xs: 1.25, sm: 1.5, md: 2 },
                px: { xs: 3, sm: 4, md: 5 },
                fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
                background: 'white',
                color: '#6366F1',
                fontWeight: 700,
                '&:hover': {
                  background: 'rgba(255,255,255,0.9)'
                }
              }}
            >
              Start Free Trial
            </Button>
            <Button 
              fullWidth={isMobile}
              variant="outlined" 
              size={isMobile ? "medium" : "large"}
              sx={{ 
                py: { xs: 1.25, sm: 1.5, md: 2 },
                px: { xs: 3, sm: 4, md: 5 },
                color: 'white', 
                borderColor: 'white',
                fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
                fontWeight: 700,
                '&:hover': { 
                  borderColor: 'white', 
                  background: 'rgba(255,255,255,0.1)' 
                }
              }}
            >
              Schedule Demo
            </Button>
          </Stack>
        </Paper>
      </Container>

      {/* FOOTER */}
      <Box sx={{
        mt: { xs: 5, sm: 7, md: 10 },
        py: { xs: 3, sm: 4, md: 5 },
        px: { xs: 2, sm: 3, md: 4 },
        borderTop: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(10, 14, 39, 0.5)'
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 3, sm: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <AccountBalance sx={{ color: '#6366F1', fontSize: { xs: 24, md: 28 } }} />
                <Typography color="white" fontWeight={800} sx={{ fontSize: { xs: '1rem', md: '1.15rem' } }}>
                  PayGlobal
                </Typography>
              </Stack>
              <Typography color="rgba(255,255,255,0.6)" sx={{ fontSize: { xs: '0.85rem', md: '0.9rem' } }}>
                Enterprise payment infrastructure for global commerce
              </Typography>
            </Grid>
            
            <Grid item xs={6} sm={6} md={3}>
              <Typography color="white" fontWeight={700} mb={2} sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                Product
              </Typography>
              <Stack spacing={1}>
                {['Features', 'Pricing', 'Security', 'API'].map(item => (
                  <Typography 
                    key={item}
                    color="rgba(255,255,255,0.6)" 
                    sx={{ 
                      cursor: 'pointer',
                      fontSize: { xs: '0.8rem', md: '0.9rem' },
                      '&:hover': { color: 'white' }
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={6} sm={6} md={3}>
              <Typography color="white" fontWeight={700} mb={2} sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                Company
              </Typography>
              <Stack spacing={1}>
                {['About', 'Blog', 'Careers', 'Contact'].map(item => (
                  <Typography 
                    key={item}
                    color="rgba(255,255,255,0.6)" 
                    sx={{ 
                      cursor: 'pointer',
                      fontSize: { xs: '0.8rem', md: '0.9rem' },
                      '&:hover': { color: 'white' }
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography color="white" fontWeight={700} mb={2} sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                Legal
              </Typography>
              <Stack spacing={1}>
                {['Privacy', 'Terms', 'Compliance', 'Cookies'].map(item => (
                  <Typography 
                    key={item}
                    color="rgba(255,255,255,0.6)" 
                    sx={{ 
                      cursor: 'pointer',
                      fontSize: { xs: '0.8rem', md: '0.9rem' },
                      '&:hover': { color: 'white' }
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: { xs: 3, md: 4 }, borderColor: 'rgba(255,255,255,0.1)' }} />

          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            justifyContent="space-between" 
            alignItems="center"
            spacing={{ xs: 1.5, sm: 0 }}
          >
            <Typography 
              color="rgba(255,255,255,0.5)" 
              textAlign={{ xs: 'center', sm: 'left' }}
              sx={{ fontSize: { xs: '0.75rem', md: '0.85rem' } }}
            >
              © 2025 PayGlobal. All rights reserved.
            </Typography>
            <Stack direction="row" spacing={{ xs: 2, sm: 3 }}>
              {['Twitter', 'LinkedIn', 'GitHub'].map(social => (
                <Typography 
                  key={social}
                  color="rgba(255,255,255,0.5)" 
                  sx={{ 
                    cursor: 'pointer',
                    fontSize: { xs: '0.75rem', md: '0.85rem' },
                    '&:hover': { color: 'white' }
                  }}
                >
                  {social}
                </Typography>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Gateway;