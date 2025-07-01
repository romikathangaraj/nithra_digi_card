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
  Box,
  IconButton,
  Paper,
  TableContainer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = "http://localhost:5000/api/auth";

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const handleDelete = async (url_slug) => {
    const confirmed = window.confirm("Are you sure you want to delete this card?");
    if (!confirmed) return;

    try {
      await axios.delete(`${API_BASE_URL}/delete-card/${url_slug}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setCards(cards.filter(card => card.url_slug !== url_slug));
      setDialogOpen(false);
    } catch (err) {
      console.error("Failed to delete card", err);
    }
  };

  useEffect(() => {
    fetchUserCards();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Box
        sx={{
          backgroundColor: '#fcefef',
          borderRadius: 2,
          padding: 3,
          mb: 4,
          textAlign: 'center'
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to Your Dashboard
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/card")}
          sx={{ mt: 1 }}
        >
          Create New Card
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom>
        Your Cards
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : cards.length === 0 ? (
        <Typography>No cards found. Create your first card!</Typography>
      ) : (
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell><strong>Company</strong></TableCell>
                <TableCell><strong>URL</strong></TableCell>
                <TableCell align="center"><strong>View Details</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cards.map((card, index) => (
                <TableRow
                  key={card.card_id}
                  hover
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff"
                  }}
                >
                  <TableCell>{card.company_name}</TableCell>
                  <TableCell>
                    <a
                      href={`/card/${card.url_slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#3b82f6", textDecoration: "underline" }}
                    >
                      View
                    </a>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setSelectedCard(card);
                        setDialogOpen(true);
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Modal for viewing card details */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Card Details</DialogTitle>
        <DialogContent dividers>
          {selectedCard && (
            <>
              <Typography><strong>Company:</strong> {selectedCard.company_name}</Typography>
              <Typography><strong>First Name:</strong> {selectedCard.first_name}</Typography>
              <Typography><strong>Last Name:</strong> {selectedCard.last_name}</Typography>
              <Typography><strong>Position:</strong> {selectedCard.position}</Typography>
              <Typography><strong>Email:</strong> {selectedCard.email}</Typography>
              <Typography><strong>Phone:</strong> {selectedCard.phone}</Typography>
              <Typography><strong>Website:</strong> {selectedCard.website}</Typography>
              <Typography><strong>About:</strong> {selectedCard.about}</Typography>
              {/* Add more fields as required */}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate(`/card/edit/${selectedCard?.url_slug}`)} color="primary">
            Edit
          </Button>
          <Button onClick={() => handleDelete(selectedCard?.url_slug)} color="error">
            Delete
          </Button>
          <Button onClick={() => setDialogOpen(false)} color="inherit">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
