import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useTreeQuery } from '../../api/queries';
import ScrollableDialog from '../../components/ScrollableDialog/ScrollableDialog';
import AdoptLikeCheckboxes from './TreeAdoptionLike';
import TreeHeaderForm from './TreeDataEdit';
import TreeRemoval from './TreeRemoval';
import TreeHeader from './TreeHeader';
import TreeHealthSlider from './TreeHealth';
import TreeNotes from './TreeNotes';
import TreeCare from './TreeCare';
import { TreeInfo } from './TreeInfo';
import { treeHealth } from '../../util/treeHealth';
import './TreeData.scss';

const TreeContent = ({ currentTreeId, map }) => {
  const [editTree, setEditTree] = useState(false);
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { data: treeData } = useTreeQuery({ currentTreeId });

  if (!treeData) {
    return null;
  }

  const edit = () => {
    if (!isAuthenticated) loginWithRedirect();
    setEditTree(!editTree);
  };

  const {
    idTree,
    common,
    scientific,
    genus,
    datePlanted,
    healthNum,
    address,
    city,
    neighborhood,
    lat,
    lng,
    owner,
    idReference,
    who,
    country,
    zip,
    notes,
  } = treeData;
  // If the tree has a healthNum value but no health, look up the corresponding string.
  const health = typeof treeData.health === 'string'
    ? treeData.health
    : treeHealth.getNameByValue(healthNum);
  const vacant = ['vacant', 'vacant site', 'unsuitable site', 'asphalted well'].includes(common.toLowerCase());
  // TODO: pass idTree or currentTreeId to children?  should be consistent.
  return (
    <div className="tree text-center">
      {!editTree && (
        <TreeHeader
          treeData={treeData}
          vacant={vacant}
          edit={edit}
        />
      )}

      {editTree && (
        <TreeHeaderForm
          idTree={idTree}
          common={common}
          scientific={scientific}
          genus={genus}
          treeData={treeData}
          datePlanted={datePlanted}
          setEditTree={setEditTree}
        />
      )}

      <AdoptLikeCheckboxes
        idTree={idTree}
        common={common}
      />

      {!vacant && (
        <TreeHealthSlider
          currentTreeId={currentTreeId}
          common={common}
          health={health}
          healthNum={healthNum}
          lng={lng}
          lat={lat}
          map={map}
        />
      )}

      <TreeNotes
        currentTreeId={currentTreeId}
        notes={notes}
      />

      {!vacant && (
        <TreeCare
          currentTreeId={currentTreeId}
          common={common}
          health={health}
        />
      )}

      <TreeInfo
        address={address}
        city={city}
        zip={zip}
        country={country}
        neighborhood={neighborhood}
        lng={lng}
        lat={lat}
        idReference={idReference}
        owner={owner}
        who={who}
      />

      {!vacant && (
        <TreeRemoval
          idTree={idTree}
          common={common}
          notes={notes}
        />
      )}
    </div>
  );
};

export default function TreeData({ map, currentTreeId, setCurrentTreeId }) {
  const handleClose = () => setCurrentTreeId(null);

  return (
    <ScrollableDialog
      title="Tree Inspector"
      open={!!currentTreeId}
      onClose={handleClose}
    >
      <TreeContent
        currentTreeId={currentTreeId}
        map={map}
      />
    </ScrollableDialog>
  );
}
