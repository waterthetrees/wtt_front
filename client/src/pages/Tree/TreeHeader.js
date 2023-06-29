/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useAuthUtils from '@/components/Auth/useAuthUtils';
import AdoptLikeCheckboxes from '@/pages/Tree/AdoptLikeCheckboxes';
import TreeEdit from './TreeEdit';
import { format } from 'date-fns';
import './TreeHeader.scss';

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
  } = currentTreeData;

  const wikipediaLink = `https://en.wikipedia.org/wiki/${scientific}`;

  // format() will throw an exception if datePlanted is undefined, so check it first.
  const plantedDate = datePlanted || planted || new Date();
  const formatPlantedDate = format(new Date(plantedDate), 'yyyy-MM-dd');

  const closeDialog = () => setIsDialogOpen(false);

  const handleEditClick = () => {
    if (!isAuthenticated) {
      loginToCurrentPage();
    } else {
      setIsDialogOpen(true);
    }
  };
  return (
    <>
      <div className="text-left">
        {common && <h1>{common}</h1>}

        <div>
          {scientific && (
            <h3>
              <a
                href={wikipediaLink}
                name={wikipediaLink}
                target="_blank"
                rel="noreferrer"
              >
                {scientific}
              </a>
            </h3>
          )}
          {scientific !== genus && <h2>{genus}</h2>}
          {height && <h5>Height: {height}</h5>}
          {dbh && <h5 className='dbh' title="Diameter at breast height">DBH: {dbh}</h5>}
          {(datePlanted || planted) && <h5>Planted: {formatPlantedDate}</h5>}
          {count > 1 && <h5 title="Count">Count: 1/{count}</h5>}
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
