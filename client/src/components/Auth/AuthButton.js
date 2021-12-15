import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useAuthUtils from '../../components/Auth/useAuthUtils';

const protectedRoutes = /userprofile/i;

const AuthButton = () => {
  const { isAuthenticated, logout } = useAuth0();
  const { loginToCurrentPage } = useAuthUtils();

  const handleClick = () => {
    if (isAuthenticated) {
      // If the user is currently on a protected route, send them back to the root page, since they
      // won't be able to view the current page.  Otherwise, keep them on the same page.
      const destination = protectedRoutes.test(location.pathname)
        ? location.origin
        : location.href;

      logout({ returnTo: destination });
    } else {
      loginToCurrentPage();
    }
  };

  return (
    <button
      type="button"
      className="authbutton btn btn-light btn-block"
      onClick={handleClick}
    >
      {isAuthenticated
        ? 'Log Out'
        : 'Log In'}
    </button>
  );
};

export default AuthButton;
