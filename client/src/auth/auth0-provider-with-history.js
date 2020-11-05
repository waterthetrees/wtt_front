import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  // const domain = process.env.REACT_APP_AUTH0_DOMAIN || 'trees.us.auth0.com';
  const domain = 'trees.us.auth0.com';
  // const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || 'rUv8qhefpscOANXBfanD0fwSjTMz2ZpW';
  const clientId = 'rUv8qhefpscOANXBfanD0fwSjTMz2ZpW';
  const redirectUri = window.location.origin;
  // const redirectUri = 'https://dev.waterthetrees.com';
  console.log('domain', domain);
  console.log('clientId', clientId);
  console.log('redirectUri', redirectUri);

  const history = useHistory();

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
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
