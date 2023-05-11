import { useAuth0 } from '@auth0/auth0-react';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Divider, IconButton, Menu, MenuItem } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { AuthButton } from '@/components/Auth';

import './Header.scss';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMobile = useMediaQuery('(max-width:768px)');
  const location = useLocation();
  const isMapPage = location.pathname == '/' || location.pathname == '/map';
  const showHeaderLink = !isMobile || !isMapPage;

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
      <div className="header__content">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{
            backgroundColor: 'white',
            borderRadius: '50%',
            border: '1px solid #ddd',
            '&:hover': {
              backgroundColor: '#eee',
              cursor: 'pointer',
            },
          }}
          color="success"
          className="header__btn-menu"
          title="Menu"
        >
          <MenuRoundedIcon
            sx={{ fontSize: '2.5rem', color: 'black' }}
            color="success"
          />
        </IconButton>

        <Menu
          id="wtt-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          onClick={handleClose}
          disableScrollLock={true}
          sx={{ zIndex: 3002, cursor: 'pointer' }}
          PaperProps={{
            elevation: 0,
            sx: {
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              ml: -0.5,
              mr: 1,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 10,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
        >
          {isAuthenticated && (
            <MenuItem onClick={handleClose}>
              <Link to="/userprofile" className="header__link">
                User Profile
              </Link>
            </MenuItem>
          )}

          <MenuItem onClick={handleClose}>
            <Link to="/" className="header__link">
              Map
            </Link>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <Link to="/about" className="header__link">
              About
            </Link>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <Link to="/contact" className="header__link">
              Contact
            </Link>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <Link to="/treecare" className="header__link">
              TreeCare
            </Link>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <Link to="/source" className="header__link">
              Source
            </Link>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <Link to="/treelist" className="header__link">
              TreeLists
            </Link>
          </MenuItem>

          <Divider />

          <MenuItem onClick={handleClose}>
            <AuthButton />
          </MenuItem>
        </Menu>

        {showHeaderLink && (
          <Link to="/" className="header__font-link">
            <div className="header__font">WATER THE TREES</div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
