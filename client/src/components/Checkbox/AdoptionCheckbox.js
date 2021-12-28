import React from 'react';
import { Checkbox } from '@mui/material';
import AdoptionIcon from '../../components/Icons/AdoptionIcon/AdoptionIcon';

const Icon = <AdoptionIcon fontSize="large" />;
const CheckedIcon = <AdoptionIcon primary fontSize="large" />;

// The Tooltip that wraps this will need a ref to the component.
export default React.forwardRef((props, ref) => (
  <Checkbox
    ref={ref}
    icon={Icon}
    checkedIcon={CheckedIcon}
    {...props}
  />
));
