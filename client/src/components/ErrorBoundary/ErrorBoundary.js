import React, { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Alert, Snackbar } from '@mui/material';

const Fallback = ({ error, resetErrorBoundary }) => {
  const [open, setOpen] = useState(true);
  console.error('[Error handled by ErrorBoundary]', error);

  const handleClose = (event, reason) => {
    if (reason !== 'clickaway') {
      setOpen(false);
      resetErrorBoundary();
    }
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={handleClose}
      sx={{
        '& .MuiPaper-root': {
          fontSize: '1.2rem',
        },
      }}
    >
      <Alert
        severity="error"
        variant="filled"
        elevation={6}
        onClose={handleClose}
      >
        An error occurred. Please see the console for more information.
      </Alert>
    </Snackbar>
  );
};

export default function WTTErrorBoundary({
  children, FallbackComponent = Fallback, onReset = () => location.reload(),
}) {
  return (
    <ErrorBoundary
      FallbackComponent={FallbackComponent}
      onReset={onReset}
    >
      {children}
    </ErrorBoundary>
  );
}
