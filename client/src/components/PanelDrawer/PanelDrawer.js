import React from 'react';
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  styled,
} from '@mui/material';
import { Close } from '@mui/icons-material';

const StyledDrawer = styled(Drawer)(
  ({ width }) => `
  // Give the background of the container the same color as land on the map, so that it's not
  // so jarring when the white drawer closes.
  background: #c5def6;
  width: ${width}px;
  flex-shrink: 0;

  & .MuiDrawer-paper {
    // Add padding at the top to account for the header.
    padding-top: 3.5rem;
    width: ${width}px;
    box-shadow: -5px 0px 15px -3px rgba(0, 0, 0, 0.15);
  }
`,
);

export default function PanelDrawer({
  children,
  width,
  open,
  title = '',
  anchor = 'right',
  actions,
  onClose,
}) {
  return (
    <StyledDrawer
      open={open}
      anchor={anchor}
      width={width}
      onClose={onClose}
      variant="persistent"
    >
      <DialogTitle sx={{ py: 1 }}>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>{title}</Box>
          <IconButton size="small" onClick={onClose} sx={{ mr: -1.5 }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </StyledDrawer>
  );
}
