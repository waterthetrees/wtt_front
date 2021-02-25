import React, { lazy } from 'react';
import { Link } from 'react-router-dom';
import AuthenticationButton from '../Auth/auth-button';
import './Header.scss';
import { AboutUs } from '../../pages/about/About';

const WATER_THE_TREES = 'assets/images/logos/waterthetrees-fatgraff.svg';
// const AboutUs = lazy(() => import('../../pages/about/About'));

const Header = () => (
  <div id="header" className="header">
    <div className="header__content">

      <Link to="/">
        <img
          alt="water the trees"
          key="water the trees map"
          className="header__icon"
          src={WATER_THE_TREES}
        />
      </Link>

      <AuthenticationButton />
    </div>
  </div>
);

export default Header;
