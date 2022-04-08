import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, styled } from '@mui/material';
import { Park } from '@mui/icons-material';
import format from 'date-fns/format';
import { useTreeHistoryMutation, useCreateTreeDataMutation } from '@/api/queries';
import useAuthUtils from '@/components/Auth/useAuthUtils';
import TreeMaintenanceDialog from './TreeMaintenanceDialog';

const TreeMaintenanceButton = styled(Button)`
  font-size: 1.5rem;
`;

export default function TreeMaintenance({ currentTreeData, isTreeQueryError }) {
  const { id } = currentTreeData;
  const { user = {}, isAuthenticated } = useAuth0();
  const { loginToCurrentPage } = useAuthUtils();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const mutateHistory = useTreeHistoryMutation();
  const mutateCreateTreeData = useCreateTreeDataMutation();
  const volunteerName = isAuthenticated
    ? user.nickname
    : 'Volunteer';

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleClick = () => {
    if (isAuthenticated) {
      openDialog();
    } else {
      loginToCurrentPage();
    }
  };

  const handleConfirm = ({ actions, volunteer, comment }) => {
    closeDialog();

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
      <TreeMaintenanceButton
        color="success"
        size="large"
        variant="contained"
        startIcon={<Park />}
        onClick={handleClick}
        fullWidth
        disableElevation
      >
        Maintenance
      </TreeMaintenanceButton>
      {isDialogOpen && (
        <TreeMaintenanceDialog
          open={isDialogOpen}
          volunteer={volunteerName}
          onConfirm={handleConfirm}
          onCancel={closeDialog}
        />
      )}
    </div>
  );
}
