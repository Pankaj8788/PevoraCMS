import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Avatar,
  Badge,
  useTheme,
  useMediaQuery,
  CssBaseline,
  Chip,
  Tooltip,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Outlet, useLocation } from 'react-router-dom';
import {
  Menu as MenuIcon,
  ContentPaste as ContentPasteIcon,
  ViewCarousel as BannerIcon,
  Article as BlogIcon,
  Newspaper as NewsIcon,
  Dashboard as CMSIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  AddBox as AddTeamIcon,
  Group as TeamsIcon,
  Inventory as ProductListIcon,
  Collections as GalleryIcon,
  Work as CareerIcon,
  Description as PagesIcon,
  ContactMail as ContactIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  AccountCircle,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 260;

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openContentMgmt, setOpenContentMgmt] = useState(true);
  const [selectedItem, setSelectedItem] = useState('Banners');
  const [darkMode, setDarkMode] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleContentMgmtClick = () => {
    setOpenContentMgmt(!openContentMgmt);
  };

  const handleMenuItemClick = (text, path) => {
    setSelectedItem(text);
    if (path) {
      // If this is a dashboard "content" path, route under /navbar so it renders in the layout
      try {
        if (path.startsWith('/content')) {
          navigate(`/navbar${path}`);
        } else {
          navigate(path);
        }
      } catch {
        navigate(path);
      }
    }
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  function handleLogout() {
    try {
      localStorage.removeItem('token')
      localStorage.removeItem('authToken')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('tokenExpiry')
      localStorage.removeItem('userInfo')
    } catch (e) {
      console.warn('Failed to clear localStorage on logout', e)
    }
    navigate('/')
  }

  const location = useLocation()

  const menuItems = [
    {
      text: 'Content Management',
      icon: <ContentPasteIcon />,
      expandable: true,
      subItems: [
        { text: 'Banners', icon: <BannerIcon />, path: '/content/banners', badge: 4 },
        { text: 'Blog', icon: <BlogIcon />, path: '/content/blog', badge: 12 },
        { text: 'News', icon: <NewsIcon />, path: '/content/news', badge: 8 },
        { text: 'CMS', icon: <CMSIcon />, path: '/content/cms' },
      ],
    },
    { text: 'Home Page', icon: <HomeIcon />, path: '/navbar/home' },
    { text: 'About Us', icon: <InfoIcon />, path: '/navbar/about' },
    { text: 'Add Team Type', icon: <AddTeamIcon />, path: '/navbar/team-type' },
    { text: 'Teams', icon: <TeamsIcon />, path: '/navbar/teams', badge: 5 },
    { text: 'Product List', icon: <ProductListIcon />, path: '/navbar/content/products', badge: 23 },
    { text: 'Gallery', icon: <GalleryIcon />, path: '/navbar/gallery' },
    { text: 'Career', icon: <CareerIcon />, path: '/navbar/career', badge: 3 },
    { text: 'Pages', icon: <PagesIcon />, path: '/navbar/pages' },
    { text: 'Contact Us', icon: <ContactIcon />, path: '/navbar/contact' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/navbar/settings' },
  ];

  const drawer = (
    <Box 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #03c395 0%, #4f0648ff 100%)',
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          p: 2.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Avatar
          sx={{
            bgcolor: '#fff',
            width: 45,
            height: 45,
            color: '#5e35b1',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          }}
        >
          EF
        </Avatar>
        <Box>
          <Typography
            variant="h6"
            sx={{
              color: '#fff',
              fontWeight: 700,
              letterSpacing: 0.5,
              fontSize: '1.1rem',
              lineHeight: 1.2,
            }}
          >
            PIVORA GLOBAL
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.7rem',
            }}
          >
            Admin Dashboard
          </Typography>
        </Box>
      </Box>

      {/* Menu Items */}
      <Box 
        sx={{ 
          flexGrow: 1, 
          overflowY: 'auto',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(255, 255, 255, 0.05)',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '3px',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.3)',
            },
          },
        }}
      >
        <List sx={{ px: 1.5, py: 2 }}>
          {menuItems.map((item) => {
            if (item.expandable) {
              return (
                <Box key={item.text}>
                  <ListItem disablePadding sx={{ mb: 0.5 }}>
                    <ListItemButton
                      onClick={handleContentMgmtClick}
                      sx={{
                        borderRadius: 2,
                        color: '#fff',
                        py: 1.2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                          transform: 'translateX(4px)',
                        },
                      }}
                    >
                      <ListItemIcon sx={{ color: '#fff', minWidth: 40 }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                          fontSize: '0.9rem',
                          fontWeight: 600,
                        }}
                      />
                      {openContentMgmt ? (
                        <ExpandLess sx={{ color: '#fff' }} />
                      ) : (
                        <ExpandMore sx={{ color: '#fff' }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                  <Collapse in={openContentMgmt} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem) => (
                        <ListItem key={subItem.text} disablePadding sx={{ mb: 0.5 }}>
                          <ListItemButton
                            selected={selectedItem === subItem.text}
                            onClick={() => handleMenuItemClick(subItem.text, subItem.path)}
                            sx={{
                              pl: 4,
                              borderRadius: 2,
                              color: '#fff',
                              py: 1,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                transform: 'translateX(4px)',
                              },
                              '&.Mui-selected': {
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                },
                              },
                            }}
                          >
                            <ListItemIcon sx={{ color: '#fff', minWidth: 36 }}>
                              {subItem.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={subItem.text}
                              primaryTypographyProps={{
                                fontSize: '0.85rem',
                                fontWeight: selectedItem === subItem.text ? 600 : 400,
                              }}
                            />
                            {subItem.badge && (
                              <Chip
                                label={subItem.badge}
                                size="small"
                                sx={{
                                  height: 20,
                                  fontSize: '0.7rem',
                                  backgroundColor: '#ff4081',
                                  color: '#fff',
                                  fontWeight: 'bold',
                                }}
                              />
                            )}
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              );
            }

            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  selected={selectedItem === item.text}
                  onClick={() => handleMenuItemClick(item.text, item.path)}
                  sx={{
                    borderRadius: 2,
                    color: '#fff',
                    py: 1.2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      transform: 'translateX(4px)',
                    },
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: '#fff', minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '0.9rem',
                      fontWeight: selectedItem === item.text ? 600 : 500,
                    }}
                  />
                  {item.badge && (
                    <Chip
                      label={item.badge}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.7rem',
                        backgroundColor: '#ff4081',
                        color: '#fff',
                        fontWeight: 'bold',
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          p: 2,
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            display: 'block',
            textAlign: 'center',
          }}
        >
          © 2025 PIVORA Global. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          background: 'linear-gradient(135deg, #03c395 0%, #4f0648ff  100%)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                display: { md: 'none' },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              color="inherit"
              sx={{ 
                display: { xs: 'none', md: 'flex' },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              sx={{
                display: { xs: 'none', sm: 'block' },
                fontWeight: 600,
                letterSpacing: 0.5,
              }}
            >
              Dashboard
            </Typography>
          </Box>

          {/* Right side icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Search">
              <IconButton
                color="inherit"
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Toggle theme">
              <IconButton
                color="inherit"
                onClick={() => setDarkMode(!darkMode)}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Notifications">
              <IconButton
                color="inherit"
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <Badge badgeContent={12} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Divider orientation="vertical" flexItem sx={{ mx: 1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

            {/* Admin Profile */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
                padding: '6px 12px',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: '#ff4081',
                  width: 38,
                  height: 38,
                  fontWeight: 'bold',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}
              >
                A
              </Avatar>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography
                  variant="body2"
                  sx={{ 
                    color: '#fff', 
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  admin
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.7rem',
                  }}
                >
                  Administrator
                </Typography>
              </Box>
            </Box>
            <Tooltip title="Logout">
              <IconButton color="inherit" onClick={handleLogout} sx={{ ml: 1 }}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              border: 'none',
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              border: 'none',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: '#f5f7fa',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        
        {/* Content Area: render child routes when available, otherwise show default dashboard */}
        <Box sx={{ mt: 2 }}>
          {location.pathname !== '/' && location.pathname !== '/navbar' ? (
            <Outlet />
          ) : (
            <>
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700, 
                  color: '#2c3e50',
                  mb: 1,
                }}
              >
                Welcome to Dashboard
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#7f8c8d', 
                  mb: 4,
                }}
              >
                Manage your content and settings from the sidebar navigation
              </Typography>

              {/* Sample Content Card */}
              <Box
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: 3,
                  p: 4,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#2c3e50' }}>
                  Dashboard Overview
                </Typography>
                <Typography variant="body1" sx={{ color: '#7f8c8d', lineHeight: 1.8 }}>
                  This is a fully responsive dashboard with a beautiful Material-UI sidebar. 
                  The navigation automatically converts to a mobile drawer on smaller screens. 
                  All menu items are interactive with smooth animations and hover effects.
                </Typography>
                
                <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Chip
                    label="Fully Responsive"
                    color="primary"
                    sx={{ fontWeight: 600 }}
                  />
                  <Chip
                    label="Material-UI"
                    color="secondary"
                    sx={{ fontWeight: 600 }}
                  />
                  <Chip
                    label="Modern Design"
                    sx={{ 
                      backgroundColor: '#667eea', 
                      color: '#fff',
                      fontWeight: 600,
                    }}
                  />
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;