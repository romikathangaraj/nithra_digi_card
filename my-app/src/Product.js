import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardActions,
  CardMedia,
  Typography,
  Button,
  Grid,
  Avatar,
  Box,
  Container,
  Rating,
  Chip,
  Paper
} from '@mui/material';
import {
  ShoppingCart,
  Eye,
  Star
} from 'lucide-react';
import Header from './components/Header';

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Digital Business Card - Basic",
      price: "₹2,000",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop",
      rating: 4.8,
      description: "Professional digital business card with contact info, social links, and basic features.",
      features: ["Contact Information", "Social Media Links", "WhatsApp Integration", "Email Integration"]
    },
    {
      id: 2,
      name: "Digital Business Card - Premium",
      price: "₹5,000",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&h=200&fit=crop",
      rating: 4.9,
      description: "Advanced digital card with gallery, videos, products showcase, and lead forms.",
      features: ["All Basic Features", "Photo Gallery", "Video Integration", "Product Showcase", "Lead Forms"]
    },
    {
      id: 3,
      name: "Mini E-commerce Website",
      price: "₹10,000",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop",
      rating: 5.0,
      description: "Complete mini website with online store, payment integration, and inventory management.",
      features: ["Online Store", "Payment Gateway", "Inventory Management", "Order Tracking", "Customer Support"]
    },
    {
      id: 4,
      name: "Corporate Digital Identity",
      price: "₹15,000",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
      rating: 4.7,
      description: "Complete corporate solution with multiple team cards, analytics, and brand management.",
      features: ["Team Cards", "Analytics Dashboard", "Brand Management", "Custom Domain", "Priority Support"]
    },
    {
      id: 5,
      name: "Restaurant Digital Menu",
      price: "₹8,000",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=200&fit=crop",
      rating: 4.6,
      description: "Interactive digital menu with online ordering, table booking, and customer reviews.",
      features: ["Digital Menu", "Online Ordering", "Table Booking", "Customer Reviews", "QR Code Integration"]
    },
    {
      id: 6,
      name: "Healthcare Professional Card",
      price: "₹7,000",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
      rating: 4.8,
      description: "Specialized card for healthcare professionals with appointment booking and service details.",
      features: ["Appointment Booking", "Service Details", "Patient Reviews", "Location Integration", "Emergency Contact"]
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Box sx={{ bgcolor: 'primary.main', py: 8, color: 'white', textAlign: 'center' }}>
        <Container>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Our Products & Services
          </Typography>
          <Typography variant="subtitle1">
            Discover our range of digital solutions designed to transform your business presence
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardHeader
                  title={<Typography variant="h6">{product.name}</Typography>}
                  subheader={<Typography variant="body2">{product.description}</Typography>}
                />
                <CardContent>
                  <Typography variant="h5" color="primary" gutterBottom>{product.price}</Typography>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Star size={16} color="#fbbf24" />
                    <Typography variant="body2" ml={1}>{product.rating}</Typography>
                  </Box>
                  <Box display="flex" flexDirection="column" gap={1}>
                    {product.features.map((feature, index) => (
                      <Typography variant="body2" key={index}>• {feature}</Typography>
                    ))}
                  </Box>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button fullWidth variant="contained" startIcon={<ShoppingCart />}>Order Now</Button>
                  <Button variant="outlined" startIcon={<Eye />} />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box textAlign="center" mt={8}>
          <Paper elevation={2} sx={{ p: 5, maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Need Something Custom?
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              We offer custom solutions tailored to your specific business needs. Contact us to discuss your requirements and get a personalized quote.
            </Typography>
            <Button variant="contained" color="primary">
              Request Custom Solution
            </Button>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Products;
