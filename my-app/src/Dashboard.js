import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Stack,
  Paper,
} from '@mui/material';
import {
  Phone,
  Mail,
  MessageCircle,
  Star,
  Users,
  Share2,
  Building2,
  FileText,
  Video,
  CreditCard,
  Briefcase,
  Camera,
} from 'lucide-react';

const features = [
  { icon: Phone, title: "One Click Call", description: "Direct phone calls", color: "#4f46e5", bgColor: "#e0e7ff" },
  { icon: MessageCircle, title: "One Click WhatsApp", description: "Instant messaging", color: "#16a34a", bgColor: "#dcfce7" },
  { icon: Mail, title: "One Click Email", description: "Direct email contact", color: "#be185d", bgColor: "#fce7f3" },
  { icon: Star, title: "Get Customers Feedback", description: "Reviews & ratings", color: "#f59e0b", bgColor: "#fef3c7" },
  { icon: Users, title: "Add to Contacts", description: "Save contact info", color: "#3b82f6", bgColor: "#dbeafe" },
  { icon: Share2, title: "Website & Social Links", description: "Social media integration", color: "#8b5cf6", bgColor: "#ede9fe" },
  { icon: Share2, title: "Share Unlimited", description: "Easy sharing options", color: "#9333ea", bgColor: "#f5f3ff" },
  { icon: Building2, title: "Online Store", description: "E-commerce ready", color: "#0d9488", bgColor: "#ccfbf1" },
  { icon: FileText, title: "Easy To Update", description: "Simple management", color: "#6b7280", bgColor: "#e5e7eb" },
  { icon: Video, title: "Youtube Video Gallery", description: "Video showcase", color: "#dc2626", bgColor: "#fee2e2" },
  { icon: CreditCard, title: "Payment Section", description: "Secure payments", color: "#1d4ed8", bgColor: "#e0f2fe" },
  { icon: FileText, title: "Enquiry Form", description: "Lead generation", color: "#065f46", bgColor: "#d1fae5" },
];

const businessTypes = [
  { icon: Briefcase, title: "Business Owners", description: "Business owners who call and/or meet prospects personally to get business.", color: "#4f46e5", bgColor: "#e0e7ff" },
  { icon: Users, title: "Sales Professionals", description: "Independent Sales Professionals, Field Staff and Sales Executives.", color: "#16a34a", bgColor: "#dcfce7" },
  { icon: Building2, title: "Software & IT", description: "Web Designers, Digital and Social Media Marketers who call / meet business people.", color: "#0ea5e9", bgColor: "#e0f2fe" },
  { icon: Camera, title: "Marketing Agencies", description: "Agencies with specialists in marketing and media.", color: "#f59e0b", bgColor: "#fef3c7" },
];

const Index = () => {
  const handleCall = () => window.open('tel:+919080809998', '_self');
  const handleWhatsApp = () => window.open('https://wa.me/919080809998', '_blank');
  const handleEmail = () => window.open('mailto:contact@nithraconsulting.com', '_self');

  return (
    <Box>

      {/* Hero Section */}
  {/* Hero Section */}
<Box
  sx={{
    py: 10,
    textAlign: 'center',
    background: 'linear-gradient(120deg, #fef3f3 0%, #e0f2fe 100%)',
    position: 'relative',
    overflow: 'hidden',
  }}
>
  <Container maxWidth="md">
    <Typography variant="h3" fontWeight={800} gutterBottom color="primary.main">
      Nithra Digital Card
    </Typography>
    <Typography variant="h4" fontWeight={800} color="#9333ea" gutterBottom>
      Create your online business
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
      Digital Business card platform makes designing a card or Mini ecommerce store simple, convenient, and reliable.
    </Typography>
    <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 4 }}>
      Create what you need in Just 5 minutes !!
    </Typography>
    <Button
      variant="contained"
      size="large"
      sx={{
        background: 'linear-gradient(to right, #9333ea, #3b82f6)',
        color: 'white',
        px: 4,
        py: 1.5,
        fontWeight: 600,
        borderRadius: 2,
        boxShadow: 4,
        '&:hover': {
          background: 'linear-gradient(to right, #7e22ce, #2563eb)',
        },
      }}
    >
      Make your Card
    </Button>

    {/* Call-to-action Card */}
    <Box mt={8}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          border: '2px solid',
          borderImage: 'linear-gradient(to right, #facc15, #9333ea, #3b82f6) 1',
          maxWidth: 420,
          mx: 'auto',
          background: '#ffffff',
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Avatar
            sx={{
              background: 'linear-gradient(to right, #9333ea, #3b82f6)',
              width: 64,
              height: 64,
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            NCS
          </Avatar>
          <Typography variant="h6" fontWeight={700}>
            NITHRA CONSULTING
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your Business Partner
          </Typography>
          <Grid container spacing={1} justifyContent="center">
            <Grid item>
              <Button variant="outlined" size="small" startIcon={<Phone />} onClick={handleCall}>
                Call
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" size="small" startIcon={<MessageCircle />} onClick={handleWhatsApp}>
                WhatsApp
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" size="small" startIcon={<Mail />} onClick={handleEmail}>
                Mail
              </Button>
            </Grid>
          </Grid>
          <Typography variant="body2">📞 +91 9080809998</Typography>
          <Typography variant="body2">✉️ contact@nithraconsulting.com</Typography>
          <Typography variant="body2">📍 Your Business Address</Typography>
        </Stack>
      </Paper>
    </Box>
  </Container>
</Box>

      {/* Features Section */}
      <Box sx={{ bgcolor: '#f9fafb', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>
            Features
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={index}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Card
                  sx={{
                    height: 220,
                    width: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: 3,
                    boxShadow: 3,
                    borderRadius: 3,
                    bgcolor: '#ffffff',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 0 }}>
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        backgroundColor: feature.bgColor,
                        mx: 'auto',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <feature.icon size={30} color={feature.color} />
                    </Box>
                    <Typography variant="h6" fontWeight={600} color={feature.color}>
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mt: 1,
                        height: 50,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Who is it for Section */}
      <Box sx={{ bgcolor: '#f3f4f6', py: 8 }}>
        
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>
            Who is it for?
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {businessTypes.map((type, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                key={index}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Card
                  sx={{
                    width: 300,
                    height: 250,
                    p: 3,
                    boxShadow: 3,
                    borderRadius: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    bgcolor: '#ffffff',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      backgroundColor: type.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    <type.icon size={30} color={type.color} />
                  </Box>
                  <Typography variant="h6" fontWeight={600}>
                    {type.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {type.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box sx={{ backgroundColor: '#6D28D9', color: 'white', py: 6 }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                Get in Touch with Nithra Consulting Services
              </Typography>
              <Typography variant="body1">
                Ready to grow your business? We’re here to help!
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <ListItemIcon sx={{ color: 'white' }}><Phone size={20} /></ListItemIcon>
                  <ListItemText primary="+91 9080809998" />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ color: 'white' }}><Mail size={20} /></ListItemIcon>
                  <ListItemText primary="contact@nithraconsulting.com" />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ color: 'white' }}><Building2 size={20} /></ListItemIcon>
                  <ListItemText primary="Coimbatore, Tamil Nadu, India" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Container>
      </Box>

    </Box>
  );
};

export default Index;
