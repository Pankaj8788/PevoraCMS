
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Skeleton,
  Alert,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Sparkles } from 'lucide-react';

const BASE_URL = 'https://testapicms.pvorasp.com/api/';

const ProductHighlight = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}public/products`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      console.log('Fetched products:', data); // Debug log
      
      const activeProducts = data.filter(p => p.status === 1 && p.showOnHomePage === 1);
      console.log('Active products:', activeProducts); // Debug log
      
      // Duplicate products for seamless loop
      setProducts([...activeProducts, ...activeProducts, ...activeProducts]);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const stripHtml = (html) => {
    if (!html) return '';
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  if (loading) {
    return (
      <Box sx={{ py: 8, bgcolor: 'background.default', overflow: 'hidden' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Skeleton variant="text" width={300} height={60} sx={{ mx: 'auto' }} />
            <Skeleton variant="text" width={500} height={30} sx={{ mx: 'auto', mt: 2 }} />
          </Box>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                width={isMobile ? 280 : 350}
                height={400}
                sx={{ borderRadius: 4 }}
              />
            ))}
          </Box>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Alert severity="error" sx={{ borderRadius: 2 }}>
            {error}
          </Alert>
        </Container>
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            No products available to display.
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        margin: 0,
        padding: 0,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, md: 3 } }}>
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 8 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
            <Sparkles size={isMobile ? 24 : 32} color="#FFD700" />
            <Typography
              variant={isMobile ? 'h4' : 'h3'}
              sx={{
                fontWeight: 800,
                color: 'white',
                textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
                letterSpacing: '-0.02em'
              }}
            >
              Featured Products
            </Typography>
            <Sparkles size={isMobile ? 24 : 32} color="#FFD700" />
          </Box>
          <Typography
            variant={isMobile ? 'body1' : 'h6'}
            sx={{
              color: 'rgba(255,255,255,0.95)',
              fontWeight: 300,
              maxWidth: 600,
              mx: 'auto',
              textShadow: '1px 1px 4px rgba(0,0,0,0.2)'
            }}
          >
            Discover our exceptional collection of premium products
          </Typography>
        </Box>

        {/* Marquee Container */}
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: { xs: 40, md: 100 },
              zIndex: 2,
              pointerEvents: 'none'
            },
            '&::before': {
              left: 0,
              background: 'linear-gradient(to right, rgba(102, 126, 234, 1), transparent)'
            },
            '&::after': {
              right: 0,
              background: 'linear-gradient(to left, rgba(118, 75, 162, 1), transparent)'
            }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: { xs: 2, md: 3 },
              animation: 'marquee 40s linear infinite',
              '&:hover': {
                animationPlayState: 'paused'
              },
              '@keyframes marquee': {
                '0%': {
                  transform: 'translateX(0)'
                },
                '100%': {
                  transform: 'translateX(-33.333%)'
                }
              }
            }}
          >
            {products.map((product, index) => (
              <Card
                key={`${product.id}-${index}`}
                sx={{
                  minWidth: { xs: 280, sm: 320, md: 380 },
                  maxWidth: { xs: 280, sm: 320, md: 380 },
                  bgcolor: 'white',
                  borderRadius: 4,
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.02)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                    '& .product-image': {
                      transform: 'scale(1.1)'
                    }
                  }
                }}
              >
                <Box sx={{ position: 'relative', overflow: 'hidden', bgcolor: '#f5f5f5' }}>
                  {product.showOnHomePage === 1 && (
                    <Chip
                      label="Featured"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        zIndex: 1,
                        bgcolor: '#FFD700',
                        color: '#000',
                        fontWeight: 700,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                      }}
                    />
                  )}
                  <CardMedia
                    component="img"
                    height={isMobile ? "200" : "240"}
                    image={
                      product.productImage || 
                      product.bannerImage || 
                      'https://via.placeholder.com/380x240?text=No+Image'
                    }
                    alt={product.heading}
                    className="product-image"
                    sx={{
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease-in-out'
                    }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/380x240?text=No+Image';
                    }}
                  />
                </Box>

                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography
                    variant={isMobile ? 'h6' : 'h5'}
                    sx={{
                      fontWeight: 700,
                      mb: 1.5,
                      color: '#1a1a1a',
                      lineHeight: 1.3
                    }}
                  >
                    {product.heading}
                  </Typography>

                  {product.metaKeywords && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 1.5 }}>
                      {product.metaKeywords.split(',').slice(0, 3).map((keyword, i) => (
                        <Chip
                          key={i}
                          label={keyword.trim()}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(102, 126, 234, 0.1)',
                            color: '#667eea',
                            fontSize: '0.75rem',
                            fontWeight: 600
                          }}
                        />
                      ))}
                    </Box>
                  )}

                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.6,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      mb: 2
                    }}
                  >
                    {stripHtml(product.description) || stripHtml(product.content)}
                  </Typography>

                  <Box
                    sx={{
                      pt: 2,
                      borderTop: '1px solid',
                      borderColor: 'divider',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 500
                      }}
                    >
                      {new Date(product.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric'
                      })}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#667eea',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        fontSize: '0.875rem',
                        letterSpacing: '0.05em'
                      }}
                    >
                      Learn More →
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductHighlight;