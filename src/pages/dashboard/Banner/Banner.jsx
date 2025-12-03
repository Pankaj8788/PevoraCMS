import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
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
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Swal from 'sweetalert2'
import apiFetch from '../../../services/api'

const Banner = () => {
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [heading, setHeading] = useState('')
  const [description, setDescription] = useState('')
  const [buttonName, setButtonName] = useState('')
  const [buttonUrl, setButtonUrl] = useState('')

  // Fetch all banners on mount
  useEffect(() => {
    fetchBanners()
  }, [])

  async function fetchBanners() {
    setLoading(true)
    try {
      const res = await apiFetch('/banners')
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
      const data = await res.json()
      setBanners(data.banners || [])
    } catch (err) {
      Swal.fire('Error', `Failed to fetch banners: ${err.message}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  function openCreateDialog() {
    setEditingId(null)
    setHeading('')
    setDescription('')
    setButtonName('')
    setButtonUrl('')
    setDialogOpen(true)
  }

  async function openEditDialog(banner) {
    setEditingId(banner.id)
    setHeading(banner.heading)
    setDescription(banner.description)
    setButtonName(banner.buttonName)
    setButtonUrl(banner.buttonUrl)
    setDialogOpen(true)
  }

  function closeDialog() {
    setDialogOpen(false)
    setEditingId(null)
    setHeading('')
    setDescription('')
    setButtonName('')
    setButtonUrl('')
  }

  async function handleSave() {
    if (!heading.trim() || !description.trim() || !buttonName.trim() || !buttonUrl.trim()) {
      Swal.fire('Validation Error', 'All fields are required', 'warning')
      return
    }

    const payload = { heading, description, buttonName, buttonUrl }

    try {
      const method = editingId ? 'PUT' : 'POST'
      const path = editingId ? `/banners/${editingId}` : '/banners'
      const res = await apiFetch(path, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message || `Request failed: ${res.status}`)
      }

      Swal.fire('Success', result.message || (editingId ? 'Banner updated successfully' : 'Banner created successfully'), 'success')
      closeDialog()
      await fetchBanners()
    } catch (err) {
      Swal.fire('Error', `Failed to save banner: ${err.message}`, 'error')
    }
  }

  async function handleDelete(id) {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This banner will be deleted permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d32f2f',
      cancelButtonColor: '#757575',
      confirmButtonText: 'Yes, delete it!',
    })

    if (!confirm.isConfirmed) return

    try {
      const res = await apiFetch(`/banners/${id}`, { method: 'DELETE' })
      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message || `Request failed: ${res.status}`)
      }

      Swal.fire('Deleted', result.message || 'Banner deleted successfully', 'success')
      await fetchBanners()
    } catch (err) {
      Swal.fire('Error', `Failed to delete banner: ${err.message}`, 'error')
    }
  }

  async function handleStatusToggle(id, currentStatus) {
    try {
      const res = await apiFetch(`/banners/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: currentStatus === 1 ? 0 : 1 }),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message || `Request failed: ${res.status}`)
      }

      Swal.fire('Success', result.message || 'Banner status updated successfully', 'success')
      await fetchBanners()
    } catch (err) {
      Swal.fire('Error', `Failed to update banner status: ${err.message}`, 'error')
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#2c3e50' }}>
          Banners
        </Typography>
        <Button variant="contained" color="primary" onClick={openCreateDialog}>
          + New Banner
        </Button>
      </Box>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>{editingId ? 'Edit Banner' : 'Create Banner'}</DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            fullWidth
            label="Heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            margin="normal"
            placeholder="e.g., CMS"
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            minRows={3}
            placeholder="e.g., This is CMS (Content Management System)."
          />
          <TextField
            fullWidth
            label="Button Name"
            value={buttonName}
            onChange={(e) => setButtonName(e.target.value)}
            margin="normal"
            placeholder="e.g., Get Details"
          />
          <TextField
            fullWidth
            label="Button URL"
            value={buttonUrl}
            onChange={(e) => setButtonUrl(e.target.value)}
            margin="normal"
            placeholder="e.g., https://yourwebsite.com/product/cms"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            {editingId ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Banners Table */}
      <Paper sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : banners.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ color: '#7f8c8d' }}>
              No banners found. Create your first banner!
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f7fa' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Heading</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Button</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Created At</TableCell>
                  <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {banners.map((banner) => (
                  <TableRow key={banner.id} hover>
                    <TableCell>{banner.id}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{banner.heading}</TableCell>
                    <TableCell sx={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {banner.description}
                    </TableCell>
                    <TableCell>
                      <a href={banner.buttonUrl} target="_blank" rel="noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                        {banner.buttonName}
                      </a>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        color={banner.status === 1 ? 'success' : 'error'}
                        onClick={() => handleStatusToggle(banner.id, banner.status)}
                        sx={{ fontWeight: 600 }}
                      >
                        {banner.status === 1 ? 'Active' : 'Inactive'}
                      </Button>
                    </TableCell>
                    <TableCell>{new Date(banner.createdAt).toLocaleString()}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => openEditDialog(banner)}
                        startIcon={<EditIcon />}
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDelete(banner.id)}
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

export default Banner