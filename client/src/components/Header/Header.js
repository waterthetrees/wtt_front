import React from 'react';
import AuthenticationButton from '../Auth/auth-button';
import { AboutUs } from '../../pages/about/About';
import { Profile } from '../../pages/userprofile/Profile';
import './Header.scss';

const Header = () => (
  <div className="header">
    <div className="header__content">
      <AboutUs />
      <AuthenticationButton />
      <Profile />
    </div>
  </div>
);      

export default Header;
