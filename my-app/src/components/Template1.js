import React, { useState } from 'react';
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
  Container,
  IconButton,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  WhatsApp,
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  YouTube,
  Sms as SmsIcon,
  Share as ShareIcon
} from '@mui/icons-material';

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Template1 = ({ card }) => {
  const videoLinks = [card?.link1, card?.link2, card?.link3, card?.link4, card?.link5].filter(Boolean);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [snackbar, setSnackbar] = useState(false);

  const shareUrl = window.location.href;

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
  <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(230, 230, 250, 0.85), rgba(230, 230, 250, 0.85)), url('https://heropatterns.com/static/patterns/graph-paper.svg')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'repeat',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <AppBar position="fixed" sx={{ bgcolor: '#f06292' }}>
        <Toolbar sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {['home', 'about', 'videos', 'products', 'payment', 'contact'].map((section) => (
              <Button key={section} color="inherit" onClick={() => scrollToSection(section)}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ pt: 12, pb: 5 }}>
        {/* Home */}
        <Box id="home" sx={{ mb: 5 }}>
          <Card
            sx={{
              p: 4,
              borderRadius: 3,
              textAlign: 'center',
              color: '#4a148c',
              backgroundImage: 'linear-gradient(135deg, #fce4ec 25%, #f8bbd0 100%)',
              backgroundSize: 'cover',
              boxShadow: 3,
            }}
          >
            <CardContent>
              {card?.logo && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <Avatar src={`http://localhost:5000${card.logo}`} sx={{ width: 120, height: 120 }} />
                </Box>
              )}
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>{card?.company_name}</Typography>
              <Typography variant="h6" sx={{ fontStyle: 'italic', mb: 1 }}>{card?.name}</Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>{card?.position}</Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>Established: {new Date(card?.established_date).toLocaleDateString()}</Typography>
              <Grid container spacing={2} justifyContent="center">
                {card?.phone_number && (
                  <Grid item><Link href={`tel:${card.phone_number}`}>📞 {card.phone_number}</Link></Grid>
                )}
                {card?.alternate_phone_number && (
                  <Grid item><Link href={`https://wa.me/${card.alternate_phone_number}`} target="_blank">💬 WhatsApp</Link></Grid>
                )}
                {card?.email && (
                  <Grid item><Link href={`mailto:${card.email}`}>📧 {card.email}</Link></Grid>
                )}
                {card?.address && card.address !== 'undefined' && (
                  <Grid item>📍 {card.address}</Grid>
                )}
              </Grid>
              <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'center' }}>
                <IconButton href={`https://wa.me?text=${shareUrl}`}><WhatsApp /></IconButton>
                <IconButton href={`sms:?body=${shareUrl}`}><SmsIcon /></IconButton>
                <IconButton href={`https://www.instagram.com/`}><Instagram /></IconButton>
                <IconButton href={`https://www.facebook.com/`}><Facebook /></IconButton>
                <IconButton href={card?.youtube_link || '#'}><YouTube /></IconButton>
              </Box>
            </CardContent>
          </Card>
        </Box>


        {/* About Us */}
        <Box id="about" sx={{ mb: 5 }}>
           <Card
    sx={{
      p: 4,
      borderRadius: 3,
      textAlign: 'center',
      color: '#4a148c',
      backgroundImage: 'linear-gradient(135deg, #fce4ec 25%, #f8bbd0 100%)',
      backgroundSize: 'cover',
      boxShadow: 3,
    }}
  >
            <CardContent>
              <Typography variant="h5" gutterBottom fontWeight={700}>About Us</Typography>
              <Typography>{card?.about_us}</Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Videos */}
   <Box id="videos" sx={{ mb: 5 }}>
  <Card
    sx={{
      p: 4,
      borderRadius: 3,
      textAlign: 'center',
      color: '#4a148c',
      backgroundImage: 'linear-gradient(135deg, #fce4ec 25%, #f8bbd0 100%)',
      backgroundSize: 'cover',
      boxShadow: 3,
    }}
  >
    <CardContent>
      <Typography variant="h5" gutterBottom fontWeight={700}>
        Videos
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {videoLinks.length > 0 ? (
          videoLinks.map((url, idx) => {
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
            } catch (e) {
              console.warn('Invalid video URL:', url);
            }
            return embedUrl ? (
              <Grid item xs={12} sm={10} md={6} key={idx} display="flex" justifyContent="center">
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: 400,
                    height: 225,
                    position: 'relative',
                  }}
                >
                  <iframe
                    src={embedUrl}
                    title={`video-${idx}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    frameBorder="0"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </Box>
              </Grid>
            ) : null;
          })
        ) : (
          <Typography>No videos uploaded</Typography>
        )}
      </Grid>
    </CardContent>
  </Card>
</Box>


        {/* Products */}
  <Box id="products" sx={{ mb: 5 }}>
  <Card
    sx={{
      p: 4,
      borderRadius: 3,
      textAlign: 'center',
      color: '#4a148c',
      backgroundImage: 'linear-gradient(135deg, #fce4ec 25%, #f8bbd0 100%)',
      backgroundSize: 'cover',
      boxShadow: 3,
    }}
  >
    <CardContent>
      <Typography variant="h5" gutterBottom fontWeight={700}>
        Products
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {card?.products?.length ? (
          card.products.slice(0, 10).map((product, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx} display="flex" justifyContent="center">
              <Box
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: 2,
                  p: 2,
                  bgcolor: '#fff',
                  width: '100%',
                  maxWidth: 300, // Limits the card width for better centering
                }}
              >
                {product?.image && (
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                      src={`http://localhost:5000${product.image}`}
                      alt={product?.name}
                      style={{
                        width: '100%',
                        height: 150,
                        objectFit: 'cover',
                        borderRadius: 8,
                        marginBottom: 10,
                      }}
                    />
                  </Box>
                )}
                <Typography variant="subtitle1" gutterBottom>
                  <strong>{product?.name}</strong>
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  href={`https://wa.me/${card?.alternate_phone_number}?text=I'm%20interested%20in%20your%20product:%20${product?.name}`}
                  target="_blank"
                  fullWidth
                >
                  Enquire on WhatsApp
                </Button>
              </Box>
            </Grid>
          ))
        ) : (
          <Typography>No products available</Typography>
        )}
      </Grid>
    </CardContent>
  </Card>
</Box>


        {/* Payment */}
        <Box id="payment" sx={{ mb: 5 }}>
  <Card
    sx={{
      p: 4,
      borderRadius: 3,
      textAlign: 'center',
      color: '#4a148c',
      backgroundImage: 'linear-gradient(135deg, #fce4ec 25%, #f8bbd0 100%)',
      backgroundSize: 'cover',
      boxShadow: 3,
    }}
  >
            <CardContent>
              <Typography variant="h5" gutterBottom fontWeight={700}>Payment Details</Typography>
              <Typography><strong>Bank Name:</strong> {card?.bank_name}</Typography>
              <Typography><strong>Account Holder:</strong> {card?.account_holder_name}</Typography>
              <Typography><strong>Account Number:</strong> {card?.account_number}</Typography>
              <Typography><strong>IFSC:</strong> {card?.ifsc}</Typography>
              <Typography><strong>GPay:</strong> {card?.gpay}</Typography>
            </CardContent>
          </Card>
        </Box>

          <Box id="contact" sx={{ mb: 5 }}>
          <Card
            sx={{
              p: 4,
              borderRadius: 3,
              textAlign: 'center',
              color: '#4a148c',
              backgroundImage: 'linear-gradient(135deg, #fce4ec 25%, #f8bbd0 100%)',
              backgroundSize: 'cover',
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom fontWeight={700}>Contact Us</Typography>
              <Typography>If you have any queries, feel free to <Link href={`mailto:${card?.email}`}>email us</Link>.</Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, maxWidth: 500, mx: 'auto' }}>
                <TextField fullWidth label="Your Name" name="name" value={form.name} onChange={handleChange} sx={{ mb: 2 }} required />
                <TextField fullWidth label="Phone Number" name="phone" value={form.phone} onChange={handleChange} sx={{ mb: 2 }} required />
                <TextField fullWidth label="Email Address" name="email" value={form.email} onChange={handleChange} sx={{ mb: 2 }} required />
                <TextField fullWidth label="Message" name="message" value={form.message} onChange={handleChange} multiline rows={4} sx={{ mb: 2 }} required />
                <Button type="submit" variant="contained" color="secondary">Submit</Button>
              </Box>
              <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
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

export default Template1;
