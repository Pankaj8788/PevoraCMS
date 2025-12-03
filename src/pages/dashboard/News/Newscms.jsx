import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Swal from 'sweetalert2'
import apiFetch from '../../../services/api'

const Newscms = () => {
  const [newsList, setNewsList] = useState([])
  const [loading, setLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    newsDate: '',
    newsBy: '',
    description: '',
    metaTitle: '',
    metaKeywords: '',
    metaDescription: '',
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  // Fetch all news on mount
  useEffect(() => {
    fetchNews()
  }, [])

  async function fetchNews() {
    setLoading(true)
    try {
      const res = await apiFetch('/news')
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
      const data = await res.json()
      setNewsList(data.news || [])
    } catch (err) {
      Swal.fire('Error', `Failed to fetch news: ${err.message}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  function handleFormChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }))
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

  function openCreateDialog() {
    setEditingId(null)
    setFormData({
      title: '',
      newsDate: '',
      newsBy: '',
      description: '',
      metaTitle: '',
      metaKeywords: '',
      metaDescription: '',
    })
    setImageFile(null)
    setImagePreview(null)
    setDialogOpen(true)
  }

  async function openEditDialog(news) {
    setEditingId(news.id)
    setFormData({
      title: news.title,
      newsDate: news.newsDate,
      newsBy: news.newsBy,
      description: news.description,
      metaTitle: news.metaTitle,
      metaKeywords: news.metaKeywords,
      metaDescription: news.metaDescription,
    })
    setImageFile(null)
    setImagePreview(news.image ? `https://testapicms.pvorasp.com/api/uploads/${news.image}` : null)
    setDialogOpen(true)
  }

  function closeDialog() {
    setDialogOpen(false)
    setEditingId(null)
    setFormData({
      title: '',
      newsDate: '',
      newsBy: '',
      description: '',
      metaTitle: '',
      metaKeywords: '',
      metaDescription: '',
    })
    setImageFile(null)
    setImagePreview(null)
  }

  async function handleSave() {
    if (!formData.title.trim() || !formData.description.trim() || !formData.newsDate) {
      Swal.fire('Validation Error', 'Title, Date, and Description are required', 'warning')
      return
    }

    try {
      const method = editingId ? 'PUT' : 'POST'
      const path = editingId ? `/news/${editingId}` : '/news'

      // Use FormData for multipart file upload
      const form = new FormData()
      form.append('title', formData.title)
      form.append('newsDate', formData.newsDate)
      form.append('newsBy', formData.newsBy)
      form.append('description', formData.description)
      form.append('metaTitle', formData.metaTitle)
      form.append('metaKeywords', formData.metaKeywords)
      form.append('metaDescription', formData.metaDescription)

      if (imageFile) {
        form.append('newsImage', imageFile)
      }

      const res = await apiFetch(path, {
        method,
        body: form,
        // Don't set Content-Type header; browser will set it with boundary
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message || `Request failed: ${res.status}`)
      }

      Swal.fire('Success', result.message || (editingId ? 'News updated successfully' : 'News added successfully'), 'success')
      closeDialog()
      await fetchNews()
    } catch (err) {
      Swal.fire('Error', `Failed to save news: ${err.message}`, 'error')
    }
  }

  async function handleDelete(id) {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This news will be deleted permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d32f2f',
      cancelButtonColor: '#757575',
      confirmButtonText: 'Yes, delete it!',
    })

    if (!confirm.isConfirmed) return

    try {
      const res = await apiFetch(`/news/${id}`, { method: 'DELETE' })
      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message || `Request failed: ${res.status}`)
      }

      Swal.fire('Deleted', result.message || 'News deleted successfully', 'success')
      await fetchNews()
    } catch (err) {
      Swal.fire('Error', `Failed to delete news: ${err.message}`, 'error')
    }
  }

  async function handleStatusToggle(id, currentStatus) {
    try {
      const res = await apiFetch(`/news/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: currentStatus === 1 ? 0 : 1 }),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message || `Request failed: ${res.status}`)
      }

      Swal.fire('Success', result.message || 'News status updated successfully', 'success')
      await fetchNews()
    } catch (err) {
      Swal.fire('Error', `Failed to update news status: ${err.message}`, 'error')
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#2c3e50' }}>
          News
        </Typography>
        <Button variant="contained" color="primary" onClick={openCreateDialog}>
          + New News
        </Button>
      </Box>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="md">
        <DialogTitle>{editingId ? 'Edit News' : 'Create News'}</DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Title"
                value={formData.title}
                onChange={(e) => handleFormChange('title', e.target.value)}
                margin="normal"
                placeholder="e.g., News Aayi Hai..."
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="News Date"
                type="date"
                value={formData.newsDate}
                onChange={(e) => handleFormChange('newsDate', e.target.value)}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Author"
                value={formData.newsBy}
                onChange={(e) => handleFormChange('newsBy', e.target.value)}
                margin="normal"
                placeholder="e.g., Author"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<CloudUploadIcon />}
                sx={{ mt: 1, height: 56 }}
              >
                Upload Image
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleImageChange}
                />
              </Button>
              {imagePreview && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: 150, borderRadius: 8 }} />
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={formData.description}
                onChange={(e) => handleFormChange('description', e.target.value)}
                margin="normal"
                multiline
                minRows={4}
                placeholder="e.g., <p>News content here...</p>"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Meta Title"
                value={formData.metaTitle}
                onChange={(e) => handleFormChange('metaTitle', e.target.value)}
                margin="normal"
                placeholder="e.g., Business Tips"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Meta Keywords"
                value={formData.metaKeywords}
                onChange={(e) => handleFormChange('metaKeywords', e.target.value)}
                margin="normal"
                placeholder="e.g., business, tips"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Meta Description"
                value={formData.metaDescription}
                onChange={(e) => handleFormChange('metaDescription', e.target.value)}
                margin="normal"
                multiline
                minRows={2}
                placeholder="e.g., Business article"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            {editingId ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* News Table */}
      <Paper sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : newsList.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ color: '#7f8c8d' }}>
              No news found. Create your first news!
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f7fa' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Author</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Image</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {newsList.map((news) => (
                  <TableRow key={news.id} hover>
                    <TableCell>{news.id}</TableCell>
                    <TableCell sx={{ fontWeight: 600, maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {news.title}
                    </TableCell>
                    <TableCell>{news.newsBy}</TableCell>
                    <TableCell>{new Date(news.newsDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {news.image ? (
                        <img
                          src={`https://testapicms.pvorasp.com/api/uploads/${news.image}`}
                          alt={news.title}
                          style={{ width: 50, height: 50, borderRadius: 4, objectFit: 'cover' }}
                          onError={(e) => { e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="50" height="50"%3E%3Crect fill="%23ccc" width="50" height="50"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-size="12"%3ENo Image%3C/text%3E%3C/svg%3E' }}
                        />
                      ) : (
                        <span style={{ color: '#7f8c8d' }}>No image</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        color={news.status === 1 ? 'success' : 'error'}
                        onClick={() => handleStatusToggle(news.id, news.status)}
                        sx={{ fontWeight: 600 }}
                      >
                        {news.status === 1 ? 'Active' : 'Inactive'}
                      </Button>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => openEditDialog(news)}
                        startIcon={<EditIcon />}
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDelete(news.id)}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  )
}

export default Newscms