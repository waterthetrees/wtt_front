import React from 'react';
import { Checkbox } from '@mui/material';
import { Like, Liked } from '@/components/Icons';

const Icon = <Like fontSize="large" />;
const CheckedIcon = <Liked fontSize="large" />;

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
    }}
    {...props}
  />
));
