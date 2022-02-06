import React, { forwardRef } from 'react';
import { Checkbox, IconButton, styled } from '@mui/material';
import { Add, LocationOn, LocationOnOutlined } from '@mui/icons-material';

// These styles will be used for both the IconButton and Checkbox below.
const styles = `
  padding: 3px;
  border-radius: 50%;
  color: rgba(255, 255, 255, .8);
  background: rgba(0, 0, 0, .25);

  &:hover {
    color: rgba(255, 255, 255, .9);
    background: rgba(0, 0, 0, .35);
  }

  & .MuiSvgIcon-root {
    width: 25px;
    height: 25px;
  }
`;

const StyledButton = styled(IconButton)(styles);

// Wrap these components with forwardRef() so that they can be wrapped in a Tooltip.
const AddButton = forwardRef((props, ref) => (
  <StyledButton
    ref={ref}
    {...props}
  >
    <Add />
  </StyledButton>
));

const StyledCheckbox = styled(Checkbox)(styles);

const TrackingToggle = forwardRef((props, ref) => (
  <StyledCheckbox
    ref={ref}
    icon={<LocationOnOutlined />}
    // Force the checked icon to be white, since it will default to the primary color.
    checkedIcon={<LocationOn sx={{ color: 'white' }} />}
    // In case the tracking button is over a tree circle, stop event propagation so that the map
    // doesn't hear the click and open the details drawer for that tree.
    onClick={(event) => event.stopPropagation()}
    {...props}
  />
));

export {
  AddButton,
  TrackingToggle,
};
