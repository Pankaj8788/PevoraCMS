import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Grid,
  FormControlLabel,
  Checkbox,
  IconButton,
  Tooltip,
  Dialog as ConfirmDialog,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import ToggleOffIcon from '@mui/icons-material/ToggleOff'
import Swal from 'sweetalert2'
import { apiFetch } from '../../../services/api'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [bannerImageFile, setBannerImageFile] = useState(null)
  const [productImageFile, setProductImageFile] = useState(null)
  const [bannerImagePreview, setBannerImagePreview] = useState(null)
  const [productImagePreview, setProductImagePreview] = useState(null)
  const [formData, setFormData] = useState({
    heading: '',
    content: '',
    features: '',
    metaTitle: '',
    metaKeywords: '',
    description: '',
    showOnHomePage: 0,
  })

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await apiFetch('products')
      const data = await res.json()
      if (data.products) {
        setProducts(data.products)
      }
    } catch (err) {
      console.error('Error fetching products:', err)
      Swal.fire('Error', 'Failed to load products', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleOpenDialog = (product = null) => {
    if (product) {
      setEditingId(product.id)
      setFormData({
        heading: product.heading || '',
        content: product.content?.replace(/<p>|<\/p>/g, '').trim() || '',
        features: product.features?.replace(/<p>|<\/p>/g, '').trim() || '',
        metaTitle: product.metaTitle || '',
        metaKeywords: product.metaKeywords || '',
        description: product.description || '',
        showOnHomePage: product.showOnHomePage || 0,
      })
      if (product.bannerImage) {
        setBannerImagePreview(`https://testapicms.pvorasp.com/uploads/${product.bannerImage}`)
      }
      if (product.productImage) {
        setProductImagePreview(`https://testapicms.pvorasp.com/uploads/${product.productImage}`)
      }
    } else {
      setEditingId(null)
      setFormData({
        heading: '',
        content: '',
        features: '',
        metaTitle: '',
        metaKeywords: '',
        description: '',
        showOnHomePage: 0,
      })
      setBannerImagePreview(null)
      setProductImagePreview(null)
    }
    setBannerImageFile(null)
    setProductImageFile(null)
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setEditingId(null)
    setBannerImageFile(null)
    setProductImageFile(null)
    setBannerImagePreview(null)
    setProductImagePreview(null)
  }

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
    }))
  }

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setBannerImageFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setBannerImagePreview(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProductImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProductImageFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setProductImagePreview(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    if (!formData.heading || !formData.description) {
      Swal.fire('Validation Error', 'Please fill in all required fields', 'warning')
      return
    }

    try {
      setLoading(true)
      const form = new FormData()
      form.append('heading', formData.heading)
      const contentToSend = formData.content.startsWith('<p>')
        ? formData.content
        : `<p>${formData.content}</p>`
      form.append('content', contentToSend)
      const featuresToSend = formData.features.startsWith('<p>')
        ? formData.features
        : `<p>${formData.features}</p>`
      form.append('features', featuresToSend)
      form.append('metaTitle', formData.metaTitle)
      form.append('metaKeywords', formData.metaKeywords)
      form.append('description', formData.description)
      form.append('showOnHomePage', formData.showOnHomePage)

      if (bannerImageFile) {
        form.append('bannerImage', bannerImageFile)
      }
      if (productImageFile) {
        form.append('productImage', productImageFile)
      }

      const method = editingId ? 'PUT' : 'POST'
      const path = editingId ? `products/${editingId}` : 'products'

      const res = await apiFetch(path, { method, body: form })
      const data = await res.json()

      if (res.ok) {
        Swal.fire('Success', editingId ? 'Product updated successfully' : 'Product added successfully', 'success')
        handleCloseDialog()
        fetchProducts()
      } else {
        Swal.fire('Error', data.message || 'Failed to save product', 'error')
      }
    } catch (err) {
      console.error('Error saving product:', err)
      Swal.fire('Error', 'Failed to save product', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This product will be deleted permanently',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true)
          const res = await apiFetch(`products/${id}`, { method: 'DELETE' })
          const data = await res.json()

          if (res.ok) {
            Swal.fire('Deleted', 'Product deleted successfully', 'success')
            fetchProducts()
          } else {
            Swal.fire('Error', data.message || 'Failed to delete product', 'error')
          }
        } catch (err) {
          console.error('Error deleting product:', err)
          Swal.fire('Error', 'Failed to delete product', 'error')
        } finally {
          setLoading(false)
        }
      }
    })
  }

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      setLoading(true)
      const newStatus = currentStatus === 1 ? 0 : 1
      const res = await apiFetch(`products/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()

      if (res.ok) {
        Swal.fire('Success', `Status updated to ${newStatus === 1 ? 'Active' : 'Inactive'}`, 'success')
        fetchProducts()
      } else {
        Swal.fire('Error', data.message || 'Failed to update status', 'error')
      }
    } catch (err) {
      console.error('Error updating status:', err)
      Swal.fire('Error', 'Failed to update status', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (loading && products.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <h2>Product Management</h2>
        <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
          + Add Product
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Heading</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Banner Image</TableCell>
                <TableCell>Product Image</TableCell>
                <TableCell>Show on Home</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length > 0 ? (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.heading}</TableCell>
                    <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {product.description}
                    </TableCell>
                    <TableCell>
                      {product.bannerImage ? (
                        <img
                          src={`https://testapicms.pvorasp.com/uploads/${product.bannerImage}`}
                          alt="banner"
                          style={{ height: '50px', width: 'auto' }}
                        />
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                    <TableCell>
                      {product.productImage ? (
                        <img
                          src={`https://testapicms.pvorasp.com/uploads/${product.productImage}`}
                          alt="product"
                          style={{ height: '50px', width: 'auto' }}
                        />
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                    <TableCell>{product.showOnHomePage === 1 ? 'Yes' : 'No'}</TableCell>
                    <TableCell>
                      <Tooltip title={product.status === 1 ? 'Deactivate' : 'Activate'}>
                        <IconButton
                          size="small"
                          onClick={() => handleStatusToggle(product.id, product.status)}
                          color={product.status === 1 ? 'success' : 'error'}
                        >
                          {product.status === 1 ? <ToggleOnIcon /> : <ToggleOffIcon />}
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(product)}
                          color="primary"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" onClick={() => handleDelete(product.id)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} sx={{ textAlign: 'center', py: 3 }}>
                    No products found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Heading"
                name="heading"
                value={formData.heading}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Content"
                name="content"
                value={formData.content}
                onChange={handleFormChange}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Features"
                name="features"
                value={formData.features}
                onChange={handleFormChange}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Meta Title"
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Meta Keywords"
                name="metaKeywords"
                value={formData.metaKeywords}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="showOnHomePage"
                    checked={formData.showOnHomePage === 1}
                    onChange={handleFormChange}
                  />
                }
                label="Show on Home Page"
              />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="bannerImage-input" style={{ display: 'block', marginBottom: '8px' }}>
                Banner Image:
              </label>
              <input
                id="bannerImage-input"
                type="file"
                accept="image/*"
                onChange={handleBannerImageChange}
                style={{ marginBottom: '8px' }}
              />
              {bannerImagePreview && (
                <img
                  src={bannerImagePreview}
                  alt="preview"
                  style={{ height: '100px', width: 'auto', marginTop: '8px' }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="productImage-input" style={{ display: 'block', marginBottom: '8px' }}>
                Product Image:
              </label>
              <input
                id="productImage-input"
                type="file"
                accept="image/*"
                onChange={handleProductImageChange}
                style={{ marginBottom: '8px' }}
              />
              {productImagePreview && (
                <img
                  src={productImagePreview}
                  alt="preview"
                  style={{ height: '100px', width: 'auto', marginTop: '8px' }}
                />
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {editingId ? 'Update' : 'Add'} Product
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ProductList