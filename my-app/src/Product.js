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
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Products;
