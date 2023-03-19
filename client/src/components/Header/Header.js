import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAuth0 } from '@auth0/auth0-react';
import { AuthButton } from '@/components/Auth';
import './Header.scss';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMobile = useMediaQuery('(max-width:768px)');
  const location = useLocation();
  const isMapPage = location.pathname == '/' || location.pathname == '/map';
  // FIXME when search feature is enabled
  const showHeaderLink = true || !isMobile || !isMapPage;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { isAuthenticated } = useAuth0();

  return (
    <div id="header" className="header">
      {/* Header elements are shown in row-reverse order, right to left */}
      <div className="header-content">
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
            <Link to="/source" className="header-link">
              <HeaderButton menuItem="Source" />
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

        {showHeaderLink && (
          <Link to="/">
            <div className="header-font">WATER THE TREES</div>
          </Link>
        )}
      </div>
    </div>
  );
};

const HeaderButton = ({ menuItem }) => (
  <button type="button" className="btn btn-success btn-block">
    {menuItem}
  </button>
);

export default Header;
