import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Avatar
} from '@mui/material';
import { Phone, Mail, MessageCircle, MapPin, Clock, Columns } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
  };

  const handleCall = () => window.open('tel:+919080809998', '_self');
  const handleWhatsApp = () => window.open('https://wa.me/919080809998', '_blank');
  const handleEmail = () => window.open('mailto:contact@nithraconsulting.com', '_self');

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
       <Box sx={{ bgcolor: 'primary.main', py: 8, color: 'white', textAlign: 'center' }}>
      <Container>
        <Typography variant="h4" fontWeight={700} align="center" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" align="center" color='white' sx={{ mb: 5 }}>
          We'd love to hear from you. Fill in the form or contact us directly.
        </Typography>
        </Container>
        </Box>
         <Container sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* LEFT SIDE: Stay in Touch + Bank Details */}
          <Grid item xs={12} md={5}>
            {/* Stay in Touch */}
            <Card elevation={3} sx={{ borderRadius: 3, mb: 4 }}>
              <CardHeader title={<Typography variant="h6">Stay in Touch</Typography>} />
              <Divider />
              <CardContent>
                {[
                  {
                    icon: <Phone size={22} />,
                    label: 'Phone',
                    value: '+91 9080809998',
                    onClick: handleCall,
                    color: 'primary.main',
                  },
                  {
                    icon: <MessageCircle size={22} />,
                    label: 'WhatsApp',
                    value: '+91 9080809998',
                    onClick: handleWhatsApp,
                    color: 'success.main',
                  },
                  {
                    icon: <Mail size={22} />,
                    label: 'Email',
                    value: 'contact@nithraconsulting.com',
                    onClick: handleEmail,
                    color: 'secondary.main',
                  },
                  {
                    icon: <MapPin size={22} />,
                    label: 'Address',
                    value: 'Coimbatore, Tamil Nadu\nIndia',
                    noButton: true,
                    color: 'warning.main',
                  },
                  {
                    icon: <Clock size={22} />,
                    label: 'Business Hours',
                    value: 'Mon - Sat: 9AM - 6PM\nSunday: Closed',
                    noButton: true,
                    color: 'error.main',
                  },
                ].map((item, idx) => (
                  <Box key={idx} display="flex" gap={2} mb={3}>
                    <Avatar sx={{ bgcolor: item.color }}>{item.icon}</Avatar>
                    <Box>
                      <Typography fontWeight="bold">{item.label}</Typography>
                      <Typography whiteSpace="pre-line">{item.value}</Typography>
                      {!item.noButton && (
                        <Button
                          onClick={item.onClick}
                          sx={{ p: 0, textTransform: 'none' }}
                          variant="text"
                          color="inherit"
                        >
                          {item.label === 'Phone'
                            ? 'Click to Call'
                            : item.label === 'WhatsApp'
                            ? 'Chat on WhatsApp'
                            : 'Send Email'}
                        </Button>
                      )}
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>

            {/* Bank Details */}
            <Card elevation={3} sx={{ borderRadius: 3 }}>
              <CardHeader title={<Typography variant="h6">Bank Details</Typography>} />
              <Divider />
              <CardContent>
                {[
                  ['Account Name', 'Nithra Consulting Services'],
                  ['Account Number', 'XXXX-XXXX-XXXX-1234'],
                  ['IFSC Code', 'SBIN0001234'],
                  ['Bank Name', 'State Bank of India'],
                  ['UPI ID', 'nithraconsulting@paytm'],
                ].map(([label, value], idx) => (
                  <Box key={idx} mb={2}>
                    <Typography fontWeight="bold">{label}:</Typography>
                    <Typography>{value}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* RIGHT SIDE: Contact Form */}
          <Grid  item xs={12} md={7} >
             <Card elevation={6} sx={{ borderRadius: 3, width: '200%' }}>
              <CardHeader
                title={<Typography variant="h6">Send us a Message</Typography>}
                subheader="We’ll get back to you within 24 hours."
              />
              <Divider />
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3} direction="column">
                    {[
                      ['firstName', 'First Name *'],
                      ['lastName', 'Last Name *'],
                      ['email', 'Email Address *'],
                      ['phone', 'Phone Number *'],
                      ['company', 'Company / Organization'],
                    ].map(([name, label]) => (
                      <Grid item xs={12} key={name}>
                        <TextField
                          label={label}
                          name={name}
                          value={formData[name]}
                          onChange={handleChange}
                          fullWidth
                        />
                      </Grid>
                    ))}

                    <Grid item xs={12}>
                      <TextField
                        label="Service Interested In"
                        name="service"
                        select
                        fullWidth
                        value={formData.service}
                        onChange={handleChange}
                      >
                        <MenuItem value="">Select a service</MenuItem>
                        <MenuItem value="basic-card">Digital Business Card - Basic</MenuItem>
                        <MenuItem value="premium-card">Digital Business Card - Premium</MenuItem>
                        <MenuItem value="mini-website">Mini E-commerce Website</MenuItem>
                        <MenuItem value="corporate">Corporate Digital Identity</MenuItem>
                        <MenuItem value="custom">Custom Solution</MenuItem>
                      </TextField>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        label="Message *"
                        name="message"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{ bgcolor: '#7e22ce', '&:hover': { bgcolor: '#6b21a8' } }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
