import { Alert } from '@mui/material';
import React from 'react';

import TreeHeader from './TreeHeader';
import TreeChipList from './TreeChipList';
import TreeMaintenancePage from './TreeMaintenancePage';

const undefRequiredField = (requiredField) =>
  typeof requiredField === 'undefined';

export const checkForUnfitData = (currentTreeData) =>
  [currentTreeData?.common, currentTreeData?.scientific].some(
    undefRequiredField,
  ) ||
  [
    'vacant',
    'vacant site',
    'unsuitable site',
    'asphalted well',
    'planting site',
    'other',
    '#n/a',
    '::',
  ].includes(currentTreeData?.common.toLowerCase());
// Common name field has inconsistent data when a tree's missing.
// Until we clean up the data on the way into the vector tiles,
// We'll add it here so that Maintenance/Health/removal don't render.

export default function Tree({
  TreeDetailsContainer,
  drawerWidth,
  currentTreeData,
  currentTreeId,
  setCurrentTreeId,
  isTreeQueryError,
}) {
  // If a tree is selected but there was an error in fetching the data, show an error message.
  // Otherwise, show a blank panel while waiting for the data.
  const noDataChild =
    currentTreeId && isTreeQueryError ? (
      <Alert severity="error" sx={{ fontSize: '1.2rem' }}>
        No data is available for this tree.
      </Alert>
    ) : null;

  // check for malformed, missing common, scientific names, vacant sites, etc.
  const hasUnfitData = checkForUnfitData(currentTreeData);

  const handleClose = () => setCurrentTreeId(null);
  return (
    <TreeDetailsContainer
      title="Tree Details"
      width={drawerWidth}
      open={!!currentTreeId}
      onClose={handleClose}
    >
      {currentTreeData ? (
        <>
          <TreeHeader
            currentTreeData={currentTreeData}
            hasUnfitData={hasUnfitData}
            isTreeQueryError={isTreeQueryError}
          />

          <TreeChipList />

          <TreeMaintenancePage
            currentTreeData={currentTreeData}
            currentTreeId={currentTreeId}
            hasUnfitData={hasUnfitData}
            isTreeQueryError={isTreeQueryError}
          />
        </>
      ) : (
        noDataChild
      )}
    </TreeDetailsContainer>
  );
}
