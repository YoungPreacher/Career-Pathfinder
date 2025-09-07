import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Assessment from './pages/Assessment';
import Results from './pages/Results';
import './App.css';

function App() {
  const [results, setResults] = useState([]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assessment" element={<Assessment setRecommendations={setResults} />} />
          <Route path="/results" element={<Results results={results} />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;