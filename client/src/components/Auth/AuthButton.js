/* eslint-disable no-restricted-globals */
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useAuthUtils from '@/components/Auth/useAuthUtils';
import { GreenButton } from '@/components/Section/Section';
import { MenuItem } from '@mui/material';
import { LoginOutlined, LogoutOutlined } from '@mui/icons-material';

export const AuthButton = () => {
  const { isAuthenticated, logout } = useAuth0();
  const { loginToCurrentPage } = useAuthUtils();

  const handleClick = () => {
    if (isAuthenticated) {
      // Only logging out to the root seems to be allowed, so if the user is on a subpage like
      // /contact, they'll be sent back to /.
      logout({ returnTo: location.origin });
    } else {
      loginToCurrentPage();
    }
  };

  return (
    <GreenButton
      style={{
        fontSize: '1.2rem',
        '&:hover': {
          padding: '6px 4px',
          fontWeight: 'bold',
        },
      }}
      type="button"
      onClick={handleClick}
    >
      {isAuthenticated ? 'Log Out' : 'Log In'}
    </GreenButton>
  );
};

export const ProfileAuthButton = (props) => {
  const LoginIcon = (props) => (
    <LoginOutlined sx={{ fontSize: '2rem' }} {...props} />
  );

  const LogoutIcon = (props) => (
    <LogoutOutlined sx={{ fontSize: '2rem' }} {...props} />
  );
  const { isAuthenticated, logout } = useAuth0();
  const { loginToCurrentPage } = useAuthUtils();

  const handleClick = () => {
    if (isAuthenticated) {
      // Only logging out to the root seems to be allowed, so if the user is on a subpage like
      // /contact, they'll be sent back to /.
      logout({ returnTo: location.origin });
    } else {
      loginToCurrentPage();
    }
  };

  return (
    <MenuItem
      sx={{
        padding: '8px',
        width: '180px',
        '&:hover': {
          textDecoration: 'none',
          color: '#3fab45',
        },
      }}
      onClick={handleClick}
    >
      {isAuthenticated ? <LoginIcon /> : <LogoutIcon />}
      {props.children}
    </MenuItem>
  );
};
