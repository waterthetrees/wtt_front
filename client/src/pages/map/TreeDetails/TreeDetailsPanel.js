import React from 'react';
import { Alert } from '@mui/material';
import CoreData from './CoreData';
import MaintainTree from './MaintainTree';
import RemoveTree from './RemoveTree';
import Health from './Health';
import Notes from './Notes';
import History from './History';
import Info from './Info';

export default function TreeDetailsPanel({
  Container, drawerWidth, currentTreeData, currentTreeId, setCurrentTreeId, isTreeQueryError,
}) {
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
