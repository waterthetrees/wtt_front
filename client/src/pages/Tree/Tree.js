 import React from 'react';
import { Alert } from '@mui/material';
import TreeHeader from './TreeHeader';
import TreeMaintenance from './TreeMaintenance';
import TreeRemoval from './TreeRemoval';
import TreeHealth from './TreeHealth';
import TreeNotes from './TreeNotes';
import TreeHistory from './TreeHistory';
import TreeInfo from './TreeInfo';
import TreeLinks from './TreeLinks';

const undefRequiredField = ((requiredField) => typeof requiredField === 'undefined');

export const checkForUnfitData = (currentTreeData) => [currentTreeData?.common,
  currentTreeData?.scientific]
  .some(undefRequiredField)
    || ['vacant',
      'vacant site',
      'unsuitable site',
      'asphalted well',
      'planting site',
      'other',
      '#n/a', '::'].includes(currentTreeData?.common.toLowerCase());
  // Common name field has inconsistent data when a tree's missing.
  // Until we clean up the data on the way into the vector tiles,
  // We'll add it here so that Maintenance/Health/removal don't render.

export default function Tree({
  TreeDetailsContainer, drawerWidth, currentTreeData,
  currentTreeId, setCurrentTreeId, isTreeQueryError,
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

  // Check for missing or malformed common and scientific names.
  const hasUnfitData = checkForUnfitData(currentTreeData);

  const handleClose = () => setCurrentTreeId(null);

  return (
    <TreeDetailsContainer
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
              hasUnfitData={hasUnfitData}
            />

            {!hasUnfitData && (
              <TreeHealth
                currentTreeData={currentTreeData}
              />
            )}

            {!hasUnfitData && (
              <TreeNotes
                currentTreeData={currentTreeData}
              />
            )}

            {!hasUnfitData && (
              <TreeMaintenance
                currentTreeData={currentTreeData}
              />
            )}

            <TreeHistory
              currentTreeData={currentTreeData}
            />

            <TreeInfo
              currentTreeData={currentTreeData}
            />

            <TreeLinks
              currentTreeData={currentTreeData}
            />

            {!hasUnfitData && (
              <TreeRemoval
                currentTreeData={currentTreeData}
              />
            )}
          </>
        )
        : noDataChild}
    </TreeDetailsContainer>
  );
}
