import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Box } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export default function ScrollableDialog({ children, title, open, onClose, }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      maxWidth={'sm'}
      fullWidth={true}
    >
      <DialogTitle id="scroll-dialog-title">
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>{title}</Box>
          <Box>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent dividers={true}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
