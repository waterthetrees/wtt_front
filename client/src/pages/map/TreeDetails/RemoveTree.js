import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { RemoveCircle } from '@mui/icons-material';
import format from 'date-fns/format';
import { useTreeDataMutation, useTreeHistoryMutation } from '@/api/queries';
import useAuthUtils from '@/components/Auth/useAuthUtils';
import RemoveTreeDialog from './RemoveTreeDialog';

export default function RemoveTree({ currentTreeId, currentTreeData: { common, notes } }) {
  const { user = {}, isAuthenticated } = useAuth0();
  const { loginToCurrentPage } = useAuthUtils();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const mutateTreeData = useTreeDataMutation();
  const mutateHistory = useTreeHistoryMutation();

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleClick = () => {
    if (isAuthenticated) {
      openDialog();
    } else {
      loginToCurrentPage();
    }
  };

  const handleConfirm = ({ comment }) => {
    const now = Date.now();
    const today = format(now, 'yyyy-MM-dd');
    const dateVisit = format(now, 'yyyy-MM-dd HH:mm:ss');
    const sendTreeHistory = {
      id: currentTreeId,
      date_visit: dateVisit,
      comment: `${common} was removed - ${comment}`,
      volunteer: user.nickname,
    };
    const sendTreeData = {
      id: currentTreeId,
      common: 'Vacant Site',
      scientific: '',
      genus: '',
      email: user.email,
      health: 'vacant',
      notes,
      datePlanted: dateVisit,
    };
    const newNote = `${common} was removed by ${user.nickname} ${today} - "${comment}"`;

    sendTreeData.notes = (notes && notes !== newNote)
      ? `${notes ? `${notes}\n` : ''}${newNote}`
      : newNote;

    mutateHistory.mutate(sendTreeHistory);
    mutateTreeData.mutate(sendTreeData);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        startIcon={<RemoveCircle />}
        onClick={handleClick}
      >
        Remove
      </Button>
      {isDialogOpen && (
        <RemoveTreeDialog
          open={isDialogOpen}
          onConfirm={handleConfirm}
          onCancel={closeDialog}
        />
      )}
    </>
  );
}
