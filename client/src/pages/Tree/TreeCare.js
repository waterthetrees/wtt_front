import React, { useState, useRef } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { format } from 'date-fns';
// import TreeHistory from './TreeHistory';
import { getData, postData } from '@/api/apiUtils';
import { Button, CheckBoxIcon, Favorite, Park } from '@mui/material';
import cx from 'clsx';
import './TreeData.scss';

const treeImagesPath = 'assets/images/trees/';
const saveTimer = 800;

export const TreeCare = ({ currentTreeData }) => {
  const { user } = useAuth0();
  console.log('TreeCare user', user);
  const { common, health, id } = currentTreeData;
  console.log('TreeCare currentTreeData', currentTreeData);
  const { data: treeHistory } = useQuery(
    ['treehistory', { id, volunteer: user?.nickname }],
    getData,
  );
  const queryClient = useQueryClient();
  const mutateHistory = useMutation([{ id }], postData, {
    onSuccess: () => {
      queryClient.invalidateQueries('treehistory');
    },
  });
  console.log('treeHistory', treeHistory);
  return (
    <div className="treecare">
      {id &&
        mutateHistory &&
        health !== 'dead' &&
        health !== 'vacant' &&
        health !== 'missing' && (
          <TreeMaintenance
            id={id}
            common={common}
            mutateHistory={mutateHistory}
          />
        )}

      {treeHistory && treeHistory.length > 0 && (
        <TreeHistory treeHistory={treeHistory} id={id} />
      )}
    </div>
  );
};

const hasMaintenanceFields = (obj) => {
  const maintenanceArray = [
    'watered',
    'weeded',
    'mulched',
    'staked',
    'braced',
    'pruned',
    'comment',
  ];
  const hasAny = maintenanceArray.some((item) =>
    Object.prototype.hasOwnProperty.call(obj, item),
  );

  return hasAny;
};

const TreeMaintenance = ({ id, mutateHistory }) => {
  console.log('TreeMaintenance id HERE', id);
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [showDoMaintenance, setShowDoMaintenance] = useState(true);
  console.log('TreeMaintenance showDoMaintenance HERE', showDoMaintenance);
  const [statusSelected, setStatusSelected] = useState({});
  const commentRef = useRef('');
  const volunteerRef = useRef(isAuthenticated ? user.name : 'Volunteer');

  const [maintenanceButtonStyle, setMaintenanceButtonStyle] =
    useState('btn-light');
  const [maintenanceSaveButton, setMaintenanceSaveButton] = useState('SAVE');
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
      const dateVisit = format(new Date(), 'yyyy/MM/dd HH:mm:ss');
      const sendData = {
        idTree: id,
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
        await mutateHistory.mutate(['treehistory', { id }, sendData]);
        setTimeout(() => handleMaintenanceSave(), saveTimer);
      }

      return;
    } catch (err) {
      console.error('CATCH err', err);
    }
  };
  const handleClickArrow = () => {
    if (!isAuthenticated) loginWithRedirect();
    setShowDoMaintenance(!showDoMaintenance);
  };
  const arrowDirection = showDoMaintenance
    ? `${treeImagesPath}angle-arrow-up-black.svg`
    : `${treeImagesPath}angle-arrow-down-black.svg`;
  console.log('TreeMaintenance arrowDirection HERE', arrowDirection);
  return (
    <div className="flex-grid border-top treemaintenance">
      <form id="treemaintenance" onSubmit={handleSubmit}>
        <div className="treemaintenance-header text-center">
          <button
            type="button"
            className="treemaintenance-btn-header text-center"
            onClick={handleClickArrow}
          >
            Maintenance
            <img
              alt="open tree maintenance"
              className="treemaintenance-header__img"
              src={arrowDirection}
              style={{ width: '20px' }}
            />
          </button>
        </div>

        {showDoMaintenance && (
          <div className="treemaintenance">
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
                    Maintenance Done:{' '}
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
              >
                {maintenanceSaveButton}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
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
  if (isEmpty(statusSelected)) return 'yes';
  if (!Object.prototype.hasOwnProperty.call(statusSelected, historybutton))
    return 'yes';
  return statusSelected[historybutton] === 'no' ? 'yes' : 'no';
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
  if (isEmpty(statusSelected)) return yes[historybutton];
  if (!Object.prototype.hasOwnProperty.call(statusSelected, historybutton)) {
    return yes[historybutton];
  }
  return statusSelected[historybutton] === 'no'
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
    const selected = event.target.name;

    const newImageText = changeImageText(selected, statusSelected);
    if (selected === 'watered') setWater(newImageText);
    if (selected === 'weeded') setWeed(newImageText);
    if (selected === 'mulched') setMulch(newImageText);
    if (selected === 'staked') setStake(newImageText);
    if (selected === 'braced') setBrace(newImageText);
    if (selected === 'pruned') setPrune(newImageText);

    const selectedValue = changeYesNo(selected, statusSelected);
    setStatusSelected({ ...statusSelected, ...{ [selected]: selectedValue } });
  };
  const maintenanceImgTextArray = [
    watered,
    weeded,
    mulched,
    staked,
    braced,
    pruned,
  ];
  const maintenanceButtonsArray = [
    'watered',
    'weeded',
    'mulched',
    'staked',
    'braced',
    'pruned',
  ];

  return (
    <div className="treemaintenance-buttons">
      {maintenanceButtonsArray.map((maintenanceButton, index) => (
        <Button
          key={maintenanceButton}
          type="button"
          name={maintenanceButton}
          className="treemaintenance-btn btn-sm success text-center"
          onClick={onCheckboxBtnClick}
          active={statusSelected[maintenanceButton] === 'yes'}
        >
          <img
            alt={maintenanceButton}
            name={maintenanceButton}
            className="treemaintenance-img"
            src={`assets/images/trees/${maintenanceImgTextArray[index]}.svg`}
          />
          {maintenanceImgTextArray[index]}
        </Button>
      ))}
    </div>
  );
};

const makeMaintenanceString = (history) => {
  const historyArray = Object.entries(history)
    // eslint-disable-next-line no-unused-vars
    .filter(([key, value]) => value !== 'no' && value !== null)
    // eslint-disable-next-line no-unused-vars
    .filter(
      ([key, value]) =>
        key === 'watered' ||
        key === 'mulched' ||
        key === 'weeded' ||
        key === 'staked' ||
        key === 'braced' ||
        key === 'pruned',
    )
    .map((item) => item[0]);
  if (historyArray.length === 0) return '';
  return historyArray.join(', ');
};

function TreeHistory({ treeHistory }) {
  return (
    <div className="flex-grid border-top">
      {treeHistory && (
        <div className="text-center treehistory-list">
          <h4>Tree Visit History</h4>
        </div>
      )}

      {treeHistory &&
        treeHistory.map((history, index) => {
          const {
            idTreehistory,
            dateVisit,
            comment,
            volunteer,
            liked,
            adopted,
          } = history || {};
          const maintenanceString = makeMaintenanceString(history);
          const keyName = `${idTreehistory}${index}`;
          return (
            <div className="treehistory-item" key={keyName}>
              <div className="treehistory-item-label">
                {format(new Date(dateVisit), 'MMMM dd yyyy')} tree visit by{' '}
                {volunteer || 'volunteer'}
              </div>

              {comment && (
                <div className="">
                  <span>
                    <div className="treehistory-item-label">Comment:</div>{' '}
                    {comment}
                  </span>
                </div>
              )}

              <div>
                <span>
                  {liked && (
                    <div className="treehistory-item-label">
                      <Favorite fontSize="large" /> Liked!
                    </div>
                  )}
                  {adopted && (
                    <div className="treehistory-item-label">
                      {' '}
                      <CheckBoxIcon fontSize="large" /> Adopted!
                    </div>
                  )}
                </span>
              </div>

              {maintenanceString && (
                <div className="">
                  <span>
                    <div className="treehistory-item-label">
                      Maintenance Done:
                    </div>{' '}
                    {maintenanceString}
                  </span>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}
