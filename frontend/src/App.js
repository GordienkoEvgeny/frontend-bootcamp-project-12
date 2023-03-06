import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authorization from './pages/Authorization';
import NotFound from './pages/NotFound';
import Main from './pages/Main';
// import LoginContext from './contexts';

const App = () => (
  // <LoginContext.Provider value={}>
  <Router>
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<Authorization />} />
      <Route path="/" element={<Main />} />
    </Routes>
  </Router>
  // </LoginContext.Provider>
);

export default App;
