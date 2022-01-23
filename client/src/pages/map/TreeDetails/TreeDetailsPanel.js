import React, { useState } from 'react';
import { Alert, Box } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import useAuthUtils from '@/components/Auth/useAuthUtils';
import CoreData from './CoreData';
import CoreDataDialog from './CoreDataDialog';
import AdoptLikeCheckboxes from './AdoptLikeCheckboxes';
import MaintainTree from './MaintainTree';
import RemoveTree from './RemoveTree';
import Health from './Health';
import Notes from './Notes';
import History from './History';
import Info from './Info';

export default function TreeDetailsPanel({
  Container, drawerWidth, currentTreeData, currentTreeId, setCurrentTreeId, isTreeQueryError,
}) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const { isAuthenticated } = useAuth0();
  const { loginToCurrentPage } = useAuthUtils();
  // If a tree is selected but there was an error in fetching the data, show an error message.
  // Otherwise, show a blank panel while waiting for the data.
  const noDataChild = currentTreeId && isTreeQueryError
    ? (
      <Alert severity="error" sx={{ fontSize: '1.2rem' }}>
        No data is available for this tree.
      </Alert>
    )
    : null;
  let common = '';
  let vacant = false;

  if (currentTreeData) {
    common = currentTreeData.common;
    vacant = ['vacant', 'vacant site', 'unsuitable site', 'asphalted well'].includes(common.toLowerCase());
  }

  const handleClose = () => setCurrentTreeId(null);

  // TODO: this should be handled by CoreData
  const handleEditClick = () => {
    if (!isAuthenticated) {
      loginToCurrentPage();
    } else {
      setShowEditDialog(!showEditDialog);
    }
  };

  return (
    <Container
      title="Tree Details"
      width={drawerWidth}
      open={!!currentTreeId}
      onClose={handleClose}
    >
      {currentTreeData
        ? (
          <>
            <CoreData
              treeData={currentTreeData}
              vacant={vacant}
            />

            {showEditDialog && (
              <CoreDataDialog
                currentTreeId={currentTreeId}
                treeData={currentTreeData}
                showEditDialog={showEditDialog}
                setShowEditDialog={setShowEditDialog}
              />
            )}

            <AdoptLikeCheckboxes
              currentTreeId={currentTreeId}
              common={common}
              edit={handleEditClick}
            />

            {!vacant && (
              <MaintainTree
                currentTreeId={currentTreeId}
              />
            )}

            {!vacant && (
              <Health
                currentTreeData={currentTreeData}
                currentTreeId={currentTreeId}
              />
            )}

            <Notes
              currentTreeData={currentTreeData}
            />

            <History
              currentTreeId={currentTreeId}
            />

            <Info
              currentTreeData={currentTreeData}
            />

            {!vacant && (
              <RemoveTree
                currentTreeData={currentTreeData}
                currentTreeId={currentTreeId}
              />
            )}
          </>
        )
        : noDataChild}
    </Container>
  );
}
