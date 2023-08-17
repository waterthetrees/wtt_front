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
import TreeSubmit from './TreeSubmit';
import apiEndpoints from '../../api/apiEndpoints';

export default function TreeMaintenancePage({
  currentTreeData,
  currentTreeId,
  hasUnfitData,
  isTreeQueryError,
}) {
  const { scientific } = currentTreeData || {};

  const imagePath = setFormatImagePath(scientific);

  const [imgs, setImgs] = useState([]);

  const addImg = (url) => {
    let fileURL = "";
    fileURL = window.URL.createObjectURL(url);
    setImgs([...imgs, fileURL]);
  };

  const removeImg = (idx) => {
    const newImgs = [...imgs];
    newImgs.splice(idx, 1);
    setImgs(newImgs);
  };

  const uploadImgs = async () => {
    // We could show an error on
    // failure to POST, but currently
    // we just catch and ignore.
    try {
      const resp = await fetch(apiEndpoints.treeimages, {
        method: "POST",
        body: JSON.stringify({
          idImage: currentTreeId,
          // TODO: This should actually be
          // offset by the # of imgs
          // currently associated with
          // the image.
          imageNumbers: [...imgs.keys()]
        })
      });
      console.log(resp);
    } catch (err) {
      console.log(err);
    }
    setImgs([]);
  };

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

      <PhotoGallery
        imgs={imgs}
        columns={2}
        handleAdd={addImg}
        handleRemove={removeImg}
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

      <TreeSubmit uploadURL={uploadImgs} />
    </div>
  );
}