import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, Box } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { AuthButton } from '@/components/Auth';
import HeaderLogo from '@/assets/images/logos/header-logo.svg';
import './Header.scss';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { isAuthenticated } = useAuth0();

  return (
    <Box
      id="header"
      className="header"
      sx={{ display: { xs: 'block', sm: 'none' } }}
    >
      <div className="header-content">
        <Link to="/">
          <img className="header--logo" src={HeaderLogo} alt="header logo" />
        </Link>

        <button
          type="button"
          className="header-btn-menu"
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
          {isAuthenticated && (
            <MenuItem onClick={handleClose}>
              <Link to="/userprofile" className="header-link">
                <HeaderButton menuItem="User Profile" />
              </Link>
            </MenuItem>
          )}

          <MenuItem onClick={handleClose}>
            <Link to="/" className="header-link">
              <HeaderButton menuItem="Map" />
            </Link>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <Link to="/about" className="header-link">
              <HeaderButton menuItem="About" />
            </Link>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <Link to="/contact" className="header-link">
              <HeaderButton menuItem="Contact" />
            </Link>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <Link to="/data" className="header-link">
              <HeaderButton menuItem="Data" />
            </Link>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <AuthButton />
          </MenuItem>
        </Menu>
      </div>
    </Box>
  );
};

const HeaderButton = ({ menuItem }) => (
  <button type="button" className="btn btn-success btn-block">
    {menuItem}
  </button>
);

export default Header;
