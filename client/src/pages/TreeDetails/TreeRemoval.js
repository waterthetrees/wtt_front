import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { RemoveCircle } from '@mui/icons-material';
import format from 'date-fns/format';
import { useTreeDataMutation, useCreateTreeDataMutation, useTreeHistoryMutation } from '@/api/queries';
import useAuthUtils from '@/components/Auth/useAuthUtils';
import TreeRemovalDialog from './TreeRemovalDialog';

export default function RemoveTree({ currentTreeId, currentTreeData, isTreeQueryError }) {
  const { common, notes } = currentTreeData;
  const { user = {}, isAuthenticated } = useAuth0();
  const { loginToCurrentPage } = useAuthUtils();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const mutateTreeData = useTreeDataMutation();
  const mutateCreateTreeData = useCreateTreeDataMutation();
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

    const sendTreeData = {
      ...currentTreeData,
      common: 'Vacant Site',
      scientific: '',
      genus: '',
      email: user.email,
      health: 'vacant',
      notes,
      datePlanted: dateVisit,
    };
    const sendTreeHistory = {
      id: currentTreeData.id,
      date_visit: dateVisit,
      comment: `${common} was removed - ${comment}`,
      volunteer: user.nickname,
    };
    const newNote = `${common} was removed by ${user.nickname} ${today} - "${comment}"`;

    sendTreeData.notes = (notes && notes !== newNote)
      ? `${notes ? `${notes}\n` : ''}${newNote}`
      : newNote;
    delete sendTreeData.healthNum;
    if (isTreeQueryError) {
      mutateCreateTreeData.mutate(sendTreeData);
    } else {
      mutateTreeData.mutate(sendTreeData);
    }

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
