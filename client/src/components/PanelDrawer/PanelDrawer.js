import React from 'react';
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';

export default function PanelDrawer({
  children,
  width,
  open,
  title = '',
  anchor = 'left',
  actions,
  onClose,
}) {
  return (
    <Drawer
      PaperProps={{
        sx: {
          position: 'absolute',
          left: 0,
          width: `${width}px`,
          height: '100vh',
          paddingTop: '3.5rem',
          boxShadow: '5px 0px 15px 3px rgba(0, 0, 0, 0.15)',
        },
      }}
      open={open}
      anchor={anchor}
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
    </Drawer>
  );
}
