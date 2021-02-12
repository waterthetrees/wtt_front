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
    console.log('event', event.target.name);
    if (!isAuthenticated) loginWithRedirect();
    setReason(event.target.name);
    setReallyDelete(true);
  };

  // console.log('user', user);
  const handleYesRemoveTree = async (event) => {
    const functionName = 'handleRemoveTree';

    console.log('event', event);
    try {
      const today = new Date().toISOString().slice(0, 10);
      const dateVisit = format(new Date(), 'yyyy/MM/dd HH:mm:ss');
      const comment = (commentRef.current && commentRef.current.value)
        ? commentRef.current.value
        : reason;

      console.log('comment', comment);
      console.log('commentRef', commentRef.current.value);

      const sendTreeHistory = {
        idTree,
        date_visit: dateVisit,
        comment: `${common} was removed - ${comment}`,
        volunteer: user.nickname,
      };
      // console.log(functionName, 'sendTreeHistory', sendTreeHistory);
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
      sendTreeData.notes = (notes)
        ? `${common} was removed by ${user.nickname} ${today} - ${comment}, ${notes}`
        : `${common} was removed by ${user.nickname} ${today} - ${comment}`;

      setMessage(`Removing ${common}.`);

      mutateHistory.mutate(['treehistory', sendTreeHistory]);
      mutateTreeData.mutate(['tree', sendTreeData]);
      setReallyDelete(false);
      setShowDelete(false);
      setMessage('');
      // setTimeout(() => setReallyDelete(false), 500);
      // setTimeout(() => setShowDelete(false), 2000);
      // setTimeout(() => setMessage(''), 1900);
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
              id="comment"
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
