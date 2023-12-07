import React from 'react';
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
} from '@mui/material';
import { Close, ArrowBack } from '@mui/icons-material';

export default function PanelDrawer({
  children,
  width,
  open,
  title = '',
  subtext = '',
  anchor = 'left',
  actions,
  onClose,
  arrowBack
}) {
  return (
    <Drawer
      PaperProps={{
        sx: {
          position: 'absolute',
          left: 0,
          width: `${width}px`,
          height: '100vh',
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
          <Box className="dialog-title" flexGrow={1}>{title}</Box>
          <IconButton className="panel-icon-button" size="small" onClick={onClose} sx={{ mr: -1.5 }}>
            {arrowBack ?
              <ArrowBack fontSize="large" className="panel-arrow-back" />
              :
              <Close />
            }
          </IconButton>
        </Box>
        {subtext &&
          <Box className="dialog-subtext">{subtext}</Box>
        }
      </DialogTitle>
      <DialogContent className="dialog-content" dividers>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Drawer>
  );
}
