import React, { useState, useRef, useEffect } from 'react';
import { ToggleButton, ToggleButtonGroup, Button } from '@mui/material';
import format from 'date-fns/format';
import { useAuth0 } from '@auth0/auth0-react';
import { useTreeDataMutation, useTreeHistoryMutation } from '../../api/queries';

export default function TreeRemoval({ idTree, common, notes }) {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const mountedRef = useRef(true);
  const commentRef = useRef('');
  const [reallyDelete, setReallyDelete] = useState(false);
  const [showDelete, setShowDelete] = useState(true);
  const [reasonForRemoval, setReasonForRemoval] = useState(false);
  const [reason, setReason] = useState(null);
  const [message, setMessage] = useState('Are you sure you want to remove this tree?');
  const mutateTreeData = useTreeDataMutation();
  const mutateHistory = useTreeHistoryMutation();

  const handleReason = () => {
    if (!isAuthenticated) loginWithRedirect();
    setReasonForRemoval(!reasonForRemoval);
  };

  const handleRemoveTree = (event, value) => {
    event.preventDefault();
    if (!isAuthenticated) loginWithRedirect();
    setReason(value);
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

      // TODO: use mutateAsync() here to wait for it to finish?
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
          variant="contained"
          id="removeTree"
          name="removeTree"
          onClick={handleReason}
          sx={{
            '&, &:hover': {
              backgroundColor: 'darkorange',
            }
          }}
        >
          Remove this {common}
        </Button>
      )}
      {reasonForRemoval && (
        <div className="treeremoval__reason">
          <div><h4>Reason For Removal?</h4></div>
          <span>
            <ToggleButtonGroup
              value={reason}
              exclusive
              onChange={handleRemoveTree}
              className="treeremoval__reason-btngrp"
            >
              {['No Water', 'Dead', 'Insects/Disease'].map((label) => (
                <ToggleButton
                  key={label}
                  value={label.replaceAll(' ', '')}
                  style={{ color: 'black' }}
                >
                  {label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>

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
            variant="contained"
            color="secondary"
            id="yesRemoveTree"
            name="yesRemoveTree"
            onClick={handleYesRemoveTree}
          >
            Yes
          </Button>
          <Button
            className="treeremoval-btn"
            variant="contained"
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
