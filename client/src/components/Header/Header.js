import React from 'react';
import AuthenticationButton from '../Auth/auth-button';
import { AboutUs } from '../../pages/about/About';
import './Header.scss';

const Header = () => (
  <div className="header">
    <div className="header__content">
      <AboutUs />
      <AuthenticationButton />
    </div>
  </div>
);

export default Header;
