import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Chip,
  Stack,
  Paper,
  Divider,
  InputAdornment
} from '@mui/material';
import {
  Mail,
  TrendingUp,
  Calendar,
  User,
  Send,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const NewsletterSignup = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('https://testapicms.pvorasp.com/api/public/news');
      if (!response.ok) throw new Error('Failed to fetch news');
      const data = await response.json();
      setNewsData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setSubscribeLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubscribeSuccess(true);
      setEmail('');
      setTimeout(() => setSubscribeSuccess(false), 5000);
    } catch (err) {
      console.error('Subscribe error:', err);
    } finally {
      setSubscribeLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)' }}>
      <Container maxWidth="xl">
        {/* Newsletter Signup Section */}
        <Paper
          elevation={0}
          sx={{
            background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
            borderRadius: 4,
            p: { xs: 4, md: 6 },
            mb: 8,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -50,
              right: -50,
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              pointerEvents: 'none'
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -50,
              left: -50,
              width: 250,
              height: 250,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              pointerEvents: 'none'
            }
          }}
        >
          <Grid container spacing={4} sx={{ position: 'relative', zIndex: 1 }}>
            <Grid item xs={12} md={6}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <Mail size={24} color="white" />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '0.9rem',
                      color: 'rgba(255,255,255,0.8)',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}
                  >
                    Stay Updated
                  </Typography>
                </Box>

                <Typography
                  variant="h3"
                  sx={{
                    color: 'white',
                    fontWeight: 800,
                    mb: 2,
                    fontSize: { xs: '1.8rem', md: '2.5rem' },
                    lineHeight: 1.2
                  }}
                >
                  Get Latest Fintech News
                </Typography>

                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '1rem',
                    lineHeight: 1.8,
                    mb: 3
                  }}
                >
                  Subscribe to our newsletter and never miss out on important financial technology updates, market insights, and industry trends.
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                  <Chip
                    icon={<CheckCircle2 size={16} />}
                    label="Weekly Updates"
                    sx={{
                      background: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontWeight: 600
                    }}
                  />
                  <Chip
                    icon={<TrendingUp size={16} />}
                    label="Market Insights"
                    sx={{
                      background: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontWeight: 600
                    }}
                  />
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                component="form"
                onSubmit={handleSubscribe}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  height: '100%',
                  justifyContent: 'center'
                }}
              >
                {subscribeSuccess && (
                  <Alert
                    severity="success"
                    sx={{
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <CheckCircle2 size={20} />
                    Thanks for subscribing! Check your email for confirmation.
                  </Alert>
                )}

                <TextField
                  fullWidth
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={20} color="#1976d2" />
                      </InputAdornment>
                    ),
                    style: { borderRadius: '12px' }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      background: 'white',
                      borderRadius: 2,
                      fontSize: '1rem',
                      '&:hover fieldset': {
                        borderColor: '#1976d2'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1976d2',
                        borderWidth: 2
                      }
                    }
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={subscribeLoading}
                  sx={{
                    py: 1.75,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 700,
                    background: '#00E5FF',
                    color: '#1565c0',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: '#26C6F9',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 30px rgba(0,229,255,0.4)'
                    },
                    '&:disabled': {
                      background: 'rgba(255,255,255,0.3)',
                      color: 'white'
                    }
                  }}
                >
                  {subscribeLoading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CircularProgress size={20} sx={{ color: '#1565c0' }} />
                      Subscribing...
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Send size={20} />
                      Subscribe Now
                    </Box>
                  )}
                </Button>

                <Typography sx={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
                  We respect your privacy. Unsubscribe anytime.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* News Section */}
        <Box>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Chip
              label="Latest News"
              variant="outlined"
              sx={{
                borderColor: '#1976d2',
                color: '#1976d2',
                fontSize: '0.9rem',
                fontWeight: 600,
                mb: 2
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
                color: '#1a1a1a'
              }}
            >
              Financial News & Updates
            </Typography>
            <Typography
              sx={{
                color: '#666',
                fontSize: '1.1rem',
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              Stay informed with the latest fintech industry news, market trends, and technological innovations.
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          {newsData.length > 0 ? (
            <Grid container spacing={4}>
              {/* Featured News Card */}
              <Grid item xs={12}>
                <Card
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
                    },
                    background: 'white'
                  }}
                >
                  <Grid container sx={{ height: '100%' }}>
                    <Grid item xs={12} md={6}>
                      <CardMedia
                        component="img"
                        height="350"
                        image={newsData[0]?.image ? `https://testapicms.pvorasp.com/uploads/${newsData[0]?.image}` : 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'}
                        alt={newsData[0]?.title}
                        sx={{
                          objectFit: 'cover',
                          height: { xs: '250px', md: '100%' }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 4 }}>
                        <Box sx={{ mb: 2 }}>
                          <Chip
                            label="Featured"
                            sx={{
                              background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                              color: 'white',
                              fontWeight: 600,
                              mb: 2
                            }}
                          />
                        </Box>

                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 800,
                            mb: 2,
                            color: '#1a1a1a',
                            lineHeight: 1.3
                          }}
                        >
                          {newsData[0]?.title}
                        </Typography>

                        <Typography
                          sx={{
                            color: '#666',
                            fontSize: '1rem',
                            mb: 3,
                            lineHeight: 1.6,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                          dangerouslySetInnerHTML={{
                            __html: newsData[0]?.description?.replace(/<[^>]*>/g, '')
                          }}
                        />

                        <Box sx={{ mt: 'auto', pt: 3, borderTop: '1px solid #e0e0e0' }}>
                          <Stack
                            direction="row"
                            spacing={2}
                            sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}
                          >
                            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                              <Calendar size={16} color="#1976d2" />
                              <Typography sx={{ fontSize: '0.85rem', color: '#666' }}>
                                {new Date(newsData[0]?.newsDate).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric'
                                })}
                              </Typography>
                            </Stack>
                            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                              <User size={16} color="#1976d2" />
                              <Typography sx={{ fontSize: '0.85rem', color: '#666' }}>
                                {newsData[0]?.newsBy}
                              </Typography>
                            </Stack>
                          </Stack>

                          <Button
                            endIcon={<ArrowRight size={18} />}
                            sx={{
                              color: '#1976d2',
                              fontWeight: 700,
                              textTransform: 'none',
                              fontSize: '1rem',
                              '&:hover': {
                                background: 'rgba(25, 118, 210, 0.05)'
                              }
                            }}
                          >
                            Read Full Article
                          </Button>
                        </Box>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>

              {/* Other News Cards */}
              {newsData.slice(1).map((news, index) => (
                <Grid item xs={12} sm={6} md={4} key={news.id || index}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.12)'
                      },
                      background: 'white'
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={news?.image ? `https://testapicms.pvorasp.com/uploads/${news?.image}` : 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400'}
                      alt={news?.title}
                      sx={{ objectFit: 'cover' }}
                    />

                    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        <Chip
                          label="News"
                          size="small"
                          sx={{
                            background: 'rgba(25, 118, 210, 0.1)',
                            color: '#1976d2',
                            fontWeight: 600
                          }}
                        />
                      </Stack>

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          color: '#1a1a1a',
                          lineHeight: 1.3,
                          minHeight: '50px'
                        }}
                      >
                        {news?.title}
                      </Typography>

                      <Typography
                        sx={{
                          color: '#666',
                          fontSize: '0.9rem',
                          mb: 2,
                          lineHeight: 1.6,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                        dangerouslySetInnerHTML={{
                          __html: news?.description?.replace(/<[^>]*>/g, '')
                        }}
                      />

                      <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px solid #e0e0e0' }}>
                        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 2 }}>
                          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                            <Calendar size={14} color="#1976d2" />
                            <Typography sx={{ fontSize: '0.75rem', color: '#999' }}>
                              {new Date(news?.newsDate).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short'
                              })}
                            </Typography>
                          </Stack>
                          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                            <User size={14} color="#1976d2" />
                            <Typography sx={{ fontSize: '0.75rem', color: '#999' }}>
                              {news?.newsBy}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Button
                          fullWidth
                          variant="outlined"
                          size="small"
                          endIcon={<ArrowRight size={16} />}
                          sx={{
                            borderColor: '#1976d2',
                            color: '#1976d2',
                            fontWeight: 600,
                            textTransform: 'none',
                            '&:hover': {
                              background: 'rgba(25, 118, 210, 0.05)',
                              borderColor: '#1565c0'
                            }
                          }}
                        >
                          Read More
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography color="textSecondary">No news available at the moment.</Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default NewsletterSignup;