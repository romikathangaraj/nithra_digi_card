// src/components/templates/Template2.jsx
import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Divider } from '@mui/material';

const Template2 = ({ card }) => (
  <Card sx={{ maxWidth: 600, mx: 'auto', mt: 5, textAlign: 'center', p: 3, borderRadius: 3, boxShadow: 4 }}>
    <CardContent>
      {/* Placeholder Avatar or Logo */}
      <Avatar sx={{ width: 80, height: 80, mx: 'auto', bgcolor: 'primary.main', fontSize: 32 }}>
        {card.first_name?.charAt(0)}
      </Avatar>

      <Typography variant="h5" mt={2} color="text.primary">
        {card.first_name} {card.last_name}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {card.position}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="body2"><strong>Company:</strong> {card.company_name}</Typography>
      <Typography variant="body2"><strong>Phone:</strong> {card.phone}</Typography>
      <Typography variant="body2"><strong>Email:</strong> {card.email}</Typography>
      <Typography variant="body2" sx={{ mt: 1 }}><strong>About:</strong> {card.about}</Typography>
    </CardContent>
  </Card>
);

export default Template2;
