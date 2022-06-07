/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import format from 'date-fns/format';
import { useAuth0 } from '@auth0/auth0-react';
import useAuthUtils from '@/components/Auth/useAuthUtils';
// import Fade from '@mui/material/Fade';
import AdoptLikeCheckboxes from '@/pages/Tree/AdoptLikeCheckboxes';
import TreeEdit from './TreeEdit';

export default function TreeHeader({
  currentTreeData,
  isTreeQueryError,
  hasUnfitData,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isAuthenticated } = useAuth0();
  const { loginToCurrentPage } = useAuthUtils();
  const {
    id,
    common,
    scientific,
    genus,
    datePlanted,
    dbh,
    height,
    planted,
    count,
    treeImage,
  } = currentTreeData;
  const wikipediaLink = `https://en.wikipedia.org/wiki/${scientific}`;
  // format() will throw an exception if datePlanted is undefined, so check it first.
  const plantDate =
    datePlanted || planted
      ? format(new Date(datePlanted || planted), 'MMMM d, yyyy')
      : null;
  const closeDialog = () => setIsDialogOpen(false);

  const handleEditClick = () => {
    if (!isAuthenticated) {
      loginToCurrentPage();
    } else {
      setIsDialogOpen(true);
    }
  };
  // console.log('treeImages exist', treeImage[scientific] === scientific);
  // console.log('treeImages[scientific]', scientific, treeImages[scientific]);

  // useEffect(() => {
  //   if (!treeImages[scientific]) return;
  //   setTreeImage(treeImages[scientific]);
  // }, [scientific]);

  // console.log('treeImage', treeImage);
  return (
    <>
      <div className="text-left">
        {common && <h1>{common}</h1>}

        <div>
          {scientific && (
            <h2>
              <a
                href={wikipediaLink}
                name={wikipediaLink}
                target="_blank"
                rel="noreferrer"
              >
                {scientific}
              </a>
            </h2>
          )}
          {scientific !== genus && <h2>{genus}</h2>}
          {height && <h5>Height: {height}</h5>}
          {dbh && <h5 title="Diameter at breast height">DBH: {dbh}</h5>}
          {(datePlanted || planted) && <h5>Planted: {plantDate}</h5>}
          {count > 1 && <h5 title="Count">Count: 1/{count}</h5>}
          {scientific && treeImage && <img src={treeImage} alt={treeImage} />}
        </div>
      </div>

      {!hasUnfitData && (
        <AdoptLikeCheckboxes
          currentTreeData={currentTreeData}
          edit={handleEditClick}
          isTreeQueryError={isTreeQueryError}
        />
      )}

      {isDialogOpen && (
        <TreeEdit
          open={isDialogOpen}
          currentTreeId={id}
          currentTreeData={currentTreeData}
          onConfirm={closeDialog}
          onCancel={closeDialog}
          isTreeQueryError={isTreeQueryError}
        />
      )}
    </>
  );
}
