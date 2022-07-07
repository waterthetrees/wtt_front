/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Loading } from './Loading';

// TODO: it's not clear if this is the best approach for react-router v6,
// but it was the simplest change.
export const RequireAuth = ({ component, ...args }) => {
  const WrappedComponent = withAuthenticationRequired(component, {
    onRedirecting: () => <Loading />,
  });

  return (
    <WrappedComponent {...args} />
  );
};
