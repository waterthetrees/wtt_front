import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
// import { styled } from '@mui/system';
import { useAuth0 } from '@auth0/auth0-react';
import { AuthButton, ProfileAuthButton } from '@/components/Auth';
// import HeaderLogo from '@/assets/images/logos/header-logo.svg';
import { TreeLogo } from '@/components/Icons';
import styled from '@emotion/styled';
import HeaderLogo from '@/assets/images/logos/header-logo.svg';

import './Header.scss';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const HeaderButton = ({ menuItem }) => (
    <button type="button" className="btn btn-success btn-block">
      {menuItem}
    </button>
  );

  const { isAuthenticated, user = {} } = useAuth0();
  const { name, nickname, email, picture } = user;
  const emailQuery = { email };
  const emailEnabled = { enabled: !!email };

  // const AuthContainer = styled.div({
  //   display: 'flex',
  //   alignItems: 'center',
  //   marginLeft: 'auto',
  //   '@media(max-width: 768px)': {
  //     display: 'none',
  //     // width: '90%',
  //     // display: 'flex',
  //   },
  // });

  // const MenuContainer = styled.div({
  //   marginLeft: 'auto',
  // });

  const Image = styled.img({
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    // objectFit: 'cover',
    '&:hover': {
      cursor: 'pointer',
    },
  });

  // const ProfileMenuPosition = styled.div({
  //   position: 'relative',
  //   height: '0',
  //   weight: '0',
  // });

  // const ProfileMenu = styled.div({
  //   position: 'absolute',
  //   top: '50px',
  //   right: '275px',
  //   width: '200px',
  //   border: '1px solid black',
  // });

  const handleProfileMenu = (e) => {
    setOpen(true);
  };

  const profileRef = useRef();
  console.log(anchorEl);

  useEffect(() => {
    const handler = (e) => {
      if (!profileRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

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
        {isAuthenticated ? (
          <div className="header--navigation--authcontainer">
            <img
              className="header--navigation--authcontainer--profile"
              onClick={handleClick}
              src={picture}
              alt="profile"
            />
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
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
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
              <MenuItem
                sx={{
                  padding: '0px',
                  paddingBottom: '8px',
                  width: '180px',
                  borderBottom: 'black 1px solid',
                }}
              >
                <img
                  className="header--navigation--authcontainer--profile"
                  src={picture}
                  alt="profile"
                />

                <div className="header--navigation--authcontainer--profile--menuitem--details">
                  <p>{nickname}</p>
                  <p>{email}</p>
                </div>
              </MenuItem>
              {isAuthenticated && (
                <MenuItem onClick={handleClose}>
                  <Link to="/userprofile" className="header-link">
                    <HeaderButton menuItem="User Profile" />
                  </Link>
                </MenuItem>
              )}
              <div className="header--navigation--authcontainer--profile--menuitem--routes">
                <MenuItem
                  onClick={handleClose}
                  sx={{
                    display: 'none',
                    '@media(max-width: 768px)': {
                      display: 'flex',
                    },
                  }}
                >
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
              </div>

              <ProfileAuthButton></ProfileAuthButton>
            </Menu>
          </div>
        ) : (
          <div className="header--navigation--authcontainer">
            <AuthButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
