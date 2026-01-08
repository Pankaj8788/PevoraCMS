import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Skeleton,
  Alert,
  Chip,
  Avatar,
  useTheme,
  useMediaQuery,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
// removed dialog icon import
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';


const BASE_URL = 'https://testapicms.pvorasp.com/api/';
const IMAGE_BASE_URL = 'https://testapicms.pvorasp.com/uploads/blogs/';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();

  // Navigate to blog details page
  const handleReadArticle = (blog) => {
    navigate(`/blog/${blog.id}`);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}public/blogs`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      
      const data = await response.json();
      console.log('Fetched blogs:', data);
      
      const activeBlogs = data.filter(blog => blog.status === 1);
      setBlogs(activeBlogs);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching blogs:', err);
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

  const cleanString = (str) => {
    if (!str) return '';
    return str.replace(/^"|"$/g, '');
  };

  const formatDate = (dateString) => {
    try {
      const cleanDate = cleanString(dateString);
      const date = new Date(cleanDate);
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getReadTime = (content) => {
    const text = stripHtml(content);
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <Box sx={{ py: 8, bgcolor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Skeleton variant="text" width={200} height={60} sx={{ mx: 'auto' }} />
            <Skeleton variant="text" width={400} height={30} sx={{ mx: 'auto', mt: 2 }} />
          </Box>
          <Grid container spacing={4}>
            {[1, 2, 3].map((i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 3 }} />
                <Skeleton variant="text" width="80%" sx={{ mt: 2 }} />
                <Skeleton variant="text" width="60%" />
              </Grid>
            ))}
          </Grid>
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

  if (blogs.length === 0) {
    return (
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            No blogs available at the moment.
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        bgcolor: '#f8f9fa',
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography
            variant={isMobile ? 'h3' : 'h2'}
            sx={{
              fontWeight: 800,
              color: '#1a1a1a',
              mb: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Our Blog
          </Typography>
          <Typography
            variant={isMobile ? 'body1' : 'h6'}
            sx={{
              color: 'text.secondary',
              fontWeight: 400,
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            Insights, stories, and expert advice to help you grow
          </Typography>
        </Box>

        {/* Blog Grid */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                    '& .blog-image': {
                      transform: 'scale(1.08)'
                    },
                    '& .read-more': {
                      transform: 'translateX(5px)'
                    }
                  }
                }}
              >
                {/* Image Section */}
                <Box
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    bgcolor: '#e0e0e0',
                    height: 240
                  }}
                >
                  <CardMedia
                    component="img"
                    image={
                      blog.image
                        ? `${IMAGE_BASE_URL}${blog.image}`
                        : 'https://via.placeholder.com/400x240?text=No+Image'
                    }
                    alt={cleanString(blog.title)}
                    className="blog-image"
                    sx={{
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease-in-out'
                    }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x240?text=No+Image';
                    }}
                  />
                  
                  {/* Date Badge */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      bgcolor: 'white',
                      borderRadius: 2,
                      px: 2,
                      py: 1,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 700,
                        color: '#667eea',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                      }}
                    >
                      <Calendar size={14} />
                      {formatDate(blog.blogDate).split(',')[0]}
                    </Typography>
                  </Box>
                </Box>

                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3
                  }}
                >
                  {/* Meta Info */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      mb: 2,
                      flexWrap: 'wrap'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Avatar
                        sx={{
                          width: 24,
                          height: 24,
                          bgcolor: '#667eea',
                          fontSize: '0.75rem'
                        }}
                      >
                        {cleanString(blog.blogBy).charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                        {cleanString(blog.blogBy)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Clock size={14} color="#666" />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {getReadTime(blog.description)}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1.5,
                      color: '#1a1a1a',
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {cleanString(blog.title)}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.7,
                      mb: 2,
                      flexGrow: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {stripHtml(blog.description)}
                  </Typography>

                  {/* Keywords */}
                  {blog.metaKeywords && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2 }}>
                      {cleanString(blog.metaKeywords)
                        .split(',')
                        .slice(0, 2)
                        .map((keyword, i) => (
                          <Chip
                            key={i}
                            label={keyword.trim()}
                            size="small"
                            sx={{
                              bgcolor: 'rgba(102, 126, 234, 0.08)',
                              color: '#667eea',
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              height: 24
                            }}
                          />
                        ))}
                    </Box>
                  )}

                  {/* Read More */}
                  <Box
                    sx={{
                      pt: 2,
                      borderTop: '1px solid',
                      borderColor: 'divider',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleReadArticle(blog)}
                  >
                    <Typography
                      variant="body2"
                      className="read-more"
                      sx={{
                        color: '#667eea',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      Read Article
                      <ArrowRight size={16} />
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default BlogList;