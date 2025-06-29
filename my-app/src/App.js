// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import About from './About';
import Contact from './Contact';
import Products from './Product';
import Index from './Dashboard';
import AuthCard from './Login';
import Dashboard from './UserDashboard';
import CardCreationWizard from './card';
import CardView from './cardView';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideHeaderOnRoutes = ['/card/']; // Hide header for /card/:slug

  const hideHeader = hideHeaderOnRoutes.some(path => location.pathname.startsWith(path));

  return (
    <>
      {!hideHeader && <Header />}
      <div style={{ padding: '1rem' }}>
        {children}
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<AuthCard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/card" element={<CardCreationWizard />} />
          <Route path="/card/:slug" element={<CardView />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
