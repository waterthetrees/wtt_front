import { ViewColumn, ViewQuilt } from '@mui/icons-material';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';

export default function Toggle({ view, setView }) {
  const handleToggleView = (event, newView) => {
    // to persist view on refresh set in local storage
    // before setView triggers a re-render setting state
    localStorage.setItem('view', newView);
    setView(newView);
  };
  return (
    <ToggleButtonGroup
      orientation="horizontal"
      value={localStorage.getItem('view') || view}
      exclusive={true}
      onChange={handleToggleView}
      color="success"
      aria-label="view"
      role="group"
      sx={{ backgroundColor: 'white' }}
    >
      <ToggleButton
        value="column"
        aria-label="column"
        data-testid="column-toggle-button"
      >
        <ViewColumn /> column
      </ToggleButton>
      <ToggleButton
        value="quilt"
        aria-label="quilt"
        data-testid="quilt-toggle-button"
      >
        <ViewQuilt /> quilt
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
