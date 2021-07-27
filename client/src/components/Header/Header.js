import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AuthenticationButton from '../Auth/auth-button';

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
            <Link to="/userprofile" className="header__link">
              <HeaderButton menuItem="User Profile" />
            </Link>
          </MenuItem>
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
