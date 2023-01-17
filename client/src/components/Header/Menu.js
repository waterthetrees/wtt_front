import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { AuthButton, ProfileAuthButton } from '@/components/Auth';
import {
  TreeIcon,
  BellIcon,
  PlantIcon,
  GlobeIcon,
  InfoIcon,
  HelpIcon,
  ContactIcon,
  FolderIcon,
  AccountIcon,
} from '@/components/Icons';

import './Header.scss';

const NavMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { isAuthenticated, user = {} } = useAuth0();
  const { picture } = user;

  return (
    <>
      {isAuthenticated ? (
        <img
          className="header__navigation__authcontainer__picture"
          onClick={handleClick}
          src={picture}
          alt="profile"
        />
      ) : (
        <button
          type="button"
          className="header-btn-menu header__navigation__authcontainer__burger"
          aria-controls="wtt-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          &#9776;
        </button>
      )}
      <Menu
        id="wtt-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        MenuListProps={{
          style: {
            fontFamily: '"Montserrat", sans-serif',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            padding: '8px',
            border: 'none',
            width: '200px',
          },
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
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
          <div className="header__navigation__authcontainer__menu">
            <div className="header__navigation__authcontainer__menu__profile">
              <Link
                className="header__navigation__authcontainer__menu__menuitem__links"
                to="/userprofile"
              >
                <MenuItem
                  onClick={handleClose}
                  sx={{
                    padding: '8px',
                    width: '180px',
                    borderBottom: '#00000040 1px solid',
                  }}
                >
                  <AccountIcon />
                  <span className="header__navigation__authcontainer__menu__menuitem__links__span">
                    Profile
                  </span>
                </MenuItem>
              </Link>
            </div>
          </div>
        )}

        <div className="header__navigation__authcontainer__menu__menuitem">
          <Link
            className="header__navigation__authcontainer__menu__menuitem__links"
            to="/"
          >
            <MenuItem
              sx={{
                padding: '8px',
                width: '180px',
              }}
              onClick={handleClose}
            >
              <GlobeIcon />
              <span className="header__navigation__authcontainer__menu__menuitem__links__span">
                Map
              </span>
            </MenuItem>
          </Link>

          <Link
            className="header__navigation__authcontainer__menu__menuitem__links"
            to="/about"
          >
            <MenuItem
              sx={{
                padding: '8px',
                width: '180px',
              }}
              onClick={handleClose}
            >
              <InfoIcon />
              <span className="header__navigation__authcontainer__menu__menuitem__links__span">
                About
              </span>
            </MenuItem>
          </Link>

          <Link
            to="/contact"
            className="header__navigation__authcontainer__menu__menuitem__links"
          >
            <MenuItem
              sx={{
                padding: '8px',
                width: '180px',
              }}
              onClick={handleClose}
            >
              <ContactIcon />
              <span className="header__navigation__authcontainer__menu__menuitem__links__span">
                Contact
              </span>
            </MenuItem>
          </Link>
          <Link
            to="/data"
            className="header__navigation__authcontainer__menu__menuitem__links"
          >
            <MenuItem
              sx={{
                padding: '8px',
                width: '180px',
              }}
              onClick={handleClose}
            >
              <FolderIcon />
              <span className="header__navigation__authcontainer__menu__menuitem__links__span">
                Data
              </span>
            </MenuItem>
          </Link>
        </div>
        <Link className="header__navigation__authcontainer__menu__menuitem__disabled">
          <MenuItem
            sx={{
              padding: '8px',
              width: '180px',
              cursor: 'default',
            }}
          >
            <HelpIcon />
            <span className="header__navigation__authcontainer__menu__menuitem__links__span">
              Help
            </span>
          </MenuItem>
        </Link>
        <ProfileAuthButton>
          {isAuthenticated ? (
            <span className="header__navigation__authcontainer__menu__menuitem__links__span">
              Log Out
            </span>
          ) : (
            <span className="header__navigation__authcontainer__menu__menuitem__links__span">
              Sign In
            </span>
          )}
        </ProfileAuthButton>
      </Menu>
    </>
  );
};

export default NavMenu;
