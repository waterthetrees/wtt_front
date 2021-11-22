import { useAuth0 } from '@auth0/auth0-react';
import React, { useRef, useState } from 'react';
import format from 'date-fns/format';
import { Button } from '@mui/material';
import cx from 'clsx';
import { saveTimer } from '../../util/constants';
import { useTreeHistoryMutation } from '../../api/queries';

const treeImagesPath = 'assets/images/trees/';

const hasMaintenanceFields = (obj) => {
  const maintenanceArray = ['watered', 'weeded', 'mulched', 'staked', 'braced',
    'pruned', 'comment'];
  const hasAny = maintenanceArray.some(
    (item) => Object.prototype.hasOwnProperty.call(obj, item));

  return hasAny;
};

const isEmpty = (obj) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }
  return true;
};

const changeYesNo = (historybutton, statusSelected) => {
  if (isEmpty(statusSelected)) {
    return 'yes';
  }
  if (!Object.prototype.hasOwnProperty.call(statusSelected,
    historybutton)) {
    return 'yes';
  }
  return (statusSelected[historybutton] === 'no')
    ? 'yes'
    : 'no';
};

const changeImageText = (historybutton, statusSelected) => {
  const no = {
    watered: 'water',
    weeded: 'weed',
    mulched: 'mulch',
    staked: 'stake',
    braced: 'brace',
    pruned: 'prune',
  };
  const yes = {
    watered: 'watered',
    weeded: 'weeded',
    mulched: 'mulched',
    staked: 'staked',
    braced: 'braced',
    pruned: 'pruned',
  };
  if (isEmpty(statusSelected)) {
    return yes[historybutton];
  }
  if (!Object.prototype.hasOwnProperty.call(statusSelected, historybutton)) {
    return yes[historybutton];
  }
  return (statusSelected[historybutton] === 'no')
    ? yes[historybutton]
    : no[historybutton];
};

const MaintenanceButtons = ({ statusSelected, setStatusSelected }) => {
  const [watered, setWater] = useState('water');
  const [weeded, setWeed] = useState('weed');
  const [mulched, setMulch] = useState('mulch');
  const [staked, setStake] = useState('stake');
  const [braced, setBrace] = useState('brace');
  const [pruned, setPrune] = useState('prune');

  const onCheckboxBtnClick = (event) => {
    event.preventDefault();
    const selected = event.currentTarget.name;

    const newImageText = changeImageText(selected, statusSelected);
    if (selected === 'watered') {
      setWater(newImageText);
    }
    if (selected === 'weeded') {
      setWeed(newImageText);
    }
    if (selected === 'mulched') {
      setMulch(newImageText);
    }
    if (selected === 'staked') {
      setStake(newImageText);
    }
    if (selected === 'braced') {
      setBrace(newImageText);
    }
    if (selected === 'pruned') {
      setPrune(newImageText);
    }

    const selectedValue = changeYesNo(selected, statusSelected);
    setStatusSelected({ ...statusSelected, ...{ [selected]: selectedValue } });
  };
  const maintenanceImgTextArray = [watered, weeded, mulched, staked, braced,
    pruned];
  const maintenanceButtonsArray = ['watered', 'weeded', 'mulched', 'staked',
    'braced', 'pruned'];

  return (
    <div className="treemaintenance-buttons">
      {maintenanceButtonsArray.map((maintenanceButton, index) => (
        <Button
          key={maintenanceButton}
          name={maintenanceButton}
          variant="contained"
          className="treemaintenance-btn"
          onClick={onCheckboxBtnClick}
        >
          <img
            alt={maintenanceButton}
            name={maintenanceButton}
            src={`assets/images/trees/${maintenanceImgTextArray[index]}.svg`}
          />
          {maintenanceImgTextArray[index]}
        </Button>
      ))}
    </div>
  );
};

export default function TreeMaintenance({ currentTreeId }) {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [showDoMaintenance, setShowDoMaintenance] = useState(false);
  const [statusSelected, setStatusSelected] = useState({});
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
      const dateVisit = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
      const sendData = {
        idTree: currentTreeId,
        date_visit: dateVisit,
        ...statusSelected,
      };

      if (commentRef.current && commentRef.current.value) {
        sendData.comment = commentRef.current.value;
      }

      if (volunteerRef.current && volunteerRef.current.value) {
        sendData.volunteer = volunteerRef.current.value;
      }

      if (hasMaintenanceFields(sendData)) {
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
              statusSelected={statusSelected}
              setStatusSelected={setStatusSelected}
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

              {statusSelected.length > 0 && (
                <div className="flex-grid text-center">
                  <span>
                    Maintenance Done:
                    {' '}
                    {statusSelected.length > 0
                      ? statusSelected.join(', ')
                      : 'None Yet'}
                  </span>
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
