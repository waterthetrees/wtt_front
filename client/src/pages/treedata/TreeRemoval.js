import React, { useState } from 'react';
import { Button } from '@mui/material';
import format from 'date-fns/format';
import { useAuth0 } from '@auth0/auth0-react';
import { useTreeDataMutation, useTreeHistoryMutation } from '@/api/queries';
import TreeRemovalDialog from './TreeRemovalDialog';
import useAuthUtils from '@/components/Auth/useAuthUtils';

export default function TreeRemoval({ idTree, common, notes }) {
  const { user = {}, isAuthenticated } = useAuth0();
  const [showRemoveButton, setShowRemoveButton] = useState(true);
  const [showRemovalDialog, setShowRemovalDialog] = useState(false);
  const mutateTreeData = useTreeDataMutation();
  const mutateHistory = useTreeHistoryMutation();
  const { loginToCurrentPage } = useAuthUtils();

  const handleRemoveClick = () => {
    if (!isAuthenticated) {
      loginToCurrentPage();
    } else {
      setShowRemovalDialog(true);
    }
  };

  const handleConfirm = ({ comment }) => {
    const functionName = 'handleRemoveTree';

    try {
      const now = Date.now();
      const today = format(now, 'yyyy-MM-dd');
      const dateVisit = format(now, 'yyyy-MM-dd HH:mm:ss');
      const sendTreeHistory = {
        idTree,
        date_visit: dateVisit,
        comment: `${common} was removed - ${comment}`,
        volunteer: user.nickname,
      };
      const sendTreeData = {
        idTree,
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
        ? `${notes ? notes + '\n' : ''}${newNote}`
        : newNote;

      mutateHistory.mutate(sendTreeHistory);
      mutateTreeData.mutate(sendTreeData);

      setShowRemoveButton(false);
    } catch (err) {
      console.error('CATCH', functionName, 'err', err);
    }
  };

  return (
    <div>
      {showRemoveButton && (
        <Button
          variant="contained"
          onClick={handleRemoveClick}
          sx={{
            my: 2,
            '&, &:hover': {
              backgroundColor: '#666666',
            },
          }}
        >
          Remove this
          {' '}
          {common}
        </Button>
      )}
      {showRemovalDialog && (
        <TreeRemovalDialog
          open={showRemovalDialog}
          setOpen={setShowRemovalDialog}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
