import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Alert } from '@mui/material';
import { Park } from '@mui/icons-material';
import format from 'date-fns/format';
import {
  useTreeHistoryMutation,
  useCreateTreeDataMutation,
} from '@/api/queries';
import useAuthUtils from '@/components/Auth/useAuthUtils';
import TreeMaintenanceSidebar from './TreeMaintenanceSidebar';
import './TreeMaintenance.scss';

export default function TreeMaintenance({ currentTreeData, isTreeQueryError, closeTreeDetails, maintenanceAlert, closeMaintenanceAlert }) {
  const { id } = currentTreeData;
  const { user = {}, isAuthenticated } = useAuth0();
  const { loginToCurrentPage } = useAuthUtils();
  const [isMaintenanceSidebarOpen, setMaintenanceSidebarOpen] = useState(false)
  const mutateHistory = useTreeHistoryMutation();
  const mutateCreateTreeData = useCreateTreeDataMutation();
  const volunteerName = isAuthenticated ? user.nickname : 'Volunteer';

  const openMaintenanceSidebar = () => {
    setMaintenanceSidebarOpen(true)
  }
  const closeMaintenanceSidebar = () => {
    setMaintenanceSidebarOpen(false)
  }

  const handleClick = () => {
    if (isAuthenticated) {
      openMaintenanceSidebar();
    } else {
      loginToCurrentPage();
    }
  };

  useEffect(() => {
    setMaintenanceSidebarOpen(false)
  }, [currentTreeData])

  const MaintenanceSubmitNotification = (type, body) => {
    const alertMessage =
      <div className="maintenance-alert">
        <Alert
          className={`alert alert-${type}`}
          severity={type}
          onClose={closeMaintenanceAlert}
        >
          {body}
        </Alert>
      </div>
    maintenanceAlert(alertMessage)
  }

  const handleConfirm = ({ actions, volunteer, comment }) => {
    closeMaintenanceSidebar();
    closeTreeDetails()
    MaintenanceSubmitNotification("success", "Thank you for submitting a maintenance request!")

    if (comment || Object.keys(actions).length) {
      const sendTreeHistory = {
        id,
        date_visit: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        volunteer,
        ...actions,
      };

      if (comment) {
        sendTreeHistory.comment = comment;
      }

      if (isTreeQueryError) {
        mutateCreateTreeData.mutate({
          ...currentTreeData,
          volunteer,
        });
      }
      mutateHistory.mutate(sendTreeHistory);
    }
  };

  return (
    <div>
      <Button
        className="tree-maintenance-button"
        color="success"
        size="large"
        variant="contained"
        startIcon={<Park />}
        onClick={handleClick}
        fullWidth
        disableElevation
      >
        Maintenance
      </Button>
      {isMaintenanceSidebarOpen &&
        <TreeMaintenanceSidebar
          open={isMaintenanceSidebarOpen}
          volunteer={volunteerName}
          onConfirm={handleConfirm}
          onCancel={closeMaintenanceSidebar}
          currentTreeData={currentTreeData}
        />
      }
    </div>
  );
}
