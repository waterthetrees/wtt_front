import React, { useState } from 'react';
import { Modal, ModalFooter, ModalHeader } from 'reactstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { useTreeQuery } from '../../api/queries';
import AdoptLikeCheckboxes from './TreeAdoptionLike';
import TreeHeaderForm from './TreeDataEdit';
import TreeRemoval from './TreeRemoval';
import TreeHeader from './TreeHeader';
import TreeHealthSlider from './TreeHealth';
import TreeNotes from './TreeNotes';
import TreeCare from './TreeCare';
import { TreeLocation, TreeMoreInfo } from './TreeInfo';
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
    health,
    healthNum,
    address,
    city,
    neighborhood,
    lat,
    lng,
    owner,
    idReference,
    who,
    dbh,
    height,
    country,
    zip,
    notes,
  } = treeData;

  // TODO: pass idTree or currentTreeId to children?  should be consistent.
  return (
    <div className="tree text-center">
      <div className="tree__header">
        {!editTree && (
          <TreeHeader
            idTree={idTree}
            common={common}
            scientific={scientific}
            genus={genus}
            datePlanted={datePlanted}
            dbh={dbh}
            height={height}
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
      </div>

      <hr className="divider-solid" />

      <div className="tree__body">
        <TreeHealthSlider
          currentTreeId={currentTreeId}
          common={common}
          health={health}
          healthNum={healthNum}
          lng={lng}
          lat={lat}
          map={map}
        />

        <TreeNotes
          currentTreeId={currentTreeId}
          notes={notes}
        />

        <TreeCare
          currentTreeId={currentTreeId}
          common={common}
          health={health}
        />

        <TreeLocation
          address={address}
          city={city}
          zip={zip}
          country={country}
          neighborhood={neighborhood}
          lng={lng}
          lat={lat}
          owner={owner}
        />

        <TreeMoreInfo
          owner={owner}
          idReference={idReference}
          who={who}
        />

        {!common.includes('VACANT') && (
          <TreeRemoval
            idTree={idTree}
            common={common}
            notes={notes}
          />
        )}
      </div>
    </div>
  );
};

export default function TreeData({
  currentTreeId, showTree, setShowTree, map,
}) {
  const toggle = () => setShowTree(!showTree);

  return (
    <Modal
      className="tree__modal"
      isOpen={showTree}
      toggle={toggle}
    >
      <ModalHeader toggle={toggle} />
      <TreeContent
        currentTreeId={currentTreeId}
        map={map}
      />
      <ModalFooter />
    </Modal>
  );
}
