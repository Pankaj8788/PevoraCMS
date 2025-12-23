import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  CircularProgress,
  IconButton,
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DeleteIcon from '@mui/icons-material/Delete'
import Swal from 'sweetalert2'
import apiFetch from '../../../services/api'
  const Galarycms = () => {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [albums, setAlbums] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [data, setData] = useState({
    albumName: '',
    videos: '',
    status: 1,
  })
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [thumbnailPreview, setThumbnailPreview] = useState(null)
  const [photoFiles, setPhotoFiles] = useState([])
  const [photoPreviews, setPhotoPreviews] = useState([])
  useEffect(() => {
    fetchAlbums()
  }, [])
  async function fetchAlbums() {
    setLoading(true)
    try {
      const res = await apiFetch('/gallery')
      const json = await res.json()
      setAlbums(json.gallery || [])
    } catch (err) {
      Swal.fire('Error', `Failed to load gallery: ${err.message}`, 'error')
    } finally {
      setLoading(false)
    }
  }
  function handleChange(field, value) {
    setData((d) => ({ ...d, [field]: value }))
  }
  function handleThumbnailChange(e) {
    const file = e.target.files?.[0]
    if (file) {
      setThumbnailFile(file)
      const reader = new FileReader()
      reader.onloadend = () => setThumbnailPreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  function handlePhotosChange(e) {
    const files = Array.from(e.target.files || [])
    setPhotoFiles(files)
    const previews = files.map((f) => URL.createObjectURL(f))
    setPhotoPreviews(previews)
  }

  async function handleCreateOrUpdate() {
    if (!data.albumName.trim()) {
      Swal.fire('Validation', 'Album Name is required', 'warning')
      return
    }

    setSaving(true)
    try {
      const form = new FormData()
      form.append('albumName', data.albumName)
      if (thumbnailFile) form.append('thumbnailImage', thumbnailFile)
      photoFiles.forEach((file) => form.append('photos', file))
      if (data.videos)
        data.videos
          .split(',')
          .map((v) => v.trim())
          .forEach((v) => form.append('videos', v))

      const url = selectedId ? `/gallery/${selectedId}` : '/gallery'
      const method = selectedId ? 'PUT' : 'POST'

      const res = await apiFetch(url, { method, body: form })
      const json = await res.json()
      if (!res.ok) throw new Error(json.message || `Request failed: ${res.status}`)

      Swal.fire('Success', json.message || 'Gallery Album Saved', 'success')
      await fetchAlbums()
      resetForm()
    } catch (err) {
      Swal.fire('Error', `Failed to save album: ${err.message}`, 'error')
    } finally {
      setSaving(false)
    }
  }

  function resetForm() {
    setData({ albumName: '', videos: '', status: 1 })
    setThumbnailFile(null)
    setPhotoFiles([])
    setThumbnailPreview(null)
    setPhotoPreviews([])
    setSelectedId(null)
  }

  async function handleEdit(id) {
    try {
      const res = await apiFetch(`/gallery/${id}`)
      const json = await res.json()
      const album = json.album
      setSelectedId(album.id)
      setData({
        albumName: album.albumName,
        videos: album.videos.join(', '),
        status: album.status,
      })
      setThumbnailPreview(`https://testapicms.pvorasp.com/api/uploads/${album.thumbnailImage}`)
      setPhotoPreviews(album.photos.map((p) => `https://testapicms.pvorasp.com/api/uploads/${p}`))
    } catch (err) {
      Swal.fire('Error', `Failed to load album: ${err.message}`, 'error')
    }
  }
  async function handleToggleStatus(id) {
    try {
      const res = await apiFetch(`/gallery/${id}/status`, { method: 'PATCH' })
      const json = await res.json()
      Swal.fire('Success', json.message, 'success')
      fetchAlbums()
    } catch (err) {
      Swal.fire('Error', `Failed to update status: ${err.message}`, 'error')
    }
  }
  async function handleDelete(id) {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This album will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it',
    })
    if (!confirm.isConfirmed) return
    try {
      const res = await apiFetch(`/gallery/${id}`, { method: 'DELETE' })
      const json = await res.json()
      Swal.fire('Deleted', json.message || 'Album Deleted', 'success')
      fetchAlbums()
    } catch (err) {
      Swal.fire('Error', `Failed to delete album: ${err.message}`, 'error')
    }
  }
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Gallery CMS
      </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {selectedId ? 'Edit Album' : 'Create New Album'}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Album Name"
              value={data.albumName}
              onChange={(e) => handleChange('albumName', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />}>
              Upload Thumbnail
              <input hidden accept="image/*" type="file" onChange={handleThumbnailChange} />
            </Button>
            {thumbnailPreview && (
              <Box sx={{ mt: 2 }}>
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail"
                  style={{ maxWidth: 200, borderRadius: 8 }}
                />
              </Box>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />}>
              Upload Photos
              <input hidden multiple accept="image/*" type="file" onChange={handlePhotosChange} />
            </Button>
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {photoPreviews.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="photo"
                  style={{ width: 80, height: 80, borderRadius: 6, objectFit: 'cover' }}
                />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Videos (comma separated YouTube links)"
              value={data.videos}
              onChange={(e) => handleChange('videos', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sx={{ textAlign: 'right' }}>
            {selectedId && (
              <Button onClick={resetForm} sx={{ mr: 2 }}>
                Cancel Edit
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateOrUpdate}
              disabled={saving}
            >
              {saving ? 'Saving...' : selectedId ? 'Update Album' : 'Create Album'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Albums List
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {albums.map((album) => (
              <Grid item xs={12} md={4} key={album.id}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {album.albumName}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <img
                      src={`https://testapicms.pvorasp.com/api/uploads/${album.thumbnailImage}`}
                      alt="thumb"
                      style={{ width: '100%', borderRadius: 6 }}
                    />
                  </Box>
                  <Typography sx={{ mt: 1, fontSize: 14 }}>
                    Status: {album.status === 1 ? 'Active ✅' : 'Inactive ❌'}
                  </Typography>

                  <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                    <Button size="small" variant="outlined" onClick={() => handleEdit(album.id)}>
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="warning"
                      onClick={() => handleToggleStatus(album.id)}
                    >
                      Toggle
                    </Button>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(album.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Box>
  )
}

export default Galarycms
