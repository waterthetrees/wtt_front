import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button
      type="button"
      className="authbutton btn btn-light btn-block"
      onClick={() => logout({
        returnTo: window.location.origin,
      })}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
