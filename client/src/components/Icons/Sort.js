import React from 'react';

import { Remove, ExpandLess, ExpandMore } from '@mui/icons-material';

export const Neutral = (props) => (
  <Remove sx={{ verticalAlign: 'top' }} {...props} />
);

export const SortUp = (props) => (
  <ExpandLess sx={{ verticalAlign: 'top' }} {...props} />
);

export const SortDown = (props) => (
  <ExpandMore sx={{ verticalAlign: 'top' }} {...props} />
);
