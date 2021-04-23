import React, { lazy } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import DehazeIcon from '@material-ui/icons/Dehaze';
import AuthenticationButton from '../Auth/auth-button';
// import About from '../../pages/about/About';

const WATER_THE_TREES = 'assets/images/logos/waterthetrees-fatgraff.svg';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div id="header" className="header">
      <div className="header__content">

        <Link to="/">
          <div className="header__font">WATER THE TREES</div>
        </Link>

        <button
          type="button"
          className="header__btn-menu"
          aria-controls="wtt-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          &#9776;
        </button>
        <Menu
          id="wtt-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Link to="/" className="header__link">
              <HeaderButton menuItem="Map" />
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to="/about" className="header__link">
              <HeaderButton menuItem="About" />
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to="/contact" className="header__link">
              <HeaderButton menuItem="Contact" />
            </Link>
          </MenuItem>

          <MenuItem onClick={handleClose}><AuthenticationButton /></MenuItem>
        </Menu>

      </div>

    </div>
  );
};

const HeaderButton = ({ menuItem }) => (
  <button
    type="button"
    className="btn btn-success btn-block"
  >
    {menuItem}
  </button>
);

export default Header;
