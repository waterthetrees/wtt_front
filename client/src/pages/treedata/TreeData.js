import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useTreeQuery } from '@/api/queries';
import ScrollableDialog from '@/components/ScrollableDialog/ScrollableDialog';
import AdoptLikeCheckboxes from './TreeAdoptionLike';
import TreeEditDialog from './TreeEditDialog';
import TreeRemoval from './TreeRemoval';
import TreeHeader from './TreeHeader';
import TreeHealthSlider from './TreeHealth';
import TreeNotes from './TreeNotes';
import TreeCare from './TreeCare';
import { TreeInfo } from './TreeInfo';
import { treeHealth } from '@/util/treeHealth';
import useAuthUtils from '@/components/Auth/useAuthUtils';
import './TreeData.scss';

const TreeContent = ({ currentTreeId, map }) => {
  console.log('TreeContent currentTreeId', currentTreeId);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const { isAuthenticated } = useAuth0();
  const { data: treeData } = useTreeQuery({ id: currentTreeId });
  const { loginToCurrentPage } = useAuthUtils();

  if (!treeData) {
    return null;
  }

  const edit = () => {
    if (!isAuthenticated) {
      loginToCurrentPage();
    } else {
      setShowEditDialog(!showEditDialog);
    }
  };

  const {
    id,
    common,
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
      <TreeHeader
        treeData={treeData}
        vacant={vacant}
        edit={edit}
      />

      {showEditDialog && (
        <TreeEditDialog
          currentTreeId={id}
          treeData={treeData}
          showEditDialog={showEditDialog}
          setShowEditDialog={setShowEditDialog}
        />
      )}

      <AdoptLikeCheckboxes
        currentTreeId={id}
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
        currentTreeId={id}
        notes={notes}
      />

      {!vacant && (
        <TreeCare
          currentTreeId={id}
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
          currentTreeId={id}
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
