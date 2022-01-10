import React from 'react';
import { Checkbox } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';

const Icon = <StarBorder fontSize="large" />;
const CheckedIcon = <Star fontSize="large" />;

// The Tooltip that wraps this will need a ref to the component.
export default React.forwardRef((props, ref) => (
  <Checkbox
    ref={ref}
    icon={Icon}
    checkedIcon={CheckedIcon}
    sx={{
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 0, 0.06)',
      },
      '&.Mui-checked': {
        color: '#f7c631',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 0, 0.06)',
        },
      },
    }}
    {...props}
  />
));
