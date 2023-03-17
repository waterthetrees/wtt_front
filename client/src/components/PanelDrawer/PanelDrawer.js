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
  padding = '16px 24px',
}) {
  const percentWidth =
    typeof width === 'string' && width.includes('%') ? width : `${width}px`;
  return (
    <Drawer
      PaperProps={{
        sx: {
          position: 'fixed',
          left: 0,
          width: `${width}px`,
          height: '100vh',
          paddingTop: '3.5rem',
          boxShadow: '5px 0px 15px 3px rgba(0, 0, 0, 0.15)',
        },
      }}
      open={open}
      anchor={anchor}
      width={percentWidth}
      onClose={onClose}
      variant="persistent"
    >
      <DialogTitle sx={{ py: 2 }}>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>{title}</Box>
          <IconButton size="small" onClick={onClose} sx={{ mr: -1.5 }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ padding: padding }}>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Drawer>
  );
}
