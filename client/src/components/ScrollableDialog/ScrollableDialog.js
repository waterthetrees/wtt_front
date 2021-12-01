import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  DialogActions,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function ScrollableDialog({
  children, title, open, onClose, actions,
}) {
  const theme = useTheme();
  // Use a full-screen dialog on smaller screens.
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      maxWidth="sm"
      fullWidth
      fullScreen={fullScreen}
    >
      <DialogTitle id="scroll-dialog-title" sx={{ py: 1 }}>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>{title}</Box>
          <Box>
            <IconButton onClick={onClose} size="small">
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
