import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, CircularProgress } from '@mui/material';

const BASE_URL = 'https://testapicms.pvorasp.com/api/';
const IMAGE_BASE_URL = 'https://testapicms.pvorasp.com/uploads/blogs/';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}public/blogs`);
        if (!response.ok) throw new Error('Failed to fetch blog');
        const data = await response.json();
        const found = data.find((b) => String(b.id) === String(id));
        setBlog(found);
        setError(!found ? 'Blog not found.' : null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography color="error" variant="h5" align="center">{error}</Typography>
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 3 }}>
        Back to Blog List
      </Button>
      <Box>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
          {blog.title}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 2 }}>
          By {blog.blogBy} | {new Date(blog.blogDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </Typography>
        {blog.image && (
          <Box sx={{ mb: 3 }}>
            <img
              src={blog.image.startsWith('http') ? blog.image : `${IMAGE_BASE_URL}${blog.image}`}
              alt={blog.title}
              style={{ width: '100%', borderRadius: 12, maxHeight: 400, objectFit: 'cover' }}
            />
          </Box>
        )}
        <Box sx={{ color: 'text.primary', fontSize: '1.1rem', lineHeight: 1.7 }}
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />
      </Box>
    </Container>
  );
};

export default BlogDetails;