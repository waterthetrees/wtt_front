import React from 'react';
import {
  Box, DialogActions, DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';

export default function DetailsDrawer({
  children, width, open, title = '', anchor = 'right', actions, onClose,
}) {
  return (
    <Drawer
      open={open}
      anchor={anchor}
      onClose={onClose}
      variant="persistent"
      sx={{
        // Give the background of the container the same color as land on the map, so that it's not
        // so jarring when the white drawer closes.
        background: '#c5def6',
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          // Add padding at the top to account for the header.
          paddingTop: '3.5rem',
          width: width,
          boxShadow: '-5px 0px 15px -3px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <DialogTitle sx={{ py: 1 }}>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>{title}</Box>
          <IconButton
            size="small"
            onClick={onClose}
            sx={{ mr: -1.5 }}
          >
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
      {actions
        && (
          <DialogActions>
            {actions}
          </DialogActions>
        )}
    </Drawer>
  );
}
