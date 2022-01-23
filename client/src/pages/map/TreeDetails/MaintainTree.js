import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button } from '@mui/material';
import { Park } from '@mui/icons-material';
import format from 'date-fns/format';
import { useTreeHistoryMutation } from '@/api/queries';
import useAuthUtils from '@/components/Auth/useAuthUtils';
import MaintainTreeDialog from './MaintainTreeDialog';

const Container = (props) => (
  <Box
    sx={{
      pt: 3,
      mt: 1,
      mb: 3,
      borderTop: 1,
      borderTopColor: 'divider',
      display: 'flex',
      justifyContent: 'space-between',
    }}
    {...props}
  />
);

export default function MaintainTree({ currentTreeId }) {
  const { user = {}, isAuthenticated } = useAuth0();
  const { loginToCurrentPage } = useAuthUtils();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const mutateHistory = useTreeHistoryMutation();
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
      const payload = {
        id: currentTreeId,
        date_visit: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        volunteer,
        ...actions,
      };

      if (comment) {
        payload.comment = comment;
      }

      mutateHistory.mutate(payload);
    }
  };

  return (
    <Container>
      <Button
        variant="outlined"
        color="success"
        startIcon={<Park />}
        onClick={handleClick}
      >
        Maintain Tree
      </Button>
      {isDialogOpen && (
        <MaintainTreeDialog
          open={isDialogOpen}
          volunteer={volunteerName}
          onConfirm={handleConfirm}
          onCancel={closeDialog}
        />
      )}
    </Container>
  );
}
