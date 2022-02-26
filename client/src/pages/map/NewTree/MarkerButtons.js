import React, { forwardRef } from 'react';
import { Checkbox, IconButton, styled } from '@mui/material';
import { Add, LocationOn, LocationOnOutlined } from '@mui/icons-material';

// When the mouse is over the button or clicks it, we don't want the map to hear those events, so
// it doesn't show a popup for the tree or details in the drawer.
const stopPropagation = (event) => event.stopPropagation();

// These styles will be used for both the IconButton and Checkbox below.
const styles = `
  padding: 3px;
  border-radius: 50%;
  color: rgba(255, 255, 255, .9);
  background: rgba(0, 0, 0, .45);

  &:hover {
    color: rgba(255, 255, 255, 1);
    background: rgba(0, 0, 0, .6);
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
    onMouseMove={stopPropagation}
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
    // Force the checked icon to be white, since otherwise it will default to the `primary` color.
    checkedIcon={<LocationOn sx={{ color: 'white' }} />}
    onClick={stopPropagation}
    onMouseMove={stopPropagation}
    {...props}
  />
));

export {
  AddButton,
  TrackingToggle,
};
