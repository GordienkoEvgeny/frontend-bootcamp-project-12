import '../App.css';
// eslint-disable-next-line import/no-duplicates
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Navigate } from 'react-router';
import AuthorizationPage from '../pages/Authorization';
import NotFoundPage from '../pages/NotFound';
import MainPage from '../pages/Main';
import Navbar from './Navbar';
import useAuthorization from '../hooks';
import LoginContext from '../contexts';

const AuthProv = ({ children }) => {
  const [authorizationStatus, setAuthorizationStatus] = useState(() => (
    Boolean(localStorage.getItem('user'))));
  const logIn = () => setAuthorizationStatus(true);
  const logOut = () => {
    localStorage.removeItem('user');
    setAuthorizationStatus(false);
  };
  return (
  // eslint-disable-next-line react/jsx-no-constructed-context-values
    <LoginContext.Provider value={{ authorizationStatus, logIn, logOut }}>
      {children}
    </LoginContext.Provider>
  );
};

const ChatRoute = ({ children }) => {
  const auth = useAuthorization();
  console.log(auth.authorizationStatus);
  return (
    auth.authorizationStatus ? children : <Navigate to="/login" />
  );
};

const App = () => (
  <AuthProv>
    <Router>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<AuthorizationPage />} />
        <Route
          path="/"
          element={(
            <ChatRoute>
              <MainPage />
            </ChatRoute>
        )}
        />
      </Routes>
    </Router>
  </AuthProv>
);

export default App;
