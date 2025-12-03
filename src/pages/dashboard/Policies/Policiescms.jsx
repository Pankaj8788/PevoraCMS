import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Grid,
  CircularProgress,
} from '@mui/material'
import Swal from 'sweetalert2'
import apiFetch from '../../../services/api'

const PAGES = [
  { key: 'privacy-policy', label: 'Privacy Policy', getPath: '/cms/privacy-policy', updatePath: '/cms/privacy-policy' },
  { key: 'terms-and-conditions', label: 'Terms & Conditions', getPath: '/cms/terms-and-conditions', updatePath: '/cms/terms-and-conditions' },
  { key: 'refund-policy', label: 'Refund Policy', getPath: '/cms/refund-policy', updatePath: '/cms/refund-policy' },
  { key: 'cancellation-policy', label: 'Cancellation Policy', getPath: '/cms/cancellation-policy', updatePath: '/cms/cancellation-policy' },
]

const Policiescms = () => {
  const [selected, setSelected] = useState(PAGES[0].key)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadPage(selected)
  }, [selected])

  async function loadPage(key) {
    const page = PAGES.find((p) => p.key === key)
    if (!page) return
    setLoading(true)
    try {
      const res = await apiFetch(page.getPath)
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const data = await res.json()
      let rawContent = (data && data.page && data.page.content) || ''
      // Extract text from <p> tags if present
      if (rawContent.startsWith('<p>') && rawContent.endsWith('</p>')) {
        rawContent = rawContent.replace(/^<p>(.*)<\/p>$/s, '$1')
      }
      setContent(rawContent)
    } catch (err) {
      Swal.fire('Error', `Failed to load ${page.label}: ${err.message}`, 'error')
      setContent('')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    const page = PAGES.find((p) => p.key === selected)
    if (!page) return
    if (!content || !content.trim()) {
      Swal.fire('Validation', 'Content cannot be empty', 'warning')
      return
    }

    setSaving(true)
    try {
      const res = await apiFetch(page.updatePath, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.message || `Request failed: ${res.status}`)

      Swal.fire('Success', result.message || 'CMS content updated successfully', 'success')
      // reload to reflect latest timestamps if needed
      await loadPage(selected)
    } catch (err) {
      Swal.fire('Error', `Failed to save: ${err.message}`, 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Policies / CMS Pages
        </Typography>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          {PAGES.map((p) => (
            <Grid item key={p.key}>
              <Button
                variant={selected === p.key ? 'contained' : 'outlined'}
                onClick={() => setSelected(p.key)}
              >
                {p.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Paper sx={{ p: 3 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {PAGES.find((p) => p.key === selected).label}
            </Typography>

            <TextField
              fullWidth
              multiline
              minRows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter content here (will be wrapped in <p> tags automatically)"
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button onClick={() => loadPage(selected)} sx={{ mr: 2 }}>
                Reload
              </Button>
              <Button variant="contained" color="primary" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </Button>
            </Box>

            {/* Preview */}
            {content && (
              <Box sx={{ mt: 4, p: 2, backgroundColor: '#f5f7fa', borderRadius: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                  Preview:
                </Typography>
                <Box
                  sx={{
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    color: '#2c3e50',
                  }}
                >
                  {content}
                </Box>
              </Box>
            )}
          </>
        )}
      </Paper>
    </Box>
  )
}

export default Policiescms