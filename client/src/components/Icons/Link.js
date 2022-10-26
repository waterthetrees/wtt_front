import React from 'react';

import { Link, LinkOff } from '@mui/icons-material';

export const LinkIcon = (props) => (
  <Link sx={{ verticalAlign: 'top' }} {...props} />
);

export const LinkOffIcon = (props) => (
  <LinkOff sx={{ verticalAlign: 'top' }} {...props} />
);
