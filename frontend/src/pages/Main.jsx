import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import NavBar from '../components/Navbar';
import paths from '../paths';

// eslint-disable-next-line consistent-return
const BuildMainPage = () => {
  const [isToken, setToken] = useState(false);
  const redirect = useNavigate();
  const token = localStorage.getItem('admin');
  useEffect(() => {
    console.log('useEffect');
    if (!token) {
      setToken(false);
      redirect(paths.loginPagePath());
    } else {
      setToken(true);
    }
  });
  if (isToken) {
    return (
      <div>
        <NavBar />
      </div>
    );
  }
};
export default BuildMainPage;
