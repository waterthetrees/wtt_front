import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, Popover } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { AuthButton, NavAuthButton } from '@/components/Auth';
// import HeaderLogo from '@/assets/images/logos/header-logo.svg';
import { TreeLogo } from '@/components/Icons';
import styled from '@emotion/styled';
import HeaderLogo from '@/assets/images/logos/header-logo.svg';
import * as Page from '@/components/Section/Section';

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

  const Header = styled.div({
    fontFamily: 'montserrat',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '72px',
    '@media(max-width: 768px)': {
      width: '100%',
    },
  });

  const Navigation = styled.div({
    display: 'flex',
    width: '70%',
    '@media(max-width: 768px)': {
      width: '90%',
    },
  });

  const LogoContainer = styled.div({
    display: 'flex',
    alignItems: 'center',
  });

  const NavigationMenu = styled.div({
    display: 'flex',
    marginLeft: '10%',
    alignItems: 'center',

    '@media(max-width: 768px)': {
      display: 'none',
    },
  });

  const NavigationButton = styled.button({
    margin: '8px 8px',
    fontSize: '2em',
    border: 'none',
    backgroundColor: 'white',
    paddingRight: '40px',
    '& a': {
      color: 'black',
      '&:before': {
        display: 'block',
        fontWeight: 'bold',
        content: 'attr(Title)',
        visibility: 'hidden',
        height: '0',
      },
      '&:hover': {
        color: '#3fab45',
        textDecoration: 'none',
        fontWeight: 'bold',
      },
    },
  });

  const Logo = styled.img({
    paddingLeft: '10px',
    width: '100%',
    '@media(max-width: 768px)': {
      width: '70%',
      // width: '90%',
      // display: 'flex',
    },
  });

  const AuthContainer = styled.div({
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    '@media(max-width: 768px)': {
      display: 'none',
      // width: '90%',
      // display: 'flex',
    },
  });

  const MenuContainer = styled.div({
    marginLeft: 'auto',
  });

  const Image = styled.img({
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    // objectFit: 'cover',
    '&:hover': {
      cursor: 'pointer',
    },
  });

  const ProfileMenuPosition = styled.div({
    position: 'relative',
    height: '0',
    weight: '0',
  });

  const ProfileMenu = styled.div({
    position: 'absolute',
    top: '50px',
    right: '275px',
    width: '200px',
    border: '1px solid black',
  });

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
    <Header>
      <Navigation>
        <LogoContainer>
          <Link to="/">
            <TreeLogo />
          </Link>
          <Link to="/">
            <Logo src={HeaderLogo} alt="Header Logo"></Logo>
          </Link>
        </LogoContainer>
        <NavigationMenu>
          <NavigationButton>
            <Link to="/" title="Map">
              Map
            </Link>
          </NavigationButton>
          <NavigationButton>
            <Link to="/about" title="About">
              About
            </Link>
          </NavigationButton>
          <NavigationButton>
            <Link to="/contact" title="Contact">
              Contact
            </Link>
          </NavigationButton>
          <NavigationButton>
            <Link to="/data" title="Data">
              Data
            </Link>
          </NavigationButton>
        </NavigationMenu>
        <AuthContainer>
          {isAuthenticated ? (
            <MenuContainer>
              <Image onClick={handleClick} src={picture} alt="profile"></Image>
            </MenuContainer>
          ) : (
            <NavAuthButton />
          )}
        </AuthContainer>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem>
            <Link to="/userprofile" className="header-link">
              {/* <HeaderButton menuItem="User Profile" /> */}
            </Link>
          </MenuItem>
        </Menu>

        {/* <MenuContainer>
          <button
            type="button"
            className="header-btn-menu"
            aria-controls="wtt-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            &#9776;
          </button>
        </MenuContainer> */}
        {/* <Menu
          id="wtt-menu"
          anchorEl={anchorEl}
          // keepMounted
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
        </Menu> */}
      </Navigation>
    </Header>
  );

  // return (
  //   <div id="header" className="header">
  //     <div>
  //       <Link to="/">
  //         <TreeLogo />
  //       </Link>
  //     </div>
  //     <div className="header-content">
  //       <Link to="/">
  //         <img className="header--logo" src={HeaderLogo} alt="Header Logo" />
  //       </Link>

  //       <button
  //         type="button"
  //         className="header-btn-menu"
  //         aria-controls="wtt-menu"
  //         aria-haspopup="true"
  //         onClick={handleClick}
  //       >
  //         &#9776;
  //       </button>

  //       <Menu
  //         id="wtt-menu"
  //         anchorEl={anchorEl}
  //         keepMounted
  //         open={Boolean(anchorEl)}
  //         onClose={handleClose}
  //       >
  //         {isAuthenticated && (
  //           <MenuItem onClick={handleClose}>
  //             <Link to="/userprofile" className="header-link">
  //               <HeaderButton menuItem="User Profile" />
  //             </Link>
  //           </MenuItem>
  //         )}

  //         <MenuItem onClick={handleClose}>
  //           <Link to="/" className="header-link">
  //             <HeaderButton menuItem="Map" />
  //           </Link>
  //         </MenuItem>

  //         <MenuItem onClick={handleClose}>
  //           <Link to="/about" className="header-link">
  //             <HeaderButton menuItem="About" />
  //           </Link>
  //         </MenuItem>

  //         <MenuItem onClick={handleClose}>
  //           <Link to="/contact" className="header-link">
  //             <HeaderButton menuItem="Contact" />
  //           </Link>
  //         </MenuItem>

  //         <MenuItem onClick={handleClose}>
  //           <Link to="/data" className="header-link">
  //             <HeaderButton menuItem="Data" />
  //           </Link>
  //         </MenuItem>

  //         <MenuItem onClick={handleClose}>
  //           <AuthButton />
  //         </MenuItem>
  //       </Menu>
  //     </div>
  //   </div>
  // );
};

export default Header;
