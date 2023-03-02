import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authorization from './pages/Authorization';
import NotFound from './pages/NotFound';
import Main from './pages/Main';

const App = () => (
  <Router>
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<Authorization />} />
      <Route path="/" element={<Main />} />
    </Routes>
  </Router>
);

export default App;
