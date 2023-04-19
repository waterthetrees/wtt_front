import React from 'react';
import { ViewList, ViewModule } from '@mui/icons-material';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';

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
      sx={{ backgroundColor: 'white' }}
    >
      <ToggleButton
        value="list"
        aria-label="list"
        data-testid="list-toggle-button"
      >
        <ViewList />
      </ToggleButton>
      <ToggleButton
        value="card"
        aria-label="card"
        data-testid="card-toggle-button"
      >
        <ViewModule />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
