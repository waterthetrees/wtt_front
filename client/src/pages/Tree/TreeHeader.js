/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import format from 'date-fns/format';
import { useAuth0 } from '@auth0/auth0-react';
import useAuthUtils from '@/components/Auth/useAuthUtils';
import AdoptLikeCheckboxes from '@/pages/Tree/AdoptLikeCheckboxes';

import TreeEdit from './TreeEdit';

export default function TreeHeader({ currentTreeData, vacant, isTreeQueryError }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isAuthenticated } = useAuth0();
  const { loginToCurrentPage } = useAuthUtils();
  const {
    id, common, scientific, genus, datePlanted, dbh, height,
  } = currentTreeData;
  const wikipediaLink = `https://en.wikipedia.org/wiki/${scientific}`;
  // format() will throw an exception if datePlanted is undefined, so check it first.
  const planted = datePlanted
    ? format(new Date(datePlanted), 'MMMM d, yyyy')
    : null;
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
        <h1>
          {common}
        </h1>
        {!vacant && (
          <div>
            <h2><a href={wikipediaLink} name={wikipediaLink} target="_blank" rel="noreferrer">{scientific}</a></h2>
            {(scientific !== genus) && <h2>{genus}</h2>}
            {height && <h5>Height: {height}</h5>}
            {dbh && <h5 title="Diameter at breast height">DBH: {dbh}</h5>}
            {datePlanted && <h5>Planted: {planted}</h5>}
          </div>
        )}
      </div>

      <AdoptLikeCheckboxes
        currentTreeData={currentTreeData}
        edit={handleEditClick}
        isTreeQueryError={isTreeQueryError}
      />

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
