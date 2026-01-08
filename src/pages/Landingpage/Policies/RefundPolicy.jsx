import { Box, Container, Paper, Typography, CircularProgress, Alert } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { apiClient } from '../../../services/api'

const RefundPolicy = () => {
  const [policy, setPolicy] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRefundPolicy = async () => {
      try {
        setLoading(true)
        const response = await apiClient.get('/public/policy/refund-policy')
        setPolicy(response.data)
        setError(null)
      } catch (err) {
        console.error('Error fetching refund policy:', err)
        setError(err.message || 'Failed to load refund policy')
        setPolicy(null)
      } finally {
        setLoading(false)
      }
    }

    fetchRefundPolicy()
  }, [])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            mb: 4,
            fontWeight: 700,
            color: '#1a1a1a',
            textAlign: 'center',
          }}
        >
          Refund Policy
        </Typography>

        <Box
          sx={{
            '& *': {
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            },
            '& p': {
              mb: 2,
              lineHeight: 1.8,
              color: '#333',
              fontSize: '1rem',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            },
            '& h1': {
              mt: 4,
              mb: 2,
              color: '#1a1a1a',
              fontWeight: 700,
              fontSize: '2rem',
            },
            '& h2': {
              mt: 4,
              mb: 2,
              color: '#1a1a1a',
              fontWeight: 700,
              fontSize: '1.5rem',
            },
            '& h3': {
              mt: 3,
              mb: 1.5,
              color: '#333',
              fontWeight: 600,
              fontSize: '1.25rem',
            },
            '& h4, & h5, & h6': {
              mt: 2.5,
              mb: 1,
              color: '#333',
              fontWeight: 600,
            },
            '& ul': {
              mb: 2,
              ml: 4,
              pl: 2,
              '& li': {
                mb: 1,
                color: '#333',
                lineHeight: 1.8,
              },
            },
            '& ol': {
              mb: 2,
              ml: 4,
              pl: 2,
              '& li': {
                mb: 1,
                color: '#333',
                lineHeight: 1.8,
              },
            },
            '& a': {
              color: '#1976d2',
              textDecoration: 'none',
              fontWeight: 500,
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            '& strong, & b': {
              fontWeight: 700,
              color: '#1a1a1a',
            },
            '& em, & i': {
              fontStyle: 'italic',
            },
            '& blockquote': {
              mt: 2,
              mb: 2,
              pl: 3,
              borderLeft: '4px solid #1976d2',
              backgroundColor: '#f5f5f5',
              padding: '1rem',
              borderRadius: '4px',
              fontStyle: 'italic',
              color: '#555',
            },
            '& code': {
              backgroundColor: '#f5f5f5',
              padding: '2px 6px',
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '0.9em',
              color: '#d63384',
            },
            '& pre': {
              backgroundColor: '#f5f5f5',
              padding: '1rem',
              borderRadius: '4px',
              overflow: 'auto',
              mb: 2,
              '& code': {
                backgroundColor: 'transparent',
                color: '#333',
                padding: 0,
              },
            },
            '& hr': {
              my: 3,
              borderColor: '#ddd',
            },
            '& table': {
              width: '100%',
              borderCollapse: 'collapse',
              mb: 2,
              '& th, & td': {
                border: '1px solid #ddd',
                padding: '12px',
                textAlign: 'left',
              },
              '& th': {
                backgroundColor: '#f5f5f5',
                fontWeight: 600,
              },
              '& tr:nth-of-type(even)': {
                backgroundColor: '#fafafa',
              },
            },
            '& img': {
              maxWidth: '100%',
              height: 'auto',
              mb: 2,
              borderRadius: '4px',
            },
          }}
          dangerouslySetInnerHTML={{ __html: policy?.content }}
        />

        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: '#666' }}>
            Last updated: {policy?.updatedAt ? new Date(policy.updatedAt).toLocaleDateString() : 'N/A'}
          </Typography>
          <Typography variant="body2" sx={{ color: '#666' }}>
            Policy ID: {policy?.id}
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

export default RefundPolicy