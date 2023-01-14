import React from 'react';
import { Link } from 'react-router-dom';
import { TreeLogo } from '@/components/Icons';
import HeaderLogo from '@/assets/images/logos/header-logo.svg';
import { useAuth0 } from '@auth0/auth0-react';
import { AuthButton } from '@/components/Auth';
import Menu from './Menu';

import './Header.scss';

const Header = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="header">
      <div className="header--navigation">
        <div className="header--navigation--logocontainer">
          <Link to="/">
            <TreeLogo />
          </Link>
          <Link to="/">
            <img
              className="header--navigation--logocontainer--logo"
              src={HeaderLogo}
              alt="Header Logo"
            ></img>
          </Link>
        </div>
        <div className="header--navigation--navcontainer">
          <button className="header--navigation--navcontainer--buttons">
            <Link to="/" title="Map">
              Map
            </Link>
          </button>
          <button className="header--navigation--navcontainer--buttons">
            <Link to="/about" title="About">
              About
            </Link>
          </button>
          <button className="header--navigation--navcontainer--buttons">
            <Link to="/contact" title="Contact">
              Contact
            </Link>
          </button>
          <button className="header--navigation--navcontainer--buttons">
            <Link to="/data" title="Data">
              Data
            </Link>
          </button>
        </div>
        <div className="header--navigation--authcontainer">
          {isAuthenticated ? null : (
            <div className="header--navigation--authcontainer--button">
              <AuthButton />
            </div>
          )}
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Header;
