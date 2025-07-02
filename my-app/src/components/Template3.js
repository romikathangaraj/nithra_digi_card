import React, { useState } from 'react';
import {
  Box, Typography, Avatar, Grid, Card, CardContent, TextField, Button,
  Snackbar, Alert, CssBaseline, Container, IconButton, Link
} from '@mui/material';
import {
  Phone, Email, WhatsApp, Instagram, YouTube, Facebook, LinkedIn, Sms as SmsIcon, Share as ShareIcon
} from '@mui/icons-material';

const Section = ({ title, children }) => (
  <Card
    sx={{
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: 4,
      p: 4,
      mb: 4,
      boxShadow: 6,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 10
      }
    }}
  >
    <Typography variant="h5" fontWeight={600} color="#fff" mb={2} textAlign="center">
      {title}
    </Typography>
    {children}
  </Card>
);

const Template3 = ({ card }) => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [snackbar, setSnackbar] = useState(false);
  const cardUrl = `http://localhost:3000/card/${card?.url_slug}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `mailto:${card?.email}?subject=Message from ${form.name}&body=Phone: ${form.phone}%0AEmail: ${form.email}%0A${form.message}`;
    setSnackbar(true);
    setForm({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #1e3c72, #2a5298)',
        py: 8
      }}
    >
      <CssBaseline />
      <Container maxWidth="md">

        {/* Profile */}
        <Box textAlign="center" mb={6}>
          <Avatar
            src={`http://localhost:5000${card?.logo}`}
            sx={{
              width: 120,
              height: 120,
              mx: 'auto',
              boxShadow: 4,
              border: '4px solid white'
            }}
          />
          <Typography variant="h4" fontWeight={700} color="#fff" mt={2}>
            {card?.name}
          </Typography>
          <Typography variant="subtitle1" color="#eee">
            {card?.position} — {card?.company_name}
          </Typography>
          <Box mt={2}>
            {card?.phone_number && (
              <Typography color="#fff">📞 <Link href={`tel:${card.phone_number}`} color="inherit" underline="hover">{card.phone_number}</Link></Typography>
            )}
            {card?.email && (
              <Typography color="#fff">📧 <Link href={`mailto:${card.email}`} color="inherit" underline="hover">{card.email}</Link></Typography>
            )}
            {card?.address && (
              <Typography color="#fff">📍 <Link href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(card.address)}`} color="inherit" underline="hover" target="_blank">{card.address}</Link></Typography>
            )}
          </Box>
          <Box mt={2}>
            <Typography variant="h6" color="#fff" gutterBottom>🔗 Share</Typography>
            <Grid container spacing={1} justifyContent="center">
              <Grid item>
                <IconButton href={`https://wa.me/?text=Check this card: ${encodeURIComponent(cardUrl)}`} target="_blank"><WhatsApp sx={{ color: '#fff' }} /></IconButton>
              </Grid>
              <Grid item>
                <IconButton href={`sms:?body=Check this card: ${encodeURIComponent(cardUrl)}`}><SmsIcon sx={{ color: '#fff' }} /></IconButton>
              </Grid>
              <Grid item>
                <IconButton href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(cardUrl)}`} target="_blank"><Facebook sx={{ color: '#fff' }} /></IconButton>
              </Grid>
              <Grid item>
                <IconButton href={`https://twitter.com/intent/tweet?text=Check this card: ${encodeURIComponent(cardUrl)}`} target="_blank"><LinkedIn sx={{ color: '#fff' }} /></IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: card?.company_name,
                      text: 'Check out this digital business card',
                      url: cardUrl
                    });
                  } else {
                    navigator.clipboard.writeText(cardUrl);
                    alert('Card URL copied to clipboard');
                  }
                }}>
                  <ShareIcon sx={{ color: '#fff' }} />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* About */}
        <Section title="About Us">
          <Typography sx={{ whiteSpace: 'pre-line', color: '#e0e0e0' }}>{card?.about_us}</Typography>
        </Section>

        {/* Contact Info */}
        <Section title="Contact Info">
          <Grid container spacing={2} justifyContent="center">
            {card?.phone_number && (
              <Grid item>
                <IconButton href={`tel:${card.phone_number}`}><Phone sx={{ color: '#fff' }} /></IconButton>
              </Grid>
            )}
            {card?.alternate_phone_number && (
              <Grid item>
                <IconButton href={`https://wa.me/${card.alternate_phone_number}`} target="_blank"><WhatsApp sx={{ color: '#fff' }} /></IconButton>
              </Grid>
            )}
            {card?.email && (
              <Grid item>
                <IconButton href={`mailto:${card.email}`}><Email sx={{ color: '#fff' }} /></IconButton>
              </Grid>
            )}
            {card?.instagram && (
              <Grid item>
                <IconButton href={card.instagram} target="_blank"><Instagram sx={{ color: '#fff' }} /></IconButton>
              </Grid>
            )}
            {card?.facebook && (
              <Grid item>
                <IconButton href={card.facebook} target="_blank"><Facebook sx={{ color: '#fff' }} /></IconButton>
              </Grid>
            )}
            {card?.youtube && (
              <Grid item>
                <IconButton href={card.youtube} target="_blank"><YouTube sx={{ color: '#fff' }} /></IconButton>
              </Grid>
            )}
            {card?.linkedin && (
              <Grid item>
                <IconButton href={card.linkedin} target="_blank"><LinkedIn sx={{ color: '#fff' }} /></IconButton>
              </Grid>
            )}
          </Grid>
        </Section>
        {/* Videos */}
{card && (card.link1 || card.link2 || card.link3 || card.link4 || card.link5) && (
  <Section title="Videos">
    <Grid container spacing={3} justifyContent="center">
      {[card.link1, card.link2, card.link3, card.link4, card.link5]
        .filter(Boolean)
        .map((url, idx) => {
          let embedUrl = '';
          try {
            if (url.includes('youtu.be')) {
              const id = url.split('youtu.be/')[1].split('?')[0];
              embedUrl = `https://www.youtube.com/embed/${id}`;
            } else if (url.includes('youtube.com')) {
              const urlObj = new URL(url);
              const v = urlObj.searchParams.get('v');
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
                  maxWidth: 500,
                  height: 280,
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: 6,
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <iframe
                  src={embedUrl}
                  title={`video-${idx}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </Box>
            </Grid>
          ) : null;
        })}
    </Grid>
  </Section>
)}


        {/* Products */}
        {card?.products?.length > 0 && (
          <Section title="Our Products">
            <Grid container spacing={2}>
              {card.products.map((product, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <Box sx={{ textAlign: 'center', color: '#fff' }}>
                    <img
                      src={`http://localhost:5000${product.image}`}
                      alt={product.name}
                      style={{ width: '100%', borderRadius: 12, maxHeight: 180, objectFit: 'cover' }}
                    />
                    <Typography variant="subtitle1" mt={1}>{product.name}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Section>
        )}
{/* Payment Section */}
{(card?.bank_name || card?.account_holder_name || card?.account_number || card?.ifsc || card?.gpay) && (
  <Section title="Payment Details">
    <Grid container spacing={2} justifyContent="center">
      {card?.bank_name && (
        <Grid item xs={12} sm={6}>
          <Typography color="#e0e0e0"><strong>Bank Name:</strong> {card.bank_name}</Typography>
        </Grid>
      )}
      {card?.account_holder_name && (
        <Grid item xs={12} sm={6}>
          <Typography color="#e0e0e0"><strong>Account Holder:</strong> {card.account_holder_name}</Typography>
        </Grid>
      )}
      {card?.account_number && (
        <Grid item xs={12} sm={6}>
          <Typography color="#e0e0e0"><strong>Account Number:</strong> {card.account_number}</Typography>
        </Grid>
      )}
      {card?.ifsc && (
        <Grid item xs={12} sm={6}>
          <Typography color="#e0e0e0"><strong>IFSC Code:</strong> {card.ifsc}</Typography>
        </Grid>
      )}
      {card?.gpay && (
        <Grid item xs={12}>
          <Typography color="#e0e0e0"><strong>GPay Number:</strong> {card.gpay}</Typography>
        </Grid>
      )}
    </Grid>
  </Section>
)}

        {/* Contact Form */}
        <Section title="Get in Touch">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="name"
                  label="Your Name"
                  variant="filled"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  sx={{ input: { color: '#fff' }, label: { color: '#ccc' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="phone"
                  label="Phone Number"
                  variant="filled"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  sx={{ input: { color: '#fff' }, label: { color: '#ccc' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  variant="filled"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  sx={{ input: { color: '#fff' }, label: { color: '#ccc' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  name="message"
                  label="Your Message"
                  variant="filled"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  sx={{ textarea: { color: '#fff' }, label: { color: '#ccc' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth type="submit" variant="contained" color="primary">
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </form>
        </Section>

        {/* Snackbar */}
        <Snackbar open={snackbar} autoHideDuration={3000} onClose={() => setSnackbar(false)}>
          <Alert onClose={() => setSnackbar(false)} severity="success" sx={{ width: '100%' }}>
            Message sent successfully!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Template3;
