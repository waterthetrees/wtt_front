import React from 'react';
import {
  LoginOutlined,
  LogoutOutlined,
  AccountCircleOutlined,
} from '@mui/icons-material';

export const LoginIcon = (props) => (
  <LoginOutlined sx={{ fontSize: '2rem' }} {...props} />
);

export const LogoutIcon = (props) => (
  <LogoutOutlined sx={{ fontSize: '2rem' }} {...props} />
);

export const AccountIcon = (props) => (
  <AccountCircleOutlined sx={{ fontSize: '2rem' }} {...props} />
);
