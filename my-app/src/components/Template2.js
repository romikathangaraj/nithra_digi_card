import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Button,
  TextField,
  Snackbar,
  Alert,
  Link,
  CssBaseline,
  Container,
  AppBar,
  Toolbar
} from '@mui/material';
import {
  WhatsApp,
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  YouTube,
  Sms as SmsIcon
} from '@mui/icons-material';

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Template2 = ({ card }) => {
  const videoLinks = [card?.link1, card?.link2, card?.link3, card?.link4, card?.link5].filter(Boolean);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [snackbar, setSnackbar] = useState(false);
  const shareUrl = window.location.href;
const cardUrl = `http://localhost:3000/card/${card?.url_slug}`;
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `mailto:${card?.email}?subject=Message from ${form.name}&body=Phone: ${form.phone}%0AEmail: ${form.email}%0A${form.message}`;
    setSnackbar(true);
    setForm({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <Box sx={{ bgcolor: '#000', color: '#fff', minHeight: '100vh' }}>
      <CssBaseline />

      <AppBar position="fixed" sx={{ bgcolor: '#ffb300' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {['home', 'about', 'videos', 'products', 'payment', 'contact'].map((section) => (
              <Button key={section} color="inherit" onClick={() => scrollToSection(section)}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ pt: 12, pb: 6 }}>
       {/* Home */}
{/* Home */}
{/* Home */}
<Box id="home" sx={{ mb: 6, textAlign: 'center' }}>
  <Avatar src={`http://localhost:5000${card?.logo}`} sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }} />
  <Typography variant="h4" fontWeight={700}>{card?.company_name}</Typography>
  <Typography variant="h6">{card?.name} | {card?.position}</Typography>
  <Typography variant="subtitle2">Established: {new Date(card?.established_date).toLocaleDateString()}</Typography>

  {/* Contact Details */}
  <Box sx={{ mt: 3 }}>
    {card?.phone_number && (
      <Typography>
        📞 <Link href={`tel:${card.phone_number}`} underline="hover" color="inherit">{card.phone_number}</Link>
      </Typography>
    )}
    {card?.alternate_phone_number && (
      <Typography>
        📱 <Link href={`https://wa.me/${card.alternate_phone_number}`} target="_blank" underline="hover" color="inherit">WhatsApp</Link>
      </Typography>
    )}
    {card?.email && (
      <Typography>
        📧 <Link href={`mailto:${card.email}`} underline="hover" color="inherit">{card.email}</Link>
      </Typography>
    )}
    {card?.address && (
      <Typography>
        📍 <Link href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(card.address)}`} target="_blank" underline="hover" color="inherit">
          {card.address}
        </Link>
      </Typography>
    )}
  </Box>


{/* Share Section */}
<Box sx={{ mt: 3 }}>
  <Typography variant="h6" gutterBottom>🔗 Share this card</Typography>
  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
    <Button
      variant="outlined"
      color="success"
      startIcon={<WhatsApp />}
      href={`https://wa.me/?text=Check out this business card: ${encodeURIComponent(cardUrl)}`}
      target="_blank"
    >
      WhatsApp
    </Button>

    <Button
      variant="outlined"
      color="primary"
      startIcon={<SmsIcon />}
      href={`sms:?body=Check out this business card: ${encodeURIComponent(cardUrl)}`}
    >
      SMS
    </Button>

    <Button
      variant="outlined"
      color="primary"
      startIcon={<Facebook />}
      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(cardUrl)}`}
      target="_blank"
    >
      Facebook
    </Button>

    <Button
      variant="outlined"
      color="info"
      startIcon={<Twitter />}
      href={`https://twitter.com/intent/tweet?text=Check out this digital business card&url=${encodeURIComponent(cardUrl)}`}
      target="_blank"
    >
      Twitter
    </Button>

    <Button
      variant="outlined"
      color="secondary"
      onClick={() => {
        const shareData = {
          title: card?.company_name,
          text: 'Check out this digital business card',
          url: cardUrl,
        };
        if (navigator.share) {
          navigator.share(shareData);
        } else {
          navigator.clipboard.writeText(cardUrl);
          alert("Link copied to clipboard!");
        }
      }}
    >
      More
    </Button>
  </Box>
</Box>

</Box>



        {/* About */}
        <Box id="about" sx={{ mb: 6 }}>
          <Card sx={{ bgcolor: '#fff3e0', color: '#000', borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h5" fontWeight={700} align="center" gutterBottom>About Us</Typography>
              <Typography>{card?.about_us}</Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Videos */}
        <Box id="videos" sx={{ mb: 6 }}>
          <Card sx={{ bgcolor: '#fffde7', color: '#000', borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h5" fontWeight={700} align="center" gutterBottom>Videos</Typography>
              <Grid container spacing={2} justifyContent="center">
                {videoLinks.length ? videoLinks.map((url, idx) => {
                  let embedUrl = '';
                  try {
                    if (url.includes("youtu.be")) {
                      const id = url.split("youtu.be/")[1].split("?")[0];
                      embedUrl = `https://www.youtube.com/embed/${id}`;
                    } else if (url.includes("youtube.com")) {
                      const urlObj = new URL(url);
                      const v = urlObj.searchParams.get("v");
                      embedUrl = v ? `https://www.youtube.com/embed/${v}` : '';
                    }
                  } catch (e) {}

                  return embedUrl ? (
                    <Grid item xs={12} sm={10} md={8} key={idx}>
                      <Box sx={{ aspectRatio: '16/9', width: '100%' }}>
                        <iframe
                          src={embedUrl}
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          allowFullScreen
                          style={{ borderRadius: 8 }}
                        ></iframe>
                      </Box>
                    </Grid>
                  ) : null;
                }) : <Typography align="center">No videos uploaded</Typography>}
              </Grid>
            </CardContent>
          </Card>
        </Box>

        {/* Products */}
        <Box id="products" sx={{ mb: 6 }}>
          <Card sx={{ bgcolor: '#f1f8e9', color: '#000', borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h5" fontWeight={700} align="center" gutterBottom>Products</Typography>
              <Grid container spacing={2} justifyContent="center">
                {card?.products?.length ? card.products.map((product, idx) => (
                  <Grid item xs={12} sm={6} md={4} key={idx}>
                    <Box sx={{ bgcolor: '#fff', p: 2, borderRadius: 2, textAlign: 'center' }}>
                      <img
                        src={`http://localhost:5000${product.image}`}
                        alt={product.name}
                        style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 8 }}
                      />
                      <Typography variant="subtitle1" fontWeight={600} mt={1}>{product.name}</Typography>
                      <Button variant="contained" color="success" fullWidth href={`https://wa.me/${card?.alternate_phone_number}?text=I'm%20interested%20in%20your%20product:%20${product.name}`} target="_blank">
                        Enquire on WhatsApp
                      </Button>
                    </Box>
                  </Grid>
                )) : <Typography align="center">No products found</Typography>}
              </Grid>
            </CardContent>
          </Card>
        </Box>

        {/* Payment */}
        <Box id="payment" sx={{ mb: 6 }}>
          <Card sx={{ bgcolor: '#ede7f6', color: '#000', borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h5" fontWeight={700} align="center" gutterBottom>Payment Details</Typography>
              <Typography><strong>Bank Name:</strong> {card?.bank_name}</Typography>
              <Typography><strong>Account Holder:</strong> {card?.account_holder_name}</Typography>
              <Typography><strong>Account Number:</strong> {card?.account_number}</Typography>
              <Typography><strong>IFSC:</strong> {card?.ifsc}</Typography>
              <Typography><strong>GPay:</strong> {card?.gpay}</Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Contact */}
        <Box id="contact" sx={{ mb: 6 }}>
          <Card sx={{ bgcolor: '#e3f2fd', color: '#000', borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h5" fontWeight={700} align="center" gutterBottom>Contact Us</Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, maxWidth: 500, mx: 'auto' }}>
                <TextField fullWidth label="Your Name" name="name" value={form.name} onChange={handleChange} sx={{ mb: 2 }} required />
                <TextField fullWidth label="Phone Number" name="phone" value={form.phone} onChange={handleChange} sx={{ mb: 2 }} required />
                <TextField fullWidth label="Email Address" name="email" value={form.email} onChange={handleChange} sx={{ mb: 2 }} required />
                <TextField fullWidth label="Message" name="message" value={form.message} onChange={handleChange} multiline rows={4} sx={{ mb: 2 }} required />
                <Button type="submit" variant="contained" color="primary">Send</Button>
              </Box>
              <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
                {card?.facebook_link && <IconButton href={card.facebook_link} target="_blank"><Facebook /></IconButton>}
                {card?.instagram_link && <IconButton href={card.instagram_link} target="_blank"><Instagram /></IconButton>}
                {card?.linkedin_link && <IconButton href={card.linkedin_link} target="_blank"><LinkedIn /></IconButton>}
                {card?.twitter_link && <IconButton href={card.twitter_link} target="_blank"><Twitter /></IconButton>}
                {card?.youtube_link && <IconButton href={card.youtube_link} target="_blank"><YouTube /></IconButton>}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>

      <Snackbar open={snackbar} autoHideDuration={3000} onClose={() => setSnackbar(false)}>
        <Alert onClose={() => setSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Message sent successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Template2;