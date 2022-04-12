import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, styled } from '@mui/material';
import { Park } from '@mui/icons-material';
import format from 'date-fns/format';
import { useTreeHistoryMutation, useCreateOrUpdateTree } from '@/api/queries';
import useAuthUtils from '@/components/Auth/useAuthUtils';
import TreeMaintenanceDialog from './TreeMaintenanceDialog';

const TreeMaintenanceButton = styled(Button)`
  font-size: 1.5rem;
`;

export default function TreeMaintenance({ currentTreeData: { id } }) {
  const { user = {}, isAuthenticated } = useAuth0();
  const { loginToCurrentPage } = useAuthUtils();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const createOrUpdateTree = useCreateOrUpdateTree();
  const mutateHistory = useTreeHistoryMutation();
  const volunteerName = isAuthenticated
    ? user.nickname
    : 'Volunteer';

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleClick = () => {
    if (!isAuthenticated) {
      loginToCurrentPage();
    } else {
      openDialog();
    }
  };

  const handleConfirm = async ({ actions, volunteer, comment }) => {
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

      // Make sure the tree exists before updating its history (though this doesn't actually appear
      // to be necessary when adding maintenance history).
      await createOrUpdateTree({ id });
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
