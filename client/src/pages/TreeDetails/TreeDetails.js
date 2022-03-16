import React from 'react';
import { Alert } from '@mui/material';
import TreeHeader from './TreeHeader';
import TreeMaintenance from './TreeMaintenance';
import TreeRemoval from './TreeRemoval';
import TreeDetailsHealth from './TreeDetailsHealth';
import TreeNotes from './TreeNotes';
import TreeHistory from './TreeHistory';
import TreeInfo from './TreeInfo';

export default function TreeDetails({
  map,
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

  let vacant = false;

  if (currentTreeData?.common) {
    vacant = ['vacant',
      'vacant site',
      'unsuitable site',
      'asphalted well',
      'planting site',
      'other',
      '#n/a', '::'].includes(currentTreeData?.common.toLowerCase());
    // TODO Figure out these wierdos
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
            <TreeHeader
              currentTreeData={currentTreeData}
              vacant={vacant}
              isTreeQueryError={isTreeQueryError}
            />

            {!vacant && (
              <TreeDetailsHealth
                map={map}
                currentTreeData={currentTreeData}
                isTreeQueryError={isTreeQueryError}
              />
            )}

            <TreeNotes
              currentTreeData={currentTreeData}
              isTreeQueryError={isTreeQueryError}
            />

            {!vacant && (
              <TreeMaintenance
                currentTreeId={currentTreeId}
                currentTreeData={currentTreeData}
                isTreeQueryError={isTreeQueryError}
              />
            )}

            <TreeHistory
              currentTreeId={currentTreeId}
              currentTreeData={currentTreeData}
            />

            <TreeInfo
              currentTreeData={currentTreeData}
            />

            {!vacant && (
              <TreeRemoval
                currentTreeData={currentTreeData}
                currentTreeId={currentTreeId}
                isTreeQueryError={isTreeQueryError}
              />
            )}
          </>
        )
        : noDataChild}
    </Container>
  );
}
