// src/components/templates/Template1.jsx
import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Button,
  Link,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  CssBaseline,
  Container
} from '@mui/material';

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Template1 = ({ card }) => {
  return (
    <Box sx={{ bgcolor: '#fff0f6' }}>
      <CssBaseline />
      {/* Navbar */}
      <AppBar position="fixed" sx={{ bgcolor: '#f06292' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">{card?.company_name || 'Company Name'}</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {['home', 'about', 'videos', 'products', 'payment', 'contact'].map((section) => (
              <Button key={section} color="inherit" onClick={() => scrollToSection(section)}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Container maxWidth="lg" sx={{ pt: 10, pb: 5 }}>
        {/* Home Section */}
        <Box id="home" sx={{ mb: 5 }}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={2}>
                  {card?.logo && <Avatar src={`http://localhost:5000${card.logo}`} sx={{ width: 80, height: 80 }} />}
                </Grid>
                <Grid item xs={12} md={10}>
                  <Typography variant="h4">{card?.company_name || 'Company Name'}</Typography>
                  <Typography variant="h6">{card?.name || 'Name'} - {card?.position || 'Position'}</Typography>
                  <Typography><strong>Phone:</strong> {card?.phone_number}</Typography>
                  <Typography><strong>WhatsApp:</strong> {card?.alternate_phone_number}</Typography>
                  <Typography><strong>Email:</strong> {card?.email}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>

        {/* About Us */}
        <Box id="about" sx={{ mb: 5 }}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>About Us</Typography>
              <Typography>{card?.about_us}</Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Videos */}
        <Box id="videos" sx={{ mb: 5 }}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>Videos</Typography>
              <Grid container spacing={2}>
                {card?.videos?.length ? card.videos.slice(0, 5).map((url, idx) => (
                  <Grid item xs={12} md={6} key={idx}>
                    <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                      <iframe
                        src={url}
                        title={`video-${idx}`}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                        }}
                        frameBorder="0"
                        allowFullScreen
                      />
                    </Box>
                  </Grid>
                )) : <Typography>No videos uploaded</Typography>}
              </Grid>
            </CardContent>
          </Card>
        </Box>

        {/* Products */}
    <Box id="products" sx={{ mb: 5 }}>
  <Card sx={{ p: 3, borderRadius: 3 }}>
    <CardContent>
      <Typography variant="h5" gutterBottom>Products</Typography>
      <Grid container spacing={2}>
        {card?.products?.length ? card.products.slice(0, 10).map((product, idx) => (
          <Grid item xs={12} md={4} key={idx}>
            <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2 }}>
              {/* ✅ Show Image if available */}
              {product?.image && (
                <img
                  src={`http://localhost:5000${product.image}`}
                  alt={product?.name}
                  style={{
                    width: '100%',
                    height: 150,
                    objectFit: 'cover',
                    borderRadius: 8,
                    marginBottom: 10
                  }}
                />
              )}

              <Typography variant="subtitle1" gutterBottom>
                <strong>{product?.name}</strong>
              </Typography>

              <Button
                variant="contained"
                color="secondary"
                href={`https://wa.me/${card?.alternate_phone_number}?text=I'm%20interested%20in%20your%20product:%20${product?.name}`}
                target="_blank"
              >
                Enquire on WhatsApp
              </Button>
            </Box>
          </Grid>
        )) : (
          <Typography>No products available</Typography>
        )}
      </Grid>
    </CardContent>
  </Card>
</Box>

        {/* Payment Details */}
        <Box id="payment" sx={{ mb: 5 }}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>Payment Details</Typography>
              <Typography><strong>Bank Name:</strong> {card?.bank_name}</Typography>
              <Typography><strong>Account Holder:</strong> {card?.account_holder_name}</Typography>
              <Typography><strong>Account Number:</strong> {card?.account_number}</Typography>
              <Typography><strong>IFSC:</strong> {card?.ifsc}</Typography>
              <Typography><strong>GPay:</strong> {card?.gpay}</Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Contact Us */}
        <Box id="contact" sx={{ mb: 5 }}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>Contact Us</Typography>
              <Typography>If you have any queries, feel free to <Link href={`mailto:${card?.email}`}>email us</Link>.</Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default Template1;
