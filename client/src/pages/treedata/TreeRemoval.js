import React, { useState, useRef, useEffect } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import format from 'date-fns/format';
import './TreeData.scss';
import { useAuth0 } from '@auth0/auth0-react';

export default function TreeRemoval({
  idTree, common, notes,
  mutateTreeData, mutateHistory,
}) {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const mountedRef = useRef(true);
  const commentRef = useRef('');
  const [reallyDelete, setReallyDelete] = useState(false);
  const [showDelete, setShowDelete] = useState(true);
  const [reasonForRemoval, setReasonForRemoval] = useState(false);
  const [reason, setReason] = useState(false);
  const [message, setMessage] = useState('Are you sure you want to remove this tree?');

  const handleReason = () => {
    if (!isAuthenticated) loginWithRedirect();
    setReasonForRemoval(!reasonForRemoval);
  };

  const handleRemoveTree = (event) => {
    event.preventDefault();
    if (!isAuthenticated) loginWithRedirect();
    setReason(event.target.name);
    setReallyDelete(true);
  };

  const handleYesRemoveTree = async () => {
    const functionName = 'handleRemoveTree';

    try {
      const today = new Date().toISOString().slice(0, 10);
      const dateVisit = format(new Date(), 'yyyy/MM/dd HH:mm:ss');
      const comment = (commentRef.current && commentRef.current.value)
        ? commentRef.current.value
        : reason;

      const sendTreeHistory = {
        idTree,
        date_visit: dateVisit,
        comment: `${common} was removed - ${comment}`,
        volunteer: user.nickname,
      };
      const sendTreeData = {
        idTree,
        common: 'VACANT SITE',
        scientific: '',
        genus: '',
        email: user.email,
        health: 'vacant',
        notes,
        datePlanted: dateVisit,
        // TODO: SHOULD NOTES OF PREVIOUS TREE BE DELETED or concated
      };
      const newNote = `${common} was removed by ${user.nickname} ${today} - ${comment}`;
      sendTreeData.notes = (notes && notes !== newNote)
        ? `${newNote}, ${notes}`
        : newNote;

      setMessage(`Removing ${common}.`);

      mutateHistory.mutate(sendTreeHistory);
      mutateTreeData.mutate(sendTreeData);
      setReallyDelete(false);
      setShowDelete(false);
      setMessage('');
      return sendTreeData;
    } catch (err) {
      console.error('CATCH', functionName, 'err', err);
      return err;
    }
  };

  useEffect(() => () => {
    mountedRef.current = false;
  }, []);

  return (
    <div className="treeremoval">
      {showDelete && (
        <Button
          className="treeremoval-btn"
          size="small"
          color="warning"
          id="removeTree"
          name="removeTree"
          onClick={handleReason}
        >
          Remove this
          {' '}
          {common}
        </Button>
      )}
      {reasonForRemoval && (
        <div className="treeremoval__reason">
          <div><h4>Reason For Removal?</h4></div>
          <span>
            <ButtonGroup className="treeremoval__reason-btngrp">

              <Button
                name="NoWater"
                className="treeremoval__reason-btn btn-md"
                onClick={handleRemoveTree}
              >
                No Water
              </Button>
              <Button
                name="Dead"
                className="treeremoval__reason-btn btn-dark btn-md"
                onClick={handleRemoveTree}
              >
                Dead
              </Button>
              <Button
                name="Insects/Disease"
                className="treeremoval__reason-btn btn-md"
                onClick={handleRemoveTree}
              >
                Insects/Disease
              </Button>

            </ButtonGroup>
            <input
              ref={commentRef}
              placeholder="Other"
              name="otherreason"
              id="otherreason"
              className="treeremoval__reason-input"
              onBlur={handleRemoveTree}
            />

          </span>
        </div>
      )}

      {reallyDelete && (
        <span>
          <div><h3>{message}</h3></div>
          <Button
            className="treeremoval-btn"
            size="small"
            color="danger"
            id="yesRemoveTree"
            name="yesRemoveTree"
            onClick={handleYesRemoveTree}
          >
            Yes
          </Button>
          <Button
            className="treeremoval-btn"
            size="small"
            color="secondary"
            id="noRemoveTree"
            name="noRemoveTree"
            onClick={() => setReallyDelete(false)}
          >
            No
          </Button>
        </span>
      )}

    </div>
  );
}
