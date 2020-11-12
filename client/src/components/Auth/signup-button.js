import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SignupButton = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  return !isAuthenticated && (
    <button
      type="button"
      className="authbutton btn btn-light btn-block"
      onClick={() => loginWithRedirect({
        screen_hint: 'signup',
      })}
    >
      Sign Up
    </button>
  );
};

export default SignupButton;
