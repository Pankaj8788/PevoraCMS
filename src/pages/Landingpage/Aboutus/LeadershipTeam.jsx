import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  CircularProgress,
  Chip,
  IconButton,
  Stack,
  Paper,
  Divider,
  Badge,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  LinkedIn,
  Twitter,
  Mail,
  WorkspacePremium,
  TrendingUp,
  Groups,
  VerifiedUser,
  EmojiEvents,
  ExpandMore,
  BusinessCenter,
} from '@mui/icons-material';
import axios from 'axios';

const LeadershipTeam = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categorizedTeams, setCategorizedTeams] = useState({});
  const apiUrl = 'https://testapicms.pvorasp.com/api/public/teams';

  // Team category labels - customize based on your teamTypeId values
  const teamTypeLabels = {
    1: 'Executive Leadership',
    2: 'Board of Directors',
    3: 'Advisory Board',
    4: 'Senior Management',
    // Add more categories as needed
  };

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((res) => {
        const teamData = res.data;
        setTeam(teamData);
        
        // Categorize teams by teamTypeId
        const categorized = teamData.reduce((acc, member) => {
          const typeId = member.teamTypeId || 'uncategorized';
          if (!acc[typeId]) {
            acc[typeId] = [];
          }
          acc[typeId].push(member);
          return acc;
        }, {});
        
        setCategorizedTeams(categorized);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching team data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0A0E27 0%, #1a1f3a 100%)',
        }}
      >
        <CircularProgress
          size={{ xs: 50, sm: 60, md: 70 }}
          thickness={3.5}
          sx={{
            color: '#3B82F6',
            filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))',
          }}
        />
        <Typography
          sx={{
            color: '#fff',
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' },
            mt: { xs: 2, sm: 3 },
            fontWeight: 600,
            letterSpacing: { xs: 1, sm: 1.5, md: 2 },
          }}
        >
          LOADING TEAM
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0A0E27 0%, #1a1f3a 100%)',
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 4, sm: 6, md: 8 },
      }}
    >
      <Container 
        maxWidth="xl" 
        sx={{ 
          position: 'relative', 
          zIndex: 1,
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        {/* Hero Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, sm: 6, md: 8 } }}>
          <Stack 
            direction="row" 
            justifyContent="center" 
            spacing={{ xs: 1, sm: 2 }} 
            mb={{ xs: 2, sm: 3 }}
            flexWrap="wrap"
          >
            <Chip
              icon={<Groups sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />}
              label="LEADERSHIP"
              sx={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                color: '#fff',
                fontWeight: 700,
                fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                letterSpacing: { xs: 1, sm: 1.5, md: 2 },
                px: { xs: 1.5, sm: 2 },
                py: { xs: 2, sm: 2.5, md: 3 },
                height: 'auto',
                boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
              }}
            />
          </Stack>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              background: 'linear-gradient(135deg, #3B82F6, #60A5FA, #ffffff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: { xs: 2, sm: 3 },
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.5rem', lg: '4rem' },
              letterSpacing: { xs: '-1px', md: '-2px' },
              textTransform: 'uppercase',
              px: { xs: 2, sm: 0 },
              lineHeight: { xs: 1.2, sm: 1.1 },
            }}
          >
            Leadership Team
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '700px',
              mx: 'auto',
              fontWeight: 400,
              lineHeight: { xs: 1.6, sm: 1.7, md: 1.8 },
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              px: { xs: 2, sm: 3, md: 0 },
            }}
          >
            Driving Innovation in Financial Technology with Unparalleled Expertise
          </Typography>

          <Box sx={{ mt: { xs: 2, sm: 3, md: 4 } }}>
            <Divider
              sx={{
                width: { xs: '60px', sm: '80px', md: '100px' },
                mx: 'auto',
                borderWidth: 2,
                borderColor: '#3B82F6',
                boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)',
              }}
            />
          </Box>
        </Box>

        {/* Stats Bar */}
        <Paper
          elevation={0}
          sx={{
            mb: { xs: 4, sm: 5, md: 6 },
            p: { xs: 2.5, sm: 3, md: 4 },
            borderRadius: { xs: '16px', sm: '20px', md: '24px' },
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            <Grid item xs={12} sm={4}>
              <Stack alignItems="center" spacing={{ xs: 0.5, sm: 1 }}>
                <Box
                  sx={{
                    width: { xs: 60, sm: 70, md: 80 },
                    height: { xs: 60, sm: 70, md: 80 },
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1,
                    boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)',
                  }}
                >
                  <WorkspacePremium sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: '#fff' }} />
                </Box>
                <Typography
                  variant="h3"
                  sx={{ 
                    fontWeight: 900, 
                    color: '#3B82F6',
                    fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem', lg: '3rem' }
                  }}
                >
                  {team.length}+
                </Typography>
                <Typography 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' }
                  }}
                >
                  Expert Leaders
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Stack alignItems="center" spacing={{ xs: 0.5, sm: 1 }}>
                <Box
                  sx={{
                    width: { xs: 60, sm: 70, md: 80 },
                    height: { xs: 60, sm: 70, md: 80 },
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1,
                    boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)',
                  }}
                >
                  <TrendingUp sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: '#fff' }} />
                </Box>
                <Typography
                  variant="h3"
                  sx={{ 
                    fontWeight: 900, 
                    color: '#10B981',
                    fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem', lg: '3rem' }
                  }}
                >
                  150+
                </Typography>
                <Typography 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' }
                  }}
                >
                  Years Combined
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Stack alignItems="center" spacing={{ xs: 0.5, sm: 1 }}>
                <Box
                  sx={{
                    width: { xs: 60, sm: 70, md: 80 },
                    height: { xs: 60, sm: 70, md: 80 },
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1,
                    boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)',
                  }}
                >
                  <EmojiEvents sx={{ fontSize: { xs: 30, sm: 35, md: 40 }, color: '#fff' }} />
                </Box>
                <Typography
                  variant="h3"
                  sx={{ 
                    fontWeight: 900, 
                    color: '#8B5CF6',
                    fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem', lg: '3rem' }
                  }}
                >
                  100%
                </Typography>
                <Typography 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' }
                  }}
                >
                  Excellence Driven
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        {/* Categorized Team Sections */}
        {Object.entries(categorizedTeams).map(([typeId, members], sectionIndex) => (
          <Box key={typeId} sx={{ mb: { xs: 4, sm: 6, md: 8 } }}>
            {/* Category Header */}
            <Box
              sx={{
                mb: { xs: 3, sm: 4 },
                textAlign: 'center',
              }}
            >
              <Stack 
                direction="row" 
                alignItems="center" 
                justifyContent="center" 
                spacing={{ xs: 1, sm: 2 }}
                flexWrap="wrap"
                mb={2}
              >
                <BusinessCenter 
                  sx={{ 
                    color: '#3B82F6', 
                    fontSize: { xs: 24, sm: 28, md: 32 }
                  }} 
                />
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    color: '#fff',
                    fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2.2rem' },
                    letterSpacing: { xs: '0px', md: '0.5px' },
                  }}
                >
                  {teamTypeLabels[typeId] || `Team Category ${typeId}`}
                </Typography>
              </Stack>
              <Divider
                sx={{
                  width: { xs: '50px', sm: '70px', md: '80px' },
                  mx: 'auto',
                  borderWidth: 2,
                  borderColor: '#3B82F6',
                  opacity: 0.6,
                }}
              />
            </Box>

            {/* Team Grid */}
            <Grid container spacing={{ xs: 2, sm: 2.5, md: 3, lg: 4 }}>
              {members.map((member, index) => {
                const colorIndex = (sectionIndex + index) % 3;
                const colors = [
                  { primary: '#3B82F6', secondary: '#2563EB', shadow: 'rgba(59, 130, 246, 0.3)' },
                  { primary: '#10B981', secondary: '#059669', shadow: 'rgba(16, 185, 129, 0.3)' },
                  { primary: '#8B5CF6', secondary: '#7C3AED', shadow: 'rgba(139, 92, 246, 0.3)' },
                ];
                const color = colors[colorIndex];

                return (
                  <Grid 
                    item 
                    xs={12} 
                    sm={6} 
                    md={4} 
                    lg={3} 
                    key={member.id || index} 
                    sx={{ display: 'flex' }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: { xs: '16px', sm: '20px', md: '24px' },
                        background: 'rgba(255, 255, 255, 0.02)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        position: 'relative',
                        overflow: 'visible',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '3px',
                          background: `linear-gradient(90deg, ${color.primary}, ${color.secondary})`,
                          borderRadius: { xs: '16px 16px 0 0', sm: '20px 20px 0 0', md: '24px 24px 0 0' },
                        },
                        '&:hover': {
                          transform: { 
                            xs: 'translateY(-8px)', 
                            sm: 'translateY(-12px)', 
                            md: 'translateY(-16px)' 
                          },
                          background: 'rgba(255, 255, 255, 0.05)',
                          boxShadow: `0 12px 40px ${color.shadow}`,
                          '& .member-avatar': {
                            transform: { 
                              xs: 'scale(1.05)', 
                              sm: 'scale(1.08)', 
                              md: 'scale(1.1)' 
                            },
                            boxShadow: `0 8px 32px ${color.shadow}`,
                          },
                          '& .social-btns': {
                            opacity: 1,
                            transform: 'translateY(0)',
                          },
                        },
                      }}
                    >
                      <CardContent 
                        sx={{ 
                          p: { xs: 2, sm: 2.5, md: 3 },
                          textAlign: 'center',
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        {/* Verified Badge */}
                        <Box 
                          sx={{ 
                            position: 'absolute', 
                            top: { xs: 12, sm: 16, md: 20 }, 
                            right: { xs: 12, sm: 16, md: 20 } 
                          }}
                        >
                          <Badge
                            badgeContent={
                              <VerifiedUser
                                sx={{
                                  fontSize: { xs: 16, sm: 18, md: 20 },
                                  color: color.primary,
                                  filter: `drop-shadow(0 0 6px ${color.primary})`,
                                }}
                              />
                            }
                          />
                        </Box>

                        {/* Position Badge */}
                        <Box
                          sx={{
                            position: 'absolute',
                            top: { xs: 12, sm: 16, md: 20 },
                            left: { xs: 12, sm: 16, md: 20 },
                            width: { xs: 32, sm: 36, md: 40 },
                            height: { xs: 32, sm: 36, md: 40 },
                            borderRadius: { xs: '8px', sm: '10px', md: '12px' },
                            background: `linear-gradient(135deg, ${color.primary}, ${color.secondary})`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: `0 3px 12px ${color.shadow}`,
                          }}
                        >
                          <Typography 
                            sx={{ 
                              color: '#fff', 
                              fontWeight: 900,
                              fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' }
                            }}
                          >
                            {index + 1}
                          </Typography>
                        </Box>

                        {/* Avatar */}
                        <Box 
                          sx={{ 
                            position: 'relative', 
                            mb: { xs: 1.5, sm: 2 }, 
                            mt: { xs: 1, sm: 1.5, md: 2 } 
                          }}
                        >
                          <Avatar
                            className="member-avatar"
                            alt={member.name}
                            src={member.image || '/default-avatar.png'}
                            sx={{
                              width: { xs: 80, sm: 100, md: 120, lg: 130 },
                              height: { xs: 80, sm: 100, md: 120, lg: 130 },
                              mx: 'auto',
                              border: `3px solid ${color.primary}`,
                              boxShadow: `0 6px 24px ${color.shadow}`,
                              transition: 'all 0.4s ease',
                            }}
                          />
                        </Box>

                        {/* Name */}
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 800,
                            color: '#fff',
                            mb: { xs: 0.5, sm: 1 },
                            fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.4rem' },
                            letterSpacing: '0.3px',
                            lineHeight: 1.3,
                          }}
                        >
                          {member.name}
                        </Typography>

                        {/* Designation */}
                        <Chip
                          label={member.designation}
                          sx={{
                            mb: { xs: 1.5, sm: 2 },
                            px: { xs: 1.5, sm: 2 },
                            py: { xs: 2, sm: 2.5 },
                            background: `linear-gradient(135deg, ${color.primary}, ${color.secondary})`,
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.85rem' },
                            borderRadius: { xs: '8px', sm: '10px', md: '12px' },
                            letterSpacing: '0.3px',
                            height: 'auto',
                            '& .MuiChip-label': {
                              whiteSpace: 'normal',
                              lineHeight: 1.4,
                            }
                          }}
                        />

                        {/* Experience */}
                        <Paper
                          elevation={0}
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: { xs: 0.5, sm: 1 },
                            px: { xs: 1.5, sm: 2 },
                            py: { xs: 0.75, sm: 1 },
                            borderRadius: { xs: '10px', sm: '12px', md: '14px' },
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            mb: { xs: 1.5, sm: 2 },
                          }}
                        >
                          <WorkspacePremium
                            sx={{
                              fontSize: { xs: 14, sm: 16, md: 18 },
                              color: color.primary,
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#fff',
                              fontWeight: 600,
                              fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' },
                            }}
                          >
                            {member.experience}
                          </Typography>
                        </Paper>

                        {/* Achievement */}
                        <Box
                          sx={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                            lineHeight: { xs: 1.6, sm: 1.7 },
                            textAlign: 'left',
                            mb: { xs: 2, sm: 2.5, md: 3 },
                            maxHeight: { xs: '80px', sm: '90px', md: '100px' },
                            overflow: 'hidden',
                            position: 'relative',
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              height: '40px',
                              background: 'linear-gradient(transparent, rgba(10, 14, 39, 0.95))',
                            },
                            '& p': { 
                              mb: 0.5, 
                              color: 'rgba(255, 255, 255, 0.7)',
                              fontSize: 'inherit'
                            },
                            '& strong': { color: '#fff', fontWeight: 700 },
                          }}
                          dangerouslySetInnerHTML={{ __html: member.achievement }}
                        />

                        {/* Social Icons */}
                        <Stack
                          className="social-btns"
                          direction="row"
                          spacing={{ xs: 0.75, sm: 1 }}
                          justifyContent="center"
                          sx={{
                            mt: 'auto',
                            opacity: { xs: 1, md: 0 },
                            transform: { xs: 'translateY(0)', md: 'translateY(20px)' },
                            transition: 'all 0.4s ease',
                          }}
                        >
                          <IconButton
                            size="small"
                            sx={{
                              background: `${color.primary}15`,
                              border: `1px solid ${color.primary}30`,
                              color: color.primary,
                              width: { xs: 36, sm: 40 },
                              height: { xs: 36, sm: 40 },
                              '&:hover': {
                                background: color.primary,
                                color: '#000',
                                transform: 'scale(1.1)',
                              },
                            }}
                          >
                            <LinkedIn sx={{ fontSize: { xs: 18, sm: 20 } }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{
                              background: `${color.primary}15`,
                              border: `1px solid ${color.primary}30`,
                              color: color.primary,
                              width: { xs: 36, sm: 40 },
                              height: { xs: 36, sm: 40 },
                              '&:hover': {
                                background: color.primary,
                                color: '#000',
                                transform: 'scale(1.1)',
                              },
                            }}
                          >
                            <Twitter sx={{ fontSize: { xs: 18, sm: 20 } }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{
                              background: `${color.primary}15`,
                              border: `1px solid ${color.primary}30`,
                              color: color.primary,
                              width: { xs: 36, sm: 40 },
                              height: { xs: 36, sm: 40 },
                              '&:hover': {
                                background: color.primary,
                                color: '#000',
                                transform: 'scale(1.1)',
                              },
                            }}
                          >
                            <Mail sx={{ fontSize: { xs: 18, sm: 20 } }} />
                          </IconButton>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        ))}

        {/* Footer CTA */}
        <Box
          sx={{
            mt: { xs: 6, sm: 8, md: 10 },
            p: { xs: 3, sm: 4, md: 6 },
            borderRadius: { xs: '16px', sm: '20px', md: '24px' },
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #3B82F6, #60A5FA, #ffffff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: { xs: 1.5, sm: 2 },
              fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2.2rem' },
              px: { xs: 2, sm: 0 },
            }}
          >
            Ready to Transform Your Business?
          </Typography>
          <Typography 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              mb: { xs: 2.5, sm: 3, md: 4 },
              fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
              px: { xs: 2, sm: 0 },
            }}
          >
            Join thousands of businesses trusting our payment solutions
          </Typography>
          <Chip
            label="GET STARTED NOW"
            sx={{
              background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
              color: '#fff',
              fontWeight: 700,
              fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
              px: { xs: 3, sm: 4 },
              py: { xs: 2.5, sm: 3 },
              height: 'auto',
              cursor: 'pointer',
              letterSpacing: { xs: 0.5, sm: 1 },
              boxShadow: '0 6px 24px rgba(59, 130, 246, 0.4)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: { 
                  xs: 'translateY(-2px)', 
                  sm: 'translateY(-4px)' 
                },
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.6)',
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default LeadershipTeam;