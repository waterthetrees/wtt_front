import { Alert } from '@mui/material';
import React, { useState } from 'react';
import { CarbonCalculator } from './CarbonCalculator';
import TreeHeader from './TreeHeader';
import TreeHealth from './TreeHealth';
import TreeHistory from './TreeHistory';
import { ImageLoad, setFormatImagePath } from './TreeImage';
import TreeInfo from './TreeInfo';
import TreeLinks from './TreeLinks';
import TreeMaintenance from './TreeMaintenance';
import TreeNotes from './TreeNotes';
import TreeRemoval from './TreeRemoval';

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
  const { scientific } = currentTreeData || {};
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
  const imagePath = setFormatImagePath(scientific);
  const [isMaintenanceAlertVisible, setMaintenanceAlertVisible] = useState(false)
  const [maintenanceAlert, setMaintenanceAlert] = useState(null)

  const handleMaintenanceAlert = (data) => {
    setMaintenanceAlertVisible(true)
    setMaintenanceAlert(data)

    setTimeout(() => {
      setMaintenanceAlert(null);
      setMaintenanceAlertVisible(false);
    }, 10000);
  }

  const closeMaintenanceAlert = () => {
    setMaintenanceAlertVisible(false);
    setMaintenanceAlert(null);
  };

  return (
    <div>
      {isMaintenanceAlertVisible &&
        maintenanceAlert
      }
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

            <ImageLoad src={imagePath} placeholder="placeholder.jpg" />

            {!hasUnfitData && (
              <TreeHealth
                currentTreeData={currentTreeData}
                isTreeQueryError={isTreeQueryError}
              />
            )}

            {!hasUnfitData && (
              <TreeNotes
                currentTreeData={currentTreeData}
                isTreeQueryError={isTreeQueryError}
              />
            )}

            {!hasUnfitData && (
              <TreeMaintenance
                currentTreeData={currentTreeData}
                isTreeQueryError={isTreeQueryError}
                closeTreeDetails={handleClose}
                maintenanceAlert={handleMaintenanceAlert}
                closeMaintenanceAlert={closeMaintenanceAlert}
              />
            )}

            {currentTreeId && <TreeHistory currentTreeId={currentTreeId} />}

            <TreeInfo currentTreeData={currentTreeData} />

            <TreeLinks currentTreeData={currentTreeData} />

            <CarbonCalculator currentTreeData={currentTreeData} />

            {!hasUnfitData && (
              <TreeRemoval
                currentTreeData={currentTreeData}
                isTreeQueryError={isTreeQueryError}
              />
            )}

          </>
        ) : (
          noDataChild
        )}
      </TreeDetailsContainer>
    </div>
  );
}
