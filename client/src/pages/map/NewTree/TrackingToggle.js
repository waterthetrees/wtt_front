import React, { forwardRef } from 'react';
import { Checkbox, styled } from '@mui/material';
import { LocationSearching, MyLocation } from '@mui/icons-material';

const TrackingToggle = styled(Checkbox)`
  left: 50px;
  top: -24px;
  position: absolute;
`;

// Wrap this component in forwardRef so that it can be wrapped in a Tooltip, though the tooltip
// doesn't currently work, possibly because of the portal in which the parent marker is wrapped.
export default forwardRef(({checked, onChange, ...props}, ref) => (
  <TrackingToggle
    icon={<LocationSearching fontSize="large" />}
    checkedIcon={<MyLocation fontSize="large" />}
    title={checked
      ? 'Stop tracking current location'
      : 'Move marker to your current location'}
    checked={checked}
    // In case the tracking button is over a tree circle, stop event propagation so that the map
    // doesn't hear the click and open the details drawer for that tree.
    onClick={(event) => event.stopPropagation()}
    onChange={onChange}
    {...props}
  />
));
