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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Swal from 'sweetalert2'
import apiFetch from '../../../services/api'

const Teams = () => {
  const [teams, setTeams] = useState([])
  const [teamTypes, setTeamTypes] = useState([])
  const [loading, setLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    experience: '',
    achievement: '',
    teamTypeId: '',
  })

  useEffect(() => {
    fetchTeams()
    fetchTeamTypes()
  }, [])

  async function fetchTeams() {
    setLoading(true)
    try {
      const res = await apiFetch('/teams')
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
      const data = await res.json()
      setTeams(data.teams || [])
    } catch (err) {
      Swal.fire('Error', `Failed to fetch teams: ${err.message}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  async function fetchTeamTypes() {
    try {
      const res = await apiFetch('/team-type')
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
      const data = await res.json()
      setTeamTypes(data.teamTypes || [])
    } catch (err) {
      console.warn('Failed to fetch team types:', err.message)
    }
  }

  function openCreateDialog() {
    setEditingId(null)
    setFormData({
      name: '',
      designation: '',
      experience: '',
      achievement: '',
      teamTypeId: '',
    })
    setImageFile(null)
    setImagePreview(null)
    setDialogOpen(true)
  }

  async function openEditDialog(team) {
    setEditingId(team.id)
    let achievement = team.achievement || ''
    if (achievement.startsWith('<p>') && achievement.endsWith('</p>')) {
      achievement = achievement.replace(/^<p>(.*)<\/p>$/s, '$1')
    }
    setFormData({
      name: team.name,
      designation: team.designation,
      experience: team.experience,
      achievement,
      teamTypeId: team.teamTypeId || '',
    })
    setImageFile(null)
    setImagePreview(team.image ? `https://testapicms.pvorasp.com/api/uploads/${team.image}` : null)
    setDialogOpen(true)
  }

  function closeDialog() {
    setDialogOpen(false)
    setEditingId(null)
    setFormData({
      name: '',
      designation: '',
      experience: '',
      achievement: '',
      teamTypeId: '',
    })
    setImageFile(null)
    setImagePreview(null)
  }

  function handleChange(field, value) {
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

  async function handleSave() {
    if (!formData.name.trim() || !formData.designation.trim() || !formData.experience.trim()) {
      Swal.fire('Validation Error', 'Name, Designation, and Experience are required', 'warning')
      return
    }

    try {
      const method = editingId ? 'PUT' : 'POST'
      const path = editingId ? `/teams/${editingId}` : '/teams'

      const form = new FormData()
      form.append('name', formData.name)
      form.append('designation', formData.designation)
      form.append('experience', formData.experience)
      const achievementToSend = formData.achievement.startsWith('<p>') 
        ? formData.achievement 
        : `<p>${formData.achievement}</p>`
      form.append('achievement', achievementToSend)
      form.append('teamTypeId', formData.teamTypeId || '')
      if (imageFile) form.append('image', imageFile)

      const res = await apiFetch(path, {
        method,
        body: form,
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message || `Request failed: ${res.status}`)
      }

      Swal.fire('Success', result.message || (editingId ? 'Team Member updated successfully' : 'Team member added successfully'), 'success')
      closeDialog()
      await fetchTeams()
    } catch (err) {
      Swal.fire('Error', `Failed to save team member: ${err.message}`, 'error')
    }
  }

  async function handleDelete(id) {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This team member will be deleted permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d32f2f',
      cancelButtonColor: '#757575',
      confirmButtonText: 'Yes, delete it!',
    })

    if (!confirm.isConfirmed) return

    try {
      const res = await apiFetch(`/teams/${id}`, { method: 'DELETE' })
      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message || `Request failed: ${res.status}`)
      }

      Swal.fire('Deleted', result.message || 'Team Member deleted successfully', 'success')
      await fetchTeams()
    } catch (err) {
      Swal.fire('Error', `Failed to delete team member: ${err.message}`, 'error')
    }
  }

  async function handleStatusToggle(id, currentStatus) {
    try {
      const res = await apiFetch(`/teams/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: currentStatus === 1 ? 0 : 1 }),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message || `Request failed: ${res.status}`)
      }

      Swal.fire('Success', result.message || 'Team Member status updated successfully', 'success')
      await fetchTeams()
    } catch (err) {
      Swal.fire('Error', `Failed to update team member status: ${err.message}`, 'error')
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#2c3e50' }}>
          Teams
        </Typography>
        <Button variant="contained" color="primary" onClick={openCreateDialog}>
          + Add Team Member
        </Button>
      </Box>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="md">
        <DialogTitle>{editingId ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g., Anita Jaiswal"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Designation"
                value={formData.designation}
                onChange={(e) => handleChange('designation', e.target.value)}
                placeholder="e.g., Co-Founder & COO"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Experience"
                value={formData.experience}
                onChange={(e) => handleChange('experience', e.target.value)}
                placeholder="e.g., 10 Yrs"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Team Type</InputLabel>
                <Select
                  value={formData.teamTypeId}
                  onChange={(e) => handleChange('teamTypeId', e.target.value)}
                  label="Team Type"
                >
                  <MenuItem value="">None</MenuItem>
                  {teamTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<CloudUploadIcon />}
                sx={{ height: 56 }}
              >
                Upload Image
                <input hidden accept="image/*" type="file" onChange={handleImageChange} />
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
                multiline
                minRows={4}
                label="Achievement"
                value={formData.achievement}
                onChange={(e) => handleChange('achievement', e.target.value)}
                placeholder="e.g., Her achievements here... (will be wrapped in <p> tags)"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            {editingId ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Teams Table */}
      <Paper sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : teams.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ color: '#7f8c8d' }}>
              No team members found. Add your first team member!
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f7fa' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Designation</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Experience</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Team Type</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Image</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teams.map((team) => (
                  <TableRow key={team.id} hover>
                    <TableCell>{team.id}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{team.name}</TableCell>
                    <TableCell>{team.designation}</TableCell>
                    <TableCell>{team.experience}</TableCell>
                    <TableCell>{team.TeamType?.name || 'N/A'}</TableCell>
                    <TableCell>
                      {team.image ? (
                        <img
                          src={`https://testapicms.pvorasp.com/api/uploads/${team.image}`}
                          alt={team.name}
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
                        color={team.status === 1 ? 'success' : 'error'}
                        onClick={() => handleStatusToggle(team.id, team.status)}
                        sx={{ fontWeight: 600 }}
                      >
                        {team.status === 1 ? 'Active' : 'Inactive'}
                      </Button>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => openEditDialog(team)}
                        startIcon={<EditIcon />}
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDelete(team.id)}
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

export default Teams