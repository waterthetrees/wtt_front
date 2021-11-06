import { useAuth0 } from '@auth0/auth0-react';
import React, { useRef, useState } from 'react';
import { Button } from 'reactstrap';
import cx from 'clsx';
import { saveTimer } from './treeDataUtils';
import { useTreeDataMutation } from '../../api/queries';

export default function TreeNotes({ notes, currentTreeId }) {
  const { isAuthenticated } = useAuth0();
  const [showSave, setShowSave] = useState(false);
  const [notesButtonStyle, setNotesButtonStyle] = useState('btn-light');
  const [notesSaveButton, setNotesSaveButton] = useState('SAVE');
  const mutateTreeData = useTreeDataMutation();
  const notesRef = useRef();

  const handleOnChange = () => {
    if (notesRef.current.value !== notes) {
      setShowSave(true);
    }
  };

  const handleNotesSave = () => {
    setNotesSaveButton('SAVE');
    setNotesButtonStyle('btn-light');
    setShowSave(false);
  };

  const handleNotesSubmit = async (event) => {
    event.preventDefault();

    try {
      if (notesRef.current.value) {
        const sendData = { idTree: currentTreeId, notes: notesRef.current.value };

        setNotesButtonStyle('btn-info');
        setNotesSaveButton('SAVING');
        mutateTreeData.mutate(sendData);
        setTimeout(() => handleNotesSave(), saveTimer);
      }
    } catch (err) {
      console.error('\n CATCH', err);
    }
  };

  return (
    <div className="flex-grid border-top">
      <div className="text-center treehistory-list">
        <h4>Tree Notes</h4>
      </div>
      <div className="flex-grid tree__status__note">
        {!isAuthenticated && (<h5>{notes}</h5>)}
        {isAuthenticated && (
          <form id="treenote" onSubmit={handleNotesSubmit}>
            <textarea
              className="form-control tree__status__textarea"
              ref={notesRef}
              id="notes"
              aria-label="Tree Notes"
              defaultValue={notes}
              onChange={handleOnChange}
            />
            {showSave && (
              <div className="tree__status text-right">
                <Button
                  type="submit"
                  className={cx('btn-lg', notesButtonStyle)}
                >
                  {notesSaveButton}
                </Button>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
