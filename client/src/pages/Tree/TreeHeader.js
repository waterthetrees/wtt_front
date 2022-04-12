/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import format from 'date-fns/format';
import { useAuth0 } from '@auth0/auth0-react';
import TreeLikeAdoptEditButtons from '@/pages/Tree/TreeLikeAdoptEditButtons';
import { useTreeHistoryMutation, useCreateOrUpdateTree } from '@/api/queries';
import TreeEdit from './TreeEdit';

function noNulls(object) {
  return Object.keys(object).reduce((result, key) => {
    const value = object[key];

    // eslint-disable-next-line no-param-reassign
    result[key] = value === null || value === undefined
      ? ''
      : value;

    return result;
  }, {});
}

const vacantPattern = /vacant/i;

export default function TreeHeader({ currentTreeData, hasUnfitData }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAuth0();
  const createOrUpdateTree = useCreateOrUpdateTree();
  const mutateHistory = useTreeHistoryMutation();
  const {
    id, common, scientific, genus, datePlanted, dbh, height,
  } = currentTreeData;
  const wikipediaLink = `https://en.wikipedia.org/wiki/${scientific}`;
  // React will complain about defaulting value on an input to null (which may be returned by the
  // backend), so convert any nulls or undefineds to ''.
  const initialValues = noNulls({
    common, scientific, genus, height, dbh,
  });
  // The default values to show in the edit dialog.
  const defaultValues = {
    ...initialValues,
    newTree: false,
  };
  // format() will throw an exception if datePlanted is undefined, so check it first.
  const planted = datePlanted
    ? format(new Date(datePlanted), 'MMMM d, yyyy')
    : null;

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleConfirm = async (formData) => {
    closeDialog();

    // Extract the newTree boolean, since we don't want to send it to the backend.
    const { newTree, ...data } = formData;

    // Only update the backend if the values have actually changed.  If the new tree checkbox is on
    // and the names haven't changed, that just means tree's been replaced with the same type.
    if (JSON.stringify(data) !== JSON.stringify(initialValues) || newTree) {
      const sendTreeData = { id, ...data };

      if (newTree) {
        sendTreeData.datePlanted = format(new Date(), 'yyyy-MM-dd');
      }

      // Wait for the tree to be created or updated before adding to its history below.
      await createOrUpdateTree(sendTreeData);

      if (!vacantPattern.test(data.common)) {
        // eslint-disable-next-line no-nested-ternary
        const comment = newTree
          ? `This ${common} was replaced with ${data.common}.`
          : common !== data.common
            ? `This ${common} name was changed to ${data.common}.`
            : `The attributes of this ${common} were changed.`;
        const sendTreeHistory = {
          id,
          date_visit: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
          comment,
          volunteer: user.nickname,
        };

        mutateHistory.mutate(sendTreeHistory);
      }
    }
  };

  return (
    <>
      <div className="text-left">
        {common && (
          <h1>
            {common}
          </h1>
        )}

        <div>
          {scientific && <h2><a href={wikipediaLink} name={wikipediaLink} target="_blank" rel="noreferrer">{scientific}</a></h2>}
          {(scientific !== genus) && <h2>{genus}</h2>}
          {height && <h5>Height: {height}</h5>}
          {dbh && <h5 title="Diameter at breast height">DBH: {dbh}</h5>}
          {datePlanted && <h5>Planted: {planted}</h5>}
        </div>

      </div>

      {/* Don't show the like/adopt/edit buttons if there's bad data or the user isn't signed in. */}
      {(!hasUnfitData && user) && (
        <TreeLikeAdoptEditButtons
          currentTreeData={currentTreeData}
          edit={openDialog}
        />
      )}

      {isDialogOpen && (
        <TreeEdit
          open={isDialogOpen}
          defaultValues={defaultValues}
          onConfirm={handleConfirm}
          onCancel={closeDialog}
        />
      )}
    </>
  );
}
