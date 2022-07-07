import React from 'react';
import { Checkbox } from '@mui/material';
import { Adopt, Adopted } from '@/components/Icons';

const Icon = <Adopt fontSize="large" />;
const CheckedIcon = <Adopted fontSize="large" />;

// The Tooltip that wraps this will need a ref to the component.
export default React.forwardRef((props, ref) => (
  <Checkbox
    ref={ref}
    icon={Icon}
    checkedIcon={CheckedIcon}
    {...props}
  />
));
