import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './login-button';
import LogoutButton from './logout-button';

const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();
  console.log('isAuthenticated', isAuthenticated);
  return isAuthenticated ? <LogoutButton /> : <LoginButton />;
};

export default AuthenticationButton;
