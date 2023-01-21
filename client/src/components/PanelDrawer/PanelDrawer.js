import React from 'react';
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  Slide,
  styled,
} from '@mui/material';
import { Close } from '@mui/icons-material';

const StyledDrawer = styled(Drawer)(
  ({ width }) => `
  position: absolute;
  right: 0;
  width: ${width}px;

  & .MuiDrawer-paper {
    // Add padding at the top to account for the header.
    position: relative;
    padding-top: 3.5rem;
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
    <Slide direction="left" in={open} timeout={500} mountOnEnter unmountOnExit>
      <StyledDrawer
        open
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
    </Slide>
  );
}
