// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import {
//   AppBar,
//   Toolbar,
//   Button,
//   IconButton,
//   Drawer,
//   List,
//   ListItemButton,
//   Typography,
//   Box,
//   useTheme,
//   useMediaQuery,
//   Container
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import CloseIcon from '@mui/icons-material/Close';
// import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

// const Header = () => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

//   const navigationItems = [
//     { label: 'Home', path: '/' },
//     { label: 'About', path: '/about' },
//     { label: 'Services', path: '/services' },
//     { label: 'Pivora Gateway', path: '/gateway' },
//     { label: 'Blog', path: '/blog' },
//     { label: 'Careers', path: '/careers' },
//     { label: 'Contact', path: '/contact' },
//     { label: 'Login', path: '/login' }
//   ];

//   const toggleDrawer = (open) => (event) => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }
//     setDrawerOpen(open);
//   };

//   const handleDrawerLinkClick = () => {
//     setDrawerOpen(false);
//   };

//   return (
//     <>
//       <AppBar 
//         position="sticky" 
//         elevation={0}
//         sx={{ 
//           backgroundColor: '#ffffff',
//           borderBottom: '1px solid',
//           borderColor: 'rgba(0, 0, 0, 0.08)',
//           backdropFilter: 'blur(8px)'
//         }}
//       >
//         <Container maxWidth="xl">
//           <Toolbar 
//             disableGutters
//             sx={{ 
//               minHeight: { xs: 64, md: 72 },
//               justifyContent: 'space-between'
//             }}
//           >
//             {/* Logo/Brand */}
//             <NavLink 
//               to="/" 
//               style={{ 
//                 textDecoration: 'none', 
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '10px'
//               }}
//             >
//               <Box
//                 sx={{
//                   width: 40,
//                   height: 40,
//                   background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
//                   borderRadius: '10px',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   boxShadow: '0 4px 14px 0 rgba(25, 118, 210, 0.25)'
//                 }}
//               >
//                 <RocketLaunchIcon sx={{ color: '#fff', fontSize: 24 }} />
//               </Box>
//               <Typography 
//                 variant="h6" 
//                 component="div"
//                 sx={{ 
//                   fontWeight: 700,
//                   background: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
//                   WebkitBackgroundClip: 'text',
//                   WebkitTextFillColor: 'transparent',
//                   fontSize: { xs: '1.1rem', md: '1.35rem' },
//                   letterSpacing: '-0.5px'
//                 }}
//               >
//                 Pivora Global Technology
//               </Typography>
//             </NavLink>

//             {/* Desktop Navigation */}
//             {!isMobile && (
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                 {navigationItems.map((item) => (
//                   <Button
//                     key={item.path}
//                     component={NavLink}
//                     to={item.path}
//                     end={item.path === '/'}
//                     sx={{
//                       color: '#616161',
//                       textTransform: 'none',
//                       fontSize: '0.9375rem',
//                       fontWeight: 500,
//                       px: 2,
//                       py: 1,
//                       borderRadius: '8px',
//                       position: 'relative',
//                       transition: 'all 0.2s ease',
//                       '&.active': {
//                         color: '#1976d2',
//                         fontWeight: 600,
//                         backgroundColor: 'rgba(25, 118, 210, 0.08)'
//                       },
//                       '&:hover': {
//                         color: '#1976d2',
//                         backgroundColor: 'rgba(25, 118, 210, 0.04)'
//                       }
//                     }}
//                   >
//                     {item.label}
//                   </Button>
//                 ))}
                
//                 {/* CTA Button */}
//                 <Button
//                   component={NavLink}
//                   to="/login"
//                   variant="contained"
//                   disableElevation
//                   sx={{
//                     ml: 2,
//                     textTransform: 'none',
//                     fontWeight: 600,
//                     fontSize: '0.9375rem',
//                     px: 3,
//                     py: 1,
//                     borderRadius: '8px',
//                     background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
//                     transition: 'all 0.3s ease',
//                     '&:hover': {
//                       background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
//                       transform: 'translateY(-1px)',
//                       boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
//                     }
//                   }}
//                 >
//                   Get Started
//                 </Button>
//               </Box>
//             )}

//             {/* Mobile Menu Icon */}
//             {isMobile && (
//               <IconButton
//                 edge="end"
//                 onClick={toggleDrawer(true)}
//                 sx={{ 
//                   color: '#1976d2',
//                   '&:hover': {
//                     backgroundColor: 'rgba(25, 118, 210, 0.08)'
//                   }
//                 }}
//               >
//                 <MenuIcon sx={{ fontSize: 28 }} />
//               </IconButton>
//             )}
//           </Toolbar>
//         </Container>
//       </AppBar>
//       <Drawer
//         anchor="right"
//         open={drawerOpen}
//         onClose={toggleDrawer(false)}
//         sx={{
//           '& .MuiDrawer-paper': {
//             width: 300,
//             background: '#ffffff'
//           }
//         }}
//       >
//         {/* Drawer Header */}
//         <Box 
//           sx={{ 
//             display: 'flex', 
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             p: 2.5,
//             borderBottom: '1px solid',
//             borderColor: 'rgba(0, 0, 0, 0.08)'
//           }}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//             <Box
//               sx={{
//                 width: 36,
//                 height: 36,
//                 background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
//                 borderRadius: '8px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center'
//               }}
//             >
//               <RocketLaunchIcon sx={{ color: '#fff', fontSize: 20 }} />
//             </Box>
//             <Typography 
//               variant="subtitle1"
//               sx={{ 
//                 fontWeight: 700,
//                 color: '#1976d2',
//                 fontSize: '1rem'
//               }}
//             >
//               Pivora
//             </Typography>
//           </Box>
//           <IconButton 
//             onClick={toggleDrawer(false)}
//             sx={{ 
//               color: '#616161',
//               '&:hover': {
//                 backgroundColor: 'rgba(0, 0, 0, 0.04)'
//               }
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </Box>

//         {/* Drawer Navigation */}
//         <List sx={{ px: 2, py: 3 }}>
//           {navigationItems.map((item) => (
//             <ListItemButton
//               key={item.path}
//               component={NavLink}
//               to={item.path}
//               end={item.path === '/'}
//               onClick={handleDrawerLinkClick}
//               sx={{
//                 py: 1.5,
//                 px: 2,
//                 mb: 0.5,
//                 borderRadius: '8px',
//                 color: '#616161',
//                 fontWeight: 500,
//                 transition: 'all 0.2s ease',
//                 '&.active': {
//                   color: '#1976d2',
//                   fontWeight: 600,
//                   backgroundColor: 'rgba(25, 118, 210, 0.1)',
//                   borderLeft: '3px solid #1976d2',
//                   pl: 1.75
//                 },
//                 '&:hover': {
//                   backgroundColor: 'rgba(25, 118, 210, 0.04)',
//                   color: '#1976d2'
//                 }
//               }}
//             >
//               <Typography variant="body1" sx={{ fontSize: '0.9375rem', fontWeight: 'inherit' }}>
//                 {item.label}
//               </Typography>
//             </ListItemButton>
//           ))}
//         </List>

//         {/* Mobile CTA Button */}
//         <Box sx={{ px: 3, pb: 3 }}>
//           <Button
//             component={NavLink}
//             to="/login"
//             variant="contained"
//             fullWidth
//             disableElevation
//             onClick={handleDrawerLinkClick}
//             sx={{
//               textTransform: 'none',
//               fontWeight: 600,
//               fontSize: '0.9375rem',
//               py: 1.5,
//               borderRadius: '10px',
//               background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
//               '&:hover': {
//                 background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
//                 boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
//               }
//             }}
//           >
//             Get Started
//           </Button>
//         </Box>
//       </Drawer>
//     </>
//   );
// };

// export default Header;


import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Pivora Gateway', path: '/gateway' },
    { label: 'Blog', path: '/blog' },
    { label: 'Careers', path: '/careers' },
    { label: 'Contact', path: '/contact' },
    { label: 'Login', path: '/login' }
  ];

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleDrawerLinkClick = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          background: 'linear-gradient(135deg, rgba(15,32,39,0.98) 0%, rgba(32,58,67,0.98) 100%)',
          borderBottom: '1px solid rgba(0,255,200,0.2)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
          width: '100%',
          margin: 0,
          padding: 0
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 3 } }}>
          <Toolbar 
            disableGutters
            sx={{ 
              minHeight: { xs: 70, md: 80 },
              justifyContent: 'space-between'
            }}
          >
            {/* Logo/Brand */}
            <NavLink 
              to="/" 
              style={{ 
                textDecoration: 'none', 
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <Box
                sx={{
                  width: { xs: 42, md: 48 },
                  height: { xs: 42, md: 48 },
                  background: 'linear-gradient(135deg, #00ffc8 0%, #00a8ff 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(0,255,200,0.3)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
                    animation: 'shine 3s infinite'
                  }
                }}
              >
                <RocketLaunchIcon sx={{ color: '#0a1f2e', fontSize: { xs: 24, md: 28 }, fontWeight: 'bold' }} />
              </Box>
              <Typography 
                variant="h6" 
                component="div"
                sx={{ 
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #00ffc8 0%, #ffffff 50%, #00a8ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '1.1rem', md: '1.4rem' },
                  letterSpacing: '-0.5px',
                  textShadow: '0 0 30px rgba(0,255,200,0.3)'
                }}
              >
                Pivora Global Technology
              </Typography>
            </NavLink>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {navigationItems.slice(0, -1).map((item) => (
                  <Button
                    key={item.path}
                    component={NavLink}
                    to={item.path}
                    end={item.path === '/'}
                    sx={{
                      color: 'rgba(255,255,255,0.8)',
                      textTransform: 'none',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      px: 2.5,
                      py: 1,
                      borderRadius: '10px',
                      position: 'relative',
                      transition: 'all 0.3s ease',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: '2px',
                        background: 'linear-gradient(90deg, #00ffc8, #00a8ff)',
                        transition: 'width 0.3s ease'
                      },
                      '&.active': {
                        color: '#00ffc8',
                        fontWeight: 600,
                        background: 'rgba(0,255,200,0.1)',
                        '&::before': {
                          width: '70%'
                        }
                      },
                      '&:hover': {
                        color: '#00ffc8',
                        background: 'rgba(0,255,200,0.08)',
                        transform: 'translateY(-2px)',
                        '&::before': {
                          width: '70%'
                        }
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
                
                {/* CTA Buttons */}
                <Button
                  component={NavLink}
                  to="/login"
                  variant="outlined"
                  sx={{
                    ml: 1,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    px: 3,
                    py: 1,
                    borderRadius: '10px',
                    color: '#00ffc8',
                    borderColor: 'rgba(0,255,200,0.4)',
                    borderWidth: '1.5px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#00ffc8',
                      background: 'rgba(0,255,200,0.1)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(0,255,200,0.25)'
                    }
                  }}
                >
                  Login
                </Button>

                <Button
                  variant="contained"
                  disableElevation
                  sx={{
                    ml: 1.5,
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    px: 3.5,
                    py: 1,
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #00ffc8 0%, #00a8ff 100%)',
                    color: '#0a1f2e',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 6px 20px rgba(0,255,200,0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #00e6b8 0%, #0096e6 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 30px rgba(0,255,200,0.5)'
                    }
                  }}
                >
                  Get Started
                </Button>
              </Box>
            )}

            {/* Mobile Menu Icon */}
            {isMobile && (
              <IconButton
                edge="end"
                onClick={toggleDrawer(true)}
                sx={{ 
                  color: '#00ffc8',
                  background: 'rgba(0,255,200,0.1)',
                  borderRadius: '10px',
                  padding: '10px',
                  '&:hover': {
                    background: 'rgba(0,255,200,0.2)',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                <MenuIcon sx={{ fontSize: 28 }} />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '85%', sm: 340 },
            maxWidth: '400px',
            background: 'linear-gradient(180deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
            borderLeft: '1px solid rgba(0,255,200,0.2)',
            boxShadow: '-10px 0 40px rgba(0,0,0,0.5)'
          }
        }}
      >
        {/* Drawer Header */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 3,
            borderBottom: '1px solid rgba(0,255,200,0.2)',
            background: 'rgba(0,255,200,0.05)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                background: 'linear-gradient(135deg, #00ffc8 0%, #00a8ff 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 20px rgba(0,255,200,0.3)'
              }}
            >
              <RocketLaunchIcon sx={{ color: '#0a1f2e', fontSize: 22, fontWeight: 'bold' }} />
            </Box>
            <Typography 
              variant="subtitle1"
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #00ffc8 0%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '1.1rem'
              }}
            >
              Pivora
            </Typography>
          </Box>
          <IconButton 
            onClick={toggleDrawer(false)}
            sx={{ 
              color: 'rgba(255,255,255,0.8)',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              '&:hover': {
                background: 'rgba(255,255,255,0.15)',
                color: '#00ffc8'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Drawer Navigation */}
        <List sx={{ px: 2.5, py: 3, flexGrow: 1 }}>
          {navigationItems.map((item, ) => (
            <ListItemButton
              key={item.path}
              component={NavLink}
              to={item.path}
              end={item.path === '/'}
              onClick={handleDrawerLinkClick}
              sx={{
                py: 1.8,
                px: 2.5,
                mb: 1,
                borderRadius: '12px',
                color: 'rgba(255,255,255,0.8)',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: '3px',
                  background: 'linear-gradient(180deg, #00ffc8, #00a8ff)',
                  transform: 'scaleY(0)',
                  transition: 'transform 0.3s ease'
                },
                '&.active': {
                  color: '#00ffc8',
                  fontWeight: 700,
                  background: 'rgba(0,255,200,0.15)',
                  boxShadow: '0 4px 15px rgba(0,255,200,0.2)',
                  '&::before': {
                    transform: 'scaleY(1)'
                  }
                },
                '&:hover': {
                  background: 'rgba(0,255,200,0.1)',
                  color: '#00ffc8',
                  transform: 'translateX(5px)',
                  '&::before': {
                    transform: 'scaleY(1)'
                  }
                }
              }}
            >
              <Typography variant="body1" sx={{ fontSize: '0.95rem', fontWeight: 'inherit' }}>
                {item.label}
              </Typography>
            </ListItemButton>
          ))}
        </List>

        {/* Mobile CTA Buttons */}
        <Box sx={{ px: 3, pb: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            component={NavLink}
            to="/login"
            variant="outlined"
            fullWidth
            onClick={handleDrawerLinkClick}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              py: 1.5,
              borderRadius: '12px',
              color: '#00ffc8',
              borderColor: 'rgba(0,255,200,0.5)',
              borderWidth: '1.5px',
              '&:hover': {
                borderColor: '#00ffc8',
                background: 'rgba(0,255,200,0.1)',
                boxShadow: '0 4px 15px rgba(0,255,200,0.25)'
              }
            }}
          >
            Login
          </Button>

          <Button
            variant="contained"
            fullWidth
            disableElevation
            onClick={handleDrawerLinkClick}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '0.95rem',
              py: 1.5,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #00ffc8 0%, #00a8ff 100%)',
              color: '#0a1f2e',
              boxShadow: '0 6px 20px rgba(0,255,200,0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #00e6b8 0%, #0096e6 100%)',
                boxShadow: '0 8px 30px rgba(0,255,200,0.5)'
              }
            }}
          >
            Get Started
          </Button>
        </Box>

        {/* Decorative Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '30%',
            right: '-50px',
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(0,255,200,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            pointerEvents: 'none'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            left: '-50px',
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(0,168,255,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            pointerEvents: 'none'
          }}
        />
      </Drawer>

      <style>
        {`
          @keyframes shine {
            0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
            100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
          }
        `}
      </style>
    </>
  );
};

export default Header;