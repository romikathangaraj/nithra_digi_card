// src/pages/CardView.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Box } from '@mui/material';

// ⬇️ Import your templates
import Template1 from './components/Template1';
import Template2 from './components/Template2';

const CardView = () => {
  const { slug } = useParams();
  const [card, setCard] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/auth/card/${slug}`)
      .then((res) => setCard(res.data.card))
      .catch((err) => console.error("Error fetching card:", err));
  }, [slug]);

  if (!card) return <Typography>Loading...</Typography>;

  // ⬇️ Choose the template based on theme_id
  const renderTemplate = () => {
    switch (card.theme_id) {
      case 1:
        return <Template1 card={card} />;
      case 2:
        return <Template2 card={card} />;
      default:
        return <Typography>Invalid Theme</Typography>;
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 5 }}>
      {renderTemplate()}
    </Box>
  );
};

export default CardView;
