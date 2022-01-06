import React from 'react';
import { Checkbox } from '@mui/material';
import { Info } from '@mui/icons-material';

const Icon = <Info fontSize="large" />;
const CheckedIcon = Icon;

// The Tooltip that wraps this will need a ref to the component.
export default React.forwardRef((props, ref) => (
  <Checkbox
    ref={ref}
    icon={Icon}
    checkedIcon={CheckedIcon}
    sx={{
      padding: '9px',
      '&:hover': {
        backgroundColor: 'rgba(208, 64, 58, 0.06)',
      },
      '&.Mui-checked': {
        color: '#d0403a',
      },
    }}
    {...props}
  />
));
