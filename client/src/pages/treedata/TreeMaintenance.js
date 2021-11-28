import { useAuth0 } from '@auth0/auth0-react';
import React, { useRef, useState } from 'react';
import format from 'date-fns/format';
import { Button, ToggleButton, ToggleButtonGroup, styled } from '@mui/material';
import cx from 'clsx';
import { saveTimer } from '../../util/constants';
import { useTreeHistoryMutation } from '../../api/queries';

const treeImagesPath = 'assets/images/trees/';

const maintenanceActions = [
  ['water', 'watered'],
  ['weed', 'weeded'],
  ['mulch', 'mulched'],
  ['stake', 'staked'],
  ['brace', 'braced'],
  ['prune', 'pruned'],
];

const ActionGroup = styled(ToggleButtonGroup)`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 5px auto;
`;

const ActionButton = styled(ToggleButton)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 0 25%;
  padding: 5px;
  margin: 5px !important;
  border-radius: 4px !important;
  color: #fff !important;
  &, &:hover {
    background-color: #6c757d;
  }
  &.Mui-selected, &.Mui-selected:hover {
    background-color: #545b62;
  }
`;

const MaintenanceButtons = ({ actions, setActions }) => {
  function handleChange(event, newActions) {
    setActions(newActions);
  }

  return (
    <ActionGroup
      value={actions}
      onChange={handleChange}
    >
      {maintenanceActions.map(([action, pastAction]) => {
        const selected = actions.includes(pastAction);
        const label = selected ? pastAction : action;

        return (
          <ActionButton
            key={pastAction}
            value={pastAction}
          >
            <img src={`${treeImagesPath}${label}.svg`} />
            {label}
          </ActionButton>
        );
      })}
    </ActionGroup>
  );
};

export default function TreeMaintenance({ currentTreeId }) {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [showDoMaintenance, setShowDoMaintenance] = useState(false);
  const [actions, setActions] = useState([]);
  const [maintenanceButtonStyle, setMaintenanceButtonStyle] = useState('btn-light');
  const [maintenanceSaveButton, setMaintenanceSaveButton] = useState('SAVE');
  const mutateHistory = useTreeHistoryMutation();
  const commentRef = useRef('');
  const volunteerRef = useRef(isAuthenticated
    ? user.name
    : 'Volunteer');

  const handleMaintenanceSave = () => {
    setMaintenanceSaveButton('SAVE');
    setMaintenanceButtonStyle('btn-outline-success');
  };

  const handleButtonChanges = (mBtnStyle, mBtnSave) => {
    setMaintenanceButtonStyle(mBtnStyle);
    setMaintenanceSaveButton(mBtnSave);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const comment = commentRef.current.value;
      const volunteer = volunteerRef.current.value;

      if (actions.length || comment) {
        const actionsPayload = actions.reduce((result, action) => ({ ...result, [action]: 'yes' }), {});
        const sendData = {
          idTree: currentTreeId,
          date_visit: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
          volunteer,
          ...actionsPayload
        };

        if (comment) {
          sendData.comment = comment;
        }

        handleButtonChanges('btn-info', 'SAVING', 'btn-info', 'THANK YOU!');
        mutateHistory.mutate(sendData);
        setTimeout(() => handleMaintenanceSave(), saveTimer);
      }
    } catch (err) {
      console.error('CATCH err', err);
    }
  };

  const handleClickArrow = () => {
    // Make sure user is authenticated before opening the maintenance drawer, since it expects to be
    // able to access user.nickname.
    if (isAuthenticated) {
      setShowDoMaintenance(!showDoMaintenance);
    } else {
      loginWithRedirect();
    }
  };

  const arrowDirection = showDoMaintenance
    ? `${treeImagesPath}angle-arrow-up-black.svg`
    : `${treeImagesPath}angle-arrow-down-black.svg`;

  return (
    <div className="flex-grid border-top treemaintenance">
      <form id="treemaintenance" onSubmit={handleSubmit}>
        <div className="treemaintenance-header text-center">
          <button
            type="button"
            className="treemaintenance-btn-header text-center"
            onClick={handleClickArrow}
          >
            Tree Maintenance
            <img
              alt="open tree maintenance"
              className="treemaintenance-header__img"
              src={arrowDirection}
            />
          </button>
        </div>

        {showDoMaintenance && (
          <div className="treemaintenance">
            <div className="flex-grid tree__status">
              <div className="flex-grid text-center">
                Volunteer Name:
                <input
                  ref={volunteerRef}
                  placeholder={user.nickname}
                  defaultValue={user.nickname}
                  className="tree__status__input"
                  id="volunteerName"
                />
              </div>
            </div>

            <MaintenanceButtons
              actions={actions}
              setActions={setActions}
            />

            <div className="flex-grid tree__status">
              <div className="flex-grid text-center">
                Maintenance Comment:
                <textarea
                  className="form-control tree__status__textarea"
                  ref={commentRef}
                  placeholder="Maintenance Comment"
                  id="comment"
                  aria-label="Tree Notes"
                />
              </div>

              {actions.length > 0 && (
                <div className="flex-grid text-center">
                  <span>Maintenance Done: {actions.join(', ')}</span>
                </div>
              )}
            </div>

            <div className="tree__status text-right">
              <Button
                className={cx('btn-lg', maintenanceButtonStyle)}
                type="submit"
                variant="outlined"
              >
                {maintenanceSaveButton}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
