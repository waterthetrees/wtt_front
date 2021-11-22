import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  DialogActions,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function ScrollableDialog({
  children, title, open, onClose, actions,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="scroll-dialog-title">
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>{title}</Box>
          <Box>
            <IconButton onClick={onClose} size="large">
              <CloseIcon />
            </IconButton>
          </Box>
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
    </Dialog>
  );
}
