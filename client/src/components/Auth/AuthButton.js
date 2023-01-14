/* eslint-disable no-restricted-globals */
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useAuthUtils from '@/components/Auth/useAuthUtils';
import { GreenButton } from '@/components/Section/Section';
import { MenuItem } from '@mui/material';
import { LoginIcon, LogoutIcon } from '@/components/Icons';

export const AuthButton = () => {
  const { isAuthenticated, logout } = useAuth0();
  const { loginToCurrentPage } = useAuthUtils();
  const [hover, setHover] = React.useState(false);

  const handleHoverOver = () => {
    setHover(true);
  };

  const handleHoverAway = () => {
    setHover(false);
  };

  const style = hover
    ? {
        padding: '6px 4px',
        fontWeight: 'bold',
        fontSize: '1.2rem',
      }
    : {
        bottom: '5px',
        padding: '4px',
        fontSize: '1.2rem',
      };

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
      style={style}
      type="button"
      onClick={handleClick}
      onMouseEnter={handleHoverOver}
      onMouseLeave={handleHoverAway}
      title="auth"
    >
      {isAuthenticated ? 'Log Out' : 'Log In'}
    </GreenButton>
  );
};

export const ProfileAuthButton = (props) => {
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
