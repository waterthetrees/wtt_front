import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { RemoveCircle } from '@mui/icons-material';
import format from 'date-fns/format';
import { useTreeHistoryMutation, useCreateOrUpdateTree } from '@/api/queries';
import useAuthUtils from '@/components/Auth/useAuthUtils';
import TreeRemovalDialog from './TreeRemovalDialog';

export default function RemoveTree({ currentTreeData: { id, common, notes } }) {
  const { user = {}, isAuthenticated } = useAuth0();
  const { loginToCurrentPage } = useAuthUtils();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const createOrUpdateTree = useCreateOrUpdateTree();
  const mutateHistory = useTreeHistoryMutation();

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleClick = () => {
    if (!isAuthenticated) {
      loginToCurrentPage();
    } else {
      openDialog();
    }
  };

  const handleConfirm = async ({ comment }) => {
    const now = Date.now();
    const today = format(now, 'yyyy-MM-dd');
    const dateVisit = format(now, 'yyyy-MM-dd HH:mm:ss');
    const sendTreeData = {
      id,
      common: 'Vacant Site',
      scientific: '',
      genus: '',
      email: user.email,
      health: 'vacant',
      notes,
      datePlanted: dateVisit,
    };
    const sendTreeHistory = {
      id,
      date_visit: dateVisit,
      comment: `${common} was removed - ${comment}`,
      volunteer: user.nickname,
    };
    const newNote = `${common} was removed by ${user.nickname} ${today} - "${comment}"`;

    sendTreeData.notes = (notes && notes !== newNote)
      ? `${notes
        ? `${notes}\n`
        : ''}${newNote}`
      : newNote;

    // Wait for the tree's data to be updated/created, and then add a history entry.
    await createOrUpdateTree(sendTreeData);
    mutateHistory.mutate(sendTreeHistory);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        startIcon={<RemoveCircle />}
        onClick={handleClick}
      >
        Remove Tree
      </Button>
      {isDialogOpen && (
        <TreeRemovalDialog
          open={isDialogOpen}
          onConfirm={handleConfirm}
          onCancel={closeDialog}
        />
      )}
    </>
  );
}
