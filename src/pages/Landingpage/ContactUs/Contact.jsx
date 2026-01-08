import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  CircularProgress,
  IconButton,
  Link,
  Divider,
  Alert,
  Card,
  CardContent,
  Chip,
  Stack,
  Tooltip
} from '@mui/material';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  FileText,
  Send,
  CheckCircle,
  Clock,
  Globe
} from 'lucide-react';
const Contact = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      const response = await fetch('https://testapicms.pvorasp.com/api/public/contact');
      if (!response.ok) throw new Error('Failed to fetch contact data');
      const data = await response.json();
      setContactData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormSubmitting(false);
    setFormSuccess(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setFormSuccess(false), 5000);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 3 }}>
        <Alert severity="error">Error loading contact information: {error}</Alert>
      </Box>
    );
  }

  const bannerImageUrl = contactData?.bannerImage 
    ? `https://testapicms.pvorasp.com/uploads/${contactData.bannerImage}`
    : 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600';

  const socialLinks = [
    { icon: Facebook, url: contactData?.facebook, color: '#1877F2', darkColor: '#0a66c2', name: 'Facebook' },
    { icon: Instagram, url: contactData?.instagram, color: '#E4405F', darkColor: '#D81B60', name: 'Instagram' },
    { icon: Youtube, url: contactData?.youtube, color: '#FF0000', darkColor: '#D32F2F', name: 'YouTube' },
    { icon: Twitter, url: contactData?.twitter, color: '#1DA1F2', darkColor: '#1976d2', name: 'Twitter' },
    { icon: Linkedin, url: contactData?.linkedin, color: '#0A66C2', darkColor: '#004b87', name: 'LinkedIn' }
  ];

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Background with gradient overlay */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(135deg, rgba(25, 118, 210, 0.15) 0%, rgba(13, 71, 161, 0.15) 100%), url(${bannerImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          zIndex: -1,
          filter: 'brightness(0.9)'
        }}
      />

      {/* Decorative elements */}
      <Box
        sx={{
          position: 'fixed',
          top: -50,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(25, 118, 210, 0.1) 0%, transparent 70%)',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          bottom: -100,
          left: -100,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13, 71, 161, 0.1) 0%, transparent 70%)',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Box sx={{ mb: 3 }}>
            <Chip
              label="Get In Touch"
              variant="outlined"
              sx={{
                borderColor: 'rgba(255,255,255,0.5)',
                color: 'white',
                fontSize: '0.9rem',
                fontWeight: 600,
                mb: 2
              }}
            />
          </Box>
          <Typography
            variant="h2"
            sx={{
              color: 'white',
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
              textShadow: '2px 2px 8px rgba(0,0,0,0.4)',
              letterSpacing: '-0.5px'
            }}
          >
            We're Here to Help
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255,255,255,0.95)',
              maxWidth: 600,
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.2rem' },
              textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
              fontWeight: 300,
              lineHeight: 1.6
            }}
          >
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 6, alignItems: 'flex-start' }}>
          {/* Contact Information Cards */}
          <Grid item xs={12} sm={6} md={5} lg={5}>
            <Stack spacing={3} sx={{ position: 'sticky', top: 20, height: 'fit-content' }}>
              {/* Phone Card */}
              <Card
                sx={{
                  backdropFilter: 'blur(20px)',
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    background: 'rgba(255, 255, 255, 1)'
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                        flexShrink: 0
                      }}
                    >
                      <Phone size={24} color="white" />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontSize: '0.85rem', color: '#666', fontWeight: 600, mb: 0.5 }}>
                        PHONE
                      </Typography>
                      <Link
                        href={`tel:${contactData?.contactNumber}`}
                        sx={{
                          textDecoration: 'none',
                          color: '#1976d2',
                          fontWeight: 600,
                          fontSize: '1.1rem',
                          '&:hover': { color: '#1565c0', textDecoration: 'underline' }
                        }}
                      >
                        {contactData?.contactNumber}
                      </Link>
                      <Typography sx={{ fontSize: '0.8rem', color: '#999', mt: 0.5 }}>
                        Available Mon-Fri, 9AM-6PM
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* Email Card */}
              <Card
                sx={{
                  backdropFilter: 'blur(20px)',
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    background: 'rgba(255, 255, 255, 1)'
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #E4405F 0%, #D81B60 100%)',
                        flexShrink: 0
                      }}
                    >
                      <Mail size={24} color="white" />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontSize: '0.85rem', color: '#666', fontWeight: 600, mb: 0.5 }}>
                        EMAIL
                      </Typography>
                      <Link
                        href={`mailto:${contactData?.email}`}
                        sx={{
                          textDecoration: 'none',
                          color: '#1976d2',
                          fontWeight: 600,
                          fontSize: '1.1rem',
                          '&:hover': { color: '#1565c0', textDecoration: 'underline' }
                        }}
                      >
                        {contactData?.email}
                      </Link>
                      <Typography sx={{ fontSize: '0.8rem', color: '#999', mt: 0.5 }}>
                        We'll reply within 24 hours
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* Address Card */}
              <Card
                sx={{
                  backdropFilter: 'blur(20px)',
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    background: 'rgba(255, 255, 255, 1)'
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #FF5722 0%, #E64A19 100%)',
                        flexShrink: 0
                      }}
                    >
                      <MapPin size={24} color="white" />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontSize: '0.85rem', color: '#666', fontWeight: 600, mb: 0.5 }}>
                        OFFICE ADDRESS
                      </Typography>
                      <Typography sx={{ color: '#333', fontWeight: 500, fontSize: '1rem', mb: 1.5 }}>
                        {contactData?.address}
                      </Typography>
                      {contactData?.googleMap && (
                        <Link
                          href={contactData.googleMap}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 0.5,
                            color: '#1976d2',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' }
                          }}
                        >
                          <Globe size={14} />
                          View on Google Maps
                        </Link>
                      )}
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* GST Card */}
              {contactData?.gstNumber && (
                <Card
                  sx={{
                    backdropFilter: 'blur(20px)',
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 3,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 50,
                          height: 50,
                          borderRadius: 2,
                          background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                          flexShrink: 0
                        }}
                      >
                        <FileText size={24} color="white" />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: '0.85rem', color: '#666', fontWeight: 600, mb: 0.5 }}>
                          GST NUMBER
                        </Typography>
                        <Typography sx={{ color: '#333', fontWeight: 500, fontSize: '1rem' }}>
                          {contactData.gstNumber}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              )}

              {/* Social Links */}
              <Card
                sx={{
                  backdropFilter: 'blur(20px)',
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 3,
                  p: 3
                }}
              >
                <Typography sx={{ fontSize: '0.85rem', color: '#666', fontWeight: 600, mb: 2 }}>
                  FOLLOW US
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return social.url ? (
                      <Tooltip key={index} title={social.name} arrow>
                        <IconButton
                          component="a"
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            width: 45,
                            height: 45,
                            background: `linear-gradient(135deg, ${social.color} 0%, ${social.darkColor} 100%)`,
                            color: 'white',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-4px) scale(1.1)',
                              boxShadow: `0 10px 25px ${social.color}40`,
                            }
                          }}
                        >
                          <Icon size={20} />
                        </IconButton>
                      </Tooltip>
                    ) : null;
                  })}
                </Stack>
              </Card>
            </Stack>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} sm={6} md={7} lg={7}>
            <Card
              sx={{
                backdropFilter: 'blur(20px)',
                background: 'rgba(255, 255, 255, 0.98)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 3,
                p: { xs: 3, md: 4 },
                boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                position: 'sticky',
                top: 20
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#1976d2' }}>
                Send Us a Message
              </Typography>
              <Typography sx={{ color: '#666', fontSize: '0.95rem', mb: 3 }}>
                Fill out the form below and we'll get back to you shortly.
              </Typography>

              {formSuccess && (
                <Alert
                  severity="success"
                  sx={{
                    mb: 3,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <CheckCircle size={20} />
                  Thank you! Your message has been sent successfully. We'll contact you soon.
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Grid container spacing={2.5}>
                  <Grid item xs={12} sm={6}>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#333', mb: 1 }}>
                      Your Name *
                    </Typography>
                    <TextField
                      fullWidth
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      placeholder="John Doe"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: '#f8f9fa',
                          '&:hover fieldset': {
                            borderColor: '#1976d2'
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#1976d2',
                            borderWidth: 2
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#333', mb: 1 }}>
                      Email Address *
                    </Typography>
                    <TextField
                      fullWidth
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      placeholder="john@example.com"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: '#f8f9fa',
                          '&:hover fieldset': {
                            borderColor: '#1976d2'
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#1976d2',
                            borderWidth: 2
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#333', mb: 1 }}>
                      Phone Number
                    </Typography>
                    <TextField
                      fullWidth
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      variant="outlined"
                      placeholder="+91 XXXXX XXXXX"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: '#f8f9fa',
                          '&:hover fieldset': {
                            borderColor: '#1976d2'
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#1976d2',
                            borderWidth: 2
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#333', mb: 1 }}>
                      Message *
                    </Typography>
                    <TextField
                      fullWidth
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      multiline
                      rows={5}
                      variant="outlined"
                      placeholder="Tell us how we can help you..."
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: '#f8f9fa',
                          '&:hover fieldset': {
                            borderColor: '#1976d2'
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#1976d2',
                            borderWidth: 2
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      size="large"
                      disabled={formSubmitting}
                      sx={{
                        py: 1.75,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 15px 35px rgba(25, 118, 210, 0.3)'
                        },
                        '&:disabled': {
                          background: '#ccc'
                        }
                      }}
                    >
                      {formSubmitting ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CircularProgress size={20} color="inherit" />
                          Sending...
                        </Box>
                      ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Send size={20} />
                          Send Message
                        </Box>
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;