import React, { useState } from 'react';
import { CarbonCalculator } from './CarbonCalculator';
import TreeHealth from './TreeHealth';
import TreeHistory from './TreeHistory';
import { ImageLoad, setFormatImagePath } from './TreeImage';
import TreeInfo from './TreeInfo';
import TreeLinks from './TreeLinks';
import TreeMaintenance from './TreeMaintenance';
import TreeNotes from './TreeNotes';
import TreeRemoval from './TreeRemoval';
import './TreeMaintenanceTab.scss';
import PhotoGallery from './PhotoGallery';
import TreeImageUpload from './TreeImageUpload';

export default function TreeMaintenancePage({
  currentTreeData,
  currentTreeId,
  hasUnfitData,
  isTreeQueryError,
}) {
  const { scientific } = currentTreeData || {};

  const imagePath = setFormatImagePath(scientific);

  const [imgs, setImgs] = useState([]);

  return (
    <div className='tree-maintenance-tab'>
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
        />
      )}

      <PhotoGallery imgs={imgs} columns={2} />

      <TreeImageUpload
        apiUploadURL={(url) => {
          let fileURL = "";
          if (typeof url === "string") {
            // do stuff
          }
          else {
            fileURL = window.URL.createObjectURL(url);
            setImgs([...imgs, fileURL]);
          }
        }}
        apiUploadDone={() => {}}
        apiPollUpload={() => {}}
        apiCancelUpload={() => {}}
        apiFileDialog={() => {}}
        isMobile={true}
      />

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
    </div>
  );
}