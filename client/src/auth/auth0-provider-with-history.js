import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { auth0 } from '../util/config';

const { domain, clientId } = auth0;

const Auth0ProviderWithHistory = ({ children }) => {
  const redirectUri = window.location.origin;

  const history = useHistory();

  const onRedirectCallback = (appState) => {
    // Include the hash with the pathname so that the user will return to the current zoom and
    // position after logging in.
    history.push(appState?.returnTo || location.pathname + location.hash);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
