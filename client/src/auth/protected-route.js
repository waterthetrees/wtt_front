/* eslint-disable react/jsx-props-no-spreading */
// src/auth/protected-route.js

import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Loading } from './loading';

const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <h1>Loading</h1>,
    })}
    {...args}
  />
);

export default ProtectedRoute;
