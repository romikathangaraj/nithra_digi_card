import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Container } from '@mui/material';
import { Users, Target, Award, Heart } from 'lucide-react';
const About = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f9fafb' }}>
      {/* Gradient Header */}
      <Box
        sx={{
          background: 'linear-gradient(to right, #7c3aed, #3b82f6)',
          color: 'white',
          py: 10,
          textAlign: 'center',
        }}
      >
        <Container>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            About Nithra Consulting Services
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: '#ddd6fe', maxWidth: 600, mx: 'auto' }}
          >
            Your trusted partner in digital transformation and business consulting
          </Typography>
        </Container>
      </Box>

      {/* Our Story + Stats Side by Side */}
      <Container sx={{ py: 10 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 6,
            alignItems: 'flex-start',
          }}
        >
          {/* Our Story */}
          <Box flex={1}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Our Story
            </Typography>
            <Typography paragraph color="text.secondary">
              Nithra Consulting Services (NCS) was founded with a vision to bridge the gap between traditional business practices and modern digital solutions. We understand that in today's fast-paced world, businesses need to adapt quickly to stay competitive.
            </Typography>
            <Typography paragraph color="text.secondary">
              Our digital business card platform represents the future of networking and business presentations. We help professionals and businesses create stunning, interactive digital cards that leave lasting impressions and drive real results.
            </Typography>
            <Typography color="text.secondary">
              With our innovative approach, we've helped hundreds of businesses transform their digital presence and achieve remarkable growth in customer engagement and lead generation.
            </Typography>
          </Box>

          {/* Stats */}
          <Box
            flex={1}
            sx={{
              background: 'linear-gradient(to bottom right, #ede9fe, #dbeafe)',
              borderRadius: 2,
              p: 4,
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 4,
                textAlign: 'center',
              }}
            >
              {[
                { label: 'Happy Clients', value: '500+', color: '#7c3aed' },
                { label: 'Digital Cards Created', value: '1000+', color: '#2563eb' },
                { label: 'Client Satisfaction', value: '95%', color: '#16a34a' },
                { label: 'Support Available', value: '24/7', color: '#f97316' },
              ].map((stat, i) => (
                <Box key={i}>
                  <Typography variant="h4" fontWeight="bold" sx={{ color: stat.color }}>
                    {stat.value}
                  </Typography>
                  <Typography color="text.secondary">{stat.label}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Values Section */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
            gap: 4,
            mt: 8,
          }}
        >
          {[
            {
              icon: <Users size={32} />,
              label: 'Customer First',
              description: "We prioritize our customers' success above everything else",
              iconColor: '#3b82f6',
              bgColor: '#dbeafe',
            },
            {
              icon: <Target size={32} />,
              label: 'Innovation',
              description: 'Constantly evolving to provide cutting-edge solutions',
              iconColor: '#22c55e',
              bgColor: '#dcfce7',
            },
            {
              icon: <Award size={32} />,
              label: 'Excellence',
              description: 'Committed to delivering the highest quality services',
              iconColor: '#8b5cf6',
              bgColor: '#ede9fe',
            },
            {
              icon: <Heart size={32} />,
              label: 'Integrity',
              description: 'Building trust through honest and transparent practices',
              iconColor: '#f43f5e',
              bgColor: '#fee2e2',
            },
          ].map((item, i) => (
            <Card key={i} sx={{ textAlign: 'center', p: 3 }}>
              <CardContent>
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: item.bgColor,
                    color: item.iconColor,
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  {item.icon}
                </Avatar>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {item.label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};
export default About;