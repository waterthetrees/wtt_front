import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { AuthButton, ProfileAuthButton } from '@/components/Auth';
import {
  TreeLogo,
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

  const { isAuthenticated, user = {} } = useAuth0();
  const { picture } = user;

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
          {isAuthenticated ? (
            <img
              className="header--navigation--authcontainer--menu--profile--picture"
              onClick={handleClick}
              src={picture}
              alt="profile"
            />
          ) : (
            <button
              type="button"
              className="header-btn-menu header--navigation--authcontainer--burger"
              aria-controls="wtt-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              &#9776;
            </button>
          )}
          {isAuthenticated ? null : (
            <div className="header--navigation--authcontainer--button">
              <AuthButton />
            </div>
          )}
        </div>
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
            <div className="header--navigation--authcontainer--menu">
              <div className="header--navigation--authcontainer--menu--profile">
                <Link
                  className="header--navigation--authcontainer--menu--menuitem--links"
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
                    <span className="header--navigation--authcontainer--menu--menuitem--links--span">
                      Profile
                    </span>
                  </MenuItem>
                </Link>
              </div>
              {/* <Link className="header--navigation--authcontainer--menu--menuitem--links">
                <MenuItem
                  onClick={handleClose}
                  sx={{
                    padding: '8px',
                    width: '180px',
                    borderBottom: '#00000040 1px solid',
                  }}
                >
                  <BellIcon />
                  <span className="header--navigation--authcontainer--menu--menuitem--links--span">
                    Activity
                  </span>
                </MenuItem>
              </Link>
              <Link
                className="header--navigation--authcontainer--menu--menuitem--links"
                to="/"
              >
                <MenuItem
                  onClick={handleClose}
                  sx={{
                    padding: '8px',
                    width: '180px',
                    borderBottom: '#00000040 1px solid',
                  }}
                >
                  <PlantIcon />
                  <span className="header--navigation--authcontainer--menu--menuitem--links--span">
                    Plant
                  </span>
                </MenuItem>
              </Link> */}
            </div>
          )}

          <div className="header--navigation--authcontainer--menu--menuitem">
            <Link
              className="header--navigation--authcontainer--menu--menuitem--links"
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
                <span className="header--navigation--authcontainer--menu--menuitem--links--span">
                  Map
                </span>
              </MenuItem>
            </Link>

            <Link
              className="header--navigation--authcontainer--menu--menuitem--links"
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
                <span className="header--navigation--authcontainer--menu--menuitem--links--span">
                  About
                </span>
              </MenuItem>
            </Link>

            <Link
              to="/contact"
              className="header--navigation--authcontainer--menu--menuitem--links"
            >
              <MenuItem
                sx={{
                  padding: '8px',
                  width: '180px',
                }}
                onClick={handleClose}
              >
                <ContactIcon />
                <span className="header--navigation--authcontainer--menu--menuitem--links--span">
                  Contact
                </span>
              </MenuItem>
            </Link>
            <Link
              to="/data"
              className="header--navigation--authcontainer--menu--menuitem--links"
            >
              <MenuItem
                sx={{
                  padding: '8px',
                  width: '180px',
                }}
                onClick={handleClose}
              >
                <FolderIcon />
                <span className="header--navigation--authcontainer--menu--menuitem--links--span">
                  Data
                </span>
              </MenuItem>
            </Link>
          </div>
          <Link className="header--navigation--authcontainer--menu--menuitem--disabled">
            <MenuItem
              sx={{
                padding: '8px',
                width: '180px',
                cursor: 'default',
              }}
            >
              <HelpIcon />
              <span className="header--navigation--authcontainer--menu--menuitem--links--span">
                Help
              </span>
            </MenuItem>
          </Link>
          <ProfileAuthButton>
            {isAuthenticated ? (
              <span className="header--navigation--authcontainer--menu--menuitem--links--span">
                Log Out
              </span>
            ) : (
              <span className="header--navigation--authcontainer--menu--menuitem--links--span">
                Sign In
              </span>
            )}
          </ProfileAuthButton>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
