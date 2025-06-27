// src/pages/CardView.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Card, CardContent } from '@mui/material';

const CardView = () => {
  const { slug } = useParams();
  const [card, setCard] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/auth/card/${slug}`)
      .then((res) => setCard(res.data.card))
      .catch((err) => console.error("Error fetching card:", err));
  }, [slug]);

  if (!card) return <Typography>Loading...</Typography>;

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 5, p: 2 }}>
      <CardContent>
        <Typography variant="h5">{card.first_name} {card.last_name}</Typography>
        <Typography variant="subtitle1">{card.position}</Typography>
        <Typography variant="body2">Company: {card.company_name}</Typography>
        <Typography variant="body2">Phone: {card.phone}</Typography>
        <Typography variant="body2">Email: {card.email}</Typography>
        {/* Add socials, logo, about etc. */}
      </CardContent>
    </Card>
  );
};

export default CardView;
