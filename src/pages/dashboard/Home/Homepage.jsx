import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  CircularProgress,
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Swal from 'sweetalert2'
import apiFetch from '../../../services/api'

const Homepage = () => {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState({
    heading: '',
    content: '',
    buttonName: '',
    buttonLink: '',
    image: null,
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  useEffect(() => {
    fetchHomepage()
  }, [])

  async function fetchHomepage() {
    setLoading(true)
    try {
      const res = await apiFetch('/homepage')
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const json = await res.json()
      const home = (json && json.homepage) || {}
      let content = home.content || ''
      // strip wrapping <p>...</p> if present
      if (content.startsWith('<p>') && content.endsWith('</p>')) {
        content = content.replace(/^<p>(.*)<\/p>$/s, '$1')
      }
      setData({
        heading: home.heading || '',
        content,
        buttonName: home.buttonName || '',
        buttonLink: home.buttonLink || '',
        image: home.image || null,
      })
      setImagePreview(home.image ? `https://testapicms.pvorasp.com/api/uploads/${home.image}` : null)
    } catch (err) {
      Swal.fire('Error', `Failed to load homepage: ${err.message}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  function handleChange(field, value) {
    setData((d) => ({ ...d, [field]: value }))
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  async function handleSave() {
    if (!data.heading.trim() || !data.content.trim()) {
      Swal.fire('Validation', 'Heading and content are required', 'warning')
      return
    }

    setSaving(true)
    try {
      const form = new FormData()
      // Wrap content in <p> if not already
      const contentToSend = data.content.startsWith('<p>') ? data.content : `<p>${data.content}</p>`
      form.append('content', contentToSend)
      form.append('buttonName', data.buttonName || '')
      form.append('buttonLink', data.buttonLink || '')
      form.append('heading', data.heading || '')
      if (imageFile) form.append('image', imageFile)

      const res = await apiFetch('/homepage', {
        method: 'PUT',
        body: form,
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.message || `Request failed: ${res.status}`)

      Swal.fire('Success', json.message || 'Homepage content updated successfully', 'success')
      await fetchHomepage()
    } catch (err) {
      Swal.fire('Error', `Failed to update homepage: ${err.message}`, 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Homepage Editor
      </Typography>

      <Paper sx={{ p: 3 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Heading"
                value={data.heading}
                onChange={(e) => handleChange('heading', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />}>
                Upload Image
                <input hidden accept="image/*" type="file" onChange={handleImageChange} />
              </Button>
              {imagePreview && (
                <Box sx={{ mt: 2 }}>
                  <img src={imagePreview} alt="Homepage" style={{ maxWidth: 200, borderRadius: 8 }} />
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={6}
                label="Content"
                value={data.content}
                onChange={(e) => handleChange('content', e.target.value)}
                placeholder="Enter plain content (will be wrapped in <p> tags)"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Button Name"
                value={data.buttonName}
                onChange={(e) => handleChange('buttonName', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Button Link"
                value={data.buttonLink}
                onChange={(e) => handleChange('buttonLink', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'right' }}>
              <Button onClick={fetchHomepage} sx={{ mr: 2 }}>Reload</Button>
              <Button variant="contained" color="primary" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </Button>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Box>
  )
}

export default Homepage