import React, { useEffect, useState, useRef } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Grid,
  CircularProgress,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material'
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  Title,
  Code,
  Link,
  Image,
  FormatQuote,
  FormatClear,
} from '@mui/icons-material'
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
  const editorRef = useRef(null)

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
      const rawContent = (data && data.page && data.page.content) || ''
      setContent(rawContent)
    } catch (err) {
      Swal.fire('Error', `Failed to load ${page.label}: ${err.message}`, 'error')
      setContent('')
    } finally {
      setLoading(false)
    }
  }

  // Format functions
  const insertTag = (tagName, tagClose = null) => {
    const editor = editorRef.current
    if (!editor) return

    const selectionStart = editor.selectionStart
    const selectionEnd = editor.selectionEnd
    const selectedText = content.substring(selectionStart, selectionEnd)
    const closeTag = tagClose || tagName

    let newContent
    if (selectedText) {
      newContent =
        content.substring(0, selectionStart) +
        `<${tagName}>${selectedText}</${closeTag}>` +
        content.substring(selectionEnd)
    } else {
      newContent =
        content.substring(0, selectionStart) +
        `<${tagName}></${closeTag}>` +
        content.substring(selectionEnd)
    }

    setContent(newContent)
    setTimeout(() => {
      editor.focus()
      editor.setSelectionRange(selectionStart + tagName.length + 2, selectionStart + tagName.length + 2)
    }, 0)
  }

  const insertHeading = (level) => {
    const editor = editorRef.current
    if (!editor) return

    const selectionStart = editor.selectionStart
    const selectionEnd = editor.selectionEnd
    const selectedText = content.substring(selectionStart, selectionEnd)

    const newContent =
      content.substring(0, selectionStart) +
      `<h${level}>${selectedText || 'Heading'}</h${level}>\n` +
      content.substring(selectionEnd)

    setContent(newContent)
  }

  const insertList = (type) => {
    const editor = editorRef.current
    if (!editor) return

    const selectionStart = editor.selectionStart
    const listTag = type === 'ul' ? 'ul' : 'ol'
    const newContent =
      content.substring(0, selectionStart) +
      `<${listTag}>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</${listTag}>\n` +
      content.substring(selectionStart)

    setContent(newContent)
  }

  const insertLink = () => {
    const url = prompt('Enter URL:')
    if (url) {
      const editor = editorRef.current
      if (!editor) return

      const selectionStart = editor.selectionStart
      const selectionEnd = editor.selectionEnd
      const selectedText = content.substring(selectionStart, selectionEnd)

      const newContent =
        content.substring(0, selectionStart) +
        `<a href="${url}">${selectedText || 'Link'}</a>` +
        content.substring(selectionEnd)

      setContent(newContent)
    }
  }

  const insertBlockquote = () => {
    const editor = editorRef.current
    if (!editor) return

    const selectionStart = editor.selectionStart
    const selectionEnd = editor.selectionEnd
    const selectedText = content.substring(selectionStart, selectionEnd)

    const newContent =
      content.substring(0, selectionStart) +
      `<blockquote>${selectedText || 'Quote'}</blockquote>\n` +
      content.substring(selectionEnd)

    setContent(newContent)
  }

  const clearFormatting = () => {
    setContent('')
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
            <Typography variant="h6" sx={{ mb: 3 }}>
              {PAGES.find((p) => p.key === selected).label}
            </Typography>

            {/* Formatting Toolbar */}
            <Paper
              sx={{
                p: 1.5,
                mb: 2,
                backgroundColor: '#f5f5f5',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 0.5,
              }}
              elevation={0}
            >
              {/* Headings */}
              <Tooltip title="Heading 1">
                <IconButton size="small" onClick={() => insertHeading(1)}>
                  <Title fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Heading 2">
                <IconButton
                  size="small"
                  onClick={() => insertHeading(2)}
                  sx={{ fontSize: '0.9rem' }}
                >
                  <Title fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Heading 3">
                <IconButton size="small" onClick={() => insertHeading(3)}>
                  <Title fontSize="small" />
                </IconButton>
              </Tooltip>

              <Divider orientation="vertical" flexItem sx={{ my: 0.5 }} />

              {/* Text Formatting */}
              <Tooltip title="Bold">
                <IconButton size="small" onClick={() => insertTag('strong')}>
                  <FormatBold fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Italic">
                <IconButton size="small" onClick={() => insertTag('em')}>
                  <FormatItalic fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Underline">
                <IconButton size="small" onClick={() => insertTag('u')}>
                  <FormatUnderlined fontSize="small" />
                </IconButton>
              </Tooltip>

              <Divider orientation="vertical" flexItem sx={{ my: 0.5 }} />

              {/* Lists & Quotes */}
              <Tooltip title="Bullet List">
                <IconButton size="small" onClick={() => insertList('ul')}>
                  <FormatListBulleted fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Numbered List">
                <IconButton size="small" onClick={() => insertList('ol')}>
                  <FormatListNumbered fontSize="small" />
                </IconButton>
              </Tooltip>

              <Divider orientation="vertical" flexItem sx={{ my: 0.5 }} />

              {/* Links & Quotes */}
              <Tooltip title="Insert Link">
                <IconButton size="small" onClick={insertLink}>
                  <Link fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Quote">
                <IconButton size="small" onClick={insertBlockquote}>
                  <FormatQuote fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Code">
                <IconButton size="small" onClick={() => insertTag('code')}>
                  <Code fontSize="small" />
                </IconButton>
              </Tooltip>

              <Divider orientation="vertical" flexItem sx={{ my: 0.5 }} />

              {/* Clear */}
              <Tooltip title="Clear All">
                <IconButton size="small" onClick={clearFormatting} color="error">
                  <FormatClear fontSize="small" />
                </IconButton>
              </Tooltip>
            </Paper>

            {/* Editor */}
            <TextField
              inputRef={editorRef}
              fullWidth
              multiline
              minRows={15}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Use the toolbar above to format your content with HTML tags like <p>, <h1>, <ul>, etc."
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                },
              }}
            />

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mb: 3 }}>
              <Button onClick={() => loadPage(selected)}>Reload</Button>
              <Button variant="contained" color="primary" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </Button>
            </Box>

            {/* Preview */}
            {content && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
                  Live Preview:
                </Typography>
                <Box
                  sx={{
                    p: 3,
                    backgroundColor: '#f9f9f9',
                    borderRadius: 1,
                    border: '1px solid #e0e0e0',
                    '& *': {
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                    },
                    '& p': {
                      mb: 2,
                      lineHeight: 1.8,
                      color: '#333',
                      fontSize: '1rem',
                      whiteSpace: 'pre-wrap',
                      wordWrap: 'break-word',
                    },
                    '& h1': {
                      mt: 3,
                      mb: 2,
                      color: '#1a1a1a',
                      fontWeight: 700,
                      fontSize: '2rem',
                    },
                    '& h2': {
                      mt: 3,
                      mb: 1.5,
                      color: '#1a1a1a',
                      fontWeight: 700,
                      fontSize: '1.5rem',
                    },
                    '& h3': {
                      mt: 2.5,
                      mb: 1,
                      color: '#333',
                      fontWeight: 600,
                      fontSize: '1.25rem',
                    },
                    '& ul, & ol': {
                      mb: 2,
                      ml: 4,
                      '& li': {
                        mb: 1,
                        color: '#333',
                        lineHeight: 1.8,
                      },
                    },
                    '& a': {
                      color: '#1976d2',
                      textDecoration: 'none',
                      fontWeight: 500,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    },
                    '& strong, & b': {
                      fontWeight: 700,
                      color: '#1a1a1a',
                    },
                    '& em, & i': {
                      fontStyle: 'italic',
                    },
                    '& blockquote': {
                      mt: 2,
                      mb: 2,
                      pl: 3,
                      borderLeft: '4px solid #1976d2',
                      backgroundColor: '#f5f5f5',
                      padding: '1rem',
                      borderRadius: '4px',
                      fontStyle: 'italic',
                      color: '#555',
                    },
                    '& code': {
                      backgroundColor: '#f5f5f5',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                      fontSize: '0.9em',
                      color: '#d63384',
                    },
                  }}
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </>
            )}
          </>
        )}
      </Paper>
    </Box>
  )
}

export default Policiescms