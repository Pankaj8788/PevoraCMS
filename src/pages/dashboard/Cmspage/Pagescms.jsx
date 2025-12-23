import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Grid,
} from '@mui/material'
import Swal from 'sweetalert2'
import apiFetch from '../../../services/api'

const Pagescms = () => {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    pageName: 'Home',
    metaTitle: '',
    metaKeywords: '',
    description: '',
  })

  // Fetch page details
  useEffect(() => {
    fetchPageData()
  }, [])

  async function fetchPageData() {
    setLoading(true)
    try {
      const res = await apiFetch(`/pages/?page=${formData.pageName}`)
      const data = await res.json()

      if (!res.ok) throw new Error(data.message || 'Failed to fetch page details')

      setFormData({
        pageName: data.page?.pageName || 'Home',
        metaTitle: data.page?.metaTitle || '',
        metaKeywords: data.page?.metaKeywords || '',
        description: data.page?.description || '',
      })
    } catch (err) {
      Swal.fire('Error', err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  // Handle input change
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Save/Update meta info
  async function handleSave() {
    if (!formData.pageName.trim() || !formData.metaTitle.trim()) {
      Swal.fire('Validation Error', 'Page name and Meta title are required', 'warning')
      return
    }

    setSaving(true)
    try {
      const res = await apiFetch('/pages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const result = await res.json()

      if (!res.ok) throw new Error(result.message || 'Update failed')

      Swal.fire('Success', result.message || 'Meta updated successfully', 'success')
    } catch (err) {
      Swal.fire('Error', err.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#2c3e50' }}>
        Page Meta Management
      </Typography>

      <Paper
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          maxWidth: 800,
          mx: 'auto',
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Page Name"
                value={formData.pageName}
                onChange={(e) => handleChange('pageName', e.target.value)}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Meta Title"
                value={formData.metaTitle}
                onChange={(e) => handleChange('metaTitle', e.target.value)}
                margin="normal"
                placeholder="e.g., Home | Edsom Fintech"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Meta Keywords"
                value={formData.metaKeywords}
                onChange={(e) => handleChange('metaKeywords', e.target.value)}
                margin="normal"
                placeholder="e.g., fintech, edsom, home"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                margin="normal"
                multiline
                minRows={3}
                placeholder="Enter meta description..."
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Box>
  )
}

export default Pagescms
