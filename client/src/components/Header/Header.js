import React, { lazy } from 'react';
import AuthenticationButton from '../Auth/auth-button';
import './Header.scss';
import { AboutUs } from '../../pages/about/About';
// const AboutUs = lazy(() => import('../../pages/about/About'));

const Header = () => (
  <div id="header" className="header">
    <div className="header__content">
      <AboutUs />
      <AuthenticationButton />
    </div>
  </div>
);

export default Header;
