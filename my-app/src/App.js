// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // adjust the path as needed
import About from './About';
import Contact from './Contact';
import Products from './Product';
import Index from './Dashboard';
import AuthCard from './Login';
import Dashboard from './UserDashboard';
import CardCreationWizard from './card'
import { Card } from '@mui/material';
import CardView from './cardView';




function App() {
  return (
    <Router>
      <Header />
      <div style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Index/>} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<AuthCard />} />
           <Route path="/dashboard" element={< Dashboard/>} />
          <Route path="/card" element={<CardCreationWizard/>} />
          <Route path="/card/:slug" element={<CardView />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
