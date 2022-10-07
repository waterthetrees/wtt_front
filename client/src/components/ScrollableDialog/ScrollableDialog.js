import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Close } from '@mui/icons-material';

export default function ScrollableDialog({
  children,
  title,
  open,
  onClose,
  onConfirm,
  onCancel = onClose,
  actions,
  ...props
}) {
  const theme = useTheme();
  // Use a full-screen dialog on smaller screens.
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  let actionButtons;

  if (React.isValidElement(actions)) {
    actionButtons = actions;
  } else if (Array.isArray(actions)) {
    actionButtons = actions.map((action) => {
      const { confirm, cancel } = action;

      return confirm ? (
        <Button key={confirm} type="submit" onClick={onConfirm}>
          {confirm}
        </Button>
      ) : (
        <Button key={cancel} onClick={onCancel}>
          {cancel}
        </Button>
      );
    });
  }

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      scroll="paper"
      maxWidth="sm"
      fullWidth
      fullScreen={fullScreen}
      {...props}
    >
      <DialogTitle sx={{ py: 1, pr: 2 }}>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>{title}</Box>
          <IconButton onClick={onCancel} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      {actionButtons && <DialogActions>{actionButtons}</DialogActions>}
    </Dialog>
  );
}
