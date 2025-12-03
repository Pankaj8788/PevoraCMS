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
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Swal from 'sweetalert2'
import apiFetch from '../../../services/api'

const Teamtype = () => {
  const [teamTypes, setTeamTypes] = useState([])
  const [loading, setLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [name, setName] = useState('')

  useEffect(() => {
    fetchTeamTypes()
  }, [])

  async function fetchTeamTypes() {
    setLoading(true)
    try {
      const res = await apiFetch('/team-type')
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
      const data = await res.json()
      setTeamTypes(data.teamTypes || [])
    } catch (err) {
      Swal.fire('Error', `Failed to fetch team types: ${err.message}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  function openCreateDialog() {
    setEditingId(null)
    setName('')
    setDialogOpen(true)
  }

  function openEditDialog(teamType) {
    setEditingId(teamType.id)
    setName(teamType.name)
    setDialogOpen(true)
  }

  function closeDialog() {
    setDialogOpen(false)
    setEditingId(null)
    setName('')
  }

  async function handleSave() {
    if (!name.trim()) {
      Swal.fire('Validation Error', 'Name is required', 'warning')
      return
    }

    try {
      const method = editingId ? 'PUT' : 'POST'
      const path = editingId ? `/team-type/${editingId}` : '/team-type'

      const res = await apiFetch(path, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message || `Request failed: ${res.status}`)
      }

      Swal.fire('Success', result.message || (editingId ? 'Team Type updated successfully' : 'Team Type created successfully'), 'success')
      closeDialog()
      await fetchTeamTypes()
    } catch (err) {
      Swal.fire('Error', `Failed to save team type: ${err.message}`, 'error')
    }
  }

  async function handleDelete(id) {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This team type will be deleted permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d32f2f',
      cancelButtonColor: '#757575',
      confirmButtonText: 'Yes, delete it!',
    })

    if (!confirm.isConfirmed) return

    try {
      const res = await apiFetch(`/team-type/${id}`, { method: 'DELETE' })
      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message || `Request failed: ${res.status}`)
      }

      Swal.fire('Deleted', result.message || 'Team Type deleted successfully', 'success')
      await fetchTeamTypes()
    } catch (err) {
      Swal.fire('Error', `Failed to delete team type: ${err.message}`, 'error')
    }
  }

  async function handleStatusToggle(id, currentStatus) {
    try {
      const res = await apiFetch(`/team-type/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: currentStatus === 1 ? 0 : 1 }),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message || `Request failed: ${res.status}`)
      }

      Swal.fire('Success', result.message || 'Team Type status updated successfully', 'success')
      await fetchTeamTypes()
    } catch (err) {
      Swal.fire('Error', `Failed to update team type status: ${err.message}`, 'error')
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#2c3e50' }}>
          Team Types
        </Typography>
        <Button variant="contained" color="primary" onClick={openCreateDialog}>
          + New Team Type
        </Button>
      </Box>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>{editingId ? 'Edit Team Type' : 'Create Team Type'}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            placeholder="e.g., FOUNDERS"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            {editingId ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Team Types Table */}
      <Paper sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : teamTypes.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ color: '#7f8c8d' }}>
              No team types found. Create your first team type!
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f7fa' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teamTypes.map((teamType) => (
                  <TableRow key={teamType.id} hover>
                    <TableCell>{teamType.id}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{teamType.name}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        color={teamType.status === 1 ? 'success' : 'error'}
                        onClick={() => handleStatusToggle(teamType.id, teamType.status)}
                        sx={{ fontWeight: 600 }}
                      >
                        {teamType.status === 1 ? 'Active' : 'Inactive'}
                      </Button>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => openEditDialog(teamType)}
                        startIcon={<EditIcon />}
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDelete(teamType.id)}
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

export default Teamtype