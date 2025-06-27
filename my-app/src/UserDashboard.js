import React, { useEffect, useState } from 'react';
import {
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = "http://localhost:5000/api/auth";

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserCards = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`${API_BASE_URL}/user-cards`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCards(res.data.cards || []);
    } catch (err) {
      console.error("Failed to fetch cards", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCards();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Your Dashboard
      </Typography>

      <Button
        variant="contained"
        sx={{ my: 2 }}
        onClick={() => navigate("/card")}
      >
        Create New Card
      </Button>

      <Typography variant="h6" gutterBottom>
        Your Cards
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : cards.length === 0 ? (
        <Typography>No cards found. Create your first card!</Typography>
      ) : (
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
              <TableRow
                key={card.card_id}
                onClick={() => navigate(`/card/${card.url_slug}`)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{card.company_name}</TableCell>
                <TableCell>
                  {card.created_at
                    ? new Date(card.created_at).toLocaleDateString()
                    : "-"}
                </TableCell>
                <TableCell>
                  <a
                    href={`/card/${card.url_slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#3b82f6", textDecoration: "underline" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    View
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default Dashboard;
