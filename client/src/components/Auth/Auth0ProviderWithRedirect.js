import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { auth0 } from '../../util/config';

const { domain, clientId } = auth0;

const Auth0ProviderWithRedirect = ({ children }) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    // By the time this callback is called, we're back at the redirectUri, plus a ?code= parameter
    // from Auth0.  So redirect to the path + hash in returnTo, via the /go page.
    navigate('/go?to=' + (appState?.returnTo || '/' + location.hash));
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithRedirect;
