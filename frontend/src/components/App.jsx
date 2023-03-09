import '../App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthorizationPage from '../pages/Authorization';
import NotFoundPage from '../pages/NotFound';
import MainPage from '../pages/Main';
import Navbar from './Navbar';
// import LoginContext from './contexts';

const App = () => (
  // <LoginContext.Provider value={}>
  <Router>
    <Navbar />
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/login" element={<AuthorizationPage />} />
      <Route path="/" element={<MainPage />} />
    </Routes>
  </Router>
  // </LoginContext.Provider>
);

export default App;
