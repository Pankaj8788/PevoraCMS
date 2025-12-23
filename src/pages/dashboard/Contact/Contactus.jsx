import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Swal from 'sweetalert2'
import apiFetch from '../../../services/api'

const Contactus = () => {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [messagesLoading, setMessagesLoading] = useState(false)

  const [contactData, setContactData] = useState({
    contactNumber: '',
    gstNumber: '',
    email: '',
    facebook: '',
    instagram: '',
    youtube: '',
    twitter: '',
    linkedin: '',
    googleMap: '',
    address: '',
  })

  const [bannerFile, setBannerFile] = useState(null)
  const [bannerPreview, setBannerPreview] = useState(null)

  const [messages, setMessages] = useState([])
  const [selectedMessage, setSelectedMessage] = useState(null)

  // Fetch contact info
  useEffect(() => {
    fetchContact()
    fetchMessages()
  }, [])

  async function fetchContact() {
    setLoading(true)
    try {
      const res = await apiFetch('/contact')
      const json = await res.json()
      const c = json.contact || {}
      setContactData({
        contactNumber: c.contactNumber || '',
        gstNumber: c.gstNumber || '',
        email: c.email || '',
        facebook: c.facebook || '',
        instagram: c.instagram || '',
        youtube: c.youtube || '',
        twitter: c.twitter || '',
        linkedin: c.linkedin || '',
        googleMap: c.googleMap || '',
        address: c.address || '',
      })
      if (c.bannerImage) {
        setBannerPreview(`https://testapicms.pvorasp.com/api/uploads/${c.bannerImage}`)
      }
    } catch (err) {
      Swal.fire('Error', `Failed to load contact details: ${err.message}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  function handleChange(field, value) {
    setContactData((d) => ({ ...d, [field]: value }))
  }

  function handleBannerChange(e) {
    const file = e.target.files?.[0]
    if (file) {
      setBannerFile(file)
      const reader = new FileReader()
      reader.onloadend = () => setBannerPreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  async function handleSave() {
    if (!contactData.email || !contactData.contactNumber) {
      Swal.fire('Validation', 'Email and contact number are required', 'warning')
      return
    }

    setSaving(true)
    try {
      const form = new FormData()
      Object.entries(contactData).forEach(([key, value]) => form.append(key, value))
      if (bannerFile) form.append('bannerImage', bannerFile)

      const res = await apiFetch('/contact', { method: 'PUT', body: form })
      const json = await res.json()
      if (!res.ok) throw new Error(json.message || `Request failed: ${res.status}`)

      Swal.fire('Success', json.message || 'Contact settings updated successfully', 'success')
      fetchContact()
    } catch (err) {
      Swal.fire('Error', `Failed to update contact: ${err.message}`, 'error')
    } finally {
      setSaving(false)
    }
  }

  async function fetchMessages() {
    setMessagesLoading(true)
    try {
      const res = await apiFetch('/contact/messages')
      const json = await res.json()
      setMessages(json.messages || [])
    } catch (err) {
      Swal.fire('Error', `Failed to load messages: ${err.message}`, 'error')
    } finally {
      setMessagesLoading(false)
    }
  }

  async function viewMessage(id) {
    try {
      const res = await apiFetch(`/contact/messages/${id}`)
      const json = await res.json()
      setSelectedMessage(json.message)
    } catch (err) {
      Swal.fire('Error', `Failed to load message: ${err.message}`, 'error')
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Contact Us CMS
      </Typography>

      {/* CONTACT SETTINGS */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Update Contact Information
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Contact Number"
                value={contactData.contactNumber}
                onChange={(e) => handleChange('contactNumber', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="GST Number"
                value={contactData.gstNumber}
                onChange={(e) => handleChange('gstNumber', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Email"
                value={contactData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </Grid>

            {/* Social Links */}
            {['facebook', 'instagram', 'youtube', 'twitter', 'linkedin', 'googleMap'].map((key) => (
              <Grid item xs={12} md={6} key={key}>
                <TextField
                  fullWidth
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={contactData[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              </Grid>
            ))}

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                multiline
                minRows={2}
                value={contactData.address}
                onChange={(e) => handleChange('address', e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />}>
                Upload Banner Image
                <input hidden accept="image/*" type="file" onChange={handleBannerChange} />
              </Button>
              {bannerPreview && (
                <Box sx={{ mt: 2 }}>
                  <img
                    src={bannerPreview}
                    alt="Banner"
                    style={{ maxWidth: 300, borderRadius: 8 }}
                  />
                </Box>
              )}
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'right' }}>
              <Button onClick={fetchContact} sx={{ mr: 2 }}>
                Reload
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save'}
              </Button>
            </Grid>
          </Grid>
        )}
      </Paper>

      {/* MESSAGES LIST */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Contact Form Messages
        </Typography>

        {messagesLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : messages.length === 0 ? (
          <Typography>No messages found.</Typography>
        ) : (
          <Box>
            {messages.map((msg) => (
              <Paper
                key={msg.id}
                sx={{
                  p: 2,
                  mb: 1,
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#f9f9f9' },
                }}
                onClick={() => viewMessage(msg.id)}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {msg.name} ({msg.email})
                </Typography>
                <Typography variant="body2">{msg.subject}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {msg.createdAtStr}
                </Typography>
              </Paper>
            ))}
          </Box>
        )}
      </Paper>

      {/* SINGLE MESSAGE DIALOG */}
      <Dialog open={!!selectedMessage} onClose={() => setSelectedMessage(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Message Details</DialogTitle>
        <DialogContent dividers>
          {selectedMessage ? (
            <Box>
              <Typography variant="subtitle1"><strong>Name:</strong> {selectedMessage.name}</Typography>
              <Typography><strong>Email:</strong> {selectedMessage.email}</Typography>
              <Typography><strong>Phone:</strong> {selectedMessage.phone}</Typography>
              <Typography><strong>Subject:</strong> {selectedMessage.subject}</Typography>
              <Typography sx={{ mt: 1 }}><strong>Message:</strong></Typography>
              <Typography>{selectedMessage.message}</Typography>
              <Typography sx={{ mt: 2 }} variant="caption" color="text.secondary">
                {selectedMessage.createdAtStr}
              </Typography>
            </Box>
          ) : (
            <Typography>No data</Typography>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default Contactus
