import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Button,
} from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Swal from 'sweetalert2'
import apiFetch from '../../../services/api'

const Careercms = () => {
  const [careerInfo, setCareerInfo] = useState(null)
  const [applicants, setApplicants] = useState([])
  const [loading, setLoading] = useState(false)

  const baseUrl = 'https://testapicms.pvorasp.com/api'

  // Fetch both career details and applicants
  useEffect(() => {
    fetchCareer()
    fetchApplicants()
  }, [])

  async function fetchCareer() {
    try {
      const res = await apiFetch('/career')
      const data = await res.json()
      if (res.ok) setCareerInfo(data.career)
      else throw new Error(data.message || 'Failed to fetch career content')
    } catch (err) {
      Swal.fire('Error', err.message, 'error')
    }
  }

  async function fetchApplicants() {
    setLoading(true)
    try {
      const res = await apiFetch('/career/applicants')
      const data = await res.json()
      if (res.ok) setApplicants(data.applicants || [])
      else throw new Error(data.message || 'Failed to fetch applicants')
    } catch (err) {
      Swal.fire('Error', err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  // Download resume file
  async function handleDownloadResume(id, filename) {
    try {
      const res = await apiFetch(`/career/applicants/${id}/resume`)
      if (!res.ok) throw new Error('Failed to download resume')

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename || 'resume.pdf')
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      Swal.fire('Error', `Resume download failed: ${err.message}`, 'error')
    }
  }

  // View Applicant Details
  async function handleViewApplicant(id) {
    try {
      const res = await apiFetch(`/career/applicants/${id}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to fetch applicant')

      const a = data.applicant
      Swal.fire({
        title: `<strong>${a.name}</strong>`,
        html: `
          <p><b>Email:</b> ${a.email}</p>
          <p><b>Phone:</b> ${a.phone}</p>
          <p><b>LinkedIn:</b> <a href="${a.linkedUrl}" target="_blank">${a.linkedUrl}</a></p>
          <img src="${baseUrl}/uploads/${a.image}" style="max-width:150px; border-radius:8px; margin-top:10px;" />
        `,
        showCloseButton: true,
        confirmButtonText: 'Close',
        width: 400,
      })
    } catch (err) {
      Swal.fire('Error', err.message, 'error')
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Career Info */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2, boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
        {careerInfo ? (
          <>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              {careerInfo.heading}
            </Typography>
            <Typography
              variant="body1"
              component="div"
              sx={{
                color: '#555',
                '& p': { mb: 2 },
              }}
              dangerouslySetInnerHTML={{ __html: careerInfo.content }}
            />
          </>
        ) : (
          <Typography variant="body1" sx={{ color: '#777' }}>
            Loading career details...
          </Typography>
        )}
      </Paper>

      {/* Applicants Table */}
      <Paper sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : applicants.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ color: '#7f8c8d' }}>
              No applicants found.
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f7fa' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>LinkedIn</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Image</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Resume</TableCell>
                  <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applicants.map((a) => (
                  <TableRow key={a.id} hover>
                    <TableCell>{a.id}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{a.name}</TableCell>
                    <TableCell>{a.email}</TableCell>
                    <TableCell>{a.phone}</TableCell>
                    <TableCell>
                      <a href={a.linkedUrl} target="_blank" rel="noreferrer" style={{ color: '#1976d2' }}>
                        LinkedIn
                      </a>
                    </TableCell>
                    <TableCell>
                      {a.image ? (
                        <img
                          src={`${baseUrl}/uploads/${a.image}`}
                          alt={a.name}
                          style={{ width: 50, height: 50, borderRadius: 8, objectFit: 'cover' }}
                        />
                      ) : (
                        <span style={{ color: '#999' }}>No Image</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        startIcon={<DownloadIcon />}
                        onClick={() => handleDownloadResume(a.id, a.resume)}
                      >
                        Resume
                      </Button>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Button
                        size="small"
                        color="secondary"
                        variant="outlined"
                        startIcon={<VisibilityIcon />}
                        onClick={() => handleViewApplicant(a.id)}
                      >
                        View
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

export default Careercms
