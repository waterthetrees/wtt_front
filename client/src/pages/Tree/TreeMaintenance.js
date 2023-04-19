import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { Park } from '@mui/icons-material';
import useAuthUtils from '@/components/Auth/useAuthUtils';
import TreeMaintenanceActions from './TreeMaintenanceActions';

export default function TreeMaintenance({ currentTreeData, isTreeQueryError }) {
  const { isAuthenticated } = useAuth0();
  const { loginToCurrentPage } = useAuthUtils();
  const [showMaintenance, setShowMaintenance] = useState(true);

  const handleClick = () => {
    if (!isAuthenticated) loginToCurrentPage();
    setShowMaintenance(!showMaintenance);
  };

  return (
    <div>
      <Button
        color="success"
        size="large"
        variant="contained"
        startIcon={<Park />}
        onClick={handleClick}
        fullWidth
        disableElevation
        style={{ borderRadius: '15px 15px 0 0' }}
      >
        Maintenance
      </Button>
      {showMaintenance && (
        <TreeMaintenanceActions
          currentTreeData={currentTreeData}
          isTreeQueryError={isTreeQueryError}
        />
      )}
    </div>
  );
}
