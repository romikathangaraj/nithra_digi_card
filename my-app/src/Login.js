import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Typography,
  Paper,
  TextField,
  Box,
  Avatar,
  Snackbar,
  Alert,
} from "@mui/material";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const API_BASE_URL = "http://localhost:5000/api/auth";

const SignInPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
  });
  const [user, setUser] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success" | "error"
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isSignUp
        ? `${API_BASE_URL}/register`
        : `${API_BASE_URL}/login`;

      const payload = isSignUp
        ? {
            name: formData.name,
            email: formData.email,
            phone_number: formData.phone_number,
            password: formData.password,
          }
        : {
            email: formData.email,
            password: formData.password,
          };

      const { data } = await axios.post(endpoint, payload);

      const { id, first_name, image,email } = data.user;

      localStorage.setItem("token", data.token);
      localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem(
  "user",
  JSON.stringify({
    id,
    firstName: first_name,
    email: email,        // ✅ Add this line
    image: image || "",
  })
);

      window.dispatchEvent(new Event("storage"));

     showSnackbar(data.message, "success");
setTimeout(() => {
  navigate("/dashboard");
}, 1500); // 1.5 seconds delay

    } catch (error) {
      showSnackbar(error.response?.data?.error || "Authentication failed!", "error");
    }
  };

 const handleGoogleSignIn = async (credentialResponse) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/google-signin`, {
      token: credentialResponse.credential,
    });

    // Save token and full user object as-is
    localStorage.setItem("token", data.token);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(data.user));

    window.dispatchEvent(new Event("storage"));

    showSnackbar("Google Sign-In Successful!", "success");

    setTimeout(() => {
      navigate(data.user.role === "admin" ? "/admin-dashboard" : "/dashboard");
    }, 1500);
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    showSnackbar("Google Sign-In failed!", "error");
  }
};

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          {isSignUp ? "Sign Up" : "Sign In"} to DigiCard
        </Typography>

        <Box component="form" onSubmit={handleAuth} sx={{ mt: 2 }}>
          {isSignUp && (
            <>
              <TextField
                fullWidth
                margin="normal"
                label="Name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Phone Number"
                name="phone_number"
                type="tel"
                required
                value={formData.phone_number}
                onChange={handleChange}
              />
            </>
          )}

          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            {isSignUp ? "Register" : "Login"}
          </Button>
        </Box>

        <Typography
          variant="body2"
          sx={{ mt: 2, cursor: "pointer", color: "blue" }}
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Typography>

        <Typography variant="body1" sx={{ mt: 2 }}>
          OR
        </Typography>

        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <GoogleLogin
            onSuccess={handleGoogleSignIn}
            onError={() => showSnackbar("Google Sign-In Error", "error")}
          />
        </GoogleOAuthProvider>

        {user?.picture && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">Welcome, {user.name}</Typography>
            <Avatar
              src={user.picture}
              alt="Profile"
              sx={{ width: 60, height: 60, margin: "auto" }}
            />
          </Box>
        )}
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignInPage;
