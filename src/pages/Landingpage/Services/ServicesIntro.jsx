import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Skeleton,
  Alert,
  Button,
  Stack,
  
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';

const ServicesIntro = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://testapicms.pvorasp.com/api/public/products');
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      setProducts(data.filter(product => product.status === 1));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  if (loading) {
    return (
      <Box sx={{ 
        py: { xs: 6, md: 10 },
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh'
      }}>
        <Container maxWidth="lg">
          <Skeleton variant="text" width="60%" height={80} sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.1)' }} />
          <Skeleton variant="text" width="40%" height={40} sx={{ mb: 8, bgcolor: 'rgba(255,255,255,0.1)' }} />
          <Grid container spacing={4}>
            {[1, 2].map((item) => (
              <Grid item xs={12} key={item}>
                <Card sx={{ borderRadius: 4 }}>
                  <Grid container>
                    <Grid item xs={12} md={5}>
                      <Skeleton variant="rectangular" height={400} />
                    </Grid>
                    <Grid item xs={12} md={7}>
                      <Box sx={{ p: 4 }}>
                        <Skeleton variant="text" width="80%" height={50} />
                        <Skeleton variant="text" width="100%" height={25} sx={{ mt: 2 }} />
                        <Skeleton variant="text" width="100%" height={25} />
                        <Skeleton variant="text" width="90%" height={25} />
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        py: { xs: 6, md: 10 },
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Container maxWidth="sm">
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3,
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}
          >
            {error}
          </Alert>
          <Button 
            variant="contained" 
            onClick={fetchProducts}
            fullWidth
            size="large"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 3,
              py: 1.5,
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 600
            }}
          >
            Retry Loading
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      background: 'linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        background: 'radial-gradient(circle at 20% 50%, #667eea 0%, transparent 50%), radial-gradient(circle at 80% 80%, #764ba2 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 10 } }}>
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
          {/* Decorative Icon Row */}
          <Stack 
            direction="row" 
            spacing={3} 
            justifyContent="center" 
            sx={{ mb: 4, opacity: 0.9 }}
          >
            <Box sx={{ 
              p: 2, 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TrendingUpIcon sx={{ color: 'white', fontSize: { xs: 24, md: 32 } }} />
            </Box>
            <Box sx={{ 
              p: 2, 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <SecurityIcon sx={{ color: 'white', fontSize: { xs: 24, md: 32 } }} />
            </Box>
            <Box sx={{ 
              p: 2, 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <SpeedIcon sx={{ color: 'white', fontSize: { xs: 24, md: 32 } }} />
            </Box>
          </Stack>

          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              mb: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
              lineHeight: 1.1
            }}
          >
            Our Products & Services
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '800px',
              mx: 'auto',
              fontSize: { xs: '1.1rem', md: '1.4rem' },
              lineHeight: 1.6,
              fontWeight: 400
            }}
          >
            Innovative fintech solutions designed to transform your digital payments and financial operations
          </Typography>
        </Box>

        {/* Products Grid */}
        <Grid container spacing={{ xs: 3, md: 5 }}>
          {products.map((product, index) => (
            <Grid item xs={12} key={product.id}>
              <Card
                sx={{
                  overflow: 'hidden',
                  borderRadius: 4,
                  background: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    boxShadow: '0 30px 80px rgba(102, 126, 234, 0.4)',
                    transform: 'translateY(-8px)',
                    border: '1px solid rgba(102, 126, 234, 0.3)'
                  }
                }}
              >
                <Grid container>
                  {/* Image Section */}
                  <Grid
                    item
                    xs={12}
                    md={5}
                    sx={{
                      order: { xs: 1, md: index % 2 === 0 ? 1 : 2 },
                      position: 'relative'
                    }}
                  >
                    <Box sx={{ 
                      position: 'relative',
                      overflow: 'hidden',
                      height: '100%'
                    }}>
                      <CardMedia
                        component="img"
                        image={product.productImage}
                        alt={product.heading}
                        sx={{
                          height: { xs: 280, sm: 320, md: '100%' },
                          minHeight: { md: 450 },
                          objectFit: 'cover',
                          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            transform: 'scale(1.05)'
                          }
                        }}
                      />
                      <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(180deg, transparent 0%, rgba(15, 12, 41, 0.3) 100%)',
                        pointerEvents: 'none'
                      }} />
                    </Box>
                  </Grid>

                  {/* Content Section */}
                  <Grid
                    item
                    xs={12}
                    md={7}
                    sx={{
                      order: { xs: 2, md: index % 2 === 0 ? 2 : 1 }
                    }}
                  >
                    <CardContent
                      sx={{
                        p: { xs: 3, sm: 4, md: 6 },
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        background: index % 2 === 0 
                          ? 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(240,242,255,1) 100%)'
                          : 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,240,245,1) 100%)'
                      }}
                    >
                      {/* Badge */}
                      {product.showOnHomePage === 1 && (
                        <Chip
                          label="Featured Solution"
                          size="small"
                          sx={{
                            mb: 3,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            fontWeight: 700,
                            width: 'fit-content',
                            px: 1,
                            fontSize: '0.85rem',
                            letterSpacing: '0.5px',
                            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                          }}
                        />
                      )}

                      {/* Title */}
                      <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                          fontWeight: 800,
                          mb: 3,
                          fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                          color: '#0f0c29',
                          lineHeight: 1.2,
                          letterSpacing: '-0.01em'
                        }}
                      >
                        {product.heading}
                      </Typography>

                      {/* Description */}
                      <Typography
                        variant="body1"
                        sx={{
                          color: '#4a5568',
                          mb: 4,
                          lineHeight: 1.9,
                          fontSize: { xs: '1rem', md: '1.125rem' },
                          fontWeight: 400
                        }}
                      >
                        {stripHtml(product.description)}
                      </Typography>

                      {/* Features */}
                      {product.features && stripHtml(product.features) !== stripHtml(product.description) && (
                        <Box sx={{ mb: 4 }}>
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'flex-start', 
                            gap: 2,
                            p: 3,
                            borderRadius: 3,
                            background: 'rgba(102, 126, 234, 0.05)',
                            border: '1px solid rgba(102, 126, 234, 0.1)'
                          }}>
                            <CheckCircleIcon sx={{ 
                              color: '#10b981', 
                              fontSize: 24, 
                              mt: 0.3,
                              filter: 'drop-shadow(0 2px 4px rgba(16, 185, 129, 0.3))'
                            }} />
                            <Typography
                              variant="body1"
                              sx={{
                                color: '#2d3748',
                                lineHeight: 1.8,
                                fontSize: { xs: '0.95rem', md: '1.05rem' },
                                fontWeight: 500
                              }}
                            >
                              {stripHtml(product.features)}
                            </Typography>
                          </Box>
                        </Box>
                      )}

                      {/* CTA Button */}
                      <Button
                        variant="contained"
                        size="large"
                        sx={{
                          mt: 'auto',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          textTransform: 'none',
                          fontWeight: 700,
                          px: 5,
                          py: 2,
                          borderRadius: 3,
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          width: { xs: '100%', sm: 'fit-content' },
                          boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                          transition: 'all 0.3s ease',
                          letterSpacing: '0.3px',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                            boxShadow: '0 15px 40px rgba(102, 126, 234, 0.5)',
                            transform: 'translateY(-2px)'
                          }
                        }}
                      >
                        Learn More →
                      </Button>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {products.length === 0 && !loading && (
          <Box sx={{ 
            textAlign: 'center', 
            py: 10,
            px: 3,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: 600
              }}
            >
              No products available at the moment
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.6)',
                mt: 2
              }}
            >
              Please check back soon for our latest fintech solutions
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ServicesIntro;