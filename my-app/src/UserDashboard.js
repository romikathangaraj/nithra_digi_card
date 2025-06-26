// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Button, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = "http://localhost:5000/api/auth";

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  const fetchUserCards = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await axios.get(`${API_BASE_URL}/user-cards/${user.id}`);
      setCards(res.data.cards);
    } catch (err) {
      console.error("Failed to fetch cards", err);
    }
  };

  useEffect(() => {
    fetchUserCards();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4">Welcome to Your Dashboard</Typography>
      <Button variant="contained" sx={{ my: 2 }} onClick={() => navigate("/card")}>
        Create New Card
      </Button>

      <Typography variant="h6">Your Cards</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Company</TableCell>
            <TableCell>Created On</TableCell>
            <TableCell>URL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cards.map((card) => (
            <TableRow key={card.card_id} onClick={() => navigate(`/card/${card.url_slug}`)} style={{ cursor: "pointer" }}>
              <TableCell>{card.company_name}</TableCell>
              <TableCell>{new Date(card.created_at).toLocaleDateString()}</TableCell>
              <TableCell>{card.url_slug}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Dashboard;
