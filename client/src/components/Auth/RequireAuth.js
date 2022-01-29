import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from './Loading';

// TODO: it's not clear if this is the best approach for react-router v6, but it was the simplest change.
const RequireAuth = ({ component, ...args }) => {
  const WrappedComponent = withAuthenticationRequired(component, {
    onRedirecting: () => <Loading />,
  });

  return (
    <WrappedComponent {...args} />
  );
};

export default RequireAuth;
