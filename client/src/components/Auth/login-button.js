// src/components/login-button.js

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      type="submit"
      className="authbutton btn btn-light btn-block"
      onClick={() => loginWithRedirect()}
    >
      Login
    </button>
  );
};

export default LoginButton;
