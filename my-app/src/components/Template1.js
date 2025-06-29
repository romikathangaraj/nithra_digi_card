// src/components/templates/Template1.jsx
import React from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';

const Template1 = ({ card }) => (
  <Card sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 3, borderRadius: 3, boxShadow: 4 }}>
    <CardContent>
      <Typography variant="h4" color="primary" gutterBottom>
        {card.first_name} {card.last_name}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {card.position}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Box>
        <Typography variant="body1"><strong>Company:</strong> {card.company_name}</Typography>
        <Typography variant="body1"><strong>Phone:</strong> {card.phone}</Typography>
        <Typography variant="body1"><strong>Email:</strong> {card.email}</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}><strong>About:</strong> {card.about}</Typography>
      </Box>
    </CardContent>
  </Card>
);

export default Template1;
