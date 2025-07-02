import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
  Snackbar,
  Alert,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Phone,
  WhatsApp,
  Login as LoginIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loginStatus);
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    checkLogin();
    window.addEventListener('storage', checkLogin);

    return () => {
      window.removeEventListener('storage', checkLogin);
    };
  }, [location]);

  const handleCall = () => {
    window.open('tel:+919080809998', '_self');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919080809998', '_blank');
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setAnchorEl(null);
    setSnackbarOpen(true);
    navigate('/');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Products', path: '/products' },
    { label: 'Contact', path: '/contact' },
  ];

  const openMenu = (e) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  return (
    <>
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box component={Link} to="/" sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                background: 'linear-gradient(to right, #7c3aed, #3b82f6)',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1,
              }}
            >
              <Typography color="white" fontWeight="bold">N</Typography>
            </Box>
            <Box>
              <Typography variant="h6" color="text.primary">Nithra</Typography>
              <Typography variant="caption" color="text.secondary">Consulting Services</Typography>
            </Box>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                color={isActive(item.path) ? 'secondary' : 'inherit'}
              >
                {item.label}
              </Button>
            ))}
            {isLoggedIn && (
              <Button component={Link} to="/dashboard" color={isActive('/dashboard') ? 'secondary' : 'inherit'}>
                Dashboard
              </Button>
            )}
          </Box>

          {/* Desktop Actions */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Button variant="outlined" startIcon={<Phone />} onClick={handleCall}>
              Call
            </Button>
            <Button
              variant="outlined"
              startIcon={<WhatsApp />}
              sx={{ color: 'green', borderColor: 'green' }}
              onClick={handleWhatsApp}
            >
              WhatsApp
            </Button>
            {isLoggedIn && user ? (
              <>
                <IconButton onClick={openMenu}>
                  <Avatar src={user.image || ''}>
                    {user.firstName?.[0] || 'U'}
                  </Avatar>
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
  <MenuItem disabled>
    {user.email || 'No Email'}
  </MenuItem>
  <MenuItem onClick={handleLogout}>Logout</MenuItem>
</Menu>

                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button variant="outlined" component={Link} to="/login" startIcon={<LoginIcon />}>
                Login
              </Button>
            )}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton edge="end" sx={{ display: { md: 'none' } }} onClick={() => setIsDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>

        {/* Mobile Drawer */}
        <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
          <Box width={250} role="presentation" onClick={() => setIsDrawerOpen(false)}>
            <List>
              {navItems.map((item) => (
                <ListItem button component={Link} to={item.path} key={item.path}>
                  <ListItemText primary={item.label} />
                </ListItem>
              ))}
              {isLoggedIn && (
                <ListItem button component={Link} to="/dashboard">
                  <ListItemText primary="Dashboard" />
                </ListItem>
              )}
            </List>
            <Divider />
            <Box p={2} display="flex" flexDirection="column" gap={1}>
              <Button variant="outlined" startIcon={<Phone />} onClick={handleCall}>
                Call
              </Button>
              <Button
                variant="outlined"
                startIcon={<WhatsApp />}
                sx={{ color: 'green', borderColor: 'green' }}
                onClick={handleWhatsApp}
              >
                WhatsApp
              </Button>
              {isLoggedIn ? (
                <Button variant="outlined" color="error" startIcon={<LogoutIcon />} onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Button variant="outlined" component={Link} to="/login" startIcon={<LoginIcon />}>
                  Login
                </Button>
              )}
            </Box>
          </Box>
        </Drawer>
      </AppBar>

      {/* Snackbar for Logout */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={handleSnackbarClose}>
          Logged out successfully
        </Alert>
      </Snackbar>
    </>
  );
};

export default Header;
