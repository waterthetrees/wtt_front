import React, { forwardRef } from 'react';
import { IconButton, styled } from '@mui/material';
import { Add } from '@mui/icons-material';

// When the mouse is over the button or clicks it, we don't want the map to hear those events, so
// it doesn't show a popup for the tree or details in the drawer.
const stopPropagation = (event) => event.stopPropagation();

const StyledButton = styled(IconButton)`
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

// Wrap this with forwardRef() so it can be wrapped in a Tooltip.
const AddButton = forwardRef((props, ref) => (
  <StyledButton
    ref={ref}
    onMouseMove={stopPropagation}
    {...props}
  >
    <Add />
  </StyledButton>
));

export default AddButton;
