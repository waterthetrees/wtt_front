/* eslint-disable no-restricted-globals */
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useAuthUtils from '@/components/Auth/useAuthUtils';
import * as Page from '@/components/Section/Section';

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
    // <Page.GreenButton
    //   style={{ padding: '8px', '&:hover': { padding: '12px' } }}
    //   type="button"
    //   onClick={handleClick}
    // >
    //   {isAuthenticated ? 'Log Out' : 'Log In'}
    // </Page.GreenButton>
    <button
      type="button"
      className="authbutton btn btn-light btn-block"
      onClick={handleClick}
    >
      {isAuthenticated ? 'Log Out' : 'Log In'}
    </button>
  );
};

export const NavAuthButton = () => {
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
    <Page.GreenButton
      style={{ padding: '8px', '&:hover': { padding: '12px' } }}
      type="button"
      onClick={handleClick}
    >
      {isAuthenticated ? 'Log Out' : 'Log In'}
    </Page.GreenButton>
  );
};
